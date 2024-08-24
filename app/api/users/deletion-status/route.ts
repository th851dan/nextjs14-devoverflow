import { getUserById } from "@/lib/actions/user.action";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const userId = url.searchParams.get('id') ?? '';

      if (!userId || userId === "") {
        return NextResponse.json({"Error": "User not found"})
      }
    
      const user = await getUserById({
       userId
      });

      if(!user) {
        return NextResponse.json({"Error": "User not found"})
      }
  
      return NextResponse.json({ 
        "algorithm": "HMAC-SHA256",
        "expires": user.deletedAt,
        "issued_at": user.joinedAt,
        "user_id": userId
      });
    
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      return NextResponse.error();
    }
  };