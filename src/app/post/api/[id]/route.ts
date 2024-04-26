import Post from "@/app/config/models/Post";
import connectDB from "@/app/config/mongoose";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  try {
    const id = context.params.id;
    const post = await Post.findById(id);

    if (post) {
      return NextResponse.json(
        {
          data: post,
          message: "Get detail successful",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "The blog doest not exists",
      },
      { status: 404 }
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

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();
  try {
    const id = context.params.id;
    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          data: null,
          message: "The blog doest not exists",
        },
        { status: 404 }
      );
    }

    const { title, description } = await req.json();
    const postByTitle = await Post.findOne({ title, _id: { $ne: id } });

    if (!postByTitle) {
      const postUpdated = await Post.findByIdAndUpdate(
        id,
        {
          title,
          description,
        },
        { new: true }
      );

      return NextResponse.json(
        {
          data: postUpdated,
          message: "Updated successful",
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        data: null,
        message: "The blog is duplicate",
      },
      { status: 400 }
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

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  await connectDB();

  try {
    const id = context.params.id;

    const post = await Post.findById(id);

    if (!post) {
      return NextResponse.json(
        {
          data: null,
          message: "The blog doest not exists",
        },
        { status: 404 }
      );
    }

    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: "Delete successful" }, { status: 204 });
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
