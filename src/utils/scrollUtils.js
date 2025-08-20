// utils/scrollUtils.js
export const scrollToPosition = (target, duration = 1000) => {
  const startY = window.pageYOffset;
  let targetY;

  if (typeof target === "string") {
    const section = document.getElementById(target.replace("#", ""));
    if (!section) return;
    targetY = section.getBoundingClientRect().top + startY;
  } else if (typeof target === "number") {
    targetY = target;
  } else {
    return;
  }

  const startTime = performance.now();

  const animateScroll = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutQuad(progress);

    window.scrollTo(0, startY + (targetY - startY) * ease);

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

const easeInOutQuad = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
