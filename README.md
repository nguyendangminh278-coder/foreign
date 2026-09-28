# Foreign Language Study Notebook

## Ghi chú từ vựng & quá khứ theo chủ đề

- Mục Tiếng Hàn → Từ vựng có danh sách ôn 49 từ theo 10 chủ đề (không phải toàn bộ kho từ). Đối chiếu các bài 1–12 cho thấy 48 mục đã xuất hiện dưới dạng từ/cụm tương ứng, 1 mục mới là `등산하다`. Mỗi mục có phiên âm, nghĩa, liên kết bài cũ và Naver; các biến thể `수영하다`/`수영을 하다`, `공부하다`/`공부를 하다` được gộp khi tra cứu.
- Bài 9 → Ngữ pháp dùng chung bảng chia quá khứ: 20 dạng gốc + 28 dạng bổ sung, không lặp `타다`, `달리다`. Bộ lọc gồm 하다, ㄷ bất quy tắc, giữ ㅅ, thân có phụ âm cuối, thân nguyên âm. 30 từ trong ghi chú có nút mở đúng dạng chia từ danh sách chủ đề.
- `하였어요 → 했어요` là rút gọn, đã có trong Bài 9; `필요하다` là tính từ chỉ trạng thái. `만들다`, `씻다`, `입다` không thuộc nhóm thân nguyên âm. `걷다` đổi ㄷ nhưng `받다` giữ ㄷ; `벗다`, `웃다`, `씻다` giữ ㅅ.
- Nội dung Bài 1 cũ vẫn nằm trong phần mở rộng ngay dưới danh sách chủ đề. Các bài gốc không bị tăng số từ PDF hoặc thêm mục trùng. Dữ liệu bổ sung: `data/korean-topic-supplement.js`; giao diện: `korean-topic-supplement-app.js` / `.css`. Kiểm tra `node tests/korean-topic-supplement.cjs` và hồi quy Bài 5, 9, 12.

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

## Tiếng Hàn · Bài 8

- Nguồn `Bài 8.pdf`, đủ 36 trang. Có 41 mục bảng từ gốc (12 tháng, 12 giờ, 5 mốc phút, 12 từ khác) và 23 mục hỗ trợ từ ghi chú/bài đọc/bài luyện. Từ cũ giữ nhãn ôn; phiên âm, nghĩa và nút nghe đi cùng nội dung học.
- Ngữ pháp `안`, `-(으)ㄹ 거예요`, người nhận với `한테`; bảng đổi 16 động từ; đồng hồ SVG chỉnh giờ/phút/AM-PM, đọc rưỡi; bộ đọc ngày tháng có kiểm tra số ngày hợp lệ và lưu ý 29/2.
- Ba đoạn đọc gồm 15 câu về Noa, Youngjun và Yuna kể sinh nhật cún Coco; bộ lập kế hoạch tiệc sinh nhật dùng từ trong tài liệu. Không có audio gốc, không tạo lịch hẹn hay gửi lời mời; bộ ghép chỉ giữ trong phiên.
- 67 câu tương tác thuộc 11 dạng. Trang 17 câu 9 được sửa khung thành `친구와 같이 춤을 ___` và giải thích rõ, không bắt dùng mỗi từ đúng một lần. Trang 25 chỉ có ngày/tháng, không thêm năm sinh. Câu tự viết dùng mẫu đối chiếu; các cách phủ định hợp lệ có/không có tiểu từ được chấp nhận.
- Dữ liệu: `data/korean-lesson-8.js`; giao diện: `korean-lesson-8-app.js`, `korean-lesson-8.css`; ảnh: `assets/korean/lesson-8/slides/`. Test: `node tests/korean-lesson-8.cjs`, có thể đặt `TEST_URL` để chạy trên GitHub Pages sau triển khai.

## Tiếng Hàn · Bài 9

