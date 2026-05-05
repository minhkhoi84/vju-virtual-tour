import { useRef, useState, useEffect } from 'react';

const MENU_DATA = [
  {
    category: "KHUÔN VIÊN TRƯỜNG",
    items: [
      { label: "Cổng trường", index: 0 },
      { label: "Cổng soát vé", index: 1 },
      { label: "Sân chào cờ", index: 5 },
      { label: "Nhà để xe", index: 6 },
    ]
  },
  {
    category: "KHU TIỆN ÍCH",
    items: [
      { label: "Nhà đa năng", index: 29 },
      { label: "Sân bóng", index: 30 },
      { label: "Thư viện", index: 20},
      { label: "Khu căng tin", index: 10 },
      { label: "Khu ký túc xá", index: 60 },
      { label: "Phòng giặt là", index: 61 },
      { label: "Hội trường", index: 2 },
      { label: "Máy ATM", index: 13 },
      { label: "Tạp hóa", index: 31 },
      { label: "Nhà CLB", index: 36 },
    ]
  },
  // Tìm đến phần Hệ thống phòng học và thay thế bằng đoạn này:
{
  category: "HỆ THỐNG PHÒNG HỌC",
  items: [
    { label: "Phòng thí nghiệm / Thực hành", index: 19 },
    {
      label: "Giảng đường 1",
      index: 50,
      subItems: [
        {
          label: "Phòng 2101",
          index: 50,
          thumb: "/tour360/media/panorama_E0C3819C_F74C_F609_41C2_2EFFF4FB156F_t.jpg",
        },
        {
          label: "Phòng 2101 (góc 2)",
          index: 51,
          thumb: "/tour360/media/panorama_E0B380A8_F74C_7609_41A7_28154E1CB0FC_t.jpg",
        },
      ],
    },
    {
      label: "Giảng đường 2",
      index: 4,
      subItems: [
        {
          label: "Phòng 2301",
          index: 57,
          thumb: "/tour360/media/panorama_D3638364_F73B_F17C_41C7_53EA7B2F932B_t.jpg",
        },
        {
          label: "Phòng 2302",
          index: 58,
          thumb: "/tour360/media/panorama_D2503D71_F73C_7155_41CF_7ED250A076A7_t.jpg",
        },
        {
          label: "Phòng 2303",
          index: 59,
          thumb: "/tour360/media/panorama_D28F14CA_F73C_37B7_41EC_9A23F9063271_t.jpg",
        },
      ],
    },
    {
      label: "Giảng đường 3",
      index: 46,
      subItems: [
        {
          label: "Phòng 3101",
          index: 46,
          thumb: "/tour360/media/panorama_F954B244_F73C_7A79_41E5_028FB682D8D8_t.jpg",
        },
        {
          label: "Phòng 3102",
          index: 47,
          thumb: "/tour360/media/panorama_E51A99B3_F734_561F_41D1_8A77F27BEF80_t.jpg",
        },
        {
          label: "Phòng 3103",
          index: 48,
          thumb: "/tour360/media/panorama_E5ED6832_F74C_7619_41BB_0B82F2BCBFB6_t.jpg",
        },
        {
          label: "Phòng 3104",
          index: 49,
          thumb: "/tour360/media/panorama_E3E47DCE_F75C_2E09_41ED_FE30EFBA56CA_t.jpg",
        },
      ],
    },
    { label: "Rmit Hub Innovation", index: 12 },
    { label: "Phòng máy", index: 15 },
  ]
},
  {
    category: "KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ",
    items: [
      { label: "Phòng Đào tạo & CTSV", index: 21 },
      { label: "Phòng nghỉ giáo viên", index: 53 },
      { label: "Phòng máy chủ / Phòng kho", index: 34 },
    ]
  }
];

const GROUP_ICONS = {
  "KHUÔN VIÊN TRƯỜNG": (
    <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
    </svg>
  ),
  "KHU TIỆN ÍCH": (
    <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 6h16M6 6v13m12-13v13M8 10h8M8 14h8" />
    </svg>
  ),
  "HỆ THỐNG PHÒNG HỌC": (
    <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5V6a2 2 0 012-2h14v13H6.5A2.5 2.5 0 004 19.5z" />
    </svg>
  ),
  "KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ": (
    <svg className="h-4 w-4 shrink-0 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4 10l8-6 8 6M6 9v11m12-11v11M4 20h16M10 20v-5h4v5" />
    </svg>
  ),
};

