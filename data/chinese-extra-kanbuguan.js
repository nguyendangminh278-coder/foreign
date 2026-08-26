(() => {
  const group = {
    id: "extra-kanbuguan",
    title: "Cụm trong ảnh · 看不惯",
    description: "Hiểu theo cụm: không ưa, thấy chướng mắt; không dịch máy móc là “nhìn không quen”.",
    words: [
      ["kan-01", "惯", "guàn", "quán", "quen; thành thói quen", "习惯 — thói quen; 惯 mang ý đã quen với việc gì."],
      ["kan-02", "不惯", "bu guàn", "bất quán", "không quen; không chịu được", "不 thường đọc nhẹ trong cụm 看不惯."],
      ["kan-03", "看不惯", "kàn bu guàn", "khán bất quán", "không ưa; thấy chướng mắt; không chịu nổi khi nhìn", "Cả cụm diễn tả cảm giác ghét/không tán thành điều nhìn thấy, không chỉ là “nhìn không quen”."],
    ],
  };

  group.words = group.words.map(([id, hanzi, pinyin, hanViet, meaning, note]) => ({
    id: `extra-${id}`, lesson: "Từ bổ sung", source: `Từ bổ sung · ${group.title}`,
    group: group.title, hanzi, pinyin, hanViet, meaning, note,
  }));
  window.CHINESE_EXTRA_VOCAB_GROUPS = [...(window.CHINESE_EXTRA_VOCAB_GROUPS || []), group];
  window.CHINESE_EXTRA_VOCAB = [...(window.CHINESE_EXTRA_VOCAB || []), ...group.words];
})();
