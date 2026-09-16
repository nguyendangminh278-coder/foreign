# Foreign Language Study Notebook

Website học tiếng Trung, tiếng Hàn và IELTS với bài học dạng slide, từ điển, luyện tập và trợ giảng AI.

Mở `index.html` để sử dụng cục bộ. Xem [AI-SETUP.md](AI-SETUP.md) để cấu hình Gemini Flash free tier an toàn.

## Tiếng Hàn · Bài 5

Nguồn: `Bài 5.pdf` (35 trang). Vào **Tiếng Hàn → Bài 5** để học hoạt động ở công viên, tiểu từ `에서`, `을/를`, ghép câu, đọc hiểu và luyện tập. Phần từ vựng trang 3–10 có 20 cụm hoạt động và 11 mục bổ trợ; đây không phải số từ mới duy nhất của toàn khóa. Từ đã gặp được ghi chú ôn tập.

- Dữ liệu: `data/korean-lesson-5.js`; giao diện: `korean-lesson-5-app.js`, `korean-lesson-5.css`.
- Ảnh đủ 35 trang ở `assets/korean/lesson-5/slides/`; giữ nguyên nguồn, sửa lỗi `만아요` thành `만나요` trong phần học.
- Âm thanh là giọng tổng hợp `ko-KR` của trình duyệt, không có audio gốc kèm PDF. Phiên âm tiếng Việt chỉ là hướng dẫn gần đúng.
- Đọc hiểu và chọn tiểu từ có chấm đáp án. Ghép câu/tự viết dùng câu mẫu vì có thể có nhiều cách diễn đạt đúng. Không gọi AI hay dịch tự động để tạo từ ngoài bài.
- Tiến độ đã học lưu tại máy bằng `localStorage`; câu tự viết và kết quả luyện chỉ giữ trong phiên hiện tại.

Ghi chú bổ sung Bài 5: thêm **33 mục từ/cụm từ** chia thành động từ (12), sinh hoạt (12), trạng thái/sở thích (2), địa điểm/thời gian (7). Mỗi mục có phiên âm, cách đọc gần đúng, dạng lịch sự hoặc ví dụ và liên kết tra Naver. Giữ riêng 31 mục PDF; không thêm lại từ đã học ở Bài 1–4 hay đếm riêng các biến thể như `산책하다` / `산책을 하다`. Ba từ `식당`, `시장`, `아침` từng xuất hiện trong ví dụ Bài 5 nay có thẻ tra cứu riêng.

Ngữ pháp bổ sung có bảng so sánh `에` / `에서`, sơ đồ đổi giữa trật tự chủ đề trước và thời gian trước, ghi chú tiểu từ thời gian. Chủ đề/chủ ngữ và chia đuôi đã học được gom vào phần ôn có liên kết về bài cũ. Bộ ghép câu giữ phạm vi cụm từ PDF.

Kiểm tra bằng Node.js có thư viện `playwright`: `node tests/korean-lesson-5.cjs`. Có thể đặt `BROWSER_PATH` tới Chromium/Edge và `TEST_URL` tới máy chủ local; mặc định kiểm tra trực tiếp `index.html`. Ảnh kiểm tra được ghi vào `tmp/` (không đưa lên Git).

## Tiếng Hàn · Bài 6 và bộ luyện Bài 5

- **Bài 6:** đối chiếu đủ 28 trang `Bài 6.pdf`; có 20 mục phần từ vựng, 1 mục từ tiêu đề/bài đọc và 10 mục ôn tập. Học `하고`, `에 있어요`, vị trí đồ vật qua tranh tương tác, ghép câu, đọc 12 đoạn và 44 câu luyện. Giữ ảnh nguồn để đối chiếu các trang chữ bị chồng trong PDF. Các bài vẽ theo cặp và bản đồ có hướng dẫn kèm trang gốc; không có audio gốc.
- **Bài 5 → Luyện tập → Bộ bài tập DOCX:** đủ 84 câu trong 9 dạng của `Bai_tap_luyen_tap_Ngu_phap_tieng_Han.docx`. Tiểu từ chủ đề/chủ ngữ chấp nhận nhiều lựa chọn khi thiếu ngữ cảnh; câu 9 phần sửa lỗi vốn đúng được giữ nguyên. Câu tự viết chỉ đối chiếu mẫu, không chấm sai theo so khớp văn bản.
- Dữ liệu mới: `data/korean-lesson-6.js`, `data/korean-lesson-5-workbook.js`; giao diện luyện dùng chung `korean-workbook.js`. Bài làm giữ trong phiên; tiến độ hoàn thành Bài 6 lưu cục bộ cùng các bài trước.
- Chạy `node tests/korean-lesson-6.cjs` để kiểm tra dữ liệu, chức năng mới và bố cục 390/768/1440px.

## Tiếng Hàn · Bài 7

- Đối chiếu đủ 31 trang `Bài 7.pdf`: thứ trong tuần, buổi trong ngày, đích đến và lịch sinh hoạt. Có 30 mục ở bảng từ vựng gốc và 13 mục hỗ trợ từ phần đọc/luyện; không coi từ ôn tập là từ mới.
- Lịch bảy ngày tương tác tạo câu theo thời gian + nơi đến (`에 가요`) hoặc nơi hành động (`에서`); chỉ kết hợp hoạt động và địa điểm trong bài. 14 câu đọc về gia đình Noa, 5 câu giới thiệu khu phố, 5 thẻ luyện nói và 41 câu bài tập. Chữ Hàn đi kèm phiên âm, nghĩa và giọng tổng hợp, không phải audio gốc.
- Trang 13 có lựa chọn “Không thêm” cho `오늘`; trang 12 nêu rõ nghĩa “về nhà” khi sửa `집에서 가요`. Trang 25–27 luyện lịch hiện tại theo mẫu Hàn, không thêm thì quá khứ từ lời hướng dẫn tiếng Việt. Bài mở dùng mẫu đối chiếu, không tự chấm sai các cách nói khác.
- Dữ liệu: `data/korean-lesson-7.js`; giao diện: `korean-lesson-7-app.js`, `korean-lesson-7.css`; ảnh nguồn: `assets/korean/lesson-7/slides/`. Tiến độ hoàn thành lưu cục bộ; lựa chọn lịch và bài luyện chỉ giữ trong phiên.
- Kiểm tra: `node tests/korean-lesson-7.cjs` (Edge/Playwright, bố cục 390/768/1440px); chạy lại bộ Bài 5 và 6 để kiểm tra hồi quy.
