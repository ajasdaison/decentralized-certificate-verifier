import { Search, X } from "lucide-react";

function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4">
      <div className="relative">
        {/* Search Icon */}
        <Search
          size={20}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        {/* Input */}
        <input
          type="text"
          placeholder="Search by filename..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full
            pl-12
            pr-12
            py-3
            rounded-xl
            border
            border-gray-300
            focus:outline-none
            focus:ring-2
            focus:ring-blue-400
            focus:border-blue-400
            transition
            text-gray-700
            placeholder:text-gray-400
          "
        />

        {/* Clear Button */}
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="
              absolute
              right-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-red-500
              transition
            "
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
