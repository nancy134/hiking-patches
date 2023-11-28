import config from "@config/config.json";
import PeakSingle from "@layouts/PeakSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { peak_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  const { frontmatter, content } = post[0];

  return (
    <PeakSingle
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
  const allSlug = getSinglePage(`content/${peak_folder}`);
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

// get peak single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const peakPages = getSinglePage(`content/${peak_folder}`);
  const peakPage = peakPages.filter((p) => p.slug == single);
  var peakPageContent = peakPage[0].content

  // Get hike-peak pages (ie, data/hike-peak
  const hikePeakPages = getSinglePage('data/hike-peak');
  // Loop through to see if this Peak is in a hike
  var hikes=[];
  for (var i=0; i<hikePeakPages.length; i++){
    var hikePeakContent = hikePeakPages[i].content;
    var hikePeaks = hikePeakContent.split('\n');
    for (var j=0; j<hikePeaks.length; j++){
      if (hikePeaks[j] == single){
        hikes.push(hikePeakPages[i].slug);
      }
    }
  }
  console.log(hikes);

  // ### Upcoming Hikes
  peakPageContent += '\n';
  peakPageContent += "### Upcoming Hikes\n";
  peakPageContent += "|Date|Title|\n";
  peakPageContent += "|--|--|\n";

  for (var l=0; l<hikes.length; l++){
     const hikePages = getSinglePage('content/hikes');
     const hikePage = hikePages.filter((p) => p.slug == hikes[l]);

     var date = new Date(Date.parse(hikePage[0].frontmatter.date));

     peakPageContent +=
       "|" + date.toDateString() +
       "|" + "[" + hikePage[0].frontmatter.title + "](" + "../hikes/" + hikePage[0].slug + ")" +
       "|\n";
  } 
  const mdxContent = await parseMDX(peakPageContent);

  return {
    props: {
      post: peakPage,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
