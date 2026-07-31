import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const API = import.meta.env.VITE_API_URL;

function ChatBox({ review }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const askAI = async () => {
    if (!review) {
      toast.error("Review the code first.");
      return;
    }

    if (!question.trim()) {
      toast.error("Enter your question.");
      return;
    }

    try {
      setLoading(true);

      const { data } = await axios.post(`${API}/chat`, {
        review,
        question,
      });

      console.log(data);

      setAnswer(data.answer);
    } catch (err) {
      toast.error("Failed to get AI response.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 border-t border-gray-300 dark:border-gray-700 pt-6">
      <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">
        💬 Ask AI About This Review
      </h2>

      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask anything about this review..."
        className="w-full h-28 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white p-3 outline-none"
      />

      <button
        onClick={askAI}
        disabled={loading}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {answer && (
        <div className="mt-6 bg-gray-100 dark:bg-gray-900 rounded-lg p-5 prose dark:prose-invert max-w-none">
          <ReactMarkdown>{answer}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

export default ChatBox;