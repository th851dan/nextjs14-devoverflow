import { NextRequest, NextResponse } from "next/server";
import { getQuestions } from "@/lib/actions/question.action";


export const GET = async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const page = url.searchParams.get('page') ?? '1';
      const pageSize = url.searchParams.get('pageSize') ?? '10';
      const filter = url.searchParams.get('filter') ?? 'diep';
      const searchQuery = url.searchParams.get('searchQuery') ?? '';
    
      const { questions, isNext } = await getQuestions({
        searchQuery,
        filter,
        page: Number(page),
        pageSize: Number(pageSize),
      }
      );
  
      return NextResponse.json({ questions, isNext });
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      return NextResponse.error();
    }
  };
