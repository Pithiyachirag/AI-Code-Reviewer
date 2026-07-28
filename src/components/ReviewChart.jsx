
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";

function ReviewChart({ history }) {

    const chartData = history
        .slice()
        .reverse()
        .map((item, index) => {

            const scoreMatch = item.review?.match(/(\d+)\s*\/\s*100/);

            return {
                review: index + 1,
                score: scoreMatch ? Number(scoreMatch[1]) : 0,
            };

        });

    const averageScore =
        chartData.length > 0
            ? (
                chartData.reduce((sum, item) => sum + item.score, 0) /
                chartData.length
            ).toFixed(1)
            : 0;

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mt-8 transition-all duration-300">

            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-black dark:text-white text-center sm:text-left">
                📈 Review Score Trend
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">

                <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-4 text-center">
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                        Highest Score
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {chartData.length ? Math.max(...chartData.map(i => i.score)) : 0}
                    </h2>
                </div>

                <div className="bg-green-100 dark:bg-green-900 rounded-lg p-4 text-center">
                    <p className="text-sm text-green-700 dark:text-green-300">
                        Average
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {averageScore}
                    </h2>
                </div>

                <div className="bg-purple-100 dark:bg-purple-900 rounded-lg p-4 text-center">
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                        Reviews
                    </p>
                    <h2 className="text-xl sm:text-2xl font-bold">
                        {chartData.length}
                    </h2>
                </div>

            </div>

            <ResponsiveContainer width="100%" aspect={2}>

                <LineChart data={chartData}>

                    <CartesianGrid
                        strokeDasharray="4 4"
                        opacity={0.25}
                    />
                    <XAxis
                        dataKey="review"
                        tick={{ fontSize: 13 }}
                    />
                    <YAxis
                        domain={[0, 100]}
                        tick={{ fontSize: 13 }}
                    />

                    <Tooltip
                        contentStyle={{
                            background: "#1f2937",
                            border: "none",
                            borderRadius: "10px",
                            color: "#fff",
                        }}
                        labelStyle={{
                            color: "#fff",
                        }}
                    />

                    <ReferenceLine
                        y={averageScore}
                        stroke="#22c55e"
                        strokeDasharray="5 5"
                        label={{
                            value: `Avg ${averageScore}`,
                            position: "right",
                            fill: "#22c55e",
                        }}
                    />

                    <Line
                        type="monotone"
                        dataKey="score"
                        stroke="#2563eb"
                        strokeWidth={4}
                        dot={{
                            r: 6,
                            fill: "#2563eb",
                            strokeWidth: 2,
                            stroke: "#fff",
                        }}
                        activeDot={{
                            r: 9,
                            fill: "#1d4ed8",
                        }}
                        isAnimationActive={true}
                        animationDuration={1200}
                        animationEasing="ease-out"
                    />

                </LineChart>

            </ResponsiveContainer>

        </div>
    );
}

export default ReviewChart;