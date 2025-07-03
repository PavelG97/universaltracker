import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import AI from "../assets/AI.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);  
      alert(data.message);
      navigate("/home");
    } else {
      alert(data.message || "Incorrect password or email!");
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Error");
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200 text-gray-700 font-roboto px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <div className="flex flex-wrap justify-center items-center gap-8">
          <div className="logo-side">
            <img
              src={AI}
              alt="Logo"
              className="w-[150px] h-auto rounded-lg object-contain mb-4 mx-auto"
            />
          </div>
          <div className="form-side flex-1 min-w-[250px]">
            <h1 className="text-2xl font-bold mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-semibold text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 hover:underline font-semibold"
              >
                Sign up here
              </Link>
            </p>
            <div className="mt-6 text-center">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-md font-semibold transition"
              >
                <i className="fa-solid fa-house"></i> Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
