import { fireEvent, render, screen } from "@testing-library/vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { nextTick } from "vue";
import ThemeSwitcher from "../../src/components/theme/ThemeSwitcher.vue";

// Mock the getConfig utility
vi.mock("@/lib/utils", () => ({
  getConfig: vi.fn().mockReturnValue("light"),
}));

describe("ThemeSwitcher", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders with light theme by default", () => {
    render(ThemeSwitcher);
    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");

    expect(svg).toHaveClass("is-sun");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("toggles theme when clicked", async () => {
    render(ThemeSwitcher);
    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");

    await fireEvent.click(button);
    expect(svg).toHaveClass("is-moon");
    expect(document.documentElement).toHaveClass("dark");

    await fireEvent.click(button);
    expect(svg).toHaveClass("is-sun");
    expect(document.documentElement).not.toHaveClass("dark");
  });

  it("loads saved theme preference on mount", async () => {
    localStorage.setItem("theme", "dark");
    render(ThemeSwitcher);
    const button = screen.getByRole("button");
    const svg = button.querySelector("svg");
    // Wait for the component to update
    await nextTick();
    expect(svg).toHaveClass("is-moon");
    expect(document.documentElement).toHaveClass("dark");
  });

  it("saves theme preference when toggled", async () => {
    render(ThemeSwitcher);
    const button = screen.getByRole("button");

    await fireEvent.click(button);
    expect(localStorage.getItem("theme")).toBe("dark");
  });

  it("has proper accessibility attributes", () => {
    render(ThemeSwitcher);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label", "Toggle theme");
  });
});
