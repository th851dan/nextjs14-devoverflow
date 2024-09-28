import Link from "next/link";

import LocalSearchbar from "@components/shared/search/LocalSearchbar";
import Filter from "@components/shared/Filter";
import NoResult from "@components/shared/NoResult";
import Pagination from "@components/shared/Pagination";

import { getAllTags } from "@lib/actions/tag.action";

import { TagFilters } from "@/constants/filters";

import type { SearchParamsProps } from "@/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tags — BuddyKnows",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">All Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/tags"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags"
          otherClasses="flex-1"
        />

        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag: any) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <div className="primary-gradient w-fit rounded-md px-5 py-1.5">
                  <p className="paragraph-semibold !text-dark-900">
                    {"#" + tag.name}
                  </p>
                </div>

                {tag.description && (
                  <p className="small-regular text-dark500_light700 mt-4">
                    {tag.description}
                  </p>
                )}

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <NoResult
            title="No Tags Found"
            description="It appears that there are not tags found at the moment 😔. Ask a Question and kickstart the
            discussion with tags. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;