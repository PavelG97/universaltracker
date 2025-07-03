import { useState, useEffect } from "react";
import { CheckCircle, Trash2, Sparkles } from "lucide-react";

export default function HabitList() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState("");
  const [filter, setFilter] = useState("daily");
  const [loadingAI, setLoadingAI] = useState(false);

  // load ll from localstorage
  useEffect(() => {
    const stored = localStorage.getItem("goals");
    if (stored) setGoals(JSON.parse(stored));
  }, []);

  // localstorage
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  // AI  tip
  const suggestGoal = async () => {
    setLoadingAI(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: `Give me a short ${filter} personal goal I could track wirte it really short and try it always write unique not the same ...`,
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

  // add new goal with id)
  const addGoal = () => {
    if (newGoal.trim() === "") return;

    const today = new Date().toISOString().split("T")[0];
    const id = Date.now(); // id

    const newItem = {
      id,
      text: newGoal,
      date: today,
      done: false,
      type: filter,
    };
    setGoals([newItem, ...goals]);
    setNewGoal("");
  };

  // change finish
  const toggleDone = (id) => {
    const updated = goals.map((goal) =>
      goal.id === id ? { ...goal, done: !goal.done } : goal
    );
    setGoals(updated);
  };

  // delete goal from id
  const deleteGoal = (id) => {
    const updated = goals.filter((goal) => goal.id !== id);
    setGoals(updated);
  };

  // Filter  from type
  const filteredGoals = goals.filter((goal) => goal.type === filter);

  return (
    <div className="p-16 rounded-3xl shadow-2xl bg-white/90 backdrop-blur-sm mb-16 max-w-9xl mx-auto border border-purple-200">
      <h2 className="text-3xl font-extrabold text-purple-800 mb-6 text-center tracking-wide drop-shadow-sm">
        My {filter.charAt(0).toUpperCase() + filter.slice(1)} Goals
      </h2>

      {/*progress bar */}
      {filteredGoals.length > 0 && (
        <div className="mb-8">
          <p className="text-sm text-gray-600 mb-1 text-center">
            Progress:{" "}
            {Math.round(
              (filteredGoals.filter((g) => g.done).length /
                filteredGoals.length) *
                100
            )}
            %
          </p>
          <div className="w-full h-4 bg-purple-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-300 to-green-500 transition-all duration-500"
              style={{
                width: `${
                  (filteredGoals.filter((g) => g.done).length /
                    filteredGoals.length) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      )}

      {/* swtich from filters */}
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

      {/* Ai tip  */}
      <div className="flex gap-4 mb-8">
        <input
          type="text"
          className="flex-1 px-5 py-3 rounded-xl border border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400 shadow-sm text-lg"
          placeholder={`Add new ${filter} goal...`}
          value={newGoal}
          onChange={(e) => setNewGoal(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addGoal();
          }}
        />

        <button
          onClick={suggestGoal}
          disabled={loadingAI}
          className={`flex items-center gap-1 px-4 py-3 rounded-xl shadow-lg font-semibold transition ${
            loadingAI
              ? "bg-blue-300 text-white cursor-wait"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          aria-label="Suggest goal"
        >
          <Sparkles size={20} />
          {loadingAI ? "Thinking…" : "Suggest"}
        </button>

        <button
          onClick={addGoal}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl shadow-lg hover:from-purple-700 hover:to-purple-900 transition duration-300 font-semibold"
          aria-label="Add goal"
        >
          Add
        </button>
      </div>

      {/* all goals after filter */}
      <table className="w-full text-base table-auto rounded-xl overflow-hidden shadow-md">
        <thead>
          <tr className="bg-purple-200 text-purple-800 font-semibold select-none">
            <th className="px-6 py-3 text-center">Date</th>
            <th className="px-6 py-3 text-center">Description</th>
            <th className="px-6 py-3 text-center">Done</th>
            <th className="px-6 py-3 text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredGoals.length === 0 ? (
            <tr>
              <td
                colSpan="4"
                className="text-center py-8 text-gray-400 italic select-none"
              >
                No goals for {filter}
              </td>
            </tr>
          ) : (
            filteredGoals.map((goal) => (
              <tr
                key={goal.id}
                className={`text-center transition-colors duration-300 ${
                  goal.done
                    ? "bg-purple-50 line-through text-gray-500"
                    : "bg-white"
                } hover:bg-purple-100`}
              >
                <td className="px-6 py-4">{goal.date}</td>
                <td className="px-6 py-4 max-w-xs break-words">{goal.text}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => toggleDone(goal.id)}
                    className={`mx-auto transition-transform hover:scale-110 ${
                      goal.done ? "text-green-600" : "text-gray-400"
                    }`}
                    title="Mark as done"
                    aria-label="Toggle done"
                  >
                    <CheckCircle size={26} />
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-500 hover:text-red-700 transition-transform hover:scale-110"
                    title="Delete goal"
                    aria-label="Delete goal"
                  >
                    <Trash2 size={26} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <p className="text-center mt-10 text-sm text-purple-400 italic">
        “Small daily improvements are the key to staggering long-term results.”
      </p>
    </div>
  );
}
