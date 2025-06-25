import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
    }
  };

  return (
    <div className="relative w-full xl:w-64">
      <input
        type="text"
        placeholder="Search For Anything"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyPress}
        className="w-full border border-primary-400 text-primary-400 rounded-xl py-2 pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
      />
      <Search size={20} className="absolute left-3 top-2.5 text-primary-400" />
    </div>
  );
}
