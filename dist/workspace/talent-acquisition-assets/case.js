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
      ['Bạn vào vai ', {bold:'Thực tập sinh Tuyển dụng'}, ', hỗ trợ chị Mai, Quản lý đội Chăm sóc khách hàng, trong đợt tuyển này. Bạn sẽ chuẩn bị tin đăng, tìm và sàng lọc hồ sơ, liên hệ để xác minh thông tin còn thiếu, rồi gửi chị Mai ', {bold:'tối đa 3 đề xuất phỏng vấn có căn cứ'}, '.']
    ]]
  ],
  title: 'Nhân viên Chăm sóc khách hàng',
  manager: 'Chị Mai · Quản lý CSKH',
  briefTitle: 'Yêu cầu tuyển dụng — Nhân viên CSKH',
  brief: 'Team chị cần tuyển 1 nhân viên Chăm sóc khách hàng để bổ sung ca chiều và luân phiên trực cuối tuần. Chị gửi kèm JD đã thống nhất với đội Tuyển dụng. Em xem giúp chị nhé.',
  briefEmail: [
    ['Chào em,'],
    ['Team chị cần tuyển ', {bold:'1 nhân viên Chăm sóc khách hàng'}, ' để bổ sung ca chiều và luân phiên trực cuối tuần. Chị gửi kèm JD đã thống nhất với đội Tuyển dụng. Em xem giúp chị nhé.'],
    ['Đầu tiên, em chuẩn bị tin đăng và triển khai trên ', {bold:'các kênh tuyển dụng'}, '. Khi có hồ sơ, em đối chiếu với JD và liên hệ ứng viên nếu cần xác minh lịch làm hoặc thông tin còn thiếu.'],
    ['Trước ', {bold:'16h thứ Sáu'}, ', em gửi chị ', {bold:'tối đa 3 ứng viên đề xuất phỏng vấn'}, '. Với mỗi bạn, ghi ngắn gọn lý do đề xuất, lịch làm đã xác nhận và một câu hỏi chị nên hỏi ở vòng sau. Nếu chỉ có một hoặc hai hồ sơ đủ căn cứ, em cứ gửi số đó và ghi rõ mình cần tìm thêm ở đâu. Chị sẽ xem danh sách rồi quyết định mời ai phỏng vấn.'],
    ['Cảm ơn em,', {break:true}, 'Mai']
  ],
  jdFile: 'JD_Nhan_vien_CSKH.pdf',
  more: 'Có vẻ vẫn còn ít hồ sơ để cân nhắc. Em thử đăng thêm một kênh nhé.',
  screeningHint: 'Hồ sơ ứng tuyển đã về. Mở Inbox để đọc CV và lưu hồ sơ vào ATS.',
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
  people: {
    an: {name:'Nguyễn Minh An', cv:['14 tháng CSKH tại sàn bán lẻ, xử lý 35–45 chat/ngày.', 'Theo dõi đổi trả và hoàn tiền, phối hợp với kho.', 'Có thể bắt đầu ngay. Lịch cuối tuần chưa đề cập.'], verify:{weekend:['Bạn có thể làm ca cuối tuần không?', 'Em chỉ làm được từ thứ Hai đến thứ Sáu vì đã có lịch cố định cuối tuần.']}},
    linh: {name:'Trần Khánh Linh',cv:['8 tháng hỗ trợ cửa hàng, trả lời chat và cập nhật trạng thái đơn.', 'Có thể làm toàn thời gian tại Hà Nội, ca 13h00–21h00, luân phiên cuối tuần. Có thể bắt đầu trong 7 ngày.', 'Kỹ năng: Excel, Google Sheets.'],verify:{sheets:['Bạn có thể kể một ví dụ dùng bảng tính trong công việc?', 'Em từng theo dõi khoảng 120 yêu cầu đổi trả bằng Google Sheets, dùng COUNTIF đếm yêu cầu quá hạn và lọc theo người phụ trách.']}},
    huy: {name:'Lê Gia Huy',cv:['2 tháng thực tập truyền thông, viết bài và lên lịch đăng.', 'Từng trả lời bình luận trong một sự kiện nội bộ.', 'Làm được ca cuối tuần.']},
    vy: {name:'Phạm Thảo Vy',cv:['10 tháng hỗ trợ khách qua email, phụ trách tra cứu vận đơn và đổi trả.', 'Có thể làm toàn thời gian tại Hà Nội, ca 13h00–21h00 và luân phiên trực cuối tuần. Có thể bắt đầu ngay.', 'Dùng bộ lọc và pivot table để tổng hợp ticket hàng tuần.']},
    nam: {name:'Vũ Hoàng Nam',cv:['7 tháng hỗ trợ bán lẻ, tiếp nhận khiếu nại trực tiếp.', 'Có thể làm toàn thời gian tại Hà Nội, ca 13h00–21h00, kể cả cuối tuần theo lịch đội. Có thể bắt đầu trong 10 ngày.', 'Theo dõi yêu cầu đổi hàng bằng Google Sheets.']},
    chi: {name:'Đỗ Ngọc Chi',cv:['5 tháng trực fanpage, trả lời câu hỏi về sản phẩm.', 'Có thể làm cuối tuần, chưa rõ ca tối.', 'Chưa có ví dụ xử lý đổi trả.']}
  },
  emails: [
    ['e01',1,'an','Ứng tuyển CSKH · Nguyễn Minh An','Chào chị, em gửi CV và mong có cơ hội chia sẻ kinh nghiệm hỗ trợ khách trên sàn.', 'cv'],
    ['e02',1,'linh','CV ứng tuyển CSKH','Em gửi CV ạ.', 'cv'],
    ['e03',1,'huy','Thư ứng tuyển · Lê Gia Huy','Em rất quan tâm trải nghiệm khách hàng và mong được đóng góp vào dịch vụ của NOVA. Em đính kèm CV để chị tham khảo.', 'cv'],
    ['e04',1,'vy','Ứng tuyển vị trí CSKH','Em từng phụ trách email đổi trả. Mong chị xem giúp hồ sơ của em ạ.', 'missing'],
    ['e05',2,'nam','Hồ sơ ứng tuyển · Vũ Hoàng Nam','Em gửi file ứng tuyển, nhờ chị kiểm tra giúp em ạ.', 'wrong'],
    ['e06',2,'an','Gửi lại CV · Nguyễn Minh An','Em gửi lại CV vì chưa chắc thư trước đã tới ạ.', 'cv', 'e01'],
    ['e07',2,'chi','Ứng tuyển CSKH · Đỗ Ngọc Chi','Em đính kèm CV và có thể trao đổi sau 14:00.', 'cv'],
    ['e08',2,null,'Hỏi về ca làm','Ca tối kết thúc lúc mấy giờ ạ? Em đang tìm hiểu trước khi ứng tuyển.', 'question'],
    ['e09',2,'vy','Cập nhật thông tin liên hệ · Phạm Thảo Vy','Em bổ sung số liên hệ cho thư trước. Nếu cần em có thể gửi lại CV.', 'missing']
  ],
  supplement: 'Em gửi lại đúng CV theo yêu cầu của chị.',
  questionReply: 'Chào bạn, ca chiều kết thúc lúc 21:00. Vị trí có lịch luân phiên cuối tuần.',
  calendar: [['Thứ Hai','09:00–09:30'],['Thứ Hai','14:00–14:30'],['Thứ Ba','10:00–10:30']],
  states: ['Chưa xử lý xong','Cần bổ sung thông tin','Đề xuất trao đổi ban đầu','Chưa đề xuất đi tiếp'],
  ratings: ['Có bằng chứng','Chưa đủ thông tin','Có thông tin cho thấy chưa đáp ứng'],
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
      title: 'Xử lý email ứng tuyển',
      guided: [
        'Mỗi email cần một cách xử lý: có CV thì Lưu vào ATS; thiếu CV hoặc gửi nhầm tệp thì Yêu cầu bổ sung; một người gửi hai lần thì Gộp hồ sơ trùng; email chỉ hỏi thông tin thì Trả lời.',
        'Sau khi yêu cầu bổ sung, bấm Cập nhật Inbox để nhận thư trả lời rồi lưu CV mới vào ATS.',
        'Đừng đánh giá ứng viên qua cách viết email. Hãy mở CV để xem kinh nghiệm thật.'
      ],
      sample: 'Ví dụ: một thư ứng tuyển không có CV đính kèm → bấm Yêu cầu bổ sung → bấm Cập nhật Inbox → mở thư mới và Lưu vào ATS.',
      self: [
        'Có ứng viên nào gửi hai thư không?',
        'Thư nào chưa có CV đúng để đánh giá?',
        'Thư nào không phải là đơn ứng tuyển?'
      ]
    },
    ats: {
      title: 'Đối chiếu CV và xác minh',
      guided: [
        'Cách đối chiếu: chọn một đoạn trong CV, chọn tiêu chí JD liên quan, rồi đánh dấu Có bằng chứng, Chưa đủ thông tin hoặc Có thông tin cho thấy chưa đáp ứng.',
        'Khi CV chưa nói rõ một yêu cầu bắt buộc (ví dụ lịch cuối tuần) hoặc thiếu ví dụ cụ thể, hãy dùng Xác minh thông tin để hỏi ứng viên.',
        'Chưa hỏi thì ghi là chưa rõ. Đừng ghi “đã xác nhận” khi ứng viên chưa trả lời.'
      ],
      sample: 'Ví dụ đối chiếu: trích “Có thể làm toàn thời gian tại Hà Nội, ca 13h00–21h00, luân phiên cuối tuần” → tiêu chí lịch làm việc → Có bằng chứng.',
      self: [
        'Với từng ứng viên, yêu cầu bắt buộc nào đã có bằng chứng và yêu cầu nào chưa?',
        'Thông tin nào nếu sai sẽ khiến ứng viên không thể nhận việc?',
        'Bạn cần hỏi ứng viên điều gì trước khi đưa họ vào shortlist?'
      ]
    },
    short: {
      title: 'Bàn giao shortlist cho chị Mai',
      guided: [
        'Mỗi ứng viên cần bốn ý: lý do đề xuất kèm bằng chứng, tình trạng ca làm (đã xác nhận hay chưa), thông tin còn thiếu, và một câu hỏi phỏng vấn nhắm vào điểm còn thiếu.',
        'Gửi ít hơn ba người là bình thường nếu chưa đủ căn cứ. Khi đó hãy nêu lý do và bước tìm thêm ứng viên cụ thể.',
        'Nếu một ứng viên vướng yêu cầu bắt buộc, hãy nói rõ rủi ro thay vì bỏ qua.'
      ],
      sample: 'Ví dụ cho Khánh Linh — Lý do: 8 tháng trả lời chat và cập nhật trạng thái đơn. Ca làm: CV ghi làm được 13h00–21h00, luân phiên cuối tuần. Còn thiếu: ví dụ cụ thể khi dùng bảng tính. Câu hỏi: “Khi một yêu cầu đổi trả chưa xử lý xong vào cuối ca, em sẽ bàn giao những thông tin gì cho người trực tiếp theo?”',
      self: [
        'Chị Mai đọc lý do của bạn có biết vì sao người này phù hợp hơn người khác không?',
        'Câu hỏi phỏng vấn có kiểm tra đúng điểm bạn còn chưa chắc không?',
        'Có ứng viên nào bạn ghi lịch là “đã xác nhận” nhưng chưa từng hỏi họ không?'
      ]
    },
    feedback: {
      title: 'Xem phản hồi và sửa bài',
      guided: ['Đọc mục “Ưu tiên sửa” trước. Sau đó bấm Xem lại bàn giao để chỉnh đúng phần được góp ý.'],
      sample: '',
      self: ['Tiêu chí nào đang “Cần bổ sung”, và phần nào trong bài bàn giao liên quan tới tiêu chí đó?']
    }
  },
  feedback: {
    inbox: ['Đã gộp hai email của Minh An vào cùng hồ sơ.', 'Hai email của Minh An có thể được gộp trong Inbox.'],
    question: 'Email hỏi về ca làm đã được trả lời trong Inbox.',
    supplement: 'CV bổ sung đã được gắn về chuỗi thư của đúng ứng viên.',
    evidence: ['Nhận định trong ATS đã được gắn với trích đoạn cụ thể.', 'Hãy gắn trích đoạn CV hoặc câu trả lời xác minh với tiêu chí liên quan.'],
    verify: ['Câu trả lời xác minh đã được lưu vào hồ sơ.', 'Có thể xác minh các điểm còn thiếu trước khi đề xuất.'],
    conflict: 'Minh An xác nhận chỉ làm ngày thường. JD yêu cầu luân phiên trực cuối tuần theo lịch đội. Hãy xem lại đề xuất này.',
    handoff: ['Đã bàn giao ba ứng viên cùng lý do và câu hỏi phỏng vấn.', 'Đã nêu lý do gửi ít hơn ba hồ sơ và bước tìm thêm ứng viên.']
  }
};
