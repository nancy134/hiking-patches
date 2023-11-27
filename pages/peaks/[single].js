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

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage(`content/${peak_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
    },
  };
};

export default Article;
