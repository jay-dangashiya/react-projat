import { useState } from "react";

const MOODS = [
  { id: 1, label: "Happy", emoji: "😄" },
  { id: 2, label: "Neutral", emoji: "😐" },
  { id: 3, label: "Frustrated", emoji: "😤" },
  { id: 4, label: "Confused", emoji: "🤯" },
];

export default function MoodCommentBox() {
  const [selectedMood, setSelectedMood] = useState(MOODS[0]);
  const [message, setMessage] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  const handleAdd = () => {
    if (!message.trim()) return;

    setFeedbacks([
      ...feedbacks,
      {
        id: Date.now(),
        mood: selectedMood,
        message,
      },
    ]);

    setMessage("");
  };

  const handleDelete = (id) => {
    setFeedbacks(feedbacks.filter((item) => item.id !== id));
  };

  return (
    <div className="max-w-md w-full bg-[#f4eddc] p-6 rounded-2xl shadow-xl">
      <h2 className="text-2xl font-semibold text-[#90353d] mb-4">
        💬 Mood Feedback
      </h2>

      {/* Mood Selector */}
      <div className="flex gap-2 flex-wrap mb-4">
        {MOODS.map((mood) => (
          <button
            key={mood.id}
            onClick={() => setSelectedMood(mood)}
            className={`px-4 py-1 rounded-full text-sm border transition
              ${
                selectedMood.id === mood.id
                  ? "bg-[#90353d] text-white"
                  : "bg-white text-[#90353d]"
              }`}
          >
            {mood.emoji} {mood.label}
          </button>
        ))}
      </div>

      {/* Textarea */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="3"
        placeholder="Say it out loud… we’re listening 👂"
        className="w-full p-3 border rounded-xl outline-none
          focus:ring-2 focus:ring-[#90353d]"
      />

      {/* Submit Button */}
      <button
        onClick={handleAdd}
        className="w-full mt-3 bg-[#90353d] text-white py-2 rounded-xl
          hover:opacity-90 transition"
      >
        Add Feedback
      </button>

      {/* Feedback List */}
      <div className="mt-5 space-y-3">
        {feedbacks.length === 0 && (
          <p className="text-center text-sm text-[#90353d] opacity-70">
            No feedback yet 🌱
          </p>
        )}

        {feedbacks.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-2xl shadow-md flex justify-between"
          >
            <div>
              <p className="text-sm font-medium text-[#90353d]">
                {item.mood.emoji} {item.mood.label}
              </p>
              <p className="text-sm text-gray-700 mt-1">
                {item.message}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item.id)}
              className="text-[#90353d] text-lg hover:scale-110 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
