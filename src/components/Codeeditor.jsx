import { useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import Select from "react-select";

function CodeEditor({
    review,
    setReview,
    reviewLoading,
    setReviewLoading,
    explainLoading,
    setExplainLoading,
    history,
    setHistory,
    reviewTime,
    setReviewTime,
    mode,
    setMode,
    darkMode,
    analysis,
    setAnalysis,
}) {
    const [code, setCode] = useState("// Write your code here");

    const [language, setLanguage] = useState(null);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const [fileSize, setFileSize] = useState("");
    const fileInputRef = useRef(null);
    const detectLanguage = (fileName) => {
        const ext = fileName.split(".").pop().toLowerCase();

        switch (ext) {
            case "js":
                return "javascript";
            case "py":
                return "python";
            case "java":
                return "java";
            case "cpp":
                return "cpp";
            case "c":
                return "c";
            case "php":
                return "php";
            default:
                return "";
        }
    };

    const handleFileUpload = (e) => {

        const file = e.target.files[0];

        setFileName(file.name);
        setFileSize((file.size / 1024).toFixed(2));

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (event) => {

            setCode(event.target.result);

            const lang = detectLanguage(file.name);

            setLanguage(lang);

        };

        reader.readAsText(file);

    };
    const languageOptions = [
        { value: "javascript", label: "🟨 JavaScript" },
        { value: "python", label: "🐍 Python" },
        { value: "java", label: "☕ Java" },
        { value: "cpp", label: "⚙️ C++" },
        { value: "c", label: "💻 C" },
        { value: "php", label: "🐘 PHP" },
    ];




    const handleClear = () => {
        setCode("// Write your code here");
        setReview("");
    };




    const handleReview = async () => {

        if (!language) {
            alert("Please select a programming language.");
            return;
        }
        const startTime = performance.now();
        const lines = code.split("\n").filter(line => line.trim() !== "").length;

        const functions =
            (code.match(/function\s+\w+|=>/g) || []).length;

        const variables =
            (code.match(/\b(const|let|var)\b/g) || []).length;

        let complexity = "Easy";

        if (lines > 30 || functions > 3) {
            complexity = "Medium";
        }

        if (lines > 80 || functions > 8) {
            complexity = "Hard";
        }

        setAnalysis({
            lines,
            functions,
            variables,
            complexity,
        });

        setError("");
        setReviewLoading(true);
        setMode("review");

        console.log({
            language,
            code,
        });



        try {

            const response = await fetch("http://localhost:5000/review", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    language,
                    code,
                }),
            });

            const data = await response.json();


            console.log("Review Response:", data);

            if (data.success) {
                setReview(data.review);

                const endTime = performance.now();
                setReviewTime(((endTime - startTime) / 1000).toFixed(2));

                setHistory((prev) => [
                    {
                        language,
                        review: data.review,
                        time: new Date().toLocaleTimeString(),
                    },
                    ...prev,
                ]);

            } else {
                setReview(`# ❌ Error\n\n${data.message}`);
            }
            const endTime = performance.now();

            setReviewTime(((endTime - startTime) / 1000).toFixed(2));

            setHistory((prev) => [
                {
                    language,
                    review: data.review,
                    time: new Date().toLocaleTimeString(),
                    date: new Date().toISOString(),
                    reviewTime: ((endTime - startTime) / 1000).toFixed(2),
                },
                ...prev,
            ]);

        } catch (error) {

            console.log(error);

            setError("❌ Unable to connect to AI Server.");

            setReview("");

        } finally {

            setReviewLoading(false);

        }

    };

    const handleExplain = async () => {

        if (!language) {
            alert("Please select a programming language.");
            return;
        }

        setExplainLoading(true);
        setMode("explain");

        try {

            const response = await fetch("http://localhost:5000/explain", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json",
                },

                body: JSON.stringify({
                    language,
                    code,
                }),
            });

            const data = await response.json();

            setReview(data.explanation);

        } catch (error) {

            console.log(error);

        } finally {

            setExplainLoading(false);

        }
    };
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 transition-all duration-300 overflow-hidden">

            <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">Code Editor
            </h2>

            <div className="mb-4">
                <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                    Programming Language
                </label>

                <Select
                    options={languageOptions}
                    placeholder="Select Language"
                    value={languageOptions.find(
                        (item) => item.value === language
                    )}
                    onChange={(selected) => setLanguage(selected.value)}
                    isSearchable
                    styles={{
                        control: (base) => ({
                            ...base,
                            minHeight: "52px",
                            fontSize: "18px",
                            fontWeight: "600",
                            borderRadius: "12px",
                            borderColor: "#d1d5db",
                            ":hover": {
                                borderColor: "#2563eb",
                            },
                            boxShadow: "none",
                            cursor: "pointer",
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                            color: darkMode ? "#ffffff" : "#000000",
                        }),

                        singleValue: (base) => ({
                            ...base,
                            color: darkMode ? "#ffffff" : "#000000",
                        }),

                        placeholder: (base) => ({
                            ...base,
                            color: darkMode ? "#9ca3af" : "#6b7280",
                        }),

                        input: (base) => ({
                            ...base,
                            color: darkMode ? "#ffffff" : "#000000",
                        }),

                        option: (base, state) => ({
                            ...base,
                            fontSize: "17px",
                            padding: "12px",
                            backgroundColor: state.isFocused
                                ? "#2563eb"
                                : darkMode
                                    ? "#1f2937"
                                    : "#ffffff",

                            color: state.isFocused
                                ? "#ffffff"
                                : darkMode
                                    ? "#ffffff"
                                    : "#000000",

                            cursor: "pointer",
                        }),

                        menu: (base) => ({
                            ...base,
                            borderRadius: "12px",
                            overflow: "hidden",
                            backgroundColor: darkMode ? "#1f2937" : "#ffffff",
                        }),
                    }}
                />

                <div className="mt-4">
                    <label className="block mb-2 text-lg font-semibold text-gray-700 dark:text-gray-300">
                        Upload Code File
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept=".js,.py,.java,.cpp,.c,.php"
                        onChange={handleFileUpload}
                        className="block w-full text-sm text-gray-700 dark:text-gray-300
               file:mr-4 file:py-2 file:px-4
               file:rounded-lg file:border-0
               file:bg-blue-600 file:text-white
               hover:file:bg-blue-700"
                    />
                    {fileName && (
                        <div className="mt-4">
                            {!fileName && (
                                <label className="inline-block">

                                    <input
                                        type="file"
                                        accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.php"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />

                                    <span className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold transition-all duration-200 inline-block">
                                        📁 Upload Code File
                                    </span>

                                </label>
                            )}

                            {fileName && (
                                <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-green-50 dark:bg-gray-700 rounded-lg px-4 py-3 border border-green-200 dark:border-gray-600">

                                    <div>
                                        <p className="font-semibold text-green-700 dark:text-green-300">
                                            ✅ {fileName}
                                        </p>

                                        <p className="text-sm text-gray-500 dark:text-gray-300">
                                            {fileSize} KB
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setFileName("");
                                            setFileSize("");
                                            setCode("// Write your code here");
                                            setLanguage(null);
                                            setReview("");

                                            if (fileInputRef.current) {
                                                fileInputRef.current.value = "";
                                            }
                                        }}
                                        className="text-red-600 hover:text-red-700 font-semibold"
                                    >
                                        ✖ Remove
                                    </button>

                                </div>
                            )}

                        </div>
                    )}
                </div>
            </div>


            <Editor
                height="55vh"
                language={language}
                value={code}
                theme={darkMode ? "vs-dark" : "light"}
                onChange={(value) => setCode(value || "")}
            />
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3 text-sm text-gray-600 dark:text-gray-300">
                <span>Characters: {code.length}</span>

                <span>Lines: {code.split("\n").length}</span>
            </div>


            <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                    onClick={handleReview}
                    disabled={reviewLoading}
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    {reviewLoading ? "Reviewing..." : "Review Code"}
                </button>

                <button
                    onClick={handleExplain}
                    disabled={explainLoading}
                    className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200"
                >
                    {explainLoading ? "Explaining..." : "Explain Code"}
                </button>

                <button
                    onClick={handleClear}
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold"
                >
                    Clear
                </button>
            </div>
        </div>
    );
}

export default CodeEditor;