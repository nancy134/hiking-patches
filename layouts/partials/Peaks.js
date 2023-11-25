import config from "@config/config.json";
import { plainify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";

const Peaks = ({ posts }) => {
  const { peak_folder, summary_length } = config.settings;
  return (
    <div className="section row pb-0">
      {posts.slice(0).map((post, i) => (
        <div key={`key-${i}`} >
          <div className="row">
            <div className="col-3">
              <p className="">
                <Link
                  href={`/${peak_folder}/${post.slug}`}
                  className="block text-primary"
                >
                {post.frontmatter.title}
                </Link>
              </p>
            </div>
            <div className="col-2">
              <p>
              {post.frontmatter.elevation}
              </p>
            </div>
            <div className="col-2">
              <p>
              {post.frontmatter.state}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Peaks;
