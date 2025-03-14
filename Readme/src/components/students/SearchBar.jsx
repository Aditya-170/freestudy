import { useState } from "react";
import { assets } from "./../../assets/assets";
import { useNavigate } from "react-router-dom";


function SearchBar({ data }) {
  const Navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");
  const onSubmit = (e) => {
    e.preventDefault();
    Navigate("/course-list/" + input);
  };
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className=" max-w-xl w-full md:h-14 h-12 flex item-center bg-white border border-gray-500/20 rounded"
      >
        <img
          src={assets.search_icon}
          alt="search_icon"
          className="w-10 h-13 px-2 py-2"
        />

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Search for courses"
          className="w-full h-full outline-none text-gray-500/80"
        />

        <button
          type="submit"
          className="bg-blue-600 rounded text-white md:px-10 px-7 md:py-3 py-2 mx-1"
        >
          Search
        </button>
      </form>
      
    </div>
  );
}

export default SearchBar;
