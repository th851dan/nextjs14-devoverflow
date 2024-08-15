"use client";
import Link from "next/link";

const Footer = () => {

  const currentYear = new Date().getFullYear(); 


  return (
    <section className="background-light900_dark200 mb-12 mt-6 text-center shadow-light-300 dark:shadow-none">
          <Link href="/terms-and-conditions">
            <p className="text-dark-100 hover:underline dark:text-light-900">Terms and Conditions</p>
          </Link>
          <Link href="/privacy-policy">
            <p className="text-dark-100 hover:underline dark:text-light-900">Privacy Policy</p>
          </Link>
          <Link href="/impressum">
            <p className="text-dark-100 hover:underline dark:text-light-900">Impressum</p>
          </Link>
          <Link href="/cookie-declaration">
            <p className="text-dark-100 hover:underline dark:text-light-900">Cookie Declaration</p>
          </Link>
          <p className="text-dark-100 hover:underline dark:text-light-900">
          ©{currentYear} BuddyKnows
        </p>
  </section>
  );
};

export default Footer;
