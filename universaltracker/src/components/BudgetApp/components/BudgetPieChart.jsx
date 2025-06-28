import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { useBudget } from "../context/BudgetContext";
import { Sparkles } from "lucide-react";

const BudgetPieChart = () => {
  const { transactions } = useBudget();

  const [labels, setLabels] = useState([]);
  const [series, setSeries] = useState([]);
  const [balance, setBalance] = useState(0);

  const [aiTip, setAiTip] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  /* code for graf */
  useEffect(() => {
    const categoryMap = transactions.reduce((acc, curr) => {
      const key = `${curr.category} (${curr.type})`;
      acc[key] = (acc[key] || 0) + curr.amount;
      return acc;
    }, {});

    const sorted = Object.entries(categoryMap).sort((a, b) =>
      a[0].localeCompare(b[0])
    );

    setLabels(sorted.map(([key]) => key));
    setSeries(sorted.map(([, value]) => value));

    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((acc, t) => acc + t.amount, 0);

    const expenses = transactions
      .filter((t) => t.type === "expenses")
      .reduce((acc, t) => acc + t.amount, 0);

    setBalance(income - expenses);
  }, [transactions]);

  /* Function to get AI tip */
  const suggestTip = async () => {
    setLoadingAI(true);
    try {
      const summary = labels
        .map((label, i) => `${label}: €${series[i].toFixed(2)}`)
        .join(", ");

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Analyze my budget breakdown: ${summary}. Give me one useful short tip to save money or manage finances better write it short without thick text dont us bold text`,
        }),
      });

      const data = await res.json();
      if (data?.reply) setAiTip(data.reply.trim());
      else setAiTip("No tip available.");
    } catch (err) {
      console.error("AI suggest error:", err);
      setAiTip("Sorry, I couldn't get a tip right now.");
    } finally {
      setLoadingAI(false);
    }
  };

  const colors = [
    "#4A90E2",
    "#50E3C2",
    "#F5A623",
    "#D64545",
    "#8E44AD",
    "#34495E",
    "#7F8C8D",
    "#27AE60",
    "#E67E22",
    "#2980B9",
    "#C0392B",
    "#16A085",
  ];

  const options = {
    chart: {
      type: "donut",
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: { enabled: true, delay: 150 },
        dynamicAnimation: { enabled: true, speed: 350 },
      },
    },
    labels,
    colors,
    legend: { show: false },
    fill: { type: "gradient" },
    tooltip: {
      custom({ series, seriesIndex, w }) {
        const label = w.globals.labels[seriesIndex];
        const value = series[seriesIndex];
        const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
        const percent = ((value / total) * 100).toFixed(1);
        return `
          <div style="padding:8px;font-size:14px">
            <strong>${label}</strong><br/>
            €${value.toFixed(2)} (${percent}%)
          </div>
        `;
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            value: {
              show: true,
              formatter: (val) => `€${parseFloat(val).toFixed(2)}`,
            },
            total: { show: false },
          },
        },
      },
    },
    responsive: [
      {
        breakpoint: 480,
        options: { chart: { width: 240 } },
      },
    ],
  };

  if (series.length === 0) {
    return <p className="text-center mt-4">No transactions to display</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-3xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Graf */}
        <div>
          <ReactApexChart
            key={series.join("-")}
            options={options}
            series={series}
            type="donut"
            width={300}
          />
        </div>

        {/* Legend + Balance + AI Tip */}
        <div className="flex flex-col gap-4 w-full max-w-xs">
          {labels.map((label, i) => (
            <div key={label} className="flex items-center gap-2">
              <span
                style={{
                  width: 16,
                  height: 16,
                  backgroundColor: colors[i % colors.length],
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
              <span className="text-sm">{label}</span>
              <span className="ml-auto font-semibold">
                €{series[i].toFixed(2)}
              </span>
            </div>
          ))}

          <div className="pt-2 mt-2 border-t text-right font-bold">
            Balance: €{balance.toFixed(2)}
          </div>

          <button
            onClick={suggestTip}
            disabled={loadingAI}
            className={`flex items-center gap-1 px-4 py-3 rounded-xl shadow-lg font-semibold transition ${
              loadingAI
                ? "bg-blue-300 text-white cursor-wait"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            aria-label="Suggest tip"
          >
            <Sparkles size={20} />
            {loadingAI ? "Thinking…" : "Suggest Tip"}
          </button>

          <div
            className="mt-4 p-4 bg-blue-50 border border-blue-300 rounded-lg text-blue-800"
            style={{
              minHeight: "120px",
              maxHeight: "180px",
              overflowY: "auto",
              transition: "all 0.5s ease",
            }}
          >
            {aiTip || "Click on Tip and Wait."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetPieChart;
