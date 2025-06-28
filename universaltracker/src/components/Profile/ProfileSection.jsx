import React from "react";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 text-center hover:shadow-lg transition cursor-pointer"
      onClick={() => navigate("/profile")}
      title="View and edit your profile"
    >
      <User className="mx-auto text-purple-500 mb-4" size={40} />
      <h3 className="text-lg font-semibold">My Profile</h3>
      <p className="text-gray-500 text-sm mt-2">
        View and update your personal information and settings.
      </p>
    </div>
  );
};

export default ProfileSection;
