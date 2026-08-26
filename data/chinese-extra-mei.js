(() => {
  const group = {
    id: "extra-mei",
    title: "Họ từ 没 · không, chưa & mò/một",
    description: "Phân biệt 没 đọc méi trong phủ định với mò trong các từ như 没收, 沉没.",
    words: [
      ["mei-01", "没有", "méiyǒu", "một hữu", "không có; chưa", "没 + 有: phủ định sự sở hữu hoặc sự việc đã xảy ra."],
      ["mei-02", "没事", "méishì", "một sự", "không có việc gì; không sao", "Có thể dùng để trấn an: 没事，别担心。"],
      ["mei-03", "没错", "méicuò", "một thác", "không sai; đúng rồi", "Dùng để xác nhận điều vừa nói là chính xác."],
      ["mei-04", "没关系", "méiguānxi", "một quan hệ", "không sao; không có gì", "Thường đáp lại lời xin lỗi 对不起."],
      ["mei-05", "没什么", "méi shénme", "một thập ma", "không có gì; không sao", "什么 thường đọc nhẹ ở âm tiết cuối."],
      ["mei-06", "没想到", "méi xiǎngdào", "một tưởng đáo", "không ngờ tới; không nghĩ tới", "Mở đầu một điều bất ngờ: 没想到他来了。"],
      ["mei-07", "没用", "méiyòng", "một dụng", "vô dụng; không có ích", "没用 cũng có thể nói về một cách làm không hiệu quả."],
      ["mei-08", "没办法", "méi bànfǎ", "một biện pháp", "không có cách nào; đành chịu", "Khẩu ngữ rất thường dùng khi không còn lựa chọn."],
      ["mei-09", "没意思", "méi yìsi", "một ý tư", "không thú vị; chán", "意思 trong cụm này mang nghĩa thú vị/ý vị."],
      ["mei-10", "没准儿", "méi zhǔnr", "một chuẩn nhi", "không chừng; có lẽ", "Khẩu ngữ miền Bắc, tương đương 说不定 trong nhiều ngữ cảnh."],
      ["mei-11", "没完没了", "méi wán méi liǎo", "một hoàn một liễu", "dai dẳng; không dứt", "Dùng cho việc lặp đi lặp lại gây khó chịu."],
      ["mei-12", "没精打采", "méi jīng dǎ cǎi", "một tinh đả thái", "ủ rũ; thiếu sức sống", "Miêu tả trạng thái không có tinh thần, không có sức."],
      ["mei-13", "淹没", "yānmò", "yêm một", "nhấn chìm; ngập lụt", "Ở đây 没 đọc mò, mang nghĩa chìm/khuất."],
      ["mei-14", "埋没", "máimò", "mai một", "chôn vùi; mai một tài năng", "Có thể dùng cho tài năng không được phát hiện."],
      ["mei-15", "没收", "mòshōu", "một thu", "tịch thu", "没 đọc mò: cưỡng chế thu tài sản hoặc đồ vật."],
      ["mei-16", "出没", "chūmò", "xuất một", "lúc ẩn lúc hiện; thường xuyên xuất hiện", "Ví dụ: 野兽出没 — thú hoang xuất hiện."],
      ["mei-17", "沉没", "chénmò", "trầm một", "chìm xuống; bị chìm", "Thường dùng cho tàu, vật thể hoặc sự vật chìm."],
      ["mei-18", "没落", "mòluò", "một lạc", "suy tàn; sa sút", "Miêu tả gia tộc, ngành nghề hoặc thế lực đi xuống."],
      ["mei-19", "隐没", "yǐnmò", "ẩn một", "khuất bóng; biến mất", "Nhấn mạnh dần khuất khỏi tầm nhìn."],
      ["mei-20", "全军覆没", "quánjūn fùmò", "toàn quân phúc một", "toàn quân bị tiêu diệt; thất bại hoàn toàn", "Có thể dùng bóng cho một đội hoặc kế hoạch thất bại toàn bộ."],
    ],
  };

  group.words = group.words.map(([id, hanzi, pinyin, hanViet, meaning, note]) => ({
    id: `extra-${id}`, lesson: "Từ bổ sung", source: `Từ bổ sung · ${group.title}`,
    group: group.title, hanzi, pinyin, hanViet, meaning, note,
  }));
  window.CHINESE_EXTRA_VOCAB_GROUPS = [...(window.CHINESE_EXTRA_VOCAB_GROUPS || []), group];
  window.CHINESE_EXTRA_VOCAB = [...(window.CHINESE_EXTRA_VOCAB || []), ...group.words];
})();
