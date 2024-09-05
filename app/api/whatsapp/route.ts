import { editWhatsappGroup, getWhatsappGroups, saveWhatsappGroup } from "@/lib/actions/whatsapp.action";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
      const url = new URL(req.url);
      const page = url.searchParams.get('page') ?? '1';
      const pageSize = url.searchParams.get('pageSize') ?? '10';
      const filter = url.searchParams.get('filter') ?? 'diep';
      const searchQuery = url.searchParams.get('searchQuery') ?? '';
    
      const { whatsappGroup, isNext } = await getWhatsappGroups({
        searchQuery,
        filter,
        page: Number(page),
        pageSize: Number(pageSize),
      }
      );
  
      return NextResponse.json({ whatsappGroup, isNext });
    } catch (error) {
      console.error('Failed to fetch tags:', error);
      return NextResponse.error();
    }
};


export const POST = async (req: NextRequest) => {
  
  try {
    const data = await req.json();
    await saveWhatsappGroup(data)

    return NextResponse.json({ data });

  } catch (error) {
    console.error('Failed to save whatsapp group:', error);
    return NextResponse.error();
  }

}


export const PUT = async (req: NextRequest) => {
  
  try {
    const data = await req.json();
    const updatedData = await editWhatsappGroup(data)

    return NextResponse.json({ updatedData });

  } catch (error) {
    console.error('Failed to save whatsapp group:', error);
    return NextResponse.error();
  }

}