import { ShieldCheck } from "lucide-react";

function Navbar() {
  return (
    <nav
      className="
      bg-white
      shadow-md
      border-b
      border-gray-200
      sticky
      top-0
      z-50
    "
    >
      <div
        className="
        max-w-7xl
        mx-auto
        px-4
        md:px-8
        h-16
        flex
        items-center
        justify-between
      "
      >
        {/* Logo + Title */}
        <div className="flex items-center gap-3">
          <div
            className="
            bg-blue-500
            text-white
            p-2
            rounded-xl
          "
          >
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-lg md:text-xl font-bold text-gray-800">
              CertVerify
            </h1>

            <p className="text-xs text-gray-500">
              Certificate Verification Dashboard
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div
          className="
          hidden
          md:flex
          items-center
          gap-3
        "
        >
          <span
            className="
            bg-green-100
            text-green-700
            px-3
            py-1
            rounded-full
            text-sm
            font-medium
          "
          >
            System Online
          </span>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
