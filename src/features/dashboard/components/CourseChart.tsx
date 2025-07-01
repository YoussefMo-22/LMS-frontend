import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Week 1", views: 5400, likes: 2300, comments: 3200 },
  { name: "Week 2", views: 6300, likes: 1800, comments: 4000 },
  { name: "Week 3", views: 7200, likes: 3000, comments: 4100 },
  { name: "Week 4", views: 6900, likes: 2700, comments: 4200 },
  { name: "Week 5", views: 6400, likes: 2500, comments: 3700 },
  { name: "Week 6", views: 8100, likes: 3400, comments: 4700 },
  { name: "Week 7", views: 7700, likes: 2900, comments: 4500 },
  { name: "Week 8", views: 7100, likes: 3100, comments: 4000 },
  { name: "Week 9", views: 5600, likes: 2300, comments: 3300 },
];

const legends = [
  { label: "Views", color: "#1b347c" },
  { label: "Likes", color: "#f87171" },
  { label: "Comments", color: "#60a5fa" },
];

const CourseChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold text-center text-primary-400 mb-4">Courses Views Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="views" stroke="#1b347c" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="likes" stroke="#f87171" strokeWidth={2} />
          <Line type="monotone" dataKey="comments" stroke="#60a5fa" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex justify-center gap-6 mt-4">
        {legends.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block w-4 h-4 rounded-sm"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseChart;