// One progress total for the alphabet modules and every available numbered lesson.
(() => {
  const baseIds = new Set(["alphabet", "compose", "batchim", "practice", "lesson-1", "lesson-2"]);
  const extensions = [[3, "KOREAN_LESSON_THREE"], [4, "KOREAN_LESSON_FOUR"], [5, "KOREAN_LESSON_FIVE"], [6, "KOREAN_LESSON_SIX"], [7, "KOREAN_LESSON_SEVEN"], [8, "KOREAN_LESSON_EIGHT"], [9, "KOREAN_LESSON_NINE"], [10, "KOREAN_LESSON_TEN"], [11, "KOREAN_LESSON_ELEVEN"]];
  let sessionBase = 0;
  window.updateKoreanProgress = (baseCount) => {
    if (Number.isInteger(baseCount)) sessionBase = baseCount;
    else {
      try { const saved = JSON.parse(localStorage.getItem("hanReview.korean.completed") || "[]"); sessionBase = new Set((Array.isArray(saved) ? saved : []).filter((id) => baseIds.has(id))).size; } catch {}
    }
    const available = extensions.filter(([, name]) => window[name]);
    let completed = sessionBase;
    available.forEach(([number]) => { try { if (localStorage.getItem(`hanReview.korean.lesson${number}.completed`) === "true") completed += 1; } catch {} });
    const label = `${completed}/${baseIds.size + available.length}`;
    const stat = document.querySelector("#koStatCompleted");
    if (stat && stat.textContent !== label) stat.textContent = label;
    return label;
  };
})();
