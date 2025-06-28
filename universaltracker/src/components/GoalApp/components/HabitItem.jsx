import { SquareCheck, CircleEllipsis } from "lucide-react";

export function HabitItem({ date, title, done, toggleDone }) {
  return (
    <tr
      className={`${
        done ? "line-through text-gray-400" : "text-gray-700"
      } transition-colors`}
    >
      <td className="px-4 py-2 text-center">{date}</td>
      <td className="px-4 py-2 text-center">{title}</td>
      <td className="px-4 py-2 text-center">
        <button onClick={toggleDone} className="text-purple-600 hover:text-purple-800">
          <SquareCheck size={20} />
        </button>
      </td>
    </tr>
  );
}
