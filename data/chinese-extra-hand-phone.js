(() => {
  const group = {
    id: "extra-hand-phone",
    title: "Động tác tay & điện thoại",
    description: "Các động từ cầm, nắm, đặt, nhận và từ vựng thao tác điện thoại.",
    words: [
      ["hand-01", "拿", "ná", "nã", "cầm; lấy", "拿手机 — cầm/lấy điện thoại."],
      ["hand-02", "拿走", "názǒu", "nã tẩu", "cầm đi; lấy đi", "走 bổ sung hướng rời khỏi vị trí hiện tại."],
      ["hand-03", "拿到", "nádào", "nã đáo", "lấy được; nhận được", "到 biểu thị đạt được kết quả."],
      ["hand-04", "手机", "shǒujī", "thủ cơ", "điện thoại di động", "手 là tay; 机 là máy."],
      ["hand-05", "手", "shǒu", "thủ", "bàn tay", "Từ cơ bản tạo nên 手机, 手表, 手写."],
      ["hand-06", "握", "wò", "ác", "nắm; cầm chặt", "握手 — bắt tay."],
      ["hand-07", "抓", "zhuā", "trảo", "chộp; bắt; nắm; cào", "Nhấn mạnh động tác dùng ngón tay giữ/chộp."],
      ["hand-08", "放", "fàng", "phóng", "đặt; để; thả", "放在桌上 — đặt lên bàn."],
      ["hand-09", "提", "tí", "đề", "xách; nhấc; đề cập", "提包 — xách túi; 提问题 — nêu vấn đề."],
      ["hand-10", "抱", "bào", "bão", "ôm; bế", "抱孩子 — bế đứa trẻ."],
      ["hand-11", "抬", "tái", "đài", "nâng; nhấc; ngẩng", "抬头 — ngẩng đầu; 抬桌子 — nhấc bàn."],
      ["hand-12", "接", "jiē", "tiếp", "nhận; đón; nghe điện thoại", "接电话 — nghe/nhận cuộc gọi."],
      ["hand-13", "发信息", "fā xìnxī", "phát tín tức", "gửi tin nhắn", "Cũng thường nói 发消息."],
      ["hand-14", "打字", "dǎzì", "đả tự", "gõ chữ; đánh máy", "用手机打字 — gõ chữ bằng điện thoại."],
      ["hand-15", "屏幕", "píngmù", "bình mạc", "màn hình", "手机屏幕 — màn hình điện thoại."],
      ["hand-16", "键盘", "jiànpán", "kiện bàn", "bàn phím", "电脑键盘 — bàn phím máy tính."],
      ["hand-17", "东西", "dōngxi", "đông tây", "đồ vật; đồ đạc", "Trong nghĩa đồ vật, âm xi thường đọc nhẹ."],
      ["hand-18", "工具", "gōngjù", "công cụ", "công cụ; dụng cụ", "手机是很方便的工具。"],
      ["hand-19", "便利", "biànlì", "tiện lợi", "tiện lợi; thuận lợi", "Thường nói về điều kiện hoặc dịch vụ tạo thuận lợi."],
      ["hand-20", "方便", "fāngbiàn", "phương tiện", "thuận tiện; tiện", "Dùng rộng hơn 便利 và có thể hỏi 你方便吗？"],
    ],
  };

  group.words = group.words.map(([id, hanzi, pinyin, hanViet, meaning, note]) => ({
    id: `extra-${id}`, lesson: "Từ bổ sung", source: `Từ bổ sung · ${group.title}`,
    group: group.title, hanzi, pinyin, hanViet, meaning, note,
  }));
  window.CHINESE_EXTRA_VOCAB_GROUPS = [...(window.CHINESE_EXTRA_VOCAB_GROUPS || []), group];
  window.CHINESE_EXTRA_VOCAB = [...(window.CHINESE_EXTRA_VOCAB || []), ...group.words];
})();
