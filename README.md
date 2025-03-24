# Hướng dẫn cách chạy ứng dụng

Để chạy ứng dụng Capacitor, hãy làm theo các bước sau:

## 1. Cài đặt các dependencies

Trước tiên, hãy đảm bảo bạn đã cài đặt tất cả các dependencies cần thiết:
npm install
## 2. Chạy ứng dụng trên web

Để chạy ứng dụng trên trình duyệt web:
npm run start
Ứng dụng sẽ được khởi chạy trên địa chỉ localhost (thường là http://localhost:3000).
## 3. Chuẩn bị cho ứng dụng di động

Trước khi build cho Android, bạn cần thêm các platforms:
npx cap add android
## 4. Build ứng dụng

Build ứng dụng trước khi chạy trên thiết bị di động:
npm run build
## 5. Cập nhật các tệp native

Sau khi build, cập nhật các tệp native:
npx cap sync
## 6. Mở dự án trong Android Studio

Để chạy ứng dụng trên Android:
npx cap open android
Sau đó, bạn có thể chạy ứng dụng trên thiết bị thật hoặc máy ảo từ Android Studio.
## 8. Chạy trực tiếp trên thiết bị Android

Nếu bạn muốn chạy trực tiếp trên thiết bị Android đã kết nối:
npx cap run android
Lưu ý: Đảm bảo rằng bạn đã cài đặt đầy đủ các công cụ phát triển như Node.js, Android Studio trước khi thực hiện các bước trên.
