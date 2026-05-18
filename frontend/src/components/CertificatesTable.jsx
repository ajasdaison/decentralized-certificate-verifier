import { FileText, CalendarDays, Fingerprint } from "lucide-react";

function CertificatesTable({ certificates }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Issued Certificates
        </h2>

        <p className="text-gray-500 mt-1">
          View and manage all issued certificates
        </p>
      </div>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  Filename
                </div>
              </th>

              <th className="p-4 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <Fingerprint size={18} />
                  Certificate Hash
                </div>
              </th>

              <th className="p-4 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  Created At
                </div>
              </th>
            </tr>
          </thead>

          <tbody>
            {certificates.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  No certificates found
                </td>
              </tr>
            ) : (
              certificates.map((cert) => (
                <tr
                  key={cert.id}
                  className="
                    border-t
                    hover:bg-gray-50
                    transition-colors
                  "
                >
                  {/* Filename */}
                  <td className="p-4 min-w-[220px]">
                    <div className="flex items-center gap-3">
                      <div
                        className="
                        bg-blue-100
                        text-blue-600
                        p-2
                        rounded-lg
                      "
                      >
                        <FileText size={18} />
                      </div>

                      <div>
                        <p className="font-medium text-gray-800">
                          {cert.filename}
                        </p>

                        <p className="text-sm text-gray-400">ID: {cert.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Hash */}
                  <td className="p-4 min-w-[300px]">
                    <div
                      className="
                      bg-gray-100
                      rounded-lg
                      p-3
                      text-sm
                      text-gray-700
                      font-mono
                      break-all
                    "
                    >
                      {cert.file_hash}
                    </div>
                  </td>

                  {/* Created Date */}
                  <td className="p-4 min-w-[220px]">
                    <div className="text-gray-700">
                      {new Date(cert.created_at).toLocaleString()}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CertificatesTable;
