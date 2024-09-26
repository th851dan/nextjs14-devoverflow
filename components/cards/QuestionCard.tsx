import Link from "next/link";

import { SignedIn } from "@clerk/nextjs";

import RenderTag from "@/components/shared/RenderTag";
import Metric from "@/components/shared/Metric";
import EditDeleteAction from "@/components/shared/EditDeleteAction";

import { getFormattedNumber, getTimestamp } from "@/lib/utils";
import CollapsibleContent from "../shared/CollapsibleContent";
import CopyClipBoard from "../shared/CopyClipBoard";
import { headers } from "next/headers";

interface QuestionProps {
  _id: string;
  title: string;
  content: string;
  tags: Array<{ _id: string; name: string }>;
  author: {
    _id: string;
    name: string;
    picture: string;
    clerkId: string;
    isDeleted: boolean;
    preciousNumber: number;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
  clerkId?: string | null;
}

const QuestionCard = ({
  _id,
  title,
  content,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
  clerkId,
}: QuestionProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;
  const protocol = headers().get("x-forwarded-proto") || "http";
  const host = headers().get("host");
  const fullUrl = `${protocol}://${host}`;

  return (
    <div className={`card-wrapper rounded-[10px] p-9 sm:px-11 ${showActionButtons && `ph-no-capture`}`}>
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 flex-1" >
              {title}
            </h3>
          </Link>

          <CollapsibleContent content={content} />

        </div>

        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="user"
          value={
            author.isDeleted
              ? "DeletedUser" + author.preciousNumber
              : author.name
          }
          title={` • asked ${getTimestamp(createdAt)}`}
          href={author.isDeleted ? undefined : `/profile/${author.clerkId}`}
          isAuthor
          textStyles="body-medium text-dark400_light700"
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={getFormattedNumber(upvotes.length)}
            title=" Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={getFormattedNumber(answers.length)}
            title=" Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Eye"
            value={getFormattedNumber(views)}
            title=" Views"
            textStyles="small-medium text-dark400_light800"
          />

          <CopyClipBoard link={`${fullUrl}/question/${_id}`} />

        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
