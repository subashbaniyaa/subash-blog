import siteMetadata from "@/data/siteMetadata";
import NowPlaying from "./NowPlaying";
import CustomLink from "./CustomLink";

export default function Footer() {
  return (
    <footer>
      <div className="w-full text-sm text-gray-500 dark:text-gray-400 pb-8">
        <span>{`© ${new Date().getFullYear()} `}</span>
        <span className="text-black dark:text-white">{siteMetadata.author}</span>
        <span>
          {" "}
          All Rights Reserved.{" "}
          
        </span>
        <div className="w-full py-2">
          <NowPlaying />
        </div>
      </div>
    </footer>
  );
}
