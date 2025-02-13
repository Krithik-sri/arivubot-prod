"use client";

import Image from "next/image";

export default function HowItWorks() {
  const steps = [
    {
      image: "/images/import-data.png",
      title: "Import your data",
      description:
        "Connect your data sources, upload files, or add a website for crawling, and Chatbase will use all of that data to train your chatbot.",
    },
    {
      image: "/images/customize-behavior.png",
      title: "Customize behavior & appearance",
      description:
        "Make your chatbot look like it’s part of your website with custom colors and logos and match it to your brand's personality.",
    },
  ];

  const steps2 = [
    {
      image: "/images/embed-website.png",
      title: "Embed on your website",
      description: "Add a chat widget to any website with a simple embed code.",
    },
    {
      image: "/images/integrate-tools.png",
      title: "Integrate with your tools",
      description:
        "Connect your chatbot to your favorite tools like Slack, WhatsApp, Zapier, and more.",
    },
    {
      image: "/images/maintained.png",
      title: "Effortlessly maintained",
      description: "Designed to make updating documentation easy.",
    },
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className=" mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">HOW IT WORKS</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add your data sources, train the AI, customize it to your liking,
            and add it to your website.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-2 mx-auto max-w-[1000px]">
          {/* Import Data Section */}
          {steps.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 mb-2">
              <div className="mb-6">
                <Image
                  src={step.image}
                  alt="AI-powered data imports interface"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
          {/* Customize Section */}
        </div>
        <div className="grid md:grid-cols-3 gap-2  mx-auto max-w-[1000px]">
          {/* Import Data Section */}
          {steps2.map((step, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6">
              <div className="aspect-video relative mb-6">
                <Image
                  src={step.image}
                  alt="AI-powered data imports interface"
                  width={300}
                  height={200}
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
          {/* Customize Section */}
        </div>
      </div>
    </section>
  );
}
