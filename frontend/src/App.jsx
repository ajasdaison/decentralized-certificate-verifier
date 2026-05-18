import { useState } from "react";
import { useEffect } from "react";
import API from "./services/api";
import ResultCard from "./components/ResultCard";
import UploadCard from "./components/UploadCard";
import StatisticsCards from "./components/StatisticsCards";
import CertificatesTable from "./components/CertificatesTable";
import SearchBar from "./components/SearchBar";
import VerificationTable from "./components/VerificationTable";
import Navbar from "./components/Navbar";

function App() {
  // Upload + result states
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  // Dashboard states
  const [certificates, setCertificates] = useState([]);
  const [verificationHistory, setVerificationHistory] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const filteredCertificates = certificates.filter((cert) =>
    cert.filename.toLowerCase().includes(searchTerm.toLowerCase()),
  );

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
      const response = await API.post("/issue", formData);

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
      const response = await API.post("/verify", formData);

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

  const fetchCertificates = async () => {
    try {
      const response = await API.get("/certificates");
      setCertificates(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchVerificationHistory = async () => {
    try {
      const response = await API.get("/history");
      setVerificationHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStatistics = async () => {
    try {
      const response = await API.get("/dashboard");
      setStatistics(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCertificates();
    fetchVerificationHistory();
    fetchStatistics();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard */}
      <main
        className="
      max-w-7xl
      mx-auto
      px-4
      md:px-8
      py-8
      space-y-8
    "
      >
        {/* Upload Section */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Upload & Verify
            </h2>

            <p className="text-gray-500 mt-1">
              Upload certificates for issuing or verification
            </p>
          </div>

          <UploadCard
            file={file}
            setFile={setFile}
            handleIssue={handleIssue}
            handleVerify={handleVerify}
            status={status}
            setMessage={setMessage}
            setStatus={setStatus}
          />

          <ResultCard message={message} status={status} />
        </section>

        {/* Statistics */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Dashboard Statistics
            </h2>

            <p className="text-gray-500 mt-1">
              Overview of certificate activity
            </p>
          </div>

          <StatisticsCards statistics={statistics} />
        </section>

        {/* Certificates */}
        <section className="space-y-4">
          <div
            className="
          flex
          flex-col
          md:flex-row
          md:items-center
          md:justify-between
          gap-4
        "
          >
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Certificates</h2>

              <p className="text-gray-500 mt-1">
                Search and manage issued certificates
              </p>
            </div>
          </div>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <CertificatesTable certificates={filteredCertificates} />
        </section>

        {/* Verification History */}
        <section className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Verification History
            </h2>

            <p className="text-gray-500 mt-1">Recent verification activity</p>
          </div>

          <VerificationTable verificationHistory={verificationHistory} />
        </section>
      </main>
    </div>
  );
}

export default App;
