import { memo, useEffect, useMemo, useRef, useState } from 'react';

const LANGUAGE_CONTENT = {
  VI: {
    admissions: 'Thông tin tuyển sinh',
    menuTitle: 'Menu địa điểm',
    defaultLocation: 'Khuôn viên trường',
    startTour: 'KHỞI HÀNH',
    startTourHint: 'Nhấn nút KHỞI HÀNH để bắt đầu tham quan',
    loadingPreview: 'Đang tải xem trước...',
    hotspotPreviewTitle: 'Xem trước hotspot',
    categories: {
      'KHUÔN VIÊN TRƯỜNG': 'KHUÔN VIÊN TRƯỜNG',
      'KHU TIỆN ÍCH': 'KHU TIỆN ÍCH',
      'HỆ THỐNG PHÒNG HỌC': 'HỆ THỐNG PHÒNG HỌC',
      'KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ': 'KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ',
    },
    items: {
      'Cổng trường': 'Cổng trường',
      'Cổng soát vé': 'Cổng soát vé',
      'Sân chào cờ': 'Sân chào cờ',
      'Nhà để xe': 'Nhà để xe',
      'Nhà đa năng': 'Nhà đa năng',
      'Sân bóng': 'Sân bóng',
      'Thư viện': 'Thư viện',
      'Khu căng tin': 'Khu căng tin',
      'Khu ký túc xá': 'Khu ký túc xá',
      'Phòng giặt là': 'Phòng giặt là',
      'Hội trường': 'Hội trường',
      'Máy ATM': 'Máy ATM',
      'Tạp hóa': 'Tạp hóa',
      'Nhà CLB': 'Nhà CLB',
      'Phòng thí nghiệm / Thực hành': 'Phòng thí nghiệm / Thực hành',
      'Giảng đường 1': 'Giảng đường 1',
      'Phòng 2101': 'Phòng 2101',
      'Phòng 2101 (góc 2)': 'Phòng 2101 (góc 2)',
      'Giảng đường 2': 'Giảng đường 2',
      'Phòng 2301': 'Phòng 2301',
      'Phòng 2302': 'Phòng 2302',
      'Phòng 2303': 'Phòng 2303',
      'Giảng đường 3': 'Giảng đường 3',
      'Phòng 3101': 'Phòng 3101',
      'Phòng 3102': 'Phòng 3102',
      'Phòng 3103': 'Phòng 3103',
      'Phòng 3104': 'Phòng 3104',
      'Rmit Hub Innovation': 'Rmit Hub Innovation',
      'Phòng máy': 'Phòng máy',
      'Phòng Đào tạo & CTSV': 'Phòng Đào tạo & CTSV',
      'Phòng nghỉ giáo viên': 'Phòng nghỉ giáo viên',
      'Phòng máy chủ / Phòng kho': 'Phòng máy chủ / Phòng kho',
    },
  },
  EN: {
    admissions: 'Admissions Information',
    menuTitle: 'Location Menu',
    defaultLocation: 'Campus Grounds',
    startTour: 'START TOUR',
    startTourHint: 'Press START TOUR to begin exploring',
    loadingPreview: 'Loading preview...',
    hotspotPreviewTitle: 'Hotspot preview',
    categories: {
      'KHUÔN VIÊN TRƯỜNG': 'Campus Grounds',
      'KHU TIỆN ÍCH': 'Amenities',
      'HỆ THỐNG PHÒNG HỌC': 'Classroom System',
      'KHU VỰC HÀNH CHÍNH / NHÀ HIỆU BỘ': 'Administration / Principal Office',
    },
    items: {
      'Cổng trường': 'School Gate',
      'Cổng soát vé': 'Ticket Check Gate',
      'Sân chào cờ': 'Flag Ceremony Yard',
      'Nhà để xe': 'Parking Area',
      'Nhà đa năng': 'Multi-purpose Hall',
      'Sân bóng': 'Sports Field',
      'Thư viện': 'Library',
      'Khu căng tin': 'Cafeteria Area',
      'Khu ký túc xá': 'Dormitory Area',
      'Phòng giặt là': 'Laundry Room',
      'Hội trường': 'Auditorium',
      'Máy ATM': 'ATM',
      'Tạp hóa': 'Convenience Store',
      'Nhà CLB': 'Club House',
      'Phòng thí nghiệm / Thực hành': 'Lab / Practice Room',
      'Giảng đường 1': 'Lecture Hall 1',
      'Phòng 2101': 'Room 2101',
      'Phòng 2101 (góc 2)': 'Room 2101 (view 2)',
      'Giảng đường 2': 'Lecture Hall 2',
      'Phòng 2301': 'Room 2301',
      'Phòng 2302': 'Room 2302',
      'Phòng 2303': 'Room 2303',
      'Giảng đường 3': 'Lecture Hall 3',
      'Phòng 3101': 'Room 3101',
      'Phòng 3102': 'Room 3102',
      'Phòng 3103': 'Room 3103',
      'Phòng 3104': 'Room 3104',
      'Rmit Hub Innovation': 'Rmit Hub Innovation',
      'Phòng máy': 'Computer Lab',
      'Phòng Đào tạo & CTSV': 'Training & Student Affairs Office',
      'Phòng nghỉ giáo viên': 'Teachers Lounge',
      'Phòng máy chủ / Phòng kho': 'Server Room / Storage Room',
    },
  },
};

