import Link from "next/link";
import { Title } from "@/components/atoms/Title";

export default async function Page() {
  return (
    <section className="container mx-auto grid grid-cols-1 gap-6 p-12">
      <Title>Layer Caker Home Page</Title>
      <hr />
      <Link href="/posts">Posts index &rarr;</Link>
      <div className="h-500 bg-base-dark"></div>
      <div className="h-500 bg-background"></div>
      <div className="h-500 bg-base-light"></div>
      <div className="h-500 bg-black"></div>

    </section>
  );
}