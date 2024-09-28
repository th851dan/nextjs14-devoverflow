import { Skeleton } from "@components/ui/skeleton";

const Loading = () => {
  return (
    <>
      <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
        <h1 className="h1-bold text-dark100_light900">Onboarding</h1>
        <p className="base-medium text-dark100_light900 mt-3">
          Complete your profile now to use BuddyKnows
        </p>

        <div className="background-light850_dark100 mt-9 p-10">
          <Skeleton className="h-56 rounded-xl" />
        </div>
      </main>
    </>
  );
};

export default Loading;
