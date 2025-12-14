import { useState } from "react";

export default function Index() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "Is there a free trial available?",
      answer:
        "Find quick answers to the questions you're most likely to have. From event details to general information, everything you need is right here. Explore the FAQs to make your experience smoother.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Find quick answers to the questions you're most likely to have. From event details to general information, everything you need is right here. Explore the FAQs to make your experience smoother.",
    },
    {
      question: "Is there a free trial available?",
      answer:
        "Find quick answers to the questions you're most likely to have. From event details to general information, everything you need is right here. Explore the FAQs to make your experience smoother.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="min-h-screen bg-[#E8E8E8] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-[1440px]">
        <div className="text-center mb-12">
          <div
            className="text-[24px] font-bold uppercase mb-2"
            style={{
              fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif",
              WebkitTextStroke: "1px #707070",
              color: "transparent",
            }}
          >
            FAQ's
          </div>
          <h1
            className="text-[36px] font-bold uppercase text-black mb-4"
            style={{
              fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Frequently asked questions
          </h1>
          <p
            className="text-[16px] text-[#3A3A3A] max-w-[851px] mx-auto"
            style={{
              fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif",
            }}
          >
            Find quick answers to the questions you're most likely to have. From
            event details to general information, everything you need is right
            here. Explore the FAQs to make your experience smoother.
          </p>
        </div>

        <div className="max-w-[768px] mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div key={index}>
              <div
                className="flex justify-between items-start cursor-pointer py-4"
                onClick={() => toggleFaq(index)}
              >
                <div
                  className="flex-1 text-[16px] text-black font-bold"
                  style={{
                    fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  {faq.question}
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
              </div>
              {openIndex === index && (
                <div
                  className="text-[16px] text-[#3A3A3A] pb-4 max-w-[711px]"
                  style={{
                    fontFamily: "'Istok Web', -apple-system, Roboto, Helvetica, sans-serif",
                  }}
                >
                  {faq.answer}
                </div>
              )}
              {index < faqs.length - 1 && (
                <div className="border-b border-gray-300"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
