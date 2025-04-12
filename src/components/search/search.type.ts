export interface SearchResult {
  id: string
  title: string
  type: "note" | "blog" | "project"
  excerpt: string
  url: string
  tags?: string[]
}
