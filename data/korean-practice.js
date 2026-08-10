window.KOREAN_LESSON_ONE.interactivePractice = {
  version: 1,
  title: "Phòng luyện tập tương tác",
  subtitle: "12 nhiệm vụ web-native được chuyển từ phần luyện tập của tài liệu Bài 1.",
  modules: [
    {
      id: "particles-copula",
      sourceSlide: 13,
      kind: "fill",
      icon: "blocks",
      accent: "mint",
      title: "Chọn 은/는 và 이에요/예요",
      description: "Quan sát 받침 rồi chọn tiểu từ hoặc đuôi “là” phù hợp.",
      skills: ["은/는", "이에요/예요"],
      questions: [
        { id: "p1", segments: ["안녕하세요. 저", { blank: "a", options: ["은", "는"], answer: "는" }, " 하나예요."], meaning: "Xin chào. Tôi là Hana.", reading: "an-nyơng-ha-sê-yô, chơ-nưn ha-na-yê-yô", explanation: "저 không có 받침 nên dùng 는." },
        { id: "p2", segments: ["제 이름", { blank: "a", options: ["은", "는"], answer: "은" }, " 남예요."], meaning: "Tên tôi là Nam.", reading: "chê i-rư-mưn nam-yê-yô", explanation: "이름 kết thúc bằng 받침 ㅁ nên dùng 은." },
        { id: "p3", segments: ["이 사람", { blank: "a", options: ["은", "는"], answer: "은" }, " 제 친구입니다."], meaning: "Người này là bạn tôi.", reading: "i xa-ra-mưn chê chin-gu-im-ni-da", explanation: "사람 có 받침 ㅁ nên dùng 은." },
        { id: "p4", segments: ["한국", { blank: "a", options: ["은", "는"], answer: "은" }, " 아름다운 나라입니다."], meaning: "Hàn Quốc là một đất nước đẹp.", reading: "han-gu-gưn a-rưm-da-un na-ra-im-ni-da", explanation: "한국 có 받침 ㄱ nên dùng 은." },
        { id: "p5", segments: ["오늘 날씨", { blank: "a", options: ["은", "는"], answer: "는" }, " 좋아요."], meaning: "Thời tiết hôm nay đẹp.", reading: "ô-nưl nal-ssi-nưn chô-a-yô", explanation: "날씨 không có 받침 nên dùng 는." },
        { id: "p6", segments: ["저는 학생", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là học sinh.", reading: "chơ-nưn hak-sseng-i-ê-yô", explanation: "학생 có 받침 ㅇ nên dùng 이에요." },
        { id: "p7", segments: ["이 사람은 선생님", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Người này là giáo viên.", reading: "i xa-ra-mưn xơn-xeng-ni-mi-ê-yô", explanation: "선생님 có 받침 ㅁ nên dùng 이에요." },
        { id: "p8", segments: ["여기는 학교", { blank: "a", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Đây là trường học.", reading: "yơ-gi-nưn hak-kkyô-yê-yô", explanation: "학교 không có 받침 nên dùng 예요." },
        { id: "p9", segments: ["저것은 교실", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Kia là phòng học.", reading: "chơ-gơ-sưn kyo-shi-ri-ê-yô", explanation: "교실 có 받침 ㄹ nên dùng 이에요." },
        { id: "p10", segments: ["제 친구는 미국 사람", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Bạn tôi là người Mỹ.", reading: "chê chin-gu-nưn mi-guk xa-ra-mi-ê-yô", explanation: "사람 có 받침 ㅁ nên dùng 이에요." }
      ]
    },
    {
      id: "also-and-mixed",
      sourceSlide: 14,
      kind: "fill",
      icon: "combine",
      accent: "peach",
      title: "Thêm 도 và ôn tổng hợp",
      description: "Dùng 도 với nghĩa “cũng”, sau đó kết hợp ba cấu trúc trong cùng một câu.",
      skills: ["도", "은/는", "이에요/예요"],
      questions: [
        { id: "d1", segments: ["저는 학생입니다. 친구", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 학생입니다."], meaning: "Tôi là học sinh. Bạn tôi cũng là học sinh.", explanation: "도 thêm nghĩa “cũng”." },
        { id: "d2", segments: ["저는 떡볶이를 좋아합니다. 김밥", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 좋아합니다."], meaning: "Tôi thích tteokbokki. Tôi cũng thích kimbap.", explanation: "김밥도 = kimbap cũng…" },
        { id: "d3", segments: ["선생님을 만납니다. 학생", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 만납니다."], meaning: "Tôi gặp giáo viên. Tôi cũng gặp học sinh.", explanation: "도 thay cho tiểu từ muốn nhấn mạnh “cũng”." },
        { id: "d4", segments: ["학교에 갑니다. 도서관", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 갑니다."], meaning: "Tôi đi đến trường. Tôi cũng đi thư viện.", explanation: "도서관도 = thư viện cũng…" },
        { id: "m1", segments: ["저", { blank: "a", options: ["은", "는", "도"], answer: "는" }, " 학생", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là học sinh.", explanation: "저는 + 학생이에요." },
        { id: "m2", segments: ["친구", { blank: "a", options: ["은", "는", "도"], answer: "는" }, " 선생님", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Bạn tôi là giáo viên.", explanation: "친구는 + 선생님이에요." },
        { id: "m3", segments: ["한국", { blank: "a", options: ["은", "는", "도"], answer: "은" }, " 나라", { blank: "b", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Hàn Quốc là một đất nước.", explanation: "한국은 + 나라예요." },
        { id: "m4", segments: ["저", { blank: "a", options: ["은", "는", "도"], answer: "는" }, " 미국 사람", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là người Mỹ.", explanation: "저는 + 미국 사람이에요." },
        { id: "m5", segments: ["이것", { blank: "a", options: ["은", "는", "도"], answer: "은" }, " 떡볶이", { blank: "b", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Đây là tteokbokki.", explanation: "이것은 + 떡볶이예요." }
      ]
    },
    {
      id: "error-detective",
      sourceSlide: 15,
      kind: "choice",
      icon: "search-check",
      accent: "lavender",
      title: "Thám tử sửa câu sai",
      description: "Tìm câu đúng. Có một câu vốn đã chính xác, đừng sửa quá tay.",
      skills: ["Sửa lỗi", "받침"],
      questions: [
        { id: "e1", prompt: "저는 학생은이에요.", meaning: "Tôi là học sinh.", options: ["저는 학생이에요.", "저는 학생은예요.", "저은 학생이에요."], answer: "저는 학생이에요.", explanation: "Sau 학생 chỉ cần 이에요; 은/는 đã gắn ở 저는." },
        { id: "e2", prompt: "이 사람는 제 친구예요.", meaning: "Người này là bạn tôi.", options: ["이 사람은 제 친구예요.", "이 사람는 제 친구이에요.", "이 사람도 제 친구은예요."], answer: "이 사람은 제 친구예요.", explanation: "사람 có 받침 ㅁ nên dùng 은." },
        { id: "e3", prompt: "한국는 아름다운 나라예요.", meaning: "Hàn Quốc là một đất nước đẹp.", options: ["한국은 아름다운 나라예요.", "한국는 아름다운 나라예요.", "한국은 아름다운 나라이에요."], answer: "한국은 아름다운 나라예요.", explanation: "한국 có 받침 nên dùng 은; 나라 không có 받침 nên dùng 예요." },
        { id: "e4", prompt: "저는 베트남 사람이에요.", meaning: "Tôi là người Việt Nam.", options: ["Đúng rồi, không cần sửa", "저은 베트남 사람이에요.", "저는 베트남 사람예요."], answer: "Đúng rồi, không cần sửa", explanation: "저는 và 사람이에요 đều đã đúng." },
        { id: "e5", prompt: "제 이름은 민지이에요.", meaning: "Tên tôi là Minji.", options: ["제 이름은 민지예요.", "제 이름는 민지예요.", "제 이름은 민지은이에요."], answer: "제 이름은 민지예요.", explanation: "민지 không có 받침 nên dùng 예요." },
        { id: "e6", prompt: "이 책은 한국어 책예요.", meaning: "Quyển này là sách tiếng Hàn.", options: ["이 책은 한국어 책이에요.", "이 책는 한국어 책예요.", "이 책은 한국어 책은이에요."], answer: "이 책은 한국어 책이에요.", explanation: "책 có 받침 ㄱ nên dùng 이에요." },
        { id: "e7", prompt: "선생님는 의사이에요.", meaning: "Giáo viên là bác sĩ.", options: ["선생님은 의사예요.", "선생님는 의사예요.", "선생님은 의사이에요."], answer: "선생님은 의사예요.", explanation: "선생님 có 받침 → 은; 의사 không có 받침 → 예요." },
        { id: "e8", prompt: "여기는 학교은이에요.", meaning: "Đây là trường học.", options: ["여기는 학교예요.", "여기은 학교이에요.", "여기는 학교은예요."], answer: "여기는 학교예요.", explanation: "학교 không có 받침 nên dùng 예요; không thêm 은 trước 이에요/예요." },
        { id: "e9", prompt: "그 사람은 친구이에요.", meaning: "Người đó là bạn.", options: ["그 사람은 친구예요.", "그 사람는 친구예요.", "그 사람은 친구은이에요."], answer: "그 사람은 친구예요.", explanation: "친구 không có 받침 nên dùng 예요." },
        { id: "e10", prompt: "이것는 연필이에요.", meaning: "Đây là bút chì.", options: ["이것은 연필이에요.", "이것는 연필예요.", "이것은 연필예요."], answer: "이것은 연필이에요.", explanation: "이것 có 받침 ㅅ nên dùng 은; 연필 có 받침 ㄹ nên dùng 이에요." }
      ]
    },
    {
      id: "picture-grammar",
      sourceSlide: 16,
      kind: "fill",
      icon: "gallery-horizontal-end",
      accent: "sky",
      title: "Nhìn biểu tượng, hoàn thành câu",
      description: "Thay tranh cũ bằng biểu tượng lớn, rõ và có phản hồi ngay.",
      skills: ["Hình ảnh", "들", "은/는"],
      questions: [
        { id: "v1", visual: "🇻🇳", visualLabel: "Việt Nam", segments: ["베트남", { blank: "a", options: ["은", "는"], answer: "은" }, " 제 고향", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Việt Nam là quê hương của tôi.", explanation: "베트남은 + 고향이에요." },
        { id: "v2", visual: "📚", visualLabel: "Sách", segments: ["이것", { blank: "a", options: ["은", "는"], answer: "은" }, " 책", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Đây là sách.", explanation: "이것은 + 책이에요." },
        { id: "v3", visual: "🍲", visualLabel: "Tteokbokki", segments: ["이것", { blank: "a", options: ["은", "는"], answer: "은" }, " 떡볶이", { blank: "b", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Đây là tteokbokki.", explanation: "떡볶이 không có 받침 nên dùng 예요." },
        { id: "v4", visual: "👩🏻‍🏫", visualLabel: "Giáo viên", segments: ["선생님", { blank: "a", options: ["은", "는"], answer: "은" }, " 친절해요."], meaning: "Giáo viên thân thiện.", explanation: "선생님 có 받침 ㅁ nên dùng 은." },
        { id: "v5", visual: "🧑🏻‍🎓👩🏻‍🎓", visualLabel: "Nhiều học sinh", segments: ["학생", { blank: "a", options: ["들", "들이", "들은"], answer: "들이" }, " 많아요."], meaning: "Có nhiều học sinh.", explanation: "들 biểu thị số nhiều; 이 là tiểu từ chủ ngữ trong mẫu “có nhiều…”." }
      ]
    },
    {
      id: "first-meeting",
      sourceSlide: 17,
      kind: "choice",
      icon: "audio-lines",
      accent: "mint",
      title: "Nghe–đọc: buổi gặp đầu tiên",
      description: "Nghe hội thoại bằng giọng ko-KR rồi trả lời câu hỏi hồ sơ nhân vật.",
      skills: ["Nghe", "Đọc hiểu"],
      passage: {
        title: "첫 만남 · Lần gặp đầu tiên",
        text: "선생님: 여러분, 안녕하세요?\n학생들: 선생님, 안녕하세요?\n선생님: 저는 이수진이에요. 만나서 반가워요.\n다니엘: 안녕하세요. 저는 다니엘이에요. 3학년이에요.\n유나: 저는 정유나예요. 2학년이에요.\n노아: 노아예요. 저도 2학년이에요. 만나서 반가워요.\n학생들: 선생님, 감사합니다. 안녕히 계세요.\n선생님: 네, 여러분도 안녕히 가세요.",
        translation: "Cô Lee Sujin chào lớp. Daniel học lớp 3; Yuna và Noa học lớp 2. Cuối buổi, học sinh chào cô ở lại và cô chào học sinh ra về."
      },
      questions: [
        { id: "r1", visual: "👩🏻‍🏫", prompt: "이수진은 누구예요?", meaning: "Lee Sujin là ai?", options: ["선생님이에요.", "학생이에요.", "3학년이에요."], answer: "선생님이에요.", explanation: "이수진 là giáo viên đang chào cả lớp." },
        { id: "r2", visual: "👦🏼", prompt: "다니엘은 몇 학년이에요?", meaning: "Daniel học lớp mấy?", options: ["1학년이에요.", "2학년이에요.", "3학년이에요."], answer: "3학년이에요.", explanation: "Daniel tự giới thiệu: 3학년이에요." },
        { id: "r3", visual: "👧🏻", prompt: "유나는 몇 학년이에요?", meaning: "Yuna học lớp mấy?", options: ["1학년이에요.", "2학년이에요.", "3학년이에요."], answer: "2학년이에요.", explanation: "Yuna tự giới thiệu: 2학년이에요." },
        { id: "r4", visual: "🧒🏻", prompt: "노아도 2학년이에요?", meaning: "Noa cũng học lớp 2 phải không?", options: ["네, 2학년이에요.", "아니요, 1학년이에요.", "아니요, 선생님이에요."], answer: "네, 2학년이에요.", explanation: "Noa nói 저도 2학년이에요." },
        { id: "r5", visual: "👋", prompt: "학생들은 떠나기 전에 뭐라고 해요?", meaning: "Học sinh nói gì trước khi rời đi?", options: ["안녕히 계세요.", "안녕히 가세요.", "안녕하세요?"], answer: "안녕히 계세요.", explanation: "Người rời đi nói 안녕히 계세요 với người ở lại." }
      ]
    },
    {
      id: "greeting-scenes",
      sourceSlide: 18,
      kind: "choice",
      icon: "messages-square",
      accent: "peach",
      title: "Chạm để ghép lời chào",
      description: "Đọc tình huống trực quan rồi chọn câu tiếng Hàn phù hợp.",
      skills: ["Tình huống", "Phản xạ"],
      questions: [
        { id: "g1", visual: "👋🙂 ↔ 🙂👋", prompt: "Hai người bạn thân gặp nhau.", options: ["안녕?", "안녕히 계세요.", "감사합니다."], answer: "안녕?", explanation: "안녕? dùng thân mật giữa bạn bè." },
        { id: "g2", visual: "🙇🏻‍♂️ → 👩🏻‍🏫", prompt: "Học sinh gặp giáo viên.", options: ["안녕하세요?", "안녕?", "안녕히 가세요."], answer: "안녕하세요?", explanation: "Dùng 안녕하세요? trong hoàn cảnh lịch sự." },
        { id: "g3", visual: "🚶🏻‍♀️ → 🏠", prompt: "Bạn rời đi, người kia ở lại.", options: ["안녕히 계세요.", "안녕히 가세요.", "감사합니다."], answer: "안녕히 계세요.", explanation: "Người đi chào người ở lại bằng 안녕히 계세요." },
        { id: "g4", visual: "🎁 → 😊", prompt: "Bạn vừa nhận một món quà.", options: ["감사합니다.", "안녕하세요?", "안녕히 계세요."], answer: "감사합니다.", explanation: "감사합니다 = cảm ơn." },
        { id: "g5", visual: "🏠 👋 🚶🏻", prompt: "Bạn ở lại chào người đang ra về.", options: ["안녕히 가세요.", "안녕히 계세요.", "안녕?"], answer: "안녕히 가세요.", explanation: "Người ở lại chào người đi bằng 안녕히 가세요." }
      ]
    },
    {
      id: "name-intros",
      sourceSlide: 19,
      kind: "fill",
      icon: "badge-check",
      accent: "lavender",
      title: "Hoàn thành lời giới thiệu tên",
      description: "Mỗi tên có hoặc không có 받침; chọn 이에요/예요 cho đúng.",
      skills: ["Tên riêng", "이에요/예요"],
      questions: [
        { id: "n1", visual: "🧢", segments: ["저는 김영준", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là Kim Youngjun.", explanation: "준 có 받침 ㄴ nên dùng 이에요." },
        { id: "n2", visual: "🎀", segments: ["저는 유나", { blank: "a", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Tôi là Yuna.", explanation: "나 không có 받침 nên dùng 예요." },
        { id: "n3", visual: "👦🏼", segments: ["저는 다니엘", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là Daniel.", explanation: "엘 có 받침 ㄹ nên dùng 이에요." },
        { id: "n4", visual: "👧🏼", segments: ["저는 레이첼 브라운", { blank: "a", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Tôi là Rachel Brown.", explanation: "브라운 kết thúc bằng 받침 ㄴ nên dùng 이에요." },
        { id: "n5", visual: "👦🏿", segments: ["저는 토마스", { blank: "a", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Tôi là Thomas.", explanation: "스 không có 받침 nên dùng 예요." },
        { id: "n6", visual: "👓", segments: ["저는 이민지", { blank: "a", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Tôi là Lee Minji.", explanation: "지 không có 받침 nên dùng 예요." }
      ]
    },
    {
      id: "friend-profiles",
      sourceSlide: 20,
      kind: "fill",
      icon: "users-round",
      accent: "sky",
      title: "So sánh hồ sơ bạn bè",
      description: "Dựa vào thẻ hồ sơ để hoàn thành các câu có 은/는, 도 và 이에요/예요.",
      skills: ["Hồ sơ", "도"],
      profiles: [
        { name: "영준", detail: "2학년 · 한국 사람", visual: "🧢" },
        { name: "유나", detail: "2학년 · 한국 사람", visual: "🎀" },
        { name: "다니엘", detail: "3학년 · 영국 사람", visual: "👦🏼" },
        { name: "레이첼", detail: "1학년 · 미국 사람", visual: "👧🏼" },
        { name: "토마스", detail: "3학년 · 미국 사람", visual: "👦🏿" },
        { name: "민지", detail: "2학년 · 한국 사람", visual: "👓" }
      ],
      questions: [
        { id: "f1", segments: ["영준", { blank: "a", options: ["은", "는", "도"], answer: "은" }, " 노아 친구", { blank: "b", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Youngjun là bạn của Noa.", explanation: "영준은 + 친구예요." },
        { id: "f2", segments: ["다니엘", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 노아 친구", { blank: "b", options: ["이에요", "예요"], answer: "예요" }, "."], meaning: "Daniel cũng là bạn của Noa.", explanation: "다니엘도 + 친구예요." },
        { id: "f3", segments: ["민지", { blank: "a", options: ["은", "는", "도"], answer: "는" }, " 한국 사람", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Minji là người Hàn Quốc.", explanation: "민지는 + 한국 사람이에요." },
        { id: "f4", segments: ["영준", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 한국 사람", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Youngjun cũng là người Hàn Quốc.", explanation: "영준도 + 한국 사람이에요." },
        { id: "f5", segments: ["토마스", { blank: "a", options: ["은", "는", "도"], answer: "는" }, " 3학년", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Thomas học lớp 3.", explanation: "토마스는 + 3학년이에요." },
        { id: "f6", segments: ["다니엘", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 3학년", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Daniel cũng học lớp 3.", explanation: "다니엘도 + 3학년이에요." },
        { id: "f7", segments: ["레이첼", { blank: "a", options: ["은", "는", "도"], answer: "은" }, " 미국 사람", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Rachel là người Mỹ.", explanation: "레이첼은 + 미국 사람이에요." },
        { id: "f8", segments: ["토마스", { blank: "a", options: ["은", "는", "도"], answer: "도" }, " 미국 사람", { blank: "b", options: ["이에요", "예요"], answer: "이에요" }, "."], meaning: "Thomas cũng là người Mỹ.", explanation: "토마스도 + 미국 사람이에요." }
      ]
    },
    {
      id: "noa-schedule",
      sourceSlide: 21,
      kind: "choice",
      icon: "calendar-days",
      accent: "mint",
      title: "Khám phá thời khóa biểu của Noa",
      description: "Đọc lịch dạng thẻ trực quan và trả lời nhanh từng tiết học.",
      skills: ["Lịch học", "Từ vựng"],
      schedule: [
        { slot: "1교시", value: "한국어", visual: "🇰🇷" },
        { slot: "2교시", value: "한국어", visual: "🇰🇷" },
        { slot: "3교시", value: "태권도", visual: "🥋" },
        { slot: "간식 시간", value: "피자 · 주스", visual: "🍕🧃" },
        { slot: "4교시", value: "한국어", visual: "🇰🇷" }
      ],
      questions: [
        { id: "s1", prompt: "1교시 수업은 뭐예요?", meaning: "Tiết 1 học gì?", options: ["한국어예요.", "태권도예요.", "간식 시간이에요."], answer: "한국어예요.", explanation: "1교시는 한국어예요." },
        { id: "s2", prompt: "3교시 수업은 뭐예요?", meaning: "Tiết 3 học gì?", options: ["한국어예요.", "태권도예요.", "피자예요."], answer: "태권도예요.", explanation: "3교시는 태권도예요." },
        { id: "s3", prompt: "간식은 뭐예요?", meaning: "Đồ ăn vặt là gì?", options: ["피자예요.", "한국어예요.", "태권도예요."], answer: "피자예요.", explanation: "간식은 피자예요." },
        { id: "s4", prompt: "음료는 뭐예요?", meaning: "Đồ uống là gì?", options: ["주스예요.", "김밥이에요.", "물이에요."], answer: "주스예요.", explanation: "음료는 주스예요." },
        { id: "s5", prompt: "4교시 수업은 뭐예요?", meaning: "Tiết 4 học gì?", options: ["한국어예요.", "태권도예요.", "영어예요."], answer: "한국어예요.", explanation: "4교시는 한국어예요." }
      ]
    },
    {
      id: "my-schedule",
      sourceSlide: 22,
      kind: "schedule-builder",
      icon: "calendar-plus-2",
      accent: "peach",
      title: "Tự lập lịch học của mình",
      description: "Chọn môn cho bốn tiết và món ăn vặt; hệ thống tự tạo câu tiếng Hàn.",
      skills: ["Tự tạo", "Lưu bài"],
      classOptions: ["한국어", "영어", "수학", "과학", "태권도", "미술"],
      snackOptions: ["피자", "김밥", "떡볶이", "핫도그", "도너츠", "주스"]
    },
    {
      id: "snack-menu",
      sourceSlide: 23,
      kind: "snack-builder",
      icon: "utensils",
      accent: "lavender",
      title: "Chọn món ăn vặt yêu thích",
      description: "Chạm một món để tạo bảng thực đơn và nghe câu hoàn chỉnh.",
      skills: ["Món ăn", "Phản xạ"],
      snacks: [
        { text: "핫도그", meaning: "hotdog", visual: "🌭" },
        { text: "떡볶이", meaning: "bánh gạo cay", visual: "🍲" },
        { text: "김밥", meaning: "cơm cuộn", visual: "🍙" },
        { text: "스파게티", meaning: "mì spaghetti", visual: "🍝" },
        { text: "도너츠", meaning: "bánh donut", visual: "🍩" },
        { text: "피자", meaning: "pizza", visual: "🍕" }
      ]
    },
    {
      id: "intro-studio",
      sourceSlide: 24,
      kind: "intro-builder",
      icon: "mic-2",
      accent: "sky",
      title: "Studio giới thiệu bản thân",
      description: "Điền thông tin, xem bản nháp trực tiếp, nghe giọng ko-KR và sao chép bài.",
      skills: ["Viết", "Nói", "Cá nhân hóa"],
      nationalities: ["베트남", "한국", "미국", "영국", "중국", "일본"]
    }
  ]
};
