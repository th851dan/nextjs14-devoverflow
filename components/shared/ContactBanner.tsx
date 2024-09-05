
const ContactBanner = () => {
  return (
    <div className="primary-gradient flex-between fixed top-0 z-50 w-full gap-5 p-6 py-2 text-white shadow-light-300 dark:shadow-none sm:px-12">
    <div className="container mx-auto flex items-center justify-between">
        <div className="text-sm">
            <span className="font-bold">Contact Us:</span> 
            <a href="tel:+4917634160625" className="hover:underline"> +4917634160625</a>
            <span className="mx-2">|</span>
            <a href="mailto:support@buddyknows.org" className="hover:underline">support@buddyknows.org</a> 
        </div>
    </div>
</div>
  );
};

export default ContactBanner;
