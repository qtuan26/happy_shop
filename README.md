 HappyShop - E-commerce Platform
Dự án website bán giày thể thao với đầy đủ tính năng giỏ hàng, thanh toán, quản lý đơn hàng và chat hỗ trợ.



🚀 Công nghệ sử dụng
Backend

Laravel 9+ - PHP Framework
MySQL - Database
Laravel Sanctum - Authentication
Cloudinary - Cloud storage cho hình ảnh

Frontend

React 18+ - JavaScript Library
React Router v6 - Routing
Axios - HTTP Client
Tailwind CSS - CSS Framework
Lucide React - Icons


💻 Yêu cầu hệ thống
Backend

PHP >= 8.0
Composer
MySQL >= 5.7
Node.js >= 14.x (cho Laravel Mix/Vite)

Frontend

Node.js >= 14.x
npm hoặc yarn


🔧 Cài đặt Backend (Laravel)
1. Clone repository và di chuyển vào thư mục backend
bashcd backend
2. Cài đặt dependencies
bashcomposer install
3. Tạo file .env
bashcp .env.example .env
4. Cấu hình .env
Mở file .env và cấu hình các thông số:

//env# App
APP_NAME=Laravel
APP_ENV=local
APP_KEY=base64:aGwBInn/1PcRTH9bQD8lWncH19a1a3wIMZdBATNA1fE=
APP_DEBUG=true
APP_URL=http://localhost
NAME = "HELLO MAYAS CƯNG"

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=shoeshop_db
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=null
MAIL_FROM_NAME="${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="${PUSHER_APP_CLUSTER}"

5. Tạo database
bash# Tạo database trong MySQL
mysql -u root -p
CREATE DATABASE happyshop_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EXIT;
6. Generate application key
bashphp artisan key:generate
7. Chạy migrations
bashphp artisan migrate
8. Chạy seeders (tạo dữ liệu mẫu)
bashphp artisan db:seed
Hoặc chạy từng seeder cụ thể:
bashphp artisan db:seed --class=CategorySeeder
php artisan db:seed --class=BrandSeeder
php artisan db:seed --class=ProductSeeder
php artisan db:seed --class=CouponSeeder
php artisan db:seed --class=UserSeeder
9. Tạo symbolic link cho storage (nếu cần)
bashphp artisan storage:link
10. Khởi động server
bashphp artisan serve
Backend sẽ chạy tại: http://127.0.0.1:8000

⚛️ Cài đặt Frontend (React)
1. Di chuyển vào thư mục frontend
bashcd frontend
2. Cài đặt dependencies
bashnpm install
3. Cấu hình API URL
Tạo file .env trong thư mục frontend:

//.env:
VITE_API_BASE_URL=http://127.0.0.1:8000/api
VITE_BACKEND_URL=http://127.0.0.1:8000