import React from "react";
import Logo from "../assets/Logo.jpg";
import { Plus } from "lucide-react";
export default function Header({ addNote }) {
  return (
    <header className="bg-white shadow-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <h1>
            <img src={Logo} alt="" />
          </h1>
          <button
            className="inline-flex items-center px-4 py-2 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-amber-600 hover:bg-amber-700 focus:outline-none
          focus:ring-2 cursor-pointer max-w-max "
            onClick={addNote}
          >
            <Plus />
            New Note
          </button>
        </div>
      </div>
    </header>
  );
}
