"use client";

import CountUp from "react-countup";

// Extract CountUp value
const getCountUpValue = (str) => {
  const cleaned = str.replace(/,/g, ""); // remove commas for easier parsing

  // Extract just the number (like "701076" from "701,076" or "99" from "99%")
  const numericMatch = cleaned.match(/[\d.]+/);
  const value = numericMatch ? parseFloat(numericMatch[0]) : 0; // convert to number

  // Detect if there's any prefix before the number (e.g., ₹ or AED)
  const prefix = cleaned.startsWith(numericMatch[0])
    ? ""
    : cleaned.slice(0, cleaned.indexOf(numericMatch[0]));

  // Detect if there's any suffix after the number (e.g., % or +)
  const suffix = cleaned.endsWith(numericMatch[0])
    ? ""
    : cleaned.slice(numericMatch[0].length + cleaned.indexOf(numericMatch[0]));

  // Check if the original string had a comma (to enable grouping separators)
  const hasComma = str.includes(",");

  return {
    value, // the numeric value to count to
    prefix, // any prefix before the number (e.g., ₹)
    suffix, // any suffix after the number (e.g., %)
    separator: hasComma ? "," : "", // set comma if needed
  };
};

const CountUpNumber = ({ number = "" }) => {
  if (!number || number === "") return null;

  const { value, prefix, suffix, separator } = getCountUpValue(number);

  return (
    <>
      {prefix && { prefix }}
      <CountUp
        start={0}
        end={value}
        duration={6}
        separator={separator}
        suffix={suffix}
      />
    </>
  );
};

export default CountUpNumber;
