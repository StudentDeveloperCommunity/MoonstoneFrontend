import { useState } from "react";

export default function Index() {
  const [openIndex, setOpenIndex] = useState(-1);

  const faqs = [
    {
      question: "What is Moonstone?",
      answer:
        "Moonstone is our annual cultural and technical fest featuring nail-biting techno-management competitions, intense sports challenges, exciting club activities, and captivating cultural performances. It's an unbeatable combination of talent and teamwork.",
    },
    
    {
      question: "How can I register for events?",
      answer:
        "You can register for events through our online registration portal. Simply visit the registration page, select your desired events, fill in your details, and complete the registration process. Early bird discounts are available for limited time.",
    },
    
    {
      question: "Can I participate in multiple events?",
      answer:
        "Absolutely! Students are encouraged to participate in multiple events across different categories. However, make sure to check event schedules to avoid timing conflicts. Some events may have team size limitations.",
    },
    {
      question: "Are there prizes for winners?",
      answer:
        "Yes, all competitions have exciting prizes for winners and runners-up. Prizes include cash awards, certificates, trophies, and merchandise from our sponsors. The prize distribution ceremony happens on the final day.",
    },
    
    {
      question: "How can I become a sponsor or partner?",
      answer:
        "We welcome sponsorships and partnerships from organizations. For sponsorship details and benefits, please contact our sponsorship team through the contact information provided on our website. Various sponsorship tiers are available.",
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    
    <div className="bg-black/40 flex items-center justify-center mt-8 py-2 px-4 sm:px-6 lg:px-6">
      <div className="w-full max-w-[1440px]">
        <div className="text-center mb-8">
          <h1
  
className="
    text-4xl md:text-5xl font-bold uppercase mb-4
    bg-gradient-to-r from-fuchsia-500 via-indigo-500 to-cyan-500
    bg-clip-text text-transparent
  "
>
  FAQ's
</h1>
          <div
            className="text-xl sm:text-2xl font-bold uppercase mb-3"
            style={{
              color: "white",
              // fontFamily: "Istok Web, sans-serif",
            }}
          >
            Frequently asked questions
            
          </div>

          


          <p
           className="text-gray-300 max-w-2xl mx-auto leading-relaxed"
            style={{
              fontFamily: "'Istok Web',sans-serif",
            }}
          >
            Find quick answers to the questions you're most likely to have. From
            event details to general information, everything you need is right
            here. Explore the FAQs to make your experience smoother.
          </p>
        </div>

        <div className="max-w-[800px] mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 overflow-hidden transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            >
              <div
                className="flex justify-between items-start cursor-pointer p-3 sm:p-4"
                onClick={() => toggleFaq(index)}
              >
                <div
                  className="flex-1 text-sm sm:text-base md:text-lg text-white font-bold pr-4"
                  style={{
                    fontFamily: "'Istok Web', sans-serif",
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
                      className="transition-transform duration-300"
                    >
                      <path
                        d="M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="white"
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
                      className="transition-transform duration-300"
                    >
                      <path
                        d="M12 8V16M8 12H16M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
                        stroke="white"
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
                  className="text-xs sm:text-sm md:text-base text-white px-3 sm:px-4 pb-3 sm:pb-4"
                  style={{
                    fontFamily: "'Istok Web', sans-serif",
                  }}
                >
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
