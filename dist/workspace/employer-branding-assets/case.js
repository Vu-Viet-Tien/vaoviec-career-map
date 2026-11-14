// MISSION_002 · Employer Branding Executive tại NOVA Commerce.
// Nội dung case dùng chung cho web (app.js) và server (lib/review-eb.js, lib/assistant-core.js đọc lại file này).
// Mọi số liệu, tên người và trích dẫn đều là giả lập.
const CASE = {
  id: 'MISSION_002',
  role: 'Employer Branding Executive',
  roleVi: 'Chuyên viên Thương hiệu Tuyển dụng',
  company: 'NOVA Commerce',
  manager: 'Anh Quân · Trưởng nhóm Thương hiệu tuyển dụng',
  managerShort: 'anh Quân',
  deadline: '17:00 thứ Năm',
  duration: '15–20 phút',
  ui: {
    slug: 'employer-branding-executive',
    storageKey: 'vaoviec-workspace-mission-002-v1',
    caseName: 'NOVA Commerce · Truyền thông tuyển CSKH',
    topic: 'thương hiệu tuyển dụng',
    tabs: { brief: 'Brief từ anh Quân', data: 'Dữ liệu nghiên cứu', evp: 'Bảng EVP', post: 'Bài đăng tuyển dụng', plan: 'Kênh & chỉ số', handoff: 'Bàn giao' },
    dataLead: 'Mở từng tài liệu để tìm căn cứ cho EVP và bài đăng.',
    pick: { count: 3, summary: 'EVP', lead: 'Chọn đúng 3 trụ cột giá trị và ghi bằng chứng cho từng trụ cột (con số, chính sách hoặc câu nói của nhân viên).', placeholder: 'Bằng chứng: ví dụ “9/14 nhân viên chọn…”, chính sách HR, câu nói của nhân viên', error: 'Chọn đúng 3 trụ cột và ghi bằng chứng tối thiểu {min} ký tự cho mỗi trụ cột.' },
    write: { min: 150, summary: 'Bài đăng', preview: 'social', sender: 'NOVA Commerce Tuyển dụng', quoteSource: 'voices', lead: 'Viết một bài cho một kênh. Bên phải là bản xem trước như khi đăng thật.', channelLegend: 'Đăng trên kênh', titleLabel: 'Tiêu đề', titlePlaceholder: 'Ví dụ: NOVA Commerce tuyển 3 Nhân viên CSKH ca chiều…', bodyLabel: 'Nội dung', bodyPlaceholder: 'Công việc, ca làm, thu nhập, hỗ trợ khi mới vào, cách ứng tuyển…', quoteLabel: 'Trích dẫn nhân viên (không bắt buộc)', error: 'Chọn kênh, viết tiêu đề và nội dung bài đăng tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Kênh', summaryKpis: 'Chỉ số', lead: 'Chọn kênh triển khai (1–3 kênh) và đúng 2 chỉ số để đo hiệu quả trong 2 tuần.', channelLegend: 'Kênh triển khai', kpiLegend: 'Chỉ số đo', targetLabel: 'Mục tiêu cụ thể (không bắt buộc)', targetPlaceholder: 'Ví dụ: từ 4 lên 10 hồ sơ/tuần sau 2 tuần', error: 'Chọn ít nhất 1 kênh và đúng 2 chỉ số đo.' }
  },
  companyIntro: [
    'NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập có văn phòng tại Hà Nội, bán đồ gia dụng nhỏ qua website và sàn thương mại điện tử.',
    'Đội Chăm sóc khách hàng (CSKH) có 18 người, làm theo ca và đang cần tuyển thêm 3 người cho ca chiều và luân phiên cuối tuần.',
    'Tin tuyển dụng CSKH đã đăng 3 tuần nhưng chỉ nhận 11 hồ sơ. Nhóm Thương hiệu tuyển dụng được giao tìm hiểu vì sao ứng viên không mặn mà và đề xuất cách truyền thông lại.'
  ],
  roleIntro: [
    'Employer Branding là xây dựng hình ảnh "nơi làm việc" của công ty trong mắt ứng viên: ứng viên nghĩ gì khi nghe tên công ty, vì sao họ muốn hoặc không muốn ứng tuyển.',
    'Công việc hằng ngày gồm tìm hiểu nhân viên và ứng viên nghĩ gì, chọn thông điệp đúng sự thật, viết nội dung tuyển dụng và đo xem nội dung có giúp tuyển được người hay không.',
    'Trong nhiệm vụ này, bạn đọc dữ liệu thật của đội CSKH, chọn 3 trụ cột giá trị (EVP), viết một bài đăng tuyển dụng, chọn kênh và cách đo, rồi gửi đề xuất cho anh Quân.'
  ],
  brief: {
    from: 'Anh Quân',
    subject: 'Nhờ em: làm lại truyền thông tuyển CSKH',
    body: [
      'Chào em,',
      'Tin tuyển CSKH đăng 3 tuần mới có 11 hồ sơ, và gần một nửa ứng viên bỏ giữa chừng. Anh nhờ em xem lại cách mình kể về công việc này.',
      'Em đọc dữ liệu trong mục Dữ liệu nghiên cứu rồi làm giúp anh 3 việc: (1) chọn 3 trụ cột giá trị (EVP) có căn cứ, (2) viết một bài đăng tuyển dụng cho một kênh, (3) chọn kênh triển khai và 2 chỉ số để đo.',
      'Lưu ý: chị Mai bên CSKH gợi ý ghi "công việc không áp lực" cho dễ tuyển. Em cân nhắc giúp anh xem có nên không.',
      'Hạn gửi anh trước 17:00 thứ Năm. Cảm ơn em!'
    ]
  },
  // Dữ liệu nghiên cứu: người học đọc để tìm căn cứ.
  sources: [
    {
      id: 'survey',
      title: 'Khảo sát nội bộ đội CSKH',
      meta: '14/18 nhân viên trả lời · tháng 10',
      items: [
        ['Điều thích nhất khi làm ở NOVA', [
          ['Đồng đội sẵn sàng hỗ trợ khi ca đông', 11],
          ['Được đào tạo bài bản 2 tuần đầu, có người kèm 1-1', 9],
          ['Lịch ca được báo trước 2 tuần', 8],
          ['Thưởng theo điểm hài lòng của khách', 5],
          ['Có cơ hội lên trưởng ca', 4]
        ]],
        ['Điều khó nhất', [
          ['Khung giờ cao điểm buổi tối (19h–21h) rất đông tin nhắn', 10],
          ['Gặp khách khó tính, phải giữ bình tĩnh', 7],
          ['Phải học nhiều chính sách đổi trả lúc mới vào', 4]
        ]]
      ],
      note: 'Mỗi người chọn tối đa 3 ý. Số bên phải là số người chọn.'
    },
    {
      id: 'voices',
      title: 'Phỏng vấn nhanh 3 nhân viên',
      meta: 'Ghi chép của nhóm Thương hiệu tuyển dụng',
      quotes: [
        { id: 'ha', name: 'Hà', role: 'Nhân viên CSKH · 1 năm', text: 'Tuần đầu mình được chị trưởng ca kèm 1-1, có sổ tay xử lý tình huống nên không bị ngợp.', consent: true },
        { id: 'tung', name: 'Tùng', role: 'Nhân viên CSKH · 8 tháng', text: 'Ca tối đông thật, nhưng team chia việc rõ, ai rảnh là đỡ người đang kẹt.', consent: true },
        { id: 'maianh', name: 'Mai Anh', role: 'Trưởng ca · 2 năm', text: 'Mình vào NOVA khi đang là sinh viên năm 3, làm part-time rồi lên trưởng ca sau 14 tháng.', consent: false }
      ],
      note: 'Hà và Tùng đã đồng ý cho dùng tên và câu nói trên bài đăng. Mai Anh chưa trả lời về việc dùng tên và ảnh.'
    },
    {
      id: 'candidates',
      title: 'Lý do ứng viên bỏ quy trình',
      meta: '12 ứng viên CSKH bỏ giữa chừng trong 2 tháng',
      items: [
        ['Lý do được nêu', [
          ['Tin đăng không nói rõ thu nhập thực nhận', 6],
          ['Lo ngại ca tối và làm cuối tuần', 5],
          ['Tin đăng giống mọi nơi, không biết công việc cụ thể làm gì', 4],
          ['Đã nhận việc ở nơi khác', 3]
        ]]
      ],
      note: 'Một ứng viên có thể nêu nhiều lý do.'
    },
    {
      id: 'policy',
      title: 'Chính sách & phúc lợi (HR đã xác nhận)',
      meta: 'Áp dụng cho Nhân viên CSKH toàn thời gian',
      facts: [
        'Lương 8–10 triệu đồng/tháng (gross), tuỳ kinh nghiệm.',
        'Thưởng theo điểm hài lòng của khách, tối đa 1,5 triệu đồng/tháng.',
        'Phụ cấp 30.000 đồng cho mỗi ca kết thúc sau 19h.',
        'Ca 13h00–21h00, luân phiên trực cuối tuần; lịch ca báo trước 2 tuần.',
        'Đào tạo 2 tuần đầu, có trưởng ca kèm 1-1 và sổ tay xử lý tình huống.',
        'Lộ trình: Nhân viên → Trưởng ca sau khoảng 12–18 tháng nếu đạt đánh giá.',
        'Bảo hiểm theo luật, 12 ngày phép năm.'
      ],
      not: [
        'Không có chế độ làm việc từ xa cho vị trí CSKH.',
        'Chưa có số liệu so sánh lương với thị trường.'
      ]
    },
    {
      id: 'market',
      title: 'Tin tuyển CSKH của nơi khác',
      meta: '2 tin đăng gần đây trên nhóm việc làm',
      posts: [
        'Tuyển CSKH online! Môi trường trẻ trung năng động, lương thưởng hấp dẫn, cơ hội thăng tiến không giới hạn. Inbox ngay!',
        '🔥🔥 HOT HOT 🔥🔥 Tuyển gấp 10 bạn CSKH, không yêu cầu kinh nghiệm, việc nhẹ lương cao, ib nhận JD!!!'
      ],
      note: 'Cả hai tin không nêu mức lương, ca làm hay công việc cụ thể.'
    },
    {
      id: 'channels',
      title: 'Số liệu kênh hiện có',
      meta: '30 ngày gần nhất',
      rows: [
        ['Fanpage "NOVA Commerce Tuyển dụng"', '4.200 người theo dõi · tương tác trung bình 1,2%', 'Phần lớn người theo dõi ở Hà Nội'],
        ['Nhóm Facebook "Việc làm Hà Nội"', '120.000 thành viên', 'Nhiều người tìm việc ca, part-time, sinh viên'],
        ['LinkedIn công ty', '900 người theo dõi', 'Chủ yếu nhân sự văn phòng và quản lý'],
        ['Giới thiệu nội bộ', '3 trong 5 nhân viên CSKH được đánh giá tốt nhất vào qua giới thiệu', 'Chưa có thưởng giới thiệu'],
        ['TikTok', 'Chưa có kênh', 'Cần thêm người làm video nếu mở']
      ]
    }
  ],
  // Bảng EVP: 8 lựa chọn, có 3 lựa chọn không có căn cứ hoặc gây hiểu lầm.
  pillars: [
    { id: 'team', label: 'Đồng đội hỗ trợ nhau khi ca đông' },
    { id: 'training', label: 'Đào tạo bài bản, có người kèm 1-1' },
    { id: 'schedule', label: 'Lịch ca rõ ràng, báo trước 2 tuần' },
    { id: 'income', label: 'Thu nhập minh bạch: lương, thưởng, phụ cấp ca tối' },
    { id: 'growth', label: 'Lộ trình lên trưởng ca' },
    { id: 'nostress', label: 'Công việc không áp lực' },
    { id: 'remote', label: 'Làm việc linh hoạt từ xa' },
    { id: 'toppay', label: 'Lương cao nhất thị trường' }
  ],
  postChannels: [
    ['group', 'Nhóm Facebook "Việc làm Hà Nội"'],
    ['fanpage', 'Fanpage NOVA Commerce Tuyển dụng'],
    ['linkedin', 'LinkedIn công ty']
  ],
  planChannels: [
    ['group', 'Nhóm Facebook "Việc làm Hà Nội"'],
    ['fanpage', 'Fanpage NOVA Commerce Tuyển dụng'],
    ['referral', 'Giới thiệu nội bộ'],
    ['linkedin', 'LinkedIn công ty'],
    ['tiktok', 'Mở kênh TikTok mới']
  ],
  kpis: [
    ['applications', 'Số hồ sơ CSKH nhận được mỗi tuần'],
    ['interviewRate', 'Tỷ lệ ứng viên đi tiếp tới vòng phỏng vấn'],
    ['dropReason', 'Tỷ lệ ứng viên bỏ quy trình vì lương hoặc ca làm'],
    ['likes', 'Số lượt thích bài đăng'],
    ['followers', 'Số người theo dõi fanpage mới']
  ],
  handoff: {
    subject: 'Đề xuất truyền thông tuyển CSKH',
    question: 'Nếu 2 tuần tới chỉ làm được một việc, em ưu tiên việc gì? Vì sao, và mình biết nó hiệu quả bằng cách nào?',
    hint: 'Nêu một việc ưu tiên, căn cứ từ dữ liệu, và con số em sẽ theo dõi.'
  },
  stages: [['research', 'Nghiên cứu'], ['create', 'EVP & bài đăng'], ['handoff', 'Kênh & bàn giao']],
  // Gợi ý trợ lý theo việc. guided = Làm quen, self = Thử sức (chỉ câu hỏi định hướng).
  assistant: {
    research: {
      title: 'Đọc dữ liệu nghiên cứu',
      guided: [
        'EVP (Employee Value Proposition) là lý do thật khiến người ta muốn làm ở công ty. Nó phải đến từ trải nghiệm của nhân viên hiện tại, không phải điều công ty muốn nói.',
        'Đọc khảo sát nội bộ để tìm điều nhân viên thích nhất, rồi đối chiếu với lý do ứng viên bỏ đi để biết ứng viên đang lo điều gì.',
        'Ghi lại cả điểm khó (ca tối đông, khách khó tính). Thương hiệu tuyển dụng tốt nói thật điểm khó và cho biết công ty hỗ trợ thế nào.'
      ],
      sample: 'Ghi chú mẫu — Nhân viên thích: đồng đội hỗ trợ (11/14), đào tạo kèm 1-1 (9/14), lịch ca báo trước (8/14). Ứng viên lo: không rõ thu nhập (6/12), sợ ca tối (5/12), không biết việc cụ thể (4/12). Điểm khó cần nói thật: ca 19h–21h đông tin nhắn.',
      self: [
        'Ba điều nhân viên hiện tại đánh giá cao nhất là gì, và bao nhiêu người chọn?',
        'Ứng viên bỏ đi vì những lo ngại nào? Thông tin nào trong chính sách trả lời được lo ngại đó?',
        'Điều gì trong dữ liệu là điểm khó mà bạn không nên giấu?'
      ]
    },
    evp: {
      title: 'Chọn 3 trụ cột EVP',
      guided: [
        'Một trụ cột tốt vừa được nhiều nhân viên xác nhận, vừa trả lời đúng lo ngại của ứng viên.',
        'Mỗi trụ cột cần một bằng chứng cụ thể: con số trong khảo sát, chính sách HR đã xác nhận hoặc câu nói của nhân viên.',
        'Tránh lời hứa không có căn cứ hoặc trái sự thật. Ứng viên vào làm thấy khác lời quảng cáo sẽ nghỉ sớm và kể lại với người khác.'
      ],
      sample: 'Ví dụ trụ cột "Đào tạo bài bản, có người kèm 1-1" — Bằng chứng: 9/14 nhân viên chọn đây là điều thích nhất; chính sách đào tạo 2 tuần đầu có trưởng ca kèm; Hà: "Tuần đầu mình được chị trưởng ca kèm 1-1…".',
      self: [
        'Trụ cột này có bao nhiêu nhân viên xác nhận, hoặc có trong chính sách HR không?',
        'Nếu ứng viên vào làm, họ có thấy đúng như trụ cột này không?',
        'Trụ cột nào trả lời được lý do ứng viên bỏ đi?'
      ]
    },
    post: {
      title: 'Viết bài đăng tuyển dụng',
      guided: [
        'Bài đăng nên cho ứng viên biết ngay: công việc làm gì, ca làm, thu nhập (lương, thưởng, phụ cấp) và cách ứng tuyển.',
        'Nói thật về ca tối đông, kèm cách team hỗ trợ. Thông tin rõ ràng giúp đúng người ứng tuyển và giảm số người bỏ giữa chừng.',
        'Chỉ dùng tên và câu nói của nhân viên đã đồng ý. Viết hợp với kênh: nhóm việc làm cần ngắn gọn, rõ thông tin; LinkedIn hợp với nội dung chuyên môn hơn.'
      ],
      sample: 'Tiêu đề: NOVA Commerce tuyển 3 Nhân viên CSKH ca chiều — được kèm 1-1 từ ngày đầu. Nội dung: Trả lời chat và xử lý đổi trả cho khách mua online. Ca 13h–21h, luân phiên cuối tuần, lịch báo trước 2 tuần. Thu nhập: lương 8–10 triệu + thưởng hài lòng khách tới 1,5 triệu + 30k mỗi ca sau 19h. Ca tối đông tin nhắn, nhưng team chia việc và đỡ nhau ("Ca tối đông thật, nhưng team chia việc rõ…" — Tùng, 8 tháng). Gửi CV về tuyendung@novacommerce.example trước thứ Sáu.',
      self: [
        'Đọc bài của bạn, ứng viên đã biết thu nhập thực nhận gồm những khoản nào chưa?',
        'Bài có nói thật về ca tối không? Nếu có, bạn đã nói công ty hỗ trợ thế nào?',
        'Câu nói của nhân viên bạn dùng đã được đồng ý chưa?'
      ]
    },
    plan: {
      title: 'Chọn kênh và chỉ số đo',
      guided: [
        'Chọn kênh theo nơi ứng viên CSKH thật sự xuất hiện: người tìm việc ca và sinh viên ở Hà Nội, không phải nơi có nhiều người theo dõi nhất.',
        'Giới thiệu nội bộ thường mang lại người phù hợp vì nhân viên hiểu công việc. Dữ liệu cho thấy 3/5 nhân viên giỏi nhất đến từ kênh này.',
        'Chỉ số nên đo kết quả tuyển dụng (số hồ sơ, tỷ lệ đi tiếp, tỷ lệ bỏ vì lương/ca), không chỉ đo lượt thích.'
      ],
      sample: 'Kênh: nhóm "Việc làm Hà Nội" (tiếp cận rộng người tìm việc ca), fanpage (nơi ứng viên kiểm tra công ty), giới thiệu nội bộ (chất lượng cao). Chỉ số: số hồ sơ CSKH/tuần (từ khoảng 4 lên 10) và tỷ lệ bỏ vì lương/ca (từ 11/12 lý do xuống dưới một nửa).',
      self: [
        'Ứng viên CSKH ở Hà Nội thường tìm việc ở đâu?',
        'Kênh nào có số liệu cho thấy mang lại người làm tốt?',
        'Nếu bài đăng được nhiều lượt thích nhưng không thêm hồ sơ, bạn có coi là thành công không?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho anh Quân',
      guided: [
        'Khuyến nghị tốt có ba ý: một việc ưu tiên, căn cứ từ dữ liệu, và con số sẽ theo dõi để biết có hiệu quả.',
        'Trả lời luôn câu hỏi về "không áp lực": nên hay không, và nói thay thế thế nào cho đúng sự thật.',
        'Viết ngắn, đi thẳng vào ý. Anh Quân cần quyết định nhanh.'
      ],
      sample: 'Em ưu tiên đăng lại tin trên nhóm "Việc làm Hà Nội" với thu nhập ghi rõ (8–10 triệu + thưởng + phụ cấp ca tối), vì 6/12 ứng viên bỏ đi do không rõ thu nhập. Em không ghi "không áp lực" vì 10/14 nhân viên nói ca tối rất đông; thay vào đó em nói team đỡ nhau và được kèm 1-1. Sau 2 tuần em đo số hồ sơ CSKH mỗi tuần và tỷ lệ bỏ vì lương/ca.',
      self: [
        'Việc nào bạn tin sẽ tạo khác biệt lớn nhất trong 2 tuần, dựa trên số liệu nào?',
        'Bạn trả lời gợi ý "không áp lực" của chị Mai thế nào?',
        'Con số nào cho anh Quân biết đề xuất của bạn có hiệu quả?'
      ]
    },
    feedback: {
      title: 'Đọc nhận xét và sửa bài',
      guided: [
        'Đọc từng tiêu chí chưa đạt và phần gợi ý. Sửa đúng chỗ được góp ý trước khi nộp lại.',
        'Mỗi lần nộp lại là một phiên bản mới, bạn có thể so sánh với bản trước trong Hồ sơ trải nghiệm.'
      ],
      self: [
        'Tiêu chí nào chưa đạt và bằng chứng nào trong dữ liệu giúp bạn sửa?',
        'Nếu là anh Quân, bạn có duyệt bài này ngay không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  fallback: {
    nostress: 'Trụ cột "Công việc không áp lực" trái với dữ liệu: 10/14 nhân viên nói giờ cao điểm buổi tối rất đông. Ứng viên vào làm thấy khác sẽ nghỉ sớm. Hãy nói thật về ca đông và cách team hỗ trợ.',
    remote: 'Trụ cột "Làm việc linh hoạt từ xa" không đúng: chính sách ghi rõ vị trí CSKH không có chế độ làm từ xa.',
    toppay: 'Trụ cột "Lương cao nhất thị trường" chưa có căn cứ: HR chưa có số liệu so sánh lương với thị trường. Hãy ghi con số thu nhập cụ thể thay vì so sánh.',
    income: 'Bài đăng chưa nêu rõ thu nhập (lương 8–10 triệu, thưởng tới 1,5 triệu, phụ cấp ca tối), trong khi 6/12 ứng viên bỏ đi vì không rõ thu nhập.',
    night: 'Bài đăng chưa nói về ca tối hoặc ca 13h–21h. 5/12 ứng viên bỏ đi vì lo ngại ca làm; nói rõ từ đầu giúp đúng người ứng tuyển.',
    consent: 'Bài đăng dùng câu nói của Mai Anh, nhưng Mai Anh chưa đồng ý cho dùng tên và câu nói. Hãy dùng câu của Hà hoặc Tùng, hoặc chờ Mai Anh xác nhận.',
    vanity: 'Hai chỉ số bạn chọn chỉ đo mức độ quan tâm trên mạng xã hội (lượt thích, người theo dõi). Hãy đo ít nhất một chỉ số về kết quả tuyển dụng như số hồ sơ hoặc tỷ lệ đi tiếp.',
    linkedin: 'LinkedIn chủ yếu là nhân sự văn phòng và quản lý, ít người tìm việc CSKH theo ca. Cân nhắc nhóm "Việc làm Hà Nội" hoặc giới thiệu nội bộ.'
  },
  cvLine: 'Phân tích khảo sát nội bộ và lý do ứng viên bỏ quy trình để xây dựng 3 trụ cột EVP, viết bài đăng tuyển dụng và đề xuất kênh, chỉ số đo cho chiến dịch tuyển Nhân viên CSKH (dự án mô phỏng VAOVIEC.).'
};
