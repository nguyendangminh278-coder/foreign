const sourceLessons = window.LESSON_DATA?.lessons || [];
const pdfPageCounts = new Map((window.CHINESE_COURSE?.lessons || []).map((lesson) => [lesson.id, lesson.pageCount]));
const lessons = sourceLessons.map((lesson) => {
  const pageCount = pdfPageCounts.get(lesson.id) || lesson.slideCount;
  return {
    ...lesson,
    slideCount: pageCount,
    slides: lesson.slides.filter((slide) => slide.index <= pageCount),
  };
});

const topicMap = {
  "Bài 1": ["8 nét", "Quy tắc viết", "Pinyin", "Thanh điệu", "你 好 吗"],
  "Bài 2": ["汉语不太难", "Gia đình", "很 太 忙", "an/en/ang"],
  "Bài 3": ["明天见", "Ngôn ngữ", "Đi bưu điện", "Ngân hàng", "j q x"],
  "Bài 4": ["你去哪儿", "Hôm nay", "Thứ trong tuần", "学校", "A 不 A"],
  "Bài 5": ["这是王老师", "Lời mời", "请进 请坐", "工作", "身体"],
  "Bài 6": ["我学习汉语", "请问", "姓名", "国家", "书/杂志"],
  "Bài 7": ["你吃什么", "Bữa ăn", "食堂", "馒头", "要/个"],
  "Bài 8": ["苹果多少钱", "Mua bán", "水果", "块/毛", "找钱"],
  "Bài 9": ["我要换钱", "图书馆", "换钱", "人民币", "数字 lớn"],
  "Bài 10": ["他住哪儿", "办公室", "找人", "住址", "电话号码"],
  "Bài 11": ["留学生", "介绍", "教授/校长", "也/都", "哪国人"],
  "Bài 12": ["在哪儿学习", "语言大学", "觉得", "比较", "语法"],
  "Bài 13": ["是不是中药", "没有/有", "颜色", "箱子", "东西"],
  "Bài 14": ["新还是旧", "最近", "刚", "骑车", "咖啡/酒"],
  "Bài 15": ["多少职员", "照片", "全家", "公司", "外贸"],
};

const lessonNameMap = {
  "Bài 1": "HỌC TIẾNG TRUNG ĐỂ LÀM GÌ",
  "Bài 2": "汉语不太难",
  "Bài 3": "明天见",
  "Bài 4": "你去哪儿",
  "Bài 5": "这是王老师",
  "Bài 6": "我学习汉语",
  "Bài 7": "你吃什么",
  "Bài 8": "苹果一斤多少钱",
  "Bài 9": "我要换钱",
  "Bài 10": "他住哪儿",
  "Bài 11": "我们都是留学生",
  "Bài 12": "你在哪儿学习",
  "Bài 13": "这是不是中药",
  "Bài 14": "你的车是新的还是旧的",
  "Bài 15": "你们公司有多少职员",
};

const lessonMetaMap = {
  "Bài 1": { hanzi: "你好", pinyin: "nǐ hǎo", meaning: "Xin chào" },
  "Bài 2": { hanzi: "汉语不太难", pinyin: "Hànyǔ bú tài nán", meaning: "Tiếng Hán không khó lắm" },
  "Bài 3": { hanzi: "明天见", pinyin: "Míngtiān jiàn", meaning: "Ngày mai gặp" },
  "Bài 4": { hanzi: "你去哪儿", pinyin: "Nǐ qù nǎr", meaning: "Bạn đi đâu?" },
  "Bài 5": { hanzi: "这是王老师", pinyin: "Zhè shì Wáng lǎoshī", meaning: "Đây là thầy giáo Vương" },
  "Bài 6": { hanzi: "我学习汉语", pinyin: "Wǒ xuéxí Hànyǔ", meaning: "Tôi học tiếng Hán" },
  "Bài 7": { hanzi: "你吃什么", pinyin: "Nǐ chī shénme", meaning: "Bạn ăn gì?" },
  "Bài 8": { hanzi: "苹果一斤多少钱", pinyin: "Píngguǒ yì jīn duōshao qián", meaning: "Táo một cân bao nhiêu tiền?" },
  "Bài 9": { hanzi: "我要换钱", pinyin: "Wǒ yào huàn qián", meaning: "Tôi muốn đổi tiền" },
  "Bài 10": { hanzi: "他住哪儿", pinyin: "Tā zhù nǎr", meaning: "Anh ấy sống ở đâu?" },
  "Bài 11": { hanzi: "我们都是留学生", pinyin: "Wǒmen dōu shì liúxuéshēng", meaning: "Chúng tôi đều là lưu học sinh" },
  "Bài 12": { hanzi: "你在哪儿学习", pinyin: "Nǐ zài nǎr xuéxí", meaning: "Bạn học ở đâu?" },
  "Bài 13": { hanzi: "这是不是中药", pinyin: "Zhè shì bu shì zhōngyào", meaning: "Đây có phải thuốc Đông y không?" },
  "Bài 14": { hanzi: "你的车是新的还是旧的", pinyin: "Nǐ de chē shì xīn de háishi jiù de", meaning: "Xe của bạn mới hay cũ?" },
  "Bài 15": { hanzi: "你们公司有多少职员", pinyin: "Nǐmen gōngsī yǒu duōshao zhíyuán", meaning: "Công ty của các bạn có bao nhiêu nhân viên?" },
};

const characterDiagramMap = {
  "你": { parts: ["亻", "尔"], guide: "Trái trước · phải sau" },
  "好": { parts: ["女", "子"], guide: "Trái trước · phải sau" },
  "汉": { parts: ["氵", "又"], guide: "Bộ thủ trước · phần còn lại sau" },
  "语": { parts: ["讠", "吾"], guide: "Trái trước · phải sau" },
  "明": { parts: ["日", "月"], guide: "Trái trước · phải sau" },
  "问": { parts: ["门", "口"], guide: "Ngoài trước · trong sau" },
  "国": { parts: ["囗", "玉"], guide: "Ngoài trước · trong sau · đóng khung cuối" },
  "们": { parts: ["亻", "门"], guide: "Trái trước · phải sau" },
  "他": { parts: ["亻", "也"], guide: "Trái trước · phải sau" },
  "她": { parts: ["女", "也"], guide: "Trái trước · phải sau" },
  "妈": { parts: ["女", "马"], guide: "Trái trước · phải sau" },
  "忙": { parts: ["忄", "亡"], guide: "Trái trước · phải sau" },
  "难": { parts: ["又", "隹"], guide: "Trái trước · phải sau" },
  "请": { parts: ["讠", "青"], guide: "Trái trước · phải sau" },
  "说": { parts: ["讠", "兑"], guide: "Trái trước · phải sau" },
  "听": { parts: ["口", "斤"], guide: "Trái trước · phải sau" },
  "休": { parts: ["亻", "木"], guide: "Trái trước · phải sau" },
  "白": { parts: ["丿", "日"], guide: "Trên trước · dưới sau" },
  "十": { parts: ["一", "丨"], guide: "Ngang trước · sổ sau" },
  "大": { parts: ["一", "丿", "㇏"], guide: "Ngang trước · phẩy trước mác sau" },
  "口": { parts: ["丨", "𠃍", "一"], guide: "Vào trước · đóng khung sau" },
};

const slideKindMeta = {
  writing: { label: "Cách viết", icon: "pen-tool" },
  sound: { label: "Ngữ âm", icon: "audio-lines" },
  vocabulary: { label: "Từ vựng", icon: "languages" },
  example: { label: "Ví dụ", icon: "message-circle-more" },
  practice: { label: "Luyện tập", icon: "list-checks" },
  concept: { label: "Kiến thức", icon: "book-open-text" },
};

const audioLessons = [
  { id: "audio-01", number: 1, title: "Bài 1", theme: "你好 · Xin chào", src: "audio/lesson-01.mp3", lesson: "Bài 1" },
  { id: "audio-02", number: 2, title: "Bài 2", theme: "汉语不太难 · Tiếng Hán không khó lắm", src: "audio/lesson-02.mp3", lesson: "Bài 2" },
  { id: "audio-03", number: 3, title: "Bài 3", theme: "明天见 · Ngày mai gặp", src: "audio/lesson-03.mp3", lesson: "Bài 3" },
  { id: "audio-04", number: 4, title: "Bài 4", theme: "你去哪儿 · Bạn đi đâu?", src: "audio/lesson-04.mp3", lesson: "Bài 4" },
  { id: "audio-05", number: 5, title: "Bài 5", theme: "这是王老师 · Đây là thầy giáo Vương", src: "audio/lesson-05.mp3", lesson: "Bài 5" },
  { id: "audio-06", number: 6, title: "Bài 6", theme: "我学习汉语 · Tôi học tiếng Hán", src: "audio/lesson-06.mp3", lesson: "Bài 6" },
  { id: "audio-07", number: 7, title: "Bài 7", theme: "你吃什么 · Bạn ăn gì?", src: "audio/lesson-07.mp3", lesson: "Bài 7" },
  { id: "audio-08", number: 8, title: "Bài 8", theme: "苹果一斤多少钱 · Táo một cân bao nhiêu tiền?", src: "audio/lesson-08.mp3", lesson: "Bài 8" },
  { id: "audio-09", number: 9, title: "Bài 9", theme: "我要换钱 · Tôi muốn đổi tiền", src: "audio/lesson-09.mp3", lesson: "Bài 9" },
  { id: "audio-10", number: 10, title: "Bài 10", theme: "他住哪儿 · Anh ấy sống ở đâu?", src: "audio/lesson-10.mp3", lesson: "Bài 10" },
  { id: "audio-11", number: 11, title: "Bài 11", theme: "我们都是留学生 · Chúng tôi đều là lưu học sinh", src: "audio/lesson-11.mp3", lesson: "Bài 11" },
  { id: "audio-12", number: 12, title: "Bài 12", theme: "你在哪儿学习 · Bạn học ở đâu?", src: "audio/lesson-12.mp3", lesson: "Bài 12" },
  { id: "audio-13", number: 13, title: "Bài 13", theme: "这是不是中药 · Đây có phải thuốc Đông y không?", src: "audio/lesson-13.mp3", lesson: "Bài 13" },
  { id: "audio-14", number: 14, title: "Bài 14", theme: "你的车是新的还是旧的 · Xe của bạn mới hay cũ?", src: "audio/lesson-14.mp3", lesson: "Bài 14" },
  { id: "audio-15", number: 15, title: "Bài 15", theme: "你们公司有多少职员 · Công ty có bao nhiêu nhân viên?", src: "audio/lesson-15.mp3", lesson: "Bài 15" },
];

const audioTranscripts = window.AUDIO_TRANSCRIPTS || {};
const generatedVocabulary = window.LESSON_VOCAB || [];

