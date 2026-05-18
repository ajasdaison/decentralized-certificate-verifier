import { FileText, ShieldCheck, BadgeCheck, AlertTriangle } from "lucide-react";

function StatisticsCards({ statistics }) {
  const stats = [
    {
      title: "Total Certificates",
      value: statistics.totalCertificates || 0,
      icon: <FileText size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-700",
      iconBg: "bg-blue-500",
    },
    {
      title: "Total Verifications",
      value: statistics.totalVerifications || 0,
      icon: <ShieldCheck size={28} />,
      bg: "bg-purple-100",
      text: "text-purple-700",
      iconBg: "bg-purple-500",
    },
    {
      title: "Successful Verifications",
      value: statistics.successfulVerifications || 0,
      icon: <BadgeCheck size={28} />,
      bg: "bg-green-100",
      text: "text-green-700",
      iconBg: "bg-green-500",
    },
    {
      title: "Failed Verifications",
      value: statistics.failedVerifications || 0,
      icon: <AlertTriangle size={28} />,
      bg: "bg-red-100",
      text: "text-red-700",
      iconBg: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div
          key={stat.title}
          className={`
            ${stat.bg}
            rounded-2xl
            p-6
            shadow-sm
            hover:shadow-lg
            transition-all
            duration-300
            border border-white/50
          `}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className={`text-sm font-medium ${stat.text}`}>{stat.title}</p>

              <h2 className="text-4xl font-bold mt-3 text-gray-800">
                {stat.value}
              </h2>
            </div>

            <div
              className={`
                ${stat.iconBg}
                text-white
                p-3
                rounded-xl
                shadow-md
              `}
            >
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatisticsCards;
