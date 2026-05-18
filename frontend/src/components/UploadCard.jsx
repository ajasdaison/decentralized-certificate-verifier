import { useState } from "react";
import { Upload, ShieldCheck } from "lucide-react";

function UploadCard({
  file,
  setFile,
  handleIssue,
  handleVerify,
  status,
  setMessage,
  setStatus,
}) {
  const [dragActive, setDragActive] = useState(false);

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-xl mx-auto">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragActive(false);

          const droppedFile = e.dataTransfer.files[0];

          if (droppedFile?.type === "application/pdf") {
            setFile(droppedFile);
            setMessage("");
            setStatus("");
          }
        }}
        className={`
          border-2 border-dashed rounded-xl p-6 mb-4 transition text-center
          ${
            dragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 bg-white"
          }
        `}
      >
        <label className="cursor-pointer flex flex-col items-center gap-2">
          <Upload size={40} className="text-gray-500" />

          <span className="text-gray-600">Drag & Drop PDF here</span>

          <span className="text-sm text-gray-400">or click to browse</span>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => {
              setFile(e.target.files[0]);
              setMessage("");
              setStatus("");
            }}
          />
        </label>
      </div>

      {file && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 break-all">
            Selected File: <span className="font-medium">{file.name}</span>
          </p>

          <button
            onClick={() => {
              setFile(null);
              setMessage("");
              setStatus("");
            }}
            className="text-red-500 text-sm mt-2 hover:underline"
          >
            Remove File
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-4">
        <button
          disabled={!file || status === "loading"}
          className={`
            px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition
            ${
              !file || status === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white"
            }
          `}
          onClick={handleIssue}
        >
          <Upload size={18} />
          Issue Certificate
        </button>

        <button
          disabled={!file || status === "loading"}
          className={`
            px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition
            ${
              !file || status === "loading"
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600 text-white"
            }
          `}
          onClick={handleVerify}
        >
          <ShieldCheck size={18} />
          Verify Certificate
        </button>
      </div>
    </div>
  );
}

export default UploadCard;
