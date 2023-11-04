import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Peaks = ({ posts }) => {
  const { peak_folder, summary_length } = config.settings;
  return (
    <div className="section row pb-0">
      {posts.slice(0).map((post, i) => (
        <div key={`key-${i}`} className="col-2">
          <p className="">
            <Link
              href={`/${peak_folder}/${post.slug}`}
              className="block hover:text-primary"
            >
              {post.frontmatter.title}
            </Link>
          </p>
          <p className="text-text">{post.frontmatter.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Peaks;
