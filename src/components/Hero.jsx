function Hero() {
  return (
    <section
      id="home"
      className="bg-gradient-to-r from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-12 sm:py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">

        {/* Left Side */}
        <div className="text-center lg:text-left">

          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight animate-fade-in-up">
            AI Code Reviewer

            <span className="text-blue-600 block mt-2">
              Powered by Gemini AI
            </span>
          </h1>

          <p className="mt-5 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-7 sm:leading-8 max-w-xl mx-auto lg:mx-0">
            Analyze your code instantly with AI.
            Detect bugs, improve code quality,
            optimize performance, and prepare for
            technical interviews in seconds.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center lg:justify-start">

            <button
              onClick={() =>
                document
                  .getElementById("editor")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all duration-300 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-blue-500/40"
            >
              🚀 Start AI Review
            </button>



          </div>

        </div>

        {/* Right Side */}

        <div className="flex justify-center mt-10 lg:mt-0">

          <img
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=900"
            alt="AI Code Reviewer"
            className="w-full rounded-2xl shadow-2xl object-cover transition-all duration-500 hover:scale-105 hover:shadow-blue-500/30"
          />
        </div>

      </div>
    </section>
  );
}

export default Hero;

