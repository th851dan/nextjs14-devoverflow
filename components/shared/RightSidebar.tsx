/* eslint-disable @next/next/no-async-client-component */
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import RenderTag from "@/components/shared/RenderTag";
import PaginationV2 from "./PaginationV2";


interface Question {
  _id: String;
  title: String;
  content: String;
}

interface QuestionResponse {
  questions: Question[],
  isNext: boolean
}

interface Whatsapp {
  _id: String;
  name: String;
  invitationLink: String;
  shortDescription: String;
  numberOfMembers: String;
}

interface WhatsappResponse {
  whatsappGroup: Whatsapp[],
  isNext: boolean
}

interface Tag {
  _id: String;
  name: String;
  description: String;
}

interface TagResponse {
  tags: Tag[],
  isNext: boolean
}


function RightSidebar() {

  const [allQuestions, setAllQuestions] = useState<Question[]>([])
  const [questionPageNumber, setQuestionPageNumber] = useState<number>(1);
  const [questionNext, setQuestionNext] = useState<boolean>(false);

  const [allWhatsapps, setAllWhatsapps] = useState<Whatsapp[]>([])
  const [whatsappPageNumber, setWhatsappPageNumber] = useState<number>(1);
  const [whatsappNext, setWhatsappNext] = useState<boolean>(false);

  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [tagPageNumber, setTagPageNumber] = useState<number>(1);
  const [tagNext, setTagNext] = useState<boolean>(false);


  useEffect(() => {
    const fetchQuestions = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`/api/questions?page=${questionPageNumber}&pageSize=3&filter=''`);
        const data: QuestionResponse = await response.json();

        setAllQuestions(data.questions)
        setQuestionNext(data.isNext)

      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchQuestions();
  }, [questionPageNumber]);


  useEffect(() => {
    const fetchWhatsappGroup = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`/api/whatsapp?page=${whatsappPageNumber}&pageSize=3&filter=''`);
        const data: WhatsappResponse = await response.json();

        setAllWhatsapps(data.whatsappGroup)
        setWhatsappNext(data.isNext)

      } catch (error) {
        console.error('Failed to fetch whatsapp:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchWhatsappGroup();

  }, [whatsappPageNumber]);


  useEffect(() => {
    const fetchTags = async () => {
      // setLoading(true);
      try {
        const response = await fetch(`/api/tags?page=${tagPageNumber}&pageSize=3&filter=''`);
        const data: TagResponse = await response.json();

        setAllTags(data.tags)
        setTagNext(data.isNext)

      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        // setLoading(false);
      }
    };

    fetchTags();
  }, [tagPageNumber]);


  const handleNavigationQuestion = (newPageNumber: number) => {
    setQuestionPageNumber(newPageNumber);
  };

  const handleNavigationWhatsapp = (newPageNumber: number) => {
    setWhatsappPageNumber(newPageNumber);
  };

  const handleNavigationTag = (newPageNumber: number) => {
    setTagPageNumber(newPageNumber);
  };

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky right-0 top-0 flex h-screen flex-col overflow-y-auto border-l p-6 pt-24 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">

      <PaginationV2
        title="Top Questions"
        pageNumber={questionPageNumber}
        isNext={questionNext}
        onPageChange={handleNavigationQuestion}
      >
        {allQuestions && allQuestions.map((question: any) => (
          <Link
            href={`/question/${question._id}`}
            key={question._id}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="body-medium text-dark500_light700">
              {question.title}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </PaginationV2>

      <PaginationV2
        title="Whatsapp Groups"
        pageNumber={whatsappPageNumber}
        isNext={whatsappNext}
        onPageChange={handleNavigationWhatsapp}
      >
        {allWhatsapps && allWhatsapps.map((group: any) => (
          <Link
            href={`/whatsapp/${group._id}`}
            key={group._id}
            className="flex cursor-pointer items-center justify-between gap-7"
          >
            <p className="body-medium text-dark500_light700">
              {group.name}
            </p>
            <Image
              src="/assets/icons/chevron-right.svg"
              alt="chevron right"
              width={20}
              height={20}
              className="invert-colors"
            />
          </Link>
        ))}
      </PaginationV2>

      <PaginationV2
        title="Popular Tags"
        pageNumber={tagPageNumber}
        isNext={tagNext}
        onPageChange={handleNavigationTag}
      >
        {allTags && allTags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            _id={tag._id}
            name={tag.name}
          // totalQuestions={tag.questions.length}
          // showCount
          />
        ))}
      </PaginationV2>

    </section>
  );
};

export default RightSidebar;
