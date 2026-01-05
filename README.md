🛒 HappyShop - E-commerce Platform
Dự án website bán giày thể thao với đầy đủ tính năng giỏ hàng, thanh toán, quản lý đơn hàng và chat hỗ trợ.

Show Image
Show Image
Show Image
Show Image

📋 Mục lục
Công nghệ sử dụng
Yêu cầu hệ thống
Cài đặt Backend
Cài đặt Frontend
Cấu trúc dự án
API Endpoints
Tính năng
Tài khoản mẫu
Troubleshooting
Screenshots
🚀 Công nghệ sử dụng
Backend
Laravel 9+ - PHP Framework
MySQL 5.7+ - Relational Database
Laravel Sanctum - API Authentication
Cloudinary - Cloud Image Storage
Frontend
React 18+ - JavaScript Library
React Router v6 - Client-side Routing
Axios - HTTP Client
Tailwind CSS - Utility-first CSS Framework
Lucide React - Beautiful Icon Library
💻 Yêu cầu hệ thống
Backend Requirements
PHP >= 8.0
Composer
MySQL >= 5.7
Node.js >= 14.x
Frontend Requirements
Node.js >= 14.x
npm hoặc yarn
🔧 Cài đặt Backend (Laravel)
Bước 1: Clone repository
bash
git clone https://github.com/your-username/happyshop.git
cd happyshop/backend
Bước 2: Cài đặt dependencies
bash
composer install
Bước 3: Cấu hình Environment
Tạo file .env từ template:

bash
cp .env.example .env
Cập nhật các thông số trong .env:

env
APP_NAME=HappyShop
APP_ENV=local
APP_KEY=
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_LEVEL=debug

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shoeshop_db
DB_USERNAME=root
DB_PASSWORD=

# Session
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Cloudinary (Optional - for image upload)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Sanctum
SANCTUM_STATEFUL_DOMAINS=localhost:5173,127.0.0.1:5173
SESSION_DOMAIN=localhost
Bước 4: Tạo Database
bash
# Truy cập MySQL
mysql -u root -p

# Tạo database
CREATE DATABASE shoeshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
Bước 5: Generate Application Key
bash
php artisan key:generate
Bước 6: Chạy Migrations
bash
php artisan migrate
Bước 7: Seed Database (Dữ liệu mẫu)
bash
# Chạy tất cả seeders
php artisan db:seed

# Hoặc chạy từng seeder
php artisan db:seed --class=UserSeeder
php artisan db:seed --class=CategorySeeder
php artisan db:seed --class=BrandSeeder
php artisan db:seed --class=ProductSeeder
php artisan db:seed --class=CouponSeeder
Bước 8: Tạo Storage Link (Optional)
bash
php artisan storage:link
Bước 9: Khởi động Server
bash
php artisan serve
✅ Backend đang chạy tại: http://127.0.0.1:8000

⚛️ Cài đặt Frontend (React)
Bước 1: Di chuyển vào thư mục frontend
bash
cd frontend
Bước 2: Cài đặt dependencies
bash
npm install
# hoặc
yarn install
Bước 3: Cấu hình Environment
Tạo file .env trong thư mục frontend:

env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_BACKEND_URL=http://127.0.0.1:8000
Bước 4: Khởi động Development Server
bash
npm run dev
# hoặc
yarn dev
✅ Frontend đang chạy tại: http://localhost:5173

📁 Cấu trúc dự án
happyshop/
│
├── backend/                      # Laravel Backend
│   ├── app/
│   │   ├── Http/
│   │   │   ├── Controllers/     # API Controllers
│   │   │   │   ├── Admin/       # Admin Controllers
│   │   │   │   └── ...
│   │   │   └── Middleware/      # Custom Middleware
│   │   └── Models/              # Eloquent Models
│   ├── database/
│   │   ├── migrations/          # Database Migrations
│   │   └── seeders/             # Database Seeders
│   ├── routes/
│   │   └── api.php             # API Routes
│   ├── .env.example            # Environment Template
│   └── composer.json
│
└── frontend/                     # React Frontend
    ├── src/
    │   ├── components/
    │   │   ├── admin/           # Admin Dashboard Components
    │   │   ├── auth/            # Login/Register Components
    │   │   ├── chat/            # Chat Components
    │   │   ├── layouts/         # Layout Components (Header, Footer)
    │   │   ├── pages/           # Page Components
    │   │   └── products/        # Product Components
    │   ├── routes/
    │   │   └── index.jsx        # Route Definitions
    │   ├── service/
    │   │   ├── api.js           # API Service Layer
    │   │   └── axiosConfig.js   # Axios Configuration
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env                     # Environment Variables
    ├── package.json
    └── vite.config.js
