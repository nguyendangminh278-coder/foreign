(() => {
  const group = {
    id: "extra-zhen",
    title: "Họ từ 真 · thật, chân thực",
    description: "Từ cảm thán giao tiếp đến các từ ghép và thành ngữ với 真.",
    words: [
      ["zhen-01", "真好", "zhēn hǎo", "chân hảo", "thật tốt; tốt quá", "真 + tính từ dùng để cảm thán."],
      ["zhen-02", "真美", "zhēn měi", "chân mỹ", "thật đẹp", "Dùng để khen cảnh vật hoặc vẻ đẹp."],
      ["zhen-03", "真漂亮", "zhēn piàoliang", "chân phiêu lượng", "xinh đẹp thật đấy", "漂亮 thường đọc nhẹ ở âm tiết liang."],
      ["zhen-04", "真棒", "zhēn bàng", "chân bổng", "thật tuyệt; giỏi quá", "Lời khen khẩu ngữ rất tự nhiên."],
      ["zhen-05", "真厉害", "zhēn lìhai", "chân lệ hại", "đỉnh thật; thật lợi hại", "Có thể khen năng lực hoặc nói mức độ nghiêm trọng."],
      ["zhen-06", "真难", "zhēn nán", "chân nan", "thật khó", "Ví dụ: 这道题真难。"],
      ["zhen-07", "真累", "zhēn lèi", "chân lụy", "mệt thật đấy", "Cảm thán sau khi làm việc hoặc vận động."],
      ["zhen-08", "真聪明", "zhēn cōngming", "chân thông minh", "thật thông minh", "聪明 thường đọc nhẹ ở âm tiết ming."],
      ["zhen-09", "真便宜", "zhēn piányi", "chân tiện nghi", "rẻ thật đấy", "便宜 thường đọc nhẹ ở âm tiết yi."],
      ["zhen-10", "真奇怪", "zhēn qíguài", "chân kỳ quái", "thật kỳ lạ", "Dùng khi thấy sự việc khó hiểu."],
      ["zhen-11", "真正", "zhēnzhèng", "chân chính", "chân chính; đích thực; thực sự", "Nhấn mạnh bản chất thật của người hoặc sự việc."],
      ["zhen-12", "真理", "zhēnlǐ", "chân lý", "chân lý", "Một nguyên lý hoặc sự thật đúng đắn."],
      ["zhen-13", "真相", "zhēnxiàng", "chân tướng", "sự thật; chân tướng", "事情的真相 — sự thật của sự việc."],
      ["zhen-14", "真心", "zhēnxīn", "chân tâm", "thật lòng; lòng thành", "真心感谢 — chân thành cảm ơn."],
      ["zhen-15", "真实", "zhēnshí", "chân thực", "chân thực; có thật", "Đối lập với hư cấu hoặc giả tạo."],
      ["zhen-16", "真诚", "zhēnchéng", "chân thành", "chân thành; thành thật", "Thường miêu tả thái độ hoặc tình cảm."],
      ["zhen-17", "真话", "zhēnhuà", "chân thoại", "lời nói thật", "说真话 — nói thật."],
      ["zhen-18", "天真", "tiānzhēn", "thiên chân", "ngây thơ; hồn nhiên", "Có thể mang nghĩa tích cực hoặc hơi thiếu kinh nghiệm."],
      ["zhen-19", "认真", "rènzhēn", "nhận chân", "nghiêm túc; chăm chỉ", "认真学习 — học tập nghiêm túc."],
      ["zhen-20", "传真", "chuánzhēn", "truyền chân", "máy fax; bản fax; gửi fax", "Có thể là danh từ hoặc động từ."],
      ["zhen-21", "真假", "zhēnjiǎ", "chân giả", "thật giả", "分辨真假 — phân biệt thật giả."],
      ["zhen-22", "真丝", "zhēnsī", "chân ti", "lụa tơ tằm tự nhiên", "Chỉ chất liệu lụa thật."],
      ["zhen-23", "真皮", "zhēnpí", "chân bì", "da thật", "Dùng trên nhãn chất liệu sản phẩm."],
      ["zhen-24", "真空", "zhēnkōng", "chân không", "chân không", "真空包装 — đóng gói chân không."],
      ["zhen-25", "真人", "zhēnrén", "chân nhân", "người thật", "Đối lập với nhân vật ảo, ảnh hoặc mô hình."],
      ["zhen-26", "真才实学", "zhēn cái shí xué", "chân tài thực học", "tài năng và học vấn thực sự", "Khen người có năng lực thật, không chỉ có danh tiếng."],
      ["zhen-27", "真知灼见", "zhēn zhī zhuó jiàn", "chân tri chước kiến", "kiến thức và nhận định sâu sắc", "Thành ngữ chỉ hiểu biết đúng và ý kiến thấu đáo."],
      ["zhen-28", "情真意切", "qíng zhēn yì qiè", "tình chân ý thiết", "tình cảm chân thành tha thiết", "Dùng cho lời nói hoặc bài viết giàu tình cảm chân thật."],
      ["zhen-29", "货真价实", "huò zhēn jià shí", "hóa chân giá thực", "hàng thật giá đúng; đáng đồng tiền", "Nghĩa bóng: thực chất tốt, không giả tạo."],
    ],
  };

  group.words = group.words.map(([id, hanzi, pinyin, hanViet, meaning, note]) => ({
    id: `extra-${id}`, lesson: "Từ bổ sung", source: `Từ bổ sung · ${group.title}`,
    group: group.title, hanzi, pinyin, hanViet, meaning, note,
  }));
  window.CHINESE_EXTRA_VOCAB_GROUPS = [...(window.CHINESE_EXTRA_VOCAB_GROUPS || []), group];
  window.CHINESE_EXTRA_VOCAB = [...(window.CHINESE_EXTRA_VOCAB || []), ...group.words];
})();