- Đối chiếu đủ 27 trang `Bài 9.pdf`: động vật, địa điểm, hoạt động, `하고 같이` và quá khứ `-았/었/였어요`. Có 30 mục bảng từ gốc và 9 mục hỗ trợ từ chính PDF; không tính tất cả là từ mới. Phiên âm, nghĩa và nút nghe đi cùng từ/câu học.
- Bảng đổi 20 động từ/tính từ, bản đồ chọn 6 con vật theo số nguồn, bộ kể chuyến đi với 3 người đồng hành và 6 địa điểm. Chọn hoạt động ở vườn thú là luyện nói tự do, không chấm rằng mọi địa điểm đều cho phép hoạt động đó.
- 15 câu đọc về Thomas; 56 câu luyện thuộc 10 dạng (gồm ví dụ số 1 trong bài ghép con vật). Chọn đáp án/chia từ có chấm, ghép câu/tự viết đối chiếu mẫu. Bài Yuna có 6 chỗ trống sau câu ví dụ.
- Sửa `거복이` thành `거북이` (rùa), `도착하다` thành “đến nơi”, giải thích `했어요` là rút gọn. Trang 17 đổi `동물이` thành `동물한테` để đúng nghĩa “cho động vật ăn”. Bài đọc giữ `오늘` theo góc nhìn lời kể và ghi chú khác với lời dẫn kỳ nghỉ hè trước. Giữ toàn bộ ảnh gốc.
- Dữ liệu: `data/korean-lesson-9.js`; giao diện: `korean-lesson-9-app.js`, `korean-lesson-9.css`; ảnh: `assets/korean/lesson-9/slides/`. Không có audio gốc; nghe bằng giọng tổng hợp. Tiến độ lưu cục bộ, câu tự viết chỉ giữ trong phiên.
- Kiểm tra: `node tests/korean-lesson-9.cjs`; hỗ trợ `TEST_URL` để kiểm tra bản GitHub Pages, và chạy lại các bộ Bài 5–8. Tiến độ toàn khóa cập nhật thành 13 mô-đun (bảng chữ cái và Bài 1–9).

## Tiếng Hàn · Bài 10

