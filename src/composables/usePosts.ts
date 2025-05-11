import { getConfig } from "@/lib/config/client.config";
import type { Post } from "@/types/common";
import { computed, ref, type ComputedRef, type Ref } from "vue";
interface UsePostsOptions {
  source?: "all" | "notion" | "x" | "instagram" | "markdown";
  initialPage?: number;
  perPage?: number;
  sortBy?: "published_at" | "title";
  sortOrder?: "asc" | "desc";
}

interface UsePostsReturn {
  posts: Ref<Post[]>;
  loading: Ref<boolean>;
  error: Ref<Error | null>;
  currentPage: Ref<number>;
  totalPages: ComputedRef<number>;
  hasMore: Ref<boolean>;
  total: Ref<number>;
  fetchPosts: (page?: number) => Promise<void>;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function usePosts({
  source = "all",
  initialPage = 1,
  perPage = 10,
  sortBy = "published_at",
  sortOrder = "desc",
}: UsePostsOptions = {}): UsePostsReturn {
  const posts = ref<Post[]>([]);
  const loading = ref(false);
  const error = ref<Error | null>(null);
  const currentPage = ref(initialPage);
  const hasMore = ref(true);
  const total = ref(0);

  const totalPages = computed(() => Math.ceil(total.value / perPage));

  const fetchPosts = async (page: number = currentPage.value) => {
    try {
      loading.value = true;
      error.value = null;

      const params = new URLSearchParams({
        page: page.toString(),
        limit: perPage.toString(),
        ...(source !== "all" && { source }),
        sortBy,
        sortOrder,
      });

      const response = await fetch(
        `${getConfig("api.url")}posts?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      posts.value = [...(result.posts || []), ...posts.value];
      total.value = result.total;
      hasMore.value = result.hasMore;
      currentPage.value = page;
    } catch (err) {
      error.value =
        err instanceof Error ? err : new Error("Failed to fetch posts");
      console.error("Error fetching posts:", err);
    } finally {
      loading.value = false;
    }
  };

  const loadMore = async () => {
    if (loading.value || !hasMore.value) return;
    const nextPage = currentPage.value + 1;
    await fetchPosts(nextPage);
  };

  const refresh = async () => {
    currentPage.value = initialPage;
    await fetchPosts(initialPage);
  };

  // Initial fetch
  fetchPosts();

  return {
    posts,
    loading,
    error,
    currentPage,
    totalPages,
    hasMore,
    total,
    fetchPosts,
    loadMore,
    refresh,
  };
}
