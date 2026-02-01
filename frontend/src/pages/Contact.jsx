import { useState } from "react";
import { Mail, User, MessageSquare } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL;

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to send message");
      }

      setSuccess("✨ Your message has been sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      if (
        err.message.includes("Failed to fetch") ||
        err.message.includes("NetworkError")
      ) {
        setError("Cannot connect to server. Please try again later.");
      } else {
        setError(err.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen text-white overflow-hidden bg-gray-900">

      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1581091012184-677e24990e78?auto=format&fit=crop&w=1600&q=80"
          alt="IT Company"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />

        <div className="absolute -top-52 -left-52 w-[700px] h-[700px] rounded-full bg-gradient-to-r from-blue-600 via-cyan-400 to-purple-500 opacity-30 blur-[180px] animate-blobSlow"></div>
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-400 opacity-20 blur-[160px] animate-blobSlow delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500 opacity-25 blur-[100px] animate-pulse"></div>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6">
        <div className="max-w-6xl w-full grid md:grid-cols-2 gap-14 items-center">

          {/* Left */}
          <div>
            <h1 className="text-5xl font-extrabold mb-6">
              Let’s{" "}
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Connect
              </span>
            </h1>
            <p className="text-gray-300 text-lg mb-10">
              Have questions about courses or careers? Reach out and we’ll guide you.
            </p>

            <div className="space-y-6">
              <InfoCard icon={<Mail className="text-cyan-400" />} title="Email Us" text="support@institutehub.com" />
              <InfoCard icon={<MessageSquare className="text-cyan-400" />} title="Quick Response" text="Replies within 24 hours" />
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 shadow-2xl space-y-6"
          >
            <h2 className="text-3xl font-bold text-center">
              Send a <span className="text-cyan-400">Message</span>
            </h2>

            <InputField icon={<User size={18} />} name="name" value={form.name} onChange={handleChange} placeholder="Your Full Name" />
            <InputField icon={<Mail size={18} />} name="email" type="email" value={form.email} onChange={handleChange} placeholder="Your Email Address" />

            <div className="relative">
              <MessageSquare size={18} className="absolute left-4 top-4 text-gray-400" />
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message here..."
                rows="4"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
              />
            </div>

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>

            {success && <p className="text-green-400 text-center">{success}</p>}
            {error && <p className="text-red-400 text-center">{error}</p>}
          </form>
        </div>
      </div>

      <style>{`
        @keyframes blobSlow {
          0%,100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-50px) scale(1.1); }
          66% { transform: translate(-20px,20px) scale(0.9); }
        }
        .animate-blobSlow { animation: blobSlow 15s infinite ease-in-out; }
      `}</style>
    </section>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-3.5 text-gray-400">{icon}</span>
      <input
        {...props}
        required
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:outline-none focus:border-cyan-400"
      />
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="flex items-center gap-4 bg-black/40 border border-white/10 rounded-2xl p-5">
      <div className="p-3 bg-white/10 rounded-xl">{icon}</div>
      <div>
        <p className="font-semibold">{title}</p>
        <p className="text-gray-400 text-sm">{text}</p>
      </div>
    </div>
  );
}

export default Contact;
