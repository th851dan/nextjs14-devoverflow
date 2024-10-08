"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import { sidebarLinks } from "@/constants";

import Footer from "@/components/shared/Footer";

const LeftSidebar = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const isProfileActive =
    pathname.includes(`/profile/${userId}`) ||
    pathname === `/profile/${userId}`;

  return (
    <section className="background-light900_dark200 light-border custom-scrollbar sticky left-0 top-0 flex h-screen flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex flex-col justify-between">
        <div className="flex flex-1 flex-col gap-6">
          {sidebarLinks.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;

            if (link.route === "/profile") {
              // if (userId) {
              //   link.route = `${link.route}/${userId}`;
              // } else {
              //   return null;
              // }
              return null;
            }

            return (
              <Link
                key={link.route}
                href={link.route}
                className={`${
                  isActive
                    ? "primary-gradient rounded-lg text-light-900"
                    : "text-dark300_light900"
                } flex items-center justify-start gap-4 bg-transparent p-4`}
              >
                <Image
                  src={link.imgURL}
                  alt={link.label}
                  width={20}
                  height={20}
                  className={`${isActive ? "" : "invert-colors"}`}
                />
                <p
                  className={`${
                    isActive ? "base-bold" : "base-medium"
                  } max-lg:hidden`}
                >
                  {link.label}
                </p>
              </Link>
            );
          })}
          {/* maybe there's a better solution for this here */}
          <SignedIn>
            <Link
              key={"/profile"}
              href={`${sidebarLinks[4].route}/${userId}`}
              className={`${
                isProfileActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900"
              } flex items-center justify-start gap-4 bg-transparent p-4`}
            >
              <Image
                src={sidebarLinks[4].imgURL}
                alt={sidebarLinks[4].label}
                width={20}
                height={20}
                className={`${isProfileActive ? "" : "invert-colors"}`}
              />
              <p
                className={`${
                  isProfileActive ? "base-bold" : "base-medium"
                } max-lg:hidden`}
              >
                {sidebarLinks[4].label}
              </p>
            </Link>
          </SignedIn>
        </div>

        <SignedOut>
          <div className="flex flex-col gap-3">
            <Link href="/sign-in">
              <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/account.svg"
                  alt="sign in"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="primary-text-gradient max-lg:hidden">
                  Log In
                </span>
              </Button>
            </Link>

            <Link href="/sign-up">
              <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                <Image
                  src="/assets/icons/sign-up.svg"
                  alt="sign up"
                  width={20}
                  height={20}
                  className="invert-colors lg:hidden"
                />
                <span className="max-lg:hidden">Sign Up</span>
              </Button>
            </Link>
          </div>
        </SignedOut>
      </div>
      <div className="max-lg:hidden">
        <Footer />
      </div>
    </section>
  );
};

export default LeftSidebar;
