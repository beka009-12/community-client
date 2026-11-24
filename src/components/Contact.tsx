import PageIntro from "@/src/ui/PageIntro";
import RequestForm from "@/src/components/contact-sections/RequestForm";
import NextSteps from "@/src/components/contact-sections/NextSteps";
import scss from "./Contact.module.scss";

// The one public page where a client (no account) submits a ClientRequest.
const Contact = () => (
  <>
    <PageIntro
      className={scss.intro}
      crumb="Контакты"
      title={"Расскажите\nо проекте."}
      lead="Изучим заявку и вернёмся с вопросами или предложением. Достаточно пары предложений — детали обсудим на созвоне."
    />
    <div>
      <div className={`container ${scss.layout}`}>
        <RequestForm />
        <NextSteps />
      </div>
    </div>
  </>
);

export default Contact;
