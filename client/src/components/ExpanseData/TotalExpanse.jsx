import Chart from "react-apexcharts";
import { useSelector } from "react-redux";

const TotalExpanse = () => {
  const { totalIncome, totalExpanse } = useSelector((state) => state.expanseData);
  const { theme } = useSelector((state) => state.Theme);

  const hasData = (totalIncome || 0) > 0 || (totalExpanse || 0) > 0;

  const options = {
    labels: hasData ? ["Income", "Expense"] : ["No Data"],
    colors: hasData ? ["#3B82F6", "#8B5CF6"] : ["#9CA3AF"],
    series: hasData ? [totalIncome || 0, totalExpanse || 0] : [1],
    chart: {
      toolbar: { show: false },
      fontFamily: "Inter, sans-serif",
      foreColor: theme === "dark" ? "#E5E7EB" : "#374151",
    },
    fill: { opacity: 0.9 },
    stroke: { width: 0 },
    legend: {
      show: true,
      position: "bottom",
      horizontalAlign: "center",
      fontSize: "12px",
      labels: { colors: theme === "dark" ? "#E5E7EB" : "#374151" },
      markers: { radius: 12 },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: "14px",
              color: theme === "dark" ? "#E5E7EB" : "#374151",
            },
            value: {
              show: true,
              fontSize: "14px",
              fontWeight: 600,
              color: theme === "dark" ? "#F9FAFB" : "#111827",
              formatter: (val) => `₹${val}`,
            },
            total: {
              show: true,
              label: "Total",
              fontSize: "14px",
              fontWeight: 500,
              color: theme === "dark" ? "#9CA3AF" : "#6B7280",
              formatter: () => `₹${totalIncome + totalExpanse}`,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  return (
    <section
      className={`flex flex-col md:flex-row justify-between items-center gap-10 py-10 rounded-2xl transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex flex-col justify-center text-lg font-medium space-y-6 md:text-left text-center">
        <div>
          <h2 className={theme === "dark" ? "text-blue-400 font-semibold" : "text-blue-600 font-semibold"}>
            Total Income
          </h2>
          <p className={theme === "dark" ? "text-gray-100 text-xl font-bold" : "text-slate-800 text-xl font-bold"}>
            ₹ {totalIncome}
          </p>
        </div>
        <div>
          <h2 className={theme === "dark" ? "text-purple-400 font-semibold" : "text-purple-600 font-semibold"}>
            Total Expense
          </h2>
          <p className={theme === "dark" ? "text-gray-100 text-xl font-bold" : "text-slate-800 text-xl font-bold"}>
            ₹ {totalExpanse}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/2">
        <Chart options={options} series={options.series} type="donut" width="100%" height="100%" />
      </div>
    </section>
  );
};

export default TotalExpanse;
