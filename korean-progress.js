// One progress total for the alphabet modules and every available numbered lesson.
(() => {
  const baseIds = new Set(["alphabet", "compose", "batchim", "practice", "lesson-1", "lesson-2"]);
  const extensions = [[3, "KOREAN_LESSON_THREE"], [4, "KOREAN_LESSON_FOUR"], [5, "KOREAN_LESSON_FIVE"], [6, "KOREAN_LESSON_SIX"], [7, "KOREAN_LESSON_SEVEN"], [8, "KOREAN_LESSON_EIGHT"], [9, "KOREAN_LESSON_NINE"], [10, "KOREAN_LESSON_TEN"], [11, "KOREAN_LESSON_ELEVEN"], [12, "KOREAN_LESSON_TWELVE"], [13, "KOREAN_LESSON_THIRTEEN"], [14, "KOREAN_LESSON_FOURTEEN"]];
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

  const loadScript = (src) => new Promise((resolve, reject) => {
    if (document.querySelector(`script[src^="${src.split('?')[0]}"]`)) { resolve(); return; }
    const s = document.createElement('script'); s.src = src; s.onload = resolve; s.onerror = reject; document.body.appendChild(s);
  });
  const loadLesson14 = async () => {
    if (!document.querySelector('link[href^="korean-lesson-14.css"]')) {
      const link = document.createElement('link'); link.rel = 'stylesheet'; link.href = 'korean-lesson-14.css?v=lesson-14-2'; document.head.appendChild(link);
    }
    try {
      await loadScript('data/korean-lesson-14.js?v=lesson-14-2');
      await loadScript('korean-lesson-14-app.js?v=lesson-14-2');
      window.updateKoreanProgress?.();
    } catch (error) { console.error('Không thể tải Bài 14 tiếng Hàn', error); }
  };
  if (document.readyState === 'complete') loadLesson14();
  else window.addEventListener('load', loadLesson14, { once: true });
})();
