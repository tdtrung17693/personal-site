import { getConfig } from "@/lib/utils";
import { defineStore } from "pinia";
export const useThemeStore = defineStore("theme", {
  state: () => {
    return {
      currentTheme:
        localStorage.getItem("theme") || getConfig("theme.defaultTheme"),
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
