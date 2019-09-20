export interface BlogPostAuthorType {
  id: number;
  name: string;
  description?: string;
  image: {
    meta: {
      download_url: string;
    };
  };
}
