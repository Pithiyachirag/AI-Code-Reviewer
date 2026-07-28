function ReviewStats({ history }) {
    const totalReviews = history.length;

    const scores = history
        .map((item) => {
            const scoreMatch = item.review?.match(/(\d+)\s*\/\s*100/);
            return scoreMatch ? Number(scoreMatch[1]) : null;
        })
        .filter(Boolean);

    const averageScore =
        scores.length > 0
            ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
            : 0;

    const languageCount = {};

    history.forEach((item) => {
        languageCount[item.language] =
            (languageCount[item.language] || 0) + 1;
    });

    const mostUsedLanguage =
        Object.keys(languageCount).length > 0
            ? Object.keys(languageCount).reduce((a, b) =>
                languageCount[a] > languageCount[b] ? a : b
            )
            : "-";

    const lastReview =
        history.length > 0 ? history[0].time : "-";
    const bestScore = scores.length > 0 ? Math.max(...scores) : 0;

    const averageReviewTime =
        history.length > 0
            ? (
                history.reduce(
                    (sum, item) => sum + (parseFloat(item.reviewTime) || 0),
                    0
                ) / history.length
            ).toFixed(2)
            : 0;

    const todayReviews = history.filter((item) => {
        return (
            new Date(item.date).toDateString() ===
            new Date().toDateString()
        );
    }).length;

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Total Reviews</h3>
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{totalReviews}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Average Score</h3>
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">{averageScore}/100</p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Top Language</h3>
                <p className="text-2xl sm:text-3xl font-bold text-black dark:text-white">
                    {mostUsedLanguage}
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Last Review</h3>
                <p className="text-lg sm:text-xl font-bold text-black dark:text-white break-words">
                    {lastReview}
                </p>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Best Score</h3>
                <p className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400">
                    {bestScore}/100
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Avg Review Time</h3>
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {averageReviewTime}s
                </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 text-center transition-all duration-300">
                <h3 className="text-sm sm:text-base text-gray-500 dark:text-gray-300">Today's Reviews</h3>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400">
                    {todayReviews}
                </p>
            </div>

        </div>
    );
}

export default ReviewStats;