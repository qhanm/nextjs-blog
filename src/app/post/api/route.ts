import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { title, description } = await req.json();
    console.log({
      title,
      description,
    });

    const existed = await Post.findOne({ title });

    if (!existed) {
      const newPost = await Post.create({ title, description });

      return NextResponse.json(
        {
          data: newPost,
          message: "Create successful",
        },
        { status: 201 }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "The blog already exists",
      },
      { status: 422 }
    );
  } catch (err: any) {
    return NextResponse.json(
      {
        data: null,
        message: err.message,
      },
      { status: 400 }
    );
  }
}

export async function GET(req: NextRequest) {
  await connectDB();

  try {
    const limit = req.nextUrl.searchParams.get("limit") ?? 2;
    const page = req.nextUrl.searchParams.get("page") ?? 1;
    const total = await Post.countDocuments();
    const totalPage = Math.ceil(total / +limit);

    const posts = await Post.find()
      .skip((+page - 1) * +limit)
      .limit(+limit);

    return NextResponse.json({
      data: posts,
      meta: {
        totalPage: totalPage,
        totalRecord: total,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        data: null,
        message: err.message,
      },
      { status: 400 }
    );
  }
}
