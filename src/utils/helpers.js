// Utility: Shuffle an array in-place using Fisher-Yates
export const shuffleArray = (arr) => {
  const array = [...arr]; // avoid mutating original
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// ✅ Utility function to format ISO date (ddth mmm yyyy)
export const formatISODateString = (isoString) => {
  const date = new Date(isoString);

  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.getFullYear();

  // Add suffix to day
  const getDaySuffix = (d) => {
    if (d > 3 && d < 21) return "th"; // 4–20
    switch (d % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return `${day}${getDaySuffix(day)} ${month} ${year}`;
};

// Slug Validation
export const isValidSlug = (slug) => {
  if (typeof slug !== "string") return false;
  // Only letters, numbers, and hyphens
  const regex = /^[a-zA-Z0-9-]+$/;
  return regex.test(slug);
};
