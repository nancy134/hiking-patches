import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Image from "next/image";
import Base from "./Baseof";

const PeakSingle = ({ frontmatter, content, mdxContent }) => {
  let { description, title, image, elevation, state } = frontmatter;
  description = description ? description : title;

  return (
    <Base title={title} description={description}>
      <section className="section">
        <div className="container">
          <div className="row">
            <article className="col-12 mx-auto text-center md:col-8">
              {markdownify(title, "h3", "h3 mb-6 mt-6 text-left")}
              <div className="text-left"><span className="font-bold">{state}</span></div>
              <div className="text-left"><span className="font-bold">Elevation: </span><span>{elevation} ft</span></div>
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

export default PeakSingle;
