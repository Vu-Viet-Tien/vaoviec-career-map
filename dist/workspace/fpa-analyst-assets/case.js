// MISSION_006 · FP&A Analyst tại NOVA Commerce.
// Nội dung case dùng chung cho web (/workspace/mission-engine.js) và server (lib/review-simple.js, lib/assistant-core.js).
// Mọi số liệu đều là giả lập.
const CASE = {
  id: 'MISSION_006',
  role: 'FP&A Analyst',
  roleVi: 'Chuyên viên Hoạch định và Phân tích Tài chính',
  company: 'NOVA Commerce',
  manager: 'Chị Vân · Giám đốc Tài chính',
  managerShort: 'chị Vân',
  deadline: '10:00 thứ Tư',
  duration: '15–20 phút',
  ui: {
    slug: 'fp-a-analyst',
    storageKey: 'vaoviec-workspace-mission-006-v1',
    caseName: 'NOVA Commerce · Phân tích chênh lệch ngân sách tháng 10',
    topic: 'hoạch định và phân tích tài chính',
    tabs: { brief: 'Yêu cầu từ chị Vân', data: 'Số liệu tài chính', evp: 'Chênh lệch chính', post: 'Bản ghi nhớ', plan: 'Hành động & chỉ số', handoff: 'Bàn giao' },
    dataLead: 'Mở từng bảng và ghi chú để hiểu vì sao kết quả tháng 10 lệch khỏi ngân sách.',
    pick: { count: 3, summary: 'Chênh lệch', lead: 'Chọn đúng 3 khoản chênh lệch quan trọng nhất cần báo cáo và giải thích nguyên nhân cho từng khoản (có lặp lại ở các tháng sau không?).', placeholder: 'Giải thích: ví dụ “Vượt 115 triệu vì đối tác tăng giá 25%/đơn từ 1/10, sẽ lặp lại…”', error: 'Chọn đúng 3 khoản và ghi giải thích tối thiểu {min} ký tự cho mỗi khoản.' },
    write: { min: 150, summary: 'Bản ghi nhớ', preview: 'email', sender: 'Bạn · FP&A, NOVA Commerce', quoteSource: 'files', lead: 'Viết bản ghi nhớ ngắn gửi qua email. Người đọc cần biết: lệch bao nhiêu, vì sao, có lặp lại không, đề xuất gì.', channelLegend: 'Gửi cho', titleLabel: 'Tiêu đề', titlePlaceholder: 'Ví dụ: Chênh lệch tháng 10 — lợi nhuận thiếu 370 triệu, vận chuyển là rủi ro lặp lại', bodyLabel: 'Nội dung', bodyPlaceholder: 'Kết luận, 3 khoản chênh lệch kèm số tiền và nguyên nhân, khoản nào lặp lại, đề xuất…', quoteLabel: 'Đính kèm (không bắt buộc)', error: 'Chọn người nhận, viết tiêu đề và nội dung tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Hành động', summaryKpis: 'Chỉ số', lead: 'Chọn 1–3 hành động đề xuất và đúng 2 chỉ số để theo dõi lợi nhuận quý IV.', channelLegend: 'Hành động đề xuất', kpiLegend: 'Chỉ số theo dõi', targetLabel: 'Mục tiêu cụ thể (không bắt buộc)', targetPlaceholder: 'Ví dụ: đưa chi phí vận chuyển về dưới 38.000đ/đơn từ tháng 12', error: 'Chọn ít nhất 1 hành động và đúng 2 chỉ số.' }
  },
  companyIntro: [
    'NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập ở Hà Nội, bán đồ gia dụng nhỏ qua website, app và sàn thương mại điện tử.',
    'Mỗi tháng, phòng Tài chính so sánh kết quả thực tế với ngân sách để ban giám đốc biết công ty đang đi đúng kế hoạch hay không.',
    'Tháng 10, công ty lỗ hoạt động 20 triệu trong khi ngân sách dự kiến lãi 350 triệu. Bạn là FP&A Analyst mới, được giao phân tích chênh lệch trước cuộc họp ban giám đốc.'
  ],
  roleIntro: [
    'FP&A (Financial Planning & Analysis) lập ngân sách, dự báo và giải thích vì sao kết quả kinh doanh khác kế hoạch, để lãnh đạo ra quyết định.',
    'Công việc hằng ngày gồm thu thập số liệu từ kế toán và các phòng, phân tích chênh lệch, phân biệt khoản một lần với khoản lặp lại, cập nhật dự báo và viết báo cáo ngắn kèm đề xuất.',
    'Trong nhiệm vụ này, bạn đọc báo cáo chênh lệch và ghi chú các phòng, chọn 3 khoản quan trọng nhất, viết bản ghi nhớ, đề xuất hành động và 2 chỉ số cho chị Vân.'
  ],
  brief: {
    from: 'Chị Vân',
    subject: 'Phân tích chênh lệch ngân sách tháng 10',
    body: [
      'Chào em,',
      'Tháng 10 mình lỗ hoạt động 20 triệu, trong khi ngân sách là lãi 350 triệu, tức thiếu 370 triệu. Thứ Tư chị phải giải thích với ban giám đốc.',
      'Em làm giúp chị: (1) chọn 3 khoản chênh lệch quan trọng nhất và giải thích nguyên nhân, nói rõ khoản nào sẽ lặp lại; (2) viết bản ghi nhớ ngắn; (3) đề xuất hành động và 2 chỉ số theo dõi cho quý IV.',
      'Lưu ý: anh Đức bên Kinh doanh đề nghị cắt 50% ngân sách marketing tháng 11 cho "bằng ngân sách", còn có người bảo "lương thấp hơn 60 triệu là tiết kiệm tốt, giữ vậy luôn". Em xem số liệu rồi góp ý giúp chị.',
      'Chị cần trước 10:00 thứ Tư. Cảm ơn em!'
    ]
  },
  sources: [
    {
      id: 'variance',
      title: 'Báo cáo chênh lệch tháng 10',
      meta: 'Đã đối chiếu sổ kế toán · triệu đồng · (+) tốt cho lợi nhuận, (−) xấu cho lợi nhuận',
      head: ['Khoản mục', 'Ngân sách', 'Thực tế', 'Chênh lệch'],
      rows: [
        ['Doanh thu thuần', '5.000', '4.800', '−200'],
        ['Giá vốn hàng bán', '3.250', '3.160', '+90'],
        ['Lợi nhuận gộp', '1.750 (35,0%)', '1.640 (34,2%)', '−110'],
        ['Chi phí vận chuyển', '280', '395', '−115'],
        ['Chi phí marketing', '400', '520', '−120'],
        ['Lương & phúc lợi', '600', '540', '+60'],
        ['Sửa chữa kho', '20', '110', '−90'],
        ['Chi phí khác', '100', '95', '+5'],
        ['Lợi nhuận hoạt động', '350', '−20', '−370']
      ]
    },
    {
      id: 'notes',
      title: 'Ghi chú từ các phòng',
      meta: 'Kế toán, Vận hành, Marketing, Nhân sự',
      facts: [
        'Vận chuyển: từ 1/10 đối tác giao hàng tăng giá 25%, hợp đồng giá mới kéo dài đến hết tháng 3/2027.',
        'Vận chuyển: từ 5/10 Marketing mở miễn phí giao hàng cho đơn từ 300.000đ (không có trong ngân sách). Số đơn tăng từ 8.000 (ngân sách) lên 9.200 nhưng giá trị đơn trung bình giảm từ 625.000đ xuống 522.000đ.',
        'Marketing: chi thêm 120 triệu quảng cáo cho đợt sale 30/10, doanh thu đợt sale ghi nhận 310 triệu. Chưa tính lợi nhuận riêng của đợt này.',
        'Sửa chữa kho: mái kho dột sau bão ngày 12/10, sửa một lần hết 90 triệu ngoài kế hoạch. Không có hạng mục sửa chữa lớn nào khác trong năm.',
        'Lương: 2 vị trí CSKH để trống cả tháng 10, Nhân sự dự kiến tuyển đủ trong tháng 11.',
        'Giá vốn: thấp hơn ngân sách vì bán ít hàng hơn; giá nhập từ nhà cung cấp không thay đổi.'
      ],
      not: ['Không có dữ liệu nào cho thấy lạm phát làm mọi chi phí tăng đều.', 'Chưa có báo cáo lợi nhuận theo từng chiến dịch marketing.']
    },
    {
      id: 'trend',
      title: 'Chi phí vận chuyển theo tháng',
      meta: 'Tháng 7–10',
      head: ['Tháng', 'Số đơn', 'Chi phí/đơn', 'Chi phí vận chuyển/doanh thu'],
      rows: [
        ['Tháng 7', '7.900', '34.000đ', '5,4%'],
        ['Tháng 8', '8.100', '35.000đ', '5,6%'],
        ['Tháng 9', '8.000', '35.000đ', '5,6%'],
        ['Tháng 10', '9.200', '43.000đ', '8,2%']
      ]
    },
    {
      id: 'forecast',
      title: 'Kế hoạch quý IV & báo giá mới',
      meta: 'Từ Vận hành và Ban giám đốc',
      facts: [
        'Ngân sách doanh thu tháng 11: 6.500 triệu (có đợt sale 11/11), tháng 12: 6.000 triệu.',
        'Dự kiến khoảng 11.000 đơn/tháng trong tháng 11–12.',
        'Đối tác giao hàng B gửi báo giá 37.000đ/đơn, cùng chất lượng dịch vụ, cần trả lời trước 25/11 để áp dụng từ tháng 12.',
        'Hợp đồng hiện tại cho phép chuyển một phần đơn sang đối tác khác, không bị phạt.'
      ],
      not: ['Chưa có quyết định nào về việc giữ hay dừng chương trình miễn phí giao hàng.']
    },
    {
      id: 'oldmemo',
      title: 'Bản ghi nhớ cũ bị trả lại',
      meta: 'Báo cáo chênh lệch tháng 9 của nhân viên trước',
      posts: [
        'Kính gửi chị, tháng 9 chi phí tăng do nhiều yếu tố khách quan. Đề nghị các phòng tiết kiệm hơn trong thời gian tới. Trân trọng.'
      ],
      note: 'Chị Vân nhận xét: "Không có số, không biết khoản nào, không biết có lặp lại không, không có đề xuất cụ thể."'
    },
    {
      id: 'files',
      title: 'Tệp có thể đính kèm',
      meta: 'Quy định: bảng lương chi tiết là thông tin mật của phòng Nhân sự',
      tags: ['Được phép đính kèm', 'Thông tin mật'],
      quotes: [
        { id: 'sheet', name: 'Bảng chênh lệch tháng 10.xlsx', role: 'Đã đối chiếu sổ kế toán, số liệu theo khoản mục', text: 'Bảng chênh lệch theo khoản mục, có cột giải thích.', consent: true },
        { id: 'payroll', name: 'Bảng lương chi tiết tháng 10.xlsx', role: 'Lương từng nhân viên, có tên và số tài khoản', text: 'Bảng lương chi tiết từ phòng Nhân sự.', consent: false }
      ],
      note: 'Bảng lương chi tiết chỉ phòng Nhân sự và Giám đốc được xem; không đính kèm vào báo cáo gửi đi.'
    }
  ],
  // "Lựa chọn" của bước Chọn: 8 khoản. Có khoản nhỏ không đáng kể và giải thích sai nguyên nhân.
  pillars: [
    { id: 'shipping', label: 'Chi phí vận chuyển vượt ngân sách 115 triệu', meta: 'Chi phí vận chuyển' },
    { id: 'marketing', label: 'Chi phí marketing vượt 120 triệu', meta: 'Chi phí marketing' },
    { id: 'revenue', label: 'Doanh thu thuần thấp hơn ngân sách 200 triệu', meta: 'Doanh thu' },
    { id: 'repair', label: 'Sửa chữa kho vượt 90 triệu', meta: 'Chi phí sửa chữa' },
    { id: 'salary', label: 'Lương & phúc lợi thấp hơn ngân sách 60 triệu', meta: 'Chi phí nhân sự' },
    { id: 'cogs', label: 'Giá vốn thấp hơn 90 triệu nhờ nhà cung cấp giảm giá', meta: 'Giá vốn hàng bán' },
    { id: 'other', label: 'Chi phí khác thấp hơn 5 triệu', meta: 'Chi phí khác' },
    { id: 'inflation', label: 'Lạm phát làm mọi chi phí tăng đều', meta: 'Yếu tố vĩ mô' }
  ],
  // "Kênh" của bước soạn nội dung: người nhận.
  postChannels: [
    ['van', 'Chị Vân · Giám đốc Tài chính'],
    ['marketing', 'Anh Tuấn · Trưởng phòng Marketing'],
    ['all', 'all@nova.example · Toàn công ty (250 người)'],
    ['carrier', 'Đối tác giao hàng hiện tại (bên ngoài công ty)']
  ],
  planChannels: [
    ['forecast', 'Cập nhật dự báo tháng 11–12 theo giá vận chuyển mới'],
    ['carrierB', 'Đề xuất đàm phán, chuyển một phần đơn sang đối tác B (37.000đ/đơn) trước 25/11'],
    ['freeship', 'Đề nghị Marketing đánh giá lại ngưỡng miễn phí giao hàng 300.000đ'],
    ['roi', 'Yêu cầu tính lợi nhuận từng chiến dịch trước khi duyệt chi thêm'],
    ['cut', 'Cắt 50% ngân sách marketing tháng 11 cho bằng ngân sách']
  ],
  kpis: [
    ['shipunit', 'Chi phí vận chuyển trên mỗi đơn'],
    ['margin', 'Biên lợi nhuận gộp và lợi nhuận hoạt động so với ngân sách'],
    ['aov', 'Giá trị đơn hàng trung bình'],
    ['total', 'Tổng chi phí thấp hơn ngân sách'],
    ['lines', 'Số khoản mục trong báo cáo']
  ],
  handoff: {
    subject: 'Kết luận chênh lệch tháng 10 và đề xuất quý IV',
    question: 'Nếu chỉ đề xuất một hành động để bảo vệ lợi nhuận quý IV, em chọn gì? Tác động ước tính khoảng bao nhiêu?',
    hint: 'Nêu một hành động, con số ước tính có cách tính, và rủi ro cần lưu ý.'
  },
  stages: [['research', 'Đọc số liệu'], ['create', 'Chênh lệch & ghi nhớ'], ['handoff', 'Đề xuất & bàn giao']],
  assistant: {
    research: {
      title: 'Đọc số liệu tài chính',
      guided: [
        'Bắt đầu từ dòng cuối: lợi nhuận hoạt động thiếu 370 triệu so với ngân sách. Rồi tìm những khoản lệch lớn nhất góp vào con số đó.',
        'Với mỗi khoản lệch, hỏi hai câu: vì sao lệch, và có lặp lại ở các tháng sau không? Khoản một lần (sửa mái kho) khác hẳn khoản lặp lại (giá vận chuyển mới).',
        'Cẩn thận với khoản "thuận lợi": chi phí thấp hơn ngân sách chưa chắc là tiết kiệm thật (giá vốn thấp vì bán ít, lương thấp vì chưa tuyển đủ).'
      ],
      sample: 'Ghi chú mẫu — Lợi nhuận thiếu 370 triệu (lỗ 20 thay vì lãi 350). Lớn nhất: marketing −120, vận chuyển −115, sửa kho −90, doanh thu −200 (lợi nhuận gộp −110). Lặp lại: vận chuyển (giá +25% đến 3/2027, freeship). Một lần: sửa kho. Tạm thời: lương +60 (2 vị trí sẽ tuyển tháng 11). Giá vốn +90 chỉ vì bán ít hàng.',
      self: [
        'Ba khoản nào góp nhiều nhất vào phần lợi nhuận bị thiếu?',
        'Khoản nào sẽ lặp lại ở tháng 11–12, khoản nào chỉ xảy ra một lần?',
        'Khoản "thuận lợi" nào thực ra không phải tiết kiệm thật?'
      ]
    },
    evp: {
      title: 'Chọn 3 khoản chênh lệch chính',
      guided: [
        'Ưu tiên khoản vừa lớn vừa ảnh hưởng tới các tháng sau, vì ban giám đốc cần biết điều gì sẽ còn tiếp diễn.',
        'Giải thích bằng nguyên nhân cụ thể có trong ghi chú, kèm số liệu: tăng giá 25%, chi phí/đơn từ 35.000đ lên 43.000đ…',
        'Nói rõ tính chất: lặp lại, một lần hay tạm thời. Khoản 5 triệu là không đáng kể; "lạm phát" thì không có dữ liệu.'
      ],
      sample: 'Ví dụ cho Chi phí vận chuyển — Giải thích: vượt 115 triệu vì đối tác tăng giá 25% từ 1/10 (chi phí/đơn 35.000đ → 43.000đ) và miễn phí giao hàng làm số đơn tăng lên 9.200 nhưng giá trị đơn giảm. Sẽ lặp lại vì hợp đồng giá mới kéo dài đến 3/2027.',
      self: [
        'Khoản này lệch bao nhiêu và nguyên nhân là gì theo ghi chú?',
        'Khoản này có lặp lại ở tháng 11–12 không?',
        'Bạn có đang gọi một khoản là "tiết kiệm" khi nó chỉ là tạm thời không?'
      ]
    },
    post: {
      title: 'Viết bản ghi nhớ',
      guided: [
        'Câu đầu tiên là kết luận: lợi nhuận thiếu bao nhiêu và nguyên nhân chính.',
        'Mỗi khoản một dòng: số tiền, nguyên nhân, lặp lại hay không. Bản ghi nhớ cũ bị trả lại vì không có số và không có đề xuất.',
        'Kết bằng đề xuất cụ thể. Gửi cho người cần quyết định; không đính kèm bảng lương chi tiết (thông tin mật).'
      ],
      sample: 'Tiêu đề: Chênh lệch tháng 10 — lợi nhuận thiếu 370 triệu, vận chuyển là rủi ro lặp lại. Nội dung: Chào chị Vân, tháng 10 lỗ hoạt động 20 triệu, thiếu 370 triệu so với ngân sách lãi 350 triệu. Ba khoản chính: (1) Vận chuyển −115 triệu do đối tác tăng giá 25% (35.000đ → 43.000đ/đơn) và chương trình miễn phí giao hàng ngoài kế hoạch — sẽ lặp lại đến 3/2027. (2) Marketing −120 triệu cho đợt sale 30/10, mang về 310 triệu doanh thu nhưng chưa rõ lợi nhuận. (3) Sửa kho −90 triệu do bão, khoản một lần. Lưu ý lương +60 triệu chỉ tạm thời vì 2 vị trí chưa tuyển. Em đề xuất trả lời báo giá đối tác B (37.000đ/đơn) trước 25/11. Em đính kèm bảng chênh lệch đã đối chiếu.',
      self: [
        'Nếu chị Vân chỉ đọc câu đầu, chị ấy có biết vấn đề chính không?',
        'Mỗi khoản đã có số tiền, nguyên nhân và tính lặp lại chưa?',
        'Tệp đính kèm có chứa thông tin mật không?'
      ]
    },
    plan: {
      title: 'Đề xuất hành động',
      guided: [
        'Hành động tốt nhắm vào khoản lặp lại lớn nhất. Khoản một lần như sửa kho không cần hành động cắt giảm.',
        'Cắt ngân sách một cách máy móc có thể gây hại hơn: cắt 50% marketing ngay trước đợt sale 11/11 (tháng có ngân sách doanh thu cao nhất) rủi ro mất doanh thu.',
        'Chỉ số tốt cho thấy sớm lợi nhuận có được bảo vệ không: chi phí vận chuyển/đơn, biên lợi nhuận. "Tổng chi phí thấp hơn ngân sách" dễ đánh lừa vì có khoản thấp chỉ tạm thời.'
      ],
      sample: 'Hành động: cập nhật dự báo tháng 11–12 theo giá vận chuyển mới; đề xuất chuyển một phần đơn sang đối tác B trước 25/11; đề nghị Marketing đánh giá lại ngưỡng miễn phí giao hàng. Chỉ số: chi phí vận chuyển/đơn (mục tiêu dưới 38.000đ từ tháng 12) và biên lợi nhuận gộp so với ngân sách.',
      self: [
        'Hành động nào giải quyết khoản lặp lại lớn nhất?',
        'Cắt 50% marketing trước đợt 11/11 có thể gây ra hậu quả gì?',
        'Chỉ số nào cho bạn biết sớm nhất lợi nhuận đang được cải thiện?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho chị Vân',
      guided: [
        'Khuyến nghị tốt nêu một hành động, tác động ước tính có cách tính rõ ràng, và rủi ro cần lưu ý.',
        'Ví dụ cách tính: chênh lệch giá mỗi đơn × số đơn dự kiến mỗi tháng.',
        'Trả lời luôn hai ý kiến trong brief: cắt 50% marketing và giữ mức lương thấp, dựa trên số liệu.'
      ],
      sample: 'Em đề xuất trả lời báo giá đối tác B trước 25/11 để chuyển đơn từ tháng 12: chênh 6.000đ/đơn (43.000đ → 37.000đ) × khoảng 11.000 đơn/tháng ≈ 66 triệu/tháng. Rủi ro: cần kiểm tra chất lượng giao hàng trước Tết, nên chuyển dần một phần đơn. Em không đề xuất cắt 50% marketing vì tháng 11 có sale 11/11 với ngân sách doanh thu 6.500 triệu; còn lương thấp hơn 60 triệu chỉ là tạm thời vì 2 vị trí sẽ tuyển trong tháng 11.',
      self: [
        'Hành động của bạn tiết kiệm được khoảng bao nhiêu, tính thế nào?',
        'Rủi ro của hành động đó là gì?',
        'Bạn trả lời đề nghị cắt 50% marketing và ý kiến "giữ mức lương thấp" thế nào?'
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
        'Nếu là chị Vân, bạn có mang bản ghi nhớ này vào cuộc họp ngay được không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  report(p) {
    const notes = [];
    const has = id => p.pillars.some(x => x.id === id);
    if (has('cogs')) notes.push('Giá vốn thấp hơn ngân sách vì bán ít hàng hơn; ghi chú Kế toán cho biết giá nhập không thay đổi, nên đây không phải nhà cung cấp giảm giá.');
    if (has('other')) notes.push('Chi phí khác chỉ lệch 5 triệu, không đáng kể so với các khoản 90–200 triệu.');
    if (has('inflation')) notes.push('Không có dữ liệu cho thấy lạm phát làm mọi chi phí tăng đều. Các khoản lệch đều có nguyên nhân cụ thể trong ghi chú.');
    if (!has('shipping')) notes.push('Chi phí vận chuyển là khoản lặp lại lớn nhất (giá mới đến 3/2027, chi phí/đơn 35.000đ → 43.000đ); nên có trong báo cáo.');
    const reason = id => (p.pillars.find(x => x.id === id)?.evidence ?? '').toLowerCase();
    if (has('salary') && !/tạm|chưa tuyển|trống|tháng 11/.test(reason('salary'))) notes.push('Lương thấp hơn 60 triệu chỉ là tạm thời vì 2 vị trí CSKH chưa tuyển; hãy nói rõ điều này.');
    if (has('repair') && !/một lần|1 lần|bão|không lặp/.test(reason('repair'))) notes.push('Sửa mái kho là khoản một lần do bão; nên nói rõ để không ai tính nó vào xu hướng chi phí.');
    if (p.post.channel === 'all' || p.post.channel === 'carrier') notes.push('Số liệu lợi nhuận nội bộ nên gửi cho người cần quyết định (chị Vân), không gửi toàn công ty hay đối tác bên ngoài.');
    if (p.post.quote === 'payroll') notes.push('Bảng lương chi tiết là thông tin mật của phòng Nhân sự; hãy đính kèm bảng chênh lệch đã đối chiếu.');
    const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
    if (!/\d/.test(text)) notes.push('Bản ghi nhớ chưa có số liệu nào, giống bản cũ đã bị trả lại. Hãy nêu số tiền từng khoản.');
    if (p.plan.channels.includes('cut')) notes.push('Cắt 50% marketing ngay trước đợt sale 11/11 (ngân sách doanh thu 6.500 triệu) có thể làm mất doanh thu nhiều hơn số tiết kiệm được.');
    if (p.plan.kpis.every(k => ['total', 'lines', 'aov'].includes(k))) notes.push('Hai chỉ số bạn chọn chưa cho biết lợi nhuận có được bảo vệ không. Hãy theo dõi chi phí vận chuyển/đơn hoặc biên lợi nhuận.');
    return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
  },
  cvLine: 'Phân tích chênh lệch ngân sách tháng: xác định 3 khoản ảnh hưởng lớn nhất tới lợi nhuận, phân biệt khoản lặp lại, một lần và tạm thời; viết bản ghi nhớ cho Giám đốc Tài chính kèm đề xuất có ước tính tác động (dự án mô phỏng VAOVIEC.).'
};
