"use client";

export default function ChooseLLM() {
  const models = [
    { name: "GPT-4", logo: "/logos/gpt-4.png" },
    { name: "Claude 3.5", logo: "/logos/claude-3.5.png" },
    { name: "Grok", logo: "/logos/grok.png" },
    { name: "Gemini", logo: "/logos/gemini.png" },
    { name: "Mistral AI", logo: "/logos/mistral-ai.png" },
  ];

  const models2 = [
    { name: "Gemma", logo: "/logos/gemma.png" },
    { name: "Pythia", logo: "/logos/pythia.png" },
    { name: "Sora", logo: "/logos/sora.png" },
    { name: "Meta", logo: "/logos/meta.png" },
  ];

  return (
    <div className=" flex flex-col items-center justify-center bg-white text-center">
      <h2 className="text-xl sm:text-3xl font-semibold mt-20 mb-8">
        Choose your LLM
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center justify-center">
        {models.map((model, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center space-y-3"
          >
            <img
              src={model.logo}
              alt={`${model.name} Logo`}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 items-center justify-center ml-24">
        {models2.map((model, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center space-y-3"
          >
            <img
              src={model.logo}
              alt={`${model.name} Logo`}
              className="w-32 h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
