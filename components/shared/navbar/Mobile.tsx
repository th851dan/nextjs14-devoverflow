"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { sidebarLinks } from "@/constants";

const NavContent = () => {
  const pathname = usePathname();

  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks.map((link) => {
        const isActive: boolean =
          (pathname.includes(link.route) && link.route.length > 1) ||
          pathname === link.route;
        if (link.route === "/profile") {
          return null;
        }
        return (
          <SheetClose asChild key={link.route}>
            <Link
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
              <p className={`${isActive ? "base-bold" : "base-medium"}`}>
                {link.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
      <ProfileTab />
    </section>
  );
};

const ProfileTab = () => {
  const { userId } = useAuth();
  const pathname = usePathname();
  const isProfileActive =
    pathname.includes(`/profile/${userId}`) ||
    pathname === `/profile/${userId}`;
  return (
    <SignedIn>
      <SheetClose asChild>
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
          <p className={`${isProfileActive ? "base-bold" : "base-medium"}`}>
            {sidebarLinks[4].label}
          </p>
        </Link>
      </SheetClose>
    </SignedIn>
  );
};

const Mobile = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          alt="Menu"
          width={36}
          height={36}
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/site-logo.svg"
            width={50}
            height={50}
            alt="BuddyKnows"
          />

          <p className="h2-bold text-dark100_light900 font-spaceGrotesk">
            Buddy<span className="text-primary-500">Knows</span>
            <span className="align-top text-xs">Be</span>
            <span className="align-top text-xs text-primary-500">ta</span>
          </p>
        </Link>
        <div>
          <NavContent />

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/sign-in">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Log In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/sign-up">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Mobile;
