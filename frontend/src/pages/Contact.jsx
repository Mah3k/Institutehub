import { useState } from "react";
import { Mail, User, MessageSquare, Phone } from "lucide-react";

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
    <section className="min-h-screen bg-white text-gray-800 py-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-5xl font-extrabold mb-6">
            Let’s{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Connect
            </span>
          </h1>

          <p className="text-gray-600 text-lg mb-10">
            Have questions about courses or career guidance? 
            Our team is ready to assist you.
          </p>

          <div className="space-y-6">

            <InfoCard
              icon={<Mail className="text-white" />}
              title="Email Us"
              text="support@institutehub.com"
              bg="bg-gradient-to-r from-blue-500 to-cyan-400"
            />

            <InfoCard
              icon={<Phone className="text-white" />}
              title="Call Us"
              text="+91 9860786XXX"
              bg="bg-gradient-to-r from-purple-500 to-pink-500"
            />

            <InfoCard
              icon={<MessageSquare className="text-white" />}
              title="Quick Response"
              text="We reply within 24 hours"
              bg="bg-gradient-to-r from-orange-500 to-red-500"
            />
          </div>
        </div>

        {/* RIGHT SIDE FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border rounded-3xl p-10 shadow-xl space-y-6"
        >
          <h2 className="text-3xl font-bold text-center mb-4">
            Send a Message
          </h2>

          <InputField
            icon={<User size={18} />}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Full Name"
          />

          <InputField
            icon={<Mail size={18} />}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email Address"
          />

          <div className="relative">
            <MessageSquare
              size={18}
              className="absolute left-4 top-4 text-gray-400"
            />
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Write your message here..."
              rows="4"
              required
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-purple-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 hover:scale-105 transition disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>

          {success && (
            <p className="text-green-600 text-center font-medium">
              {success}
            </p>
          )}
          {error && (
            <p className="text-red-500 text-center font-medium">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}

function InputField({ icon, ...props }) {
  return (
    <div className="relative">
      <span className="absolute left-4 top-3.5 text-gray-400">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white border border-gray-300 focus:outline-none focus:border-purple-500"
      />
    </div>
  );
}

function InfoCard({ icon, title, text, bg }) {
  return (
    <div className={`${bg} text-white rounded-2xl p-6 shadow-lg flex items-center gap-4`}>
      <div className="p-3 bg-white/20 rounded-xl">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-sm opacity-90">{text}</p>
      </div>
    </div>
  );
}

export default Contact;