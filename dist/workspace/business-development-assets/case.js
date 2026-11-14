// MISSION_003 · Business Development Executive (B2B) tại NOVA Commerce.
// Nội dung case dùng chung cho web (/workspace/mission-engine.js) và server (lib/review-simple.js, lib/assistant-core.js).
// Mọi công ty, người liên hệ và số liệu đều là giả lập.
const CASE = {
  id: 'MISSION_003',
  role: 'Business Development Executive (B2B)',
  roleVi: 'Chuyên viên Phát triển Kinh doanh B2B',
  company: 'NOVA Commerce',
  manager: 'Chị Lan · Trưởng nhóm Kinh doanh B2B',
  managerShort: 'chị Lan',
  deadline: '17:00 thứ Sáu',
  duration: '15–20 phút',
  ui: {
    slug: 'business-development-executive-b2b',
    storageKey: 'vaoviec-workspace-mission-003-v1',
    caseName: 'NOVA Commerce · Quà Tết doanh nghiệp',
    topic: 'phát triển kinh doanh B2B',
    tabs: { brief: 'Brief từ chị Lan', data: 'Dữ liệu khách hàng', evp: 'Chọn lead ưu tiên', post: 'Email tiếp cận', plan: 'Theo dõi & chỉ số', handoff: 'Bàn giao' },
    dataLead: 'Mở từng tài liệu để biết lead nào phù hợp và nên nói gì với họ.',
    pick: { count: 3, summary: 'Lead ưu tiên', lead: 'Chọn đúng 3 lead nên liên hệ trong tuần này và ghi lý do cho từng lead (quy mô, tín hiệu nhu cầu, lịch sử liên hệ).', placeholder: 'Lý do: ví dụ “350 nhân viên, HR đã hỏi về quà Tết ở hội thảo HR tháng 10…”', error: 'Chọn đúng 3 lead và ghi lý do tối thiểu {min} ký tự cho mỗi lead.' },
    write: { min: 150, summary: 'Email', preview: 'email', sender: 'Bạn · Kinh doanh B2B, NOVA Commerce', quoteSource: 'cases', lead: 'Viết email đầu tiên gửi một người liên hệ. Bên phải là bản xem trước như trong hộp thư của khách.', channelLegend: 'Gửi cho', titleLabel: 'Tiêu đề email', titlePlaceholder: 'Ví dụ: Quà Tết cho 350 nhân viên TechViet — gợi ý từ NOVA', bodyLabel: 'Nội dung email', bodyPlaceholder: 'Chào hỏi, nhắc lại bối cảnh, giá trị cho khách, đề xuất bước tiếp theo cụ thể…', quoteLabel: 'Đính kèm case study (không bắt buộc)', error: 'Chọn người nhận, viết tiêu đề và nội dung email tối thiểu {min} ký tự.' },
    plan: { maxChannels: 3, kpiCount: 2, summaryChannels: 'Bước theo dõi', summaryKpis: 'Chỉ số', lead: 'Chọn 1–3 bước theo dõi sau email đầu tiên và đúng 2 chỉ số để biết chiến dịch có hiệu quả.', channelLegend: 'Bước theo dõi', kpiLegend: 'Chỉ số đo', targetLabel: 'Mục tiêu cụ thể (không bắt buộc)', targetPlaceholder: 'Ví dụ: 2 cuộc hẹn trong tuần tới, 1 đơn trước 20/12', error: 'Chọn ít nhất 1 bước theo dõi và đúng 2 chỉ số đo.' }
  },
  companyIntro: [
    'NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập ở Hà Nội, bán đồ gia dụng nhỏ qua website và sàn thương mại điện tử.',
    'Năm nay công ty mở mảng B2B: bán hộp quà Tết cho doanh nghiệp tặng nhân viên và đối tác, giá 350.000–900.000 đồng/hộp.',
    'Mục tiêu quý IV của nhóm Kinh doanh B2B là ký 2 đơn hàng doanh nghiệp trước 20/12. Bạn mới vào nhóm và được giao chuẩn bị đợt tiếp cận đầu tiên.'
  ],
  roleIntro: [
    'Business Development B2B là tìm và mở quan hệ với khách hàng doanh nghiệp: tìm ai đang có nhu cầu, hiểu họ cần gì, rồi đề xuất giải pháp phù hợp.',
    'Công việc hằng ngày gồm sàng lọc danh sách khách hàng tiềm năng (lead), đọc lịch sử liên hệ trong CRM, viết email và gọi điện tiếp cận, theo dõi đến khi có cuộc hẹn hoặc đơn hàng.',
    'Trong nhiệm vụ này, bạn đọc dữ liệu 8 lead, chọn 3 lead ưu tiên, viết email đầu tiên, lên kế hoạch theo dõi và gửi đề xuất cho chị Lan.'
  ],
  brief: {
    from: 'Chị Lan',
    subject: 'Chuẩn bị đợt tiếp cận quà Tết doanh nghiệp',
    body: [
      'Chào em,',
      'Tuần này nhóm mình bắt đầu tiếp cận khách hàng doanh nghiệp cho mùa quà Tết. Chị có 8 lead từ CRM, hội thảo và website, em xem trong mục Dữ liệu khách hàng nhé.',
      'Em làm giúp chị: (1) chọn 3 lead nên liên hệ trước, kèm lý do; (2) viết email đầu tiên cho một người; (3) chọn các bước theo dõi và 2 chỉ số để đo.',
      'Lưu ý: anh Tuấn bên Marketing gợi ý gửi cùng một email cho cả 8 lead, mỗi ngày nhắc một lần cho nhanh. Em cân nhắc giúp chị nhé.',
      'Gửi chị trước 17:00 thứ Sáu. Cảm ơn em!'
    ]
  },
  sources: [
    {
      id: 'leads',
      title: 'Danh sách 8 lead',
      meta: 'Xuất từ CRM · cập nhật hôm qua',
      rows: [
        ['TechViet Software · 350 nhân viên · Hà Nội', 'Chị Ngân · HR Manager', 'Gặp ở hội thảo HR tháng 10, để lại danh thiếp, hỏi "bên em có làm quà Tết cho nhân viên không"'],
        ['GreenFood JSC · 220 nhân viên · TP.HCM', 'Anh Phúc · Trưởng phòng Hành chính', 'Điền form trên website, tải bảng giá B2B 2 lần trong tuần này'],
        ['Minh Long Logistics · 480 nhân viên · Hà Nội', 'Chị Thảo · Phó phòng Nhân sự', 'Được khách cũ ABC Software giới thiệu, chị Thảo đã đồng ý nhận email'],
        ['Sao Việt Bank (chi nhánh) · 150 nhân viên · Hà Nội', 'Anh Dũng · Hành chính', 'Xem ghi chú CRM'],
        ['Studio9 Design · 12 nhân viên · Hà Nội', 'Chị Hoa · Giám đốc', 'Nhắn hỏi giá 1 lần qua fanpage'],
        ['EduPlus Academy · 120 nhân viên · Đà Nẵng', 'info@eduplus.example (email chung)', 'Không có người liên hệ cụ thể, chưa có tương tác'],
        ['PrintPro · 300 nhân viên · Hà Nội', 'Anh Khoa · Mua hàng', 'Hỏi có in logo công ty lên 100 hộp quà không'],
        ['ShopNow · 600 nhân viên · TP.HCM', 'Chị Vy · Hành chính', 'Sàn thương mại điện tử, đối thủ trực tiếp của NOVA']
      ],
      head: ['Công ty', 'Người liên hệ', 'Tín hiệu']
    },
    {
      id: 'crm',
      title: 'Ghi chú CRM',
      meta: 'Lịch sử liên hệ gần nhất',
      facts: [
        'Sao Việt Bank: tháng 9 anh Dũng trả lời "năm nay đã chọn nhà cung cấp khác, vui lòng liên hệ lại vào tháng 3". Đã đánh dấu "Không liên hệ đến tháng 3".',
        'Studio9 Design: hỏi giá cho 12 hộp. Chưa trả lời.',
        'GreenFood JSC: anh Phúc ghi trong form "cần xuất hoá đơn VAT, giao trước 15/1".',
        'TechViet Software: chị Ngân nói ngân sách quà Tết được duyệt vào tuần đầu tháng 12.',
        'ShopNow: quy định nội bộ của NOVA không bán sỉ cho sàn thương mại điện tử cạnh tranh.'
      ],
      not: ['Chưa có ghi chú nào cho Minh Long, EduPlus, PrintPro.']
    },
    {
      id: 'policy',
      title: 'Bảng giá & chính sách B2B',
      meta: 'Đã được Kế toán và Kho xác nhận',
      facts: [
        'Hộp quà 350.000 / 550.000 / 900.000 đồng (đã gồm VAT).',
        'Đơn tối thiểu 50 hộp. Chiết khấu 5% từ 200 hộp, 8% từ 400 hộp.',
        'Xuất hoá đơn VAT cho mọi đơn.',
        'Giao miễn phí tại Hà Nội và TP.HCM trong 7 ngày làm việc kể từ khi chốt đơn.',
        'Thiệp in tên công ty miễn phí. In logo lên hộp chỉ áp dụng từ 300 hộp.'
      ],
      not: ['Không cam kết giao trong 48 giờ.', 'Không in logo lên hộp cho đơn dưới 300 hộp.', 'Chưa giao ngoài Hà Nội và TP.HCM.']
    },
    {
      id: 'cases',
      title: 'Case study khách hàng cũ',
      meta: 'Có thể đính kèm vào email nếu khách đã cho phép',
      quotes: [
        { id: 'abc', name: 'Case study ABC Software', role: '300 hộp quà Trung thu · đã đồng ý cho dùng tên', text: 'Nhân viên rất thích hộp quà, NOVA giao đúng hẹn và xuất hoá đơn nhanh.', consent: true },
        { id: 'xyz', name: 'Case study Ngân hàng XYZ', role: '500 hộp quà Tết năm ngoái · chưa đồng ý công khai', text: 'Đơn lớn nhất của NOVA năm ngoái.', consent: false }
      ],
      note: 'ABC Software đã ký đồng ý cho NOVA dùng tên và nhận xét. Ngân hàng XYZ yêu cầu không chia sẻ tên ra ngoài.'
    },
    {
      id: 'insight',
      total: 50,
      title: 'Khảo sát: HR chọn nhà cung cấp quà Tết thế nào',
      meta: 'Khảo sát 50 phòng Nhân sự/Hành chính · tháng 10',
      items: [
        ['Tiêu chí quan trọng nhất', [
          ['Xuất hoá đơn VAT đầy đủ', 36],
          ['Giao đúng hẹn trước Tết', 33],
          ['Giá phù hợp ngân sách/người', 29],
          ['Có thể in tên/logo công ty', 20],
          ['Mẫu quà đẹp, mới', 18]
        ]]
      ],
      note: 'Mỗi người chọn tối đa 3 tiêu chí. Số bên phải là số người chọn (trên 50).'
    },
    {
      id: 'oldmail',
      title: 'Email mẫu cũ bị khách phàn nàn',
      meta: 'Marketing gửi đồng loạt năm ngoái',
      posts: [
        'Kính gửi Quý công ty, NOVA Commerce hân hạnh giới thiệu bộ sưu tập quà Tết cao cấp với giá cạnh tranh nhất thị trường. Liên hệ ngay để nhận ưu đãi khủng!!! Trân trọng.'
      ],
      note: 'Tỷ lệ phản hồi 0,4%. Nhiều người đánh dấu là thư rác vì không nêu tên, không biết họ cần gì và không có bước tiếp theo rõ ràng.'
    }
  ],
  // "Lựa chọn" của bước Chọn: 8 lead. Trong đó có lead không nên liên hệ hoặc không phù hợp.
  pillars: [
    { id: 'techviet', label: 'TechViet Software', meta: '350 nhân viên · Hà Nội · chị Ngân (HR)' },
    { id: 'greenfood', label: 'GreenFood JSC', meta: '220 nhân viên · TP.HCM · anh Phúc (Hành chính)' },
    { id: 'minhlong', label: 'Minh Long Logistics', meta: '480 nhân viên · Hà Nội · chị Thảo (Nhân sự)' },
    { id: 'saoviet', label: 'Sao Việt Bank (chi nhánh)', meta: '150 nhân viên · Hà Nội · anh Dũng' },
    { id: 'studio9', label: 'Studio9 Design', meta: '12 nhân viên · Hà Nội · chị Hoa' },
    { id: 'eduplus', label: 'EduPlus Academy', meta: '120 nhân viên · Đà Nẵng · email chung' },
    { id: 'printpro', label: 'PrintPro', meta: '300 nhân viên · Hà Nội · anh Khoa (Mua hàng)' },
    { id: 'shopnow', label: 'ShopNow', meta: '600 nhân viên · TP.HCM · chị Vy' }
  ],
  // "Kênh" của bước soạn nội dung: người nhận email.
  postChannels: [
    ['techviet', 'Chị Ngân · HR Manager, TechViet Software'],
    ['greenfood', 'Anh Phúc · Trưởng phòng Hành chính, GreenFood JSC'],
    ['minhlong', 'Chị Thảo · Phó phòng Nhân sự, Minh Long Logistics'],
    ['saoviet', 'Anh Dũng · Hành chính, Sao Việt Bank'],
    ['eduplus', 'info@eduplus.example · EduPlus Academy']
  ],
  planChannels: [
    ['call', 'Gọi điện sau 2 ngày làm việc nếu chưa phản hồi'],
    ['reminder', 'Gửi email nhắc ngắn sau 4 ngày, kèm 1 thông tin mới'],
    ['linkedin', 'Kết nối LinkedIn với người liên hệ, gửi lời nhắn ngắn'],
    ['sample', 'Đề xuất gửi hộp quà mẫu cho lead đã có cuộc hẹn'],
    ['blast', 'Gửi cùng một email cho cả 8 lead, nhắc lại mỗi ngày']
  ],
  kpis: [
    ['reply', 'Tỷ lệ lead trả lời email'],
    ['meetings', 'Số cuộc hẹn gọi điện/gặp mặt đặt được'],
    ['deals', 'Số đơn hàng ký trước 20/12'],
    ['sent', 'Số email đã gửi đi'],
    ['opens', 'Số lượt mở email']
  ],
  handoff: {
    subject: 'Đề xuất đợt tiếp cận quà Tết doanh nghiệp',
    question: 'Nếu tuần này chỉ theo đuổi được một khách hàng, em chọn ai? Vì sao, và bước tiếp theo cụ thể với khách đó là gì?',
    hint: 'Nêu một khách hàng, căn cứ từ dữ liệu, và bước tiếp theo có thời điểm cụ thể.'
  },
  stages: [['research', 'Nghiên cứu'], ['create', 'Chọn lead & email'], ['handoff', 'Theo dõi & bàn giao']],
  assistant: {
    research: {
      title: 'Đọc dữ liệu khách hàng',
      guided: [
        'Lead là khách hàng tiềm năng. Không phải lead nào cũng đáng liên hệ ngay: hãy xem quy mô có đủ đơn tối thiểu không, họ có tín hiệu nhu cầu không, và lịch sử liên hệ có gì cần tôn trọng.',
        'Đọc ghi chú CRM trước khi liên hệ. Khách đã từ chối và hẹn thời điểm khác thì nên ghi nhận, không làm phiền.',
        'Khảo sát cho biết HR quan tâm điều gì khi chọn nhà cung cấp quà Tết. Đó là chất liệu để viết email đúng điều khách cần.'
      ],
      sample: 'Ghi chú mẫu — Lead nóng: TechViet (350 NV, HR đã hỏi quà Tết, ngân sách duyệt đầu tháng 12), GreenFood (220 NV, tải bảng giá 2 lần, cần VAT và giao trước 15/1), Minh Long (480 NV, được khách cũ giới thiệu). Không nên liên hệ: Sao Việt (hẹn tháng 3), Studio9 (12 hộp < tối thiểu 50), ShopNow (đối thủ).',
      self: [
        'Lead nào có tín hiệu nhu cầu rõ ràng trong tuần này?',
        'Ghi chú CRM nào cho biết bạn KHÔNG nên liên hệ một lead?',
        'Chính sách nào giới hạn điều bạn có thể hứa với khách?'
      ]
    },
    evp: {
      title: 'Chọn 3 lead ưu tiên',
      guided: [
        'Một lead tốt cần ba điều: đủ quy mô (đơn tối thiểu 50 hộp), có tín hiệu nhu cầu gần đây, và có người liên hệ cụ thể.',
        'Lead được khách cũ giới thiệu thường dễ mở lời hơn vì đã có người tin tưởng bảo chứng.',
        'Ghi lý do bằng dữ kiện: số nhân viên, tín hiệu đã thấy, thời điểm ngân sách. Tránh lý do chung chung như "công ty lớn".'
      ],
      sample: 'Ví dụ cho GreenFood JSC — Lý do: 220 nhân viên (trên mức tối thiểu 50 hộp); anh Phúc tải bảng giá B2B 2 lần trong tuần và cần VAT, giao trước 15/1, đều nằm trong chính sách của NOVA.',
      self: [
        'Lead này có đủ quy mô cho đơn tối thiểu không?',
        'Tín hiệu nhu cầu của lead này là gì và xảy ra khi nào?',
        'Có ghi chú nào trong CRM khiến bạn nên chờ hoặc không liên hệ?'
      ]
    },
    post: {
      title: 'Viết email tiếp cận',
      guided: [
        'Email đầu tiên nên ngắn (dưới 150 chữ), gọi đúng tên người nhận và nhắc lại bối cảnh họ đã biết (gặp ở hội thảo, đã tải bảng giá…).',
        'Nói giá trị gắn với điều HR quan tâm: hoá đơn VAT, giao đúng hẹn, giá theo ngân sách/người. Chỉ hứa điều chính sách cho phép.',
        'Kết thúc bằng một bước tiếp theo cụ thể, dễ đồng ý, ví dụ hẹn gọi 15 phút vào một ngày cụ thể. Chỉ đính kèm case study khách đã cho phép.'
      ],
      sample: 'Tiêu đề: Quà Tết cho đội ngũ TechViet — theo trao đổi ở hội thảo HR. Nội dung: Chào chị Ngân, em là … ở NOVA Commerce, mình gặp nhau ở hội thảo HR tháng 10. Chị có hỏi về quà Tết cho nhân viên nên em gửi chị 3 mức hộp quà 350–900 nghìn (đã gồm VAT). Với khoảng 350 phần, TechViet được chiết khấu 5% và in tên công ty trên thiệp miễn phí; NOVA giao tận nơi trong 7 ngày làm việc. Em gửi kèm case study ABC Software. Chị có tiện cho em 15 phút gọi vào thứ Ba tuần sau để em gửi gợi ý theo ngân sách không ạ?',
      self: [
        'Người nhận có nhận ra ngay vì sao bạn viết cho họ không?',
        'Mọi điều bạn hứa (giá, thời gian giao, in logo) có đúng chính sách không?',
        'Bước tiếp theo bạn đề xuất có cụ thể và dễ trả lời "có" không?'
      ]
    },
    plan: {
      title: 'Lên kế hoạch theo dõi',
      guided: [
        'Phần lớn hợp đồng B2B đến sau vài lần theo dõi, nhưng nhắc quá dày sẽ bị coi là làm phiền.',
        'Mỗi lần theo dõi nên mang thêm một giá trị mới (thông tin, mẫu, gợi ý theo ngân sách) chứ không chỉ hỏi "anh/chị đã xem email chưa".',
        'Chỉ số tốt đo kết quả: tỷ lệ trả lời, số cuộc hẹn, số đơn. Số email gửi đi hay lượt mở chỉ là chỉ số phụ.'
      ],
      sample: 'Theo dõi: gọi điện sau 2 ngày làm việc nếu chưa phản hồi; email nhắc ngắn sau 4 ngày kèm gợi ý hộp quà theo ngân sách. Chỉ số: số cuộc hẹn đặt được (mục tiêu 2 trong tuần tới) và số đơn ký trước 20/12 (mục tiêu 1).',
      self: [
        'Khách hàng sẽ cảm thấy thế nào nếu nhận email nhắc mỗi ngày?',
        'Bước theo dõi nào mang thêm giá trị cho khách?',
        'Nếu gửi 100 email mà không có cuộc hẹn nào, bạn có coi là thành công không?'
      ]
    },
    handoff: {
      title: 'Bàn giao cho chị Lan',
      guided: [
        'Khuyến nghị tốt nêu một khách hàng, dữ kiện cho thấy họ sẵn sàng nhất, và bước tiếp theo có thời điểm cụ thể.',
        'Trả lời luôn gợi ý gửi đồng loạt mỗi ngày của Marketing: nên hay không, và làm thay thế thế nào.',
        'Viết ngắn gọn để chị Lan quyết định nhanh.'
      ],
      sample: 'Em ưu tiên GreenFood: anh Phúc tải bảng giá 2 lần tuần này và đã nêu rõ nhu cầu (VAT, giao trước 15/1) — đều đáp ứng được. Bước tiếp theo: gửi email hôm nay, gọi anh Phúc thứ Tư để đề xuất 2 mức hộp theo ngân sách. Em không gửi đồng loạt mỗi ngày vì email mẫu cũ chỉ có 0,4% phản hồi và bị đánh dấu rác; em sẽ viết riêng cho 3 lead và theo dõi bằng điện thoại.',
      self: [
        'Khách nào có khả năng chốt sớm nhất, dựa trên tín hiệu nào?',
        'Bước tiếp theo của bạn diễn ra khi nào, bằng kênh gì?',
        'Bạn trả lời gợi ý gửi email đồng loạt mỗi ngày thế nào?'
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
        'Nếu là chị Lan, bạn có duyệt gửi email này cho khách ngay không? Vì sao?'
      ]
    }
  },
  // Nhận xét nhanh khi không gọi được AI.
  report(p) {
    const notes = [];
    const has = id => p.pillars.some(x => x.id === id);
    if (has('saoviet')) notes.push('Sao Việt Bank đã từ chối và đề nghị liên hệ lại vào tháng 3 (ghi chú CRM). Liên hệ lúc này dễ làm mất thiện cảm.');
    if (has('studio9')) notes.push('Studio9 Design chỉ có 12 nhân viên, dưới mức đơn tối thiểu 50 hộp.');
    if (has('shopnow')) notes.push('ShopNow là đối thủ trực tiếp; quy định nội bộ không bán sỉ cho sàn cạnh tranh.');
    if (p.post.channel && !p.pillars.some(x => x.id === p.post.channel)) notes.push('Email gửi cho người không nằm trong 3 lead bạn ưu tiên. Hãy viết cho một lead bạn đã chọn.');
    if (p.post.channel === 'eduplus') notes.push('Email chung info@ không có người nhận cụ thể, khó cá nhân hoá và dễ bị bỏ qua.');
    const text = `${p.post.title}\n${p.post.body}`.toLowerCase();
    if (/48\s*(h|giờ)|trong 2 ngày|ngay trong ngày/.test(text)) notes.push('Email hứa giao nhanh hơn chính sách (giao trong 7 ngày làm việc, không cam kết 48 giờ).');
    if (/in logo|logo công ty lên hộp/.test(text) && p.post.channel !== 'minhlong') notes.push('In logo lên hộp chỉ áp dụng từ 300 hộp. Kiểm tra lại quy mô đơn trước khi hứa.');
    if (!/\d{1,2}\s*phút|gọi|hẹn|lịch/.test(text)) notes.push('Email chưa có bước tiếp theo cụ thể (ví dụ hẹn gọi 15 phút vào một ngày cụ thể).');
    if (p.post.quote === 'xyz') notes.push('Ngân hàng XYZ chưa đồng ý chia sẻ tên ra ngoài. Hãy dùng case study ABC Software hoặc không đính kèm.');
    if (p.plan.channels.includes('blast')) notes.push('Gửi cùng một email cho mọi lead và nhắc mỗi ngày dễ bị coi là thư rác; email mẫu cũ chỉ có 0,4% phản hồi.');
    if (p.plan.kpis.every(k => ['sent', 'opens'].includes(k))) notes.push('Hai chỉ số bạn chọn chỉ đo hoạt động (email gửi, lượt mở). Hãy đo ít nhất một kết quả: phản hồi, cuộc hẹn hoặc đơn hàng.');
    return notes.length ? notes : ['Bài làm không mắc các lỗi phổ biến mà bộ kiểm tra nhanh tìm được. Khi AI chấm hoạt động lại, bạn sẽ nhận nhận xét chi tiết theo 4 tiêu chí.'];
  },
  cvLine: 'Sàng lọc 8 khách hàng tiềm năng B2B theo quy mô, tín hiệu nhu cầu và lịch sử CRM; viết email tiếp cận cá nhân hoá và kế hoạch theo dõi kèm chỉ số cho chiến dịch quà Tết doanh nghiệp (dự án mô phỏng VAOVIEC.).'
};
