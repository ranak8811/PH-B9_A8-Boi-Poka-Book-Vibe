import { useLoaderData } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useState } from "react";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "#eee",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <p style={{ color: "#8884d8", fontWeight: "bold" }}>
          {payload[0].payload.bookName}
        </p>
        <p>{`Pages: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const PagesToRead = () => {
  const books = useLoaderData();
  const [activeIndex, setActiveIndex] = useState(-1);

  // Map books to get an array with bookName and totalPages only
  const booksData = books.map((element) => ({
    bookName: element.bookName,
    totalPages: element.totalPages,
  }));

  const handleMouseEnter = (index) => {
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(-1);
  };

  return (
    <div>
      <h1 className="text-4xl my-5 font-extrabold text-center bg-gradient-to-r from-green-300 to-gray-700 bg-clip-text text-transparent">
        Pages To Read: {booksData.length}
      </h1>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={booksData}
          margin={{ top: 20, right: 30, left: 20, bottom: 100 }}
        >
          <Bar
            dataKey="totalPages"
            fill="#8884d8"
            onMouseEnter={(data, index) => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            // Change color based on hover state
            background={{ fill: "#f0f0f0" }}
          >
            <LabelList
              dataKey="totalPages"
              position="top"
              fill="#333"
              fontSize={14}
            />
          </Bar>
          <XAxis
            dataKey="bookName"
            angle={-90}
            textAnchor="end"
            interval={0}
            height={100}
          />
          <YAxis />
          {/* Custom tooltip with hover functionality */}
          <Tooltip content={<CustomTooltip />} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PagesToRead;
