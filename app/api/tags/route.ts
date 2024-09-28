import { NextRequest, NextResponse } from "next/server";
import { getAllTags } from "@lib/actions/tag.action";


export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const page = url.searchParams.get('page') ?? '1';
    const pageSize = url.searchParams.get('pageSize') ?? '10';
    const filter = url.searchParams.get('filter') ?? 'diep';
    const searchQuery = url.searchParams.get('searchQuery') ?? '';

    const { tags, isNext } = await getAllTags({
      searchQuery,
      filter,
      page: Number(page),
      pageSize: Number(pageSize),
    }
    );

    return NextResponse.json({ tags, isNext });
  } catch (error) {
    console.error('Failed to fetch tags:', error);
    return NextResponse.error();
  }
};
