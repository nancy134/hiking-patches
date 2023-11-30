import Pagination from "@components/Pagination";
import config from "@config/config.json";
import Base from "@layouts/Baseof";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { parseMDX } from "@lib/utils/mdxParser";
import { markdownify } from "@lib/utils/textConverter";
import Patches from "@partials/Patches";
import Link from "next/link";

const { patch_folder } = config.settings;

// patch pagination
const PatchPagination = ({ postIndex, posts, currentPage, pagination }) => {
  const indexOfLastPost = currentPage * pagination;
  const indexOfFirstPost = indexOfLastPost - pagination;
  const totalPages = Math.ceil(posts.length / pagination);
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const { frontmatter, content } = postIndex;
  const { title } = frontmatter;

  return (
    <Base title={title}>
      <section className="section">
        <div className="container">
          {markdownify(title, "h1", "h1 text-center font-normal text-[56px]")}

          <h4>Filters</h4>
          <Link
            href="/patches"
            className="cta-link inline-flex items-center text-primary mr-3"
          >All</Link>
          <Link
            href="/patches/page/newhampshire"
            className="cta-link inline-flex items-center text-primary mr-3"
          >New Hampshire</Link>
          <Link
            href="/patches/page/maine"
            className="cta-link inline-flex items-center text-primary mr-3"
          >Maine</Link>
          <Link
            href="/patches/page/vermont"
            className="cta-link inline-flex items-center text-primary mr-3"
          >Vermont</Link>
          <Link
            href="/patches/page/massachusetts"
            className="cta-link inline-flex items-center text-primary mr-3"
          >Massachusetts</Link>
         <Link
            href="/patches/page/newyork"
            className="cta-link inline-flex items-center text-primary mr-3"
          >New York</Link>


          <Patches posts={currentPosts} />
          <Pagination
            section={patch_folder}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      </section>
    </Base>
  );
};

export default PatchPagination;

// get Patch pagination slug
export const getStaticPaths = () => {
  const getAllSlug = getSinglePage(`content/${patch_folder}`);
  const allSlug = getAllSlug.map((item) => item.slug);
  const { pagination } = config.settings;
  const totalPages = Math.ceil(allSlug.length / pagination);
  let paths = [];

  for (let i = 1; i < totalPages; i++) {
    paths.push({
      params: {
        slug: (i + 1).toString(),
      },
    });
  }

  paths.push({params: {slug: 'newhampshire'}});
  paths.push({params: {slug: 'vermont'}});
  paths.push({params: {slug: 'newyork'}});
  paths.push({params: {slug: 'maine'}});
  paths.push({params: {slug: 'massachusetts'}});

  return {
    paths,
    fallback: false,
  };
};

// get patch pagination content
export const getStaticProps = async ({ params }) => {

  // State filters
  var state = null; 
  if (params && params.slug == "newhampshire") state = "New Hampshire";
  if (params && params.slug == "vermont") state = "Vermont";
  if (params && params.slug == "newyork") state = "New York";
  if (params && params.slug == "maine") state = "Maine";
  if (params && params.slug == "massachusetts") state = "Massachusetts";

  var currentPage = 1;
  if (!state) currentPage = parseInt((params && params.slug) || 1);

  var { pagination } = config.settings;

  var filters = null;
  if (state){
    filters = { states: state}
  }
  const posts = getSinglePage(`content/${patch_folder}`, filters).sort(
    (post1, post2) =>
      parseInt(post1.frontmatter.order) - parseInt(post2.frontmatter.order)
  );

  if (state) pagination - posts.length;

  const postIndex = await getListPage(`content/${patch_folder}/_index.md`);
  const mdxContent = await parseMDX(postIndex.content);

  return {
    props: {
      pagination: pagination,
      posts: posts,
      currentPage: currentPage,
      postIndex: postIndex,
      mdxContent: mdxContent,
    },
  };
};
