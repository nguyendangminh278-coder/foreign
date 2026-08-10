# Trợ giảng AI miễn phí với Gemini Flash

Website sử dụng Gemini Interactions API qua giao diện chat trong `ai-chat.js`. Model mặc định là `gemini-3.6-flash`, thuộc free tier của Gemini Developer API tại thời điểm cấu hình.

## Dùng trực tiếp trên GitHub Pages

1. Truy cập [Google AI Studio](https://aistudio.google.com/apikey) và tạo Gemini API key miễn phí.
2. Mở nút **Hỏi AI** ở góc dưới bên phải website.
3. Mở **Cài đặt API**, nhập khóa và giữ model mặc định **Gemini 3.6 Flash**.

Khóa chỉ được giữ trong bộ nhớ JavaScript của tab hiện tại. Khóa không được ghi vào `localStorage`, source code hoặc Git.

Free tier có giới hạn tốc độ/lượt dùng và dữ liệu gửi qua free tier có thể được Google dùng để cải thiện sản phẩm. Không gửi nội dung nhạy cảm. Có thể giới hạn API key theo website trong Google Cloud Console để giảm rủi ro lạm dụng.

## Dùng backend proxy

Với website công khai cho nhiều người, thiết lập endpoint trước khi nạp `ai-chat.js`:

```html
<script>
  window.FOREIGN_AI_ENDPOINT = "https://your-domain.example/api/chat";
</script>
```

Endpoint nhận yêu cầu `POST` JSON:

```json
{
  "model": "gemini-3.6-flash",
  "language": "ko",
  "messages": [{ "role": "user", "content": "..." }],
  "context": "...",
  "instructions": "..."
}
```

Endpoint trả về một trong hai định dạng:

```json
{ "text": "Câu trả lời" }
```

hoặc phản hồi nguyên bản của Gemini Interactions API.

Giữ `GEMINI_API_KEY` trong biến môi trường của backend. Không commit khóa vào kho GitHub.
