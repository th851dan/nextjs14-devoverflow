import Link from "next/link";
import Image from "next/image";

import { SignedIn, UserButton } from "@clerk/nextjs";

import Theme from "@components/shared/navbar/Theme";
import Mobile from "@components/shared/navbar/Mobile";
import GlobalSearch from "@components/shared/search/GlobalSearch";

const Navbar = () => {
  return (
    // eslint-disable-next-line tailwindcss/no-custom-classname
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12 md:top-8 lg:top-[2rem]">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/site-logo.svg"
          width={50}
          height={50}
          alt="BuddyKnows"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          Buddy<span className="text-primary-500">Knows</span>
          <span className="align-top text-xs">Be</span>
          <span className="align-top text-xs text-primary-500">ta</span>
        </p>
      </Link>

      <GlobalSearch />

      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
                avatarImage: "ph-no-capture",
                userPreview: "ph-no-capture",
              },
              variables: {
                colorPrimary: "#afd602",
              },
            }}
            userProfileProps={{
              appearance: {
                elements: {
                  avatarBox: "ph-no-capture",
                  profileSection__emailAddresses: "ph-no-capture",
                  profileSection__connectedAccounts: "ph-no-capture",
                  profileSection__activeDevices: "ph-no-capture",
                }
              }
            }}
          />
        </SignedIn>
        <Mobile />
      </div>
    </nav>
  );
};

export default Navbar;