export default function TourPage() {
  const iframeRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState("VI");
  const allMenuItems = MENU_DATA.flatMap((group) => group.items);
  const activeLectureHall = MENU_DATA
    .find((group) => group.category === "HỆ THỐNG PHÒNG HỌC")
    ?.items.find(
      (item) =>
        item.subItems?.length &&
        item.subItems.some((subItem) => subItem.index === activeIndex)
    );
  const thumbnailItems = activeLectureHall?.subItems ?? [];
  const activeThumbnailIndex = thumbnailItems.some((item) => item.index === activeIndex)
    ? activeIndex
    : thumbnailItems[0]?.index;
  const isThumbnailOpen = thumbnailItems.length > 0;
  const [openGroups, setOpenGroups] = useState(() =>
    MENU_DATA.reduce((acc, group) => {
      acc[group.category] = group.category === "KHUÔN VIÊN TRƯỜNG";
      return acc;
    }, {})
  );

  const changePanorama = (index) => {
    if (iframeRef.current?.contentWindow?.setMediaByIndex) {
      iframeRef.current.contentWindow.setMediaByIndex(index);
    }
    setActiveIndex(index);
  };

  const toggleGroup = (category) => {
    setOpenGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Polling để đồng bộ activeIndex từ Iframe 3DVista
  useEffect(() => {
    const pollInterval = setInterval(() => {
      try {
        const contentWindow = iframeRef.current?.contentWindow;
        if (!contentWindow) return;

        // Kiểm tra xem Iframe có cung cấp hàm lấy index hiện tại không
        if (typeof contentWindow.getCurrentMediaIndex === 'function') {
          const newIndex = contentWindow.getCurrentMediaIndex();
          if (typeof newIndex === 'number' && newIndex !== activeIndex) {
            setActiveIndex(newIndex);
          }
        } else if (contentWindow.tdvplayer?.getById?.('rootPlayer')) {
          // Fallback: cố gắng lấy selectedIndex từ playlist chính của 3DVista
          const rootPlayer = contentWindow.tdvplayer.getById('rootPlayer');
          const mainPlayList = rootPlayer?.mainPlayList;
          if (mainPlayList && typeof mainPlayList.get === 'function') {
            const newIndex = mainPlayList.get('selectedIndex');
            if (typeof newIndex === 'number' && newIndex !== activeIndex) {
              setActiveIndex(newIndex);
            }
          }
        }
      } catch {
        // Bỏ qua lỗi nếu Iframe chưa load hoặc không có hàm này
      }
    }, 150);

    return () => clearInterval(pollInterval);
  }, [activeIndex]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <div className="absolute right-4 top-4 z-[70] flex items-center gap-4">
        <a
          href="https://vju.ac.vn/ttts2026/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md bg-[#f26622] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 md:block"
        >
          Thông tin tuyển sinh
        </a>

        <div className="flex items-center divide-x divide-white/20 overflow-hidden rounded-md bg-black/40 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setLanguage("VI")}
            className={`px-3 py-2 text-sm font-bold transition-colors ${
              language === "VI" ? "text-white" : "text-gray-400"
            }`}
          >
            VI
          </button>
          <button
            type="button"
            onClick={() => setLanguage("EN")}
            className={`px-3 py-2 text-sm font-bold transition-colors ${
              language === "EN" ? "text-white" : "text-gray-400"
            }`}
          >
            EN
          </button>
        </div>
      </div>
      
      {/* Nút Toggle mở menu */}
      {!isSidebarOpen && (
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="absolute left-4 top-4 z-[100] flex h-10 w-10 items-center justify-center rounded-full bg-[#f26622] text-white shadow-lg transition-transform hover:scale-105"
        >
          <svg className="h-6 w-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* SIDEBAR */}
      <aside
        className={`absolute left-0 top-0 z-50 flex h-full w-[360px] flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-[96px] shrink-0 items-center gap-3 border-b border-white/50 bg-white px-4">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f26622] text-white transition-colors hover:bg-[#d9581a]"
          >
            <svg className="h-5 w-5 shrink-0 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        <div className="min-w-0 flex items-center overflow-hidden">
          <img 
            src="/imgs/logo.jpg" 
            alt="VJU Logo"
            className="h-auto max-h-[75px] w-[200px] object-contain ml-4 transition-all"
          />
        </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-white/70 backdrop-blur-md">
          <div className="border-b border-white/70 px-4 pb-3 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">Menu dia diem</h2>
          </div>

          <ul
            className="h-full overflow-y-auto px-2 pb-20 pt-2 [scrollbar-color:rgba(59,130,246,0.5)_transparent] [scrollbar-width:thin] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-blue-400/60 [&::-webkit-scrollbar-thumb]:opacity-0 hover:[&::-webkit-scrollbar-thumb]:opacity-100 [&::-webkit-scrollbar]:w-1.5"
          >
            {MENU_DATA.map((group) => (
              <li key={group.category} className="mb-1 list-none">
                <button
                  type="button"
                  onClick={() => toggleGroup(group.category)}
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-left transition-colors hover:bg-blue-50/60"
                >
                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                    {GROUP_ICONS[group.category]}
                    {group.category}
                  </span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-gray-500 transition-transform ${openGroups[group.category] ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {openGroups[group.category] && (
                  <ul className="mt-1 space-y-1 pl-2">
                    {group.items.map((loc) => (
                      <li key={loc.index} className="list-none">
                        <button
                          type="button"
                          onClick={() => changePanorama(loc.subItems?.[0]?.index ?? loc.index)}
                          className={`w-full cursor-pointer rounded-r-lg border-l-4 px-4 py-2 text-left text-base transition-colors ${
                            activeIndex === loc.index || loc.subItems?.some((subItem) => subItem.index === activeIndex)
                              ? 'border-blue-500 bg-blue-50 font-semibold text-blue-900'
                              : 'border-transparent font-normal text-slate-700 hover:bg-blue-50/50 hover:text-slate-900'
                          }`}
                        >
                          {loc.label}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Floating orange chevron button (like sample) */}
        <div className="absolute bottom-0 left-0 w-full">
          <div className="flex h-12 items-center gap-3 border-t border-white/50 bg-white/80 px-4 text-slate-700 backdrop-blur-md">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f365f]">
              <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H3v6h3l5 4V5z" />
              </svg>
            </div>
            <div className="truncate text-sm font-medium">
              {allMenuItems
                .flatMap((item) => (item.subItems ? item.subItems : item))
                .find((item) => item.index === activeIndex)?.label || "Khuôn viên trường"}
            </div>
          </div>
        </div>
      </aside>

      <div
        className={`pointer-events-none absolute bottom-0 left-0 z-[60] h-24 w-full transition-all duration-200 md:h-28 ${
          isSidebarOpen ? 'md:left-[360px] md:w-[calc(100%-360px)]' : ''
        } ${isThumbnailOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
      >
        <div className="pointer-events-auto flex h-full w-full items-stretch justify-center gap-2 overflow-hidden border-t-4 border-[#f26622] bg-[#1e294d] px-2 py-2 md:px-3">
          {thumbnailItems.map((item) => {
            const isActive = item.index === activeThumbnailIndex;

            return (
              <button
                key={item.index}
                type="button"
                onClick={() => changePanorama(item.index)}
                className={`group relative h-full w-48 flex-none overflow-hidden rounded-lg text-left transition-all duration-500 md:w-56 ${
                  isActive
                    ? 'border-2 border-[#f26622] opacity-100'
                    : 'border border-transparent opacity-70 hover:opacity-90'
                }`}
              >
                <>
                  <img
                    src={item.thumb}
                    alt={item.label}
                    className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-[1.02] ${
                      isActive ? 'brightness-100' : 'brightness-50'
                    }`}
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2">
                    <span className={`truncate text-sm font-semibold ${isActive ? 'text-white' : 'text-slate-200'}`}>
                      {item.label}
                    </span>
                  </div>
                </>
              </button>
            );
          })}
        </div>
      </div>

      {/* KHUNG IFRAME 360 */}
      <div className="absolute left-0 top-0 z-0 h-screen w-full bg-slate-900">
        <iframe 
          ref={iframeRef}
          src="/tour360/index.html" 
          className="h-full w-full border-none"
          allowFullScreen 
          allow="xr-spatial-tracking; gyroscope; accelerometer"
        ></iframe>
      </div>
    </div>
  );
}