const seedVocabulary = [
  { id: "l1-wo", lesson: "Bài 1", hanzi: "我", pinyin: "wǒ", hanViet: "ngã", meaning: "tôi", note: "Bản ngã, cái tôi." },
  { id: "l1-ni", lesson: "Bài 1", hanzi: "你", pinyin: "nǐ", hanViet: "nhĩ", meaning: "bạn", note: "亻 + 冖 + 小: người bạn chơi với mình từ nhỏ." },
  { id: "l1-hao", lesson: "Bài 1", hanzi: "好", pinyin: "hǎo", hanViet: "hảo", meaning: "tốt, đẹp, khỏe", note: "女 + 子: người phụ nữ và đứa con." },
  { id: "l1-nihao", lesson: "Bài 1", hanzi: "你好", pinyin: "nǐ hǎo", hanViet: "nhĩ hảo", meaning: "xin chào", note: "Hai thanh 3 cạnh nhau đọc thành ní hǎo." },
  { id: "l1-duibuqi", lesson: "Bài 1", hanzi: "对不起", pinyin: "duìbùqǐ", hanViet: "đối bất khởi", meaning: "xin lỗi", note: "Cụm giao tiếp cơ bản." },
  { id: "l1-yi", lesson: "Bài 1", hanzi: "一", pinyin: "yī", hanViet: "nhất", meaning: "một", note: "Một nét ngang." },
  { id: "l1-er", lesson: "Bài 1", hanzi: "二", pinyin: "èr", hanViet: "nhị", meaning: "hai", note: "Hai nét ngang." },
  { id: "l1-san", lesson: "Bài 1", hanzi: "三", pinyin: "sān", hanViet: "tam", meaning: "ba", note: "Ba nét ngang." },
  { id: "l1-si", lesson: "Bài 1", hanzi: "四", pinyin: "sì", hanViet: "tứ", meaning: "bốn", note: "Tưởng tượng ô cửa sổ có rèm." },
  { id: "l1-wu", lesson: "Bài 1", hanzi: "五", pinyin: "wǔ", hanViet: "ngũ", meaning: "năm", note: "Người ngồi bó gối hoặc vắt chân chữ ngũ." },
  { id: "l1-liu", lesson: "Bài 1", hanzi: "六", pinyin: "liù", hanViet: "lục", meaning: "sáu", note: "亠 + 八: đứa trẻ 6 tuổi dang tay chân." },
  { id: "l1-qi", lesson: "Bài 1", hanzi: "七", pinyin: "qī", hanViet: "thất", meaning: "bảy", note: "Giống số 7 Việt Nam lộn ngược." },
  { id: "l1-ba", lesson: "Bài 1", hanzi: "八", pinyin: "bā", hanViet: "bát", meaning: "tám", note: "Giống cái bát úp xuống." },
  { id: "l1-jiu", lesson: "Bài 1", hanzi: "九", pinyin: "jiǔ", hanViet: "cửu", meaning: "chín", note: "Người chống tay hít đất." },
  { id: "l1-shi", lesson: "Bài 1", hanzi: "十", pinyin: "shí", hanViet: "thập", meaning: "mười", note: "Hình cây thánh giá." },
  { id: "l1-da", lesson: "Bài 1", hanzi: "大", pinyin: "dà", hanViet: "đại", meaning: "to, lớn", note: "Người dang tay chân giữa đất trời." },
  { id: "l1-bu", lesson: "Bài 1", hanzi: "不", pinyin: "bù", hanViet: "bất", meaning: "không", note: "Đọc bú khi đứng trước thanh 4." },
  { id: "l1-kou", lesson: "Bài 1", hanzi: "口", pinyin: "kǒu", hanViet: "khẩu", meaning: "miệng", note: "Giống cái miệng đang há ra." },
  { id: "l1-bai", lesson: "Bài 1", hanzi: "白", pinyin: "bái", hanViet: "bạch", meaning: "màu trắng", note: "Nét phẩy + 日: ánh mặt trời màu trắng." },
  { id: "l1-nv", lesson: "Bài 1", hanzi: "女", pinyin: "nǚ", hanViet: "nữ", meaning: "nữ, phụ nữ, con gái", note: "Người phụ nữ dang tay múa lụa." },
  { id: "l1-ma-horse", lesson: "Bài 1", hanzi: "马", pinyin: "mǎ", hanViet: "mã", meaning: "ngựa", note: "Tưởng tượng giống con ngựa." },
  { id: "l1-ma-question", lesson: "Bài 1", hanzi: "吗", pinyin: "ma", hanViet: "", meaning: "trợ từ nghi vấn: không, à, chứ", note: "口 + 马: hỏi thì phải mở miệng." },
  { id: "l2-mang", lesson: "Bài 2", hanzi: "忙", pinyin: "máng", hanViet: "mang", meaning: "bận", note: "忄 + 亡: quá bận dễ đánh mất chuyện tình cảm." },
  { id: "l2-hen", lesson: "Bài 2", hanzi: "很", pinyin: "hěn", hanViet: "ngận, hấn", meaning: "rất", note: "Thường đứng trước tính từ: 很忙, 很好." },
  { id: "l2-hanyu", lesson: "Bài 2", hanzi: "汉语", pinyin: "hànyǔ", hanViet: "Hán ngữ", meaning: "tiếng Hán", note: "汉 + 语: ngôn ngữ của người Hán." },
  { id: "l2-nan", lesson: "Bài 2", hanzi: "难", pinyin: "nán", hanViet: "nan", meaning: "khó", note: "又 + 隹: bắt đi bắt lại một chú chim rất khó." },
  { id: "l2-tai", lesson: "Bài 2", hanzi: "太", pinyin: "tài", hanViet: "thái", meaning: "quá, lắm", note: "不太 + tính từ: không quá..." },
  { id: "l2-baba", lesson: "Bài 2", hanzi: "爸爸", pinyin: "bàba", hanViet: "ba ba", meaning: "bố", note: "父 + 巴 gợi âm đọc." },
  { id: "l2-mama", lesson: "Bài 2", hanzi: "妈妈", pinyin: "māma", hanViet: "ma ma", meaning: "mẹ", note: "女 + 马: người phụ nữ trong gia đình." },
  { id: "l2-ta-male", lesson: "Bài 2", hanzi: "他", pinyin: "tā", hanViet: "tha", meaning: "anh ta, ông ấy", note: "亻 + 也." },
  { id: "l2-ta-female", lesson: "Bài 2", hanzi: "她", pinyin: "tā", hanViet: "tha", meaning: "cô ta, bà ấy", note: "女 + 也." },
  { id: "l2-nan-male", lesson: "Bài 2", hanzi: "男", pinyin: "nán", hanViet: "nam", meaning: "nam giới, con trai", note: "田 + 力: người có sức lực làm ruộng." },
  { id: "l2-gege", lesson: "Bài 2", hanzi: "哥哥", pinyin: "gēge", hanViet: "ca ca", meaning: "anh trai", note: "Dùng trong 你哥哥忙吗？" },
  { id: "l2-didi", lesson: "Bài 2", hanzi: "弟弟", pinyin: "dìdi", hanViet: "đệ đệ", meaning: "em trai", note: "Có trong 小弟, 兄弟." },
  { id: "l2-meimei", lesson: "Bài 2", hanzi: "妹妹", pinyin: "mèimei", hanViet: "muội muội", meaning: "em gái", note: "女 + 未: người con gái còn trẻ." },
  { id: "l2-jiejie", lesson: "Bài 2", hanzi: "姐姐", pinyin: "jiějie", hanViet: "tỷ tỷ", meaning: "chị gái", note: "Có trong 大姐, 好姐妹." },
  { id: "l2-xiao", lesson: "Bài 2", hanzi: "小", pinyin: "xiǎo", hanViet: "tiểu", meaning: "nhỏ, bé", note: "Cái cây bị đẽo nhỏ đi." },
  { id: "l2-nannv", lesson: "Bài 2", hanzi: "男女", pinyin: "nánnǚ", hanViet: "nam nữ", meaning: "nam nữ", note: "男 + 女." },
  { id: "l3-xue", lesson: "Bài 3", hanzi: "学", pinyin: "xué", hanViet: "học", meaning: "học", note: "Trẻ con hì hục học vã mồ hôi." },
  { id: "l3-yingyu", lesson: "Bài 3", hanzi: "英语", pinyin: "yīngyǔ", hanViet: "Anh ngữ", meaning: "tiếng Anh", note: "英 + 语." },
  { id: "l3-alaboyu", lesson: "Bài 3", hanzi: "阿拉伯语", pinyin: "Ālābó yǔ", hanViet: "A lạp bá ngữ", meaning: "tiếng Ả Rập", note: "Dịch âm từ Arabic." },
  { id: "l3-deyu", lesson: "Bài 3", hanzi: "德语", pinyin: "Déyǔ", hanViet: "Đức ngữ", meaning: "tiếng Đức", note: "Cô ấy học tiếng Đức: 她学德语。" },
  { id: "l3-eyu", lesson: "Bài 3", hanzi: "俄语", pinyin: "Éyǔ", hanViet: "Nga ngữ", meaning: "tiếng Nga", note: "亻 + 我." },
  { id: "l3-fayu", lesson: "Bài 3", hanzi: "法语", pinyin: "Fǎyǔ", hanViet: "Pháp ngữ", meaning: "tiếng Pháp", note: "氵 + 去." },
  { id: "l3-hanguoyu", lesson: "Bài 3", hanzi: "韩国语", pinyin: "Hánguóyǔ", hanViet: "Hàn quốc ngữ", meaning: "tiếng Hàn Quốc", note: "韩 + 国 + 语." },
  { id: "l3-riyu", lesson: "Bài 3", hanzi: "日语", pinyin: "Rìyǔ", hanViet: "Nhật ngữ", meaning: "tiếng Nhật", note: "日 là mặt trời." },
  { id: "l3-xibanyayu", lesson: "Bài 3", hanzi: "西班牙语", pinyin: "Xībānyáyǔ", hanViet: "Tây Ban Nha ngữ", meaning: "tiếng Tây Ban Nha", note: "西 + 班 + 牙 + 语." },
  { id: "l3-dui", lesson: "Bài 3", hanzi: "对", pinyin: "duì", hanViet: "đối", meaning: "đúng, được", note: "Làm đi làm lại từng chút một sẽ đúng." },
  { id: "l3-mingtian", lesson: "Bài 3", hanzi: "明天", pinyin: "míngtiān", hanViet: "minh thiên", meaning: "ngày mai", note: "明: 日 + 月; 天: trời/ngày." },
  { id: "l3-jian", lesson: "Bài 3", hanzi: "见", pinyin: "jiàn", hanViet: "kiến", meaning: "gặp, thấy", note: "Bộ kiến: 冂 + 儿." },
  { id: "l3-zaijian", lesson: "Bài 3", hanzi: "再见", pinyin: "zàijiàn", hanViet: "tái kiến", meaning: "tạm biệt", note: "Hẹn gặp lại." },
  { id: "l3-mingtianjian", lesson: "Bài 3", hanzi: "明天见", pinyin: "míngtiān jiàn", hanViet: "minh thiên kiến", meaning: "ngày mai gặp", note: "Câu chủ đề của Bài 3." },
  { id: "l3-qu", lesson: "Bài 3", hanzi: "去", pinyin: "qù", hanViet: "khứ", meaning: "đi", note: "土 + 厶: những gì đi qua là quá khứ." },
  { id: "l3-youju", lesson: "Bài 3", hanzi: "邮局", pinyin: "yóujú", hanViet: "bưu cục", meaning: "bưu điện", note: "Ngày mai tôi đi bưu điện: 明天我去邮局。" },
  { id: "l3-ji", lesson: "Bài 3", hanzi: "寄", pinyin: "jì", hanViet: "ký", meaning: "gửi", note: "宀 + 大 + 可." },
  { id: "l3-xin", lesson: "Bài 3", hanzi: "信", pinyin: "xìn", hanViet: "tín", meaning: "thư", note: "亻 + 言: con người truyền tải ngôn từ." },
  { id: "l3-yinhang", lesson: "Bài 3", hanzi: "银行", pinyin: "yínháng", hanViet: "ngân hàng", meaning: "ngân hàng", note: "银: kim loại bạc; 行: đi bằng hai chân." },
  { id: "l3-qu-money", lesson: "Bài 3", hanzi: "取", pinyin: "qǔ", hanViet: "thủ", meaning: "rút, lấy", note: "耳 + 又: nghe và làm lại để rút kinh nghiệm." },
  { id: "l3-qian", lesson: "Bài 3", hanzi: "钱", pinyin: "qián", hanViet: "tiền", meaning: "tiền", note: "钅 + 戈 + 一." },
  { id: "l3-beijing", lesson: "Bài 3", hanzi: "北京", pinyin: "Běijīng", hanViet: "Bắc Kinh", meaning: "Bắc Kinh", note: "北 + 京." },
  { id: "l3-zhongguo", lesson: "Bài 3", hanzi: "中国", pinyin: "Zhōngguó", hanViet: "Trung Quốc", meaning: "Trung Quốc", note: "Xuất hiện trong 去中国." },
  { id: "l3-xiexie", lesson: "Bài 3", hanzi: "谢谢", pinyin: "xièxie", hanViet: "tạ tạ", meaning: "cảm ơn", note: "Slide cuối Bài 3." },
  { id: "l4-jintian", lesson: "Bài 4", hanzi: "今天", pinyin: "jīntiān", hanViet: "kim thiên", meaning: "hôm nay", note: "今天你忙吗？ Hôm nay bạn bận không?" },
  { id: "l4-mingtian", lesson: "Bài 4", hanzi: "明天", pinyin: "míngtiān", hanViet: "minh thiên", meaning: "ngày mai", note: "明: 日 + 月; 天: ngày/trời." },
  { id: "l4-zuotian", lesson: "Bài 4", hanzi: "昨天", pinyin: "zuótiān", hanViet: "tác thiên", meaning: "hôm qua", note: "昨: thời gian 日 trôi qua rất nhanh." },
  { id: "l4-tian", lesson: "Bài 4", hanzi: "天", pinyin: "tiān", hanViet: "thiên", meaning: "ngày, trời", note: "我去中国五天。 Tôi đi Trung Quốc 5 ngày." },
  { id: "l4-xingqi", lesson: "Bài 4", hanzi: "星期", pinyin: "xīngqī", hanViet: "tinh kỳ", meaning: "tuần, thứ", note: "Dùng để hỏi/thông báo thứ trong tuần." },
  { id: "l4-xingqiyi", lesson: "Bài 4", hanzi: "星期一", pinyin: "xīngqī yī", hanViet: "", meaning: "thứ Hai", note: "一 là 1." },
  { id: "l4-xingqier", lesson: "Bài 4", hanzi: "星期二", pinyin: "xīngqī èr", hanViet: "", meaning: "thứ Ba", note: "二 là 2." },
  { id: "l4-xingqisan", lesson: "Bài 4", hanzi: "星期三", pinyin: "xīngqī sān", hanViet: "", meaning: "thứ Tư", note: "三 là 3." },
  { id: "l4-xingqisi", lesson: "Bài 4", hanzi: "星期四", pinyin: "xīngqī sì", hanViet: "", meaning: "thứ Năm", note: "四 là 4." },
  { id: "l4-xingqiwu", lesson: "Bài 4", hanzi: "星期五", pinyin: "xīngqī wǔ", hanViet: "", meaning: "thứ Sáu", note: "五 là 5." },
  { id: "l4-xingqiliu", lesson: "Bài 4", hanzi: "星期六", pinyin: "xīngqī liù", hanViet: "", meaning: "thứ Bảy", note: "六 là 6." },
  { id: "l4-xingqitian", lesson: "Bài 4", hanzi: "星期天", pinyin: "xīngqī tiān", hanViet: "", meaning: "Chủ nhật", note: "Cũng có thể nói 星期日." },
  { id: "l4-ji", lesson: "Bài 4", hanzi: "几", pinyin: "jǐ", hanViet: "kỷ", meaning: "mấy, vài", note: "今天星期几？ Hôm nay thứ mấy?" },
  { id: "l4-nar", lesson: "Bài 4", hanzi: "哪儿", pinyin: "nǎr", hanViet: "ná nhi", meaning: "ở đâu", note: "你去哪儿？ Bạn đi đâu?" },
  { id: "l4-nar-there", lesson: "Bài 4", hanzi: "那儿", pinyin: "nàr", hanViet: "ná nhi", meaning: "ở kia, đằng kia", note: "我去那儿。 Tôi đi đằng kia." },
  { id: "l4-hui", lesson: "Bài 4", hanzi: "回", pinyin: "huí", hanViet: "hồi", meaning: "về, quay về", note: "回国: về nước; 回学校: về trường." },
  { id: "l4-xuexiao", lesson: "Bài 4", hanzi: "学校", pinyin: "xuéxiào", hanViet: "học hiệu", meaning: "trường học", note: "学 + 校." },
  { id: "l4-zaijian", lesson: "Bài 4", hanzi: "再见", pinyin: "zàijiàn", hanViet: "tái kiến", meaning: "tạm biệt", note: "明天见。 Mai gặp nhé." },
  { id: "l4-duibuqi", lesson: "Bài 4", hanzi: "对不起", pinyin: "duìbuqǐ", hanViet: "đối bất khởi", meaning: "xin lỗi", note: "Cụm giao tiếp trong bài khóa." },
  { id: "l4-meiguanxi", lesson: "Bài 4", hanzi: "没关系", pinyin: "méiguānxi", hanViet: "một quan hệ", meaning: "không có gì", note: "Đáp lại 对不起." },
  { id: "l4-tiananmen", lesson: "Bài 4", hanzi: "天安门", pinyin: "Tiān'ānmén", hanViet: "Thiên An Môn", meaning: "Thiên An Môn", note: "去天安门: đi Thiên An Môn." },
  { id: "l5-zhe", lesson: "Bài 5", hanzi: "这", pinyin: "zhè", hanViet: "giá", meaning: "đây, này", note: "这 + 是: đây là..." },
  { id: "l5-shi", lesson: "Bài 5", hanzi: "是", pinyin: "shì", hanViet: "thị", meaning: "là, phải", note: "这是什么？ Đây là cái gì?" },
  { id: "l5-laoshi", lesson: "Bài 5", hanzi: "老师", pinyin: "lǎoshī", hanViet: "lão sư", meaning: "thầy, cô, giáo viên", note: "老师好！ Chào thầy cô." },
  { id: "l5-nin", lesson: "Bài 5", hanzi: "您", pinyin: "nín", hanViet: "nâm", meaning: "ngài, bạn/ông/bà trang trọng", note: "你 đặt trong 心 để thể hiện tôn trọng." },
  { id: "l5-qing", lesson: "Bài 5", hanzi: "请", pinyin: "qǐng", hanViet: "thỉnh", meaning: "xin, mời", note: "请进, 请坐, 请喝茶." },
  { id: "l5-jin", lesson: "Bài 5", hanzi: "进", pinyin: "jìn", hanViet: "tiến", meaning: "vào", note: "请进。 Mời vào." },
  { id: "l5-zuo", lesson: "Bài 5", hanzi: "坐", pinyin: "zuò", hanViet: "tọa", meaning: "ngồi", note: "请坐。 Mời ngồi." },
  { id: "l5-he", lesson: "Bài 5", hanzi: "喝", pinyin: "hē", hanViet: "hát", meaning: "uống", note: "请您喝。 Mời ngài uống." },
  { id: "l5-cha", lesson: "Bài 5", hanzi: "茶", pinyin: "chá", hanViet: "trà", meaning: "trà, chè", note: "请喝茶。 Mời uống trà." },
  { id: "l5-xiexie", lesson: "Bài 5", hanzi: "谢谢", pinyin: "xièxie", hanViet: "tạ tạ", meaning: "cảm ơn", note: "谢谢你。 Cảm ơn bạn." },
  { id: "l5-keqi", lesson: "Bài 5", hanzi: "客气", pinyin: "kèqi", hanViet: "khách khí", meaning: "khách sáo", note: "他很客气！ Anh ta rất khách sáo." },
  { id: "l5-bukeqi", lesson: "Bài 5", hanzi: "不客气", pinyin: "bú kèqi", hanViet: "bất khách khí", meaning: "không có gì, đừng khách sáo", note: "Đáp lại 谢谢." },
  { id: "l5-gongzuo", lesson: "Bài 5", hanzi: "工作", pinyin: "gōngzuò", hanViet: "công tác", meaning: "công việc, làm việc", note: "工作忙吗？ Công việc bận không?" },
  { id: "l5-shenti", lesson: "Bài 5", hanzi: "身体", pinyin: "shēntǐ", hanViet: "thân thể", meaning: "sức khỏe, cơ thể", note: "身体好吗？ Sức khỏe tốt không?" },
  { id: "l5-wang", lesson: "Bài 5", hanzi: "王", pinyin: "Wáng", hanViet: "Vương", meaning: "họ Vương", note: "王老师: thầy giáo Vương." },
];

