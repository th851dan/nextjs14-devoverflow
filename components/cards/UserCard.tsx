import Link from "next/link";
import Image from "next/image";

import { getTopInteractedTags } from "@/lib/actions/tag.action";

import { Badge } from "@/components/ui/badge";
import RenderTag from "@/components/shared/RenderTag";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
    preciousNumber: Number;
  };
}

const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({
    userId: user._id,
  });

  return (
    <article className="shadow-light100_darknone background-light900_dark200 light-border border-primary-100 flex w-full flex-col items-center justify-center rounded-2xl border p-8 max-xs:min-w-full xs:w-[260px]">
      <Link href={`/profile/${user.clerkId}`} className="flex w-full flex-col items-center justify-center">
        <Image
          src={user.picture}
          alt="User profile picture"
          width={100}
          height={100}
          className="rounded-full"
        />
        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @BKBeta{user.preciousNumber.toString()}
          </p>
        </div>
      </Link>

      <div className="mt-2">
        {interactedTags.length > 0 ? (
          <div className="flex items-center flex-wrap justify-center gap-1">
            {interactedTags.map((tag: any) => (
              <RenderTag key={tag._id} _id={tag._id} name={tag.name} />
            ))}
          </div>
        ) : (
          <Badge>
            <span className="text-dark100_light900">No tags yet </span>
          </Badge>
        )}
      </div>

    </article>
  );
};

export default UserCard;
