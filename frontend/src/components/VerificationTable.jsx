import { ShieldCheck, ShieldX, CalendarDays, FileText } from "lucide-react";

function VerificationTable({ verificationHistory }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          Verification History
        </h2>

        <p className="text-gray-500 mt-1">
          Recent certificate verification requests
        </p>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full">
          {/* Table Head */}
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-4 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <FileText size={18} />
                  Filename
                </div>
              </th>

              <th className="p-4 text-left font-semibold">
                Verification Status
              </th>

              <th className="p-4 text-left font-semibold">
                <div className="flex items-center gap-2">
                  <CalendarDays size={18} />
                  Verified At
                </div>
              </th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody>
            {verificationHistory.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-8 text-center text-gray-500">
                  No verification history found
                </td>
              </tr>
            ) : (
              verificationHistory.map((item) => (
                <tr
                  key={item.id}
                  className="
                    border-t
                    hover:bg-gray-50
                    transition-colors
                  "
                >
                  {/* Filename */}
                  <td className="p-4 min-w-[240px]">
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
                          {item.filename}
                        </p>

                        <p className="text-sm text-gray-400">
                          Verification ID: {item.id}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Verification Status */}
                  <td className="p-4 min-w-[200px]">
                    {item.verified ? (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-green-100
                          text-green-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        <ShieldCheck size={16} />
                        VERIFIED
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex
                          items-center
                          gap-2
                          bg-red-100
                          text-red-700
                          px-3
                          py-1
                          rounded-full
                          text-sm
                          font-medium
                        "
                      >
                        <ShieldX size={16} />
                        FAILED
                      </span>
                    )}
                  </td>

                  {/* Timestamp */}
                  <td className="p-4 min-w-[220px] text-gray-700">
                    {new Date(item.checked_at).toLocaleString()}
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

export default VerificationTable;
