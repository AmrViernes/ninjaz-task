export type Post = {
    ownerName: string;
    title?: string;
    text: string;
    imageUrl: string;
    creationDate: string,
    likes: number
    tags:  string[];
  };

export type Post_API = {
    id: string
    owner: {
        firstName: string,
        lastName: string
    };
    title?: string;
    text: string;
    image: string;
    publishDate: string,
    likes: number
    tags:  string[];
  };