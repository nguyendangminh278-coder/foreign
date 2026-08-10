# Trợ giảng AI

Website sử dụng OpenAI Responses API qua giao diện chat trong `ai-chat.js`.

## Dùng trực tiếp trên GitHub Pages

1. Mở nút **Hỏi AI** ở góc dưới bên phải.
2. Mở **Cài đặt API**.
3. Nhập OpenAI API key cá nhân và chọn model.

Khóa chỉ được giữ trong bộ nhớ JavaScript của tab hiện tại. Khóa không được ghi vào `localStorage`, source code hoặc Git.

Chế độ trực tiếp phù hợp cho trang cá nhân. Không nên chia sẻ một API key dùng chung trong mã frontend.

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
  "model": "gpt-5.6-luna",
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

hoặc phản hồi nguyên bản của OpenAI Responses API.

Giữ `OPENAI_API_KEY` trong biến môi trường của backend. Không commit khóa vào kho GitHub.
