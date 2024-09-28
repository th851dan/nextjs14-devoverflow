import { getUserById } from "@lib/actions/user.action";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id') ?? '';

    if (!userId || userId === "") {
      return NextResponse.json({ "Error": "User not found" })
    }

    const user = await getUserById({
      userId
    });

    if (!user) {
      return NextResponse.json({
        "Status": "User not found"
      })
    }

    if (user.isDeleted) {
      return NextResponse.json({
        "user_id": userId,
        "status": "User was deleted",
        "delete_at": user.deletedAt
      });
    }


  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.error();
  }
};