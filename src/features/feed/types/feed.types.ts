export interface Post {
  _id: string;
  userId: string;
  content: {
    text: string;
    image: string | null;
  };
  createdAt: string;
}

export interface UploadedImage {
  file: File;
  src: string;
  alt: string;
}
