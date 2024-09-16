import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms and Conditions — BuddyKnows",
};

const Page = async () => {
    return (
        <>
            <h1 className="h1-bold text-dark100_light900">Imprint</h1>
            <section className="mt-10 flex w-full flex-col gap-4">
                <div className="text-dark100_light900">
                    <p className="mb-4 text-sm text-gray-500">
                        Last updated: September 10, 2024
                    </p>
                    <h2 id="imprint" className="mb-4 text-2xl font-bold">
                        Information in accordance with § 5 TMG:
                    </h2>
                    <p className="mb-4 text-xl font-bold"
                    >Thanh Son Dang</p>
                    <p className="mb-4">Wollmatingerstraße 8</p>
                    <p className="mb-4">78467 Konstanz</p>
                    <p className="mb-4">Email:&nbsp;
                        <a
                            href="mailto: sondang@buddyknows.org"
                            className="text-primary-500"
                        >
                            sondang@buddyknows.org
                        </a>
                    </p>


                    <h2 id="haftungsausschluss" className="mb-4 text-2xl font-bold">
                        Disclamer
                    </h2>
                    <p className="mb-4">
                        This website is privately operated and does not pursue any commercial interests.
                        The content of this website has been created with the utmost care, but we cannot guarantee the accuracy,
                        completeness, or timeliness of the information provided.
                    </p>

                    <h2 id="accounts-and-membership" className="mb-4 text-xl italic">
                        German
                    </h2>
                    <h2 id="impressum" className="mb-4 text-2xl font-bold">
                        Angaben gemäß § 5 TMG:
                    </h2>
                    <p className="mb-4 text-xl font-bold"
                    >Thanh Son Dang</p>
                    <p className="mb-4">Wollmatingerstraße 8</p>
                    <p className="mb-4">78467 Konstanz</p>
                    <p className="mb-4">Email:&nbsp;
                        <a
                            href="mailto: sondang@buddyknows.org"
                            className="text-primary-500"
                        >
                            sondang@buddyknows.org
                        </a>
                    </p>


                    <h2 id="haftungsausschluss" className="mb-4 text-2xl font-bold">
                        Haftungsausschluss
                    </h2>
                    <p className="mb-4">
                        Diese Website wird privat betrieben und verfolgt keine kommerziellen Interessen.
                        Inhalte dieser Seite wurden mit größter Sorgfalt erstellt, für die Richtigkeit,
                        Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
                    </p>


                </div>
            </section>
        </>
    );
};

export default Page;
