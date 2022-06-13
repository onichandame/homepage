export type Blog = {
  content: { [key: string]: string };
} & BlogMetadata;

export type BlogMetadata = {
  slug: string;
  hidden?: boolean;
  featured?: boolean;
  updatedAt: string;
  image: string;
  title: { [key: string]: string };
};