const seedRadicals = [
  { id: "stroke-dian", type: "Nét", symbol: "丶", name: "diǎn", meaning: "nét chấm", note: "Một dấu chấm, từ trên xuống dưới." },
  { id: "stroke-pie", type: "Nét", symbol: "丿", name: "piě", meaning: "nét phẩy", note: "Nét cong kéo xuống từ phải qua trái." },
  { id: "stroke-heng", type: "Nét", symbol: "一", name: "héng", meaning: "nét ngang", note: "Kéo từ trái sang phải." },
  { id: "stroke-shu", type: "Nét", symbol: "丨", name: "shù", meaning: "nét sổ thẳng", note: "Kéo từ trên xuống dưới." },
  { id: "stroke-na", type: "Nét", symbol: "㇏", name: "nà", meaning: "nét mác", note: "Kéo xuống từ trái qua phải." },
  { id: "stroke-ti", type: "Nét", symbol: "㇀", name: "tí", meaning: "nét hất", note: "Đi lên từ trái qua phải." },
  { id: "stroke-gou", type: "Nét", symbol: "亅", name: "gōu", meaning: "nét móc", note: "Móc lên ở cuối nét khác." },
  { id: "stroke-zhe", type: "Nét", symbol: "乛", name: "zhé", meaning: "nét gập", note: "Nét gập giữa hai nét." },
  { id: "rule-1", type: "Quy tắc", symbol: "一 → 丨", name: "ngang trước sổ sau", meaning: "Nét ngang viết trước, nét sổ viết sau.", note: "Ví dụ: 十." },
  { id: "rule-2", type: "Quy tắc", symbol: "丿 → ㇏", name: "phẩy trước mác sau", meaning: "Nét xiên trái viết trước, xiên phải viết sau.", note: "Ví dụ: 八." },
  { id: "rule-3", type: "Quy tắc", symbol: "上 → 下", name: "trên trước dưới sau", meaning: "Nét phía trên viết trước nét phía dưới.", note: "Ví dụ: 二, 三." },
  { id: "rule-4", type: "Quy tắc", symbol: "左 → 右", name: "trái trước phải sau", meaning: "Nét bên trái viết trước nét bên phải.", note: "Ví dụ: 川." },
  { id: "rule-5", type: "Quy tắc", symbol: "外 → 内", name: "ngoài trước trong sau", meaning: "Viết khung ngoài rồi viết phần trong.", note: "Ví dụ: 月." },
  { id: "rule-6", type: "Quy tắc", symbol: "进 → 关", name: "vào trước đóng sau", meaning: "Viết phần vào khung rồi mới đóng khung.", note: "Ví dụ: 回." },
  { id: "rule-7", type: "Quy tắc", symbol: "中 → 两边", name: "giữa trước hai bên sau", meaning: "Viết nét giữa trước, hai bên sau.", note: "Ví dụ: 小." },
  { id: "rad-ren", type: "Bộ thủ", symbol: "亻", name: "bộ nhân đứng", meaning: "người", note: "Xuất hiện trong 你, 他, 信." },
  { id: "rad-nv", type: "Bộ thủ", symbol: "女", name: "bộ nữ", meaning: "phụ nữ, con gái", note: "Xuất hiện trong 好, 妈, 她, 妹, 姐." },
  { id: "rad-kou", type: "Bộ thủ", symbol: "口", name: "bộ khẩu", meaning: "miệng", note: "Xuất hiện trong 吗, 语." },
  { id: "rad-ma", type: "Bộ thủ", symbol: "马", name: "bộ mã", meaning: "ngựa", note: "Gợi âm trong 吗, 妈." },
  { id: "rad-xin", type: "Bộ thủ", symbol: "忄", name: "bộ tâm đứng", meaning: "tâm tư, tình cảm", note: "Xuất hiện trong 忙." },
  { id: "rad-shui", type: "Bộ thủ", symbol: "氵", name: "bộ chấm thủy", meaning: "nước", note: "Xuất hiện trong 汉, 法." },
  { id: "rad-yan", type: "Bộ thủ", symbol: "讠", name: "bộ ngôn", meaning: "ngôn ngữ, lời nói", note: "Xuất hiện trong 语, 说." },
  { id: "rad-zi", type: "Bộ thủ", symbol: "子", name: "bộ tử", meaning: "trẻ con, con", note: "Xuất hiện trong 好, 学." },
  { id: "rad-mu", type: "Bộ thủ", symbol: "木", name: "bộ mộc", meaning: "gỗ, cây", note: "木, 林, 森." },
  { id: "rad-yue", type: "Bộ thủ", symbol: "月", name: "bộ nguyệt", meaning: "mặt trăng, tháng", note: "Xuất hiện trong 明." },
  { id: "rad-ri", type: "Bộ thủ", symbol: "日", name: "bộ nhật", meaning: "mặt trời, ngày", note: "Xuất hiện trong 白, 明, 日语." },
  { id: "rad-jin", type: "Bộ thủ", symbol: "钅", name: "bộ kim", meaning: "kim loại", note: "Xuất hiện trong 银, 钱." },
  { id: "rad-mian", type: "Bộ thủ", symbol: "宀", name: "bộ miên", meaning: "mái nhà", note: "Xuất hiện trong 寄." },
  { id: "rad-fu", type: "Bộ thủ", symbol: "阝", name: "bộ liễu/ấp", meaning: "cây liễu, vùng đất", note: "Xuất hiện trong 阿, 邮." },
  { id: "rad-tian", type: "Bộ thủ", symbol: "田", name: "bộ điền", meaning: "ruộng", note: "Xuất hiện trong 男." },
  { id: "rad-li", type: "Bộ thủ", symbol: "力", name: "bộ lực", meaning: "sức lực", note: "Xuất hiện trong 男." },
  { id: "rad-chi", type: "Bộ thủ", symbol: "彳", name: "bộ xích/nhân kép", meaning: "bước chân, đi", note: "Xuất hiện trong 很, 行, 德." },
  { id: "rad-you", type: "Bộ thủ", symbol: "又", name: "bộ hựu", meaning: "làm lại, tay phải", note: "Xuất hiện trong 汉, 难, 对, 取." },
  { id: "rad-cao", type: "Bộ thủ", symbol: "艹", name: "bộ thảo", meaning: "cỏ, cây cỏ", note: "Xuất hiện trong 英." },
  { id: "rad-wei", type: "Bộ thủ", symbol: "囗", name: "bộ vi", meaning: "bao quanh", note: "Xuất hiện trong 国." },
  { id: "rad-yu", type: "Bộ thủ", symbol: "玉", name: "bộ ngọc", meaning: "ngọc", note: "Xuất hiện trong 国." },
  { id: "rad-mi", type: "Bộ thủ", symbol: "冖", name: "bộ mịch", meaning: "khăn, dải lụa", note: "Xuất hiện trong 你, 学." },
  { id: "rad-shi", type: "Bộ thủ", symbol: "尸", name: "bộ thi", meaning: "thân người", note: "Xuất hiện trong 局." },
  { id: "rad-jiong", type: "Bộ thủ", symbol: "冂", name: "bộ quynh", meaning: "vùng biên giới, khung", note: "Xuất hiện trong 见, 英." },
  { id: "rad-chuo", type: "Bộ thủ", symbol: "辶", name: "bộ quai sước", meaning: "bước chân đi, di chuyển", note: "Xuất hiện trong 这, 进." },
  { id: "rad-wen", type: "Bộ thủ", symbol: "文", name: "bộ văn", meaning: "văn chương, văn vở", note: "Xuất hiện trong 这." },
  { id: "rad-xin-heart", type: "Bộ thủ", symbol: "心", name: "bộ tâm", meaning: "tim, tấm lòng", note: "Xuất hiện trong 您." },
  { id: "rad-dao", type: "Bộ thủ", symbol: "刂", name: "bộ đao đứng", meaning: "dao, gươm", note: "Xuất hiện trong 师." },
  { id: "rad-jin-cloth", type: "Bộ thủ", symbol: "巾", name: "bộ cân", meaning: "khăn, vải", note: "Xuất hiện trong 师." },
  { id: "rad-men", type: "Bộ thủ", symbol: "门", name: "bộ môn", meaning: "cửa", note: "Xuất hiện trong 天安门." },
  { id: "rad-zou", type: "Bộ thủ", symbol: "走", name: "bộ tẩu", meaning: "đi, chạy", note: "Xuất hiện trong 起." },
  { id: "rad-ji-self", type: "Bộ thủ", symbol: "己", name: "bộ kỷ", meaning: "bản thân mình", note: "Xuất hiện trong 起." },
  { id: "rad-shen", type: "Bộ thủ", symbol: "身", name: "bộ thân", meaning: "thân thể", note: "Xuất hiện trong 身体, 谢." },
  { id: "rad-cun", type: "Bộ thủ", symbol: "寸", name: "bộ thốn", meaning: "tấc, chút một", note: "Xuất hiện trong 对, 谢." },
  { id: "rad-bao", type: "Bộ thủ", symbol: "勹", name: "bộ bao", meaning: "bao bọc, ôm", note: "Xuất hiện trong 喝." },
  { id: "rad-zhi", type: "Bộ thủ", symbol: "夂", name: "bộ truy", meaning: "đi, bước đi", note: "Xuất hiện trong 客." },
  { id: "rad-jing", type: "Bộ thủ", symbol: "井", name: "bộ tỉnh", meaning: "cái giếng", note: "Xuất hiện trong 进." },
  { id: "rad-ben", type: "Bộ thủ", symbol: "本", name: "chữ bản", meaning: "gốc, căn bản", note: "Xuất hiện trong 体." },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const storage = {
  get(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

let customVocab = storage.get("hanReview.customVocab", []);
let customRadicals = storage.get("hanReview.customRadicals", []);
let remembered = new Set(storage.get("hanReview.remembered", []));
let listenedAudio = new Set(storage.get("hanReview.listenedAudio", []));
let foundationFilter = "all";

const cardState = {
  mode: "vocab",
  lesson: "all",
  deck: [],
  index: 0,
  flipped: false,
};

const quizState = {
  mode: "meaning",
  lesson: "all",
  current: null,
  answered: false,
  correct: 0,
  total: 0,
};

const audioState = {
  index: 0,
  speed: 1,
  activeTranscriptIndex: -1,
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  }[char]));
}

