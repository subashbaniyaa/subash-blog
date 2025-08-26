import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import PageTitle from "@/components/PageTitle";
import { MDXLayoutRenderer } from "@/components/MDXComponents";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";

const DEFAULT_LAYOUT = "PostLayout";

export default function About({ mdxSource, frontMatter }) {
  return (
    <>
      <PageSEO
        title={`About - ${siteMetadata.author}`}
        description={`About me - ${siteMetadata.author}`}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>About</PageTitle>
      </div>
      <MDXLayoutRenderer
        layout={DEFAULT_LAYOUT}
        mdxSource={mdxSource}
        frontMatter={frontMatter}
      />
    </>
  );
}

export async function getStaticProps() {
  const source = fs.readFileSync(path.join(process.cwd(), "data/about/about.mdx"), "utf8");

  const { content, data } = matter(source);

  const mdxSource = await bundleMDX({ source: content });

  return {
    props: {
      mdxSource: mdxSource.code,
      frontMatter: {
        ...data,
        date: data.date ? new Date(data.date).toISOString() : null,
      },
    },
  };
}