const LOCATION_DESCRIPTIONS = {
  VI: {
    'Cổng trường':
      'Cổng chính Trường Đại học Việt Nhật là điểm đón tiếp đầu tiên dành cho sinh viên, giảng viên và khách tham quan. Từ đây, bạn có thể bắt đầu hành trình khám phá khuôn viên xanh, hiện đại với kiến trúc hài hòa giữa phong cách Nhật Bản và Việt Nam.',
    'Thư viện':
      'Thư viện VJU cung cấp không gian học tập yên tĩnh, kho tài liệu phong phú và hệ thống tra cứu số hiện đại. Đây là nơi sinh viên nghiên cứu, đọc sách và làm việc nhóm trong môi trường chuyên nghiệp, hỗ trợ đầy đủ cho quá trình học tập.',
    'Sân chào cờ':
      'Sân chào cờ là không gian trang trọng nơi diễn ra các buổi lễ chào cờ, sự kiện chung của nhà trường. Khu vực rộng rãi, thoáng đãng, thường xuyên được sử dụng cho hoạt động ngoại khóa và các chương trình giao lưu văn hóa.',
  },
  EN: {
    'Cổng trường':
      'The main gate of Vietnam Japan University is the first welcome point for students, faculty, and visitors. From here, you can begin exploring a green, modern campus with architecture that blends Japanese and Vietnamese styles.',
    'Thư viện':
      'The VJU Library offers a quiet study environment, a rich collection of materials, and a modern digital catalog system. It is where students research, read, and work in groups within a professional setting that fully supports learning.',
    'Sân chào cờ':
      'The flag ceremony yard is a dignified space for flag-raising ceremonies and school-wide events. This spacious, open area is also used for extracurricular activities and cultural exchange programs.',
  },
};

const getLocalizedText = (language, key) => LANGUAGE_CONTENT[language]?.[key] ?? LANGUAGE_CONTENT.VI[key] ?? key;

const getLocalizedCategory = (language, category) =>
  LANGUAGE_CONTENT[language]?.categories?.[category] ?? category;

const getLocalizedItemLabel = (language, label) =>
  LANGUAGE_CONTENT[language]?.items?.[label] ?? label;

const PREVIEW_TOOLTIP_SIZE = {
  width: 320,
  height: 230,
  gap: 18,
  margin: 16,
};

