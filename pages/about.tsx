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

  const mdxComponents = {
    h1: (props) => <h1 className="text-gray-900 dark:text-gray-100" {...props} />,
    h2: (props) => <h2 className="text-gray-900 dark:text-gray-100" {...props} />,
    h3: (props) => <h3 className="text-gray-900 dark:text-gray-100" {...props} />,
    p: (props) => <p className="text-gray-700 dark:text-gray-300" {...props} />,
    a: (props) => <a className="text-primary-500 dark:text-primary-400" {...props} />,
    code: (props) => <code className="bg-gray-100 dark:bg-gray-800 text-green-500 px-1 rounded" {...props} />,
    ul: (props) => <ul className="list-disc ml-6 text-gray-700 dark:text-gray-300" {...props} />,
    ol: (props) => <ol className="list-decimal ml-6 text-gray-700 dark:text-gray-300" {...props} />,
    blockquote: (props) => <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic text-gray-700 dark:text-gray-300" {...props} />
  };

  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
      />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Left Panel */}
          <div className="md:w-1/3 flex flex-col items-start gap-6">
            {/* Scrolling About Title */}
            <h1 className="text-5xl mb-10 text-gray-900 dark:text-gray-100 font-boring-heavy">
              About
            </h1>

            {/* Sticky Profile */}
            <div className="md:sticky md:top-20 flex flex-col items-center gap-4">
              <Image
                src="/static/images/minecraftt.png"
                alt={siteMetadata.author}
                width={200}
                height={200}
                className="rounded-xl"
              />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {siteMetadata.author}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                Web Designer
              </p>
            </div>
          </div>

          {/* Right Panel */}
          <div className="md:w-2/3 prose prose-lg dark:prose-invert space-y-6 md:mt-20">
            <Component components={mdxComponents} />
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
