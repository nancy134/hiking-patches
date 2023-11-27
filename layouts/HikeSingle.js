import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";

const HikeSingle = ({ frontmatter, content, mdxContent }) => {
  let { description, title, image, fdate } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {markdownify(title, "h3", "h3 mb-6 mt-6 text-left")}
              <div className="text-left">{fdate}</div>
              <div className="content mb-16 text-left">
                <MDXRemote {...mdxContent} components={shortcodes} />
              </div>
            </article>
          </div>
        </div>
      </section>
    </Base>
  );
};

export default HikeSingle;
