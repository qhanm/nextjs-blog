type TResponses<T> = {
  data: T[];
  meta: {
    totalPage: number;
    totalRecord: number;
  };
};

type TBlog = {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type TParams = {
  searchParams: {
    page?: string;
    limit?: string;
  }
  params?: {
    id: string
  }
}

export type { TResponses, TBlog, TParams };
