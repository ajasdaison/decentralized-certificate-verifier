import { Loader2, BadgeCheck, AlertCircle } from "lucide-react";

function ResultCard({ message, status }) {
  if (!message) return null;

  return (
    <div
      className={`mt-6 p-4 rounded-lg font-medium transition-all duration-300
      ${
        status === "loading"
          ? "bg-yellow-100 text-yellow-800"
          : status === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
      }`}
    >
      <div className="flex items-center gap-2">
        {status === "loading" && <Loader2 className="animate-spin" size={20} />}

        {status === "success" && <BadgeCheck size={20} />}

        {status === "error" && <AlertCircle size={20} />}

        <span className="break-all">{message}</span>
      </div>
    </div>
  );
}

export default ResultCard;
