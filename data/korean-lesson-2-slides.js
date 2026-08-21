window.KOREAN_LESSON_TWO_SLIDES = (() => {
  const definitions = [
    ["intro", "Bài 2 · 초등학생이 아니에요", "Mở đầu bài học về gia đình, nghề nghiệp, câu phủ định và số thuần Hàn.", ["초등학생 · học sinh tiểu học", "아니에요 · không phải là"]],
    ["intro", "Lộ trình Bài 2", "Đi từ nhận biết từ mới đến ngữ pháp, luyện câu rồi vận dụng giao tiếp.", ["I. Từ vựng", "II. Ngữ pháp", "III. Luyện tập ngữ pháp", "IV. Luyện tập chung"]],
    ["vocabulary", "Gia đình · ông bà, bố mẹ", "Nhận biết những thành viên cơ bản trong gia đình.", ["가족 · gia đình", "할머니 · bà", "할아버지 · ông", "엄마 · mẹ", "아빠 · bố"]],
    ["vocabulary", "Cách gọi anh chị em", "Chọn từ xưng hô theo giới tính của người nói và quan hệ trong gia đình.", ["오빠 · em gái gọi anh trai", "형 · em trai gọi anh trai", "언니 · em gái gọi chị gái", "누나 · em trai gọi chị gái", "남동생 · em trai", "여동생 · em gái"]],
    ["vocabulary", "Nghề nghiệp & trường học · phần 1", "Ba vai trò thường gặp để luyện cấu trúc “là…” và câu hỏi xác nhận.", ["간호사 · y tá, điều dưỡng", "초등학생 · học sinh tiểu học", "회사원 · nhân viên văn phòng"]],
    ["vocabulary", "Nghề nghiệp & trường học · phần 2", "Mở rộng nhóm từ nghề nghiệp và cấp học xuất hiện trong bài luyện.", ["중학생 · học sinh trung học cơ sở", "직업 · nghề nghiệp, công việc", "자원봉사자 · tình nguyện viên"]],
    ["vocabulary", "Số thuần Hàn 1–10", "Học dãy số dùng khi đếm người và nói tuổi.", ["하나 · một", "둘 · hai", "셋 · ba", "넷 · bốn", "다섯 · năm", "여섯 · sáu", "일곱 · bảy", "여덟 · tám", "아홉 · chín", "열 · mười"]],
    ["vocabulary", "Động từ dùng trong lớp học", "Nhóm từ diễn tả đặt câu hỏi, trả lời, sử dụng và hợp tác.", ["질문하다 · đặt câu hỏi", "대답하다 · trả lời", "사용하다 · sử dụng", "정확하다 · chính xác", "협력하다 · hợp tác", "그림을 그리다 · vẽ tranh", "좋아하다 · thích"]],
    ["vocabulary", "Đồ vật, tuổi và đơn vị đếm", "Những từ cần thiết cho bài nghe, miêu tả nghề nghiệp và bài tập số lượng.", ["얻다 · nhận được", "청진기 · ống nghe bác sĩ", "컴퓨터 마우스 · chuột máy tính", "마이크 · micro", "돈 · tiền", "나이 · tuổi", "명 · đơn vị đếm người"]],
    ["grammar", "Hỏi xác nhận với 이에요/예요?", "Dùng câu hỏi Có/Không để kiểm tra người hoặc vật có phải là danh từ được nhắc đến hay không.", ["학생이에요? · Có phải là học sinh không?", "간호사예요? · Có phải là y tá không?", "네 · vâng, đúng", "아니요 · không, không phải"]],
    ["grammar", "Phủ định với 이/가 아니에요", "Danh từ có patchim dùng 이 아니에요; không có patchim dùng 가 아니에요.", ["학생이 아니에요. · Không phải là học sinh.", "간호사가 아니에요. · Không phải là y tá.", "이 아니에요 · sau danh từ có patchim", "가 아니에요 · sau danh từ không có patchim"]],
    ["grammar", "Biến đổi số trước danh từ đơn vị", "Bốn số đầu đổi dạng khi đứng trước 명 hoặc 살.", ["하나 → 한", "둘 → 두", "셋 → 세", "넷 → 네", "한 살 · một tuổi", "네 명 · bốn người"]],
    ["grammar-practice", "Đặt câu hỏi và câu phủ định", "Chọn đúng 이에요/예요? và 이/가 아니에요 theo patchim.", ["엄마는 간호사예요? · Mẹ có phải là y tá không?", "오빠는 회사원이에요? · Anh trai có phải nhân viên công ty không?", "저는 초등학생이 아니에요. · Tôi không phải học sinh tiểu học.", "형은 간호사가 아니에요. · Anh trai không phải là y tá."]],
    ["grammar-practice", "Hỏi và trả lời Có/Không", "Luyện cặp câu hỏi - trả lời khẳng định hoặc phủ định theo hình gợi ý.", ["네, 간호사예요. · Vâng, là y tá.", "아니요, 학생이 아니에요. · Không, không phải là học sinh.", "이것은 마이크예요? · Đây có phải là micro không?", "컴퓨터 마우스가 아니에요. · Không phải là chuột máy tính."]],
    ["grammar-practice", "Sắp xếp mảnh câu", "Tạo câu hoàn chỉnh từ chủ đề, nghề nghiệp, số lượng và đuôi câu.", ["오빠 / 회사원 / 이에요 / ?", "할아버지 / 자원봉사자 / 예요 / ?", "형 / 회사원 / 이 / 아니에요", "학생 / 셋 / 명 / 이에요", "우리 가족 / 명 / 넷 / 이에요"]],
    ["grammar-practice", "Điền số thuần Hàn + đơn vị", "Chọn đúng dạng số và danh từ đơn vị cho người, đồ vật và tuổi.", ["한 명 · một người", "네 명 · bốn người", "다섯 명 · năm người", "여섯 명 · sáu người", "열 개 · mười cái"]],
    ["general-practice", "Nghe Bora miêu tả gia đình", "Nghe và chọn những từ Bora sử dụng để giới thiệu gia đình.", ["Nghe trước khi nhìn đáp án", "Đánh dấu những từ thực sự xuất hiện", "Đối chiếu lại bằng tranh minh họa"]],
    ["general-practice", "Thành viên trong gia đình Bora", "Quan sát ảnh và chọn đúng quan hệ gia đình.", ["가족 · gia đình", "아빠 · bố", "엄마 · mẹ", "오빠 · anh trai", "여동생 · em gái"]],
    ["general-practice", "Đoán nghề nghiệp của mẹ Bora", "Dựa vào đồ vật và trang phục trong tranh để suy luận nghề nghiệp.", ["간호사 · y tá", "청진기 · ống nghe", "회사원 · nhân viên công ty", "직업 · nghề nghiệp"]],
    ["general-practice", "Nghe Daniel giới thiệu gia đình", "Nghe hội thoại và xác định gia đình Daniel có bao nhiêu người.", ["우리 가족은 네 명이에요. · Gia đình tôi có bốn người.", "아빠, 엄마, 누나, 저예요. · Bố, mẹ, chị gái và tôi."]],
    ["general-practice", "Nối tranh với cụm từ thích hợp", "Nhận diện thành viên và nghề nghiệp từ bài nghe Daniel.", ["아빠 · bố", "엄마 · mẹ", "누나 · chị gái", "회사원 · nhân viên công ty", "간호사 · y tá"]],
    ["general-practice", "Đọc hiểu Đúng/Sai", "Dựa vào hội thoại Daniel để đánh dấu O hoặc X cho từng nhận định.", ["Đọc lại câu có thông tin liên quan", "Gạch chân thành viên, nghề nghiệp và tuổi", "Chỉ chọn O khi thông tin khớp hoàn toàn"]],
    ["general-practice", "Giới thiệu gia đình của bạn", "Chọn thành viên trong tranh rồi nói về số người và quan hệ trong gia đình.", ["우리 가족은 네 명이에요. · Gia đình tôi có bốn người.", "우리 엄마는 간호사예요. · Mẹ tôi là y tá.", "우리 누나는 학생이에요. · Chị tôi là học sinh."]],
    ["general-practice", "Luyện hỏi về người trong tranh", "Thay người và vai trò trong câu mẫu để tạo hội thoại ngắn.", ["이 사람은 누구예요? · Người này là ai?", "우리 엄마예요. · Là mẹ tôi.", "간호사예요? · Có phải là y tá không?"]],
    ["general-practice", "Luyện nói · đoán thành viên", "Dựa vào ảnh để hỏi và trả lời về thành viên trong gia đình.", ["누구예요? · Là ai?", "언니예요. · Là chị gái.", "동생이에요. · Là em."]],
    ["general-practice", "Luyện nói · hỏi tuổi", "Hỏi và trả lời tuổi bằng số thuần Hàn + 살.", ["몇 살이에요? · Bao nhiêu tuổi?", "아홉 살이에요. · Chín tuổi.", "열 살이에요. · Mười tuổi."]],
    ["general-practice", "Khảo sát bạn học", "Hỏi lớp, tuổi và số thành viên gia đình rồi ghi lại thông tin.", ["몇 학년이에요? · Bạn học lớp mấy?", "몇 살이에요? · Bạn bao nhiêu tuổi?", "가족은 몇 명이에요? · Gia đình bạn có mấy người?"]],
    ["general-practice", "Viết và trình bày hồ sơ bạn học", "Tổng hợp khảo sát thành một đoạn giới thiệu ngắn bằng tiếng Hàn.", ["Tên · lớp · tuổi", "Số thành viên gia đình", "Viết đoạn mẫu rồi luyện trình bày"]],
  ];

  return definitions.map(([section, title, summary, lines], position) => {
    const index = position + 1;
    return { index, section, title, summary, lines, image: `assets/korean/lesson-2/slides/slide-${String(index).padStart(2, "0")}.png` };
  });
})();
