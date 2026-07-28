import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

function LanguageChart({ history }) {

    const counts = {};

    history.forEach((item) => {
        counts[item.language] = (counts[item.language] || 0) + 1;
    });

    const data = Object.keys(counts).map((key) => ({
        language: key,
        reviews: counts[key],
    }));

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 mt-8 transition-all duration-300">

            <h2 className="text-xl sm:text-2xl font-bold mb-6 dark:text-white text-center sm:text-left">
                📊 Language Usage
            </h2>

            <ResponsiveContainer width="100%" aspect={2}>

                <BarChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis
                        dataKey="language"
                        tick={{ fontSize: 12 }}
                    />

                    <YAxis tick={{ fontSize: 12 }} />

                    <Tooltip />

                    <Bar
                        dataKey="reviews"
                        radius={[8, 8, 0, 0]}
                    />

                </BarChart>

            </ResponsiveContainer>

        </div>
    );
}

export default LanguageChart;