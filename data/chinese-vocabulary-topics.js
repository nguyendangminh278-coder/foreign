(() => {
  const topics = [
    { id: "giao-tiep", label: "Giao tiếp thường ngày", icon: "messages-square" },
    { id: "con-nguoi", label: "Con người & quan hệ", icon: "users-round" },
    { id: "gia-dinh", label: "Gia đình", icon: "heart-handshake" },
    { id: "quoc-gia", label: "Quốc gia & ngôn ngữ", icon: "languages" },
    { id: "hoc-tap", label: "Trường học & học tập", icon: "graduation-cap" },
    { id: "so-luong", label: "Số đếm & lượng từ", icon: "list-ordered" },
    { id: "thoi-gian", label: "Thời gian", icon: "clock-3" },
    { id: "dia-diem", label: "Địa điểm & nhà ở", icon: "map-pinned" },
    { id: "an-uong", label: "Ăn uống", icon: "utensils" },
    { id: "mua-sam", label: "Mua sắm & tiền tệ", icon: "shopping-basket" },
    { id: "cong-viec", label: "Nghề nghiệp & công việc", icon: "briefcase-business" },
    { id: "do-vat", label: "Đồ vật & công nghệ", icon: "laptop" },
    { id: "di-chuyen", label: "Di chuyển & phương tiện", icon: "bus-front" },
    { id: "suc-khoe", label: "Cơ thể & sức khỏe", icon: "heart-pulse" },
    { id: "hanh-dong", label: "Hành động thường ngày", icon: "person-standing" },
    { id: "mieu-ta", label: "Miêu tả & cảm xúc", icon: "palette" },
    { id: "ngu-phap", label: "Từ chức năng & ngữ pháp", icon: "brackets" },
    { id: "thanh-ngu", label: "Cụm từ & thành ngữ", icon: "quote" },
  ];

  const topicLabels = Object.fromEntries(topics.map((topic) => [topic.id, topic.label]));
  const wordTopics = new Map();
  const assign = (topicId, words) => words.trim().split(/\s+/).forEach((word) => wordTopics.set(word, topicId));

  assign("giao-tiep", `
    你好 对不起 再见 明天见 谢谢 没关系 请 问 请问 贵姓 姓 叫 什么 名字 谁 哪 哪儿 怎么 怎么样
    欢迎 客气 不客气 介绍 先生 小姐 您 啊 没事 没错 没什么 真话
  `);
  assign("con-nguoi", `
    我 你 他 她 人 男 女 男女 朋友 我们 俩 王 麦克 张东 玛丽 李昌浩 田芳 罗兰 爱德华 林 关
  `);
  assign("gia-dinh", `爸爸 妈妈 哥哥 弟弟 妹妹 姐姐`);
  assign("quoc-gia", `
    汉语 英语 阿拉伯语 德语 俄语 法语 韩国语 日语 西班牙语 国 越南 中国 德国 韩国 美国 日本 外国
    中文 阿拉伯文 法文 语言
  `);
  assign("hoc-tap", `
    学 学习 学校 老师 学生 留学生 大学 教授 校长 同学 班 开学 汉字 发音 语法 书 杂志 词典 读 写
  `);
  assign("so-luong", `
    一 二 三 四 五 六 七 八 九 十 零 百 千 万 两 几 个 些 一共 数 斤 位 件 把 瓶 本 张 支 辆 口 只
  `);
  assign("thoi-gian", `
    今天 明天 昨天 天 星期 星期一 星期二 星期三 星期四 星期五 星期六 星期天 中午 上午 下午
    一会儿 一下儿 先 好久 最近 刚
  `);
  assign("dia-diem", `
    哪儿 那儿 邮局 银行 北京 天安门 图书馆 食堂 办公室 家 楼 门 房间 里 医院 公司 商店 同屋
  `);
  assign("an-uong", `
    吃 好吃 饭 馒头 米饭 碗 鸡蛋 汤 酒 啤酒 饺子 包子 面条 水果 苹果 橘子 喝 茶 咖啡 茶叶
  `);
  assign("mua-sam", `
    买 卖 钱 贵 块 毛 分 给 找 换 人民币 美元 港币 日元 欧元 越南盾 营业员 外贸 便利 方便
  `);
  assign("cong-viec", `
    工作 办公 职员 秘书 经理 大夫 律师 教授 校长 营业员 公司 外贸
  `);
  assign("do-vat", `
    信 箱子 日用品 衣服 雨伞 香水 光盘 笔 照片 电话 手机 拿到 发信息 打字 屏幕 键盘 东西 工具
  `);
  assign("di-chuyen", `
    去 回 进 车 自行车 汽车 摩托车 公共汽车 出租车
  `);
  assign("suc-khoe", `
    身体 口 药 中药 西药 大夫 医院
  `);
  assign("hanh-dong", `
    见 寄 取 要 等 住 知道 听 说 给 看 做 关 拿 拿走 握 抓 放 提 抱 抬 接 发信息 打字
  `);
  assign("mieu-ta", `
    好 忙 难 大 小 白 很 太 多 贵 重 轻 黑 红 旧 新 颜色 蓝 马马虎虎 觉得 容易 比较
    真好 真美 真漂亮 真棒 真厉害 真难 真累 真聪明 真便宜 真奇怪 真正 真心 真实 真诚 天真 认真
    惯 不惯 看不惯 没精打采
  `);
  assign("ngu-phap", `
    不 吗 对 的 那 这 是 在 呢 也 都 和 了 吧 还 别的 有 没 全 大概 还是
  `);
  assign("thanh-ngu", `
    没有 没想到 没用 没办法 没意思 没准儿 没完没了 淹没 埋没 没收 出没 沉没 没落 隐没 全军覆没
    真理 真相 传真 真假 真丝 真皮 真空 真人 真才实学 真知灼见 情真意切 货真价实
  `);

  const lessonDefaults = {
    "Bài 1": "giao-tiep",
    "Bài 2": "con-nguoi",
    "Bài 3": "hanh-dong",
    "Bài 4": "thoi-gian",
    "Bài 5": "giao-tiep",
    "Bài 6": "giao-tiep",
    "Bài 7": "an-uong",
    "Bài 8": "mua-sam",
    "Bài 9": "mua-sam",
    "Bài 10": "dia-diem",
    "Bài 11": "con-nguoi",
    "Bài 12": "hoc-tap",
    "Bài 13": "do-vat",
    "Bài 14": "di-chuyen",
    "Bài 15": "cong-viec",
  };

  function resolveTopic(word = {}) {
    if (topicLabels[word.topicId]) return word.topicId;
    const character = String(word.hanzi || word.character || "").trim();
    if (wordTopics.has(character)) return wordTopics.get(character);
    const group = String(word.group || word.source || "");
    if (group.includes("Họ từ 没")) return "thanh-ngu";
    if (group.includes("Họ từ 真")) return "mieu-ta";
    if (group.includes("tay & điện thoại")) return "hanh-dong";
    if (group.includes("看不惯")) return "mieu-ta";
    return lessonDefaults[word.lesson] || "giao-tiep";
  }

  function withTopic(word = {}) {
    const topicId = resolveTopic(word);
    return { ...word, topicId, topic: topicLabels[topicId] };
  }

  window.CHINESE_VOCAB_TOPICS = topics;
  window.resolveChineseVocabularyTopic = resolveTopic;
  window.withChineseVocabularyTopic = withTopic;
})();