const parseTourHotspotPreviewMap = (scriptText) => {
  const map = new Map();
  const overlayRegex = /"areas"\s*:\s*\[[\s\S]*?"click"\s*:\s*"([^"]+)"[\s\S]*?"id"\s*:\s*"(overlay_[^"]+)"/g;
  let match;

  while ((match = overlayRegex.exec(scriptText)) !== null) {
    const [, clickScript, overlayId] = match;
    const selectedIndex = clickScript.match(/selectedIndex[^0-9]+(\d+)/)?.[1];
    const mediaId = clickScript.match(/this\.(panorama_[A-Z0-9_]+)/)?.[1];

    map.set(overlayId, {
      index: selectedIndex !== undefined ? Number(selectedIndex) : undefined,
      mediaId,
    });
  }

  return map;
};

const getTourImageUrl = (thumbnailUrl, mediaId) => {
  if (typeof thumbnailUrl === 'string' && thumbnailUrl.trim()) {
    const cleanUrl = thumbnailUrl.trim();

    if (/^(https?:)?\/\//.test(cleanUrl) || cleanUrl.startsWith('/')) {
      return cleanUrl;
    }

    return `/tour360/${cleanUrl.replace(/^\.?\//, '')}`;
  }

  return mediaId ? `/tour360/media/${mediaId}_t.jpg` : undefined;
};

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

const PreviewTooltip = memo(function PreviewTooltip({ preview, position, language }) {
  const image = preview?.previewImage || preview?.image || preview?.thumb || preview?.src;
  const fallbackImage = preview?.fallbackImage;
  const title = preview?.title || preview?.name || preview?.label || getLocalizedText(language, 'hotspotPreviewTitle');
  const clampedX = Math.min(
    position.x + PREVIEW_TOOLTIP_SIZE.gap,
    window.innerWidth - PREVIEW_TOOLTIP_SIZE.width - PREVIEW_TOOLTIP_SIZE.margin
  );
  const clampedY = Math.min(
    position.y + PREVIEW_TOOLTIP_SIZE.gap,
    window.innerHeight - PREVIEW_TOOLTIP_SIZE.height - PREVIEW_TOOLTIP_SIZE.margin
  );

  return (
    <div
      className={`fixed z-[9999] w-[320px] pointer-events-none transition-all duration-200 ease-out ${
        preview ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-2 opacity-0 scale-95'
      }`}
      style={{
        left: Math.max(PREVIEW_TOOLTIP_SIZE.margin, clampedX),
        top: Math.max(PREVIEW_TOOLTIP_SIZE.margin, clampedY),
      }}
      aria-hidden={!preview}
    >
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-[0_22px_70px_rgba(0,0,0,0.45)] ring-1 ring-cyan-200/10 backdrop-blur-xl">
        <div className="relative h-[170px] w-full bg-slate-800">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover"
              draggable="false"
              onError={(event) => {
                if (fallbackImage && event.currentTarget.src !== new URL(fallbackImage, window.location.origin).href) {
                  event.currentTarget.src = fallbackImage;
                }
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950 px-4 text-center text-sm text-white/60">
              {getLocalizedText(language, 'loadingPreview')}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
          <div className="absolute left-3 top-3 rounded-full bg-cyan-400/95 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-950 shadow-lg">
            Preview
          </div>
        </div>

        <div className="bg-slate-950/90 px-4 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-300/90">
            {getLocalizedText(language, 'hotspotPreviewTitle')}
          </p>
          <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-white">
            {getLocalizedItemLabel(language, title)}
          </h3>
        </div>
      </div>
    </div>
  );
});

export default function TourPage() {
  const iframeRef = useRef(null);
  const startTimeoutRef = useRef(null);
  const hotspotPreviewRef = useRef(null);
  const latestTooltipPositionRef = useRef({ x: 0, y: 0 });
  const overlayPreviewMapRef = useRef(new Map());
  const attachedIframeWindowRef = useRef(null);
  const hotspotPreviewCleanupRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [language, setLanguage] = useState("VI");
  const [isStarted, setIsStarted] = useState(false);
  const [isWelcomeClosing, setIsWelcomeClosing] = useState(false);
  const [hotspotPreview, setHotspotPreview] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [isDescOpen, setIsDescOpen] = useState(true);
  const allMenuItems = useMemo(() => MENU_DATA.flatMap((group) => group.items), []);
  const menuPreviewByIndex = useMemo(() => {
    const map = new Map();

    allMenuItems.forEach((item) => {
      const items = item.subItems?.length ? item.subItems : [item];
      items.forEach((scene) => {
        map.set(scene.index, {
          id: scene.index,
          title: scene.label,
          previewImage: scene.previewImage || scene.thumb,
        });
      });
    });

    return map;
  }, [allMenuItems]);
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
  const activeLocationLabel = allMenuItems
    .flatMap((item) => (item.subItems ? item.subItems : item))
    .find((item) => item.index === activeIndex)?.label;
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
    setIsDescOpen(true);
  };

  const updateTooltipPosition = (event, commitState = true) => {
    const iframeRect = iframeRef.current?.getBoundingClientRect();
    const sourceEvent = event?.originalEvent || event?.data?.originalEvent || event?.data?.event || event;
    const hasCoordinates = typeof sourceEvent?.clientX === 'number' && typeof sourceEvent?.clientY === 'number';
    const x = hasCoordinates
      ? iframeRect
        ? iframeRect.left + sourceEvent.clientX
        : sourceEvent.clientX
      : latestTooltipPositionRef.current.x;
    const y = hasCoordinates
      ? iframeRect
        ? iframeRect.top + sourceEvent.clientY
        : sourceEvent.clientY
      : latestTooltipPositionRef.current.y;

    latestTooltipPositionRef.current = { x, y };

    if (commitState) {
      setTooltipPosition((prev) => {
        if (Math.abs(prev.x - x) < 2 && Math.abs(prev.y - y) < 2) return prev;
        return { x, y };
      });
    }
  };

  const attachHotspotPreviewHandlers = () => {
    const iframeWindow = iframeRef.current?.contentWindow;
    const iframeDocument = iframeWindow?.document;
    const rootPlayer = iframeWindow?.tdvplayer?.getById?.('rootPlayer');

    if (!iframeWindow || !iframeDocument || !rootPlayer?.getOverlays || attachedIframeWindowRef.current === iframeWindow) {
      return false;
    }

    hotspotPreviewCleanupRef.current?.();

    const getScenePreview = (index, mediaId) => {
      const items = rootPlayer.mainPlayList?.get?.('items') ?? [];
      const itemIndex = typeof index === 'number'
        ? index
        : items.findIndex((playListItem) => playListItem?.get?.('media')?.get?.('id') === mediaId);
      const item = itemIndex >= 0 ? items[itemIndex] : undefined;
      const media = item?.get?.('media');
      const mediaThumb = media?.get?.('thumbnailUrl');
      const mediaLabel = media?.get?.('label');
      const resolvedMediaId = mediaId || media?.get?.('id');
      const menuPreview = menuPreviewByIndex.get(itemIndex);
      const fallbackImage = resolvedMediaId ? `/tour360/media/${resolvedMediaId}_t.jpg` : undefined;

      return {
        id: itemIndex >= 0 ? itemIndex : mediaId ?? mediaLabel,
        title: menuPreview?.title || mediaLabel || getLocalizedText(language, 'hotspotPreviewTitle'),
        previewImage: menuPreview?.previewImage || getTourImageUrl(mediaThumb, resolvedMediaId),
        fallbackImage,
      };
    };

    const getAreaClickScript = (area) => {
      if (!area?.get) return '';
      const clickAction = area.get('click') || area.get('action') || area.get('onClick') || '';
      return typeof clickAction === 'string' ? clickAction : String(clickAction);
    };

    const getPreviewFromArea = (area, overlay) => {
      const overlayPreview = overlayPreviewMapRef.current.get(overlay?.get?.('id'));
      const clickScript = getAreaClickScript(area);
      const selectedIndex = clickScript.match(/selectedIndex[^0-9]+(\d+)/)?.[1];
      const mediaId = clickScript.match(/this\.(panorama_[A-Z0-9_]+)/)?.[1];

      return getScenePreview(
        overlayPreview?.index ?? (selectedIndex !== undefined ? Number(selectedIndex) : undefined),
        overlayPreview?.mediaId ?? mediaId
      );
    };

    const showPreview = (preview, event) => {
      hotspotPreviewRef.current = preview;
      setHotspotPreview(preview);
      updateTooltipPosition(event);
    };

    const hidePreview = () => {
      hotspotPreviewRef.current = null;
      setHotspotPreview(null);
    };

    const movePreview = (event) => {
      updateTooltipPosition(event, Boolean(hotspotPreviewRef.current));
    };

    const bindings = [];
    const bindArea = (area, eventName, handler) => {
      if (!area?.bind) return;
      area.bind(eventName, handler, rootPlayer);
      bindings.push({ area, eventName, handler });
    };

    const mediaList = [
      ...(rootPlayer.getByClassName('Panorama') ?? []),
      ...(rootPlayer.getByClassName('Video360') ?? []),
      ...(rootPlayer.getByClassName('Map') ?? []),
    ];

    mediaList.forEach((media) => {
      (rootPlayer.getOverlays(media) ?? []).forEach((overlay) => {
        if (!['HotspotPanoramaOverlay', 'HotspotMapOverlay'].includes(overlay.get?.('class'))) return;

        overlay.get?.('areas')?.forEach((area) => {
          const handleEnter = (event) => showPreview(getPreviewFromArea(area, overlay), event);

          ['mouseover', 'mouseenter', 'rollOver', 'over'].forEach((eventName) =>
            bindArea(area, eventName, handleEnter)
          );
          ['mousemove', 'mouseMove'].forEach((eventName) => bindArea(area, eventName, movePreview));
          ['mouseout', 'mouseleave', 'rollOut', 'out'].forEach((eventName) =>
            bindArea(area, eventName, hidePreview)
          );
        });
      });
    });

    iframeDocument.addEventListener('mousemove', movePreview, true);
    iframeDocument.addEventListener('mouseleave', hidePreview, true);

    attachedIframeWindowRef.current = iframeWindow;
    hotspotPreviewCleanupRef.current = () => {
      bindings.forEach(({ area, eventName, handler }) => {
        area.unbind?.(eventName, handler, rootPlayer);
      });
      iframeDocument.removeEventListener('mousemove', movePreview, true);
      iframeDocument.removeEventListener('mouseleave', hidePreview, true);
      if (attachedIframeWindowRef.current === iframeWindow) {
        attachedIframeWindowRef.current = null;
      }
      hotspotPreviewCleanupRef.current = null;
    };

    return true;
  };

  const toggleGroup = (category) => {
    setOpenGroups((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const startTourAudio = () => {
    try {
      const iframeWindow = iframeRef.current?.contentWindow;
      const audioElements = iframeWindow?.document?.querySelectorAll?.("audio");
      audioElements?.forEach((audio) => {
        audio.muted = !isMusicEnabled;
        const playPromise = audio.play?.();
        if (playPromise?.catch) playPromise.catch(() => {});
      });
    } catch {
      // Bỏ qua nếu iframe chưa sẵn sàng hoặc không truy cập được.
    }
  };

  const toggleMusic = () => {
    const nextEnabled = !isMusicEnabled;
    setIsMusicEnabled(nextEnabled);

    try {
      const iframeWindow = iframeRef.current?.contentWindow;
      const audioElements = iframeWindow?.document?.querySelectorAll?.("audio");
      audioElements?.forEach((audio) => {
        audio.muted = !nextEnabled;

        if (nextEnabled && audio.paused) {
          const playPromise = audio.play?.();
          if (playPromise?.catch) playPromise.catch(() => {});
        }
      });
    } catch {
      // Bỏ qua nếu iframe chưa sẵn sàng hoặc không truy cập được.
    }
  };

  const handleStartTour = () => {
    if (isWelcomeClosing) return;
    startTourAudio();
    setIsWelcomeClosing(true);
    startTimeoutRef.current = setTimeout(() => {
      setIsStarted(true);
    }, 550);
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
            setIsDescOpen(true);
          }
        } else if (contentWindow.tdvplayer?.getById?.('rootPlayer')) {
          // Fallback: cố gắng lấy selectedIndex từ playlist chính của 3DVista
          const rootPlayer = contentWindow.tdvplayer.getById('rootPlayer');
          const mainPlayList = rootPlayer?.mainPlayList;
          if (mainPlayList && typeof mainPlayList.get === 'function') {
            const newIndex = mainPlayList.get('selectedIndex');
            if (typeof newIndex === 'number' && newIndex !== activeIndex) {
              setActiveIndex(newIndex);
              setIsDescOpen(true);
            }
          }
        }
      } catch {
        // Bỏ qua lỗi nếu Iframe chưa load hoặc không có hàm này
      }
    }, 150);

    return () => clearInterval(pollInterval);
  }, [activeIndex]);

  useEffect(() => {
    const handleMessage = (event) => {
      const data = event.data;

      if (!data || typeof data !== 'object') return;

      if (data.type === 'SHOW_HOTSPOT_PREVIEW') {
        setHotspotPreview(data.preview ?? data.payload ?? data.hotspot ?? data);
        return;
      }

      if (data.type === 'HIDE_HOTSPOT_PREVIEW') {
        setHotspotPreview(null);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  useEffect(() => {
    let attempts = 0;
    const interval = setInterval(() => {
      attempts += 1;
      if (attachHotspotPreviewHandlers() || attempts > 40) {
        clearInterval(interval);
      }
    }, 500);

    return () => {
      clearInterval(interval);
      hotspotPreviewCleanupRef.current?.();
    };
    // The iframe bridge intentionally reads the iframe/player objects outside React.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let isMounted = true;

    fetch('/tour360/script.js')
      .then((response) => (response.ok ? response.text() : ''))
      .then((scriptText) => {
        if (!isMounted || !scriptText) return;
        overlayPreviewMapRef.current = parseTourHotspotPreviewMap(scriptText);
      })
      .catch(() => {
        // Preview still falls back to runtime hotspot data if script.js cannot be read.
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    return () => {
      if (startTimeoutRef.current) {
        clearTimeout(startTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black font-sans">
      <PreviewTooltip preview={hotspotPreview} position={tooltipPosition} language={language} />

      <div className="absolute right-4 top-4 z-[70] flex flex-col items-end gap-3">
        <a
          href="https://vju.ac.vn/ttts2026/"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-md bg-[#f26622] px-4 py-2 text-sm font-bold text-white transition-transform hover:scale-105 md:block"
        >
          {getLocalizedText(language, 'admissions')}
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

        {isStarted &&
          activeLocationLabel &&
          LOCATION_DESCRIPTIONS[language]?.[activeLocationLabel] && (
            <div className="relative flex w-full flex-col items-end">
              <div className="group relative">
                <button
                  type="button"
                  onClick={() => setIsDescOpen(!isDescOpen)}
                  className="flex items-center justify-center rounded-md border border-white/10 bg-black/40 px-3 py-2 transition-colors hover:bg-white/3"
                  aria-expanded={isDescOpen}
                  aria-label={language === 'VI' ? 'Mở/đóng giới thiệu' : 'Toggle introduction'}
                >
                  <svg className="h-5 w-5 text-[#1e294d]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <rect x="3" y="3" width="14" height="18" rx="2" ry="2" strokeWidth="1.6" />
                    <path d="M7 8h8M7 12h8M7 16h5" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>

                {/* Tooltip (speech-bubble) */}
                <div className="pointer-events-none absolute right-0 top-full z-50 mt-2 flex items-center justify-center">
                  <div className="relative flex flex-col items-end">
                    <div className="invisible rounded-md bg-[#1e294d] px-3 py-1 text-xs text-white opacity-0 scale-95 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-hover:scale-100">
                      {language === 'VI' ? 'Giới thiệu' : 'Introduction'}
                    </div>
                    <div className="absolute right-2 top-0 -translate-y-1/2 w-3 h-3 rotate-45 bg-[#1e294d] opacity-0 transition-all duration-200 group-hover:opacity-100" />
                  </div>
                </div>
              </div>

              {isDescOpen && (
                <div className="relative mt-2 w-[300px] rounded-xl border border-white/10 bg-[#1e294d]/80 p-5 text-white shadow-2xl backdrop-blur-md md:w-[360px]">
                  <h3 className="mb-3 border-b border-white/10 pb-2 text-base font-bold text-cyan-300">
                    {getLocalizedItemLabel(language, activeLocationLabel)}
                  </h3>
                  <p className="text-justify whitespace-pre-line overflow-y-auto max-h-[60vh] pr-1 text-sm leading-relaxed text-white/90">
                    {LOCATION_DESCRIPTIONS[language][activeLocationLabel]}
                  </p>
                </div>
              )}
            </div>
          )}
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
            src="/imgs/logo.png" 
            alt="VJU Logo"
            className="h-auto max-h-[75px] w-[200px] object-contain ml-4 transition-all"
          />
        </div>
        </div>

        <div className="relative flex-1 overflow-hidden bg-white/70 backdrop-blur-md">
          <div className="border-b border-white/70 px-4 pb-3 pt-4">
            <h2 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-700">
              {getLocalizedText(language, 'menuTitle')}
            </h2>
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
                    {getLocalizedCategory(language, group.category)}
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
                          {getLocalizedItemLabel(language, loc.label)}
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
          <div className="flex h-12 items-center justify-between gap-3 border-t border-white/50 bg-white/80 px-4 text-slate-700 backdrop-blur-md">
            <div className="min-w-0 flex-1">
              <div className="truncate text-[15px] font-semibold leading-none text-slate-800">
                {activeLocationLabel
                  ? getLocalizedItemLabel(language, activeLocationLabel)
                  : getLocalizedText(language, 'defaultLocation')}
              </div>
            </div>

            <button
              type="button"
              onClick={toggleMusic}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                isMusicEnabled
                  ? 'bg-[#1f365f] text-white hover:bg-[#172947]'
                  : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
              }`}
              aria-pressed={isMusicEnabled}
              aria-label={isMusicEnabled ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
            >
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                {isMusicEnabled ? (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9a4 4 0 010 6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.5 6.5a8 8 0 010 11" />
                  </>
                ) : (
                  <>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5L6 9H3v6h3l5 4V5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 9l5 6" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 9l-5 6" />
                  </>
                )}
              </svg>
              <span>{isMusicEnabled ? 'Nhạc bật' : 'Nhạc tắt'}</span>
            </button>
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
          onLoad={attachHotspotPreviewHandlers}
        ></iframe>
      </div>

      {!isStarted && (
        <div
          className={`fixed inset-0 z-[200] flex items-center justify-center bg-cover bg-center transition-all duration-500 ${
            isWelcomeClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"
          }`}
          style={{ backgroundImage: 'url("/imgs/IMG_0396-scaled.jpg")' }}
        >
          <div className="absolute inset-0 bg-[#1e294d]/60"></div>

          <div className="relative z-10 flex w-full max-w-4xl flex-col items-center justify-center px-6 text-center">
            <div className="mb-8 rounded-xl bg-white/95 px-6 py-4 shadow-[0_18px_45px_rgba(15,23,42,0.28)] ring-1 ring-white/70 backdrop-blur-sm">
              <img
                src="/imgs/logo.png"
                alt="VJU Logo"
                className="h-auto w-[220px] max-w-[70vw] object-contain drop-shadow-sm md:w-[280px]"
              />
            </div>

            <p className="text-base font-extrabold uppercase tracking-[0.08em] text-white md:text-2xl">
              CHUYẾN THAM QUAN TRẢI NGHIỆM THỰC TẾ ẢO
            </p>
            <p className="mt-2 text-base font-extrabold uppercase tracking-[0.08em] text-white md:text-2xl">
              TRƯỜNG ĐẠI HỌC VIỆT NHẬT
            </p>

            <button
              type="button"
              onClick={handleStartTour}
              className="group relative mt-10 flex h-28 w-28 items-center justify-center rounded-full border-2 border-cyan-300/80 bg-cyan-500/20 text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.35)] backdrop-blur-sm transition-transform duration-300 hover:scale-105 hover:bg-cyan-400/25 md:h-32 md:w-32"
            >
              <span className="absolute inset-0 rounded-full border border-cyan-300/60 animate-ping"></span>
              <span className="absolute -inset-3 rounded-full border border-cyan-400/40"></span>
              <span className="relative text-sm font-bold tracking-wider text-white md:text-base">
                  {getLocalizedText(language, 'startTour')}
              </span>
            </button>

            <p className="mt-6 text-xs text-white/80 md:text-sm">
                {getLocalizedText(language, 'startTourHint')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
