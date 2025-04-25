import DialogHolder from "@/components/dialog/DialogHolder.vue";
import { DialogClose } from "@/components/ui/dialog";
import { fireEvent, render, screen } from "@testing-library/vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h, nextTick } from "vue";
import { useDialog } from "../../src/components/dialog/useDialog";
const ContentComponent = {
  emits: ["closeDialog"],
  template: `
    <div>
      <h1>Test Dialog</h1>
      <button @click="$emit('closeDialog')" data-testid="close-dialog">Close</button>
    </div>
  `,
};
// Test component that uses useDialog
const TestComponent = {
  setup() {
    const { openDialog } = useDialog();

    const openTestDialog = () => {
      openDialog({
        title: "Test Dialog",
        content: h(ContentComponent),
      });
    };

    return { openTestDialog };
  },
  template: `
    <button @click="openTestDialog" data-testid="open-dialog">
      Open Dialog
    </button>
  `,
};

// Wrapper component that includes both DialogHolder and TestComponent
const TestWrapper = {
  components: { DialogHolder, TestComponent, DialogClose },
  template: `
    <DialogHolder>
      <TestComponent />
    </DialogHolder>
  `,
};

describe("useDialog", () => {
  it("opens dialog when openDialog is called", async () => {
    render(TestWrapper);
    const button = screen.getByTestId("open-dialog");
    await fireEvent.click(button);

    await new Promise((resolve) => setTimeout(resolve, 100));
    // Verify dialog is displayed
    const dialog = screen.getByRole("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog.querySelector("h1")).toHaveTextContent("Test Dialog");
  });

  it("closes dialog when close button is clicked", async () => {
    render(TestWrapper);

    // Open dialog
    const openButton = screen.getByTestId("open-dialog");
    await fireEvent.click(openButton);

    // Verify dialog is open
    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Dialog");

    // Close dialog
    const closeButton = screen.getByTestId("close-dialog");
    await fireEvent.click(closeButton);

    await nextTick();
    // Verify dialog is closed
    expect(screen.queryByTestId("dialog-title")).not.toBeInTheDocument();
  });

  it("renders dialog with correct title and content", async () => {
    render(TestWrapper);

    // Open dialog
    const button = screen.getByTestId("open-dialog");
    await fireEvent.click(button);

    // Verify dialog content
    expect(screen.getByTestId("dialog-title")).toHaveTextContent("Test Dialog");
    expect(screen.getByTestId("dialog-content")).toBeInTheDocument();
  });

  it("provides default implementation when context is not found", () => {
    const wrapper = mount(TestComponent);
    const button = wrapper.find('[data-testid="open-dialog"]');

    // Should not throw when clicking button
    expect(() => button.trigger("click")).not.toThrow();
  });
});
