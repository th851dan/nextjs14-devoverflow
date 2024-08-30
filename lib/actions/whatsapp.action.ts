
import { connectToDatabase } from "@/lib/mongoose";
import Whatsapp from "@/database/whatsapp.model";

import type {
  GetWhatsappParams,
  WhatsappGroupData
} from "./shared.types";

import { FilterQuery } from "mongoose";

export async function getWhatsappGroups(params: GetWhatsappParams) {
   
    try {
      connectToDatabase();

      const  customPageSize: number = params.pageSize !== undefined ? params.pageSize : 10;
  
      const { page = 1, pageSize = customPageSize, filter, searchQuery } = params;
  
      // Calculate the number of questions to skip based on the page number and page size
      const skipAmount = (page - 1) * pageSize;
  
      const query: FilterQuery<typeof Whatsapp> = {};
  
      if (searchQuery) {
        query.$or = [
          {
            title: { $regex: new RegExp(searchQuery, "i") },
            content: { $regex: new RegExp(searchQuery, "i") },
          },
        ];
      }
  
      let sortOptions = {};
  
      switch (filter) {
        case "newest":
          sortOptions = { createdAt: -1 };
          break;
        case "frequent":
          sortOptions = { views: -1 };
          break;
        case "unanswered":
          query.answers = { $size: 0 };
          break;
        default:
          break;
      }
  

    const whatsappGroup = await Whatsapp.find(query)
    .sort(sortOptions)
    .skip(skipAmount)
    .limit(pageSize);
  
      const totalWhatsappGroup = await Whatsapp.countDocuments(query);
  
      const isNext = totalWhatsappGroup > skipAmount + whatsappGroup.length;
  
      return { whatsappGroup, isNext, page};
    } catch (error) {
      console.log(error);
      throw error;
    }
}

export async function saveWhatsappGroup(params: WhatsappGroupData) {
  try {
    connectToDatabase();

    const { name, invitationLink, shortDescription , numberOfMembers } = params;

    await Whatsapp.create({
      name, invitationLink, shortDescription , numberOfMembers
    })

    return params;
  
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function editWhatsappGroup(params: WhatsappGroupData) {
  try {
    connectToDatabase();

    const { id, name, invitationLink, shortDescription , numberOfMembers } = params;

    const group = await Whatsapp.findById({_id: id});

    if(group) {
        group.name = name;
        group.invitationLink = invitationLink;
        group.shortDescription = shortDescription;
        group.numberOfMembers = numberOfMembers;

        group.save();
    }

    return group;
  
  } catch (error) {
    console.log(error);
    throw error;
  }
}