# Web Bán Giày

## Giới thiệu
Đây là dự án web bán giày trực tuyến, hỗ trợ quản lý từ người dùng, khách hàng, nhân viên, thương hiệu, sản phẩm, đơn hàng đến hệ thống hỗ trợ khách hàng và giỏ hàng. Hệ thống được thiết kế với khả năng mở rộng, quản lý dễ dàng và trải nghiệm người dùng thân thiện.

---

## Tính năng chính

### 1. Quản lý Người dùng (USERS)
- Đăng ký tài khoản (customer, employee, admin)
- Đăng nhập và xác thực người dùng
- Lưu mật khẩu an toàn (hashing)
- Phân quyền theo vai trò: `admin`, `employee`, `customer`

### 2. Quản lý Khách hàng (CUSTOMERS)
- Tạo hồ sơ khách hàng khi đăng ký
- Lưu thông tin cá nhân: tên, địa chỉ, số điện thoại
- Theo dõi ngày đăng ký
- Khách hàng có thể:
  - Mua hàng
  - Nhắn tin cho nhân viên hỗ trợ
  - Viết đánh giá sản phẩm
  - Quản lý giỏ hàng

### 3. Quản lý Nhân viên (EMPLOYEES)
- Lưu hồ sơ nhân viên: tên, vị trí, số điện thoại
- Theo dõi ngày tuyển dụng
- Nhân viên xử lý hội thoại hỗ trợ khách hàng

### 4. Quản lý Thương hiệu (BRANDS)
- Tạo và quản lý danh sách hãng giày
- Lưu website và quốc gia của thương hiệu

### 5. Quản lý Danh mục sản phẩm (CATEGORIES)
- Tạo và quản lý phân loại sản phẩm
- Ví dụ: Running, Basketball, Casual, Boots…

### 6. Quản lý Sản phẩm (PRODUCTS)
- Lưu thông tin giày: tên, mô tả, giá, màu sắc, chất liệu
- Gắn sản phẩm vào Brand và Category
- Trạng thái `active` / `inactive`
- Theo dõi ngày thêm sản phẩm

### 7. Quản lý Tồn kho (INVENTORY)
- Lưu tồn kho theo từng size
- Theo dõi số lượng còn lại
- Cập nhật khi bán hàng hoặc nhập hàng

### 8. Quản lý Đơn hàng (ORDERS)
- Tạo đơn hàng từ khách hàng
- Tính tổng tiền, thuế, giảm giá
- Lưu hình thức thanh toán và trạng thái đơn hàng
- Áp dụng coupon nếu có

### 9. Quản lý Chi tiết đơn hàng (ORDER_ITEMS)
- Mỗi đơn hàng có thể chứa nhiều sản phẩm
- Lưu size, số lượng, giá từng sản phẩm

### 10. Mã giảm giá (COUPONS)
- Tạo coupon theo phần trăm (%) hoặc số tiền
- Giới hạn số lần sử dụng
- Thiết lập thời hạn áp dụng
- Trạng thái kích hoạt/không kích hoạt
- Có thể áp dụng cho nhiều đơn hàng

### 11. Áp mã giảm giá cho đơn hàng (ORDER_COUPONS)
- Một đơn hàng có thể sử dụng coupon
- Lưu lại số tiền giảm thực tế trên đơn hàng

### 12. Đánh giá sản phẩm (PRODUCT_REVIEWS)
- Khách hàng có thể:
  - Đánh giá từ 1–5 sao
  - Viết nhận xét chi tiết
- Sản phẩm có thể có nhiều review để hiển thị gợi ý/xếp hạng

### 13. Giỏ hàng (SHOPPING_CART)
- Mỗi khách hàng có một giỏ hàng riêng
- Lưu thời gian tạo và cập nhật giỏ hàng

### 14. Mục trong giỏ hàng (CART_ITEMS)
- Lưu sản phẩm, size, số lượng mà khách đã thêm
- Dùng để tạo đơn hàng

### 15. Hỗ trợ khách hàng (CONVERSATIONS & MESSAGES)
**CONVERSATIONS**
- Khách hàng mở hội thoại với nhân viên
- Nhân viên có thể “handle” cuộc chat
- Trạng thái: `open` / `closed`

**MESSAGES**
- Chat theo thời gian thực
- Gửi text hoặc hình ảnh
- Theo dõi người gửi: customer hoặc employee

---

## Công nghệ sử dụng
- **Frontend:** ReactJS, Vite, Tailwind CSS (hoặc Chakra/UI, Lucide Icons)
- **Backend:** Laravel 
- **Cơ sở dữ liệu:** MySQL
- **Realtime Chat:** WebSocket / Pusher
- **Authentication & Authorization:** JWT / Laravel Sanctum
- **Version Control:** Git & GitHub

---

## Cấu trúc cơ sở dữ liệu (tóm tắt)
- `users`, `customers`, `employees`
- `brands`, `categories`, `products`, `inventory`
- `orders`, `order_items`, `coupons`, `order_coupons`
- `shopping_cart`, `cart_items`
- `conversations`, `messages`, `product_reviews`

---

## Hướng dẫn cài đặt
1. Clone dự án:
```bash
git clone https://github.com/qtuan26/happy_shop.git
cd happy-shop

2. Cài đặt dependencies frontend:
cd frontend
npm install
npm run dev

3. Cài đặt backend:


