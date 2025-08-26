import { visit } from "unist-util-visit";
import Slugger from "github-slugger"; // use Slugger, not GitHubSlugger
import { toString } from "hast-util-to-string";
import { Pluggable } from "unified";

export default function remarkTocHeadings(options: any): Pluggable {
  return (tree: any) => {
    const slugger = new Slugger(); // create an instance

    visit(tree, "heading", (node) => {
      const textContent = toString(node);
      options.exportRef.push({
        value: textContent,
        url: "#" + slugger.slug(textContent), // call slug on instance
        depth: (node as any).depth,
      });
    });
  };
}
