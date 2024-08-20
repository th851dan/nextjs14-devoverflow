"use client";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";

const Footer = ({ isInsideSheet = false }) => {
  const currentYear = new Date().getFullYear();
  const convertToSheetClose = (child: any) => {
    if (isInsideSheet) return <SheetClose asChild>{child}</SheetClose>;
    return child;
  };

  return (
    <section className="background-light900_dark200 shadow-light-300 dark:shadow-none">
      <div className="flex flex-row flex-wrap justify-center text-xs space-x-2 text-dark-100 dark:text-light-900">
        {convertToSheetClose(
          <Link href="/terms-and-conditions">
            <p className="hover:underline">Terms and Conditions</p>
          </Link>
        )}
        <span className="mx-2">|</span>
        {convertToSheetClose(
          <Link href="/privacy-policy">
            <p className="hover:underline ">Privacy Policy</p>
          </Link>
        )}
        <span>|</span>

        {convertToSheetClose(
          <Link href="/impressum">
            <p className="hover:underline ">Impressum</p>
          </Link>
        )}
        <span>|</span>
        {convertToSheetClose(
          <Link href="/cookie-declaration">
            <p className="hover:underline ">Cookie Declaration</p>
          </Link>
        )}
        <span>|</span>
        <p className="text-dark-100 dark:text-light-900">
          ©{currentYear} BuddyKnows
        </p>
      </div>
    </section>
  );
};

export default Footer;
