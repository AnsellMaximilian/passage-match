import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface RequestBody {
  name?: string;
}

export async function GET(
  request: Request,
  { params: { passage_id } }: { params: { passage_id: string } }
) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        passage_id: passage_id,
      },
    });

    if (user) {
      return NextResponse.json(user);
    } else {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting user." },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params: { passage_id } }: { params: { passage_id: string } }
) {
  try {
    const { name } = (await request.json()) as RequestBody;
    if (!name)
      return NextResponse.json({ message: "Missing fields." }, { status: 400 });

    const updatedUser = await prisma.user.update({
      where: {
        passage_id: passage_id,
      },
      data: {
        name: name,
      },
    });

    if (updatedUser) {
      return NextResponse.json(updatedUser);
    } else {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error getting user." },
      { status: 500 }
    );
  }
}
