import siteMetadata from "@/data/siteMetadata";
import { PageSEO } from "@/components/SEO";
import PageTitle from "@/components/PageTitle";

export default function Notes() {
  return (
    <>
      <PageSEO
        title={`Notes - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <PageTitle>Notes</PageTitle>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400 xl:text-xl prose dark:prose-dark">
          Notion notes are currently disabled.
        </p>
      </div>
      <div className="container py-12">
        <p className="text-center text-gray-500 dark:text-gray-400">
          You have removed Notion integration to prevent build errors.
        </p>
      </div>
    </>
  );
}
