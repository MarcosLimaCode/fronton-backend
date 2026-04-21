export type CreateNewsData = {
  title: string;
  portal: string;
  logo: string | null;
  imageUrl: string | null;
  content: string;
  link: string;
  publishedAt: Date;
};
