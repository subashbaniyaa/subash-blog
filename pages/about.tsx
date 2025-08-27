import Image from "next/image";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { PageSEO } from "@/components/SEO";
import siteMetadata from "@/data/siteMetadata";

export default function About({ mdxSource }: { mdxSource: string }) {
  const Component = useMemo(() => getMDXComponent(mdxSource), [mdxSource]);

  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
      />

      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Heading */}
        <h1 className="text-4xl font-black mb-10 text-left">About</h1>


        {/* Profile & Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="flex flex-col items-start text-left">
            <Image
              src="/static/images/eren.jpeg" // Replace with your image path
              alt={siteMetadata.author}
              width={200} // Adjust size to match screenshot
              height={200}
              className="rounded-xl mb-4"
            />
            <h2 className="text-2xl font-bold">{siteMetadata.author}</h2>
            <p className="text-gray-600">{siteMetadata.occupation}</p>

            
          </div>

          {/* Content Section */}
          <div className="md:col-span-2 prose prose-lg">
            <Component />
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps() {
  const source = fs.readFileSync(
    path.join(process.cwd(), "data/about/about.mdx"),
    "utf8"
  );
  const { content } = matter(source);
  const mdxSource = await bundleMDX({ source: content });

  return {
    props: {
      mdxSource: mdxSource.code,
    },
  };
}
