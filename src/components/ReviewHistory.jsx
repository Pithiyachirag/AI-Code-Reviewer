
import toast from "react-hot-toast";
import { useState } from "react";
function ReviewHistory({ history, setHistory }) {
    const [search, setSearch] = useState("");
    const [filterLanguage, setFilterLanguage] = useState("All");

    const deleteReview = (indexToDelete) => {

        setHistory((prev) =>
            prev.filter((_, index) => index !== indexToDelete)
        );

        toast.success("Review deleted successfully!");

    };
    const clearAllReviews = () => {

        if (!window.confirm("Are you sure you want to delete all reviews?")) {
            return;
        }

        setHistory([]);

        localStorage.removeItem("reviewHistory");

        toast.success("All reviews deleted!");

    };
    const exportCSV = () => {
        console.log("Export CSV Clicked");
        if (history.length === 0) {
            toast.error("No reviews to export!");
            return;
        }

        const csv = [
            ["Language", "Time", "Review"],
            ...history.map(item => [
                item.language,
                item.time,
                (item.review || "").replace(/\n/g, " ")
            ])
        ];

        const csvContent = csv
            .map(row => row.map(col => `"${col}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "review-history.csv";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        URL.revokeObjectURL(url);

        toast.success("CSV exported successfully!");

    };
    const exportJSON = () => {

        if (history.length === 0) {
            toast.error("No reviews to export!");
            return;
        }

        const blob = new Blob(
            [JSON.stringify(history, null, 2)],
            {
                type: "application/json",
            }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download = "review-history.json";

        link.click();

        URL.revokeObjectURL(url);

        toast.success("JSON exported successfully!");

    };

    const importJSON = (event) => {

        const file = event.target.files[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {

            try {

                const importedHistory = JSON.parse(e.target.result);

                if (!Array.isArray(importedHistory)) {
                    throw new Error();
                }

                setHistory(importedHistory);

                localStorage.setItem(
                    "reviewHistory",
                    JSON.stringify(importedHistory)
                );

                toast.success("History imported successfully!");

            } catch {

                toast.error("Invalid JSON file!");

            }

        };

        reader.readAsText(file);

        // Same file dobara select karne ke liye
        event.target.value = "";

    };

    if (history.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-10 mt-8 text-center transition-all duration-300">

                <div className="text-6xl mb-4">
                    📂
                </div>

                <h2 className="text-2xl font-bold text-black dark:text-white">
                    No Reviews Yet
                </h2>

                <p className="text-gray-500 dark:text-gray-300 mt-3">
                    Start reviewing your code and your history will appear here.
                </p>

            </div>
        );
    }

    return (

        <div
            id="history"
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-8 max-w-7xl mx-auto transition-all duration-300"
        >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">

                <h2 className="text-2xl font-bold text-black dark:text-white">
                    Review History
                </h2>

                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">

                    <button
                        onClick={exportCSV}
                        className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        📊 Export CSV
                    </button>

                    <button
                        onClick={exportJSON}
                        className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
                    >
                        📄 Export JSON
                    </button>

                    <label
                        className="w-full sm:w-auto text-center bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition cursor-pointer"
                    >
                        📥 Import JSON

                        <input
                            type="file"
                            accept=".json"
                            onChange={importJSON}
                            className="hidden"
                        />
                    </label>

                    {history.length > 0 && (
                        <button
                            onClick={clearAllReviews}
                            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                        >
                            🗑 Clear All
                        </button>
                    )}

                </div>

            </div>
            <input
                type="text"
                placeholder="🔍 Search by language or review..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <select
                value={filterLanguage}
                onChange={(e) => setFilterLanguage(e.target.value)}
                className="w-full mb-5 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-black dark:text-white"
            >
                <option value="All">All Languages</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="c">C</option>
                <option value="php">PHP</option>
            </select>
            {history.length === 0 ? (
                <p className="text-gray-500">
                    No reviews yet.
                </p>
            ) : (
                <div className="space-y-4">
                    {history
                        .filter((item) => {
                            const text = search.toLowerCase();

                            return (
                                (filterLanguage === "All" ||
                                    item.language === filterLanguage) &&
                                (
                                    item.language.toLowerCase().includes(text) ||
                                    item.review.toLowerCase().includes(text)
                                )
                            );
                        })
                        .slice(0, 5)
                        .map((item, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-lg p-4 transition-all duration-300"
                            >
                                <div className="flex justify-between items-center mb-2">

                                    <div>
                                        <span className="font-semibold capitalize text-black dark:text-white">
                                            {item.language}
                                        </span>

                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            {item.time}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => deleteReview(index)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
                                    >
                                        🗑 Delete
                                    </button>

                                </div>

                                <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                                    {item.review?.slice(0, 200) || "Review not available"}
                                </p>
                            </div>
                        ))}
                </div>
            )}
        </div>
    );
}

export default ReviewHistory;