# 📘 PROJECT GUIDELINES — Node.js + React

> Tài liệu này định nghĩa cấu trúc, best practices, và quy trình làm việc với AI.  
> AI **phải đọc file này trước** khi thực hiện bất kỳ yêu cầu nào.

---

## 1. TECH STACK

| Layer | Công nghệ |
|---|---|
| Frontend | React 18+, React Router v6, Zustand (state), TailwindCSS |
| Backend | Node.js 20+, Express.js |
| Database | PostgreSQL + Prisma ORM (hoặc MongoDB + Mongoose — xác nhận với team) |
| Auth | JWT (access token + refresh token) |
| Testing | Vitest + React Testing Library (FE), Jest + Supertest (BE) |
| Linting | ESLint + Prettier |
| API Contract | REST (JSON) — OpenAPI 3.0 spec nếu có |

---

## 2. CẤU TRÚC THƯ MỤC

```
project-root/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/        # UI components thuần (stateless ưu tiên)
│   │   │   └── ui/            # Atomic: Button, Input, Modal...
│   │   ├── features/          # Feature-based modules
│   │   │   └── [feature]/
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── store/     # Zustand slice
│   │   │       └── api.js     # API calls cho feature này
│   │   ├── hooks/             # Shared custom hooks
│   │   ├── layouts/
│   │   ├── pages/             # Route-level components
│   │   ├── services/          # axios instance, interceptors
│   │   ├── store/             # Global Zustand store
│   │   ├── utils/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── src/
│   │   ├── config/            # env, db, cors config
│   │   ├── controllers/       # Request handlers (gọi service, trả response)
│   │   ├── middleware/        # auth, validation, error handler
│   │   ├── models/            # Prisma schema hoặc Mongoose models
│   │   ├── routes/            # Route definitions
│   │   ├── services/          # Business logic (tách khỏi controller)
│   │   ├── utils/             # helpers, constants
│   │   └── app.js             # Express app setup
│   ├── prisma/                # (nếu dùng Prisma)
│   │   └── schema.prisma
│   ├── tests/
│   └── package.json
│
├── .env.example
├── .gitignore
└── README.md
```

---

## 3. BACKEND BEST PRACTICES (Node.js / Express)

### 3.1 Kiến trúc Layered

```
Route → Controller → Service → Model/DB
```

- **Controller**: Chỉ xử lý HTTP (parse request, gọi service, trả response). Không chứa business logic.
- **Service**: Toàn bộ business logic. Có thể test độc lập, không biết gì về HTTP.
- **Model**: Tương tác DB. Không chứa business logic.

### 3.2 Error Handling

- Dùng `async/await` + `try/catch` hoặc wrapper `asyncHandler`.
- Tập trung xử lý lỗi tại **một middleware duy nhất** (`errorHandler.js`).
- Chuẩn hóa response lỗi:

```json
{
  "success": false,
  "message": "Mô tả lỗi",
  "code": "ERROR_CODE",
  "details": {}
}
```

- Phân loại lỗi: `ValidationError`, `AuthError`, `NotFoundError`, `ConflictError`.

### 3.3 Response Chuẩn

```json
{
  "success": true,
  "data": {},
  "message": "OK",
  "meta": { "page": 1, "total": 100 }
}
```

### 3.4 Validation

- Validate **tại route/middleware** trước khi vào controller (dùng `zod` hoặc `joi`).
- Không tin bất kỳ input nào từ client.

### 3.5 Security

- Dùng `helmet` cho HTTP headers.
- Rate limiting với `express-rate-limit`.
- CORS chặt chẽ (whitelist domain).
- Không log thông tin nhạy cảm (password, token).
- `.env` cho tất cả secrets. **Không hardcode.**

### 3.6 Conventions

- Tên file: `camelCase.js` hoặc `kebab-case.js` — chọn một, nhất quán.
- Tên route: RESTful, số nhiều, lowercase: `/api/users`, `/api/products/:id`.
- HTTP methods đúng ngữ nghĩa: GET/POST/PUT/PATCH/DELETE.
- Trả đúng HTTP status code.

---

## 4. FRONTEND BEST PRACTICES (React)

### 4.1 Component Rules

- **Ưu tiên functional component + hooks**.
- Component nhỏ, đơn trách nhiệm (Single Responsibility).
- Tách UI component (stateless, tái sử dụng) khỏi Feature component (có state/logic).
- Tên component: `PascalCase`. Tên file: `ComponentName.jsx`.

### 4.2 State Management

| Loại state | Nơi lưu |
|---|---|
| Server state (data từ API) | React Query / SWR |
| UI state cục bộ | `useState` / `useReducer` |
| Global client state | Zustand |
| Form state | React Hook Form |

- **Không** lưu dữ liệu API vào Zustand nếu đã dùng React Query.

### 4.3 API Calls

- Tập trung tất cả calls vào `services/` hoặc `features/[name]/api.js`.
- Dùng axios instance với base URL và interceptor (auto attach token, handle 401).
- Component **không gọi axios trực tiếp** — luôn qua custom hook hoặc React Query.

### 4.4 Performance

- `React.memo` chỉ khi có vấn đề render thực sự đo được.
- `useMemo` / `useCallback` có chủ đích, không dùng tràn lan.
- Lazy load route-level components với `React.lazy`.
- Image: dùng đúng kích thước, lazy load.

### 4.5 Styling

- TailwindCSS — utility-first.
- Tránh inline style trừ dynamic value.
- Dùng `cn()` (clsx + tailwind-merge) để combine class có điều kiện.

### 4.6 Conventions

