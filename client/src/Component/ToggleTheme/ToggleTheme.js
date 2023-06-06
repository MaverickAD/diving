import React, { useState } from "react";
import { logDOM } from "@testing-library/react";

function ToggleTheme(props) {
  const [theme, setTheme] = useState("light");
  function handleClick() {
    if (theme === "light") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }

  return (
    <label
      htmlFor="AcceptConditions"
      className="relative h-6 w-12 cursor-pointer"
    >
      <input
        type="checkbox"
        id="AcceptConditions"
        className="peer sr-only"
        onChange={() => handleClick()}
      />

      <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>

      <span className="absolute inset-y-0 start-0 m-1 h-4 w-4 rounded-full bg-white transition-all peer-checked:start-6"></span>
    </label>
  );
}

export default ToggleTheme;
