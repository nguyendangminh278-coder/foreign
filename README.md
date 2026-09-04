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

Kiểm tra bằng Node.js có thư viện `playwright`: `node tests/korean-lesson-5.cjs`. Có thể đặt `BROWSER_PATH` tới Chromium/Edge và `TEST_URL` tới máy chủ local; mặc định kiểm tra trực tiếp `index.html`. Ảnh kiểm tra được ghi vào `tmp/` (không đưa lên Git).