- Đối chiếu đủ 29 trang `Bài 10.pdf`: bốn mùa, thời tiết, bất quy tắc ㅂ, dạng tiếp diễn 고 있어요. Có 30 mục bảng từ gốc và 23 mục hỗ trợ ngữ pháp/hội thoại/văn hóa trong chính PDF; không coi tất cả là từ mới. Mỗi mục có phiên âm, nghĩa và nghe bằng giọng tổng hợp.
- Bảng so sánh 9 từ bất quy tắc / 4 từ giữ nguyên ㅂ, 8 động từ tiếp diễn; bộ chọn bốn mùa; 24 tổ hợp thành phố/thời tiết giả định, không phải dự báo trực tiếp. Góc vẽ bằng chuột/cảm ứng và viết đoạn giới thiệu có lựa chọn mô tả bằng chữ thay thế.
- 10 lượt thoại Yuna–Ella, 57 câu thuộc 13 dạng, bao gồm hoạt động/món ăn theo mùa. Trang 14 nhận cả 피어요 / 펴요 và các cách hiện tại/tiếp diễn hợp ngữ cảnh. Trang 12 yêu cầu riêng 고 있어요; 걷다 giữ ㄷ trước 고.
- Trang 19 không kèm audio cho Steve/Nicole nên không bịa đáp án; Suji → New York là ví dụ nguồn. Không dùng audio tiếng Trung trùng số bài. Trang 23 phân biệt kỳ nghỉ đông của Yuna với Giáng sinh mùa hè ở Úc của Ella. Ảnh nguồn giữ nguyên, phần chữ chồng được trình bày lại.
- Dữ liệu `data/korean-lesson-10.js`, giao diện `korean-lesson-10-app.js` / `korean-lesson-10.css`, ảnh `assets/korean/lesson-10/slides/`. Bài làm, tranh và đoạn viết giữ trong phiên; tiến độ hoàn thành lưu cục bộ (14 mô-đun toàn khóa).
- Kiểm tra `node tests/korean-lesson-10.cjs`, hỗ trợ `TEST_URL`. Kiểm tra lại các bài cũ và favicon khi triển khai. Đối chiếu dạng rút gọn với [한국어기초사전: 피다](https://krdict.korean.go.kr/jpn/dicSearch/SearchView?ParaWordNo=73270); phạm vi bất quy tắc với [국립국어원](https://korean.go.kr/front/mcfaq/mcfaqView.do?mcfaq_seq=8733&mn_id=&pageIndex=31).

## Tiếng Hàn · Bài 11

- Đủ 29 trang `Bài 11.pdf`: hoạt động sau giờ học và cách nói thân mật 반말. Có 18 mục bảng từ gốc + 12 mục hỗ trợ, 18 cặp lịch sự/thân mật, 10 lượt hội thoại Daniel–Minji và 58 câu luyện (55 câu theo PDF + 3 câu ngữ cảnh bổ trợ). Mỗi mục/câu có phiên âm và nghĩa; nghe bằng giọng tổng hợp.
- Chọn hoạt động tạo câu ở hai mức lịch sự, phỏng vấn hai nhân vật mẫu về sở thích/thế mạnh, bảng bình chọn cục bộ 0–99 phiếu có đồng hạng và trạng thái chưa có phiếu, ba thẻ trò “Gương ơi gương ơi”. Bài làm và lựa chọn giữ trong phiên; tiến độ hoàn thành lưu cục bộ (15 mô-đun).
- Ghi chú sửa `평사` → `평서`; hỏi sinh nhật bạn dùng `너는` thay `나는`. Mẫu bạn thân dùng `나는` thay `저는`, không kết luận mọi kết hợp 저 + thân mật đều sai. Danh từ đổi 이에요/예요 → 이야/야, 거예요 → 거야, không chỉ bỏ 요. Trang 23 dùng 켜다 cho violin nhất quán với bảng từ.
- Trang 17 thiếu audio/transcript ghép tên: không tạo đáp án đoán và không dùng nhầm audio tiếng Trung. Đọc hiểu phân biệt việc hôm qua, việc hiện tại và kế hoạch tương lai; Minji làm bài tập là dự định được nhắc, không khẳng định đã làm hôm qua. Giữ ảnh gốc để đối chiếu các trang bị chồng chữ.
- Dữ liệu `data/korean-lesson-11.js`; giao diện `korean-lesson-11-app.js` / `korean-lesson-11.css`; ảnh `assets/korean/lesson-11/slides/`; test `node tests/korean-lesson-11.cjs` hỗ trợ `TEST_URL`. Đối chiếu cách đổi 거예요/거야 với [국립국어원](https://www.korean.go.kr/front/onlineQna/onlineQnaView.do?mn_id=27&pageIndex=1&qna_seq=332792&searchCondition=&searchKeyword=).

## Tiếng Hàn · Bài 12

- Đủ 35 trang `Bài 12.pdf`, 29 mục bảng từ gốc + 15 mục hỗ trợ, 13 cặp chia lời đề nghị/mong muốn, 13 lượt hội thoại Minji và 61 câu luyện thuộc 10 dạng. Không coi toàn bộ mục từ là từ mới. Từ/câu học có phiên âm, nghĩa và nghe tổng hợp.
- Thực đơn 8 món đúng số thứ tự/giá trong PDF; ngân sách $20, số phần 0–9, cảnh báo vượt ngân sách và đầu vào không hợp lệ. Không đặt hàng/thanh toán thật, giá không phải giá hiện tại. Các biến thể món của Minji không có giá trong nguồn nên không gán giá tự suy đoán.
- Chọn món đã thử/có vẻ cay, năm cặp mong muốn–gợi ý, tám thẻ nhập vai có thể xếp lại và đổi món, chọn loại tteokbokki và sáu nguyên liệu. Trải nghiệm cá nhân không chấm cứng. Bài làm/lựa chọn giữ trong phiên, hoàn thành bài lưu cục bộ; toàn khóa 16 mô-đun.
- Bổ sung `듣다 → 들으세요` và `만들다 → 만드세요`, nhưng giữ `듣고 / 만들고 싶어요`. Trang 19 thiếu audio Youngjun: chỉ giữ ví dụ số 1, không đoán các thành viên còn lại. Trang 30 thiếu thẻ rời: bộ tám lượt là mẫu biên soạn từ câu trong bài, có ghi nhãn. Không dùng audio khóa tiếng Trung.
- Ảnh nguồn giữ nguyên. Phần loại tteokbokki có bảng tên/ảnh đối chiếu, không chấm nhận diện chắc chắn từ màu ảnh nhỏ. Ghi đầy đủ `친구의 제안` cho nhãn ngắn `친구 제안` của nguồn.
- Dữ liệu `data/korean-lesson-12.js`; giao diện `korean-lesson-12-app.js` / `korean-lesson-12.css`; ảnh `assets/korean/lesson-12/slides/`. Kiểm tra `node tests/korean-lesson-12.cjs` (hỗ trợ `TEST_URL`). Tham chiếu ngữ pháp: [한국어기초사전 · 싶다](https://krdict.korean.go.kr/eng/dicSearch/SearchView?ParaWordNo=62657).
