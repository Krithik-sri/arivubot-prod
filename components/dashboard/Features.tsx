import React from "react";

const Features = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">POWERFUL FEATURES</h2>
          <p className="text-xl text-gray-600">
            Everything You Need For Your No-Code AI Chatbot.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="aspect-[4/3] mb-6 rounded-lg overflow-hidden">
              <img
                src="/images/gptmessage.png"
                alt="Chat interface showing accurate answers"
                className="w-[320px] h-[250px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">
              Trustworthy, Accurate Answers
            </h3>
            <p className="text-gray-600">
              With features like "Revise answers" and "Confidence score" you can
              be sure your chatbot is giving the right answers.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="aspect-[4/3] mb-6 rounded-lg overflow-hidden">
              <img
                src="/images/ailead.png"
                alt="AI Lead Generation illustration"
                className="w-[320px] h-[250px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI Lead Generation</h3>
            <p className="text-gray-600">
              Collect leads and gather your customer's data, all while providing
              a personalized experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="aspect-[4/3] mb-6 rounded-lg overflow-hidden">
              <img
                src="/images/advanced.png"
                alt="Analytics dashboard with purple graph"
                className="w-[320px] h-[250px] object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold mb-3">Advanced Analytics</h3>
            <p className="text-gray-600">
              Get insights into your chatbot's interactions with your customers
              and use them to improve its performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
