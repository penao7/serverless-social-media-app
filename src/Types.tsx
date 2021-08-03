export interface Item {
  image?: File;
  id?: string;
}

export interface Comment {
  id: string;
  user: string;
  message: string;
}

export interface Payload {
  likes: number;
  comments: Comment[];
  user: string;
  url: string;
  key: string;
  id: string;
}
export interface Items {
  Items: Payload[];
}

export interface SignUrl {
  fileUploadURL: string;
  Key: string;
}
