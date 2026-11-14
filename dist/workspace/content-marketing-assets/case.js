// MISSION_004 · Content Marketing Executive tại NOVA Commerce.
// Nội dung case dùng chung cho web (/workspace/mission-engine.js) và server (lib/review-simple.js, lib/assistant-core.js).
// Mọi sản phẩm, khách hàng và số liệu đều là giả lập.
const CASE = {
  id: 'MISSION_004',
  role: 'Content Marketing Executive',
  roleVi: 'Chuyên viên Marketing Nội dung',
  company: 'NOVA Commerce',
  manager: 'Chị Hằng · Trưởng nhóm Content',
  managerShort: 'chị Hằng',
  deadline: '17:00 thứ Năm',
  duration: '15–20 phút',
  ui: {
    slug: 'content-marketing-executive',
    storageKey: 'vaoviec-workspace-mission-004-v1',
    caseName: 'NOVA Commerce · Ra mắt nồi chiên AirFry 5L',
    topic: 'marketing nội dung',
    tabs: { brief: 'Brief từ chị Hằng', data: 'Dữ liệu nội dung', evp: 'Chọn chủ đề', post: 'Bài đăng đầu tiên', plan: 'Kênh & chỉ số', handoff: 'Bàn giao' },
    dataLead: 'Mở từng tài liệu để biết khách đang tìm gì và nội dung nào từng bán được hàng.',
    pick: { count: 3, summary: 'Chủ đề', lead: 'Chọn đúng 3 chủ đề cho chuỗi nội dung tháng 12 và ghi căn cứ cho từng chủ đề (lượt tìm kiếm, câu hỏi của khách, hiệu quả bài cũ).', placeholder: 'Căn cứ: ví dụ “22.000 lượt tìm/tháng, video công thức có 74 đơn…”', error: 'Chọn đúng 3 chủ đề và ghi căn cứ tối thiểu {min} ký tự cho mỗi chủ đề.' },
    write: { min: 150, summary: 'Bài đăng', preview: 'social', sender: 'NOVA Commerce · Nhà bếp gọn', quoteSource: 'reviews', lead: 'Viết bài đầu tiên của chuỗi cho một kênh. Bên phải là bản xem trước như khi đăng thật.', channelLegend: 'Đăng trên kênh', titleLabel: 'Tiêu đề / câu mở đầu', titlePlaceholder: 'Ví dụ: Cánh gà giòn trong 15 phút, không cần một giọt dầu chiên ngập', bodyLabel: 'Nội dung', bodyPlaceholder: 'Vấn đề khách gặp, cách làm cụ thể, thông tin sản phẩm đúng sự thật, lời kêu gọi hành động…', quoteLabel: 'Trích đánh giá của khách (không bắt buộc)', error: 'Chọn kênh, viết tiêu đề và nội dung tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Kênh phân phối', summaryKpis: 'Chỉ số', lead: 'Chọn 1–3 kênh phân phối chuỗi nội dung và đúng 2 chỉ số để biết nội dung có giúp bán hàng không.', channelLegend: 'Kênh phân phối', kpiLegend: 'Chỉ số đo', targetLabel: 'Mục tiêu cụ thể (không bắt buộc)', targetPlaceholder: 'Ví dụ: 3.000 lượt nhấp vào trang sản phẩm, 120 đơn từ nội dung trong tháng 12', error: 'Chọn ít nhất 1 kênh và đúng 2 chỉ số đo.' }
  },
  companyIntro: [
    'NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập ở Hà Nội, bán đồ gia dụng nhỏ qua website, fanpage và sàn thương mại điện tử.',
    'Tháng 12, NOVA ra mắt nồi chiên không dầu NOVA AirFry 5L, giá 1.290.000 đồng, ưu đãi 1.090.000 đồng đến hết 31/12.',
    'Mục tiêu của nhóm Content: dùng nội dung hữu ích để đưa người xem tới trang sản phẩm và bán 300 nồi trong tháng 12, không phụ thuộc quảng cáo trả tiền.'
  ],
  roleIntro: [
    'Content Marketing là tạo nội dung hữu ích (bài viết, video, hướng dẫn) để khách tìm đến thương hiệu, tin tưởng rồi mới mua.',
    'Công việc hằng ngày gồm đọc dữ liệu tìm kiếm và câu hỏi của khách, lên lịch nội dung, viết bài theo từng kênh, kiểm tra thông tin sản phẩm cho đúng và đo hiệu quả.',
    'Trong nhiệm vụ này, bạn chọn 3 chủ đề cho chuỗi nội dung, viết bài đầu tiên, chọn kênh phân phối và 2 chỉ số, rồi gửi đề xuất cho chị Hằng.'
  ],
  brief: {
    from: 'Chị Hằng',
    subject: 'Chuỗi nội dung ra mắt nồi chiên AirFry 5L',
    body: [
      'Chào em,',
      'Tháng 12 mình ra mắt nồi chiên AirFry 5L. Chị cần một chuỗi nội dung giúp khách hiểu sản phẩm và bấm vào trang mua, mục tiêu 300 nồi trong tháng.',
      'Em làm giúp chị: (1) chọn 3 chủ đề cho chuỗi, kèm căn cứ; (2) viết bài đầu tiên cho một kênh; (3) chọn kênh phân phối và 2 chỉ số để đo.',
      'Lưu ý: anh Đức bên Kinh doanh muốn bắt trend iPhone 17 cho nhiều lượt xem, và ghi "giảm 90% dầu mỡ, ăn thả ga không lo béo" giống bài của đối thủ. Em cân nhắc giúp chị nhé.',
      'Gửi chị trước 17:00 thứ Năm. Cảm ơn em!'
    ]
  },
  sources: [
    {
      id: 'keywords',
      title: 'Từ khoá khách đang tìm',
      meta: 'Công cụ từ khoá · trung bình tháng, Việt Nam',
      head: ['Từ khoá', 'Lượt tìm/tháng', 'Ghi chú'],
      rows: [
        ['món ngon nồi chiên không dầu', '22.000', 'Tìm công thức, tăng mạnh cuối năm'],
        ['nồi chiên không dầu loại nào tốt', '18.000', 'Đang cân nhắc mua, so sánh dung tích, công suất'],
        ['nồi chiên không dầu có độc không', '9.500', 'Lo ngại lớp chống dính, giấy bạc'],
        ['cách vệ sinh nồi chiên không dầu', '6.200', 'Người đã mua hoặc sắp mua'],
        ['nồi chiên 5 lít cho mấy người', '3.100', 'Chọn dung tích'],
        ['nồi chiên không dầu giảm cân', '2.400', 'Kỳ vọng sức khoẻ, dễ bị quảng cáo lố'],
        ['iphone 17 giá', '450.000', 'Không liên quan sản phẩm']
      ]
    },
    {
      id: 'questions',
      title: 'Câu hỏi của khách trên fanpage',
      meta: '120 tin nhắn và bình luận về nồi chiên · tháng 10–11',
      total: 120,
      items: [
        ['Khách hỏi gì nhiều nhất', [
          ['Dung tích bao nhiêu thì đủ cho nhà mình', 41],
          ['Có an toàn không, có cần lót giấy bạc', 35],
          ['Nấu được những món gì', 30],
          ['Vệ sinh có khó không', 28],
          ['Bảo hành bao lâu', 22]
        ]]
      ],
      note: 'Một tin nhắn có thể hỏi nhiều ý. Số bên phải là số tin nhắn có câu hỏi đó (trên 120).'
    },
    {
      id: 'product',
      title: 'Thông số AirFry 5L',
      meta: 'Đã được nhóm Sản phẩm và Pháp chế xác nhận',
      facts: [
        'Dung tích 5 lít, phù hợp gia đình 3–5 người. Công suất 1.500W.',
        'Lòng nồi chống dính phủ ceramic, không chứa PFOA (có giấy chứng nhận của nhà cung cấp).',
        'Khay và rổ tháo rời, rửa được bằng máy rửa bát.',
        'Bảo hành 12 tháng, đổi mới trong 7 ngày nếu lỗi nhà sản xuất.',
        'Giá 1.290.000 đồng, ưu đãi 1.090.000 đồng đến hết 31/12. Giao miễn phí nội thành Hà Nội và TP.HCM.'
      ],
      not: ['Chưa có kiểm nghiệm nào về "giảm 90% dầu mỡ".', 'Không có chứng nhận y tế hay công dụng giảm cân.', 'Chưa có bài so sánh trực tiếp với thương hiệu khác.']
    },
    {
      id: 'performance',
      title: 'Hiệu quả các bài cũ của NOVA',
      meta: 'Fanpage, TikTok và blog · 6 tháng gần nhất',
      head: ['Loại bài', 'Tiếp cận', 'Nhấp vào sản phẩm', 'Đơn hàng'],
      rows: [
        ['Video công thức 60 giây', '48.000', '1.900', '74'],
        ['Bài hướng dẫn chọn mua (blog)', '9.000', '1.300', '61'],
        ['Bài hướng dẫn vệ sinh, bảo quản', '12.000', '520', '18'],
        ['Minigame "like & share nhận quà"', '85.000', '310', '5'],
        ['Ảnh meme bắt trend không liên quan', '120.000', '240', '3']
      ]
    },
    {
      id: 'channels',
      title: 'Kênh của NOVA',
      meta: 'Số liệu tháng 10',
      facts: [
        'Fanpage NOVA: 52.000 người theo dõi, bài có video được xem nhiều gấp 3 lần bài ảnh.',
        'TikTok NOVA: 8.000 người theo dõi, video công thức trung bình 15.000 lượt xem.',
        'Blog NOVA: 30% lượt truy cập website đến từ Google; bài hướng dẫn chọn mua giữ vị trí top 5 trong nhiều tháng.',
        'Zalo OA: 6.000 khách cũ đã đồng ý nhận tin, tỷ lệ nhấp trung bình 8%.',
        'Nhóm Facebook "Hội yêu bếp" (200.000 thành viên): nội quy cấm thương hiệu tự đăng bài bán hàng, admin xoá bài và chặn trang vi phạm.'
      ],
      not: ['Tháng 12 không có ngân sách thuê KOL hay chạy quảng cáo trả tiền cho chuỗi này.']
    },
    {
      id: 'reviews',
      title: 'Đánh giá của khách dùng thử',
      meta: '20 khách dùng thử bản mẫu tháng 10',
      tags: ['Đã đồng ý cho dùng', 'Chưa đồng ý'],
      quotes: [
        { id: 'huong', name: 'Chị Hương', role: 'Long Biên, nhà 4 người', text: 'Nướng cánh gà 15 phút là giòn, rửa khay chưa tới 2 phút.', consent: true },
        { id: 'trang', name: 'Chị Trang', role: 'Cầu Giấy, nhà 3 người', text: 'Nồi 5 lít đủ làm bữa tối cho cả nhà một lần, không phải chia mẻ.', consent: true },
        { id: 'minh', name: 'Anh Minh', role: 'Hà Đông', text: 'Từ ngày dùng nồi tôi giảm được 5kg.', consent: false }
      ],
      note: 'Chị Hương và chị Trang đã ký đồng ý cho NOVA dùng tên và nhận xét. Anh Minh chưa đồng ý, và nhận xét "giảm 5kg" là trải nghiệm cá nhân, không phải công dụng của sản phẩm.'
    },
    {
      id: 'competitor',
      title: 'Bài của đối thủ bị phản ứng',
      meta: 'Fanpage một thương hiệu nồi chiên khác · tháng 9',
      posts: [
        'Nồi chiên XYZ – GIẢM 90% DẦU MỠ, ăn thả ga không lo béo, bác sĩ khuyên dùng!!! Inbox ngay nhận giá sốc 🔥🔥🔥'
      ],
      note: 'Quảng cáo bị Facebook từ chối vì tuyên bố sức khoẻ không có căn cứ. Nhiều bình luận chê "quảng cáo lố", hỏi "bác sĩ nào?".'
    }
  ],
  // "Lựa chọn" của bước Chọn: 8 chủ đề. Có chủ đề nhiều lượt xem nhưng không bán hàng, hoặc sai sự thật.
  pillars: [
    { id: 'recipes', label: 'Công thức món ngon 15 phút với nồi chiên', meta: 'Video và bài công thức theo món' },
    { id: 'buying', label: 'Hướng dẫn chọn nồi chiên: dung tích, công suất', meta: 'Bài cho người đang cân nhắc mua' },
    { id: 'safety', label: 'Giải đáp: nồi chiên có an toàn không, có cần giấy bạc', meta: 'Trả lời lo ngại về lớp chống dính' },
    { id: 'cleaning', label: 'Mẹo vệ sinh nồi chiên trong 2 phút', meta: 'Hướng dẫn dùng và bảo quản' },
    { id: 'diet', label: 'Ăn thả ga không lo béo – giảm 90% dầu mỡ', meta: 'Nhấn mạnh công dụng sức khoẻ' },
    { id: 'iphone', label: 'Bắt trend iPhone 17', meta: 'Ảnh meme theo chủ đề đang hot' },
    { id: 'compare', label: 'So sánh, chỉ ra điểm yếu nồi chiên XYZ', meta: 'Bài so sánh với đối thủ' },
    { id: 'minigame', label: 'Minigame like & share nhận nồi miễn phí', meta: 'Tăng tương tác nhanh' }
  ],
  // "Kênh" của bước soạn nội dung.
  postChannels: [
    ['fanpage', 'Fanpage NOVA Commerce (52.000 người theo dõi)'],
    ['tiktok', 'TikTok NOVA (chú thích cho video 60 giây)'],
    ['blog', 'Blog NOVA (bài viết cho người tìm trên Google)'],
    ['group', 'Nhóm Facebook "Hội yêu bếp" (200.000 thành viên)']
  ],
  planChannels: [
    ['fanpage', 'Fanpage NOVA: 3 bài/tuần, ưu tiên video'],
    ['tiktok', 'TikTok NOVA: video công thức 60 giây'],
    ['blog', 'Blog NOVA: bài hướng dẫn tối ưu tìm kiếm Google'],
    ['zalo', 'Zalo OA: gửi 6.000 khách cũ kèm ưu đãi đến 31/12'],
    ['groups', 'Đăng bài bán hàng vào 20 nhóm nấu ăn mỗi ngày']
  ],
  kpis: [
    ['clicks', 'Lượt nhấp từ nội dung vào trang sản phẩm'],
    ['orders', 'Số đơn hàng đến từ nội dung (gắn mã theo dõi)'],
    ['saves', 'Lượt lưu và chia sẻ bài'],
    ['reach', 'Lượt tiếp cận'],
    ['likes', 'Lượt thích và người theo dõi mới']
  ],
  handoff: {
    subject: 'Đề xuất chuỗi nội dung tháng 12',
    question: 'Nếu tháng 12 chỉ làm được một chủ đề, em chọn chủ đề nào? Vì sao, và em sẽ đo hiệu quả thế nào?',
    hint: 'Nêu một chủ đề, căn cứ từ dữ liệu, và chỉ số có con số mục tiêu.'
  },
  stages: [['research', 'Nghiên cứu'], ['create', 'Chủ đề & bài đăng'], ['handoff', 'Kênh & bàn giao']],
  assistant: {
    research: {
      title: 'Đọc dữ liệu nội dung',
      guided: [
        'Nội dung tốt bắt đầu từ điều khách đang tìm và đang hỏi. Xem bảng từ khoá và câu hỏi trên fanpage để biết khách quan tâm gì.',
        'Lượt tiếp cận cao chưa chắc bán được hàng. So sánh cột "Nhấp vào sản phẩm" và "Đơn hàng" trong bảng hiệu quả bài cũ.',
        'Đọc kỹ thông số đã được Pháp chế xác nhận: chỉ được nói điều có căn cứ, đặc biệt là công dụng sức khoẻ.'
      ],
      sample: 'Ghi chú mẫu — Khách tìm nhiều: công thức (22.000), chọn mua (18.000), an toàn (9.500). Fanpage hỏi nhiều: dung tích (41/120), an toàn (35/120). Bài bán được hàng: video công thức (74 đơn), hướng dẫn chọn mua (61 đơn). Không nói: giảm 90% dầu mỡ, giảm cân (không có kiểm nghiệm).',
      self: [
        'Từ khoá nào vừa nhiều lượt tìm vừa liên quan tới việc mua nồi chiên?',
        'Loại bài nào tiếp cận nhiều nhưng gần như không ra đơn?',
        'Điều gì bạn KHÔNG được phép nói về sản phẩm?'
      ]
    },
    evp: {
      title: 'Chọn 3 chủ đề',
      guided: [
        'Một chủ đề tốt trả lời đúng điều khách đang tìm hoặc đang lo, và dẫn tự nhiên tới sản phẩm.',
        'Kết hợp chủ đề cho người mới tìm hiểu (công thức) và người sắp mua (chọn dung tích, an toàn) để chuỗi dẫn khách từ quan tâm tới quyết định.',
        'Ghi căn cứ bằng con số: lượt tìm, số câu hỏi, số đơn từ bài cũ. Tránh lý do chung như "chủ đề hot".'
      ],
      sample: 'Ví dụ cho chủ đề Giải đáp an toàn — Căn cứ: 9.500 lượt tìm "có độc không" và 35/120 tin nhắn hỏi về an toàn, giấy bạc; NOVA có chứng nhận lòng nồi không chứa PFOA nên trả lời được bằng thông tin thật.',
      self: [
        'Chủ đề này trả lời câu hỏi nào khách đã hỏi?',
        'Chủ đề này có đưa người xem tới gần quyết định mua không?',
        'Bạn có đủ thông tin thật để làm chủ đề này không?'
      ]
    },
    post: {
      title: 'Viết bài đầu tiên',
      guided: [
        'Câu mở đầu nói ngay lợi ích hoặc vấn đề khách gặp, ví dụ "cánh gà giòn trong 15 phút". Người xem lướt rất nhanh.',
        'Viết hợp kênh: TikTok ngắn và vui, blog đầy đủ và có tiêu đề chứa từ khoá, fanpage vừa phải và có ảnh/video.',
        'Chỉ nêu thông tin đã xác nhận (5 lít, 3–5 người, lòng nồi không PFOA, bảo hành 12 tháng). Kết bằng lời kêu gọi rõ: xem công thức, xem sản phẩm, nhận ưu đãi đến 31/12.'
      ],
      sample: 'Tiêu đề: Cánh gà giòn rụm sau 15 phút, rửa nồi chưa tới 2 phút. Nội dung: Tối nay ăn gì mà không muốn đứng bếp lâu? Ướp cánh gà với tỏi, mật ong, nước mắm 15 phút, cho vào AirFry 5L ở 200°C trong 15 phút, lật một lần là giòn đều. Nồi 5 lít đủ cho nhà 3–5 người ăn một lần, lòng nồi phủ ceramic không chứa PFOA nên không cần lót giấy bạc, khay rửa được bằng máy rửa bát. Ưu đãi 1.090.000đ đến 31/12, xem chi tiết ở link sản phẩm nhé!',
      self: [
        'Người lướt qua có hiểu bài nói gì chỉ sau câu đầu tiên không?',
        'Mọi thông tin về sản phẩm trong bài đã được xác nhận chưa?',
        'Đọc xong, người xem nên làm gì tiếp theo?'
      ]
    },
    plan: {
      title: 'Chọn kênh và chỉ số',
      guided: [
        'Chọn kênh mà khách mục tiêu đang ở và NOVA làm tốt: dữ liệu cho thấy video công thức trên fanpage/TikTok và bài hướng dẫn trên blog ra nhiều đơn nhất.',
        'Tôn trọng nội quy cộng đồng: đăng bài bán hàng vào nhóm cấm quảng cáo sẽ bị xoá và làm xấu hình ảnh thương hiệu.',
        'Mục tiêu là bán 300 nồi, nên cần ít nhất một chỉ số gắn với bán hàng: lượt nhấp vào trang sản phẩm hoặc số đơn từ nội dung. Lượt thích, tiếp cận chỉ là chỉ số phụ.'
      ],
      sample: 'Kênh: Fanpage (video công thức), TikTok, Blog (bài chọn mua và an toàn). Chỉ số: lượt nhấp vào trang sản phẩm (mục tiêu 3.000 trong tháng 12) và số đơn từ nội dung có mã theo dõi (mục tiêu 120).',
      self: [
        'Kênh nào từng mang lại nhiều đơn nhất cho NOVA?',
        'Kênh nào có rủi ro vi phạm nội quy hoặc làm phiền khách?',
        'Nếu bài có 100.000 lượt tiếp cận mà không ai bấm vào sản phẩm, bạn có coi là thành công không?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho chị Hằng',
      guided: [
        'Khuyến nghị tốt nêu một chủ đề, dữ liệu cho thấy nó hiệu quả, và cách đo có con số mục tiêu.',
        'Trả lời luôn hai gợi ý của anh Đức (trend iPhone 17 và "giảm 90% dầu mỡ") một cách có căn cứ, kèm phương án thay thế.',
        'Viết ngắn gọn để chị Hằng quyết định nhanh.'
      ],
      sample: 'Em chọn chủ đề công thức món ngon: 22.000 lượt tìm/tháng và video công thức từng mang về 74 đơn, nhiều nhất trong các loại bài. Em sẽ đo bằng lượt nhấp vào trang sản phẩm (mục tiêu 3.000) và số đơn có mã theo dõi (mục tiêu 120). Em không bắt trend iPhone vì ảnh meme có 120.000 tiếp cận nhưng chỉ 3 đơn, và không ghi "giảm 90% dầu mỡ" vì chưa có kiểm nghiệm, bài đối thủ đã bị từ chối quảng cáo.',
      self: [
        'Chủ đề nào có bằng chứng bán hàng tốt nhất?',
        'Bạn đo hiệu quả bằng chỉ số nào, mục tiêu bao nhiêu?',
        'Bạn trả lời hai gợi ý của anh Đức thế nào?'
      ]
    },
    feedback: {
      title: 'Đọc nhận xét và sửa bài',
      guided: [
        'Đọc từng tiêu chí chưa đạt và phần gợi ý. Sửa đúng chỗ được góp ý trước khi nộp lại.',
        'Mỗi lần nộp lại là một phiên bản mới, bạn có thể so sánh trong Hồ sơ trải nghiệm.'
      ],
      self: [
        'Tiêu chí nào chưa đạt và dữ liệu nào giúp bạn sửa?',
        'Nếu là chị Hằng, bạn có duyệt đăng bài này ngay không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  report(p) {
    const notes = [];
    const has = id => p.pillars.some(x => x.id === id);
    if (has('diet')) notes.push('Chủ đề "giảm 90% dầu mỡ, không lo béo" chưa có kiểm nghiệm hay chứng nhận nào; bài tương tự của đối thủ đã bị từ chối quảng cáo.');
    if (has('iphone')) notes.push('Trend iPhone 17 không liên quan sản phẩm. Ảnh meme bắt trend có 120.000 tiếp cận nhưng chỉ 3 đơn.');
    if (has('compare')) notes.push('NOVA chưa có dữ liệu so sánh trực tiếp với đối thủ; chỉ ra điểm yếu của thương hiệu khác khi không có căn cứ là rủi ro.');
    if (has('minigame')) notes.push('Minigame like & share có 85.000 tiếp cận nhưng chỉ 5 đơn. Chủ đề này khó giúp đạt mục tiêu 300 nồi.');
    if (p.post.channel === 'group') notes.push('Nhóm "Hội yêu bếp" cấm thương hiệu tự đăng bài bán hàng; bài sẽ bị xoá và trang có thể bị chặn.');
    const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
    if (/90\s*%|giảm cân|không lo béo|thả ga|bác sĩ|chữa/.test(text)) notes.push('Bài có tuyên bố sức khoẻ chưa được xác nhận (giảm dầu mỡ theo %, giảm cân, bác sĩ khuyên dùng). Chỉ dùng thông số đã được Pháp chế duyệt.');
    if (/rẻ nhất|tốt nhất thị trường|số 1/.test(text)) notes.push('Bài so sánh tuyệt đối ("rẻ nhất", "tốt nhất", "số 1") mà không có căn cứ.');
    if (!/link|xem|đặt|mua|ưu đãi|inbox|nhắn/.test(text)) notes.push('Bài chưa có lời kêu gọi hành động rõ (xem sản phẩm, nhận ưu đãi đến 31/12…).');
    if (p.post.quote === 'minh') notes.push('Anh Minh chưa đồng ý cho dùng nhận xét, và "giảm 5kg" là trải nghiệm cá nhân, không phải công dụng sản phẩm.');
    if (p.plan.channels.includes('groups')) notes.push('Đăng bài bán hàng vào 20 nhóm mỗi ngày dễ bị coi là spam và vi phạm nội quy nhóm.');
    if (p.plan.kpis.every(k => ['reach', 'likes', 'saves'].includes(k))) notes.push('Hai chỉ số bạn chọn chỉ đo mức độ chú ý. Mục tiêu là bán 300 nồi, hãy đo ít nhất lượt nhấp vào sản phẩm hoặc số đơn.');
    return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
  },
  cvLine: 'Phân tích dữ liệu từ khoá, câu hỏi khách hàng và hiệu quả nội dung cũ để chọn 3 chủ đề cho chuỗi nội dung ra mắt sản phẩm; viết bài đăng đúng thông tin đã xác nhận và đề xuất kênh phân phối kèm chỉ số bán hàng (dự án mô phỏng VAOVIEC.).'
};
