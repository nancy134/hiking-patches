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

  // Get hike-patch pages (ie, data/hike-patch)
  const hikePatchPages = getSinglePage('data/hike-patch');
  // Loop through to see if this patch is in hike
  var hikes = [];
  for (var j=0; j<hikePatchPages.length; j++){
      var hikePatchContent = hikePatchPages[j].content;
      var hikePatches = hikePatchContent.split('\n');
      for (var k=0; k<hikePatches.length; k++){
          if (hikePatches[k] == single){
              hikes.push(hikePatchPages[j].slug);
          }
      }
  }
  // ### Upcoming Hikes
  patchPageContent += "\n";
  patchPageContent += "### Upcoming Hikes\n";
  patchPageContent += "|Date|Title|\n";
  patchPageContent += "|--|--|\n";
  for (var l=0; l<hikes.length; l++){
     const hikePages = getSinglePage('content/hikes');
     const hikePage = hikePages.filter((p) => p.slug == hikes[l]);

     var date = new Date(Date.parse(hikePage[0].frontmatter.date));

     patchPageContent +=
       "|" + date.toDateString() +
       "|" + "[" + hikePage[0].frontmatter.title + "](" + "../hikes/" + hikePage[0].slug + ")" +
       "|\n";
  }

  // Get patch-peak page (ie, data/patch-peak/patch-52-wav.md)
  const patchPeakPages = getSinglePage('data/patch-peak'); 
  const patchPeakPage = patchPeakPages.filter((p) => p.slug == single);

  if (patchPeakPage.length > 0){
    // Get all the peaks for this patch
    const patchPeaks = patchPeakPage[0].content.split('\n');

    // Get all the peaks (ie, content/peaks/*.md)
    const peakPages = getSinglePage('content/peaks');

    // ### Peaks
    patchPageContent += "\n";
    patchPageContent += "### Peaks\n"
    patchPageContent += "||Peak|Elevation|\n|--|--|--:|\n";
    for (var i=0; i<patchPeaks.length; i++){
      console.log(patchPeaks[i]);
      if (patchPeaks[i].length > 0){
        const peakPage = peakPages.filter((p) => p.slug == patchPeaks[i]);
        patchPageContent += 
          "|" + (i+1) + "|" +
	  "[" + peakPage[0].frontmatter.title + "](" + "../peaks/" + peakPage[0].slug + ")" + "|" +
          peakPage[0].frontmatter.elevation + " ft|" + "\n";
      }
    }
  }

  // Get patch-trail page (ie, data/pack-trail/patch-lrct-achievement
  const patchTrailPages = getSinglePage('data/patch-trail');
  const patchTrailPage = patchTrailPages.filter((p) => p.slug == single);
  if (patchTrailPage.length > 0){

      // Get all the trails for this patch
      const patchTrails = patchTrailPage[0].content.split('\n');

      // Get all the trails (ie, content/trails/*.md)
      const trailPages = getSinglePage('content/trails');

      // ### Trails
      patchPageContent += "\n";
      patchPageContent += "### Trails\n";
      patchPageContent += "||Trail|Distance|\n|--|--|--:|\n";
      for (var m=0; m<patchTrails.length; m++){
        if (patchTrails[m].length > 0){
          const trailPage = trailPages.filter((p) => p.slug == patchTrails[m]);
          patchPageContent +=
            "|" + (m+1) + 
            "|" + trailPage[0].frontmatter.title + 
            "|" + trailPage[0].frontmatter.distance + " miles" + 
            "|" + "\n";
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
