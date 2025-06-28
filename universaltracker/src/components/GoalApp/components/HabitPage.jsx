import { useState, useEffect } from "react";
import HabitList from "./HabitList";

export default function HabitsPage() {
  const [goals, setGoals] = useState(() => {
    // Pokus načítať z localStorage
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : [];
  });

  // Uložíme do localStorage pri zmene
  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  return (
    <div className="flex flex-col gap-12 p-8 max-w-5xl mx-auto">
      {/* Pre každý typ zobrazujeme jeden HabitList so správnym filtrom */}
      <HabitList
        title="Daily Goals"
        filter="daily"
        goals={goals}
        setGoals={setGoals}
      />
      <HabitList
        title="Weekly Goals"
        filter="weekly"
        goals={goals}
        setGoals={setGoals}
      />
      <HabitList
        title="Monthly Goals"
        filter="monthly"
        goals={goals}
        setGoals={setGoals}
      />
    </div>
  );
}
