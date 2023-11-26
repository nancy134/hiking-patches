import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Hikes = ({ posts }) => {
  const { hike_folder, summary_length } = config.settings;
  return (
    <div className="section row pb-0">
      {posts.slice(0).map((post, i) => (
        <div key={`key-${i}`}>
          <div className="row">
            <div className="col-2">
              <p className="">
              {post.frontmatter.fdate}
              </p>
            </div>
            <div className="col-6">
              <p>
              <Link
                href={`/${hike_folder}/${post.slug}`}
                className="block text-primary"
              >
              {post.frontmatter.title}
              </Link>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Hikes;
