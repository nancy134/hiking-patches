import config from "@config/config.json";
import PatchSingle from "@layouts/PatchSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { patch_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug, data }) => {
  const { frontmatter, content } = post[0];
  return (
    <PatchSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${patch_folder}`);
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;

  // Get patch page (ie, content/patches/patch-52-wav.md)
  const patchPages = getSinglePage(`content/${patch_folder}`);
  const patchPage = patchPages.filter((p) => p.slug == single);
  var patchPageContent = patchPage[0].content;

  // Get patch-peak page (ie, data/patch-peak/patch-52-wav.md)
  const patchPeakPages = getSinglePage('data/patch-peak'); 
  const patchPeakPage = patchPeakPages.filter((p) => p.slug == single);

  if (patchPeakPage.length > 0){
    // Get all the peaks for this patch
    const patchPeaks = patchPeakPage[0].content.split('\n');

    // Get all the peaks (ie, content/peaks/*.md)
    const peakPages = getSinglePage('content/peaks');

    // Loop through all the peaks for this patch and create the Peaks table
    patchPageContent += "\n";
    patchPageContent += "### Peaks\n"
    patchPageContent += "||Peak|Elevation|\n|--|--|--:|\n";
    for (var i=0; i<patchPeaks.length; i++){
      if (patchPeaks[i].length > 0){
        const peakPage = peakPages.filter((p) => p.slug == patchPeaks[i]);
        patchPageContent += 
          "|" + (i+1) + "|" +
	  "[" + peakPage[0].frontmatter.title + "](" + "../peaks/" + peakPage[0].slug + ")" + "|" +
          peakPage[0].frontmatter.elevation + " ft|" + "\n";
      }
    }
  }
  const mdxContent = await parseMDX(patchPageContent); 
  return {
    props: {
      post: patchPage,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
