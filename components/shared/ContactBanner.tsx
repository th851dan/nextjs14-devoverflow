import Image from "next/image";


const ContactBanner = () => {
  return (
    <div className="primary-gradient flex-between invisible fixed top-0 z-50 w-full gap-5 p-6 py-2 text-white shadow-light-300 dark:shadow-none sm:px-12 md:visible">
      <div className="container flex items-center space-x-2 text-sm">
        {/*  <span className="font-bold">Whatsapp:</span>  */}
        <Image
          src="/assets/icons/whatsapp.png"
          alt="profile picture"
          width={20}
          height={20}
          className="rounded-full object-cover"
        />
        <a href="https://wa.me/4917634160625" className="hover:underline"> +4917634160625</a>
        <Image
          src="/assets/icons/email.png"
          alt="profile picture"
          width={20}
          height={20}
          className="rounded-full bg-white object-cover"
        />
        <a href="mailto:support@buddyknows.org" className="hover:underline">support@buddyknows.org</a>
      </div>
    </div>
  );
};

export default ContactBanner;
