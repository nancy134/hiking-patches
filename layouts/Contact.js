import config from "@config/config.json";
import { markdownify } from "@lib/utils/textConverter";

const Contact = ({ data }) => {
  const { frontmatter } = data;
  const { title, info } = frontmatter;
  const { contact_form_action } = config.params;

  return (
    <section className="section">
      <div className="container">
        {markdownify(title, "h1", "text-center font-normal")}
        <div className="h4 text-center">
        We'd love to hear from you!
        </div>
        <div className="h4 text-center">
        Email us at support@hiking-patches.com
        </div>
      </div>
    </section>
  );
};

export default Contact;