- Tên biến/hàm: `camelCase`. Tên constant: `UPPER_SNAKE_CASE`.
- Custom hook bắt đầu bằng `use`: `useAuth`, `useProducts`.
- Không commit code có `console.log` debug.

---

## 5. DATABASE BEST PRACTICES

- **Không bao giờ** xây raw query ghép string (SQL injection).
- Dùng transaction khi có nhiều write operations liên quan.
- Index các field thường xuyên query/filter/sort.
- Pagination bắt buộc cho list endpoints (default limit: 20, max: 100).
- Không expose primary key integer ra ngoài nếu có thể — dùng UUID.
- Soft delete (`deletedAt`) thay vì xóa cứng nếu cần audit trail.

---

## 6. GIT & WORKFLOW

### Branch naming
```
feature/[ticket-id]-[mo-ta-ngan]
bugfix/[ticket-id]-[mo-ta-ngan]
hotfix/[mo-ta-ngan]
```

### Commit message (Conventional Commits)
```
feat: thêm chức năng đăng nhập
fix: sửa lỗi validate email
refactor: tách service xử lý đơn hàng
chore: cập nhật dependencies
```

### Pull Request
- PR nhỏ, tập trung vào một việc.
- Mô tả rõ: làm gì, tại sao, cách test.
- Không merge khi CI fail.

---

## 7. ENVIRONMENT

```bash
# .env.example — commit file này, KHÔNG commit .env thật
NODE_ENV=development
PORT=3000

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# JWT
JWT_SECRET=your-secret-here
JWT_EXPIRES_IN=15m
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=7d

# Client URL (CORS)
CLIENT_URL=http://localhost:5173
```

---

## 8. QUY TRÌNH LÀM VIỆC VỚI AI ← ĐỌC KỸ

> Mục tiêu: **Tiết kiệm token, tránh làm lại, code đúng ngay lần đầu.**

### 8.1 AI phải làm gì TRƯỚC khi code

Với **mọi yêu cầu**, AI phải xuất ra **PLAN** theo format sau và **CHỜ xác nhận** trước khi viết code:

```
## 📋 PLAN: [Tên yêu cầu]

### Hiểu yêu cầu
[Diễn giải lại yêu cầu bằng lời của AI để xác nhận hiểu đúng]

### Phạm vi thay đổi
**Files sẽ tạo mới:**
- path/to/file.js — [mục đích]

**Files sẽ chỉnh sửa:**
- path/to/file.js — [thay đổi gì]

**Files KHÔNG thay đổi:**
- [liệt kê nếu cần làm rõ]

### Approach
[Mô tả ngắn gọn hướng giải quyết, pattern sẽ dùng]

### Câu hỏi / Assumption
- [Nếu có điểm chưa rõ, hỏi ở đây TRƯỚC khi code]
- [Nếu tự assume điều gì, nêu rõ ở đây]

### Ước tính
- Độ phức tạp: Thấp / Trung / Cao
- Rủi ro breaking change: Có / Không

---
✅ Xác nhận plan này để tôi bắt đầu code?
```

### 8.2 Người dùng phản hồi plan

- **"OK"** hoặc **"Tiến hành"** → AI bắt đầu implement.
- **Có chỉnh sửa** → AI cập nhật plan, hỏi lại.
- **Không có plan** → Người dùng yêu cầu lại.

### 8.3 Trong quá trình implement

- Mỗi file được tạo/sửa: xuất ra **đầy đủ nội dung file** (không dùng `// ... rest of code`).
- Nếu file dài (>150 dòng): chia thành các bước rõ ràng.
- Khi xong: liệt kê **checklist kiểm tra** để người dùng verify.

### 8.4 Format câu hỏi hiệu quả cho AI

Khi đặt yêu cầu, cung cấp:

```
**Yêu cầu:** [Mô tả ngắn gọn, rõ ràng]
**Context:** [File liên quan, feature đang làm]
**Input/Output mong đợi:** [Nếu là API/function]
**Ràng buộc:** [Không được thay đổi X, phải dùng Y]
```

### 8.5 Những việc AI KHÔNG được tự làm

- ❌ Thay đổi file ngoài phạm vi đã thống nhất trong plan.
- ❌ Tự chọn library mới mà không đề xuất trong plan.
- ❌ Xóa code hiện có mà không nêu trong plan.
- ❌ Viết code khi còn câu hỏi chưa được trả lời.
- ❌ Bỏ qua validation và error handling.
- ❌ Hardcode values nên là config/env.

---

## 9. CHECKLIST TRƯỚC KHI HOÀN THÀNH

```
□ Code tuân thủ cấu trúc thư mục đã định nghĩa
□ Không có business logic trong controller
□ Tất cả input được validate
□ Error được handle, có message rõ ràng
□ Không có console.log debug
□ Không có secret/credential hardcode
□ API trả đúng HTTP status code
□ Component React có PropTypes hoặc TypeScript types
□ Custom hook đặt tên đúng quy ước (use...)
□ Không có unused import/variable
```

---

## 10. ĐỐI CHIẾU NHANH (Quick Reference)

| Tình huống | Action |
|---|---|
| Thêm API endpoint mới | Route → Controller → Service → (Model nếu cần) |
| Thêm tính năng FE | Tạo feature folder → component → hook → api.js |
| Lỗi 401 | Kiểm tra JWT middleware và interceptor |
| State phức tạp | Zustand slice trong feature/store/ |
| Form | React Hook Form + zod schema |
| Gọi API trong component | Custom hook hoặc React Query, không gọi axios trực tiếp |
| Cần biến môi trường | Thêm vào .env.example, document rõ |

---

*Cập nhật lần cuối: xem git log*  
*Mọi thay đổi về conventions phải được team đồng thuận và cập nhật vào file này.*
