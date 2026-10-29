import PageIntro from "@/src/ui/PageIntro";
import RequestForm from "@/src/components/contact-sections/RequestForm";
import NextSteps from "@/src/components/contact-sections/NextSteps";
import scss from "./Contact.module.scss";

// The one public page where a client (no account) submits a ClientRequest.
const Contact = () => (
  <>
    <PageIntro
      title="Расскажите о проекте"
      lead="Изучим заявку и вернёмся с вопросами или предложением."
    />
    <div className={`container ${scss.layout}`}>
      <RequestForm />
      <NextSteps />
    </div>
  </>
);

export default Contact;
