import { getConfig } from "@/lib/config/client.config";
import { defineStore } from "pinia";

// Helper function to get initial theme and apply side effect
function getInitialThemeAndApplyEffect() {
  const theme =
    localStorage.getItem("theme") || getConfig("theme.defaultTheme");
  // Apply the dark class immediately based on the initial theme
  document.documentElement.classList.toggle("dark", theme === "dark");
  return theme;
}

export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      // Use the helper function to initialize the state
      currentTheme: getInitialThemeAndApplyEffect(),
    };
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    toggleTheme() {
      this.currentTheme = this.currentTheme === "light" ? "dark" : "light";
      document.documentElement.classList.toggle(
        "dark",
        this.currentTheme === "dark"
      );
      localStorage.setItem("theme", this.currentTheme);
    },
  },
});
