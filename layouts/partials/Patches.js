import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Patches = ({ posts }) => {
  const { patch_folder, summary_length } = config.settings;
  return (
    <div className="section row pb-0">
      {posts.map((post, i) => (
        <div key={`key-${i}`} className="col-12 mb-8 sm:col-6 lg:col-4">
          {post.frontmatter.image && (
            <Image
              className="rounded-lg"
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={i === 0 ? "925" : "445"}
              height={i === 0 ? "475" : "230"}
            />
          )}
          <h2 className="h3 mb-2 mt-4">
            <Link
              href={`/${patch_folder}/${post.slug}`}
              className="block hover:text-primary"
            >
              {post.frontmatter.title}
            </Link>
          </h2>
          <p className="text-text">{post.frontmatter.description}</p>
          <Link
            className="btn btn-primary mt-4"
            href={`/${patch_folder}/${post.slug}`}
            rel=""
          >
            Read More
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Patches;
