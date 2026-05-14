# Kiến Trúc Hệ Thống VJU Virtual Tour

## 1. Tổng Quan

Ứng dụng VJU Virtual Tour là một **Single Page Application (SPA)** được xây dựng bằng React + Vite, tích hợp engine tour 360 độ dựng sẵn (3DVista) nhúng qua iframe. Kiến trúc tuân theo mô hình **Shell + Embedded Engine**, nơi React quản lý giao diện người dùng bên ngoài, còn 3DVista xử lý việc render và tương tác với nội dung panorama 360.

---

## 2. Các Lớp Kiến Trúc

### **Lớp 1: Giao Diện & Điều Khiển (Presentation Layer)**
- **Thành phần chính**: React SPA + React Router
- **File chính**: `frontend/src/App.jsx`, `frontend/src/main.jsx`
- **Chức năng**: 
  - Route toàn bộ app về một trang duy nhất (TourPage)
  - Khởi động ứng dụng bằng ReactDOM render vào DOM
  - Xây dựng SPA framework

### **Lớp 2: Controller & State Management (Business Logic Layer)**
- **Thành phần chính**: TourPage component
- **File chính**: `frontend/src/pages/TourPage.jsx`
- **Chức năng**:
  - Quản lý state: activeIndex, language, isSidebarOpen, hotspotPreview, isStarted
  - Xử lý menu navigation (4 categories: Khuôn viên trường, Khu tiện ích, Hệ thống phòng học, Hành chính)
  - Đồng bộ giữa menu bên trái và panorama đang hiển thị
  - I18n (Vietnamese/English)
  - Gọi hàm iframe để chuyển panorama: `setMediaByIndex(index)`
  - Poll trạng thái từ 3DVista player để cập nhật activeIndex
  - Lắng nghe message từ iframe (hotspot preview)
  - Quản lý hotspot preview panel

### **Lớp 3: Giao Diện Người Dùng (UI Layer)**
- **Thành phần**: 
  - Sidebar: Menu địa điểm với 4 nhóm, mở/đóng responsive
  - Header: Logo, Language switch (VI/EN), Admissions button
  - Main Viewer: iframe nhúng tour 360
  - Hotspot Preview: Panel xem trước ở góc phải dưới
  - Thumbnail bar: Xem trước các góc nhìn phòng học
  - Welcome screen: Màn hình chào mừng với nút KHỞI HÀNH
- **Styling**: Tailwind CSS + PostCSS
- **Đặc tính**: Responsive, smooth animations, glassmorphism design

### **Lớp 4: Engine Tour 360 (Embedded Engine Layer)**
- **Thành phần chính**: 3DVista Player
- **File chính**: `frontend/public/tour360/index.html` + `frontend/public/tour360/script.js`
- **Chức năng**:
  - Render panorama cube 360 độ
  - Quản lý playlist panorama
  - Xử lý hotspot & overlay
  - Preload media assets
  - Bắn message lên parent window khi tour load xong
  - Tiếp nhận lệnh từ parent (setMediaByIndex)
  - Cung cấp hàm lấy trạng thái hiện tại

### **Lớp 5: Dữ Liệu & Assets (Data Layer)**
- **Thành phần**:
  - Menu data (MENU_DATA): Hardcoded map địa điểm → index media
  - Language data (LANGUAGE_CONTENT): Bản dịch VI/EN
  - Panorama assets: `public/tour360/media/panorama_*/`
  - Thumbnail assets: `public/tour360/media/panorama_*_t.jpg`
  - Static files: logo, background, cursors
- **Đặc tính**: Tất cả assets tĩnh, không có backend API

---

## 3. Luồng Tương Tác Chính

### **Luồng A: Chuyển Panorama khi Click Menu**
```
User click menu item
    ↓
TourPage.changePanorama(index)
    ↓
iframeRef.current.contentWindow.setMediaByIndex(index)
    ↓
3DVista setMainMediaByIndex(index)
    ↓
3DVista render panorama mới
    ↓
TourPage poll và cập nhật activeIndex state
    ↓
Sidebar highlight item được chọn
    ↓
Thumbnail bar hiển thị nếu là phòng học
```

### **Luồng B: Đồng Bộ State khi Chuyển Panorama từ 3DVista**
```
User pan/zoom trong 3DVista viewer
    ↓
3DVista change selectedIndex
    ↓
TourPage setInterval (150ms) poll getCurrentMediaIndex()
    ↓
setActiveIndex(newIndex)
    ↓
Sidebar tự động highlight item tương ứng
```

### **Luồng C: Xem Trước Hotspot**
```
User hover hotspot trong panorama
    ↓
3DVista hotspot event triggered
    ↓
3DVista postMessage({type: 'SHOW_HOTSPOT_PREVIEW', preview: {...}})
    ↓
TourPage handleMessage nhận dữ liệu
    ↓
setHotspotPreview(data)
    ↓
Preview panel fade-in ở góc phải dưới
    ↓
User unhover
    ↓
3DVista postMessage({type: 'HIDE_HOTSPOT_PREVIEW'})
    ↓
Preview panel fade-out
```

---

## 4. Công Nghệ & Stack

| Lớp | Công Nghệ | Phiên Bản |
|-----|-----------|----------|
| Frontend Framework | React | 19.2.0 |
| Build Tool | Vite | 7.3.1 |
| Routing | React Router | 7.14.0 |
| Styling | Tailwind CSS | 4.2.4 |
| CSS Processor | PostCSS | 8.5.12 |
| Linting | ESLint | 9.39.1 |
| Tour Engine | 3DVista | v4+ (embedded) |
| Containerization | Docker Compose | 3.8 |
| Development Server | Vite Dev Server | Port 5173 |

