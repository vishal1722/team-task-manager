import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!form.name || !form.email || !form.password) {
      return toast.error("All fields are required");
    }

    if (form.password.length < 6) {
      return toast.error("Password must be at least 6 characters");
    }

    try {
      setLoading(true);
      await API.post("/auth/signup", form);
      toast.success("Account created 🎉");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.msg || err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-green-900 to-blue-900">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl w-96 text-white">
        <h2 className="text-3xl font-bold text-center mb-2">Create Account 🚀</h2>
        <p className="text-sm text-gray-300 text-center mb-6">Start managing tasks</p>

        <input
          className="input"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button onClick={handleSignup} className="btn-green w-full">
          {loading ? "Creating..." : "Signup"}
        </button>

        <p onClick={()=>navigate("/")} className="text-sm text-center mt-4 cursor-pointer text-blue-300 hover:underline">
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}