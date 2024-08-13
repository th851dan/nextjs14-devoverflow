"use client";
import Link from "next/link";

const Footer = () => {

  const currentYear = new Date().getFullYear(); 


  return (
    <section className="background-light900_dark200 pt-30 flex flex-1 flex-col shadow-light-300 dark:shadow-none max-md:pb-14 sm:px-14">
    <div className="container mx-auto text-center">
        <div className="mb-4 flex justify-center space-x-6">
          <Link href="/agb">
            <p className="text-dark-100 hover:underline dark:text-light-900">Unsere AGB</p>
          </Link>
          <Link href="/terms-and-conditions">
            <p className="text-dark-100 hover:underline dark:text-light-900">Datenschutzerklärung</p>
          </Link>
          <Link href="/impressum">
            <p className="text-dark-100 hover:underline dark:text-light-900">Impressum</p>
          </Link>
          <Link href="/cookie-declaration">
            <p className="text-dark-100 hover:underline dark:text-light-900">Hinweise zu Cookies</p>
          </Link>
        </div>
        <p className="text-dark-100 hover:underline dark:text-light-900">
          ©{currentYear} BuddyKnows
        </p>
    </div>
  </section>
  );
};

export default Footer;
