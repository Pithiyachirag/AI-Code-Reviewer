function Features() {
  const features = [
    {
      title: "AI Code Review",
      description: "Get instant feedback on your code using AI.",
    },
    {
      title: "Error Detection",
      description: "Find syntax and logical mistakes quickly.",
    },
    {
      title: "Interview Ready",
      description: "Receive suggestions like a real interviewer.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 p-6 rounded-xl shadow hover:shadow-lg transition"
            >
              <h3 className="text-xl font-bold mb-4">
                {feature.title}
              </h3>

              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;