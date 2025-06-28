import React, { useState, useEffect } from "react";

const EmptyAvatar = () => (
  <svg
    className="w-28 h-28 text-purple-300"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20c0-3.33 5.33-5 6-5s6 1.67 6 5" />
  </svg>
);

const ProfilePage = () => {
  const [avatar, setAvatar] = useState(null);

  const user = {
    name: "Pavel Grega",
    email: "pavel.grega@coders.at",
    apps: ["DailyNotes", "BudgetTransaction", "MyGoals"],
  };

  // Avatar 
  useEffect(() => {
    const savedAvatar = localStorage.getItem("userAvatar");
    if (savedAvatar) {
      setAvatar(savedAvatar);
    }
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        // Save in localstorage
        localStorage.setItem("userAvatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-16 p-8 bg-gradient-to-br from-purple-50 via-white to-purple-50 rounded-3xl shadow-lg">
      <div className="flex items-center gap-8 mb-10">
        <div className="w-28 h-28 rounded-full border-4 border-purple-300 shadow-xl overflow-hidden bg-white flex items-center justify-center">
          {avatar ? (
            <img
              src={avatar}
              alt="User Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <EmptyAvatar />
          )}
        </div>
        <div>
          <h2 className="text-3xl font-extrabold text-purple-700">{user.name}</h2>
          <p className="text-gray-600 mt-1 text-lg">{user.email}</p>

          <label className="mt-4 inline-block cursor-pointer text-purple-600 hover:text-purple-800 font-semibold">
            Change Pohto
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-2xl font-semibold mb-4 text-purple-800">
        Your Apps
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-lg">
          {user.apps.map((app, idx) => (
            <li
              key={idx}
              className="hover:text-purple-600 cursor-default transition"
            >
              {app}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProfilePage;