---

## 5. Đặc Điểm Kiến Trúc

### ✅ Điểm Mạnh
1. **Tách biệt trách nhiệm**: React quản lý UI, 3DVista quản lý render tour
2. **Triển khai nhanh**: Dùng 3DVista ready-made, không cần code engine từ đầu
3. **Dễ nhúng**: Iframe isolation giúp 3DVista chạy độc lập, an toàn
4. **Responsive & Modern**: Tailwind + glassmorphism design hiện đại
5. **I18n hỗ trợ**: Dễ mở rộng thêm ngôn ngữ (chỉ cần thêm key trong LANGUAGE_CONTENT)
6. **Offline ready**: Tất cả assets tĩnh, không cần internet khi render

### ⚠️ Điểm Cần Cải Thiện
1. **Coupling cao**: Menu data, language data, logic đồng bộ nằm chung trong TourPage.jsx (~760 dòng)
2. **Polling state**: Dùng setInterval(150ms) để poll từ iframe không tối ưu, nên dùng event listener
3. **Hardcoded index**: Các index media (0, 1, 2...) hardcode trong MENU_DATA dễ lỗi khi thêm/xóa pano
4. **Không có persistence**: Không lưu vị trí cuối cùng của user, mỗi lần reload về đầu
5. **Chưa có backend**: Nếu sau này cần quản lý dynamic tours, sẽ cần API

---

## 6. Data Flow Model

```
┌─────────────────────────────────────────────────────────┐
│                    Browser / Client                     │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         React SPA (TourPage.jsx)                 │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │ State:                                     │  │  │
│  │  │ - activeIndex                             │  │  │
│  │  │ - language (VI/EN)                        │  │  │
│  │  │ - isSidebarOpen                           │  │  │
│  │  │ - hotspotPreview                          │  │  │
│  │  │ - isStarted                               │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  │                    ↕ (postMessage)              │  │
│  │  ┌────────────────────────────────────────────┐  │  │
│  │  │   iframe: tour360/index.html               │  │  │
│  │  │   3DVista Player Engine                    │  │  │
│  │  │   - Render Panorama 360°                  │  │  │
│  │  │   - Manage Playlist & Hotspots            │  │  │
│  │  │   - Handle User Interactions              │  │  │
│  │  └────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
                           ↓
        ┌─────────────────────────────────────┐
        │  Static Assets (public/tour360/)    │
        │  - Panorama media files             │
        │  - Thumbnails                       │
        │  - Library files (tdvplayer.js)     │
        └─────────────────────────────────────┘
```

---

## 7. Cấu Trúc Thư Mục

```
vju-virtual-tour/
├── docker-compose.yml              (Docker config)
├── frontend/
│   ├── src/
│   │   ├── main.jsx                (Entry point)
│   │   ├── App.jsx                 (Router)
│   │   ├── globals.css             (Global styles)
│   │   └── pages/
│   │       └── TourPage.jsx        (Main controller)
│   ├── public/
│   │   ├── imgs/
│   │   │   ├── logo.png
│   │   │   └── IMG_0396-scaled.jpg
│   │   └── tour360/
│   │       ├── index.html          (Tour player HTML)
│   │       ├── script.js           (3DVista config)
│   │       ├── lib/
│   │       │   ├── tdvplayer.js
│   │       │   ├── WebVRPolyfill.js
│   │       │   └── Hls.js
│   │       └── media/
│   │           └── panorama_*/     (Panorama assets)
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
```

---

## 8. Key Metrics

- **Bundle size (expected)**: ~150-200KB (React + Vite + Tailwind)
- **3DVista player**: ~500KB (embedded in public/)
- **Panorama assets**: ~1.5GB+ (nhiều file 4K)
- **Initial load time**: ~2-5s (depend on network & panorama count)
- **Polling frequency**: 150ms (sync activeIndex)
- **Memory usage**: ~100-150MB (browser + 3DVista)

---

## 9. Sơ Đồ Thành Phần

```
App (React Router)
 └─ TourPage
     ├─ Header
     │  ├─ Logo
     │  ├─ Language Switch
     │  └─ Admissions Button
     ├─ Sidebar
     │  ├─ Menu Groups [KHUÔN VIÊN, KHU TIỆN ÍCH, PHÒNG HỌC, HÀNH CHÍNH]
     │  └─ Current Location Display
     ├─ Main Viewer (iframe)
     │  └─ 3DVista Player Engine
     ├─ Hotspot Preview Panel
     └─ Thumbnail Bar (khi chọn phòng học)
```

---

## 10. Khuyến Nghị Cải Thiện

### Ngắn hạn (Phase 1)
- [ ] Tách MENU_DATA và LANGUAGE_CONTENT sang file riêng
- [ ] Chuyển từ polling sang event listener (iframe message events)
- [ ] Lưu last viewed panorama vào localStorage

### Trung hạn (Phase 2)
- [ ] Tạo hook useIframePlayer để isolate logic iframe communication
- [ ] Thêm API backend để quản lý dynamic tours
- [ ] Implement analytics tracking (page views, hotspot clicks)

### Dài hạn (Phase 3)
- [ ] Thêm tour management CMS
- [ ] Support multi-tour navigation
- [ ] Thêm annotations/comments feature
- [ ] Mobile app version (React Native)
