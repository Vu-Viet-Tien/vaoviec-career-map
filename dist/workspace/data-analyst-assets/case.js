// MISSION_005 · Data Analyst tại NOVA Commerce.
// Nội dung case dùng chung cho web (/workspace/mission-engine.js) và server (lib/review-simple.js, lib/assistant-core.js).
// Mọi số liệu đều là giả lập.
const CASE = {
  id: 'MISSION_005',
  role: 'Data Analyst',
  roleVi: 'Chuyên viên Phân tích Dữ liệu',
  company: 'NOVA Commerce',
  manager: 'Anh Hùng · Trưởng phòng Thương mại điện tử',
  managerShort: 'anh Hùng',
  deadline: '15:00 hôm nay',
  duration: '15–20 phút',
  ui: {
    slug: 'data-analyst',
    storageKey: 'vaoviec-workspace-mission-005-v1',
    caseName: 'NOVA Commerce · Doanh thu tuần 45 giảm 18%',
    topic: 'phân tích dữ liệu',
    tabs: { brief: 'Yêu cầu từ anh Hùng', data: 'Dữ liệu bán hàng', evp: 'Phát hiện chính', post: 'Email báo cáo', plan: 'Bước tiếp theo & chỉ số', handoff: 'Bàn giao' },
    dataLead: 'Mở từng bảng số liệu và nhật ký để tìm nguyên nhân thật của việc doanh thu giảm.',
    pick: { count: 3, summary: 'Phát hiện', lead: 'Chọn đúng 3 phát hiện được dữ liệu chứng minh và ghi số liệu làm bằng chứng cho từng phát hiện.', placeholder: 'Bằng chứng: ví dụ “App giảm từ 380 xuống 205 triệu, trong khi website chỉ giảm 3%…”', error: 'Chọn đúng 3 phát hiện và ghi bằng chứng tối thiểu {min} ký tự cho mỗi phát hiện.' },
    write: { min: 150, summary: 'Email', preview: 'email', sender: 'Bạn · Phân tích dữ liệu, NOVA Commerce', quoteSource: 'files', lead: 'Viết email báo cáo ngắn. Người đọc bận: kết luận trước, số liệu sau, nói rõ điều chưa chắc chắn.', channelLegend: 'Gửi cho', titleLabel: 'Tiêu đề email', titlePlaceholder: 'Ví dụ: Doanh thu tuần 45 — giảm thật khoảng 5%, nguyên nhân chính ở app Android', bodyLabel: 'Nội dung email', bodyPlaceholder: 'Kết luận chính, 2–3 số liệu then chốt, điều chưa chắc chắn, đề xuất bước tiếp theo…', quoteLabel: 'Đính kèm (không bắt buộc)', error: 'Chọn người nhận, viết tiêu đề và nội dung email tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Bước tiếp theo', summaryKpis: 'Chỉ số theo dõi', lead: 'Chọn 1–3 việc nên làm tiếp và đúng 2 chỉ số để theo dõi trong tuần tới.', channelLegend: 'Bước tiếp theo', kpiLegend: 'Chỉ số theo dõi', targetLabel: 'Ngưỡng cảnh báo (không bắt buộc)', targetPlaceholder: 'Ví dụ: tỷ lệ thanh toán thành công Android dưới 95% thì báo ngay', error: 'Chọn ít nhất 1 bước tiếp theo và đúng 2 chỉ số theo dõi.' }
  },
  companyIntro: [
    'NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập ở Hà Nội, bán đồ gia dụng nhỏ qua website, ứng dụng điện thoại (app) và sàn thương mại điện tử.',
    'Mỗi sáng thứ Hai, ban giám đốc xem báo cáo doanh thu tuần. Sáng nay báo cáo tuần 45 cho thấy doanh thu giảm 18% so với tuần 44.',
    'Bạn là Data Analyst mới của phòng Thương mại điện tử. Anh Hùng cần biết doanh thu giảm vì đâu trước cuộc họp 15:00.'
  ],
  roleIntro: [
    'Data Analyst biến số liệu thành câu trả lời cho câu hỏi kinh doanh: chuyện gì đang xảy ra, vì sao, và nên làm gì.',
    'Công việc hằng ngày gồm lấy và làm sạch dữ liệu, so sánh theo kênh và theo thời gian, kiểm tra dữ liệu có đáng tin không, rồi trình bày kết luận ngắn gọn cho người ra quyết định.',
    'Trong nhiệm vụ này, bạn đọc 5 nguồn dữ liệu, chọn 3 phát hiện có bằng chứng, viết email báo cáo, đề xuất bước tiếp theo và 2 chỉ số theo dõi cho anh Hùng.'
  ],
  brief: {
    from: 'Anh Hùng',
    subject: 'Doanh thu tuần 45 giảm 18%, em xem giúp anh',
    body: [
      'Chào em,',
      'Báo cáo sáng nay: doanh thu tuần 45 là 1,00 tỷ, giảm 18% so với tuần 44 (1,22 tỷ). Ban giám đốc rất lo.',
      'Em xem giúp anh: (1) 3 phát hiện chính giải thích chuyện này, có số liệu chứng minh; (2) viết email báo cáo ngắn; (3) đề xuất bước tiếp theo và 2 chỉ số cần theo dõi.',
      'Lưu ý: anh Đức bên Kinh doanh muốn chạy giảm giá 20% toàn sàn ngay tuần này để kéo doanh thu. Có người còn nói do trời lạnh nên khách ít mua. Em kiểm tra giúp anh nhé.',
      'Anh cần trước 15:00 hôm nay. Cảm ơn em!'
    ]
  },
  sources: [
    {
      id: 'weekly',
      title: 'Doanh thu 4 tuần gần nhất',
      meta: 'Báo cáo tuần tự động · tất cả kênh',
      head: ['Tuần', 'Doanh thu', 'Số đơn', 'Giá trị đơn TB', 'Lượt truy cập'],
      rows: [
        ['Tuần 42', '1,02 tỷ', '2.040', '500.000đ', '61.000'],
        ['Tuần 43', '1,05 tỷ', '2.100', '500.000đ', '62.500'],
        ['Tuần 44', '1,22 tỷ', '2.440', '500.000đ', '63.000'],
        ['Tuần 45', '1,00 tỷ', '2.010', '497.500đ', '64.200']
      ]
    },
    {
      id: 'channel',
      title: 'Doanh thu theo kênh',
      meta: 'Tuần 43, 44, 45 · triệu đồng',
      head: ['Kênh', 'Tuần 43', 'Tuần 44', 'Tuần 45'],
      rows: [
        ['Website', '510', '520', '505'],
        ['App (iOS + Android)', '235', '380', '205'],
        ['   trong đó App iOS', '95', '150', '100'],
        ['   trong đó App Android', '140', '230', '105'],
        ['Sàn thương mại điện tử', '305', '320', '290']
      ]
    },
    {
      id: 'log',
      title: 'Nhật ký sự kiện & hệ thống',
      meta: 'Từ Marketing, IT và Kế toán',
      facts: [
        '28/10–31/10 (tuần 44): chương trình "Sale cuối tháng" giảm 15% chỉ trên app.',
        '30/10 (tuần 44): lỗi cổng thanh toán làm 180 đơn trên app bị ghi trùng, tổng khoảng 90 triệu. Kế toán đã huỷ ngày 2/11 nhưng báo cáo tuần tự động chưa trừ ra.',
        '4/11 (tuần 45): phát hành app bản 3.2 cho Android và iOS.',
        'Từ 4/11: sự kiện "thêm vào giỏ" trên app Android không còn được ghi lại (IT xác nhận do lỗi gắn mã theo dõi ở bản 3.2, đang sửa).',
        'Website và sàn thương mại điện tử không có thay đổi hay khuyến mãi nào trong tuần 43–45.'
      ],
      not: ['Không có dữ liệu thời tiết hay dữ liệu nào cho thấy thời tiết ảnh hưởng doanh thu.', 'Không có dữ liệu giá của đối thủ trong tuần 45.']
    },
    {
      id: 'funnel',
      title: 'Phễu mua hàng trên app Android',
      meta: 'Tuần 43 và tuần 45',
      head: ['Bước', 'Tuần 43', 'Tuần 45', 'Ghi chú'],
      rows: [
        ['Mở app', '18.200', '18.500', ''],
        ['Xem sản phẩm', '9.800', '9.900', ''],
        ['Thêm vào giỏ', '2.900', '1.100', 'Từ 4/11 không ghi được sự kiện này'],
        ['Bắt đầu thanh toán', '1.150', '1.120', ''],
        ['Đặt hàng thành công', '280', '210', ''],
        ['Tỷ lệ lỗi (crash) ở màn thanh toán', '0,3%', '4,1%', 'Theo công cụ theo dõi lỗi của app']
      ]
    },
    {
      id: 'files',
      title: 'Tệp có thể đính kèm',
      meta: 'Quy định dữ liệu: không gửi dữ liệu cá nhân khách hàng qua email',
      tags: ['Được phép gửi nội bộ', 'Chứa dữ liệu cá nhân'],
      quotes: [
        { id: 'dashboard', name: 'Dashboard doanh thu tuần 45', role: 'Đường dẫn nội bộ, chỉ số tổng hợp theo kênh', text: 'Biểu đồ doanh thu theo kênh và theo ngày, đã loại 180 đơn trùng.', consent: true },
        { id: 'raw', name: 'File xuất đơn hàng tuần 45.xlsx', role: '2.010 dòng, có tên, số điện thoại, địa chỉ khách', text: 'Dữ liệu đơn hàng thô xuất từ hệ thống.', consent: false }
      ],
      note: 'Theo quy định của NOVA, dữ liệu cá nhân khách hàng chỉ được xem trong hệ thống, không gửi qua email hay tin nhắn.'
    }
  ],
  // "Lựa chọn" của bước Chọn: 8 phát hiện. Một số nghe hợp lý nhưng dữ liệu không ủng hộ.
  pillars: [
    { id: 'baseline', label: 'Tuần 44 cao bất thường, không phải mốc so sánh chuẩn', meta: 'Có sale trên app và 180 đơn ghi trùng' },
    { id: 'android', label: 'Đơn trên app Android giảm sau bản 3.2', meta: 'Lỗi ở màn thanh toán tăng' },
    { id: 'tracking', label: 'Lượt "thêm vào giỏ" giảm là do lỗi ghi dữ liệu', meta: 'Không phải khách bỏ đi' },
    { id: 'stable', label: 'Website và sàn thương mại điện tử gần như ổn định', meta: 'Biến động trong mức bình thường' },
    { id: 'cart', label: 'Khách hết hứng thú: tỷ lệ thêm vào giỏ giảm 62%', meta: 'Theo phễu app Android' },
    { id: 'weather', label: 'Trời lạnh nên khách mua ít hơn', meta: 'Thời tiết thay đổi tuần 45' },
    { id: 'competitor', label: 'Đối thủ giảm giá mạnh, hút mất khách', meta: 'Cạnh tranh trên thị trường' },
    { id: 'aov', label: 'Giá trị đơn trung bình giảm mạnh', meta: 'Khách mua ít món hơn mỗi đơn' }
  ],
  // "Kênh" của bước soạn nội dung: người nhận email.
  postChannels: [
    ['hung', 'Anh Hùng · Trưởng phòng Thương mại điện tử'],
    ['it', 'Anh Sơn · Trưởng nhóm App (IT)'],
    ['all', 'all@nova.example · Toàn công ty (250 người)'],
    ['partner', 'Đối tác cổng thanh toán (bên ngoài công ty)']
  ],
  planChannels: [
    ['fix', 'Báo IT ưu tiên sửa lỗi thanh toán Android, theo dõi theo ngày'],
    ['clean', 'Loại 180 đơn trùng và tính lại báo cáo tuần 44'],
    ['flag', 'Đánh dấu dữ liệu "thêm vào giỏ" Android từ 4/11 là không dùng được'],
    ['baseline', 'So sánh với trung bình 4 tuần thay vì chỉ tuần trước'],
    ['discount', 'Chạy giảm giá 20% toàn sàn ngay tuần này']
  ],
  kpis: [
    ['checkout', 'Tỷ lệ thanh toán thành công trên app Android'],
    ['avg4', 'Doanh thu tuần so với trung bình 4 tuần'],
    ['wow', 'Doanh thu tuần này so với tuần trước'],
    ['visits', 'Tổng lượt truy cập'],
    ['charts', 'Số biểu đồ trên dashboard']
  ],
  handoff: {
    subject: 'Kết luận phân tích doanh thu tuần 45',
    question: 'Nếu tuần này chỉ được làm một việc để đưa doanh thu về mức bình thường, em đề xuất việc gì? Căn cứ vào số liệu nào?',
    hint: 'Nêu một việc, số liệu chứng minh, và cách biết việc đó có hiệu quả.'
  },
  stages: [['research', 'Đọc dữ liệu'], ['create', 'Phát hiện & email'], ['handoff', 'Đề xuất & bàn giao']],
  assistant: {
    research: {
      title: 'Đọc dữ liệu bán hàng',
      guided: [
        'Khi thấy một con số thay đổi lớn, đầu tiên hãy hỏi: mốc so sánh có bình thường không? Đặt tuần 44 cạnh tuần 42 và 43.',
        'Chia nhỏ con số tổng theo kênh để xem phần giảm nằm ở đâu. Kênh nào giảm nhiều nhất?',
        'Đọc nhật ký sự kiện: khuyến mãi, lỗi hệ thống, phát hành phiên bản mới thường giải thích được biến động. Và luôn kiểm tra dữ liệu có bị lỗi ghi nhận không.'
      ],
      sample: 'Ghi chú mẫu — Tuần 42–43 khoảng 1,02–1,05 tỷ; tuần 44 cao bất thường (sale app + 90 triệu đơn trùng). Phần giảm tập trung ở app Android (230 → 105 triệu), website và sàn chỉ dao động vài %. Lỗi thanh toán Android tăng từ 0,3% lên 4,1% sau bản 3.2. Lượt "thêm vào giỏ" Android giảm vì không ghi được dữ liệu từ 4/11.',
      self: [
        'Tuần 44 có gì khác so với tuần 42 và 43?',
        'Kênh nào chiếm phần lớn mức giảm?',
        'Con số nào trong phễu không đáng tin, vì sao?'
      ]
    },
    evp: {
      title: 'Chọn 3 phát hiện chính',
      guided: [
        'Một phát hiện tốt trả lời "vì sao" và có số liệu đi kèm, ví dụ "App Android giảm từ 230 xuống 105 triệu".',
        'Cẩn thận với giải thích nghe hợp lý nhưng không có dữ liệu (thời tiết, đối thủ). Không có dữ liệu thì không kết luận.',
        'Kiểm tra từng con số trước khi tin: một bước phễu giảm 62% đột ngột có thể là do ngừng ghi dữ liệu chứ không phải do khách.'
      ],
      sample: 'Ví dụ cho phát hiện "Tuần 44 cao bất thường" — Bằng chứng: tuần 42–43 chỉ 1,02–1,05 tỷ; tuần 44 có sale 15% trên app và 180 đơn trùng (~90 triệu) chưa bị trừ. So với tuần 43, tuần 45 chỉ giảm khoảng 5%.',
      self: [
        'Phát hiện này có số liệu nào chứng minh?',
        'Có giải thích nào khác cho cùng con số đó không?',
        'Dữ liệu bạn dùng có bị lỗi ghi nhận không?'
      ]
    },
    post: {
      title: 'Viết email báo cáo',
      guided: [
        'Người đọc bận: câu đầu tiên là kết luận, ví dụ "Doanh thu giảm thật khoảng 5% so với tuần bình thường, chủ yếu ở app Android".',
        'Chỉ đưa 2–3 số liệu then chốt, và nói rõ điều chưa chắc chắn (dữ liệu nào đang lỗi, còn thiếu gì).',
        'Kết thúc bằng đề xuất cụ thể. Không gửi dữ liệu cá nhân khách hàng qua email; gửi đường dẫn dashboard thay vì file thô.'
      ],
      sample: 'Tiêu đề: Doanh thu tuần 45 — giảm thật khoảng 5%, nguyên nhân chính ở app Android. Nội dung: Chào anh Hùng, em tóm tắt: (1) Mức giảm 18% phần lớn vì tuần 44 cao bất thường — có sale 15% trên app và 180 đơn ghi trùng (~90 triệu) chưa trừ. So với tuần 43, tuần 45 giảm khoảng 5%. (2) Phần giảm thật nằm ở app Android (140 → 105 triệu so với tuần 43), trùng với bản 3.2: lỗi ở màn thanh toán tăng từ 0,3% lên 4,1%. (3) Website và sàn ổn định. Lưu ý: số "thêm vào giỏ" trên Android từ 4/11 không dùng được do lỗi ghi dữ liệu. Em đề xuất ưu tiên sửa lỗi thanh toán Android trước khi tính tới giảm giá. Em gửi kèm dashboard đã loại đơn trùng.',
      self: [
        'Nếu anh Hùng chỉ đọc câu đầu tiên, anh ấy có biết kết luận không?',
        'Bạn đã nói rõ dữ liệu nào chưa đáng tin chưa?',
        'Tệp đính kèm có chứa dữ liệu cá nhân khách hàng không?'
      ]
    },
    plan: {
      title: 'Đề xuất bước tiếp theo',
      guided: [
        'Ưu tiên việc xử lý đúng nguyên nhân đã tìm ra. Giảm giá khi nguyên nhân là lỗi thanh toán thì tốn tiền mà không giải quyết được gì.',
        'Làm sạch dữ liệu là một bước thật: loại đơn trùng, đánh dấu dữ liệu lỗi để không ai dùng nhầm.',
        'Chỉ số tốt giúp phát hiện sớm vấn đề: tỷ lệ thanh toán thành công trên Android, doanh thu so với trung bình 4 tuần. So với chỉ một tuần trước dễ bị đánh lừa bởi tuần bất thường.'
      ],
      sample: 'Bước tiếp theo: báo IT ưu tiên sửa lỗi thanh toán Android; loại 180 đơn trùng và tính lại tuần 44; đánh dấu dữ liệu "thêm vào giỏ" Android từ 4/11 là không dùng được. Chỉ số: tỷ lệ thanh toán thành công Android (cảnh báo nếu dưới 95%) và doanh thu tuần so với trung bình 4 tuần.',
      self: [
        'Việc nào xử lý trực tiếp nguyên nhân bạn đã tìm ra?',
        'Nếu giảm giá 20% mà lỗi thanh toán vẫn còn, chuyện gì xảy ra?',
        'Chỉ số nào giúp bạn biết sớm nhất vấn đề đã được sửa?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho anh Hùng',
      guided: [
        'Khuyến nghị tốt nêu một việc, số liệu chứng minh, và cách đo để biết việc đó có hiệu quả.',
        'Trả lời luôn hai ý kiến trong brief: giảm giá 20% ngay và "do trời lạnh", dựa trên dữ liệu.',
        'Viết ngắn gọn để anh Hùng mang vào cuộc họp.'
      ],
      sample: 'Em đề xuất ưu tiên sửa lỗi thanh toán trên app Android: sau bản 3.2, lỗi ở màn thanh toán tăng từ 0,3% lên 4,1% và doanh thu Android giảm từ 140 xuống 105 triệu so với tuần 43, trong khi website và sàn ổn định. Em sẽ theo dõi tỷ lệ thanh toán thành công Android mỗi ngày. Chưa nên giảm giá 20% vì mức giảm 18% phần lớn do tuần 44 bị thổi phồng; cũng không có dữ liệu nào cho thấy thời tiết ảnh hưởng.',
      self: [
        'Việc bạn đề xuất xử lý nguyên nhân nào?',
        'Bạn sẽ biết việc đó hiệu quả bằng chỉ số nào?',
        'Bạn trả lời đề xuất giảm giá 20% và ý kiến "do trời lạnh" thế nào?'
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
        'Nếu là anh Hùng, bạn có mang email này vào cuộc họp ngay được không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  report(p) {
    const notes = [];
    const has = id => p.pillars.some(x => x.id === id);
    if (has('cart')) notes.push('Lượt "thêm vào giỏ" trên Android giảm vì từ 4/11 sự kiện này không còn được ghi lại (IT đã xác nhận), không phải vì khách hết hứng thú.');
    if (has('weather')) notes.push('Không có dữ liệu thời tiết nào trong bộ dữ liệu. Không nên kết luận khi không có số liệu.');
    if (has('competitor')) notes.push('Không có dữ liệu giá đối thủ tuần 45. Hơn nữa website và sàn gần như ổn định, phần giảm chỉ tập trung ở app Android.');
    if (has('aov')) notes.push('Giá trị đơn trung bình gần như không đổi (500.000đ → 497.500đ). Doanh thu giảm vì số đơn, không phải giá trị đơn.');
    if (!has('baseline')) notes.push('Kiểm tra lại mốc so sánh: tuần 44 có sale trên app và 180 đơn ghi trùng (~90 triệu), nên mức giảm 18% bị phóng đại.');
    if (p.post.channel === 'all' || p.post.channel === 'partner') notes.push('Báo cáo nội bộ về doanh thu và lỗi hệ thống nên gửi cho người cần quyết định (anh Hùng), không gửi toàn công ty hay đối tác bên ngoài.');
    if (p.post.quote === 'raw') notes.push('File đơn hàng thô chứa tên, số điện thoại, địa chỉ khách. Quy định không gửi dữ liệu cá nhân qua email; hãy gửi đường dẫn dashboard.');
    const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
    if (/thời tiết|trời lạnh|đối thủ/.test(text) && !/không có dữ liệu|chưa có dữ liệu/.test(text)) notes.push('Email nhắc tới thời tiết hoặc đối thủ như nguyên nhân, trong khi không có dữ liệu chứng minh.');
    if (!/\d/.test(text)) notes.push('Email chưa có số liệu nào. Hãy đưa 2–3 con số then chốt để người đọc tin kết luận.');
    if (p.plan.channels.includes('discount')) notes.push('Giảm giá 20% không xử lý được lỗi thanh toán trên app Android, và mức giảm thật chỉ khoảng 5% so với tuần bình thường.');
    if (p.plan.kpis.every(k => ['wow', 'visits', 'charts'].includes(k))) notes.push('Hai chỉ số bạn chọn chưa giúp theo dõi nguyên nhân. Hãy theo dõi tỷ lệ thanh toán thành công Android hoặc doanh thu so với trung bình 4 tuần.');
    return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
  },
  cvLine: 'Phân tích nguyên nhân doanh thu tuần giảm 18% từ dữ liệu theo kênh, phễu mua hàng và nhật ký hệ thống; phát hiện mốc so sánh bị thổi phồng và lỗi ghi dữ liệu, viết báo cáo ngắn kèm chỉ số theo dõi (dự án mô phỏng VAOVIEC.).'
};
