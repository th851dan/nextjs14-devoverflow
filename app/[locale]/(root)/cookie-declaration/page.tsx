import CookieDeclaration from "@components/cookie/cookiedeclaration";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Declaration — BuddyKnows",
};

const Page = async () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Cookie Declaration</h1>
      <section className="mt-10 flex w-full flex-col gap-4">
        <CookieDeclaration />
      </section>
    </>
  );
};

export default Page;
