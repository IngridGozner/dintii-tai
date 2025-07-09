import { Header } from "@/components/components/Header";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { HEADER_SITEINFO_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";

export default async function FrontendLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const { data: siteInfo } = await sanityFetch({ query: HEADER_SITEINFO_QUERY, params: {language: "en"} })

    if(!siteInfo) notFound();
    
    return (
        <section className="bg-white min-h-screen">
            <Header {...siteInfo} />
            {children}
            <SanityLive />
        </section>
    );
}