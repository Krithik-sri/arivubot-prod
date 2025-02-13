import { GetServerSideProps } from 'next';
import { useState } from 'react';

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

interface FaqPageProps {
  chatbotid: string;
  faqs: Faq[];
}

const FaqPage = ({ chatbotid, faqs: initialFaqs }: FaqPageProps) => {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs);

  return (
    <div>
      <h1>FAQs for Chatbot: {chatbotid}</h1>
      <ul>
        {faqs.map((faq) => (
          <li key={faq._id}>
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params!;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/faq/${slug}`);
  const faqs = await res.json();

  return {
    props: {
      chatbotid: slug,
      faqs,
    },
  };
};

export default FaqPage;
