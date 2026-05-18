import { useState } from "react";
import axios from "axios";
import ResultCard from "./components/ResultCard";
import { Upload, ShieldCheck } from "lucide-react";

function App() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const handleIssue = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setStatus("loading");
      setMessage("Uploading certificate...");
      const response = await axios.post(
        "http://127.0.0.1:5000/issue",
        formData,
      );

      if (response.data.message === "Certificate already exists") {
        setStatus("success");
        setMessage(`Certificate already exists\nHash: ${response.data.hash}`);
      } else {
        setStatus("success");
        setMessage(
          `Certificate issued successfully\nHash: ${response.data.hash}`,
        );
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Error Issuing certificate");
    }
  };

  const handleVerify = async () => {
    if (!file) {
      setStatus("error");
      setMessage("Please select a PDF file");
      return;
    }

    const formData = new FormData();

    formData.append("file", file);

    try {
      setStatus("loading");
      setMessage("Verifying certificate...");
      const response = await axios.post(
        "http://127.0.0.1:5000/verify",
        formData,
      );

      if (response.data.valid) {
        setStatus("success");
        setMessage(`Certificate Verified successfully`);
      } else {
        setStatus("error");
        setMessage(`Certificate Verification failed`);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage("Error verifying certificate");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:p-10">
      <h1 className="text-2xl md:text-4xl font-bold mb-8 text-center">
        Certificate Verification System
      </h1>
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
    ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300 bg-white"}
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
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }
  `}
            onClick={handleVerify}
          >
            <ShieldCheck size={18} />
            Verify Certificate
          </button>
        </div>
        <ResultCard message={message} status={status} />
      </div>
    </div>
  );
}

export default App;
