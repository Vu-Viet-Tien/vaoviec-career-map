// MISSION_007 · Equity Research Analyst tại Chứng khoán An Phát (giả lập).
// Nội dung case dùng chung cho web (/workspace/mission-engine.js) và server (lib/review-simple.js, lib/assistant-core.js).
// Công ty chứng khoán, cổ phiếu GDV, số liệu và mọi người trong case đều là giả lập; không phải khuyến nghị đầu tư thật.
const CASE = {
  id: 'MISSION_007',
  role: 'Equity Research Analyst',
  roleVi: 'Chuyên viên Phân tích Cổ phiếu',
  company: 'Chứng khoán An Phát',
  manager: 'Chị Thu · Trưởng phòng Phân tích',
  managerShort: 'chị Thu',
  deadline: '08:00 sáng mai',
  duration: '15–20 phút',
  ui: {
    slug: 'equity-research-analyst',
    storageKey: 'vaoviec-workspace-mission-007-v1',
    caseName: 'Chứng khoán An Phát · Cập nhật KQKD quý 3 cổ phiếu GDV',
    topic: 'phân tích cổ phiếu',
    tabs: { brief: 'Yêu cầu từ chị Thu', data: 'Báo cáo & dữ liệu', evp: 'Luận điểm chính', post: 'Bản tin cập nhật', plan: 'Định giá & theo dõi', handoff: 'Bàn giao' },
    dataLead: 'Đọc báo cáo tài chính, thuyết minh và dữ liệu ngành trước khi kết luận. Cẩn thận với con số nhìn qua thì rất đẹp.',
    pick: { count: 3, summary: 'Luận điểm', lead: 'Chọn đúng 3 luận điểm quan trọng nhất về kết quả quý 3 của GDV và ghi số liệu làm căn cứ cho từng luận điểm.', placeholder: 'Căn cứ: ví dụ “LNST +87% nhưng 80 tỷ là lãi bán đất kho, loại ra thì lợi nhuận lõi chỉ +5%…”', error: 'Chọn đúng 3 luận điểm và ghi căn cứ tối thiểu {min} ký tự cho mỗi luận điểm.' },
    write: { min: 150, summary: 'Bản tin', preview: 'email', sender: 'Bạn · Phòng Phân tích, Chứng khoán An Phát', quoteSource: 'ir', lead: 'Viết bản tin cập nhật ngắn. Kết luận trước, số liệu sau, nói rõ rủi ro. Bản tin phải được duyệt trước khi đến tay khách hàng.', channelLegend: 'Gửi cho', titleLabel: 'Tiêu đề bản tin', titlePlaceholder: 'Ví dụ: GDV quý 3 — lợi nhuận lõi chỉ +5%, tồn kho là rủi ro chính', bodyLabel: 'Nội dung', bodyPlaceholder: 'Kết luận, 2–3 số liệu then chốt, khuyến nghị và giá trị hợp lý (nếu có), rủi ro chính…', quoteLabel: 'Trích dẫn ban lãnh đạo (không bắt buộc)', error: 'Chọn người nhận, viết tiêu đề và nội dung tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Cơ sở định giá & bước tiếp theo', summaryKpis: 'Chỉ số theo dõi', lead: 'Chọn 1–3 cách định giá hoặc bước tiếp theo, và đúng 2 chỉ số cần theo dõi ở quý tới.', channelLegend: 'Cơ sở định giá & bước tiếp theo', kpiLegend: 'Chỉ số theo dõi', targetLabel: 'Ngưỡng cần chú ý (không bắt buộc)', targetPlaceholder: 'Ví dụ: số ngày tồn kho về dưới 80 ngày thì xem xét nâng khuyến nghị', error: 'Chọn ít nhất 1 mục và đúng 2 chỉ số theo dõi.' }
  },
  companyIntro: [
    'Chứng khoán An Phát là công ty chứng khoán giả lập ở Hà Nội. Phòng Phân tích viết báo cáo về các cổ phiếu niêm yết để môi giới và khách hàng tham khảo.',
    'Bạn theo dõi cổ phiếu GDV của Công ty CP Gia Dụng Việt (giả lập): chuỗi 185 cửa hàng đồ gia dụng, giá cổ phiếu hiện 42.000 đồng, 100 triệu cổ phiếu đang lưu hành.',
    'Chiều nay GDV công bố báo cáo tài chính quý 3. Chị Thu cần bản tin cập nhật trước 8 giờ sáng mai để duyệt.'
  ],
  roleIntro: [
    'Equity Research Analyst nghiên cứu doanh nghiệp niêm yết và ngành, định giá cổ phiếu và trình bày luận điểm đầu tư một cách có căn cứ.',
    'Công việc hằng ngày gồm đọc báo cáo tài chính và thuyết minh, tách các khoản bất thường để thấy "lợi nhuận lõi", so sánh với doanh nghiệp cùng ngành, viết báo cáo và tuân thủ quy định công bố thông tin.',
    'Trong nhiệm vụ này, bạn đọc 6 nguồn dữ liệu, chọn 3 luận điểm chính, viết bản tin cập nhật, chọn cơ sở định giá và chỉ số theo dõi, rồi gửi khuyến nghị cho chị Thu duyệt.'
  ],
  brief: {
    from: 'Chị Thu',
    subject: 'Cập nhật nhanh KQKD quý 3 của GDV',
    body: [
      'Chào em,',
      'GDV vừa công bố KQKD quý 3: lợi nhuận sau thuế tăng 87%. Em đọc báo cáo và viết giúp chị bản tin cập nhật nhé.',
      'Em làm giúp chị: (1) chọn 3 luận điểm chính, có số liệu; (2) viết bản tin ngắn; (3) chọn cơ sở định giá, bước tiếp theo và 2 chỉ số theo dõi; (4) khuyến nghị Mua / Nắm giữ / Bán.',
      'Lưu ý: anh Tuấn bên Môi giới muốn mình ra khuyến nghị MUA mạnh ngay, vì lãi tăng 87% và "nghe nói sắp sáp nhập", để kịp gửi khách sáng mai. Em cứ phân tích theo số liệu.',
      'Gửi chị trước 8:00 sáng mai để chị và bộ phận Tuân thủ duyệt. Cảm ơn em!'
    ]
  },
  sources: [
    {
      id: 'results',
      title: 'Kết quả kinh doanh quý 3/2026',
      meta: 'Báo cáo tài chính GDV · tỷ đồng',
      head: ['Chỉ tiêu', 'Q3/2026', 'Q3/2025', 'Thay đổi'],
      rows: [
        ['Doanh thu thuần', '1.240', '1.050', '+18%'],
        ['Lợi nhuận gộp', '298', '273', '+9%'],
        ['Biên lợi nhuận gộp', '24,0%', '26,0%', '−2,0 điểm %'],
        ['Chi phí bán hàng & quản lý', '190', '170', '+12%'],
        ['Lợi nhuận khác', '85', '2', 'xem thuyết minh'],
        ['Lợi nhuận sau thuế', '146', '78', '+87%']
      ]
    },
    {
      id: 'notes',
      title: 'Thuyết minh báo cáo tài chính',
      meta: 'Trích các mục quan trọng',
      facts: [
        'Lợi nhuận khác gồm 80 tỷ lãi chuyển nhượng quyền sử dụng đất kho cũ ở Bình Dương (khoảng 64 tỷ sau thuế). Đây là giao dịch một lần.',
        'Loại khoản lãi bán đất, lợi nhuận sau thuế "lõi" quý 3 khoảng 82 tỷ, so với 78 tỷ cùng kỳ (+5%).',
        'Số cửa hàng tăng từ 160 lên 185. Doanh thu của các cửa hàng đã mở từ năm trước (cửa hàng hiện hữu) chỉ tăng 3%.',
        'Biên gộp giảm do khuyến mãi xả hàng điều hoà tồn sau mùa nắng ngắn.',
        'Tồn kho cuối quý 620 tỷ, tăng 35% so với cùng kỳ; số ngày tồn kho tăng từ 78 lên 95 ngày.'
      ],
      not: ['Công ty chưa công bố kế hoạch kinh doanh 2027.', 'Không có thông tin chính thức nào về sáp nhập hay bán vốn.', 'Chưa có nghị quyết chia cổ tức năm 2026.']
    },
    {
      id: 'peers',
      title: 'So sánh với doanh nghiệp cùng ngành',
      meta: 'Giá đóng cửa hôm nay · P/E tính trên lợi nhuận 4 quý gần nhất',
      head: ['Cổ phiếu', 'P/E theo LNST báo cáo', 'P/E theo LN lõi', 'Tăng trưởng LN lõi', 'Biên gộp'],
      rows: [
        ['GDV (42.000đ)', '11,1 lần', '13,3 lần', '+5%', '24,0%'],
        ['Đối thủ A', '12,0 lần', '12,0 lần', '+8%', '25,0%'],
        ['Đối thủ B', '16,0 lần', '16,0 lần', '+15%', '23,0%'],
        ['Trung bình ngành', '13,0 lần', '13,0 lần', '+9%', '24,5%']
      ]
    },
    {
      id: 'ir',
      title: 'Ghi chép từ ban lãnh đạo GDV',
      meta: 'Có thể trích dẫn nếu thông tin đã công bố',
      tags: ['Đã công bố công khai', 'Chưa công bố · thông tin nội bộ'],
      quotes: [
        { id: 'public', name: 'Tổng giám đốc GDV', role: 'Buổi gặp nhà đầu tư công khai, có ghi hình', text: 'Năm 2027 chúng tôi ưu tiên giảm tồn kho và chỉ mở thêm khoảng 10 cửa hàng.', consent: true },
        { id: 'private', name: 'Giám đốc tài chính GDV', role: 'Nói riêng qua điện thoại, chưa công bố', text: 'Quý 4 có thể còn một khoản lãi lớn từ bán tài sản nữa.', consent: false }
      ],
      note: 'Theo quy định, không dùng thông tin chưa công bố (thông tin nội bộ) trong báo cáo hay để khuyến nghị giao dịch.'
    },
    {
      id: 'forum',
      title: 'Bài đang lan truyền trên diễn đàn',
      meta: 'Diễn đàn chứng khoán · 3.200 lượt thích',
      posts: [
        'GDV lãi quý 3 tăng 87%!!! Nghe nói sắp sáp nhập với tập đoàn lớn, mục tiêu 80.000. Mua ngay kẻo lỡ 🚀🚀🚀'
      ],
      note: 'Bài không có nguồn. GDV chưa công bố bất kỳ thông tin nào về sáp nhập.'
    },
    {
      id: 'policy',
      title: 'Quy định của phòng Phân tích',
      meta: 'Bộ phận Tuân thủ',
      facts: [
        'Mọi báo cáo phải được Trưởng phòng Phân tích và bộ phận Tuân thủ duyệt trước khi gửi khách hàng hoặc đăng công khai.',
        'Khuyến nghị phải dựa trên thông tin đã công bố và có ghi rõ rủi ro chính.',
        'Không dùng tin đồn; không cam kết lợi nhuận hay giá cổ phiếu chắc chắn.',
        'Chuyên viên đang sở hữu cổ phiếu được phân tích phải công bố trong báo cáo.'
      ]
    }
  ],
  // "Lựa chọn" của bước Chọn: 8 luận điểm. Có luận điểm nghe hấp dẫn nhưng sai hoặc không có căn cứ.
  pillars: [
    { id: 'oneoff', label: 'LNST tăng 87% chủ yếu nhờ khoản lãi bán đất một lần', meta: 'Lợi nhuận lõi' },
    { id: 'margin', label: 'Biên lợi nhuận gộp giảm 2 điểm % do xả hàng tồn', meta: 'Chất lượng tăng trưởng' },
    { id: 'inventory', label: 'Tồn kho tăng 35%, rủi ro phải giảm giá tiếp', meta: 'Rủi ro' },
    { id: 'stores', label: 'Doanh thu tăng nhờ mở cửa hàng mới, cửa hàng hiện hữu chỉ +3%', meta: 'Động lực doanh thu' },
    { id: 'cheap', label: 'P/E chỉ 11 lần, rẻ hơn trung bình ngành', meta: 'Định giá' },
    { id: 'merger', label: 'Sắp sáp nhập với tập đoàn lớn, giá có thể lên 80.000', meta: 'Chất xúc tác' },
    { id: 'growth', label: 'Lợi nhuận tăng trưởng bền vững 87%/năm', meta: 'Triển vọng' },
    { id: 'dividend', label: 'Chắc chắn chia cổ tức tiền mặt 30% năm nay', meta: 'Cổ tức' }
  ],
  // "Kênh" của bước soạn nội dung: người nhận bản tin.
  postChannels: [
    ['thu', 'Chị Thu · Trưởng phòng Phân tích (duyệt trước khi phát hành)'],
    ['clients', 'Danh sách 2.000 khách hàng (gửi ngay tối nay)'],
    ['forum', 'Đăng lên diễn đàn chứng khoán'],
    ['press', 'Phóng viên báo kinh tế đang hỏi']
  ],
  planChannels: [
    ['pecore', 'Định giá theo P/E trên lợi nhuận lõi (loại khoản bất thường), so với ngành'],
    ['scenario', 'Lập 2 kịch bản tồn kho (giải phóng nhanh / chậm) để ra khoảng giá hợp lý'],
    ['ir', 'Gửi câu hỏi chính thức cho bộ phận Quan hệ nhà đầu tư về kế hoạch xử lý tồn kho'],
    ['wait', 'Chờ KQKD quý 4 trước khi thay đổi khuyến nghị'],
    ['rumor', 'Nâng khuyến nghị MUA theo tin sáp nhập trên diễn đàn']
  ],
  kpis: [
    ['invdays', 'Số ngày tồn kho'],
    ['margin', 'Biên lợi nhuận gộp'],
    ['sssg', 'Tăng trưởng doanh thu cửa hàng hiện hữu'],
    ['price', 'Giá cổ phiếu từng ngày'],
    ['buzz', 'Số lượt nhắc tới mã GDV trên diễn đàn']
  ],
  handoff: {
    subject: 'Bản tin cập nhật KQKD quý 3 – GDV',
    question: 'Em khuyến nghị gì với cổ phiếu GDV: Mua, Nắm giữ hay Bán? Căn cứ chính là gì, và rủi ro lớn nhất cần theo dõi là gì?',
    hint: 'Nêu một khuyến nghị, 1–2 căn cứ có số liệu, một rủi ro chính; trả lời luôn đề nghị của bên Môi giới.'
  },
  stages: [['research', 'Đọc báo cáo'], ['create', 'Luận điểm & bản tin'], ['handoff', 'Định giá & bàn giao']],
  assistant: {
    research: {
      title: 'Đọc báo cáo và dữ liệu',
      guided: [
        'Đừng dừng ở con số tăng trưởng lợi nhuận. Đọc thuyết minh để xem lợi nhuận đến từ hoạt động kinh doanh chính hay từ khoản bất thường.',
        '"Lợi nhuận lõi" là lợi nhuận sau khi loại các khoản một lần (bán đất, thanh lý tài sản). Nhà đầu tư định giá chủ yếu dựa trên lợi nhuận lõi.',
        'Xem chất lượng tăng trưởng: doanh thu tăng nhờ mở thêm cửa hàng hay nhờ cửa hàng cũ bán tốt hơn? Biên lợi nhuận và tồn kho thay đổi thế nào?'
      ],
      sample: 'Ghi chú mẫu — LNST 146 tỷ (+87%) nhưng có 64 tỷ lãi bán đất sau thuế; lợi nhuận lõi ~82 tỷ (+5%). Doanh thu +18% chủ yếu nhờ 25 cửa hàng mới, cửa hàng hiện hữu +3%. Biên gộp 24% (giảm 2 điểm %). Tồn kho +35%, 95 ngày. P/E lõi 13,3 lần ≈ ngành 13 lần. Tin sáp nhập không có nguồn.',
      self: [
        'Lợi nhuận tăng 87% đến từ đâu?',
        'Nếu loại khoản một lần, lợi nhuận tăng bao nhiêu?',
        'Thông tin nào bạn KHÔNG được dùng trong báo cáo?'
      ]
    },
    evp: {
      title: 'Chọn 3 luận điểm',
      guided: [
        'Luận điểm tốt trả lời: điều gì thực sự thay đổi trong kinh doanh của GDV quý này, và có lặp lại không.',
        'Mỗi luận điểm cần số liệu cụ thể từ báo cáo: con số, mức thay đổi, nguồn.',
        'Cảnh giác với luận điểm dựa trên tin đồn, thông tin chưa công bố hoặc con số chưa loại khoản bất thường.'
      ],
      sample: 'Ví dụ cho "LNST tăng 87% nhờ khoản một lần" — Căn cứ: lợi nhuận khác 85 tỷ, trong đó 80 tỷ lãi bán đất kho Bình Dương (~64 tỷ sau thuế, không lặp lại). Loại ra, lợi nhuận lõi quý 3 khoảng 82 tỷ, chỉ tăng 5% so với 78 tỷ cùng kỳ.',
      self: [
        'Luận điểm này dựa trên số liệu nào trong báo cáo?',
        'Điều này có lặp lại ở các quý sau không?',
        'Bạn có đang dùng con số chưa loại khoản bất thường không?'
      ]
    },
    post: {
      title: 'Viết bản tin cập nhật',
      guided: [
        'Câu đầu là kết luận và khuyến nghị, ví dụ "Lợi nhuận lõi chỉ +5%, chúng tôi duy trì khuyến nghị Nắm giữ".',
        'Đưa 2–3 số liệu then chốt và ghi rõ rủi ro chính. Không cam kết giá hay lợi nhuận chắc chắn.',
        'Gửi cho trưởng phòng duyệt trước. Chỉ trích dẫn thông tin đã công bố công khai.'
      ],
      sample: 'Tiêu đề: GDV quý 3 — lợi nhuận lõi chỉ +5%, tồn kho là rủi ro chính. Nội dung: LNST quý 3 tăng 87% lên 146 tỷ, nhưng 64 tỷ là lãi bán đất một lần; loại ra, lợi nhuận lõi ~82 tỷ (+5%). Doanh thu +18% chủ yếu nhờ 25 cửa hàng mới, cửa hàng hiện hữu chỉ +3%; biên gộp giảm từ 26% xuống 24% do xả hàng tồn. Tồn kho tăng 35% (95 ngày) là rủi ro chính. Với P/E lõi 13,3 lần, ngang trung bình ngành, chúng tôi đề xuất Nắm giữ và theo dõi số ngày tồn kho quý 4.',
      self: [
        'Người đọc có biết khuyến nghị của bạn ngay ở câu đầu không?',
        'Bạn đã nêu rủi ro chính chưa?',
        'Bản tin có dùng tin đồn hoặc thông tin chưa công bố không?'
      ]
    },
    plan: {
      title: 'Định giá và chỉ số theo dõi',
      guided: [
        'Định giá nên dựa trên lợi nhuận lõi. P/E tính trên lợi nhuận có khoản bất thường làm cổ phiếu trông rẻ hơn thực tế.',
        'Kịch bản giúp thể hiện sự không chắc chắn: tồn kho được giải phóng nhanh hay chậm sẽ ảnh hưởng biên lợi nhuận khác nhau.',
        'Chỉ số theo dõi nên gắn với rủi ro chính: số ngày tồn kho, biên gộp, doanh thu cửa hàng hiện hữu. Giá hằng ngày hay độ "hot" trên diễn đàn không nói lên sức khoẻ doanh nghiệp.'
      ],
      sample: 'Cơ sở: P/E trên lợi nhuận lõi so với ngành; 2 kịch bản tồn kho. Chỉ số: số ngày tồn kho (về dưới 80 ngày là tín hiệu tốt) và biên lợi nhuận gộp (phục hồi trên 25%).',
      self: [
        'P/E 11 lần và 13,3 lần khác nhau ở điểm nào?',
        'Rủi ro chính bạn đã nêu được đo bằng chỉ số nào?',
        'Bước tiếp theo nào dựa trên thông tin công khai?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho chị Thu',
      guided: [
        'Nêu rõ một khuyến nghị: Mua, Nắm giữ hoặc Bán.',
        'Kèm 1–2 căn cứ có số liệu và một rủi ro chính cần theo dõi.',
        'Trả lời đề nghị của bên Môi giới (MUA mạnh vì lãi 87% và tin sáp nhập) dựa trên dữ liệu và quy định.'
      ],
      sample: 'Em đề xuất Nắm giữ. Lợi nhuận lõi quý 3 chỉ +5% vì 64 tỷ là lãi bán đất một lần, và P/E lõi 13,3 lần đã ngang ngành nên cổ phiếu không rẻ. Rủi ro chính là tồn kho tăng 35% (95 ngày), có thể làm biên gộp giảm tiếp. Em không đề xuất MUA mạnh vì mức tăng 87% không phản ánh kinh doanh cốt lõi, còn tin sáp nhập không có nguồn và quy định không cho dùng tin đồn.',
      self: [
        'Khuyến nghị của bạn là gì, dựa trên số liệu nào?',
        'Rủi ro lớn nhất là gì và đo bằng chỉ số nào?',
        'Bạn trả lời đề nghị MUA mạnh của bên Môi giới thế nào?'
      ]
    },
    feedback: {
      title: 'Đọc nhận xét và sửa bài',
      guided: [
        'Đọc từng tiêu chí chưa đạt và phần gợi ý. Sửa đúng chỗ được góp ý trước khi nộp lại.',
        'Mỗi lần nộp lại là một phiên bản mới, bạn có thể so sánh trong Hồ sơ trải nghiệm.'
      ],
      self: [
        'Tiêu chí nào chưa đạt và số liệu nào giúp bạn sửa?',
        'Nếu là chị Thu, bạn có duyệt bản tin này để gửi khách hàng không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  report(p) {
    const notes = [];
    const has = id => p.pillars.some(x => x.id === id);
    if (has('cheap')) notes.push('P/E 11 lần tính trên lợi nhuận có 64 tỷ lãi bán đất một lần. Theo lợi nhuận lõi, P/E là 13,3 lần, ngang trung bình ngành 13 lần.');
    if (has('merger')) notes.push('Tin sáp nhập chỉ có trên diễn đàn, không có nguồn; GDV chưa công bố thông tin này. Quy định không cho dùng tin đồn.');
    if (has('growth')) notes.push('Mức tăng 87% không bền vững: loại khoản lãi bán đất, lợi nhuận lõi chỉ tăng khoảng 5%.');
    if (has('dividend')) notes.push('Chưa có nghị quyết chia cổ tức năm 2026; không thể khẳng định "chắc chắn".');
    if (!has('oneoff')) notes.push('Nên nêu rõ khoản lãi bán đất 80 tỷ (khoảng 64 tỷ sau thuế) — đây là lý do chính khiến lợi nhuận tăng 87%.');
    if (['clients', 'forum', 'press'].includes(p.post.channel)) notes.push('Báo cáo phải được Trưởng phòng và bộ phận Tuân thủ duyệt trước khi gửi khách hàng, đăng công khai hay trả lời báo chí.');
    if (p.post.quote === 'private') notes.push('Lời của Giám đốc tài chính qua điện thoại là thông tin chưa công bố (nội bộ); không được dùng trong báo cáo.');
    const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
    if (/sáp nhập|80\.?000/.test(text) && !/tin đồn|không có nguồn|chưa công bố/.test(text)) notes.push('Bản tin nhắc tới tin sáp nhập hoặc giá 80.000 như một căn cứ, trong khi đây chỉ là tin đồn.');
    if (/chắc chắn|cam kết|đảm bảo/.test(text)) notes.push('Không cam kết lợi nhuận hay giá cổ phiếu chắc chắn.');
    if (!/rủi ro|tồn kho/.test(text)) notes.push('Bản tin chưa nêu rủi ro chính (ví dụ tồn kho tăng 35%).');
    if (p.plan.channels.includes('rumor')) notes.push('Nâng khuyến nghị theo tin đồn trên diễn đàn vi phạm quy định của phòng Phân tích.');
    if (p.plan.kpis.every(k => ['price', 'buzz'].includes(k))) notes.push('Hai chỉ số bạn chọn không phản ánh sức khoẻ doanh nghiệp. Hãy theo dõi số ngày tồn kho, biên gộp hoặc doanh thu cửa hàng hiện hữu.');
    return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
  },
  cvLine: 'Phân tích báo cáo tài chính quý của một doanh nghiệp bán lẻ niêm yết: tách khoản lợi nhuận bất thường để tính lợi nhuận lõi, so sánh định giá với ngành, viết bản tin cập nhật có khuyến nghị và rủi ro theo quy định tuân thủ (dự án mô phỏng VAOVIEC.).'
};
