import LanguageChart from "./LanguageChart";
import { useEffect, useState } from "react";
import Codeeditor from "./Codeeditor";
import AiResult from "./AiResult";
import ReviewHistory from "./ReviewHistory";
import ReviewStats from "./ReviewStats";
import ReviewChart from "./ReviewChart";



function EditorSection({ darkMode }) {
  const [analysis, setAnalysis] = useState(null);
  const [review, setReview] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);
  const [explainLoading, setExplainLoading] = useState(false);
  const [reviewTime, setReviewTime] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem("reviewHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });
  const [mode, setMode] = useState("review");
  useEffect(() => {
    localStorage.setItem(
      "reviewHistory",
      JSON.stringify(history)
    );
  }, [history]);
  return (
    <section
      id="editor"
      className="bg-gray-100 dark:bg-gray-900 py-20 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white">
            Analyze Your Code
          </h2>

          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mt-3">
            Paste your code and get instant AI-powered feedback.
          </p>
        </div>

        <ReviewStats history={history} />
        <ReviewChart history={history} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

          <Codeeditor
            review={review}
            setReview={setReview}
            reviewLoading={reviewLoading}
            setReviewLoading={setReviewLoading}
            explainLoading={explainLoading}
            setExplainLoading={setExplainLoading}
            history={history}
            setHistory={setHistory}
            reviewTime={reviewTime}
            setReviewTime={setReviewTime}
            mode={mode}
            setMode={setMode}
            darkMode={darkMode}
            analysis={analysis}
            setAnalysis={setAnalysis}
          />

          <AiResult
            review={review}
            loading={mode === "review" ? reviewLoading : explainLoading}
            reviewTime={reviewTime}
            mode={mode}
            analysis={analysis}
          />

        </div>
        <div className="mt-8">
          <div className="mt-8">
            <LanguageChart history={history} />
          </div>
          <ReviewHistory
            history={history}
            setHistory={setHistory}
          />
        </div>

      </div>
    </section>
  );
}

export default EditorSection;