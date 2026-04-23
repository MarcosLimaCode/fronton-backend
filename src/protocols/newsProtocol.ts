export type CreateNewsData = {
  title: string;
  portal: string;
  logo: string | null;
  imageUrl: string | null;
  content: string;
  link: string;
  publishedAt: Date;
};

export type Preview = {
  url: string;
  title: string;
  siteName: string;
  description?: string;
  author: string | undefined;
  mediaType: string;
  contentType: string;
  images: string[];
  videos: any[];
  favicons: string[];
  charset: string;
};