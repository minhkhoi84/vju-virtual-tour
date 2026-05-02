import { useRef, useState } from 'react';

const MENU_DATA = [
  {
    category: "KHUÔN VIÊN TRƯỜNG",
    items: [
      { label: "Cổng soát vé", index: 0 },
      { label: "Khuôn viên trường", index: 1 },
      { label: "Bãi đất trống", index: 2 },
      { label: "Nhà để xe", index: 3 },
    ]
  },
  {
    category: "KHU TIỆN ÍCH",
    items: [
      { label: "Nhà đa năng", index: 4 },
      { label: "Sân bóng", index: 5 },
      { label: "Trung tâm thư viện", index: 6 },
      { label: "Khu căng tin", index: 7 },
      { label: "Khu ký túc xá (DOM A, B, C)", index: 8 },
      { label: "Quảng trường", index: 9 },
      { label: "Hội trường", index: 10 },
      { label: "Máy ATM", index: 11 },
      { label: "Tạp hóa", index: 12 },
      { label: "Hàng photo", index: 13 },
      { label: "Nhà CLB", index: 14 },
    ]
  },
  {
    category: "HỆ THỐNG PHÒNG HỌC",
    items: [
      { label: "Phòng thí nghiệm / Thực hành", index: 15 },
      { label: "Giảng đường 1 (1101–1303)", index: 16 },
      { label: "Giảng đường 2 (2101–2303)", index: 17 },
      { label: "Tầng 1–2 khu căng tin", index: 18 },
      { label: "Rmit Hub Innovation", index: 19 },
      { label: "Phòng máy", index: 20 },
    ]
  },
  {
    category: "KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ",
    items: [
      { label: "Phòng Đào tạo & CTSV", index: 21 },
      { label: "Phòng nghỉ giáo viên", index: 22 },
      { label: "Phòng máy chủ / Phòng kho", index: 23 },
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
  const [activeIndex, setActiveIndex] = useState(1);
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

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      
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
        <div className="flex h-[96px] shrink-0 items-center gap-3 border-b border-white/50 bg-white/80 px-4 backdrop-blur-md">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f26622] text-white transition-colors hover:bg-[#d9581a]"
          >
            <svg className="h-5 w-5 shrink-0 pr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-[22px] font-black uppercase leading-none tracking-tight text-[#1e294d]">
              VJU VIRTUAL TOUR
            </h1>
            <p className="mt-1 text-[13px] font-normal text-slate-500">
              Hiện thực hóa tiềm năng
            </p>
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
                          onClick={() => changePanorama(loc.index)}
                          className={`w-full cursor-pointer rounded-r-lg border-l-4 px-4 py-2 text-left text-base transition-colors ${
                            activeIndex === loc.index
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
              {MENU_DATA.flatMap((g) => g.items).find((item) => item.index === activeIndex)?.label || "Khuôn viên trường"}
            </div>
          </div>
        </div>
      </aside>

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