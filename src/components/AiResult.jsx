import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";

function AIResult({
  review,
  reviewLoading,
  explainLoading,
  reviewTime,
  mode,
  analysis,
}) {
  const loadingSteps = [
    "🔍 Checking syntax...",
    "🐞 Detecting bugs...",
    "💡 Finding improvements...",
    "⚡ Optimizing code...",
  ];

  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!reviewLoading && !explainLoading) {
      setStep(0);
      return;
    }

    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % loadingSteps.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [reviewLoading, explainLoading]);
  const scoreMatch = review?.match(/(\d+)\s*\/\s*100/);
  console.log(review);
  const score = scoreMatch ? scoreMatch[1] : null;


  const copyReview = () => {
    if (!review) return;

    navigator.clipboard.writeText(review);
    toast.success("Review copied successfully!");
  };

  const downloadReview = () => {
    if (!review) return;

    const blob = new Blob([review], { type: "text/markdown" });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-code-review.md";
    a.click();

    window.URL.revokeObjectURL(url);
  };

  const downloadPDF = () => {
    if (!review) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("AI Code Review Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Mode: ${mode === "review" ? "Code Review" : "Code Explanation"}`, 20, 35);

    if (mode === "review" && score) {
      doc.text(`Code Quality Score: ${score}/100`, 20, 45);
    }

    if (reviewTime) {
      doc.text(`Review Time: ${reviewTime} sec`, 20, 55);
    }

    doc.setFontSize(11);

    const lines = doc.splitTextToSize(review, 170);

    doc.text(lines, 20, 70);

    doc.save("AI-Code-Review.pdf");
    toast.success("PDF downloaded successfully!");
  };

  const [question, setQuestion] = useState("");

  const handleAskAI = async () => {

    if (!question.trim()) return;

    setChatLoading(true);

    try {

      const response = await fetch("https://ai-code-reviewer-z00c.onrender.com/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review,
          question,
        }),
      });

      const data = await response.json();

      if (data.success) {

        setMessages((prev) => [
          ...prev,
          {
            question,
            answer: data.answer,
          },
        ]);

        setQuestion("");

      }

    } catch (err) {

      console.log(err);

    } finally {

      setChatLoading(false);

    }

  };

  if (reviewLoading || explainLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[650px] flex items-center justify-center transition-all duration-300">
        <div className="text-center">

          <div className="w-14 h-14 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>

          <h2 className="text-2xl font-bold mt-6">
            {mode === "review"
              ? "🤖 AI is reviewing your code..."
              : "📖 AI is explaining your code..."}
          </h2>
          <p className="text-blue-600 text-lg font-semibold mt-4">
            {loadingSteps[step]}
          </p>
          <p className="text-gray-500 dark:text-gray-300 mt-6">
            Please wait while Gemini AI analyzes your code.
          </p>

        </div>
      </div>
    );
  }
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 h-[650px] overflow-y-auto transition-all duration-300">

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold text-black dark:text-white">
          {mode === "review" ? "🤖 AI Review Result" : "📖 Code Explanation"}
        </h2>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={copyReview}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            📋 Copy Review
          </button>

          <button
            onClick={downloadPDF}
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-all duration-200"
          >
            📄 Download PDF
          </button>
        </div>
      </div>
      {mode === "review" && (
        <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6 text-center sm:text-left">

          <p className="text-sm text-green-700 font-medium">
            Code Quality Score
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
            {score ? `${score} / 100` : "-- / 100"}
          </h2>
        </div>
      )}
      {analysis && mode === "review" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              📄 Lines
            </p>
            <h2 className="text-2xl font-bold text-blue-900 dark:text-white">
              {analysis.lines}
            </h2>
          </div>

          <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4">
            <p className="text-sm text-green-700 dark:text-green-300">
              ⚙ Functions
            </p>
            <h2 className="text-2xl font-bold text-green-900 dark:text-white">
              {analysis.functions}
            </h2>
          </div>

          <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4">
            <p className="text-sm text-purple-700 dark:text-purple-300">
              📝 Variables
            </p>
            <h2 className="text-2xl font-bold text-purple-900 dark:text-white">
              {analysis.variables}
            </h2>
          </div>

          <div className="bg-orange-100 dark:bg-orange-900 rounded-lg p-4">
            <p className="text-sm text-orange-700 dark:text-orange-300">
              🚀 Complexity
            </p>
            <h2 className="text-2xl font-bold text-orange-900 dark:text-white">
              {analysis.complexity}
            </h2>
          </div>

        </div>
      )}
      {mode === "review" && reviewTime && (
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 mb-6">
          <p className="text-blue-700 font-semibold">
            ⚡ Review completed in {reviewTime} sec
          </p>
        </div>
      )}
      <div className="prose prose-sm sm:prose lg:prose-lg max-w-none dark:prose-invert break-words overflow-x-auto">
        {review ? (
          <ReactMarkdown
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");

                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {review ||
              (mode === "review"
                ? "AI review will appear here..."
                : "Code explanation will appear here...")}
          </ReactMarkdown>
        ) : (
          <p>
            {mode === "review"
              ? "AI review will appear here..."
              : "Code explanation will appear here..."}
          </p>
        )}
      </div>

    </div>
  );
}

export default AIResult;