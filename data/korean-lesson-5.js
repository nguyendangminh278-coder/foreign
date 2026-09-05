// Bài 5.pdf: 35 trang. Dữ liệu học tách riêng khỏi ảnh tài liệu gốc.
(() => {
  "use strict";
  const line = (text, romanization, meaning) => ({ text, romanization, meaning });
  const actions = [
    ["bike", "자전거를 타다", "jajeongeoreul tada", "cha-chơn-gơ-rưl tha-da", "đạp xe", "자전거를 타요", "jajeongeoreul tayo", "🚲", ["park"], 3],
    ["photo", "사진을 찍다", "sajineul jjikda", "sa-ji-nưl cchik-tta", "chụp ảnh", "사진을 찍어요", "sajineul jjigeoyo", "📷", ["park", "playground"], 3],
    ["frisbee", "프리스비를 하다", "peuriseubireul hada", "phư-ri-sư-bi-rưl ha-da", "chơi ném đĩa", "프리스비를 해요", "peuriseubireul haeyo", "🥏", ["park"], 3],
    ["read", "책을 읽다", "chaegeul ikda", "che-gưl ik-tta", "đọc sách", "책을 읽어요", "chaegeul ilgeoyo", "📖", ["bench", "library", "living", "room", "park"], 3],
    ["soccer", "축구를 하다", "chukgureul hada", "chhuk-kku-rưl ha-da", "chơi bóng đá", "축구를 해요", "chukgureul haeyo", "⚽", ["park", "gym"], 4],
    ["walk", "산책을 하다", "sanchaegeul hada", "san-che-gưl ha-da", "đi dạo", "산책을 해요", "sanchaegeul haeyo", "🚶", ["park"], 4],
    ["icecream", "아이스크림을 사다", "aiseukeurimeul sada", "a-i-sư-khư-ri-mưl sa-da", "mua kem", "아이스크림을 사요", "aiseukeurimeul sayo", "🍦", ["park"], 4],
    ["slide", "미끄럼틀을 타다", "mikkeureomteureul tada", "mi-kkư-rơm-thư-rưl tha-da", "chơi cầu trượt", "미끄럼틀을 타요", "mikkeureomteureul tayo", "🛝", ["playground", "park"], 4],
    ["draw", "그림을 그리다", "geurimeul geurida", "kư-ri-mưl kư-ri-da", "vẽ tranh", "그림을 그려요", "geurimeul geuryeoyo", "🎨", ["park", "room"], 5],
    ["bbq", "바비큐를 하다", "babikyureul hada", "pa-bi-khyu-rưl ha-da", "làm tiệc nướng", "바비큐를 해요", "babikyureul haeyo", "🍢", ["pavilion", "park"], 5],
    ["lunch", "점심을 먹다", "jeomsimeul meokda", "chơm-shi-mưl mơk-tta", "ăn trưa", "점심을 먹어요", "jeomsimeul meogeoyo", "🍱", ["pavilion", "kitchen", "park"], 6],
    ["swim", "수영을 하다", "suyeongeul hada", "su-yơng-ưl ha-da", "bơi", "수영을 해요", "suyeongeul haeyo", "🏊", ["gym"], 6],
    ["cook", "음식을 만들다", "eumsigeul mandeulda", "ưm-shi-gưl man-đưl-da", "nấu ăn", "음식을 만들어요", "eumsigeul mandeureoyo", "🍳", ["kitchen"], 6],
    ["basketball", "농구를 하다", "nonggureul hada", "nông-gu-rưl ha-da", "chơi bóng rổ", "농구를 해요", "nonggureul haeyo", "🏀", ["gym", "park"], 6],
    ["clothes", "옷을 입다", "oseul ipda", "ô-sưl ip-tta", "mặc quần áo", "옷을 입어요", "oseul ibeoyo", "👕", ["room"], 7],
    ["rope", "줄넘기를 하다", "julleomgireul hada", "chul-lơm-gi-rưl ha-da", "nhảy dây", "줄넘기를 해요", "julleomgireul haeyo", "➰", ["gym", "park", "playground"], 7],
    ["baseball", "야구를 하다", "yagureul hada", "ya-gu-rưl ha-da", "chơi bóng chày", "야구를 해요", "yagureul haeyo", "⚾", ["park"], 7],
    ["study", "공부를 하다", "gongbureul hada", "công-bu-rưl ha-da", "học bài", "공부를 해요", "gongbureul haeyo", "✏️", ["library", "room"], 7],
    ["tv", "TV를 보다", "tibireul boda", "thi-bi-rưl pô-da", "xem TV", "TV를 봐요", "tibireul bwayo", "📺", ["living", "room"], 8],
    ["milk", "우유를 마시다", "uyureul masida", "u-yu-rưl ma-shi-da", "uống sữa", "우유를 마셔요", "uyureul masyeoyo", "🥛", ["kitchen", "room", "living"], 8],
  ].map(([id, text, romanization, reading, meaning, polite, politeRomanization, emoji, places, page]) =>
    ({ id, text, romanization, reading, meaning, polite, politeRomanization, emoji, places, page, group: "actions" }));
  const context = [
    ["bench", "벤치", "benchi", "pen-chi", "ghế băng", "🪑", 9],
    ["delicious", "맛있다", "masitda", "ma-shit-tta", "ngon", "😋", 9],
    ["pavilion", "파빌리온", "pabillion", "pha-bil-li-ôn", "nhà chòi / mái che dã ngoại trong bài", "⛱️", 9],
    ["park", "공원", "gongwon", "công-uôn", "công viên", "🌳", 9],
    ["playground", "놀이터", "noriteo", "nô-ri-thơ", "sân chơi", "🛝", 9],
    ["living", "거실", "geosil", "kơ-shil", "phòng khách", "🛋️", 9],
    ["gym", "체육관", "cheyukgwan", "chê-yuk-kkwan", "nhà thể chất / khu thể thao", "🏟️", 9],
    ["room", "방", "bang", "pang", "phòng", "🚪", 10],
    ["library", "도서관", "doseogwan", "tô-sơ-gwan", "thư viện", "📚", 10],
    ["kitchen", "부엌", "bueok", "pu-ơk", "bếp", "🍳", 10],
    ["place", "장소", "jangso", "chang-sô", "địa điểm", "📍", 10],
  ].map(([id, text, romanization, reading, meaning, emoji, page]) => ({ id, text, romanization, reading, meaning, emoji, page, group: "context" }));
  const supplementVocabulary = [
    {
      id: "new-actions", title: "Động từ mới", icon: "footprints",
      words: [
        ["commute", "다니다", "danida", "ta-ni-da", "đi lại, lui tới thường xuyên", "다녀요", "danyeoyo", "ta-nyơ-yô", "🏫", "Dùng cho nơi lui tới đều đặn: 학교에 다니다 (đi học), 회사에 다니다 (đi làm)."],
        ["take-off", "벗다", "beotda", "pơt-tta", "cởi (quần áo, giày, mũ)", "벗어요", "beoseoyo", "pơ-sơ-yô", "🧥", "Đối lập với 입다 (mặc), đã có trong cụm 옷을 입다 của PDF."],
        ["get-off", "내리다", "naerida", "ne-ri-da", "xuống xe; hạ xuống", "내려요", "naeryeoyo", "ne-ryơ-yô", "🚌", "Trong cặp lên/xuống phương tiện, từ này mang nghĩa xuống xe."],
        ["start", "시작하다", "sijakhada", "shi-jak-ha-da", "bắt đầu", "시작해요", "sijakhaeyo", "shi-jak-he-yô", "▶️", "하다 chuyển thành 해요."],
        ["finish", "끝나다", "kkeunnada", "kkưn-na-da", "kết thúc, xong", "끝나요", "kkeunnayo", "kkưn-na-yô", "🏁", "Phụ âm cuối ㅌ gặp ㄴ được đọc thành ㄴ; nghe rõ nhịp kkưn-na-da."],
        ["walk-verb", "걷다", "geotda", "kơt-tta", "đi bộ", "걸어요", "georeoyo", "kơ-rơ-yô", "🚶", "Bất quy tắc ㄷ: 걷- → 걸- trước nguyên âm. Không phải mọi từ có ㄷ đều bất quy tắc."],
        ["run", "달리다", "dallida", "tal-li-da", "chạy", "달려요", "dallyeoyo", "tal-lyơ-yô", "🏃", "ㅣ + 어요 co thành ㅕ요: 달리어요 → 달려요."],
        ["live", "살다", "salda", "sal-da", "sống", "살아요", "sarayo", "sa-ra-yô", "🏠", "Khi ㄹ đứng trước nguyên âm, âm được nối sang âm tiết sau."],
        ["die", "죽다", "jukda", "chuk-tta", "chết", "죽어요", "jugeoyo", "chu-gơ-yô", "🍂", "Dùng trung tính để mô tả sinh vật; khi nói về người cần chọn cách diễn đạt phù hợp ngữ cảnh."],
        ["wash", "씻다", "ssitda", "ssit-tta", "rửa, tắm rửa", "씻어요", "ssiseoyo", "ssi-sơ-yô", "🧼", "Có thể kết hợp tay, mặt hoặc cơ thể tùy ngữ cảnh."],
        ["receive", "받다", "batda", "pat-tta", "nhận", "받아요", "badayo", "pa-da-yô", "📩", "받다 là động từ ㄷ theo quy tắc: giữ ㄷ trong chính tả khi chia 받 + 아요."],
        ["help", "도와주다", "dowajuda", "tô-oa-chu-da", "giúp đỡ", "도와줘요", "dowajwoyo", "tô-oa-chuơ-yô", "🤝", "도와주어요 co thành 도와줘요."],
      ],
    },
    {
      id: "new-routines", title: "Sinh hoạt mới", icon: "list-checks",
      words: [
        ["homework", "숙제하다", "sukjehada", "suk-jje-ha-da", "làm bài tập về nhà", "숙제해요", "sukjehaeyo", "suk-jje-he-yô", "📝", "Cũng thường nói 숙제를 하다; hai dạng cùng diễn tả làm bài tập."],
        ["bathe", "목욕하다", "mogyokhada", "mô-gyô-kha-da", "tắm", "목욕해요", "mogyokhaeyo", "mô-gyô-khe-yô", "🛁", "하다 → 해요."],
        ["wash-face", "세수하다", "sesuhada", "sê-su-ha-da", "rửa mặt", "세수해요", "sesuhaeyo", "sê-su-he-yô", "💧", "하다 → 해요."],
        ["brush-teeth", "이를 닦다", "ireul dakda", "i-rưl tak-tta", "đánh răng", "이를 닦아요", "ireul dakkayo", "i-rưl ta-kka-yô", "🪥", "이 (răng) + 를; 닦아요 được phát âm gần [다까요]."],
        ["go-work", "출근하다", "chulgeunhada", "chul-gưn-ha-da", "đi làm, đến nơi làm việc", "출근해요", "chulgeunhaeyo", "chul-gưn-he-yô", "💼", "Nhấn vào việc bắt đầu/đi tới nơi làm việc."],
        ["leave-work", "퇴근하다", "toegeunhada", "thuê-gưn-ha-da", "tan làm, rời nơi làm việc", "퇴근해요", "toegeunhaeyo", "thuê-gưn-he-yô", "🌆", "Đối chiếu với 출근하다."],
        ["clean", "청소하다", "cheongsohada", "chơng-sô-ha-da", "dọn dẹp", "청소해요", "cheongsohaeyo", "chơng-sô-he-yô", "🧹", "하다 → 해요."],
        ["cook-verb", "요리하다", "yorihada", "yô-ri-ha-da", "nấu ăn", "요리해요", "yorihaeyo", "yô-ri-he-yô", "🍲", "Gần nghĩa với 음식을 만들다 trong PDF; không tính lại cụm cũ."],
        ["call", "전화하다", "jeonhwahada", "chơn-hoa-ha-da", "gọi điện", "전화해요", "jeonhwahaeyo", "chơn-hoa-he-yô", "📞", "하다 → 해요."],
        ["travel", "여행하다", "yeohaenghada", "yơ-heng-ha-da", "du lịch", "여행해요", "yeohaenghaeyo", "yơ-heng-he-yô", "🧳", "하다 → 해요."],
        ["marry", "결혼하다", "gyeolhonhada", "kyơ-rôn-ha-da", "kết hôn", "결혼해요", "gyeolhonhaeyo", "kyơ-rôn-he-yô", "💍", "하다 → 해요."],
        ["divorce", "이혼하다", "ihonhada", "i-hôn-ha-da", "ly hôn", "이혼해요", "ihonhaeyo", "i-hôn-he-yô", "↔️", "Đối chiếu với 결혼하다; dùng khi ngữ cảnh thực sự cần."],
      ],
    },
    {
      id: "new-states", title: "Trạng thái & sở thích mới", icon: "heart-off",
      words: [
        ["dislike", "싫어하다", "sireohada", "shi-rơ-ha-da", "không thích, ghét", "싫어해요", "sireohaeyo", "shi-rơ-he-yô", "👎", "Trong tiếng Hàn đây là động từ chỉ thái độ, dù thường được xếp cùng nhóm cảm xúc khi học từ vựng."],
        ["need", "필요하다", "piryohada", "phi-ryô-ha-da", "cần, cần thiết", "필요해요", "piryohaeyo", "phi-ryô-he-yô", "🧩", "Là từ miêu tả trạng thái cần thiết; 하다 → 해요."],
      ],
    },
    {
      id: "new-place-time", title: "Địa điểm & thời gian mới", icon: "map-pin-clock",
      words: [
        ["restaurant", "식당", "sikdang", "shik-ttang", "nhà hàng, quán ăn", "식당에서 먹어요", "sikdangeseo meogeoyo", "shik-ttang-ê-sơ mơ-gơ-yô", "🍽️", "Dùng 에서 khi ăn tại nhà hàng."],
        ["pool", "수영장", "suyeongjang", "su-yơng-jang", "bể bơi", "수영장에서 수영해요", "suyeongjangeseo suyeonghaeyo", "su-yơng-jang-ê-sơ su-yơng-he-yô", "🏊", "Địa điểm thực hiện hành động bơi → 에서."],
        ["evening", "저녁", "jeonyeok", "chơ-nyơk", "buổi tối; bữa tối", "저녁에 운동해요", "jeonyeoge undonghaeyo", "chơ-nyơ-gê un-đông-he-yô", "🌙", "Mốc thời gian thường đi với 에: 저녁에."],
        ["tomorrow", "내일", "naeil", "ne-il", "ngày mai", "내일 학교에 가요", "naeil hakgyoe gayo", "ne-il hak-kyo-ê ka-yô", "📅", "내일 thường không gắn 에."],
        ["yesterday", "어제", "eoje", "ơ-chê", "hôm qua", "어제 아침", "eoje achim", "ơ-chê a-chim", "🗓️", "Thường không gắn tiểu từ thời gian 에 (e) ngay sau từ này. Học cụm 'sáng hôm qua' trước khi học cách kể ở thì quá khứ."],
        ["market", "시장", "sijang", "shi-jang", "chợ", "시장에서 토마토를 사요", "sijangeseo tomatoreul sayo", "shi-jang-ê-sơ thô-ma-thô-rưl sa-yô", "🛒", "Đã gặp trong ví dụ Bài 5: nơi mua cà chua. Thêm thẻ để tra riêng từ."],
        ["morning", "아침", "achim", "a-chim", "buổi sáng; bữa sáng", "아침에 빵을 먹어요", "achime ppangeul meogeoyo", "a-chi-mê ppang-ưl mơ-gơ-yô", "🌅", "Đã gặp trong ví dụ Bài 5. Khi nói thời điểm 'vào buổi sáng', thêm 에 (e)."],
      ],
    },
  ].map((group) => ({
    ...group,
    words: group.words.map(([id, text, romanization, reading, meaning, polite, politeRomanization, politeReading, emoji, note]) => ({
      id, text, romanization, reading, meaning, polite, politeRomanization, politeReading, emoji, note, page: "Bổ sung", group: group.id,
    })),
  }));
  const supplementExamples = {
    restaurant: "Tôi ăn ở nhà hàng.", pool: "Tôi bơi ở bể bơi.", evening: "Tôi tập thể dục vào buổi tối.",
    tomorrow: "Ngày mai tôi đi học.", yesterday: "Sáng hôm qua.", market: "Tôi mua cà chua ở chợ.", morning: "Buổi sáng tôi ăn bánh mì.",
  };
  supplementVocabulary.flatMap((group) => group.words).forEach((word) => {
    word.exampleMeaning = supplementExamples[word.id] || word.meaning;
    word.exampleLabel = word.id === "yesterday" ? "Cụm thời gian" : word.group === "new-place-time" ? "Ví dụ" : "Dạng lịch sự";
  });
  const duplicateVariants = [
    ["산책하다", "산책을 하다", "sanchaekhada / sanchaegeul hada", "đi dạo"],
    ["축구하다", "축구를 하다", "chukguhada / chukgureul hada", "chơi bóng đá"],
    ["야구하다", "야구를 하다", "yaguhada / yagureul hada", "chơi bóng chày"],
    ["줄넘기하다", "줄넘기를 하다", "julleomgihada / julleomgireul hada", "nhảy dây"],
    ["수영하다", "수영을 하다", "suyeonghada / suyeongeul hada", "bơi"],
  ].map(([variant, existing, romanization, meaning]) => ({ variant, existing, romanization, meaning }));
  const reviewSummary = {
    particles: "Tiểu từ chủ đề nêu điều đang nói tới hoặc tạo ý đối chiếu; tiểu từ chủ ngữ đánh dấu chủ thể của hành động/trạng thái, thường dùng khi giới thiệu thông tin mới. Việc nhấn mạnh còn tùy ngữ cảnh. Chọn dạng theo batchim như đã học ở Bài 1 và Bài 4.",
    ending: "Ôn ba cách chia đuôi, cách rơi nguyên âm ㅡ (eu) và bất quy tắc ㄷ (digeut). Các ví dụ nghe, đẹp, bận đã có ở Bài 4. Với từ mới của Bài 5, xem dạng lịch sự ngay trong thẻ từ.",
  };
  const locationContrast = [
    {
      marker: "에", romanization: "e", title: "Đích đến / nơi lui tới", description: "Dùng với 가다 (gada · đi), 오다 (oda · đến), 다니다 (danida · lui tới) để chỉ nơi hướng tới hoặc nơi thường xuyên tới.",
      examples: [
        line("학교에 가요.", "Hakgyoe gayo.", "Tôi đi đến trường."),
        line("집에 와요.", "Jibe wayo.", "Tôi đến/về nhà."),
        line("회사에 다녀요.", "Hoesae danyeoyo.", "Tôi đi làm ở công ty / thường xuyên tới công ty."),
      ],
    },
    {
      marker: "에", romanization: "e", title: "Vị trí hoặc sự tồn tại", description: "Dùng với 있다 (itda · có/ở), 없다 (eopda · không có) để chỉ người hoặc vật đang ở tại đâu.",
      examples: [line("누나는 방에 있어요.", "Nunaneun bange isseoyo.", "Chị gái đang ở trong phòng.")],
    },
    {
      marker: "에서", romanization: "eseo", title: "Nơi diễn ra hành động", description: "Dùng khi ăn, học, chơi, đọc, làm việc… tại địa điểm đó.",
      examples: [
        line("공원에서 자전거를 타요.", "Gongwoneseo jajeongeoreul tayo.", "Tôi đạp xe ở công viên."),
        line("식당에서 빵을 먹어요.", "Sikdangeseo ppangeul meogeoyo.", "Tôi ăn bánh mì ở nhà hàng."),
      ],
    },
  ];
  const sentenceOrder = {
    note: "Có thể đặt chủ đề trước, hoặc đưa thời gian và địa điểm lên đầu để tạo bối cảnh. Cả hai câu dưới đây đều đúng. Trong kiểu câu đang học, vị ngữ đứng cuối.",
    timeNote: "Thời gian thường có 에 (e), như 아침에 (achime · vào buổi sáng). Riêng 오늘 (oneul · hôm nay), 내일 (naeil · ngày mai), 어제 (eoje · hôm qua), 지금 (jigeum · bây giờ) thường không gắn 에 ngay sau chúng.",
    example: line("저는 아침에 식당에서 빵을 먹어요.", "Jeoneun achime sikdangeseo ppangeul meogeoyo.", "Vào buổi sáng, tôi ăn bánh mì ở nhà hàng."),
    alternate: line("아침에 식당에서 저는 빵을 먹어요.", "Achime sikdangeseo jeoneun ppangeul meogeoyo.", "Vào buổi sáng, ở nhà hàng, tôi ăn bánh mì."),
    parts: [
      ["저는", "jeoneun", "Chủ đề · tôi"], ["아침에", "achime", "Thời gian · vào buổi sáng"], ["식당에서", "sikdangeseo", "Nơi hành động · tại nhà hàng"], ["빵을", "ppangeul", "Tân ngữ · bánh mì"], ["먹어요", "meogeoyo", "Vị ngữ · ăn"],
    ].map(([text, romanization, role]) => ({ text, romanization, role })),
  };
  const grammarExamples = [
    line("거실에서 책을 읽어요.", "Geosireseo chaegeul ilgeoyo.", "Tôi đọc sách ở phòng khách."),
    line("학교에서 친구를 만나요.", "Hakgyoeseo chingureul mannayo.", "Tôi gặp bạn ở trường."),
    line("시장에서 토마토를 사요.", "Sijangeseo tomatoreul sayo.", "Tôi mua cà chua ở chợ."),
    line("저는 아침에 빵을 먹어요.", "Jeoneun achime ppangeul meogeoyo.", "Buổi sáng tôi ăn bánh mì."),
    line("동생이 자전거를 타요.", "Dongsaengi jajeongeoreul tayo.", "Em tôi đạp xe."),
    line("누나는 방에 있어요.", "Nunaneun bange isseoyo.", "Chị ở trong phòng."),
    line("누나는 방에서 컴퓨터를 해요.", "Nunaneun bangeseo keompyuteoreul haeyo.", "Chị dùng máy tính trong phòng."),
  ];
  const particles = [
    ["공원", "사진을 찍어요.", "에서", "gongwon", "sajineul jjigeoyo.", "Chụp ảnh ở công viên.", "Công viên là nơi diễn ra hành động → 에서 (eseo)."],
    ["저는 책", "읽어요.", "을", "jeoneun chaek", "ilgeoyo.", "Tôi đọc sách.", "책 (chaek, sách) có batchim ㄱ → 을 (eul). Đọc liền 책을: chaegeul."],
    ["학교", "친구를 만나요.", "에서", "hakgyo", "chingureul mannayo.", "Gặp bạn ở trường.", "Trường là nơi gặp bạn → 에서 (eseo)."],
    ["우유", "마셔요.", "를", "uyu", "masyeoyo.", "Uống sữa.", "우유 (uyu, sữa) không có batchim → 를 (reul)."],
    ["거실", "TV를 봐요.", "에서", "geosil", "tibireul bwayo.", "Xem TV ở phòng khách.", "Phòng khách là nơi xem TV → 에서 (eseo)."],
    ["점심", "먹어요.", "을", "jeomsim", "meogeoyo.", "Ăn trưa.", "점심 (jeomsim, bữa trưa) có batchim ㅁ → 을 (eul)."],
  ].map(([before, after, answer, beforeRoma, afterRoma, meaning, explanation], i) => ({
    before, after, answer, beforeRoma, afterRoma, meaning, explanation,
    romanization: ["Gongwoneseo sajineul jjigeoyo.", "Jeoneun chaegeul ilgeoyo.", "Hakgyoeseo chingureul mannayo.", "Uyureul masyeoyo.", "Geosireseo tibireul bwayo.", "Jeomsimeul meogeoyo."][i],
  }));
  const order = [
    line("저는 도서관에서 책을 읽어요.", "Jeoneun doseogwaneseo chaegeul ilgeoyo.", "Tôi đọc sách ở thư viện."),
    line("아버지는 체육관에서 수영을 해요.", "Abeojineun cheyukgwaneseo suyeongeul haeyo.", "Bố bơi ở khu thể thao."),
    line("동생이 방에서 책을 읽어요.", "Dongsaengi bangeseo chaegeul ilgeoyo.", "Em đọc sách trong phòng."),
    line("저는 아침에 집에서 우유를 마셔요.", "Jeoneun achime jibeseo uyureul masyeoyo.", "Buổi sáng tôi uống sữa ở nhà."),
    line("친구가 체육관에서 농구를 해요.", "Chinguga cheyukgwaneseo nonggureul haeyo.", "Bạn chơi bóng rổ ở nhà thể chất."),
    line("우리는 공원에서 아이스크림을 사요.", "Urineun gongwoneseo aiseukeurimeul sayo.", "Chúng tôi mua kem ở công viên."),
    line("저는 학교에서 친구하고 공부를 해요.", "Jeoneun hakgyoeseo chinguhago gongbureul haeyo.", "Tôi học cùng bạn ở trường."),
    line("엄마가 아침에 부엌에서 커피를 마셔요.", "Eommaga achime bueokeseo keopireul masyeoyo.", "Buổi sáng mẹ uống cà phê trong bếp."),
  ];
  const sentencePrompts = [
    ["저 / 공원 / 자전거", "jeo / gongwon / jajeongeo", line("저는 공원에서 자전거를 타요.", "Jeoneun gongwoneseo jajeongeoreul tayo.", "Tôi đạp xe ở công viên.")],
    ["친구 / 도서관 / 책", "chingu / doseogwan / chaek", line("친구는 도서관에서 책을 읽어요.", "Chinguneun doseogwaneseo chaegeul ilgeoyo.", "Bạn đọc sách ở thư viện.")],
    ["엄마 / 부엌 / 음식", "eomma / bueok / eumsik", line("엄마는 부엌에서 음식을 만들어요.", "Eommaneun bueokeseo eumsigeul mandeureoyo.", "Mẹ nấu ăn trong bếp.")],
    ["동생 / 공원 / 축구", "dongsaeng / gongwon / chukgu", line("동생은 공원에서 축구를 해요.", "Dongsaengeun gongwoneseo chukgureul haeyo.", "Em chơi bóng đá ở công viên.")],
    ["엄마 / 부엌 / 우유", "eomma / bueok / uyu", line("엄마는 부엌에서 우유를 마셔요.", "Eommaneun bueokeseo uyureul masyeoyo.", "Mẹ uống sữa trong bếp.")],
    ["저 / 도서관 / 친구", "jeo / doseogwan / chingu", line("저는 도서관에서 친구를 만나요.", "Jeoneun doseogwaneseo chingureul mannayo.", "Tôi gặp bạn ở thư viện.")],
    ["아이들 / 공원 / 사진", "aideul / gongwon / sajin", line("아이들은 공원에서 사진을 찍어요.", "Aideureun gongwoneseo sajineul jjigeoyo.", "Các em nhỏ chụp ảnh ở công viên.")],
    ["형 / 체육관 / 수영", "hyeong / cheyukgwan / suyeong", line("형은 체육관에서 수영을 해요.", "Hyeongeun cheyukgwaneseo suyeongeul haeyo.", "Anh trai bơi ở khu thể thao.")],
  ].map(([prompt, romanization, sample]) => ({ prompt, romanization, sample }));
  const dialogue = [
    line("여기는 공원이에요.", "Yeogineun gongwonieyo.", "Đây là công viên."),
    line("공원에서 사람들이 산책을 해요.", "Gongwoneseo saramdeuri sanchaegeul haeyo.", "Mọi người đi dạo ở công viên."),
    line("그리고 프리스비를 해요. 축구도 해요.", "Geurigo peuriseubireul haeyo. Chukgudo haeyo.", "Và chơi ném đĩa. Cũng chơi bóng đá nữa."),
    line("저는 자전거를 타요.", "Jeoneun jajeongeoreul tayo.", "Tôi đạp xe."),
    line("엄마는 벤치에서 책을 읽어요.", "Eommaneun benchieseo chaegeul ilgeoyo.", "Mẹ đọc sách trên ghế băng."),
    line("누나는 사진을 찍어요.", "Nunaneun sajineul jjigeoyo.", "Chị gái chụp ảnh."),
    line("그리고 동생은 놀이터에서 미끄럼틀을 타요.", "Geurigo dongsaengeun noriteoeseo mikkeureomteureul tayo.", "Và em chơi cầu trượt ở sân chơi."),
    line("공원은 아주 재미있어요.", "Gongwoneun aju jaemiisseoyo.", "Công viên rất thú vị."),
    line("사람들이 파빌리온에서 바비큐를 해요.", "Saramdeuri pabillioneseo babikyureul haeyo.", "Mọi người làm tiệc nướng ở nhà chòi."),
    line("우리도 점심을 먹어요.", "Urido jeomsimeul meogeoyo.", "Chúng tôi cũng ăn trưa."),
    line("그리고 아이스크림을 사요.", "Geurigo aiseukeurimeul sayo.", "Và mua kem."),
    line("아이스크림은 참 맛있어요.", "Aiseukeurimeun cham masisseoyo.", "Kem thật ngon."),
  ];
  const comprehension = [
    ["Thomas làm gì?", ["bike", "draw", "tv"], "bike", "Thomas nói: “Tôi đạp xe” (đoạn 4)."],
    ["Mẹ làm gì trên ghế băng?", ["photo", "read", "milk"], "read", "Đoạn 5: Mẹ đọc sách trên ghế băng."],
    ["Chị gái làm gì?", ["soccer", "cook", "photo"], "photo", "Đoạn 6: Chị gái chụp ảnh."],
    ["Em làm gì ở sân chơi?", ["slide", "swim", "study"], "slide", "Đoạn 7: Em chơi cầu trượt ở sân chơi."],
    ["Mọi người làm gì ở nhà chòi?", ["tv", "bbq", "clothes"], "bbq", "Đoạn 9: Mọi người làm tiệc nướng ở nhà chòi."],
    ["Hoạt động nào KHÔNG được nhắc trong bài đọc?", ["frisbee", "icecream", "swim"], "swim", "Ném đĩa và mua kem có trong bài; bơi không được nhắc tới. Không được nhắc không có nghĩa là không bao giờ làm."],
  ].map(([question, options, answer, explanation]) => ({ question, options, answer, explanation }));
  const slides = [
    ["Một ngày ở công viên", "Mục tiêu: nói mình làm gì và ở đâu.", "grammar", ["bike"]],
    ["Lộ trình Bài 5", "Từ vựng → ngữ pháp → luyện câu → vận dụng.", "grammar", []],
    ["Hoạt động ở công viên 1", "Đạp xe, chụp ảnh, ném đĩa và đọc sách.", "vocab", ["bike", "photo", "frisbee", "read"]],
    ["Hoạt động ở công viên 2", "Bóng đá, đi dạo, mua kem và cầu trượt.", "vocab", ["soccer", "walk", "icecream", "slide"]],
    ["Hoạt động ở công viên 3", "Vẽ tranh và làm tiệc nướng.", "vocab", ["draw", "bbq"]],
    ["Hoạt động khác 1", "Ăn trưa, bơi, nấu ăn và bóng rổ.", "vocab", ["lunch", "swim", "cook", "basketball"]],
    ["Hoạt động khác 2", "Mặc đồ, nhảy dây, bóng chày và học bài.", "vocab", ["clothes", "rope", "baseball", "study"]],
    ["Hoạt động khác 3", "Xem TV và uống sữa.", "vocab", ["tv", "milk"]],
    ["Địa điểm & từ bổ trợ 1", "Các địa điểm trong công viên và trong nhà.", "vocab", ["bench", "delicious", "pavilion", "park", "playground", "living", "gym"]],
    ["Địa điểm & từ bổ trợ 2", "Phòng, thư viện, bếp và địa điểm.", "vocab", ["room", "library", "kitchen", "place"]],
    ["N + 에서 (eseo) · Làm ở đâu?", "Gắn vào địa điểm diễn ra hành động. Ví dụ gặp bạn đã sửa lỗi đánh máy trong nguồn.", "grammar", []],
    ["N + 을/를 (eul/reul) · Làm gì?", "Chọn tiểu từ tân ngữ theo batchim; ôn đuôi lịch sự ở Bài 4.", "grammar", []],
    ["Điền hoạt động phù hợp", "Bài mở: một địa điểm có thể đi với nhiều hoạt động. Dùng phòng ghép câu để luyện.", "builder", ["bike", "read", "soccer", "walk", "lunch", "swim", "tv", "milk"]],
    ["Chọn tiểu từ", "6 câu có đáp án và giải thích tại mục Luyện tập.", "practice", []],
    ["Điền nơi diễn ra hành động", "Bài mở: chọn nơi hợp ngữ cảnh, không chỉ có một đáp án duy nhất.", "builder", ["park", "living", "room", "gym", "library", "kitchen"]],
    ["Sắp xếp 8 câu", "Bấm từng mảnh câu, tự ghép rồi đối chiếu mẫu.", "practice", []],
    ["Viết 8 câu theo gợi ý", "Tự viết và mở câu mẫu kèm phiên âm, nghĩa.", "practice", []],
    ["Bạn làm gì ở công viên?", "Chọn hoạt động trong phòng ghép câu rồi đọc to câu của mình.", "builder", ["frisbee", "rope", "baseball", "soccer", "bike", "draw"]],
    ["Quan sát bản đồ công viên", "Tìm các hoạt động trên tranh nguồn; dùng các thẻ hoạt động để gọi tên.", "builder", ["park"]],
    ["Nối tranh với hoạt động", "8 hoạt động để quan sát, gọi tên và đặt câu.", "builder", ["bike", "read", "frisbee", "photo", "soccer", "slide", "icecream", "walk"]],
    ["Miêu tả công viên", "Hỏi công viên thế nào và trả lời: rất lớn. Đây là ôn Bài 4.", "reading", []],
    ["Thomas và gia đình", "Bài đọc ở trang sách 58 được tách thành 12 đoạn có phiên âm và nghĩa.", "reading", []],
    ["Hoạt động nào được nhắc?", "Đối chiếu ném đĩa, vẽ, mua kem và bơi với bài đọc.", "reading", ["frisbee", "draw", "icecream", "swim"]],
    ["Ai làm gì?", "Ghép Thomas, mẹ, chị gái và em với hoạt động trong bài đọc.", "reading", ["bike", "read", "photo", "slide"]],
    ["Ở đâu, làm gì?", "Ghế băng–đọc sách; sân chơi–cầu trượt; công viên–đi dạo; nhà chòi–tiệc nướng.", "reading", ["bench", "playground", "park", "pavilion"]],
    ["Kể hoạt động của bạn", "Luyện câu hiện tại/thói quen theo mẫu, chưa chuyển sang thì quá khứ.", "builder", ["soccer"]],
    ["Hỏi một người làm gì", "Quan sát tranh và nói hoạt động; hình ăn kem khác với cụm mua kem.", "builder", ["read", "draw", "bike", "swim"]],
    ["Hỏi nơi diễn ra hành động", "Từ để hỏi: 어디에서 (eodieseo) · ở đâu.", "builder", ["photo", "cook", "milk", "basketball"]],
    ["Nói cả người, nơi và hoạt động", "Kết hợp chủ đề + địa điểm + tân ngữ + động từ.", "builder", ["baseball", "clothes", "tv", "slide", "rope"]],
    ["Phỏng vấn bạn học", "Hỏi bạn học làm gì ở thư viện, công viên hoặc ở nhà.", "builder", ["library", "park"]],
    ["Kể lại câu trả lời", "Ghép các câu của bạn học; ôn 그리고 (geurigo) · và.", "builder", ["rope", "frisbee", "slide"]],
    ["Gia đình ở nhà", "Quan sát phòng của chị, phòng mình, bếp và phòng khách.", "grammar", ["room", "kitchen", "living"]],
    ["Phân biệt ở đâu và làm ở đâu", "So sánh 에 (e, vị trí tồn tại) với 에서 (eseo, nơi hành động).", "grammar", []],
    ["Trò chơi diễn tả hành động", "Một người diễn không nói; người kia đoán nơi và hoạt động bằng câu đã học.", "builder", []],
    ["Thẻ gợi ý trò chơi", "Dùng các thẻ trong phòng ghép câu để chơi diễn tả theo cặp.", "builder", ["clothes", "study", "tv", "draw", "lunch", "soccer", "milk", "icecream"]],
  ].map(([title, summary, target, words], i) => ({ page: i + 1, title, summary, target, words }));
  window.KOREAN_LESSON_FIVE = {
    title: "공원에서 자전거를 타요.", romanization: "Gongwoneseo jajeongeoreul tayo.", meaning: "Tôi đạp xe ở công viên.",
    source: { title: "Bài 5.pdf", pageCount: 35 }, actions, context, supplementVocabulary, duplicateVariants, reviewSummary, locationContrast, sentenceOrder, grammarExamples, particles, order, sentencePrompts, dialogue, comprehension, slides,
  };
})();
