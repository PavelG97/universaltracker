import { useState, useEffect } from "react";
import {
  CheckCircle,
  Trash2,
  Sparkles,
  ChevronDown,
  ChevronUp,
  XCircle,
} from "lucide-react";

export default function HabitList() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [filter, setFilter] = useState("daily");
  const [loadingAI, setLoadingAI] = useState(false);
  const [expandedSummaries, setExpandedSummaries] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("goals");
    if (stored) setGoals(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const suggestGoal = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Give me a short ${filter} personal goal I could track. Write it really short and unique.`,
        }),
      });
      const data = await res.json();
      if (data?.reply) setNewGoal(data.reply.trim());
    } catch (err) {
      console.error("AI suggest error:", err);
    } finally {
      setLoadingAI(false);
    }
  };

  const addGoal = () => {
    if (newGoal.trim() === "") return;

    const today = new Date().toISOString().split("T")[0];
    const newItem = {
      id: Date.now(),
      text: newGoal,
      date: today,
      done: false,
      type: filter,
      isSummary: false,
      mergedIds: [],
      mergedGoals: [],
    };

    setGoals((prev) => [newItem, ...prev]);
    setNewGoal("");
  };

  const toggleDone = (id) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === id ? { ...g, done: !g.done } : g))
    );
  };

  const deleteGoal = (id) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  const deleteSummaryWithMerged = (summaryId) => {
    setGoals((prev) => {
      const summary = prev.find((g) => g.id === summaryId);
      if (!summary) return prev;
      const mergedIds = Array.isArray(summary.mergedIds)
        ? summary.mergedIds
        : [];

      return prev.filter(
        (g) =>
          g.id !== summaryId &&
          !(mergedIds.includes(g.id) && g.type === summary.type)
      );
    });
  };

  const activeGoals = goals.filter(
    (g) => g.type === filter && !g.isSummary
  );

  const progressPercent =
    activeGoals.length === 0
      ? 0
      : Math.round(
          (activeGoals.filter((g) => g.done).length / activeGoals.length) * 100
        );

  // Auto-create summary when 100% done
 useEffect(() => {
  if (progressPercent !== 100 || activeGoals.length === 0) return;

  setGoals((prev) => {
    const doneGoals = prev.filter(
      (g) => g.type === filter && !g.isSummary && g.done
    );
    if (doneGoals.length === 0) return prev;

    const date = doneGoals[0].date;

    // deleting finishe golas
    const remaining = prev.filter(
      (g) =>
        !(g.type === filter && !g.isSummary && g.done && g.date === date)
    );

    const summary = {
      id: Date.now(),               // jedinečný id
      text: `All ${filter} goals completed on ${new Date(
        date
      ).toLocaleDateString()}`,
      date,
      done: true,
      type: filter,
      isSummary: true,
      mergedIds: doneGoals.map((g) => g.id),
      mergedGoals: doneGoals,
    };

    return [summary, ...remaining];
  });
}, [progressPercent, filter]);


  const visibleGoals = goals.filter((g) => g.type === filter);

  const toggleExpandSummary = (id) => {
    setExpandedSummaries((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="p-16 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm mb-16 max-w-9xl mx-auto border border-purple-200">
      <h2 className="text-3xl font-extrabold text-purple-800 mb-6 text-center tracking-wide drop-shadow-sm">
        My {filter.charAt(0).toUpperCase() + filter.slice(1)} Goals
      </h2>

      {visibleGoals.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-1 text-center">
            Progress: {progressPercent}%
          </p>
          <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-300 to-green-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Filter tabs */}
      <div className="flex justify-center gap-5 mb-8">
        {["daily", "weekly", "monthly"].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-5 py-2 rounded-full font-semibold transition-colors duration-300 shadow-md focus:outline-none focus:ring-4 focus:ring-purple-300 ${
              filter === type
                ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white shadow-lg"
                : "bg-purple-100 text-purple-700 hover:bg-purple-200"
            }`}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>

      {/* Add & Suggest */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          className="flex-1 px-5 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-sm text-lg"
          placeholder={`Add new ${filter} goal...`}
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addGoal()}
          disabled={loadingAI}
        />
        <button
          onClick={suggestGoal}
          disabled={loadingAI}
          className={`flex items-center gap-1 px-4 py-3 rounded-xl shadow-lg font-semibold transition ${
            loadingAI
              ? "bg-blue-300 text-white cursor-wait"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          <Sparkles size={20} />
          {loadingAI ? "Thinking…" : "Suggest"}
        </button>
        <button
          onClick={addGoal}
          disabled={loadingAI}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-300 font-semibold"
        >
          Add
        </button>
      </div>

      {/* Table */}
      <table className="w-full text-base table-auto rounded-xl overflow-hidden shadow-md">
        <thead>
          <tr className="bg-purple-200 text-purple-800 font-semibold select-none">
            <th className="px-6 py-3 text-center">Date</th>
            <th className="px-6 py-3 text-center">Description</th>
            <th className="px-6 py-3 text-center">Done</th>
            <th className="px-6 py-3 text-center">Delete</th>
            <th className="px-6 py-3 text-center">Expand</th>
          </tr>
        </thead>
        <tbody>
          {visibleGoals.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center py-8 text-gray-400 italic">
                No goals for {filter}
              </td>
            </tr>
          ) : (
            visibleGoals.map((g) => (
              <tr key={g.id}>
                <td className="px-6 py-4 text-center">{g.date}</td>
                <td className="px-6 py-4 max-w-xs break-words">
                  {g.text}
                  {g.isSummary && (
                    <span className="ml-2 text-sm text-green-700 font-semibold">
                      (Summary)
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {!g.isSummary && (
                    <button
                      onClick={() => toggleDone(g.id)}
                      className={`mx-auto transition-transform hover:scale-110 ${
                        g.done ? "text-green-600" : "text-gray-400"
                      }`}
                    >
                      <CheckCircle size={26} />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {g.isSummary ? (
                    <button
                      onClick={() => deleteSummaryWithMerged(g.id)}
                      className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                    >
                      <XCircle size={26} />
                    </button>
                  ) : (
                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                    >
                      <Trash2 size={26} />
                    </button>
                  )}
                </td>
                <td className="px-6 py-4 text-center">
                  {g.isSummary && (
                    <button
                      onClick={() => toggleExpandSummary(g.id)}
                      className="text-purple-600 hover:scale-110 transition-transform"
                    >
                      {expandedSummaries[g.id] ? (
                        <ChevronUp size={26} />
                      ) : (
                        <ChevronDown size={26} />
                      )}
                    </button>
                  )}
                </td>
              </tr>
            ))
          )}
          {/* Expanded summary rows */}
          {visibleGoals.map(
            (g) =>
              g.isSummary &&
              expandedSummaries[g.id] &&
              g.mergedGoals?.length > 0 && (
                <tr key={`${g.id}-expanded`} className="bg-purple-50">
                  <td colSpan="5" className="px-6 py-4">
                    <ul className="list-disc list-inside text-sm text-gray-700">
                      {g.mergedGoals.map((m) => (
                        <li key={m.id} className="line-through">
                          {m.text} (Done)
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )
          )}
        </tbody>
      </table>

      <p className="text-center mt-10 text-sm text-purple-400 italic">
        “Small daily improvements are the key to staggering long-term results.”
      </p>
    </div>
  );
}
