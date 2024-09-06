"use client";
import Link from "next/link";
import { SheetClose } from "../ui/sheet";
import Image from "next/image";

const Footer = ({ isInsideSheet = false }) => {
  const currentYear = new Date().getFullYear();
  const convertToSheetClose = (child: any) => {
    if (isInsideSheet) return <SheetClose asChild>{child}</SheetClose>;
    return child;
  };

  return (
    <>
      <section className="background-light900_dark200 shadow-light-300 dark:shadow-none">
        <div className="flex flex-row flex-wrap justify-center space-x-2 text-xs text-dark-100 dark:text-light-900">
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
      <div className="primary-gradient container mx-auto mt-5 flex flex-col items-center justify-center space-y-2 py-2 text-xs text-white dark:text-light-900 md:invisible">
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/icons/whatsapp.png"
            alt="profile picture"
            width={20}
            height={20}
            className="rounded-full object-cover"
          />{" "}
          <a href="tel:+4917634160625" className="hover:underline">
            +4917634160625
          </a>
        </div>
        <div className="flex items-center space-x-2">
          <Image
            src="/assets/icons/email.png"
            alt="profile picture"
            width={20}
            height={20}
            className="rounded-full bg-white object-cover"
          /> {" "}
          <a href="mailto:support@buddyknows.org" className="hover:underline">
            support@buddyknows.org
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
