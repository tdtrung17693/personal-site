import { getConfig } from "@/lib/config/client.config";
import type { GithubEvent } from "@/types/common";
import { ref } from "vue";

export function useGitHubActivity() {
  const activity = ref<GithubEvent[]>([]);
  const loading = ref(true);
  const error = ref<Error | null>(null);

  const fetchActivity = async () => {
    loading.value = true;
    const response = await fetch(`${getConfig("api.url")}github`, {
      redirect: "follow",
    });
    const data = await response.json();
    activity.value = data;
    loading.value = false;
  };

  fetchActivity();

  return { activity, loading, error };
}