🌐 API Endpoints
🔐 Authentication
Method	Endpoint	Description	Auth
POST	/api/register	Đăng ký tài khoản	❌
POST	/api/login	Đăng nhập	❌
POST	/api/logout	Đăng xuất	✅
GET	/api/me	Thông tin user hiện tại	✅
🛍️ Products (Public)
Method	Endpoint	Description	Auth
GET	/api/categories	Danh sách danh mục	❌
GET	/api/categories/{id}/products	Sản phẩm theo danh mục	❌
GET	/api/products/{id}	Chi tiết sản phẩm	❌
GET	/api/products/search	Tìm kiếm sản phẩm	❌
GET	/api/products/top-selling	Sản phẩm bán chạy	❌
🛒 Cart & Orders
Method	Endpoint	Description	Auth
GET	/api/cart	Xem giỏ hàng	✅
POST	/api/cart/add	Thêm vào giỏ	✅
PUT	/api/cart/item/{id}	Cập nhật số lượng	✅
DELETE	/api/cart/item/{id}	Xóa khỏi giỏ	✅
POST	/api/cart/apply-coupon	Áp dụng mã giảm giá	✅
POST	/api/cart/checkout	Thanh toán	✅
GET	/api/orders	Danh sách đơn hàng	✅
GET	/api/orders/{id}	Chi tiết đơn hàng	✅
POST	/api/orders/{id}/cancel	Hủy đơn hàng	✅
💬 Chat Support
Method	Endpoint	Description	Auth
GET	/api/chat/conversation	Lấy/tạo conversation	✅
POST	/api/chat/send	Gửi tin nhắn	✅
GET	/api/chat/{id}/messages	Lấy tin nhắn mới	✅
👨‍💼 Admin Routes
Method	Endpoint	Description	Auth
GET	/api/admin/customers	Quản lý khách hàng	✅ Admin
GET	/api/admin/orders	Quản lý đơn hàng	✅ Admin
PUT	/api/admin/orders/{id}/status	Cập nhật trạng thái đơn	✅ Admin
GET	/api/admin/chat/conversations	Danh sách chat	✅ Admin
POST	/api/admin/chat/send	Gửi tin nhắn admin	✅ Admin
✨ Tính năng
👤 Khách hàng
✅ Đăng ký / Đăng nhập
✅ Xem sản phẩm theo danh mục
✅ Tìm kiếm và lọc sản phẩm
✅ Thêm vào giỏ hàng
✅ Áp dụng mã giảm giá
✅ Đặt hàng (COD, MoMo)
✅ Xem danh sách đơn hàng
✅ Hủy đơn hàng (chờ xác nhận)
✅ Chat với admin hỗ trợ
✅ Đánh giá sản phẩm
✅ Cập nhật thông tin tài khoản
👨‍💼 Admin
✅ Dashboard thống kê
✅ Quản lý sản phẩm (CRUD)
✅ Quản lý đơn hàng
✅ Cập nhật trạng thái đơn hàng
✅ Quản lý khách hàng
✅ Quản lý mã giảm giá
✅ Chat hỗ trợ khách hàng real-time
🔐 Tài khoản mẫu
Sau khi chạy seeder, bạn có thể đăng nhập với các tài khoản sau:

Admin Account
Email: admin@happyshop.com
Password: admin123
Customer Account
Email: customer@happyshop.com
Password: customer123
🛠️ Troubleshooting
❌ Lỗi CORS
Triệu chứng: Frontend không thể gọi API, lỗi CORS trong console

Giải pháp:

Kiểm tra file config/cors.php:
php
'paths' => ['api/*'],
'allowed_origins' => ['http://localhost:5173'],
'allowed_methods' => ['*'],
'allowed_headers' => ['*'],
'supports_credentials' => true,
Kiểm tra .env:
env
SANCTUM_STATEFUL_DOMAINS=localhost:5173
SESSION_DOMAIN=localhost
Clear cache:
bash
php artisan config:clear
php artisan cache:clear
❌ Lỗi 401 Unauthorized
Triệu chứng: API trả về 401 khi gọi endpoint cần authentication

Giải pháp:

Kiểm tra token trong sessionStorage:
javascript
console.log(sessionStorage.getItem('token'));
Kiểm tra header trong request:
javascript
Authorization: Bearer {token}
Kiểm tra middleware trong route:
php
Route::middleware('auth:sanctum')->group(function () {
    // routes...
});
❌ Database Connection Failed
Triệu chứng: Không thể kết nối database

Giải pháp:

Kiểm tra MySQL đang chạy:
bash
mysql -u root -p
Kiểm tra thông tin trong .env:
env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shoeshop_db
DB_USERNAME=root
DB_PASSWORD=
Tạo lại database:
sql
DROP DATABASE IF EXISTS shoeshop_db;
CREATE DATABASE shoeshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
❌ Port Already in Use
Triệu chứng: Không thể khởi động server do port đã được sử dụng

Giải pháp:

Backend:

bash
# Thay đổi port Laravel
php artisan serve --port=8001
Frontend:

javascript
// vite.config.js
export default defineConfig({
  server: {
    port: 3001
  }
})
🧹 Clear Cache Commands
bash
# Clear tất cả cache
php artisan optimize:clear

# Hoặc clear từng loại
php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear
📸 Screenshots
🏠 Trang chủ
Show Image

🛍️ Trang sản phẩm
Show Image

🛒 Giỏ hàng
Show Image

📦 Đơn hàng
Show Image

👨‍💼 Admin Dashboard
Show Image

📝 Notes
📋 Trạng thái đơn hàng
awaiting_confirmation - Chờ xác nhận (có thể hủy)
processing - Đang xử lý
shipping - Đang giao hàng
completed - Hoàn thành
cancelled - Đã hủy
💳 Phương thức thanh toán
COD - Cash on Delivery (Thanh toán khi nhận hàng)
MoMo - Ví điện tử MoMo
🤝 Contributing
Contributions, issues and feature requests are welcome!

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

👨‍💻 Author
Your Name

GitHub: @your-username
Email: your.email@example.com
⭐ Show your support
Give a ⭐️ if this project helped you!

<div align="center"> <p>Made with ❤️ by HappyShop Team</p> <p>© 2024 HappyShop. All rights reserved.</p> </div>
