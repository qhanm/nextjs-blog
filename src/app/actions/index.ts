"use server";

import { revalidateTag } from "next/cache";
import { TBlog, TResponses } from "../type";

async function getListPost(page: number, limit: number) {
  const res = await fetch(
    `${process.env.API_URL}/post/api?page=${page}&limit=${limit}`,
    {
      cache: "no-store",
      next: {
        tags: ["list-post"],
      },
    }
  );
  const data: TResponses<TBlog> = await res.json();
  const totalRecord = data.meta.totalRecord;

  return {
    data: data.data,
    totalRecord,
  };
}

async function createPost(prevState: any, formData: FormData) {
  const title = formData.get("title");
  const description = formData.get("description");
  const res = await fetch(`${process.env.API_URL}/post/api`, {
    method: "POST",
    body: JSON.stringify({ title, description }),
  });

  const jsonRes = await res.json();

  revalidateTag("list-post");
  return jsonRes;
}

export { getListPost, createPost };
