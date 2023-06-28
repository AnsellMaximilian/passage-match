import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

interface RequestBody {
  name?: string;
  email?: string;
  passage_id?: string;
}

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const { name, email, passage_id } = (await request.json()) as RequestBody;
  if (!name || !email || !passage_id) {
    return NextResponse.json({ message: "Missing fields." }, { status: 500 });
  } else {
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          email,
          passage_id,
        },
      });
      return NextResponse.json(newUser);
    } catch (error) {
      return NextResponse.json(
        { message: "Error creating user." },
        { status: 500 }
      );
    }
  }
}
