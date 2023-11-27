import config from "@config/config.json";
import HikeSingle from "@layouts/HikeSingle";
import { getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
const { hike_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug }) => {
  const { frontmatter, content } = post[0];

  return (
    <HikeSingle
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
  const allSlug = getSinglePage(`content/${hike_folder}`);
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
  const posts = getSinglePage(`content/${hike_folder}`);
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
