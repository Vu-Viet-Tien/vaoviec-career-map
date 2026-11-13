// Nội dung mẫu của case. Giữ nguyên ID khi sửa câu chữ.
const CASE = {
  roleName: 'Talent Acquisition Intern',
  roleSlug: 'talent-acquisition-intern',
  caseName: 'NOVA Commerce · Tuyển nhân viên CSKH',
  introTitle: 'BẠN ĐANG ĐÓNG VAI TALENT ACQUISITION INTERN TẠI NOVA COMMERCE',
  companyIntro: [
    ['Về NOVA Commerce', [
      ['NOVA Commerce là doanh nghiệp bán lẻ trực tuyến giả lập có văn phòng tại Hà Nội. Công ty bán đồ gia dụng nhỏ và sản phẩm tiện ích hằng ngày qua website và các sàn thương mại điện tử.'],
      ['NOVA muốn giúp khách hàng mua sắm dễ dàng và nhận được hỗ trợ kịp thời khi có vấn đề với đơn hàng. Đội Chăm sóc khách hàng làm việc theo ba nguyên tắc: ', {bold:'thông tin rõ ràng, giữ đúng hẹn và bàn giao đầy đủ'}, ' để ca sau có thể tiếp tục xử lý.']
    ]],
    ['Vì sao đội cần tuyển thêm người?', [
      ['Trong những đợt khuyến mãi, lượng tin nhắn tăng vào buổi chiều và tối. Nhiều khách cần hỏi về tình trạng giao hàng hoặc đổi trả, trong khi một số yêu cầu còn tồn sang ca sau. Đội Chăm sóc khách hàng cần tuyển ', {bold:'1 nhân viên'}, ' để bổ sung ca chiều và luân phiên trực cuối tuần.']
    ]],
    ['Bạn sẽ làm gì?', [
      ['Bạn vào vai ', {bold:'Thực tập sinh Tuyển dụng'}, ', hỗ trợ chị Mai, Quản lý đội Chăm sóc khách hàng, trong đợt tuyển này. Bạn sẽ chuẩn bị tin đăng, đọc và sàng lọc CV ứng viên, trả lời câu hỏi của người quan tâm, rồi gửi chị Mai ', {bold:'tối đa 3 đề xuất phỏng vấn có căn cứ'}, '.']
    ]]
  ],
  title: 'Nhân viên Chăm sóc khách hàng',
  manager: 'Chị Mai · Quản lý CSKH',
  briefTitle: 'Yêu cầu tuyển dụng — Nhân viên CSKH',
  brief: 'Team chị cần tuyển 1 nhân viên Chăm sóc khách hàng để bổ sung ca chiều và luân phiên trực cuối tuần. Chị gửi kèm JD đã thống nhất với đội Tuyển dụng. Em xem giúp chị nhé.',
  briefEmail: [
    ['Chào em,'],
    ['Team chị cần tuyển ', {bold:'1 nhân viên Chăm sóc khách hàng'}, ' để bổ sung ca chiều và luân phiên trực cuối tuần. Chị gửi kèm JD đã thống nhất với đội Tuyển dụng. Em xem giúp chị nhé.'],
    ['Đầu tiên, em chuẩn bị tin đăng và triển khai trên ', {bold:'các kênh tuyển dụng'}, '. Khi có hồ sơ, em đọc từng CV, đối chiếu với JD và ghi quyết định kèm lý do trong ATS.'],
    ['Trước ', {bold:'16h thứ Sáu'}, ', em gửi chị ', {bold:'tối đa 3 ứng viên đề xuất phỏng vấn'}, ', mỗi bạn kèm lý do dựa trên CV. Lưu ý giúp chị ', {bold:'ca làm 13h00–21h00 và lịch luân phiên cuối tuần'}, ' là điều kiện bắt buộc. Nếu chỉ có một hoặc hai hồ sơ đủ căn cứ, em cứ gửi số đó. Chị sẽ xem danh sách rồi quyết định mời ai phỏng vấn.'],
    ['Cảm ơn em,', {break:true}, 'Mai']
  ],
  jdFile: 'JD_Nhan_vien_CSKH.pdf',
  more: 'Có vẻ vẫn còn ít hồ sơ để cân nhắc. Em thử đăng thêm một kênh nhé.',
  screeningHint: 'Hồ sơ ứng tuyển đã về. Mở Inbox, thêm CV vào ATS và xem câu hỏi của ứng viên.',
  deadline: '16:00 thứ Sáu',
  jd: [
    ['support', 0, 'Tiếp nhận và phản hồi tin nhắn của khách hàng trên website và gian hàng. Xác minh thông tin cần thiết, tra cứu đơn hàng và hướng dẫn khách bước tiếp theo.'],
    ['returns', 0, 'Ghi nhận yêu cầu đổi trả hoặc khiếu nại, kiểm tra thông tin khách cung cấp và phối hợp với kho, vận hành hoặc đơn vị giao hàng để xác minh.'],
    ['tracking', 0, 'Cập nhật bảng theo dõi trên Google Sheets. Khi bàn giao ca, ghi rõ mã đơn, vấn đề, việc đã xử lý, đầu mối phụ trách và hạn phản hồi tiếp theo.'],
    ['weekend', 1, 'Có thể làm toàn thời gian tại văn phòng ở Hà Nội, theo ca 13h00–21h00 và luân phiên trực cuối tuần theo lịch đội.'],
    ['start', 1, 'Có thể bắt đầu làm việc trong vòng 14 ngày kể từ ngày nhận được thư mời làm việc.'],
    ['writing', 1, 'Viết tiếng Việt rõ ràng và lịch sự. Có thể đọc thông tin đơn hàng, tóm tắt yêu cầu của khách và ghi chú để đồng nghiệp tiếp tục xử lý.'],
    ['tools', 1, 'Sử dụng được máy tính và các công cụ làm việc cơ bản như email, chat và trình duyệt. Có khả năng học quy trình tra cứu đơn và cập nhật bảng theo dõi.'],
    ['experience', 2, 'Từng hỗ trợ khách qua chat, bán hàng, theo dõi đơn hoặc xử lý đổi trả. Có thể dùng ví dụ từ công việc bán thời gian, thực tập, hoạt động câu lạc bộ hoặc cửa hàng cá nhân.'],
    ['sheets', 2, 'Từng dùng Excel hoặc Google Sheets để theo dõi đơn, phân loại yêu cầu hoặc bàn giao việc. Ứng viên có thể nêu một đầu việc cụ thể đã làm.'],
    ['systems', 2, 'Đã tiếp xúc với hệ thống quản lý đơn, gian hàng thương mại điện tử hoặc công cụ quản lý yêu cầu của khách hàng.'],
    ['location', 3, 'Làm việc tại văn phòng NOVA Commerce, Hà Nội. Ca 13h00–21h00, luân phiên trực cuối tuần theo lịch đội.'],
    ['benefits', 3, 'Mức lương gross từ 8–10 triệu đồng/tháng. Trong tuần đầu, nhân viên được hướng dẫn tra cứu đơn, áp dụng chính sách đổi trả, sử dụng câu trả lời mẫu và bàn giao ca.'],
    ['apply', 3, 'CV định dạng PDF. Vui lòng nêu lịch làm việc có thể đáp ứng và ngày sớm nhất có thể bắt đầu.'],
    ['apply-email', 3, 'tuyendung@novacommerce.example · Tiêu đề email: [CSKH] Họ và tên'],
    ['apply-deadline', 3, '12h00 thứ Sáu, theo lịch của đợt tuyển mô phỏng']
  ],
  channels: [
    ['career','JobHub','Đăng tin trên trang tuyển dụng bằng form có sẵn.','file','JobHub','jobhub.example','Trang tuyển dụng'],
    ['community','Nhóm việc làm Facebook','Viết bài tuyển dụng công khai trong nhóm việc làm tại Hà Nội.','people','Facebook · Nhóm việc làm','facebook.example/groups/viec-lam-ha-noi','Cộng đồng việc làm'],
    ['alumni','Giới thiệu nội bộ','Nhắn trong kênh công ty để nhờ đồng nghiệp giới thiệu ứng viên.','chat','Chat · Giới thiệu nội bộ','chat.novacommerce.example','Cộng đồng sinh viên & alumni']
  ],
  jobHubFields: [['title','Tiêu đề'],['location','Địa điểm'],['schedule','Ca làm'],['salary','Mức lương'],['duties','Mô tả công việc'],['requirements','Yêu cầu'],['apply','Cách ứng tuyển'],['deadline','Hạn nhận hồ sơ']],
  recruitingGroup:'TUYỂN DỤNG VIỆC LÀM - HÀ NỘI',
  referralChannel:'#giới-thiệu-ứng-viên',
  referralMessages:[
    ['Phương · Tuyển dụng','09:05','Mọi người dùng kênh này để giới thiệu ứng viên cho các vị trí đang mở nhé.'],
    ['Mai · Quản lý CSKH','09:12','Đội CSKH đang cần thêm một người cho ca chiều và luân phiên cuối tuần. Cảm ơn mọi người đã hỗ trợ!']
  ],
  fields: [['title','Tiêu đề'],['duties','Công việc chính'],['requirements','Yêu cầu'],['schedule','Lịch làm và địa điểm'],['benefits','Quyền lợi'],['apply','Cách ứng tuyển'],['deadline','Hạn ứng tuyển']],
  // 5 ứng viên có CV (thư có file đính kèm). Người học tự đọc CV, đối chiếu JD và ra quyết định trong ATS.
  // Mọi dữ kiện cần để quyết định đều nằm trong CV; không còn bước xác minh qua điện thoại.
  people: {
    an: {name:'Nguyễn Minh An', file:'CV_Nguyen_Minh_An.pdf', headline:'Nhân viên Chăm sóc khách hàng', contact:'Hà Nội · minhan.cv@example.com',
      summary:'14 tháng hỗ trợ khách hàng cho gian hàng trên sàn thương mại điện tử. Quen xử lý đổi trả và hoàn tiền.',
      experience:[['Nhân viên CSKH · Cửa hàng Mộc (gian hàng trên sàn TMĐT)','09/2025 – 10/2026',['Trả lời 35–45 lượt chat mỗi ngày về đơn hàng, giao hàng và bảo hành.','Tra cứu đơn và cập nhật tiến độ giao hàng cho khách.','Tiếp nhận yêu cầu đổi trả, hoàn tiền; phối hợp với kho để kiểm tra hàng.']]],
      education:'Cao đẳng Thương mại Hà Nội · Quản trị kinh doanh (2022 – 2025)',
      skills:'Hỗ trợ qua chat · Tra cứu đơn trên hệ thống của sàn · Google Sheets cơ bản',
      availability:'Có thể bắt đầu ngay. Làm được thứ Hai – thứ Sáu, ca chiều hoặc tối. Thứ Bảy và Chủ nhật đã có lịch học cố định.'},
    linh: {name:'Trần Khánh Linh', file:'CV_Tran_Khanh_Linh.pdf', headline:'Trợ lý bán hàng online', contact:'Hà Nội · khanhlinh.cv@example.com',
      summary:'8 tháng trả lời khách và theo dõi đơn cho một cửa hàng gốm bán online. Thích công việc gắn với khách hàng và số liệu.',
      experience:[['Trợ lý bán hàng online · Gốm Mộc An (Facebook và Shopee)','03/2026 – 10/2026',['Trả lời khoảng 30 tin nhắn mỗi ngày về sản phẩm, phí giao hàng và tình trạng đơn.','Theo dõi khoảng 120 yêu cầu đổi trả trên Google Sheets, dùng COUNTIF để đếm yêu cầu quá hạn.','Cuối ngày bàn giao các đơn chưa xử lý xong cho chủ cửa hàng.']]],
      education:'Đại học Thương mại · Marketing (đã hoàn thành chương trình học, chờ nhận bằng)',
      skills:'Google Sheets (COUNTIF, bộ lọc) · Shopee Seller Center · Viết tin nhắn chăm sóc khách',
      availability:'Làm toàn thời gian tại Hà Nội, ca 13h00–21h00, luân phiên cuối tuần. Có thể bắt đầu sau 7 ngày.'},
    huy: {name:'Lê Gia Huy', file:'CV_Le_Gia_Huy.pdf', headline:'Thực tập sinh Truyền thông', contact:'TP. Hồ Chí Minh · giahuy.cv@example.com',
      summary:'Yêu thích trải nghiệm khách hàng, viết nội dung chỉn chu và đúng hạn.',
      experience:[['Thực tập sinh Truyền thông · Công ty Sự kiện Sao Việt','08/2026 – 09/2026',['Viết bài và lên lịch đăng cho fanpage của công ty.','Trả lời bình luận của người tham dự trong một sự kiện nội bộ.']]],
      education:'Đại học Kinh tế TP.HCM · Marketing (sinh viên năm 3)',
      skills:'Canva · Viết nội dung · Microsoft Word',
      availability:'Có thể làm cuối tuần. Ngày thường có lịch học buổi sáng. Hiện ở TP.HCM, sẽ cân nhắc chuyển ra Hà Nội nếu được nhận.'},
    vy: {name:'Phạm Thảo Vy', file:'CV_Pham_Thao_Vy.pdf', headline:'Nhân viên hỗ trợ khách hàng qua email', contact:'Hà Nội · thaovy.cv@example.com',
      summary:'10 tháng phụ trách hộp thư hỗ trợ khách: tra cứu vận đơn, xử lý đổi trả và hoàn tiền.',
      experience:[['Nhân viên CSKH (email) · Giày Lá, thương hiệu giày bán online','01/2026 – 10/2026',['Xử lý khoảng 25 email mỗi ngày về vận đơn, đổi size và hoàn tiền.','Liên hệ đơn vị giao hàng để kiểm tra đơn chậm, hẹn lại thời gian phản hồi cho khách.','Tổng hợp ticket hằng tuần bằng bộ lọc và pivot table trên Excel.']]],
      education:'Đại học Mở Hà Nội · Ngôn ngữ Anh (2020 – 2024)',
      skills:'Viết email chăm sóc khách · Excel (pivot table) · Haravan',
      availability:'Làm toàn thời gian tại Hà Nội, ca 13h00–21h00, nhận luân phiên cuối tuần. Có thể bắt đầu ngay.'},
    chi: {name:'Đỗ Ngọc Chi', file:'CV_Do_Ngoc_Chi.pdf', headline:'Cộng tác viên trực fanpage', contact:'Hà Nội · ngocchi.cv@example.com',
      summary:'5 tháng trực fanpage mỹ phẩm, trả lời câu hỏi về sản phẩm và chuyển đơn cho kho.',
      experience:[['Cộng tác viên trực fanpage · Lá Mint Cosmetics','06/2026 – 10/2026',['Trả lời 20–30 câu hỏi mỗi ngày về thành phần và cách dùng sản phẩm.','Chuyển đơn đặt qua tin nhắn cho nhân viên kho.']]],
      education:'Cao đẳng FPT Polytechnic · Digital Marketing (tốt nghiệp 06/2026)',
      skills:'Trả lời tin nhắn fanpage · Google Sheets cơ bản',
      availability:'Có thể làm cuối tuần. Ngày thường đang làm cộng tác viên đến hết tháng 11, chưa chốt được giờ làm ca chiều.'}
  },
  // Thư ứng viên: 5 thư kèm CV và 4 thư chỉ hỏi thông tin. Thứ tự trong mỗi đợt được xáo ngẫu nhiên cho mỗi lượt chơi.
  // Thư hỏi có câu trả lời soạn sẵn; bấm Trả lời là để hình dung tình huống, không bắt buộc để qua bước.
  emails: [
    {id:'cv-an', wave:1, cv:'an', subject:'Ứng tuyển CSKH · Nguyễn Minh An', body:'Chào chị, em gửi CV và mong có cơ hội chia sẻ kinh nghiệm hỗ trợ khách trên sàn.'},
    {id:'cv-linh', wave:1, cv:'linh', subject:'CV ứng tuyển CSKH', body:'Em gửi CV ạ.'},
    {id:'cv-huy', wave:1, cv:'huy', subject:'Thư ứng tuyển · Lê Gia Huy', body:'Em rất quan tâm trải nghiệm khách hàng và mong được đóng góp vào dịch vụ của NOVA. Em đính kèm CV để chị tham khảo.'},
    {id:'q-shift', wave:1, from:'Hoàng Minh Đức', subject:'Hỏi về ca làm', body:'Chào chị, ca chiều kết thúc lúc mấy giờ và có phải làm cuối tuần không ạ? Em muốn hỏi trước khi ứng tuyển.',
      reply:'Chào Đức, ca làm từ 13h00 đến 21h00 và luân phiên trực cuối tuần theo lịch đội. Nếu phù hợp, em gửi CV dạng PDF về tuyendung@novacommerce.example, tiêu đề “[CSKH] Họ và tên”, trước 12h00 thứ Sáu nhé.'},
    {id:'cv-vy', wave:2, cv:'vy', subject:'[CSKH] Phạm Thảo Vy', body:'Em từng phụ trách email đổi trả. Em gửi CV, mong chị xem giúp ạ.'},
    {id:'cv-chi', wave:2, cv:'chi', subject:'Ứng tuyển CSKH · Đỗ Ngọc Chi', body:'Em đính kèm CV và có thể trao đổi sau 14:00.'},
    {id:'q-salary', wave:2, from:'Vũ Hoàng Nam', subject:'Hỏi về lương và đào tạo', body:'Em chưa từng dùng hệ thống quản lý đơn. Vị trí này có được hướng dẫn không và mức lương thế nào ạ?',
      reply:'Chào Nam, mức lương gross từ 8–10 triệu đồng/tháng. Trong tuần đầu, nhân viên mới được hướng dẫn tra cứu đơn, chính sách đổi trả, câu trả lời mẫu và cách bàn giao ca. Từng dùng hệ thống quản lý đơn là điểm cộng, không phải yêu cầu bắt buộc.'},
    {id:'q-parttime', wave:2, from:'Ngô Thu Trang', subject:'Làm bán thời gian được không ạ?', body:'Em là sinh viên năm 2, chỉ làm được buổi tối các ngày trong tuần. Em có thể ứng tuyển không ạ?',
      reply:'Chào Trang, vị trí này làm toàn thời gian tại văn phòng Hà Nội, ca 13h00–21h00 và luân phiên cuối tuần, nên chưa phù hợp với lịch bán thời gian. Cảm ơn em đã quan tâm, NOVA sẽ thông báo khi có vị trí phù hợp hơn.'},
    {id:'q-word', wave:2, from:'Phạm Quốc Bảo', subject:'Gửi CV bằng file Word được không?', body:'Em chỉ có CV dạng Word, em gửi file này được không ạ? Hạn nộp là khi nào ạ?',
      reply:'Chào Bảo, đội Tuyển dụng nhận CV dạng PDF để hiển thị đúng định dạng. Em xuất file sang PDF rồi gửi về tuyendung@novacommerce.example, tiêu đề “[CSKH] Họ và tên”, trước 12h00 thứ Sáu nhé.'}
  ],
  // Quyết định sàng lọc trong ATS: [mã, nhãn, nhãn ô lý do].
  decisions: [['interview','Đề xuất phỏng vấn','Lý do đề xuất'],['verify','Cần xác minh','Cần xác minh điều gì, vì sao'],['stop','Dừng','Lý do dừng']],
  handoff: {
    subject: 'Đề xuất phỏng vấn · Nhân viên CSKH',
    question: 'Nếu hôm nay chị chỉ phỏng vấn được một người, em ưu tiên ai? Nêu căn cứ và đề xuất phương án dự phòng.',
    hint: 'Nêu người ưu tiên, dữ kiện khiến em chọn người đó và phương án nếu họ không tham gia được.'
  },
  calendar: [['Thứ Hai','09:00–09:30'],['Thứ Hai','14:00–14:30'],['Thứ Ba','10:00–10:30']],
  // Màn 08 · Cơ hội nghề nghiệp: liên kết tìm kiếm chọn trước cho vai trò TA. PO thay bằng URL chính thức khi có (Backlog B29).
  // Đã mở thử ngày 13/11: TopCV, VietnamWorks, Glints chạy; LinkedIn chưa kiểm tra được.
  opportunities: {
    intro: 'Bạn vừa thử vai trò Talent Acquisition Intern. Nếu thấy hứng thú, hãy xem các vị trí thực tập tuyển dụng đang mở để biết doanh nghiệp yêu cầu gì.',
    links: [
      ['TopCV', 'Việc làm Talent Acquisition', 'Tin tuyển dụng Talent Acquisition tại các doanh nghiệp Việt Nam.', 'https://www.topcv.vn/tim-viec-lam-talent-acquisition'],
      ['TopCV', 'Thực tập sinh tuyển dụng', 'Các vị trí thực tập tuyển dụng, phù hợp sinh viên năm 3–4.', 'https://www.topcv.vn/tim-viec-lam-thuc-tap-sinh-tuyen-dung'],
      ['VietnamWorks', 'Tìm việc Talent Acquisition', 'Tin tuyển dụng tuyển dụng và nhân sự trên VietnamWorks.', 'https://www.vietnamworks.com/viec-lam?q=talent-acquisition'],
      ['Glints', 'Cơ hội Talent Acquisition', 'Vị trí thực tập và đầu sự nghiệp ở mảng tuyển dụng.', 'https://glints.com/vn/opportunities/jobs/explore?keyword=talent+acquisition&country=VN'],
      ['LinkedIn', 'Talent Acquisition Intern tại Việt Nam', 'Tìm vị trí và tìm hiểu đội tuyển dụng của doanh nghiệp.', 'https://www.linkedin.com/jobs/search/?keywords=Talent%20Acquisition%20Intern&location=Vietnam']
    ],
    note: 'Đây là liên kết tìm kiếm bên ngoài, không phải tin tuyển dụng do VAOVIEC. xác minh. VAOVIEC. không cam kết thực tập hay việc làm. Khi đưa bài làm vào CV, hãy ghi rõ đây là dự án mô phỏng.'
  },
  // Gợi ý của "Hỏi trợ lý" theo việc đang làm. guided = Làm quen (giải thích + phương án mẫu), self = Thử sức (chỉ câu hỏi định hướng).
  // Chỉ dùng thông tin công khai trong JD và CV; không nhắc câu trả lời xác minh người học chưa hỏi.
  assistant: {
    jd: {
      title: 'Đọc yêu cầu tuyển dụng',
      guided: [
        'JD (mô tả công việc) cho biết người được tuyển sẽ làm gì và cần đáp ứng điều gì. Hãy chia thông tin thành ba nhóm: công việc chính, yêu cầu bắt buộc và điểm ưu tiên.',
        'Yêu cầu bắt buộc là điều kiện ứng viên phải đáp ứng mới nhận việc được, ví dụ ca 13h00–21h00, luân phiên trực cuối tuần và bắt đầu trong 14 ngày.',
        'Điểm ưu tiên giúp so sánh các ứng viên đã đạt yêu cầu bắt buộc, ví dụ từng trả lời chat, xử lý đổi trả hoặc dùng bảng tính.'
      ],
      sample: 'Phiếu ghi nhớ mẫu — Bắt buộc: ca 13h00–21h00, luân phiên cuối tuần, làm tại Hà Nội, bắt đầu trong 14 ngày, viết tiếng Việt rõ ràng. Ưu tiên: kinh nghiệm chat/đổi trả, từng dùng Excel hoặc Google Sheets. Ứng tuyển: CV PDF gửi tuyendung@novacommerce.example trước 12h00 thứ Sáu.',
      self: [
        'Điều kiện nào mà nếu ứng viên không đáp ứng thì không thể nhận việc?',
        'Thông tin nào ứng viên cần biết để tự quyết định có nộp hồ sơ hay không?',
        'Điểm nào giúp bạn phân biệt hai ứng viên cùng đạt yêu cầu bắt buộc?'
      ]
    },
    posting: {
      title: 'Soạn và đăng tin tuyển dụng',
      guided: [
        'Một tin tuyển dụng đủ ý có: chức danh, công việc chính, ca làm kèm lịch cuối tuần, địa điểm, mức lương, cách ứng tuyển (email và tiêu đề) và hạn nhận hồ sơ.',
        'Ghi rõ ca làm ngay trong tin giúp người không làm được ca chiều hoặc cuối tuần tự lọc trước khi nộp.',
        'Mỗi kênh tiếp cận một nhóm người khác nhau: JobHub cho người đang tìm việc, nhóm Facebook cho người ở Hà Nội, giới thiệu nội bộ cho người quen của đồng nghiệp.'
      ],
      sample: '[NOVA Commerce] Tuyển Nhân viên Chăm sóc khách hàng — Hà Nội. Trả lời chat, xử lý đổi trả, cập nhật Google Sheets và bàn giao ca. Ca 13h00–21h00, luân phiên trực cuối tuần. Lương 8–10 triệu gross. Gửi CV PDF tới tuyendung@novacommerce.example, tiêu đề [CSKH] Họ và tên, trước 12h00 thứ Sáu.',
      self: [
        'Đọc tin của bạn, ứng viên có biết ngay mình làm được ca 13h00–21h00 và lịch cuối tuần không?',
        'Nếu chỉ đọc tin, ứng viên có biết gửi CV về đâu và trước khi nào không?',
        'Kênh nào dễ tiếp cận người đã từng làm chăm sóc khách hàng?'
      ]
    },
    inbox: {
      title: 'Rà soát thư ứng viên',
      guided: [
        'Inbox có hai loại thư: thư kèm CV và thư chỉ hỏi thông tin. Thư có CV thì bấm Thêm vào ATS để sàng lọc ở bước sau.',
        'Thư hỏi thông tin không kèm CV. Bạn có thể bấm Trả lời để xem câu trả lời soạn sẵn. Bước này không bắt buộc, chỉ giúp bạn hình dung câu hỏi ứng viên hay gặp.',
        'Đừng đánh giá ứng viên qua cách viết email. Hãy mở CV để xem kinh nghiệm và lịch làm thật.'
      ],
      sample: 'Ví dụ: thư “CV ứng tuyển CSKH” chỉ viết “Em gửi CV ạ” nhưng vẫn có CV đính kèm → bấm Thêm vào ATS. Thư “Hỏi về ca làm” không có CV → bấm Trả lời nếu muốn xem câu trả lời mẫu.',
      self: [
        'Thư nào có CV để sàng lọc, thư nào chỉ hỏi thông tin?',
        'Bạn đã thêm đủ mọi CV vào ATS chưa?',
        'Câu hỏi của ứng viên cho thấy tin đăng còn thiếu thông tin gì?'
      ]
    },
    ats: {
      title: 'Sàng lọc CV trong ATS',
      guided: [
        'Đọc từng CV và so với JD theo thứ tự: yêu cầu bắt buộc trước (ca 13h00–21h00, luân phiên cuối tuần, làm tại Hà Nội, bắt đầu trong 14 ngày), điểm ưu tiên sau (chat, đổi trả, bảng tính).',
        'Đề xuất phỏng vấn khi CV đáp ứng yêu cầu bắt buộc và có kinh nghiệm liên quan. Cần xác minh khi CV chưa nói rõ một yêu cầu bắt buộc. Dừng khi CV cho thấy không đáp ứng yêu cầu bắt buộc.',
        'Lý do tốt nêu dữ kiện cụ thể trong CV (số tháng, việc đã làm, lịch làm) và gắn với yêu cầu trong JD. Tránh lý do chung chung như “phù hợp” hay “có kinh nghiệm”.'
      ],
      sample: 'Ví dụ cho Khánh Linh · Đề xuất phỏng vấn — “8 tháng trả lời khoảng 30 tin nhắn/ngày và theo dõi 120 yêu cầu đổi trả bằng Google Sheets, khớp công việc chat và đổi trả trong JD. CV ghi làm được ca 13h00–21h00, luân phiên cuối tuần, bắt đầu sau 7 ngày.”',
      self: [
        'CV này đã nói rõ từng yêu cầu bắt buộc trong JD chưa? Điều nào còn thiếu hoặc trái với JD?',
        'Lý do của bạn có dữ kiện nào từ CV mà người khác đọc cũng kiểm tra lại được không?',
        'Nếu ứng viên có kinh nghiệm tốt nhưng vướng lịch làm, bạn sẽ quyết định thế nào?'
      ]
    },
    short: {
      title: 'Bàn giao đề xuất cho chị Mai',
      guided: [
        'Màn Bàn giao tự lấy các ứng viên bạn chọn Đề xuất phỏng vấn trong ATS. Muốn sửa lý do, bấm Sửa trong ATS.',
        'Khuyến nghị cho chị Mai cần đủ ba ý: người bạn ưu tiên, dữ kiện khiến bạn chọn họ, và phương án dự phòng nếu họ không tham gia được.',
        'Gửi ít hơn ba người là bình thường nếu chưa đủ căn cứ.'
      ],
      sample: 'Ví dụ: “Em ưu tiên Khánh Linh vì 8 tháng trả lời chat và theo dõi đổi trả bằng Google Sheets, lịch làm khớp ca 13h00–21h00 và cuối tuần. Nếu Linh không tham gia được, em mời Thảo Vy, người có 10 tháng xử lý email đổi trả và bắt đầu được ngay.”',
      self: [
        'Chị Mai đọc khuyến nghị có biết vì sao bạn ưu tiên người này hơn người còn lại không?',
        'Nếu người được ưu tiên không tham gia được, bạn đã có phương án cụ thể chưa?',
        'Có ứng viên nào trong danh sách vướng yêu cầu bắt buộc mà bạn chưa nhắc tới không?'
      ]
    },
    feedback: {
      title: 'Xem phản hồi và sửa bài',
      guided: ['Đọc mục “Ưu tiên sửa” trước. Sau đó bấm Sửa bài để chỉnh quyết định trong ATS hoặc khuyến nghị ở màn Bàn giao.'],
      sample: '',
      self: ['Tiêu chí nào đang “Cần bổ sung”, và phần nào trong ATS hoặc màn Bàn giao liên quan tới tiêu chí đó?']
    }
  },
  // Nhận xét nhanh khi không gọi được AI chấm bài.
  feedback: {
    risk: {
      an: 'CV của Minh An ghi thứ Bảy và Chủ nhật đã có lịch học cố định, trong khi JD yêu cầu luân phiên trực cuối tuần. Hãy nêu rõ rủi ro này hoặc xem lại quyết định.',
      huy: 'CV của Gia Huy ghi đang ở TP.HCM và còn lịch học buổi sáng, trong khi vị trí làm toàn thời gian tại Hà Nội. Hãy nêu rõ rủi ro này hoặc xem lại quyết định.',
      chi: 'CV của Ngọc Chi chưa nói rõ giờ làm ca chiều ngày thường. Hãy ghi điều cần xác minh trước khi đề xuất.'
    }
  }
};