function normalize(value) {
  return String(value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

function allVocab() {
  return [...seedVocabulary, ...generatedVocabulary, ...customVocab];
}

function allRadicals() {
  return [...seedRadicals, ...customRadicals];
}

const foundationGroups = [
  {
    type: "Nét",
    title: "Nét viết",
    intro: "8 nét cơ bản để nhận diện và viết chữ Hán từ đầu.",
  },
  {
    type: "Quy tắc",
    title: "Quy tắc viết",
    intro: "7 quy tắc thứ tự nét giúp chữ cân và dễ nhớ hơn.",
  },
  {
    type: "Bộ thủ",
    title: "Bộ thủ",
    intro: "Các bộ thủ nền tảng xuất hiện trong từ mới của 3 bài.",
  },
];

function lessonTitles(includeAll = true) {
  const titles = lessons.map((lesson) => lesson.title);
  return includeAll ? ["all", ...titles, "Tự thêm"] : titles;
}

function fillLessonSelect(select, includeAll = true) {
  const current = select.value;
  select.innerHTML = lessonTitles(includeAll)
    .map((value) => `<option value="${escapeHtml(value)}">${value === "all" ? "Tất cả" : escapeHtml(value)}</option>`)
    .join("");
  if ([...select.options].some((option) => option.value === current)) {
    select.value = current;
  }
}

function saveAll() {
  storage.set("hanReview.customVocab", customVocab);
  storage.set("hanReview.customRadicals", customRadicals);
  storage.set("hanReview.remembered", [...remembered]);
  storage.set("hanReview.listenedAudio", [...listenedAudio]);
}

function refreshIcons() {
  if (window.lucide) window.lucide.createIcons();
}

function matchesQuery(item, query, fields) {
  if (!query) return true;
  const text = fields.map((field) => item[field] || "").join(" ");
  return normalize(text).includes(normalize(query));
}

function entryById(id) {
  return allVocab().find((item) => item.id === id) || allRadicals().find((item) => item.id === id);
}

function updateStats() {
  const slideCount = lessons.reduce((sum, lesson) => sum + lesson.slideCount, 0);
  const rememberedWords = allVocab().filter((item) => remembered.has(item.id)).length;
  $("#statLessons").textContent = lessons.length;
  $("#statSlides").textContent = slideCount;
  $("#statWords").textContent = allVocab().length;
  $("#statSaved").textContent = rememberedWords;
}

function getLessonMeta(title) {
  return lessonMetaMap[title] || {
    hanzi: lessonNameMap[title] || title,
    pinyin: "",
    meaning: lessonNameMap[title] || title,
  };
}

function getSlideKind(slide, vocabularyItem) {
  const content = normalize(slide.lines.join(" "));
  if (/net chu|quy tac viet|viet chu|bo thu|cau tao chu/.test(content)) return "writing";
  if (/phien am|thanh mau|van mau|thanh dieu|ghep van|ngu am/.test(content)) return "sound";
  if (/bai tap|luyen tap|on tap|practice/.test(content)) return "practice";
  if (/vi du|bai khoa|hoi thoai|mau cau/.test(content)) return "example";
  if (vocabularyItem) return "vocabulary";
  return "concept";
}

function findSlideVocabulary(slide) {
  const sourceLines = slide.lines.map((line) => line.trim());
  const lessonItems = allVocab().filter((item) => item.lesson === slide.lessonTitle && item.hanzi);
  const exact = lessonItems.find((item) => sourceLines.some((line) => line === item.hanzi));
  if (exact) return exact;
  const joined = sourceLines.join(" ");
  return lessonItems
    .filter((item) => joined.includes(item.hanzi))
    .sort((a, b) => b.hanzi.length - a.hanzi.length)[0] || null;
}

function extractFeaturedHanzi(lines) {
  const direct = lines
    .map((line) => line.trim())
    .find((line) => /^[\u3400-\u9fff\s，。！？、：；（）《》]{1,18}$/.test(line) && /[\u3400-\u9fff]/.test(line));
  if (direct) return direct.replace(/[^\u3400-\u9fff]/g, "").slice(0, 10);
  const matches = lines.flatMap((line) => line.match(/[\u3400-\u9fff]{1,10}/g) || []);
  return matches.find((item) => item.length <= 6) || "";
}

function renderCharacterComposition(hanzi) {
  const diagram = characterDiagramMap[hanzi];
  const characters = Array.from(hanzi);
  const parts = diagram?.parts || (characters.length > 1 && characters.length <= 4 ? characters : []);
  if (!parts.length) return "";
  return `
    <div class="character-composition" aria-label="Sơ đồ cấu tạo chữ ${escapeHtml(hanzi)}">
      <div class="composition-parts">
        ${parts.map((part, index) => `${index ? '<span class="composition-sign">+</span>' : ""}<span class="component-glyph">${escapeHtml(part)}</span>`).join("")}
        <span class="composition-sign result">→</span>
        <strong>${escapeHtml(hanzi)}</strong>
      </div>
      <small>${escapeHtml(diagram?.guide || "Ghép các chữ theo thứ tự từ trái sang phải")}</small>
    </div>
  `;
}

function slideBodyLines(slide, vocabularyItem) {
  if (!vocabularyItem) return slide.lines.filter((line) => line.trim());
  const hiddenValues = new Set([
    vocabularyItem.hanzi,
    vocabularyItem.pinyin,
    vocabularyItem.hanViet,
    vocabularyItem.meaning,
  ].filter(Boolean).map((value) => normalize(value)));
  return slide.lines.filter((line) => {
    const trimmed = line.trim();
    if (!trimmed || /^\d+$/.test(trimmed)) return false;
    return !hiddenValues.has(normalize(trimmed));
  });
}

function renderSlideIllustration(slide, vocabularyItem, kind) {
  const featuredHanzi = vocabularyItem?.hanzi || extractFeaturedHanzi(slide.lines);
  const meta = slideKindMeta[kind];
  if (!featuredHanzi) {
    return `
      <aside class="slide-concept-illustration ${escapeHtml(kind)}">
        <span class="concept-icon"><i data-lucide="${escapeHtml(meta.icon)}"></i></span>
        <strong>${escapeHtml(meta.label)}</strong>
        <small>Sơ đồ hóa nội dung chính</small>
      </aside>
    `;
  }
  return `
    <aside class="slide-character-illustration">
      <button class="character-grid-button" type="button" data-slide-speak="${escapeHtml(featuredHanzi)}" title="Nghe phát âm ${escapeHtml(featuredHanzi)}">
        <span class="character-grid-lines" aria-hidden="true"></span>
        <strong>${escapeHtml(featuredHanzi)}</strong>
        <i data-lucide="volume-2"></i>
      </button>
      <div class="slide-character-meta">
        <b>${escapeHtml(vocabularyItem?.pinyin || meta.label)}</b>
        <span>${escapeHtml(vocabularyItem?.meaning || "Nhìn chữ để ghi nhớ hình dáng")}</span>
      </div>
      ${renderCharacterComposition(featuredHanzi)}
    </aside>
  `;
}

const slideFallbackVocabulary = [
  ["练习", "liànxí", "luyện tập"], ["复习", "fùxí", "ôn tập"], ["课文", "kèwén", "bài khóa"],
  ["生词", "shēngcí", "từ mới"], ["语音", "yǔyīn", "ngữ âm"], ["声母", "shēngmǔ", "thanh mẫu"],
  ["韵母", "yùnmǔ", "vận mẫu"], ["声调", "shēngdiào", "thanh điệu"], ["拼音", "pīnyīn", "pinyin"],
  ["第一课", "dì yī kè", "bài 1"], ["第二课", "dì èr kè", "bài 2"], ["第三课", "dì sān kè", "bài 3"],
  ["第四课", "dì sì kè", "bài 4"], ["第五课", "dì wǔ kè", "bài 5"], ["第", "dì", "thứ"],
  ["例", "lì", "ví dụ"], ["儿", "ér", "con; âm uốn lưỡi"], ["点儿", "diǎnr", "một chút"],
  ["点", "diǎn", "giờ; điểm"], ["多少", "duōshao", "bao nhiêu"], ["少", "shǎo", "ít"],
  ["英国", "Yīngguó", "nước Anh"], ["法国", "Fǎguó", "nước Pháp"], ["韩国", "Hánguó", "Hàn Quốc"],
  ["日本", "Rìběn", "Nhật Bản"], ["越南", "Yuènán", "Việt Nam"], ["美国", "Měiguó", "Hoa Kỳ"],
  ["欧洲", "Ōuzhōu", "châu Âu"], ["亚洲", "Yàzhōu", "châu Á"], ["澳洲", "Àozhōu", "châu Úc"],
  ["公司", "gōngsī", "công ty"], ["职员", "zhíyuán", "nhân viên"], ["手机", "shǒujī", "điện thoại di động"],
  ["电话", "diànhuà", "điện thoại"], ["饭馆", "fànguǎn", "nhà hàng"], ["教室", "jiàoshì", "phòng học"],
  ["苹果", "píngguǒ", "táo"], ["颜色", "yánsè", "màu sắc"], ["报纸", "bàozhǐ", "báo"],
  ["照相机", "zhàoxiàngjī", "máy ảnh"], ["洗手间", "xǐshǒujiān", "nhà vệ sinh"], ["衣服", "yīfu", "quần áo"],
  ["外国", "wàiguó", "nước ngoài"], ["公斤", "gōngjīn", "kilôgam"], ["美元", "měiyuán", "đô la Mỹ"],
  ["欧元", "ōuyuán", "euro"], ["人民币", "rénmínbì", "nhân dân tệ"], ["香港", "Xiānggǎng", "Hồng Kông"],
  ["老师", "lǎoshī", "giáo viên"], ["朋友", "péngyou", "bạn bè"], ["喜欢", "xǐhuan", "thích"],
  ["什么", "shénme", "cái gì"], ["怎么", "zěnme", "thế nào"], ["工作", "gōngzuò", "làm việc; công việc"],
  ["星期", "xīngqī", "tuần; thứ"], ["今天", "jīntiān", "hôm nay"], ["昨天", "zuótiān", "hôm qua"],
  ["明天", "míngtiān", "ngày mai"], ["认识", "rènshi", "quen; biết"], ["介绍", "jièshào", "giới thiệu"],
  ["留学生", "liúxuéshēng", "du học sinh"], ["自行车", "zìxíngchē", "xe đạp"], ["出租车", "chūzūchē", "taxi"],
  ["咖啡", "kāfēi", "cà phê"], ["商店", "shāngdiàn", "cửa hàng"], ["医院", "yīyuàn", "bệnh viện"],
  ["银行", "yínháng", "ngân hàng"], ["大学", "dàxué", "đại học"], ["宿舍", "sùshè", "ký túc xá"],
  ["经理", "jīnglǐ", "quản lý"], ["律师", "lǜshī", "luật sư"], ["记者", "jìzhě", "phóng viên"],
  ["照片", "zhàopiàn", "ảnh"], ["地图", "dìtú", "bản đồ"], ["杂志", "zázhì", "tạp chí"],
  ["世界", "shìjiè", "thế giới"], ["高兴", "gāoxìng", "vui"], ["家务", "jiāwù", "việc nhà"],
  ["马", "mǎ", "ngựa"], ["馬", "mǎ", "ngựa (phồn thể)"], ["爱", "ài", "yêu"], ["愛", "ài", "yêu (phồn thể)"],
  ["汉", "hàn", "Hán"], ["语", "yǔ", "ngôn ngữ"], ["文", "wén", "văn; chữ viết"], ["音", "yīn", "âm thanh"],
  ["乐", "yuè", "nhạc"], ["声", "shēng", "âm; tiếng"], ["母", "mǔ", "mẹ; mẫu"], ["调", "diào", "điệu; thanh"],
  ["妈", "mā", "mẹ"], ["爸", "bà", "bố"], ["哥", "gē", "anh trai"], ["姐", "jiě", "chị gái"],
  ["弟", "dì", "em trai"], ["妹", "mèi", "em gái"], ["日", "rì", "ngày; mặt trời"], ["月", "yuè", "tháng; mặt trăng"],
  ["木", "mù", "gỗ; cây"], ["林", "lín", "rừng"], ["森", "sēn", "rừng rậm"], ["火", "huǒ", "lửa"],
  ["水", "shuǐ", "nước"], ["土", "tǔ", "đất"], ["金", "jīn", "vàng; kim loại"], ["田", "tián", "ruộng"],
  ["山", "shān", "núi"], ["川", "chuān", "sông"], ["石", "shí", "đá"], ["牛", "niú", "bò"],
  ["羊", "yáng", "dê; cừu"], ["鱼", "yú", "cá"], ["鸟", "niǎo", "chim"], ["虫", "chóng", "côn trùng"],
  ["米", "mǐ", "gạo; mét"], ["衣", "yī", "áo"], ["车", "chē", "xe"], ["手", "shǒu", "tay"],
  ["足", "zú", "chân"], ["目", "mù", "mắt"], ["耳", "ěr", "tai"], ["口", "kǒu", "miệng; khẩu"],
  ["心", "xīn", "tim; lòng"], ["身", "shēn", "thân; cơ thể"], ["女", "nǚ", "nữ"], ["子", "zǐ", "con; đứa trẻ"],
  ["人", "rén", "người"], ["大", "dà", "to; lớn"], ["小", "xiǎo", "nhỏ"], ["中", "zhōng", "giữa; Trung"],
  ["上", "shàng", "trên; lên"], ["下", "xià", "dưới; xuống"], ["左", "zuǒ", "trái"], ["右", "yòu", "phải"],
  ["外", "wài", "ngoài"], ["内", "nèi", "trong"], ["前", "qián", "trước"], ["后", "hòu", "sau"],
  ["东", "dōng", "đông"], ["西", "xī", "tây"], ["南", "nán", "nam"], ["北", "běi", "bắc"],
  ["红", "hóng", "đỏ"], ["黄", "huáng", "vàng"], ["蓝", "lán", "xanh lam"], ["绿", "lǜ", "xanh lá"],
  ["白", "bái", "trắng"], ["黑", "hēi", "đen"], ["灰", "huī", "xám"], ["色", "sè", "màu"],
  ["元", "yuán", "tệ; đồng"], ["角", "jiǎo", "hào; góc"], ["分", "fēn", "phút; xu"], ["本", "běn", "quyển"],
  ["张", "zhāng", "tờ; chiếc"], ["件", "jiàn", "cái; món"], ["支", "zhī", "cây; chiếc"], ["杯", "bēi", "cốc"],
  ["间", "jiān", "phòng; gian"], ["家", "jiā", "nhà; gia đình"], ["店", "diàn", "tiệm"], ["馆", "guǎn", "quán; nhà"],
  ["纸", "zhǐ", "giấy"], ["报", "bào", "báo"], ["照", "zhào", "chụp; chiếu"], ["相", "xiàng", "hình; tướng"],
  ["机", "jī", "máy"], ["电", "diàn", "điện"], ["话", "huà", "lời; thoại"], ["网", "wǎng", "mạng"],
  ["开", "kāi", "mở; bắt đầu"], ["关", "guān", "đóng"], ["骑", "qí", "đi; cưỡi"], ["走", "zǒu", "đi bộ"],
  ["来", "lái", "đến"], ["回", "huí", "về"], ["进", "jìn", "vào"], ["出", "chū", "ra"],
  ["吃", "chī", "ăn"], ["喝", "hē", "uống"], ["买", "mǎi", "mua"], ["卖", "mài", "bán"],
  ["看", "kàn", "xem; nhìn"], ["听", "tīng", "nghe"], ["说", "shuō", "nói"], ["写", "xiě", "viết"],
  ["读", "dú", "đọc"], ["学", "xué", "học"], ["教", "jiāo", "dạy"], ["做", "zuò", "làm"],
  ["找", "zhǎo", "tìm"], ["给", "gěi", "cho"], ["送", "sòng", "tặng; đưa"], ["要", "yào", "muốn; cần"],
  ["能", "néng", "có thể"], ["会", "huì", "biết; sẽ"], ["想", "xiǎng", "muốn; nghĩ"], ["忘", "wàng", "quên"],
  ["的", "de", "của; trợ từ"], ["了", "le", "rồi; trợ từ"], ["吗", "ma", "không?; à?"], ["呢", "ne", "thì sao?"],
  ["吧", "ba", "nhé; đi"], ["啊", "a", "à; ôi"], ["不", "bù", "không"], ["没", "méi", "không; chưa"],
  ["有", "yǒu", "có"], ["是", "shì", "là"], ["在", "zài", "ở; đang"], ["和", "hé", "và"],
  ["也", "yě", "cũng"], ["都", "dōu", "đều"], ["只", "zhǐ", "chỉ"], ["很", "hěn", "rất"],
  ["太", "tài", "quá"], ["还", "hái", "còn; vẫn"], ["再", "zài", "lại; lần nữa"], ["每", "měi", "mỗi"],
  ["这", "zhè", "này"], ["那", "nà", "kia"], ["哪", "nǎ", "nào"], ["谁", "shéi", "ai"],
  ["我", "wǒ", "tôi"], ["你", "nǐ", "bạn"], ["他", "tā", "anh ấy"], ["她", "tā", "cô ấy"],
  ["们", "men", "các; chúng"], ["个", "gè", "cái; người"], ["一", "yī", "một"], ["二", "èr", "hai"],
  ["三", "sān", "ba"], ["四", "sì", "bốn"], ["五", "wǔ", "năm"], ["六", "liù", "sáu"],
  ["七", "qī", "bảy"], ["八", "bā", "tám"], ["九", "jiǔ", "chín"], ["十", "shí", "mười"],
  ["百", "bǎi", "trăm"], ["千", "qiān", "nghìn"], ["万", "wàn", "vạn; mười nghìn"], ["零", "líng", "không"],
  ["丶", "diǎn", "nét chấm"], ["丿", "piě", "nét phẩy"], ["丨", "shù", "nét sổ"], ["亅", "gōu", "nét móc"],
  ["乛", "zhé", "nét gập"], ["亻", "rén", "bộ nhân đứng"], ["冖", "mì", "bộ mịch"], ["宀", "mián", "bộ miên; mái nhà"],
  ["艹", "cǎo", "bộ thảo; cỏ"], ["氵", "shuǐ", "bộ thủy; nước"], ["扌", "shǒu", "bộ thủ; tay"], ["讠", "yán", "bộ ngôn; lời nói"],
  ["囗", "wéi", "bộ vi; vây quanh"], ["辶", "chuò", "bộ sước; đi lại"], ["阝", "fù", "bộ phụ; gò/ấp"], ["刂", "dāo", "bộ đao; dao"],
  ["灬", "huǒ", "bộ hỏa; lửa"], ["纟", "sī", "bộ mịch; tơ"], ["钅", "jīn", "bộ kim"], ["礻", "shì", "bộ thị; thần"],
  ["又", "yòu", "lại; và"], ["英", "yīng", "Anh; ưu tú"], ["冂", "jiōng", "bộ quynh; vùng ngoài"], ["㇕", "zhé", "nét gập"],
  ["厂", "chǎng", "nhà máy"], ["课", "kè", "bài học"], ["亠", "tóu", "bộ đầu"], ["明", "míng", "sáng; ngày mai"],
  ["美", "měi", "đẹp; Mỹ"], ["员", "yuán", "người; nhân viên"], ["彳", "chì", "bộ xích; bước chân"], ["老", "lǎo", "già; lâu năm"],
  ["夕", "xī", "buổi tối"], ["包", "bāo", "gói; túi"], ["职", "zhí", "chức vụ"], ["名", "míng", "tên"],
  ["公", "gōng", "công; chung"], ["力", "lì", "sức lực"], ["克", "kè", "khắc; gam"], ["立", "lì", "đứng"],
  ["匕", "bǐ", "bộ chủy; thìa"], ["星", "xīng", "ngôi sao"], ["乙", "yǐ", "thứ hai; ất"], ["贝", "bèi", "vỏ sò; tiền"],
  ["李", "lǐ", "họ Lý; quả mận"], ["么", "me", "trợ âm"], ["士", "shì", "người trí thức"], ["长", "cháng", "dài; lớn lên"],
  ["饣", "shí", "bộ thực; thức ăn"], ["共", "gòng", "cùng; chung"], ["艮", "gèn", "bộ cấn"], ["巴", "bā", "bám; Ba"],
  ["牙", "yá", "răng"], ["德", "dé", "đức; Đức"], ["罒", "wǎng", "bộ võng; lưới"], ["法", "fǎ", "pháp luật; cách"],
  ["韩", "Hán", "Hàn Quốc; họ Hàn"], ["玉", "yù", "ngọc"], ["寸", "cùn", "tấc"], ["戈", "gē", "bộ qua; giáo"],
  ["乍", "zhà", "bỗng; vừa mới"], ["校", "xiào", "trường học"], ["字", "zì", "chữ"], ["疋", "pǐ", "bộ thất; tấm"],
  ["客", "kè", "khách"], ["工", "gōng", "công; việc"], ["干", "gān", "khô; làm"], ["友", "yǒu", "bạn"],
  ["麦", "mài", "lúa mì; Mai"], ["午", "wǔ", "buổi trưa"], ["蛋", "dàn", "trứng"], ["果", "guǒ", "quả; kết quả"],
  ["币", "bì", "tiền tệ"], ["房", "fáng", "phòng; nhà"], ["码", "mǎ", "mã; số"], ["昌", "chāng", "hưng thịnh; Xương"],
  ["浩", "hào", "mênh mông; Hạo"], ["禾", "hé", "bộ hòa; lúa"], ["同", "tóng", "cùng; giống"], ["兑", "duì", "đổi; quy đổi"],
  ["父", "fù", "cha"], ["弓", "gōng", "cây cung"], ["且", "qiě", "và; hơn nữa"], ["尸", "shī", "bộ thi"],
  ["期", "qī", "kỳ; thời hạn"], ["己", "jǐ", "bản thân"], ["殳", "shū", "bộ thù; binh khí"], ["安", "ān", "yên; an toàn"],
  ["巾", "jīn", "khăn"], ["谢", "xiè", "cảm ơn"], ["夂", "zhǐ", "bộ truy; bước chân"], ["越", "yuè", "vượt; Việt"],
  ["俄", "É", "Nga"], ["高", "gāo", "cao"], ["头", "tóu", "đầu"], ["怎", "zěn", "thế nào"],
  ["民", "mín", "người dân"], ["攵", "pū", "bộ phộc; đánh nhẹ"], ["留", "liú", "ở lại"], ["片", "piàn", "miếng; tấm"],
  ["医", "yī", "y; chữa bệnh"], ["院", "yuàn", "viện; sân"], ["司", "sī", "quản; ty"], ["画", "huà", "vẽ; tranh"],
  ["世", "shì", "đời; thế giới"], ["界", "jiè", "giới; ranh giới"], ["务", "wù", "việc; nhiệm vụ"], ["容", "róng", "chứa; dung"],
  ["易", "yì", "dễ; thay đổi"], ["比", "bǐ", "so sánh"], ["较", "jiào", "khá; so sánh"], ["最", "zuì", "nhất"],
  ["近", "jìn", "gần"], ["忘", "wàng", "quên"], ["久", "jiǔ", "lâu"], ["累", "lèi", "mệt"],
  ["困", "kùn", "buồn ngủ; khó khăn"], ["冷", "lěng", "lạnh"], ["渴", "kě", "khát"], ["鞋", "xié", "giày"],
  ["边", "biān", "bên; rìa"], ["忽", "hū", "bỗng; lơ là"], ["它", "tā", "nó"], ["跟", "gēn", "với; theo"],
  ["页", "yè", "trang"], ["管", "guǎn", "quản; ống"], ["产", "chǎn", "sản xuất"], ["颜", "yán", "màu; dung mạo"],
  ["汽", "qì", "hơi; ô tô"], ["摩", "mó", "xoa; Ma"], ["托", "tuō", "nâng; nhờ"], ["广", "guǎng", "rộng"],
  ["租", "zū", "thuê"], ["啤", "pí", "bia"], ["酒", "jiǔ", "rượu"], ["鸡", "jī", "gà"],
].map(([hanzi, pinyin, meaning]) => ({ hanzi, pinyin, meaning }));

const slideRareCharacterVocabulary = `
丷|bā|nét chấm tách; dạng bộ bát
厶|sī|riêng tư; bộ khư
律|lǜ|luật
竹|zhú|tre
占|zhàn|chiếm; bói
练|liàn|luyện
隹|zhuī|bộ chuy; chim đuôi ngắn
帅|shuài|đẹp trai; chỉ huy
央|yāng|trung tâm
脸|liǎn|khuôn mặt
拉|lā|kéo
拜|bài|chào; lạy
局|jú|cục; văn phòng
亍|chù|bước chân
今|jīn|nay
昨|zuó|hôm qua
起|qǐ|dậy; bắt đầu
系|xì|hệ; liên hệ
师|shī|thầy
勹|bāo|bộ bao; bao bọc
气|qì|khí; hơi
阮|Ruǎn|họ Nguyễn
吕|Lǚ|họ Lữ
胡|Hú|họ Hồ
什|shén|gì
商|shāng|thương mại
戉|yuè|rìu cổ
志|zhì|ý chí
朋|péng|bạn
食|shí|ăn; thức ăn
㔾|jié|dạng cổ của bộ tiết
勿|wù|chớ; đừng
酉|yǒu|bộ dậu; rượu
交|jiāo|giao; kết bạn
巳|sì|chi Tỵ
别|bié|đừng; khác
营|yíng|kinh doanh; doanh trại
业|yè|nghề nghiệp
令|lìng|lệnh
港|gǎng|cảng
廾|gǒng|bộ củng; hai tay
欧|Ōu|Âu
欠|qiàn|nợ; thiếu
非|fēi|không; phi
盾|dùn|cái khiên
额|é|trán; hạn額
至|zhì|đến
主|zhǔ|chính; chủ
丂|kǎo|bộ khảo; nét uốn
矢|shǐ|mũi tên
召|zhào|gọi; triệu
爫|zhǎo|bộ trảo; móng vuốt
卩|jié|bộ tiết
卯|mǎo|chi Mão
护|hù|bảo vệ; hộ
经|jīng|qua; kinh
叶|yè|lá
香|xiāng|thơm
皿|mǐn|bộ mãnh; đồ đựng
圆|yuán|tròn
珠|zhū|ngọc trai
铅|qiān|chì
冰|bīng|băng; đá
淇|qí|Kỳ; dùng ghi âm
淋|lín|dội; ướt
脑|nǎo|não
插|chā|cắm; chèn
虎|hǔ|hổ
衬|chèn|lót; áo sơ mi
卜|bǔ|bói
众|zhòng|đông người
囚|qiú|giam; tù nhân
灭|miè|dập tắt
麻|má|cây gai; tê
骂|mà|mắng
节|jié|tiết; lễ
猫|māo|mèo
忄|xīn|bộ tâm đứng
亡|wáng|mất; chết
渣|zhā|cặn; tồi
暖|nuǎn|ấm
兄|xiōng|anh trai
未|wèi|chưa
卡|kǎ|thẻ; kẹt
哈|hā|ha; cười
喽|lou|trợ từ ngữ khí
耐|nài|chịu đựng
阿|ā|tiền tố thân mật
伯|bó|bác; bá
韦|wéi|da thuộc; họ Vi
邮|yóu|bưu điện
由|yóu|do; từ
訁|yán|bộ ngôn phồn thể
银|yín|bạc
丬|qiáng|bộ tường biến thể
京|jīng|kinh đô
其|qí|đó; của nó
糸|mì|bộ mịch; tơ
井|jǐng|giếng
体|tǐ|cơ thể
陈|Chén|họ Trần
丁|Dīng|họ Đinh; đinh
周|Zhōu|họ Chu; tuần
吴|Wú|họ Ngô
武|Wǔ|họ Vũ; võ
宋|Sòng|họ Tống
杜|Dù|họ Đỗ
裴|Péi|họ Bùi
潘|Pān|họ Phan
刘|Liú|họ Lưu
团|tuán|đoàn; nhóm
杨|Yáng|họ Dương
梁|Liáng|họ Lương
黎|Lí|họ Lê
梅|Méi|họ Mai; hoa mai
冯|Féng|họ Phùng
范|Fàn|họ Phạm
赵|Zhào|họ Triệu
何|Hé|họ Hà
陶|Táo|họ Đào
郑|Zhèng|họ Trịnh
邓|Dèng|họ Đặng
魏|Wèi|họ Ngụy
丩|jiū|nét quấn; dạng cổ
鬼|guǐ|ma; quỷ
翠|cuì|xanh ngọc
贤|xián|hiền; tài giỏi
青|qīng|xanh
妙|miào|kỳ diệu
玲|líng|lanh canh; tên Linh
映|yìng|chiếu; phản chiếu
氏|shì|họ; thị
维|wéi|duy trì
富|fù|giàu
习|xí|học; luyện
发|fā|phát; gửi
杂|zá|tạp; lẫn
乂|yì|cai trị; nét giao
良|liáng|tốt
堂|táng|sảnh; đường
馒|mán|bánh màn thầu
覀|yà|bộ á; che phủ
葡|pú|nho
萄|táo|nho
喜|xǐ|vui; thích
止|zhǐ|dừng
饺|jiǎo|sủi cảo
条|tiáo|dải; lượng từ
泡|pào|ngâm; bọt
玛|Mǎ|Mã; dùng ghi âm
丽|lì|đẹp; Lệ
苹|píng|táo; bèo
矛|máo|giáo; mâu
橘|jú|quýt
夬|guài|quyết; tách
合|hé|hợp; gộp
图|tú|hình; bản đồ
冬|dōng|mùa đông
区|qū|khu vực
洲|zhōu|châu lục
寺|sì|chùa
稍|shāo|hơi; một chút
办|bàn|làm; xử lý
室|shì|phòng
豕|shǐ|bộ thỉ; lợn
河|hé|sông
市|shì|thành phố; chợ
户|hù|hộ; cửa
知|zhī|biết
舌|shé|lưỡi
曰|yuē|rằng; nói
告|gào|báo; nói
飞|fēi|bay
蝉|chán|ve sầu
秘|mì|bí mật
必|bì|nhất định
介|jiè|giới; ở giữa
绍|shào|nối; giới thiệu
授|shòu|trao; dạy
欢|huān|vui; hoan
迎|yíng|đón
嘛|ma|trợ từ ngữ khí
芳|fāng|thơm; Phương
罗|Luó|họ La; lưới
兰|Lán|Lan; hoa lan
䒑|cǎo|dạng cổ của bộ thảo
华|huá|Hoa; rực rỡ
意|yì|ý; nước Ý
利|lì|lợi; sắc
言|yán|lời nói
样|yàng|dạng; kiểu
觉|jué|cảm thấy; thức
屋|wū|nhà; phòng
历|lì|trải qua; lịch
史|shǐ|lịch sử
济|jì|cứu; kinh tế
加|jiā|thêm
拿|ná|cầm; lấy
箱|xiāng|hộp; vali
品|pǐn|sản phẩm; phẩm
服|fú|quần áo; phục
伞|sǎn|ô; dù
瓦|wǎ|ngói
词|cí|từ
典|diǎn|từ điển; điển
光|guāng|ánh sáng
兀|wù|cao trơ; ngột
舟|zhōu|thuyền
海|hǎi|biển
厕|cè|nhà vệ sinh
所|suǒ|nơi; sở
盒|hé|hộp
显|xiǎn|hiện; hiển thị
示|shì|chỉ; hiển thị
器|qì|thiết bị
键|jiàn|phím
鼠|shǔ|chuột
标|biāo|dấu; tiêu chuẩn
座|zuò|chỗ; lượng từ
打|dǎ|đánh; thao tác
印|yìn|in; dấu
理|lǐ|lý; xử lý
虍|hū|bộ hổ
㐅|wǔ|dạng cổ của số năm
咖|kā|ca; âm trong cà phê
啡|fēi|phi; âm trong cà phê
彡|shān|bộ sam; lông tóc
夫|fū|chồng; người đàn ông
聿|yù|bộ duật; bút
贸|mào|thương mại
概|gài|đại khái; khái niệm
无|wú|không
谈|tán|nói chuyện
`.trim().split("\n").map((row) => {
  const [hanzi, pinyin, meaning] = row.split("|");
  return { hanzi, pinyin, meaning };
});
let slideAnnotationCache = { signature: "", byHanzi: new Map(), terms: [] };

function getSlideAnnotationDictionary() {
  const premadeWords = (window.CHINESE_PREMADE_SETS || []).flatMap((set) => set.words || []);
  const sources = [
    ...slideFallbackVocabulary,
    ...slideRareCharacterVocabulary,
    ...premadeWords.map((item) => ({ hanzi: item.character, pinyin: item.pinyin, meaning: item.meaning })),
    ...allVocab(),
  ];
  const signature = [allVocab().length, premadeWords.length, customVocab.length].join(":");
  if (slideAnnotationCache.signature === signature) return slideAnnotationCache;

  const byHanzi = new Map();
  sources.forEach((item) => {
    const hanzi = String(item.hanzi || "").trim();
    const pinyin = String(item.pinyin || "").trim();
    const meaning = String(item.meaning || "").trim();
    if (hanzi && pinyin && meaning) byHanzi.set(hanzi, { hanzi, pinyin, meaning });
  });
  slideAnnotationCache = {
    signature,
    byHanzi,
    terms: [...byHanzi.keys()].filter((term) => /[\u3400-\u9fff]/.test(term)).sort((a, b) => b.length - a.length),
  };
  return slideAnnotationCache;
}

function segmentSlideHanzi(run) {
  const dictionary = getSlideAnnotationDictionary();
  const tokens = [];
  let cursor = 0;
  while (cursor < run.length) {
    const term = dictionary.terms.find((candidate) => run.startsWith(candidate, cursor));
    if (term) {
      tokens.push(dictionary.byHanzi.get(term));
      cursor += term.length;
      continue;
    }
    const hanzi = run[cursor];
    tokens.push({ hanzi, pinyin: "—", meaning: "ký tự trong bài", missing: true });
    cursor += 1;
  }
  return tokens;
}

function renderSlideChineseToken(item) {
  const missingClass = item.missing ? " is-missing" : "";
  const title = item.missing
    ? `${item.hanzi}: chưa có trong từ điển bài học`
    : `${item.hanzi} · ${item.pinyin} · ${item.meaning}`;
  return `
    <button class="slide-chinese-token${missingClass}" type="button" data-slide-speak="${escapeHtml(item.hanzi)}" title="${escapeHtml(title)}">
      <b lang="zh-CN">${escapeHtml(item.hanzi)}</b>
      <small class="slide-token-pinyin">${escapeHtml(item.pinyin)}</small>
      <small class="slide-token-meaning">${escapeHtml(item.meaning)}</small>
    </button>
  `;
}

function renderAnnotatedSlideText(value) {
  return String(value).split(/([\u3400-\u9fff]+)/g).filter(Boolean).map((part) => {
    if (!/[\u3400-\u9fff]/.test(part)) return `<span class="slide-text-fragment">${escapeHtml(part)}</span>`;
    return `<span class="slide-token-group">${segmentSlideHanzi(part).map(renderSlideChineseToken).join("")}</span>`;
  }).join("");
}
function renderSlideLine(line, index) {
  const trimmed = line.trim();
  const isChinese = /[\u3400-\u9fff]/.test(trimmed);
  const isHeading = trimmed.length <= 70 && (trimmed === trimmed.toUpperCase() || /^(phần|mục|chú ý|ví dụ|ngữ pháp|bài khóa)/i.test(trimmed));
  const className = ["slide-line-card", isChinese ? "has-chinese" : "", isHeading ? "is-heading" : ""].filter(Boolean).join(" ");
  return `<div class="${className}"><span>${index + 1}</span><p class="slide-annotated-line">${renderAnnotatedSlideText(trimmed)}</p></div>`;
}

function renderLessonCards() {
  $("#lessonCards").innerHTML = lessons.map((lesson) => {
    const topics = topicMap[lesson.title] || [];
    const textSlides = lesson.slides.filter((slide) => slide.lines.length).length;
    const meta = getLessonMeta(lesson.title);
    return `
      <article class="lesson-card enriched-lesson-card">
        <div class="lesson-card-topline">
          <p class="eyebrow">${escapeHtml(lesson.title)}</p>
          <span>${textSlides}/${lesson.slideCount} slide có chữ</span>
        </div>
        <div class="lesson-title-stack">
          <h3 lang="zh-CN">${escapeHtml(meta.hanzi)}</h3>
          <p class="lesson-pinyin">${escapeHtml(meta.pinyin)}</p>
          <strong class="lesson-meaning">${escapeHtml(meta.meaning)}</strong>
        </div>
        <div class="lesson-topics">
          ${topics.map((topic) => `<span class="pill">${escapeHtml(topic)}</span>`).join("")}
        </div>
        <button class="lesson-review-button" type="button" data-open-chinese-course="${escapeHtml(lesson.id.replace("lesson-", ""))}">
          <span>Mở bài giảng chi tiết</span><i data-lucide="arrow-right"></i>
        </button>
      </article>
    `;
  }).join("");
}

function renderSlides() {
  const lessonValue = $("#slideLessonFilter").value;
  const query = $("#slideSearch").value.trim();
  const selectedLessons = lessons.filter((lesson) => lessonValue === "all" || lesson.title === lessonValue);
  const slides = selectedLessons.flatMap((lesson) => lesson.slides
    .filter((slide) => slide.lines.length)
    .map((slide) => ({ ...slide, lessonTitle: lesson.title })))
    .filter((slide) => {
      if (!query) return true;
      return normalize(`${slide.lessonTitle} ${slide.index} ${slide.lines.join(" ")}`).includes(normalize(query));
    });

  const list = slides.slice(0, 160);
  $("#slideList").innerHTML = list.length ? list.map((slide) => {
    const vocabularyItem = findSlideVocabulary(slide);
    const kind = getSlideKind(slide, vocabularyItem);
    const kindMeta = slideKindMeta[kind];
    const lessonMeta = getLessonMeta(slide.lessonTitle);
    const bodyLines = slideBodyLines(slide, vocabularyItem);
    const visibleLines = bodyLines.slice(0, 6);
    const extraLines = bodyLines.slice(6, 12);
    const slideTitle = vocabularyItem
      ? `${vocabularyItem.hanzi} · ${vocabularyItem.pinyin} · ${vocabularyItem.meaning}`
      : (visibleLines[0] || `${kindMeta.label} · Slide ${slide.index}`);
    const contentLines = vocabularyItem ? visibleLines : visibleLines.slice(1);
    return `
      <article class="slide-item rich-slide-item slide-kind-${escapeHtml(kind)}">
        <header class="slide-card-head">
          <div>
            <span class="slide-number">Slide ${slide.index}</span>
            <span class="slide-kind"><i data-lucide="${escapeHtml(kindMeta.icon)}"></i>${escapeHtml(kindMeta.label)}</span>
          </div>
          <div class="slide-lesson-signature">
            <strong>${escapeHtml(slide.lessonTitle)} · ${escapeHtml(lessonMeta.hanzi)}</strong>
            <span>${escapeHtml(lessonMeta.pinyin)} · ${escapeHtml(lessonMeta.meaning)}</span>
          </div>
        </header>
        <div class="slide-rich-body">
          ${renderSlideIllustration(slide, vocabularyItem, kind)}
          <div class="slide-content-panel">
            <p class="eyebrow">Nội dung trọng tâm</p>
            <h3>${escapeHtml(slideTitle)}</h3>
            ${vocabularyItem?.hanViet ? `<p class="han-viet-label">Âm Hán Việt: <strong>${escapeHtml(vocabularyItem.hanViet)}</strong></p>` : ""}
            <div class="slide-lines-rich">
              ${contentLines.length ? contentLines.map(renderSlideLine).join("") : `<div class="slide-line-card is-heading"><span>✓</span><p>${escapeHtml(vocabularyItem?.note || "Quan sát phần minh họa để ghi nhớ.")}</p></div>`}
            </div>
            ${extraLines.length ? `
              <details class="slide-more-lines">
                <summary>Xem thêm ${extraLines.length} ý</summary>
                <div>${extraLines.map((line, index) => renderSlideLine(line, contentLines.length + index)).join("")}</div>
              </details>
            ` : ""}
          </div>
        </div>
      </article>
    `;
  }).join("") : `<div class="empty-state">Không có slide phù hợp.</div>`;
  refreshIcons();
}

function filteredVocab() {
  const lesson = $("#vocabLessonFilter").value;
  const status = $("#statusFilter").value;
  const query = $("#vocabSearch").value.trim();
  return allVocab().filter((item) => {
    const byLesson = lesson === "all" || item.lesson === lesson;
    const byStatus = status === "all" || (status === "saved" ? remembered.has(item.id) : !remembered.has(item.id));
    return byLesson && byStatus && matchesQuery(item, query, ["hanzi", "pinyin", "hanViet", "meaning", "note", "lesson"]);
  });
}

function renderVocab() {
  const items = filteredVocab();
  $("#vocabList").innerHTML = items.length ? items.map((item) => `
    <article class="vocab-card">
      <div class="hanzi">${escapeHtml(item.hanzi)}</div>
      <div class="vocab-meta">
        <h3>${escapeHtml(item.meaning)}</h3>
        <p>${escapeHtml(item.pinyin || "")}${item.hanViet ? ` · ${escapeHtml(item.hanViet)}` : ""}</p>
        <p>${escapeHtml(item.lesson)}</p>
        ${item.note ? `<div class="vocab-note">${escapeHtml(item.note)}</div>` : ""}
      </div>
      <div class="vocab-actions">
        <button class="icon-button" data-action="speak" data-id="${escapeHtml(item.id)}" title="Nghe phát âm">
          <i data-lucide="volume-2"></i>
        </button>
        <button class="icon-button ${remembered.has(item.id) ? "remembered" : ""}" data-action="remember" data-id="${escapeHtml(item.id)}" title="Đánh dấu đã nhớ">
          <i data-lucide="check"></i>
        </button>
      </div>
    </article>
  `).join("") : `<div class="empty-state">Không có từ phù hợp.</div>`;
  refreshIcons();
}

function renderRadicals() {
  const query = $("#radicalSearch").value.trim();
  const baseItems = allRadicals();
  const visibleItems = baseItems.filter((item) => {
    const byGroup = foundationFilter === "all" || item.type === foundationFilter;
    return byGroup && matchesQuery(item, query, ["symbol", "name", "meaning", "note", "type"]);
  });

  $("#strokeCount").textContent = baseItems.filter((item) => item.type === "Nét").length;
  $("#ruleCount").textContent = baseItems.filter((item) => item.type === "Quy tắc").length;
  $("#radicalCount").textContent = baseItems.filter((item) => item.type === "Bộ thủ").length;

  const activeGroups = foundationGroups
    .filter((group) => foundationFilter === "all" || group.type === foundationFilter)
    .map((group) => ({
      ...group,
      items: visibleItems.filter((item) => item.type === group.type),
    }));

  const customItems = foundationFilter === "all"
    ? visibleItems.filter((item) => !foundationGroups.some((group) => group.type === item.type))
    : [];

  const sections = activeGroups
    .filter((group) => group.items.length || query)
    .map((group) => `
      <section class="foundation-section">
        <div class="foundation-section-head">
          <div>
            <p class="eyebrow">${escapeHtml(group.title)}</p>
            <h3>${escapeHtml(group.intro)}</h3>
          </div>
          <span class="pill">${group.items.length} mục</span>
        </div>
        ${group.items.length ? `
          <div class="foundation-grid">
            ${group.items.map(renderFoundationCard).join("")}
          </div>
        ` : `<div class="empty-state">Không có mục phù hợp trong nhóm này.</div>`}
      </section>
    `);

  if (customItems.length) {
    sections.push(`
      <section class="foundation-section">
        <div class="foundation-section-head">
          <div>
            <p class="eyebrow">Tự thêm</p>
            <h3>Các mục nền tảng bạn tự lưu ngoài 3 nhóm chính.</h3>
          </div>
          <span class="pill">${customItems.length} mục</span>
        </div>
        <div class="foundation-grid">
          ${customItems.map(renderFoundationCard).join("")}
        </div>
      </section>
    `);
  }

  $("#foundationSections").innerHTML = sections.length
    ? sections.join("")
    : `<div class="empty-state">Không có mục phù hợp.</div>`;
}

function renderFoundationCard(item) {
  return `
    <article class="radical-card">
      <span class="pill">${escapeHtml(item.type)}</span>
      <div class="radical-symbol">${escapeHtml(item.symbol)}</div>
      <h3>${escapeHtml(item.name || item.meaning)}</h3>
      <p>${escapeHtml(item.meaning)}</p>
      ${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}
    </article>
  `;
}

function buildCardDeck(keepIndex = false) {
  const oldId = cardState.deck[cardState.index]?.id;
  const lesson = $("#cardLessonFilter").value;
  cardState.lesson = lesson;
  cardState.deck = cardState.mode === "vocab"
    ? allVocab().filter((item) => lesson === "all" || item.lesson === lesson)
    : allRadicals();
  if (keepIndex && oldId) {
    const nextIndex = cardState.deck.findIndex((item) => item.id === oldId);
    cardState.index = nextIndex >= 0 ? nextIndex : 0;
  } else {
    cardState.index = Math.min(cardState.index, Math.max(cardState.deck.length - 1, 0));
  }
  cardState.flipped = false;
  $("#cardLessonWrap").style.display = cardState.mode === "vocab" ? "grid" : "none";
  renderCard();
}

function renderCard() {
  const item = cardState.deck[cardState.index];
  $("#flashcard").classList.toggle("flipped", cardState.flipped);
  if (!item) {
    $("#cardFront").innerHTML = `<p class="answer">Không có thẻ phù hợp.</p>`;
    $("#cardBack").innerHTML = "";
    $("#cardProgress").textContent = "";
    return;
  }

  if (cardState.mode === "vocab") {
    $("#cardFront").innerHTML = `
      <div class="big">${escapeHtml(item.hanzi)}</div>
      <p class="sub">${escapeHtml(item.pinyin || "")}</p>
      <span class="pill">${escapeHtml(item.lesson)}</span>
    `;
    $("#cardBack").innerHTML = `
      <p class="answer">${escapeHtml(item.meaning)}</p>
      <p class="sub">${escapeHtml(item.hanViet || "")}</p>
      ${item.note ? `<p class="sub">${escapeHtml(item.note)}</p>` : ""}
    `;
  } else {
    $("#cardFront").innerHTML = `
      <div class="big">${escapeHtml(item.symbol)}</div>
      <span class="pill">${escapeHtml(item.type)}</span>
    `;
    $("#cardBack").innerHTML = `
      <p class="answer">${escapeHtml(item.name || item.meaning)}</p>
      <p class="sub">${escapeHtml(item.meaning)}</p>
      ${item.note ? `<p class="sub">${escapeHtml(item.note)}</p>` : ""}
    `;
  }
  $("#cardProgress").textContent = `${cardState.index + 1}/${cardState.deck.length} · ${remembered.has(item.id) ? "đã nhớ" : "đang ôn"}`;
}

function moveCard(delta) {
  if (!cardState.deck.length) return;
  cardState.index = (cardState.index + delta + cardState.deck.length) % cardState.deck.length;
  cardState.flipped = false;
  renderCard();
}

function shuffleDeck() {
  for (let i = cardState.deck.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [cardState.deck[i], cardState.deck[j]] = [cardState.deck[j], cardState.deck[i]];
  }
  cardState.index = 0;
  cardState.flipped = false;
  renderCard();
}

function speak(text) {
  if (!("speechSynthesis" in window) || !text) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "zh-CN";
  utterance.rate = 0.82;
  window.speechSynthesis.speak(utterance);
}

function randomItems(pool, count) {
  return [...pool].sort(() => Math.random() - 0.5).slice(0, count);
}

function buildQuestion() {
  const pool = allVocab().filter((item) => quizState.lesson === "all" || item.lesson === quizState.lesson);
  if (pool.length < 4) {
    $("#quizQuestion").innerHTML = `<p class="prompt">Cần ít nhất 4 từ để tạo quiz.</p>`;
    $("#quizOptions").innerHTML = "";
    $("#quizFeedback").textContent = "";
    return;
  }
  const answer = pool[Math.floor(Math.random() * pool.length)];
  const distractors = randomItems(pool.filter((item) => item.id !== answer.id), 3);
  const choices = randomItems([answer, ...distractors], 4);
  quizState.current = { answer, choices };
  quizState.answered = false;

  if (quizState.mode === "meaning") {
    $("#quizQuestion").innerHTML = `
      <p class="prompt">Chọn nghĩa của</p>
      <div class="main">${escapeHtml(answer.hanzi)}</div>
      <p>${escapeHtml(answer.pinyin || "")}</p>
    `;
    $("#quizOptions").innerHTML = choices.map((item) => `
      <button class="quiz-option" data-answer-id="${escapeHtml(item.id)}">${escapeHtml(item.meaning)}</button>
    `).join("");
  } else {
    $("#quizQuestion").innerHTML = `
      <p class="prompt">Chọn chữ Hán cho</p>
      <div class="main">${escapeHtml(answer.meaning)}</div>
      <p>${escapeHtml(answer.pinyin || "")}</p>
    `;
    $("#quizOptions").innerHTML = choices.map((item) => `
      <button class="quiz-option" data-answer-id="${escapeHtml(item.id)}">${escapeHtml(item.hanzi)}</button>
    `).join("");
  }
  $("#quizFeedback").textContent = "";
  refreshIcons();
}

function renderQuizScore() {
  $("#quizScore").textContent = `${quizState.correct} đúng · ${quizState.total} câu`;
}

function chooseAnswer(id, button) {
  if (quizState.answered || !quizState.current) return;
  quizState.answered = true;
  quizState.total += 1;
  const isCorrect = id === quizState.current.answer.id;
  if (isCorrect) {
    quizState.correct += 1;
    remembered.add(id);
    $("#quizFeedback").textContent = "Đúng rồi.";
  } else {
    $("#quizFeedback").textContent = `Đáp án đúng: ${quizState.current.answer.hanzi} · ${quizState.current.answer.meaning}`;
  }
  $$(".quiz-option").forEach((option) => {
    const optionId = option.dataset.answerId;
    option.disabled = true;
    if (optionId === quizState.current.answer.id) option.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");
  saveAll();
  updateStats();
  renderVocab();
  renderCard();
  renderQuizScore();
}

function renderCustomList() {
  const items = [
    ...customVocab.map((item) => ({ ...item, kind: "vocab" })),
    ...customRadicals.map((item) => ({ ...item, kind: "radical" })),
  ];
  $("#customList").innerHTML = items.length ? items.map((item) => {
    const title = item.kind === "vocab"
      ? `${item.hanzi} · ${item.meaning}`
      : `${item.symbol} · ${item.meaning}`;
    const detail = item.kind === "vocab"
      ? `${item.pinyin || ""} ${item.hanViet || ""} · ${item.lesson}`
      : `${item.name || ""} · ${item.type}`;
    return `
      <article class="custom-item">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p>${escapeHtml(detail.trim())}</p>
        </div>
        <button class="icon-button" data-delete-kind="${item.kind}" data-id="${escapeHtml(item.id)}" title="Xóa">
          <i data-lucide="trash-2"></i>
        </button>
      </article>
    `;
  }).join("") : `<div class="empty-state">Chưa có mục tự thêm.</div>`;
  refreshIcons();
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return "--:--";
  const minutes = Math.floor(seconds / 60);
  const rest = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${minutes}:${rest}`;
}

function currentAudioLesson() {
  return audioLessons[audioState.index] || audioLessons[0];
}

function updateAudioProgress() {
  const audio = $("#lessonAudio");
  const item = currentAudioLesson();
  if (!audio || !item) return;
  const status = listenedAudio.has(item.id) ? "đã nghe" : "đang nghe";
  $("#audioProgress").textContent = `${audioState.index + 1}/${audioLessons.length} · ${status} · ${formatTime(audio.currentTime)} / ${formatTime(audio.duration)}`;
  updateTranscriptHighlight();
}

function renderAudioTranscript(item) {
  const transcript = audioTranscripts[item.id];
  const lines = transcript?.lines || [];
  const container = $("#audioTranscript");
  const meta = $("#audioTranscriptMeta");
  if (!container || !meta) return;

  audioState.activeTranscriptIndex = -1;
  meta.textContent = `${lines.length} dòng`;
  container.innerHTML = lines.length ? lines.map((line, index) => `
    <button class="transcript-line" data-time="${Number(line.time) || 0}" type="button">
      <span class="transcript-number">${String(index + 1).padStart(2, "0")}</span>
      <span class="transcript-copy">
        <span class="transcript-hanzi">${escapeHtml(line.hanzi || "")}</span>
        <span class="transcript-pinyin">${escapeHtml(line.pinyin || "")}</span>
      </span>
    </button>
  `).join("") : `<p class="empty-state">Chưa có transcript.</p>`;
}

function updateTranscriptHighlight() {
  const audio = $("#lessonAudio");
  const container = $("#audioTranscript");
  if (!audio || !container) return;

  const rows = [...container.querySelectorAll(".transcript-line")];
  if (!rows.length) return;

  let activeIndex = -1;
  rows.forEach((row, index) => {
    if ((Number(row.dataset.time) || 0) <= audio.currentTime + 0.2) {
      activeIndex = index;
    }
  });

  if (activeIndex === audioState.activeTranscriptIndex) return;
  audioState.activeTranscriptIndex = activeIndex;
  rows.forEach((row, index) => row.classList.toggle("active", index === activeIndex));
}

function renderAudio() {
  const audio = $("#lessonAudio");
  const item = currentAudioLesson();
  if (!audio || !item) return;

  if (audio.getAttribute("src") !== item.src) {
    audio.src = item.src;
    audio.load();
  }
  audio.playbackRate = audioState.speed;
  $("#audioLessonLabel").textContent = "Quyển 1";
  $("#audioTitle").textContent = item.title;
  $("#audioTheme").textContent = item.theme;
  $("#markListened").classList.toggle("remembered", listenedAudio.has(item.id));
  $("#markListened span").textContent = listenedAudio.has(item.id) ? "Đã nghe" : "Đánh dấu";
  renderAudioTranscript(item);

  $("#audioList").innerHTML = audioLessons.map((lesson, index) => `
    <button class="audio-item ${index === audioState.index ? "active" : ""} ${listenedAudio.has(lesson.id) ? "done" : ""}" data-audio-index="${index}">
      <span class="audio-number">${lesson.number.toString().padStart(2, "0")}</span>
      <span>
        <strong>${escapeHtml(lesson.title)}</strong>
        <small>${escapeHtml(lesson.theme)}</small>
      </span>
      <i data-lucide="${listenedAudio.has(lesson.id) ? "check-circle-2" : "circle"}"></i>
    </button>
  `).join("");
  updateAudioProgress();
  refreshIcons();
}

function selectAudio(index, autoplay = false) {
  const audio = $("#lessonAudio");
  const wasPlaying = audio && !audio.paused;
  audioState.index = (index + audioLessons.length) % audioLessons.length;
  renderAudio();
  if (audio && (autoplay || wasPlaying)) {
    audio.play().catch(() => {});
  }
}

function seekAudio(delta) {
  const audio = $("#lessonAudio");
  if (!audio) return;
  audio.currentTime = Math.max(0, Math.min((audio.duration || 0), audio.currentTime + delta));
  updateAudioProgress();
}

function setAudioSpeed(speed) {
  audioState.speed = speed;
  const audio = $("#lessonAudio");
  if (audio) audio.playbackRate = speed;
}

function rerenderAll() {
  fillLessonSelect($("#vocabLessonFilter"), true);
  fillLessonSelect($("#cardLessonFilter"), true);
  fillLessonSelect($("#quizLessonFilter"), true);
  updateStats();
  renderLessonCards();
  renderSlides();
  renderVocab();
  renderRadicals();
  buildCardDeck(true);
  renderCustomList();
  renderQuizScore();
  renderAudio();
}

function bindEvents() {
  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".tab").forEach((item) => item.classList.remove("active"));
      $$(".view").forEach((view) => view.classList.remove("active"));
      tab.classList.add("active");
      $(`#${tab.dataset.tab}`).classList.add("active");
      refreshIcons();
    });
  });

  $("#audioList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-audio-index]");
    if (!button) return;
    selectAudio(Number(button.dataset.audioIndex), true);
  });
  $("#audioTranscript").addEventListener("click", (event) => {
    const row = event.target.closest("[data-time]");
    const audio = $("#lessonAudio");
    if (!row || !audio) return;
    audio.currentTime = Number(row.dataset.time) || 0;
    updateTranscriptHighlight();
    audio.play().catch(() => {});
  });
  $("#prevAudio").addEventListener("click", () => selectAudio(audioState.index - 1, true));
  $("#nextAudio").addEventListener("click", () => selectAudio(audioState.index + 1, true));
  $("#rewindAudio").addEventListener("click", () => seekAudio(-10));
  $("#forwardAudio").addEventListener("click", () => seekAudio(10));
  $("#markListened").addEventListener("click", () => {
    const item = currentAudioLesson();
    listenedAudio.has(item.id) ? listenedAudio.delete(item.id) : listenedAudio.add(item.id);
    saveAll();
    renderAudio();
  });
  $("#lessonAudio").addEventListener("timeupdate", updateAudioProgress);
  $("#lessonAudio").addEventListener("loadedmetadata", updateAudioProgress);
  $("#lessonAudio").addEventListener("ended", () => {
    const item = currentAudioLesson();
    listenedAudio.add(item.id);
    saveAll();
    renderAudio();
  });
  $$("[data-audio-speed]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-audio-speed]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      setAudioSpeed(Number(button.dataset.audioSpeed));
    });
  });

  $("#slideLessonFilter").addEventListener("change", renderSlides);
  $("#slideSearch").addEventListener("input", renderSlides);
  $("#lessonCards").addEventListener("click", (event) => {
    const button = event.target.closest("[data-review-lesson]");
    if (!button) return;
    $("#slideLessonFilter").value = button.dataset.reviewLesson;
    $("#slideSearch").value = "";
    renderSlides();
    $("#slideList").closest(".tool-panel").scrollIntoView({ behavior: "smooth", block: "start" });
  });
  $("#slideList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-slide-speak]");
    if (button) speak(button.dataset.slideSpeak);
  });
  $("#writingShowcase").addEventListener("click", (event) => {
    const button = event.target.closest("[data-showcase-speak]");
    if (button) speak(button.dataset.showcaseSpeak);
  });
  $("#vocabLessonFilter").addEventListener("change", renderVocab);
  $("#statusFilter").addEventListener("change", renderVocab);
  $("#vocabSearch").addEventListener("input", renderVocab);
  $("#radicalSearch").addEventListener("input", renderRadicals);
  $$("[data-foundation-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      $$("[data-foundation-filter]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      foundationFilter = button.dataset.foundationFilter;
      renderRadicals();
    });
  });

  $("#vocabList").addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    const item = entryById(button.dataset.id);
    if (!item) return;
    if (button.dataset.action === "speak") {
      speak(item.hanzi);
    }
    if (button.dataset.action === "remember") {
      remembered.has(item.id) ? remembered.delete(item.id) : remembered.add(item.id);
      saveAll();
      updateStats();
      renderVocab();
      renderCard();
    }
  });

  $$(".segment[data-card-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".segment[data-card-mode]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      cardState.mode = button.dataset.cardMode;
      buildCardDeck();
    });
  });

  $("#cardLessonFilter").addEventListener("change", () => buildCardDeck());
  $("#shuffleCards").addEventListener("click", shuffleDeck);
  $("#prevCard").addEventListener("click", () => moveCard(-1));
  $("#nextCard").addEventListener("click", () => moveCard(1));
  $("#flipCard").addEventListener("click", () => {
    cardState.flipped = !cardState.flipped;
    renderCard();
  });
  $("#flashcard").addEventListener("click", () => {
    cardState.flipped = !cardState.flipped;
    renderCard();
  });
  $("#flashcard").addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      cardState.flipped = !cardState.flipped;
      renderCard();
    }
  });
  $("#markKnown").addEventListener("click", () => {
    const item = cardState.deck[cardState.index];
    if (!item) return;
    remembered.add(item.id);
    saveAll();
    updateStats();
    renderVocab();
    moveCard(1);
  });
  $("#markAgain").addEventListener("click", () => {
    const item = cardState.deck[cardState.index];
    if (!item) return;
    remembered.delete(item.id);
    saveAll();
    updateStats();
    renderVocab();
    moveCard(1);
  });

  $$(".segment[data-quiz-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".segment[data-quiz-mode]").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      quizState.mode = button.dataset.quizMode;
      buildQuestion();
    });
  });
  $("#quizLessonFilter").addEventListener("change", (event) => {
    quizState.lesson = event.target.value;
    buildQuestion();
  });
  $("#quizOptions").addEventListener("click", (event) => {
    const button = event.target.closest(".quiz-option");
    if (button) chooseAnswer(button.dataset.answerId, button);
  });
  $("#nextQuestion").addEventListener("click", buildQuestion);

  $("#vocabForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    customVocab.push({
      id: `custom-vocab-${Date.now()}`,
      hanzi: data.hanzi.trim(),
      pinyin: data.pinyin.trim(),
      hanViet: data.hanViet.trim(),
      meaning: data.meaning.trim(),
      lesson: data.lesson,
      note: data.note.trim(),
    });
    saveAll();
    event.currentTarget.reset();
    rerenderAll();
  });

  $("#radicalForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget).entries());
    customRadicals.push({
      id: `custom-radical-${Date.now()}`,
      symbol: data.symbol.trim(),
      name: data.name.trim(),
      meaning: data.meaning.trim(),
      type: data.type,
      note: data.note.trim(),
    });
    saveAll();
    event.currentTarget.reset();
    rerenderAll();
  });

  $("#customList").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-delete-kind]");
    if (!button) return;
    if (button.dataset.deleteKind === "vocab") {
      customVocab = customVocab.filter((item) => item.id !== button.dataset.id);
    } else {
      customRadicals = customRadicals.filter((item) => item.id !== button.dataset.id);
    }
    remembered.delete(button.dataset.id);
    saveAll();
    rerenderAll();
  });

  $("#exportData").addEventListener("click", () => {
    const payload = {
      customVocab,
      customRadicals,
      remembered: [...remembered],
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "so-on-tieng-trung.json";
    link.click();
    URL.revokeObjectURL(link.href);
  });

  $("#importData").addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const payload = JSON.parse(reader.result);
        const mergeById = (oldItems, newItems = []) => {
          const map = new Map(oldItems.map((item) => [item.id, item]));
          newItems.forEach((item) => map.set(item.id || `import-${Date.now()}-${Math.random()}`, item));
          return [...map.values()];
        };
        customVocab = mergeById(customVocab, payload.customVocab);
        customRadicals = mergeById(customRadicals, payload.customRadicals);
        remembered = new Set([...remembered, ...(payload.remembered || [])]);
        saveAll();
        rerenderAll();
      } catch {
        alert("File sao lưu không đọc được.");
      }
    };
    reader.readAsText(file);
    event.target.value = "";
  });
}

function init() {
  fillLessonSelect($("#slideLessonFilter"), true);
  $("#slideLessonFilter").value = "Bài 1";
  fillLessonSelect($("#vocabLessonFilter"), true);
  fillLessonSelect($("#cardLessonFilter"), true);
  fillLessonSelect($("#quizLessonFilter"), true);
  bindEvents();
  rerenderAll();
  buildQuestion();
  refreshIcons();
}

document.addEventListener("DOMContentLoaded", init);
