// Dữ liệu Career Map dựng từ 01_CAREER_MAP.xlsx (bản 19/11/2026): sheet Career_Map, Career_Branches, Sources.
// Giữ role_id và role_slug cũ. experience_level luôn là varies_by_jd: không hiển thị nguyên văn,
// dùng reference_titles và experience_note. publication_status = framework_or_listing_review: đang chờ rà soát.
const careerData = {
  "branches": [
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_recruit",
      "function": "Tuyển dụng & Thương hiệu tuyển dụng",
      "function_order": 1,
      "role_count": 2
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_rewards",
      "function": "Lương thưởng & Phúc lợi",
      "function_order": 2,
      "role_count": 1
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_development",
      "function": "Đào tạo & Phát triển nhân tài",
      "function_order": 3,
      "role_count": 2
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_operations",
      "function": "Vận hành nhân sự & Quan hệ lao động",
      "function_order": 4,
      "role_count": 3
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_partner",
      "function": "Đối tác nhân sự",
      "function_order": 5,
      "role_count": 1
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_systems",
      "function": "Hệ thống thông tin nhân sự",
      "function_order": 6,
      "role_count": 1
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_employee",
      "function": "Truyền thông & Trải nghiệm nhân viên",
      "function_order": 7,
      "role_count": 2
    },
    {
      "industry_id": "HR",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "industry_order": 1,
      "function_id": "hr_od",
      "function": "Phát triển tổ chức & Phân tích nhân sự",
      "function_order": 8,
      "role_count": 2
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_content",
      "function": "Nội dung & Tìm kiếm tự nhiên",
      "function_order": 1,
      "role_count": 2
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_social",
      "function": "Mạng xã hội & Creator",
      "function_order": 2,
      "role_count": 3
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_growth",
      "function": "Tăng trưởng & Hiệu suất",
      "function_order": 3,
      "role_count": 3
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_brand",
      "function": "Thương hiệu, Sản phẩm & Nghiên cứu",
      "function_order": 4,
      "role_count": 3
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_trade",
      "function": "Tiếp thị tại kênh phân phối",
      "function_order": 5,
      "role_count": 1
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_agency",
      "function": "Agency & Hoạch định truyền thông",
      "function_order": 6,
      "role_count": 2
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_creative",
      "function": "Sáng tạo nội dung quảng cáo",
      "function_order": 7,
      "role_count": 1
    },
    {
      "industry_id": "MKT",
      "industry_group": "Marketing & Truyền thông",
      "industry_order": 2,
      "function_id": "mkt_comms",
      "function": "Quan hệ công chúng & Sự kiện",
      "function_order": 8,
      "role_count": 2
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_corporate",
      "function": "Tài chính doanh nghiệp",
      "function_order": 1,
      "role_count": 2
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_invest",
      "function": "Đầu tư & Thị trường vốn",
      "function_order": 2,
      "role_count": 3
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_banking",
      "function": "Ngân hàng doanh nghiệp",
      "function_order": 3,
      "role_count": 2
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_risk",
      "function": "Quản trị rủi ro",
      "function_order": 4,
      "role_count": 2
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_accounting",
      "function": "Kế toán doanh nghiệp",
      "function_order": 5,
      "role_count": 5
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_audit",
      "function": "Kiểm toán & Kiểm soát nội bộ",
      "function_order": 6,
      "role_count": 3
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_retail",
      "function": "Ngân hàng bán lẻ",
      "function_order": 7,
      "role_count": 1
    },
    {
      "industry_id": "FIN",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "industry_order": 3,
      "function_id": "fin_compliance",
      "function": "Tuân thủ & Phòng chống tội phạm tài chính",
      "function_order": 8,
      "role_count": 1
    },
    {
      "industry_id": "OPS",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "industry_order": 4,
      "function_id": "ops_sales",
      "function": "Phát triển & Hỗ trợ kinh doanh",
      "function_order": 1,
      "role_count": 4
    },
    {
      "industry_id": "OPS",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "industry_order": 4,
      "function_id": "ops_accounts",
      "function": "Quản lý & Dịch vụ khách hàng",
      "function_order": 2,
      "role_count": 3
    },
    {
      "industry_id": "OPS",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "industry_order": 4,
      "function_id": "ops_process",
      "function": "Vận hành & Điều phối dự án",
      "function_order": 3,
      "role_count": 3
    },
    {
      "industry_id": "OPS",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "industry_order": 4,
      "function_id": "ops_ecommerce",
      "function": "Thương mại điện tử & Ngành hàng",
      "function_order": 4,
      "role_count": 2
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_transport",
      "function": "Điều phối vận tải & Logistics",
      "function_order": 1,
      "role_count": 1
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_planning",
      "function": "Hoạch định nhu cầu & Cung ứng",
      "function_order": 2,
      "role_count": 3
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_procurement",
      "function": "Mua hàng",
      "function_order": 3,
      "role_count": 1
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_trade",
      "function": "Xuất nhập khẩu & Giao nhận quốc tế",
      "function_order": 4,
      "role_count": 2
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_warehouse",
      "function": "Kho & Tồn kho",
      "function_order": 5,
      "role_count": 1
    },
    {
      "industry_id": "SC",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "industry_order": 5,
      "function_id": "sc_commercial",
      "function": "Kinh doanh dịch vụ logistics",
      "function_order": 6,
      "role_count": 1
    },
    {
      "industry_id": "DATA",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "industry_order": 6,
      "function_id": "data_systems",
      "function": "Phân tích nghiệp vụ & Hệ thống",
      "function_order": 1,
      "role_count": 2
    },
    {
      "industry_id": "DATA",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "industry_order": 6,
      "function_id": "data_analysis",
      "function": "Phân tích dữ liệu, BI & Sản phẩm",
      "function_order": 2,
      "role_count": 3
    },
    {
      "industry_id": "DATA",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "industry_order": 6,
      "function_id": "data_platform",
      "function": "Kỹ thuật & Quản trị dữ liệu",
      "function_order": 3,
      "role_count": 3
    },
    {
      "industry_id": "DATA",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "industry_order": 6,
      "function_id": "data_model",
      "function": "Khoa học dữ liệu",
      "function_order": 4,
      "role_count": 1
    },
    {
      "industry_id": "DATA",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "industry_order": 6,
      "function_id": "data_enterprise",
      "function": "Hệ thống doanh nghiệp & Vận hành sản phẩm",
      "function_order": 5,
      "role_count": 2
    }
  ],
  "roles": [
    {
      "role_id": "HR_001",
      "role_name": "Talent Acquisition",
      "role_name_vi": "Tuyển dụng",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Tuyển dụng & Thương hiệu tuyển dụng",
      "simulation_status": "available",
      "mission_id": "MISSION_001",
      "role_description": "Hỗ trợ tìm và sàng lọc ứng viên, điều phối phỏng vấn và cập nhật tiến độ tuyển dụng.",
      "daily_tasks": [
        "Đăng tin và tìm ứng viên theo yêu cầu",
        "Đọc CV và sàng lọc theo tiêu chí",
        "Liên hệ sơ vấn hoặc xác nhận lịch",
        "Điều phối phỏng vấn và cập nhật trạng thái hồ sơ"
      ],
      "required_skills": [
        "Tìm nguồn ứng viên",
        "Đọc CV theo tiêu chí",
        "Giao tiếp và phối hợp lịch",
        "Quản lý dữ liệu ứng viên"
      ],
      "common_tools": [
        "Excel",
        "Google Sheets",
        "Hệ thống quản lý tuyển dụng (ATS)"
      ],
      "typical_outputs": [
        "Danh sách ứng viên rút gọn",
        "Đề xuất mời phỏng vấn"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Talent Acquisition Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. KAPLA tuyển thực tập sinh, mở cho sinh viên năm 3–4 hoặc mới tốt nghiệp.",
      "related_role_ids": [
        "HR_003",
        "HR_004",
        "HR_005"
      ],
      "search_aliases": [
        "TA",
        "TA Intern",
        "Recruitment Intern",
        "tuyển dụng",
        "thực tập HR",
        "Talent Acquisition Intern",
        "Talent Acquisition"
      ],
      "role_slug": "talent-acquisition-intern",
      "industry_id": "HR",
      "function_id": "hr_recruit",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "KAPLA Vietnam",
          "title": "Talent Acquisition Intern",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/talent-acquisition-intern/2310197.html"
        },
        {
          "org": "7-Eleven Việt Nam",
          "title": "Talent Acquisition Intern",
          "market": "TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://7elevenvn.talent.vn/job/talent-acquisition-intern-56144"
        }
      ]
    },
    {
      "role_id": "HR_005",
      "role_name": "Employer Branding",
      "role_name_vi": "Thương hiệu nhà tuyển dụng",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Tuyển dụng & Thương hiệu tuyển dụng",
      "simulation_status": "available",
      "mission_id": "MISSION_002",
      "role_description": "Xây dựng hình ảnh nhà tuyển dụng và truyền thông về môi trường làm việc để tiếp cận nhóm ứng viên phù hợp.",
      "daily_tasks": [
        "Lên kế hoạch nội dung về văn hóa và cơ hội nghề nghiệp",
        "Triển khai chiến dịch truyền thông tuyển dụng cùng TA",
        "Phối hợp hoạt động kết nối sinh viên hoặc ứng viên",
        "Theo dõi hiệu quả nội dung và sự tham gia của ứng viên"
      ],
      "required_skills": [
        "Truyền thông tuyển dụng",
        "Viết nội dung",
        "Quản lý kênh social",
        "Điều phối hoạt động"
      ],
      "common_tools": [
        "Mạng xã hội tuyển dụng (nhóm công cụ)",
        "Hệ thống quản lý tuyển dụng (ATS, kiến thức theo JD)"
      ],
      "typical_outputs": [
        "Lịch nội dung tuyển dụng",
        "Báo cáo chiến dịch tiếp cận ứng viên"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "HR Innovation & Employer Branding Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD TH Group là vai trò kết hợp Employer Branding và HR Innovation, nêu 3–5 năm kinh nghiệm liên quan.",
      "related_role_ids": [
        "HR_001",
        "MKT_010",
        "HR_011"
      ],
      "search_aliases": [
        "employer branding",
        "EB",
        "thương hiệu tuyển dụng",
        "recruitment marketing",
        "campus recruitment",
        "Employer Branding Executive",
        "Thương hiệu nhà tuyển dụng"
      ],
      "role_slug": "employer-branding-executive",
      "industry_id": "HR",
      "function_id": "hr_recruit",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Chỉ dùng phần thương hiệu tuyển dụng của JD kết hợp HR Innovation & Employer Branding; không coi 3–5 năm là chuẩn chung của nghề.",
      "sources": [
        {
          "org": "TH Group",
          "title": "HR Innovation & Employer Branding Executive",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/hr-innovation-employer-branding-executive-at-th-group-4410503386"
        }
      ]
    },
    {
      "role_id": "HR_002",
      "role_name": "Compensation & Benefits",
      "role_name_vi": "Lương thưởng và phúc lợi",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Lương thưởng & Phúc lợi",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành lương, bảo hiểm và phúc lợi; kiểm tra dữ liệu để các khoản chi trả đúng căn cứ và đúng hạn. Phạm vi thiết kế chính sách đãi ngộ thay đổi theo doanh nghiệp và cấp độ.",
      "daily_tasks": [
        "Đối chiếu công và nghỉ phép",
        "Lập bảng lương, thưởng và trình duyệt",
        "Phát phiếu lương và giải đáp thắc mắc",
        "Xử lý hồ sơ bảo hiểm và thuế liên quan tới người lao động"
      ],
      "required_skills": [
        "Đối chiếu số liệu",
        "Nghiệp vụ tiền lương",
        "Hiểu nghiệp vụ BHXH và thuế TNCN",
        "Quản lý thời hạn"
      ],
      "common_tools": [
        "Excel",
        "Google Sheets",
        "Phần mềm quản lý nhân sự (HRM)"
      ],
      "typical_outputs": [
        "Bảng đối chiếu dữ liệu tính lương",
        "Danh sách điều chỉnh phúc lợi"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "C&B Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Citics nêu tối thiểu 2 năm C&B.",
      "related_role_ids": [
        "HR_003",
        "HR_004",
        "HR_007"
      ],
      "search_aliases": [
        "C&B",
        "Compensation and Benefits",
        "Payroll",
        "lương thưởng",
        "phúc lợi",
        "C&B Specialist",
        "Compensation & Benefits",
        "Lương thưởng và phúc lợi"
      ],
      "role_slug": "c-b-specialist",
      "industry_id": "HR",
      "function_id": "hr_rewards",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Mô tả tập trung vận hành payroll và phúc lợi; thiết kế tổng đãi ngộ là nhánh chuyên sâu, không đồng nhất với xử lý bảng lương.",
      "sources": [
        {
          "org": "Citics",
          "title": "C&B Specialist",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.citics.vn/chi-tiet-tuyen-dung/4972"
        }
      ]
    },
    {
      "role_id": "HR_003",
      "role_name": "Learning & Development",
      "role_name_vi": "Đào tạo và phát triển",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Đào tạo & Phát triển nhân tài",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tổ chức đào tạo nội bộ, cập nhật học liệu và theo dõi kết quả học tập của nhân viên.",
      "daily_tasks": [
        "Phối hợp các bộ phận lên lịch và tổ chức lớp",
        "Cập nhật tài liệu và nội dung học trực tuyến",
        "Theo dõi kết quả và hồ sơ học tập trên hệ thống",
        "Tổng hợp báo cáo và hỗ trợ cải tiến đào tạo"
      ],
      "required_skills": [
        "Lập kế hoạch đào tạo",
        "Điều phối giảng viên và học viên",
        "Thuyết trình",
        "Quản lý dữ liệu đào tạo"
      ],
      "common_tools": [
        "LMS",
        "PowerPoint",
        "Excel"
      ],
      "typical_outputs": [
        "Kế hoạch tổ chức đào tạo",
        "Tổng hợp phản hồi sau đào tạo"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Learning & Development Specialist (Training & LMS)",
        "HR Intern (Learning & Development)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Tin Amkor hiển thị 3 năm kinh nghiệm. Nội dung yêu cầu kinh nghiệm L&D hoặc lĩnh vực liên quan.",
      "related_role_ids": [
        "HR_001",
        "HR_002",
        "HR_004",
        "HR_009"
      ],
      "search_aliases": [
        "L&D",
        "Learning and Development",
        "đào tạo nội bộ",
        "phát triển nhân viên",
        "Learning & Development Specialist",
        "Learning & Development",
        "Đào tạo và phát triển"
      ],
      "role_slug": "learning-development-specialist",
      "industry_id": "HR",
      "function_id": "hr_development",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Amkor Technology Việt Nam",
          "title": "Learning & Development Specialist (Training & LMS)",
          "market": "Bắc Ninh",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/learning-development-specialist-training-lms/2248609.html"
        },
        {
          "org": "Bosch",
          "title": "HR Intern (Learning & Development)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/BoschGroup/744000005208335--hrl-hr-intern-learning-development-"
        }
      ]
    },
    {
      "role_id": "HR_009",
      "role_name": "Talent & Performance Management",
      "role_name_vi": "Quản lý nhân tài và hiệu suất",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Đào tạo & Phát triển nhân tài",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Thiết kế cách đặt mục tiêu, đánh giá và hỗ trợ phát triển nhân viên theo nhu cầu của tổ chức.",
      "daily_tasks": [
        "Soạn hướng dẫn triển khai quy trình đánh giá hiệu suất",
        "Hỗ trợ quản lý xây mục tiêu và chỉ số đánh giá",
        "Phân tích dữ liệu đánh giá để xác định nhu cầu phát triển",
        "Đề xuất chương trình hỗ trợ và hướng dẫn quản lý áp dụng"
      ],
      "required_skills": [
        "Thiết kế quy trình đánh giá",
        "Xây mục tiêu và KPI",
        "Phân tích dữ liệu nhân sự",
        "Tư vấn và tập huấn"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Hướng dẫn đánh giá hiệu suất",
        "Đề xuất chương trình phát triển nhân sự"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Talent & Performance Management Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Viettel nêu tối thiểu 2 năm kinh nghiệm quản lý nhân tài và đánh giá hiệu suất.",
      "related_role_ids": [
        "HR_003",
        "HR_006",
        "HR_013"
      ],
      "search_aliases": [
        "talent management",
        "performance management",
        "quản lý nhân tài",
        "đánh giá hiệu suất",
        "KPI nhân sự",
        "Talent & Performance Management Specialist",
        "Talent & Performance Management",
        "Quản lý nhân tài và hiệu suất"
      ],
      "role_slug": "talent-performance-management-specialist",
      "industry_id": "HR",
      "function_id": "hr_development",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Viettel Group",
          "title": "Talent & Performance Management Specialist",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/talent-performance-management-specialist-at-viettel-group-4377658925"
        }
      ]
    },
    {
      "role_id": "HR_004",
      "role_name": "HR Generalist",
      "role_name_vi": "Nhân sự tổng hợp",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Vận hành nhân sự & Quan hệ lao động",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phụ trách nhiều quy trình nhân sự, từ tuyển dụng và hội nhập đến hồ sơ lao động và dữ liệu lương.",
      "daily_tasks": [
        "Điều phối tuyển dụng và tiếp nhận nhân viên",
        "Theo dõi thử việc và các mốc đánh giá",
        "Chuẩn bị dữ liệu lương, thưởng và phụ cấp",
        "Cập nhật hồ sơ nhân sự và tổng hợp tình trạng xử lý"
      ],
      "required_skills": [
        "Điều phối quy trình nhân sự",
        "Quản lý hồ sơ",
        "Kiểm tra dữ liệu",
        "Phối hợp với các bộ phận"
      ],
      "common_tools": [
        "Excel",
        "Google Sheets"
      ],
      "typical_outputs": [
        "Checklist tiếp nhận nhân viên mới",
        "Báo cáo cập nhật hồ sơ nhân sự"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "HR Generalist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. SCJ Việt Nam nêu 3–5 năm kinh nghiệm HR.",
      "related_role_ids": [
        "HR_001",
        "HR_002",
        "HR_003",
        "HR_008",
        "HR_006",
        "HR_007",
        "HR_010"
      ],
      "search_aliases": [
        "HR Generalist",
        "nhân sự tổng hợp",
        "HR Operations",
        "onboarding"
      ],
      "role_slug": "hr-generalist",
      "industry_id": "HR",
      "function_id": "hr_operations",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "SCJ Việt Nam",
          "title": "HR Generalist",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên JobOKO",
          "url": "https://vn.joboko.com/viec-lam-hr-generalist-xvi6723004"
        }
      ]
    },
    {
      "role_id": "HR_008",
      "role_name": "Employee Relations",
      "role_name_vi": "Quan hệ lao động",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Vận hành nhân sự & Quan hệ lao động",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Hỗ trợ thực thi chính sách lao động, giải đáp vấn đề của nhân viên và điều phối hồ sơ phát sinh.",
      "daily_tasks": [
        "Tiếp nhận thắc mắc về nội quy và chính sách nhân sự",
        "Rà soát hợp đồng, hồ sơ và mốc xử lý",
        "Phối hợp xử lý tình huống kỷ luật hoặc tranh chấp",
        "Cập nhật quy trình và tổng hợp báo cáo lao động"
      ],
      "required_skills": [
        "Hiểu nghiệp vụ quan hệ lao động",
        "Xử lý xung đột",
        "Quản lý hồ sơ",
        "Viết và trình bày báo cáo"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint",
        "Phần mềm quản trị nhân sự (HRM)"
      ],
      "typical_outputs": [
        "Hồ sơ tình huống nhân sự",
        "Đề xuất cập nhật quy trình hoặc chính sách"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Chuyên viên Nhân sự tổng hợp / Quan hệ lao động (HR Operations)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Meey Land là vị trí HR Operations có mảng quan hệ lao động, nêu từ 3 năm kinh nghiệm HR.",
      "related_role_ids": [
        "HR_004",
        "HR_006"
      ],
      "search_aliases": [
        "employee relations",
        "ER",
        "quan hệ lao động",
        "nội quy lao động",
        "HR operations",
        "Employee Relations Specialist"
      ],
      "role_slug": "employee-relations-specialist",
      "industry_id": "HR",
      "function_id": "hr_operations",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn gốc là HR Operations/Nhân sự tổng hợp có nhiệm vụ quan hệ lao động; chỉ dùng phần ER. Không gán yêu cầu 3 năm cho toàn nghề.",
      "sources": [
        {
          "org": "Meey Land",
          "title": "Chuyên viên Nhân sự tổng hợp / Quan hệ lao động (HR Operations)",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/chuyen-vien-nhan-su-tong-hop-ha-noi-thu-nhap-canh-tranh-co-nhieu-nam-kinh-nghiem/2227305.html"
        }
      ]
    },
    {
      "role_id": "HR_010",
      "role_name": "HR Operations",
      "role_name_vi": "Vận hành nhân sự",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Vận hành nhân sự & Quan hệ lao động",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành hồ sơ, các mốc nhân sự và yêu cầu dịch vụ nội bộ.",
      "daily_tasks": [
        "Cập nhật hồ sơ nhân viên",
        "Theo dõi onboarding/offboarding",
        "Xử lý yêu cầu và phối hợp các bộ phận",
        "Duy trì checklist và dữ liệu"
      ],
      "required_skills": [
        "Quản lý hồ sơ",
        "Kiểm tra dữ liệu",
        "Điều phối quy trình"
      ],
      "common_tools": [
        "Excel",
        "HRIS (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Checklist nhân sự",
        "Danh sách yêu cầu và trạng thái"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "People practice / Employee lifecycle",
        "HR Operations Intern (FullTime/6 Months)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "HR_004"
      ],
      "search_aliases": [
        "HR Operations",
        "Vận hành nhân sự",
        "People practice / Employee lifecycle"
      ],
      "role_slug": "hr-operations",
      "industry_id": "HR",
      "function_id": "hr_operations",
      "role_order": 3,
      "content_basis": "employer_listing",
      "publication_status": "framework_or_listing_review",
      "review_note": "Danh mục tuyển dụng chính chủ xác nhận HR Operations Intern ở TP.HCM; nhiệm vụ chung đối chiếu với khung vòng đời nhân viên CIPD. Trang danh mục không thay cho JD chi tiết.",
      "sources": [
        {
          "org": "CIPD",
          "title": "People practice / Employee lifecycle",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.cipd.org/en/the-people-profession/the-profession-map/"
        },
        {
          "org": "Funding Societies | Modalku",
          "title": "HR Operations Intern (FullTime/6 Months)",
          "market": "Việt Nam",
          "type": "Danh mục tuyển dụng doanh nghiệp",
          "url": "https://apply.workable.com/fundingsocieties/?not_found=true"
        },
        {
          "org": "Funding Societies | Modalku",
          "title": "HR Operations Intern (FullTime/6 Months)",
          "market": "Việt Nam",
          "type": "Danh mục tuyển dụng doanh nghiệp",
          "url": "https://apply.workable.com/fundingsocieties/?not_found=true"
        }
      ]
    },
    {
      "role_id": "HR_006",
      "role_name": "HR Business Partner",
      "role_name_vi": "Đối tác nhân sự",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Đối tác nhân sự",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Làm việc với lãnh đạo đơn vị để chuyển mục tiêu kinh doanh thành kế hoạch nhân sự, tổ chức và phát triển đội ngũ.",
      "daily_tasks": [
        "Làm rõ nhu cầu nhân sự của đơn vị và lập kế hoạch nguồn lực",
        "Tư vấn quản lý về hiệu suất và phát triển nhân tài",
        "Phối hợp xử lý vấn đề quan hệ lao động và thay đổi tổ chức",
        "Tổng hợp thông tin nhân sự và đề xuất cho lãnh đạo"
      ],
      "required_skills": [
        "Tư vấn quản lý",
        "Hoạch định nhân sự",
        "Quản trị thay đổi",
        "Phân tích và trình bày thông tin HR"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Đề xuất kế hoạch nhân sự",
        "Bản tư vấn cho quản lý đơn vị"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Human Resources Business Partner"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Stäubli mô tả vị trí tư vấn cho quản lý và triển khai chiến lược nhân sự tại Việt Nam.",
      "related_role_ids": [
        "HR_004",
        "HR_009",
        "HR_008"
      ],
      "search_aliases": [
        "HRBP",
        "HR Business Partner",
        "đối tác nhân sự",
        "hoạch định nhân lực"
      ],
      "role_slug": "hr-business-partner",
      "industry_id": "HR",
      "function_id": "hr_partner",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Stäubli",
          "title": "Human Resources Business Partner",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/StaubliGroup/744000149764659-human-resources-business-partner"
        }
      ]
    },
    {
      "role_id": "HR_007",
      "role_name": "HR Information Systems",
      "role_name_vi": "Hệ thống thông tin nhân sự",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Hệ thống thông tin nhân sự",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành hệ thống nhân sự, hỗ trợ người dùng và kiểm tra dữ liệu trước khi các quy trình HR chạy tiếp.",
      "daily_tasks": [
        "Tiếp nhận và phân loại yêu cầu hỗ trợ hệ thống nhân sự",
        "Xử lý lỗi chấm công, luồng phê duyệt hoặc tài khoản",
        "Kiểm tra sai lệch dữ liệu cùng HR và Payroll",
        "Cập nhật hướng dẫn người dùng và theo dõi lỗi chuyển cho kỹ thuật"
      ],
      "required_skills": [
        "Vận hành HRIS",
        "Kiểm tra dữ liệu",
        "Phân quyền hệ thống",
        "Hỗ trợ và xử lý sự cố"
      ],
      "common_tools": [
        "Dayforce hoặc Workday hoặc SAP SuccessFactors",
        "Jira hoặc ServiceNow"
      ],
      "typical_outputs": [
        "Danh sách yêu cầu hỗ trợ",
        "Hướng dẫn người dùng và báo cáo sai lệch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "HRIS / HCM Application Support Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Diksha Technologies nêu từ 3 năm hỗ trợ HRIS/HCM hoặc nghiệp vụ tương đương.",
      "related_role_ids": [
        "HR_004",
        "HR_002",
        "DATA_007",
        "HR_014"
      ],
      "search_aliases": [
        "HRIS",
        "HCM",
        "HR tech",
        "hệ thống nhân sự",
        "Workday",
        "SAP SuccessFactors",
        "HRIS Specialist",
        "HR Information Systems",
        "Hệ thống thông tin nhân sự"
      ],
      "role_slug": "hris-specialist",
      "industry_id": "HR",
      "function_id": "hr_systems",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Diksha Technologies",
          "title": "HRIS / HCM Application Support Specialist",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/hris-hcm-application-support-specialist-at-diksha-technologies-4439808446"
        }
      ]
    },
    {
      "role_id": "HR_011",
      "role_name": "Internal Communications",
      "role_name_vi": "Truyền thông nội bộ",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Truyền thông & Trải nghiệm nhân viên",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Truyền tải thông tin đến nhân viên và duy trì các kênh truyền thông trong tổ chức.",
      "daily_tasks": [
        "Lập lịch truyền thông",
        "Viết bản tin và thông báo",
        "Phối hợp sự kiện nội bộ",
        "Theo dõi phản hồi nhân viên"
      ],
      "required_skills": [
        "Viết và biên tập",
        "Quản lý kênh",
        "Điều phối sự kiện"
      ],
      "common_tools": [
        "Microsoft Office",
        "Canva (ví dụ)"
      ],
      "typical_outputs": [
        "Bản tin nội bộ",
        "Lịch nội dung"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Internal Communication Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "HR_005",
        "HR_012"
      ],
      "search_aliases": [
        "Internal Communications",
        "Truyền thông nội bộ",
        "Internal Communication Intern"
      ],
      "role_slug": "internal-communications",
      "industry_id": "HR",
      "function_id": "hr_employee",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Savills",
          "title": "Internal Communication Intern",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://savillsvn.careers-page.com/jobs/366f1b14-2983-4bc0-8f41-583ee06377cd"
        }
      ]
    },
    {
      "role_id": "HR_012",
      "role_name": "Employee Experience & Engagement",
      "role_name_vi": "Trải nghiệm và gắn kết nhân viên",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Truyền thông & Trải nghiệm nhân viên",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Cải thiện các điểm tiếp xúc trong vòng đời nhân viên và tổ chức hoạt động gắn kết.",
      "daily_tasks": [
        "Hỗ trợ onboarding/offboarding",
        "Tổ chức hoạt động gắn kết",
        "Thu thập phản hồi",
        "Theo dõi tiến độ hoạt động"
      ],
      "required_skills": [
        "Điều phối",
        "Lắng nghe và tổng hợp phản hồi",
        "Tổ chức hoạt động"
      ],
      "common_tools": [
        "Microsoft Office (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Kế hoạch hoạt động",
        "Tổng hợp phản hồi"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Employee Experience Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "HR_011"
      ],
      "search_aliases": [
        "Employee Experience & Engagement",
        "Trải nghiệm và gắn kết nhân viên",
        "Employee Experience Intern"
      ],
      "role_slug": "employee-experience-engagement",
      "industry_id": "HR",
      "function_id": "hr_employee",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "SmartOSC",
          "title": "Employee Experience Intern",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.smartosc.com/intern-positions/"
        }
      ]
    },
    {
      "role_id": "HR_013",
      "role_name": "Organizational Development",
      "role_name_vi": "Phát triển tổ chức",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Phát triển tổ chức & Phân tích nhân sự",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Hỗ trợ cải thiện cấu trúc, cách làm việc và văn hóa để tổ chức thực hiện mục tiêu.",
      "daily_tasks": [
        "Thu thập dữ liệu tổ chức",
        "Phân tích vấn đề cấu trúc/văn hóa",
        "Hỗ trợ thiết kế can thiệp thay đổi",
        "Theo dõi kết quả"
      ],
      "required_skills": [
        "Chẩn đoán tổ chức",
        "Quản trị thay đổi",
        "Nghiên cứu định tính/định lượng"
      ],
      "common_tools": [
        "Công cụ khảo sát và trực quan hóa (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bản chẩn đoán",
        "Đề xuất cải tiến tổ chức"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Organisation development and design"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "HR_009"
      ],
      "search_aliases": [
        "Organizational Development",
        "Phát triển tổ chức",
        "Organisation development and design"
      ],
      "role_slug": "organizational-development",
      "industry_id": "HR",
      "function_id": "hr_od",
      "role_order": 1,
      "content_basis": "professional_framework",
      "publication_status": "framework_or_listing_review",
      "review_note": "Khung nghề quốc tế; không suy diễn cơ hội Intern ở Việt Nam",
      "sources": [
        {
          "org": "CIPD",
          "title": "Organisation development and design",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://prod.cipd.org/en/the-people-profession/the-profession-map/explore-the-profession-map/specialist-knowledge/organisational-development-design/"
        }
      ]
    },
    {
      "role_id": "HR_014",
      "role_name": "People Analytics",
      "role_name_vi": "Phân tích dữ liệu nhân sự",
      "industry_group": "Nhân sự & Phát triển tổ chức",
      "function": "Phát triển tổ chức & Phân tích nhân sự",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Sử dụng dữ liệu nhân sự và kinh doanh để hỗ trợ quyết định về con người.",
      "daily_tasks": [
        "Chuẩn hóa dữ liệu nhân sự",
        "Xác định chỉ số và câu hỏi",
        "Phân tích và trực quan hóa",
        "Trình bày phát hiện có bảo vệ dữ liệu"
      ],
      "required_skills": [
        "Phân tích dữ liệu",
        "Thống kê",
        "Hiểu nghiệp vụ HR"
      ],
      "common_tools": [
        "Công cụ BI/thống kê (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Báo cáo biến động nhân sự",
        "Dashboard HR"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "People analytics"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "HR_007",
        "DATA_001"
      ],
      "search_aliases": [
        "People Analytics",
        "Phân tích dữ liệu nhân sự"
      ],
      "role_slug": "people-analytics",
      "industry_id": "HR",
      "function_id": "hr_od",
      "role_order": 2,
      "content_basis": "professional_framework",
      "publication_status": "framework_or_listing_review",
      "review_note": "Khung nghề quốc tế; công cụ cụ thể tùy JD",
      "sources": [
        {
          "org": "CIPD",
          "title": "People analytics",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.cipd.org/en/the-people-profession/the-profession-map/explore-the-profession-map/specialist-knowledge/people-analytics/"
        }
      ]
    },
    {
      "role_id": "MKT_001",
      "role_name": "Content Marketing",
      "role_name_vi": "Marketing nội dung",
      "industry_group": "Marketing & Truyền thông",
      "function": "Nội dung & Tìm kiếm tự nhiên",
      "simulation_status": "available",
      "mission_id": "MISSION_004",
      "role_description": "Lập kế hoạch và sản xuất nội dung theo mục tiêu chiến dịch, rồi dùng số liệu để điều chỉnh nội dung.",
      "daily_tasks": [
        "Lên kế hoạch nội dung theo chiến dịch và kênh",
        "Viết bài hoặc kịch bản video ngắn",
        "Phối hợp thiết kế để ra nội dung đúng nhận diện",
        "Theo dõi hiệu quả nội dung và đề xuất cải thiện"
      ],
      "required_skills": [
        "Viết và biên tập",
        "Lập kế hoạch nội dung",
        "SEO cơ bản",
        "Đọc chỉ số truyền thông"
      ],
      "common_tools": [
        "Canva",
        "CapCut",
        "Meta Analytics",
        "TikTok Analytics"
      ],
      "typical_outputs": [
        "Lịch nội dung",
        "Bản nháp nội dung theo kênh"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Content Marketing Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Ahohwa nêu kinh nghiệm khoảng 1–2 năm trong nội dung, truyền thông hoặc digital marketing.",
      "related_role_ids": [
        "MKT_002",
        "MKT_004",
        "MKT_006",
        "MKT_010",
        "MKT_014"
      ],
      "search_aliases": [
        "content marketing",
        "content social",
        "nội dung",
        "viết bài",
        "content executive",
        "Content Marketing Executive",
        "Marketing nội dung"
      ],
      "role_slug": "content-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_content",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Mỹ phẩm Ahohwa / Vinbeauty",
          "title": "Content Marketing Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/content-marketing-executive/2350067.html"
        }
      ]
    },
    {
      "role_id": "MKT_006",
      "role_name": "Search Engine Optimization",
      "role_name_vi": "Tối ưu công cụ tìm kiếm",
      "industry_group": "Marketing & Truyền thông",
      "function": "Nội dung & Tìm kiếm tự nhiên",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Cải thiện khả năng xuất hiện của website trên tìm kiếm tự nhiên thông qua nội dung, kỹ thuật và đo lường hiệu quả.",
      "daily_tasks": [
        "Nghiên cứu từ khóa và nhu cầu tìm kiếm",
        "Rà soát lỗi lập chỉ mục và các trang cần tối ưu",
        "Phối hợp tối ưu nội dung, liên kết nội bộ và backlink",
        "Theo dõi thứ hạng, lượt truy cập và chuyển đổi tự nhiên"
      ],
      "required_skills": [
        "Nghiên cứu từ khóa",
        "SEO kỹ thuật",
        "Tối ưu nội dung",
        "Phân tích hiệu quả tìm kiếm"
      ],
      "common_tools": [
        "Google Search Console",
        "GA4",
        "Ahrefs hoặc Semrush",
        "Screaming Frog"
      ],
      "typical_outputs": [
        "Danh sách vấn đề SEO theo ưu tiên",
        "Báo cáo truy cập và chuyển đổi tự nhiên"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Website SEO Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Sammishop mô tả vai trò chuyên viên phụ trách SEO website.",
      "related_role_ids": [
        "MKT_001",
        "MKT_003"
      ],
      "search_aliases": [
        "SEO",
        "technical SEO",
        "organic search",
        "tối ưu công cụ tìm kiếm",
        "từ khóa",
        "SEO Specialist",
        "Search Engine Optimization"
      ],
      "role_slug": "seo-specialist",
      "industry_id": "MKT",
      "function_id": "mkt_content",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Sammishop",
          "title": "Website SEO Specialist",
          "market": "Việt Nam",
          "type": "JD trên JobOKO",
          "url": "https://vn.joboko.com/viec-lam-website-seo-specialist-xvi6664055"
        }
      ]
    },
    {
      "role_id": "MKT_010",
      "role_name": "Social Media",
      "role_name_vi": "Truyền thông mạng xã hội",
      "industry_group": "Marketing & Truyền thông",
      "function": "Mạng xã hội & Creator",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành các kênh mạng xã hội theo lịch đăng, duy trì tương tác cộng đồng và cải thiện nội dung từ số liệu.",
      "daily_tasks": [
        "Lập lịch nội dung theo từng nền tảng",
        "Viết nội dung và phối hợp sản xuất ảnh hoặc video",
        "Đăng bài và quản lý tương tác cộng đồng",
        "Theo dõi chỉ số kênh và đề xuất điều chỉnh lịch hoặc định dạng"
      ],
      "required_skills": [
        "Quản trị kênh",
        "Viết nội dung ngắn",
        "Quản lý cộng đồng",
        "Đọc chỉ số tương tác"
      ],
      "common_tools": [
        "Meta Business Suite",
        "TikTok"
      ],
      "typical_outputs": [
        "Lịch đăng bài theo kênh",
        "Báo cáo tương tác cộng đồng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Social Media Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Click Media & SEO nêu tối thiểu 1 năm quản lý kênh social.",
      "related_role_ids": [
        "MKT_001",
        "MKT_002",
        "HR_005"
      ],
      "search_aliases": [
        "social media",
        "community management",
        "fanpage",
        "truyền thông mạng xã hội",
        "Social Media Executive"
      ],
      "role_slug": "social-media-executive",
      "industry_id": "MKT",
      "function_id": "mkt_social",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Click Media & SEO",
          "title": "Social Media Executive",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://clickmediaseo.vn/viec-lam/social-media-executive"
        }
      ]
    },
    {
      "role_id": "MKT_002",
      "role_name": "Influencer Marketing",
      "role_name_vi": "Marketing qua người có ảnh hưởng",
      "industry_group": "Marketing & Truyền thông",
      "function": "Mạng xã hội & Creator",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Chọn creator phù hợp, điều phối hợp tác và theo dõi hiệu quả nội dung theo mục tiêu chiến dịch.",
      "daily_tasks": [
        "Tìm và đánh giá KOL/KOC theo brief",
        "Trao đổi chi phí và điều kiện hợp tác",
        "Gửi brief và theo dõi lịch đăng",
        "Tổng hợp hiệu quả chiến dịch và cập nhật dữ liệu creator"
      ],
      "required_skills": [
        "Đánh giá độ phù hợp creator",
        "Giao tiếp và đàm phán",
        "Quản lý tiến độ",
        "Đọc KPI chiến dịch"
      ],
      "common_tools": [
        "Google Sheets",
        "TikTok Shop",
        "TikTok"
      ],
      "typical_outputs": [
        "Danh sách creator đề xuất",
        "Báo cáo tiến độ hợp tác"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Influencers Marketing Executive",
        "Influencer Marketing Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. NAYA nêu từ 1 năm trong phần yêu cầu. Bamboo Digital nêu trên 1 năm kinh nghiệm liên quan.",
      "related_role_ids": [
        "MKT_001",
        "MKT_004",
        "OPS_004",
        "MKT_010",
        "MKT_017"
      ],
      "search_aliases": [
        "influencer",
        "KOL",
        "KOC",
        "booking creator",
        "creator marketing",
        "Influencer Marketing Executive",
        "Influencer Marketing",
        "Marketing qua người có ảnh hưởng"
      ],
      "role_slug": "influencer-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_social",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Bamboo Digital",
          "title": "Influencers Marketing Executive",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/influencers-marketing-executive-at-bamboo-digital-4441186341"
        },
        {
          "org": "NAYA",
          "title": "Influencer Marketing Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/influencer-marketing-executive/2160644.html"
        }
      ]
    },
    {
      "role_id": "MKT_017",
      "role_name": "Affiliate Marketing",
      "role_name_vi": "Tiếp thị liên kết",
      "industry_group": "Marketing & Truyền thông",
      "function": "Mạng xã hội & Creator",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành mạng lưới đối tác tiếp thị liên kết và theo dõi hiệu quả chuyển đổi.",
      "daily_tasks": [
        "Tìm và hỗ trợ đối tác",
        "Triển khai chương trình hoa hồng",
        "Theo dõi nội dung và chuyển đổi",
        "Tổng hợp hiệu quả"
      ],
      "required_skills": [
        "Điều phối đối tác",
        "Phân tích chuyển đổi",
        "Theo dõi dữ liệu"
      ],
      "common_tools": [
        "Nền tảng affiliate/social commerce (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Danh sách đối tác",
        "Báo cáo chuyển đổi"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Affiliate Marketing Intern / Affiliate Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "MKT_002"
      ],
      "search_aliases": [
        "Affiliate Marketing",
        "Tiếp thị liên kết",
        "Affiliate Marketing Intern / Affiliate Executive"
      ],
      "role_slug": "affiliate-marketing",
      "industry_id": "MKT",
      "function_id": "mkt_social",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Intrepid Asia",
          "title": "Affiliate Marketing Intern / Affiliate Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://intrepid.asia/careers/"
        }
      ]
    },
    {
      "role_id": "MKT_003",
      "role_name": "Performance Marketing",
      "role_name_vi": "Marketing hiệu suất",
      "industry_group": "Marketing & Truyền thông",
      "function": "Tăng trưởng & Hiệu suất",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành quảng cáo trả phí và tối ưu ngân sách dựa trên chi phí, tỷ lệ chuyển đổi và hiệu quả chiến dịch.",
      "daily_tasks": [
        "Thiết lập chiến dịch và theo dõi chuyển đổi",
        "Thử các mẫu quảng cáo và tệp đối tượng",
        "Phân tích chi phí và kết quả để điều chỉnh ngân sách",
        "Báo cáo hiệu quả và đề xuất tối ưu"
      ],
      "required_skills": [
        "Vận hành paid media",
        "Đo chuyển đổi",
        "Thiết kế thử nghiệm A/B",
        "Phân tích chi phí và ROAS"
      ],
      "common_tools": [
        "Google Ads",
        "Meta Ads",
        "TikTok Ads",
        "GA4",
        "Google Tag Manager"
      ],
      "typical_outputs": [
        "Báo cáo hiệu suất quảng cáo",
        "Đề xuất điều chỉnh ngân sách chiến dịch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Performance Marketing Executive",
        "Performance Marketing Executive (Ads)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Sunbytes nêu từ khoảng 1–2 năm kinh nghiệm thực tế.",
      "related_role_ids": [
        "MKT_005",
        "OPS_004",
        "MKT_006",
        "MKT_013"
      ],
      "search_aliases": [
        "performance marketing",
        "paid media",
        "quảng cáo",
        "digital ads",
        "chạy ads",
        "PPC",
        "Performance Marketing Executive",
        "Marketing hiệu suất"
      ],
      "role_slug": "performance-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_growth",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Sunbytes",
          "title": "Performance Marketing Executive",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/performance-marketing-executive-at-sunbytes-4460327812"
        },
        {
          "org": "OMEGA",
          "title": "Performance Marketing Executive (Ads)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/performance-marketing-executive-ads/2228416.html"
        }
      ]
    },
    {
      "role_id": "MKT_005",
      "role_name": "Growth Marketing",
      "role_name_vi": "Marketing tăng trưởng",
      "industry_group": "Marketing & Truyền thông",
      "function": "Tăng trưởng & Hiệu suất",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tìm điểm nghẽn trong hành trình sử dụng sản phẩm và thử cách cải thiện chuyển đổi hoặc giữ chân người dùng.",
      "daily_tasks": [
        "Phân tích dữ liệu theo chặng và nhóm người dùng",
        "Thử nghiệm thay đổi luồng hướng dẫn hoặc thông điệp",
        "Theo dõi tín hiệu rời bỏ và đề xuất cách thu hút lại",
        "Phỏng vấn người dùng để tìm nguyên nhân và cơ hội"
      ],
      "required_skills": [
        "Phân tích phễu và cohort",
        "Thiết kế thử nghiệm A/B",
        "Nghiên cứu người dùng",
        "Đo chuyển đổi và giữ chân"
      ],
      "common_tools": [
        "Mixpanel",
        "Amplitude",
        "PostHog",
        "Google Analytics"
      ],
      "typical_outputs": [
        "Bản phân tích phễu chuyển đổi",
        "Đề xuất thử nghiệm tăng trưởng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Nhân viên Growth Marketing",
        "Growth Marketing Executive (Product/OS)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Avada nêu tối thiểu 2 năm kinh nghiệm và tập trung vào công ty sản phẩm phần mềm.",
      "related_role_ids": [
        "MKT_003",
        "MKT_004",
        "OPS_001",
        "MKT_007",
        "DATA_004"
      ],
      "search_aliases": [
        "growth",
        "product growth",
        "growth marketing",
        "funnel",
        "tăng trưởng sản phẩm",
        "Growth Marketing Executive",
        "Marketing tăng trưởng"
      ],
      "role_slug": "growth-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_growth",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Avada Group",
          "title": "Nhân viên Growth Marketing",
          "market": "Hà Nội",
          "type": "Cổng việc làm Đại học Kinh tế Quốc dân",
          "url": "https://jobs.neu.edu.vn/jobs/nhan-vien-growth-marketing-avada-1202608061508"
        },
        {
          "org": "Teaser Software",
          "title": "Growth Marketing Executive (Product/OS)",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/hanoi-growth-marketing-executive-product-os-up-to-18-mil-at-teaser-software-4476250395"
        }
      ]
    },
    {
      "role_id": "MKT_007",
      "role_name": "CRM & Lifecycle Marketing",
      "role_name_vi": "Marketing quan hệ và vòng đời khách hàng",
      "industry_group": "Marketing & Truyền thông",
      "function": "Tăng trưởng & Hiệu suất",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Dùng dữ liệu khách hàng để phân nhóm, triển khai chương trình khách hàng thân thiết và theo dõi hiệu quả truyền thông.",
      "daily_tasks": [
        "Phân nhóm khách hàng theo dữ liệu và hành vi mua",
        "Thiết kế chương trình tích điểm, ưu đãi hoặc giữ chân",
        "Điều phối thông điệp và lịch gửi trên kênh CRM",
        "Đo phản hồi, hiệu quả chiến dịch và đề xuất điều chỉnh"
      ],
      "required_skills": [
        "Phân khúc khách hàng",
        "Thiết kế chương trình loyalty",
        "Đọc dữ liệu bán hàng",
        "Phối hợp liên bộ phận"
      ],
      "common_tools": [
        "Nền tảng CRM (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Danh sách phân nhóm khách hàng",
        "Kế hoạch ưu đãi và báo cáo chiến dịch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "CRM Marketing Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. SCG yêu cầu tối thiểu 2 năm trong vai trò Marketing.",
      "related_role_ids": [
        "MKT_005",
        "DATA_001"
      ],
      "search_aliases": [
        "CRM marketing",
        "lifecycle",
        "loyalty",
        "giữ chân khách hàng",
        "phân khúc khách hàng",
        "CRM Marketing Executive",
        "CRM & Lifecycle Marketing",
        "Marketing quan hệ và vòng đời khách hàng"
      ],
      "role_slug": "crm-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_growth",
      "role_order": 3,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "SCG CBM Vietnam",
          "title": "CRM Marketing Executive",
          "market": "Đà Nẵng",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.careers-page.com/scg-2/job/3WR83Y9W"
        }
      ]
    },
    {
      "role_id": "MKT_004",
      "role_name": "Brand Marketing",
      "role_name_vi": "Marketing thương hiệu",
      "industry_group": "Marketing & Truyền thông",
      "function": "Thương hiệu, Sản phẩm & Nghiên cứu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Triển khai chiến dịch và giữ hình ảnh, thông điệp thương hiệu nhất quán trên các điểm tiếp xúc.",
      "daily_tasks": [
        "Triển khai hoạt động theo kế hoạch thương hiệu",
        "Rà soát nội dung và hình ảnh theo bộ nhận diện",
        "Theo dõi tiến độ và chất lượng các hạng mục",
        "Hỗ trợ tổ chức sự kiện hoặc activation"
      ],
      "required_skills": [
        "Quản trị nhận diện",
        "Xây dựng thông điệp",
        "Điều phối chiến dịch",
        "Quản lý tiến độ"
      ],
      "common_tools": [
        "Công cụ sáng tạo nêu trong JD tham khảo; không phải bộ công cụ bắt buộc của nghề"
      ],
      "typical_outputs": [
        "Brief truyền thông thương hiệu",
        "Báo cáo kết quả chiến dịch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Brand Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Công ty Cổ phần Xuất khẩu Cà phê Việt Nam nêu tối thiểu 2 năm kinh nghiệm liên quan.",
      "related_role_ids": [
        "MKT_001",
        "MKT_002",
        "MKT_005",
        "MKT_011",
        "MKT_009",
        "MKT_008"
      ],
      "search_aliases": [
        "brand",
        "branding",
        "brand marketing",
        "thương hiệu",
        "brand activation",
        "Brand Executive",
        "Marketing thương hiệu"
      ],
      "role_slug": "brand-executive",
      "industry_id": "MKT",
      "function_id": "mkt_brand",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Công ty Cổ phần Xuất khẩu Cà phê Việt Nam",
          "title": "Brand Executive",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/brand-executive/2273600.html"
        }
      ]
    },
    {
      "role_id": "MKT_011",
      "role_name": "Product Marketing",
      "role_name_vi": "Marketing sản phẩm",
      "industry_group": "Marketing & Truyền thông",
      "function": "Thương hiệu, Sản phẩm & Nghiên cứu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Chuyển đặc điểm sản phẩm thành thông điệp dễ hiểu và phối hợp đưa sản phẩm ra thị trường.",
      "daily_tasks": [
        "Tìm hiểu sản phẩm và vấn đề của khách hàng mục tiêu",
        "Chuẩn bị thông điệp và nội dung hỗ trợ giới thiệu sản phẩm",
        "Phối hợp với Product và Sales khi ra mắt hoặc tổ chức hội thảo",
        "Theo dõi hiệu quả truyền thông và cơ hội khách hàng thu được"
      ],
      "required_skills": [
        "Hiểu sản phẩm và thị trường",
        "Viết thông điệp",
        "Triển khai ra mắt",
        "Phối hợp Product và Sales"
      ],
      "common_tools": [
        "Canva",
        "Adobe (nhóm công cụ)",
        "Công cụ đo lường chiến dịch (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Thông điệp sản phẩm",
        "Bộ tài liệu hỗ trợ ra mắt"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Product Marketing Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. SAGOMED nêu tối thiểu 3 năm kinh nghiệm Marketing phù hợp.",
      "related_role_ids": [
        "MKT_004",
        "MKT_009",
        "DATA_004"
      ],
      "search_aliases": [
        "product marketing",
        "GTM",
        "go to market",
        "định vị sản phẩm",
        "ra mắt sản phẩm",
        "Product Marketing Executive",
        "Marketing sản phẩm"
      ],
      "role_slug": "product-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_brand",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "SAGOMED",
          "title": "Product Marketing Executive",
          "market": "TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tuyendung.sagomed.com.vn/careers/job/55768"
        }
      ]
    },
    {
      "role_id": "MKT_009",
      "role_name": "Market Research",
      "role_name_vi": "Nghiên cứu thị trường",
      "industry_group": "Marketing & Truyền thông",
      "function": "Thương hiệu, Sản phẩm & Nghiên cứu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tổ chức nghiên cứu thị trường và chuyển kết quả khảo sát thành thông tin giúp khách hàng ra quyết định.",
      "daily_tasks": [
        "Làm rõ mục tiêu nghiên cứu và hỗ trợ thiết kế bảng hỏi",
        "Phối hợp triển khai thu thập dữ liệu",
        "Kiểm tra dữ liệu, phân tích và diễn giải kết quả",
        "Soạn báo cáo và trình bày phát hiện theo câu hỏi kinh doanh"
      ],
      "required_skills": [
        "Phương pháp nghiên cứu định lượng",
        "Kiểm tra chất lượng dữ liệu",
        "Thống kê cơ bản",
        "Trình bày phát hiện"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint"
      ],
      "typical_outputs": [
        "Bảng hỏi khảo sát",
        "Báo cáo phát hiện và đề xuất"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Research Executive / Senior Research Executive – Quantitative Research"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Mức Research Executive trong JD Ipsos xem 1–2 năm kinh nghiệm liên quan là lợi thế.",
      "related_role_ids": [
        "MKT_004",
        "DATA_001",
        "MKT_011"
      ],
      "search_aliases": [
        "market research",
        "quantitative research",
        "nghiên cứu thị trường",
        "khảo sát",
        "consumer insights",
        "Market Research Executive"
      ],
      "role_slug": "market-research-executive",
      "industry_id": "MKT",
      "function_id": "mkt_brand",
      "role_order": 3,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Ipsos Việt Nam",
          "title": "Research Executive / Senior Research Executive – Quantitative Research",
          "market": "TP.HCM",
          "type": "JD trên XemViec",
          "url": "https://xemviec.com/viec-lam/research-executive-sernior-research-executive-78131"
        }
      ]
    },
    {
      "role_id": "MKT_008",
      "role_name": "Trade Marketing",
      "role_name_vi": "Tiếp thị thương mại",
      "industry_group": "Marketing & Truyền thông",
      "function": "Tiếp thị tại kênh phân phối",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Triển khai chương trình tại kênh phân phối và điểm bán để hỗ trợ trưng bày, chuyển đổi và doanh số.",
      "daily_tasks": [
        "Lập kế hoạch chương trình khuyến mãi và vật phẩm tại điểm bán",
        "Phối hợp bán hàng, nhà bán lẻ và đối tác triển khai",
        "Theo dõi chi phí, tiến độ và chất lượng thực hiện",
        "Đối chiếu doanh số theo cửa hàng và đánh giá hiệu quả chương trình"
      ],
      "required_skills": [
        "Hiểu kênh phân phối",
        "Điều phối triển khai điểm bán",
        "Theo dõi ngân sách",
        "Đọc dữ liệu bán hàng"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Kế hoạch kích hoạt tại điểm bán",
        "Báo cáo thực thi và hiệu quả chương trình"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Trade Marketing Executive (MT Channel)",
        "Trade Marketing Executive – POSM focus"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD VitaDairy nêu ít nhất 2 năm kinh nghiệm ở vị trí tương tự trong các kênh bán lẻ liên quan.",
      "related_role_ids": [
        "MKT_004",
        "OPS_006",
        "OPS_008"
      ],
      "search_aliases": [
        "trade marketing",
        "POSM",
        "shopper marketing",
        "tiếp thị thương mại",
        "kênh phân phối",
        "Trade Marketing Executive"
      ],
      "role_slug": "trade-marketing-executive",
      "industry_id": "MKT",
      "function_id": "mkt_trade",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "VitaDairy",
          "title": "Trade Marketing Executive (MT Channel)",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://vitadairy.vn/tuyen-dung/trade-marketing-executive-mt-channel"
        },
        {
          "org": "Talentnet",
          "title": "Trade Marketing Executive – POSM focus",
          "market": "TP.HCM",
          "type": "JD do đơn vị tuyển dụng đăng",
          "url": "https://tuyendung247-talentnetgroup.careers-page.com/jobs/25104b0c-950e-411c-a2ab-395eefbb6867"
        }
      ]
    },
    {
      "role_id": "MKT_012",
      "role_name": "Agency Account Management",
      "role_name_vi": "Điều phối khách hàng tại agency",
      "industry_group": "Marketing & Truyền thông",
      "function": "Agency & Hoạch định truyền thông",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Kết nối khách hàng với đội agency để triển khai chiến dịch đúng brief và tiến độ.",
      "daily_tasks": [
        "Làm rõ brief",
        "Điều phối Creative/Planning/Production",
        "Theo dõi dự toán và tài liệu",
        "Cập nhật tiến độ khách hàng"
      ],
      "required_skills": [
        "Giao tiếp khách hàng",
        "Quản lý tiến độ",
        "Kiểm soát tài liệu"
      ],
      "common_tools": [
        "Công cụ tài liệu và tiến độ (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Brief triển khai",
        "Báo cáo tiến độ và dự toán"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Account Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_006"
      ],
      "search_aliases": [
        "Agency Account Management",
        "Điều phối khách hàng tại agency",
        "Account Executive"
      ],
      "role_slug": "agency-account-management",
      "industry_id": "MKT",
      "function_id": "mkt_agency",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Publicis Groupe Vietnam",
          "title": "Account Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/account-executive-at-publicis-groupe-vietnam-4442601269"
        }
      ]
    },
    {
      "role_id": "MKT_013",
      "role_name": "Media Planning",
      "role_name_vi": "Hoạch định truyền thông",
      "industry_group": "Marketing & Truyền thông",
      "function": "Agency & Hoạch định truyền thông",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Lập kế hoạch phân bổ kênh và ngân sách truyền thông theo mục tiêu chiến dịch.",
      "daily_tasks": [
        "Phân tích brief/đối tượng",
        "Đề xuất kênh và lịch",
        "Lập ngân sách và KPI",
        "Theo dõi triển khai và báo cáo"
      ],
      "required_skills": [
        "Lập kế hoạch",
        "Phân tích dữ liệu",
        "Trình bày đề xuất"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Media plan",
        "Báo cáo chiến dịch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Media Planner"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "MKT_003"
      ],
      "search_aliases": [
        "Media Planning",
        "Hoạch định truyền thông",
        "Media Planner"
      ],
      "role_slug": "media-planning",
      "industry_id": "MKT",
      "function_id": "mkt_agency",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Publicis Groupe Vietnam",
          "title": "Media Planner",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/media-planner-at-publicis-groupe-vietnam-4456078497"
        }
      ]
    },
    {
      "role_id": "MKT_014",
      "role_name": "Copywriting",
      "role_name_vi": "Sáng tạo lời quảng cáo",
      "industry_group": "Marketing & Truyền thông",
      "function": "Sáng tạo nội dung quảng cáo",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Viết ý tưởng, thông điệp và nội dung quảng cáo theo brief.",
      "daily_tasks": [
        "Làm rõ mục tiêu truyền thông",
        "Phát triển concept và headline",
        "Viết kịch bản/nội dung",
        "Biên tập theo phản hồi"
      ],
      "required_skills": [
        "Viết sáng tạo",
        "Hiểu đối tượng",
        "Biên tập"
      ],
      "common_tools": [
        "Công cụ soạn thảo (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Concept và headline",
        "Kịch bản quảng cáo"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Writers and Authors",
        "Copywriter Trainee"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "MKT_001"
      ],
      "search_aliases": [
        "Copywriting",
        "Sáng tạo lời quảng cáo",
        "Writers and Authors"
      ],
      "role_slug": "copywriting",
      "industry_id": "MKT",
      "function_id": "mkt_creative",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "JD trainee viết/adapt copy, nghiên cứu đối tượng và hỗ trợ concept; ưu tiên 3–6 tháng thực tập/kinh nghiệm liên quan. Không tự suy diễn hoàn toàn không kinh nghiệm.",
      "sources": [
        {
          "org": "BLS",
          "title": "Writers and Authors",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.bls.gov/ooh/media-and-communication/writers-and-authors.htm"
        },
        {
          "org": "Publicis Groupe Vietnam",
          "title": "Copywriter Trainee",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/copywriter-trainee-at-publicis-groupe-vietnam-4487683290"
        },
        {
          "org": "Publicis Groupe Vietnam",
          "title": "Copywriter Trainee",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/copywriter-trainee-at-publicis-groupe-vietnam-4487683290"
        }
      ]
    },
    {
      "role_id": "MKT_015",
      "role_name": "Public Relations",
      "role_name_vi": "Quan hệ công chúng",
      "industry_group": "Marketing & Truyền thông",
      "function": "Quan hệ công chúng & Sự kiện",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Xây dựng quan hệ với các nhóm công chúng và quản lý thông tin truyền thông tổ chức.",
      "daily_tasks": [
        "Chuẩn bị thông tin truyền thông",
        "Phối hợp báo chí và đối tác",
        "Theo dõi tin tức",
        "Tổng hợp báo cáo phản hồi"
      ],
      "required_skills": [
        "Viết thông cáo",
        "Quan hệ truyền thông",
        "Theo dõi thông tin"
      ],
      "common_tools": [
        "Công cụ soạn thảo và theo dõi tin (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Thông cáo",
        "Báo cáo truyền thông"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Public Relations Specialists",
        "Vietnam: Public Relations Executive / Senior Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "MKT_016"
      ],
      "search_aliases": [
        "Public Relations",
        "Quan hệ công chúng",
        "Public Relations Specialists"
      ],
      "role_slug": "public-relations",
      "industry_id": "MKT",
      "function_id": "mkt_comms",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn phân biệt Executive và Senior; viết tài liệu, theo dõi tin và hỗ trợ sự kiện. Fresh graduate có thực tập phù hợp được cân nhắc cấp Executive.",
      "sources": [
        {
          "org": "BLS",
          "title": "Public Relations Specialists",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.bls.gov/ooh/media-and-communication/public-relations-specialists.htm"
        },
        {
          "org": "Ellerton & Co.",
          "title": "Vietnam: Public Relations Executive / Senior Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.ellerton.co/careers/vietnam-public-relations-executive-senior-executive"
        },
        {
          "org": "Ellerton & Co.",
          "title": "Vietnam: Public Relations Executive / Senior Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.ellerton.co/careers/vietnam-public-relations-executive-senior-executive"
        }
      ]
    },
    {
      "role_id": "MKT_016",
      "role_name": "Event & Brand Activation",
      "role_name_vi": "Sự kiện và kích hoạt thương hiệu",
      "industry_group": "Marketing & Truyền thông",
      "function": "Quan hệ công chúng & Sự kiện",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Lập kế hoạch và phối hợp các hạng mục để triển khai sự kiện hoặc hoạt động thương hiệu.",
      "daily_tasks": [
        "Làm rõ mục tiêu và phạm vi",
        "Lập kế hoạch/ngân sách",
        "Phối hợp địa điểm/nhà cung cấp",
        "Theo dõi hiện trường và tổng kết"
      ],
      "required_skills": [
        "Điều phối",
        "Kiểm soát ngân sách",
        "Xử lý phát sinh"
      ],
      "common_tools": [
        "Công cụ kế hoạch và ngân sách (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Kế hoạch sự kiện",
        "Checklist và báo cáo"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Meeting, Convention, and Event Planners",
        "Senior Event Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "MKT_015"
      ],
      "search_aliases": [
        "Event & Brand Activation",
        "Sự kiện và kích hoạt thương hiệu",
        "Meeting, Convention, and Event Planners"
      ],
      "role_slug": "event-brand-activation",
      "industry_id": "MKT",
      "function_id": "mkt_comms",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn xác nhận vai trò sự kiện Senior; phạm vi tổ chức sự kiện đối chiếu thêm BLS. Tin đã qua hạn, không dùng để khẳng định đang tuyển hoặc mức đầu vào.",
      "sources": [
        {
          "org": "BLS",
          "title": "Meeting, Convention, and Event Planners",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.bls.gov/ooh/business-and-financial/meeting-convention-and-event-planners.htm"
        },
        {
          "org": "BritCham Vietnam",
          "title": "Senior Event Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://britchamvn.com/vi/news/britcham-vietnam-senior-event-executive-hiring/"
        },
        {
          "org": "BritCham Vietnam",
          "title": "Senior Event Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://britchamvn.com/vi/news/britcham-vietnam-senior-event-executive-hiring/"
        }
      ]
    },
    {
      "role_id": "FIN_001",
      "role_name": "Financial Planning & Analysis",
      "role_name_vi": "Hoạch định và phân tích tài chính",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Tài chính doanh nghiệp",
      "simulation_status": "available",
      "mission_id": "MISSION_006",
      "role_description": "Hỗ trợ lập ngân sách, dự báo và phân tích kết quả tài chính để các bộ phận ra quyết định.",
      "daily_tasks": [
        "Tổng hợp báo cáo kết quả theo bộ phận",
        "Hỗ trợ lập ngân sách và cập nhật dự báo",
        "So sánh thực tế với kế hoạch và giải thích chênh lệch",
        "Phân tích chi phí và biên lợi nhuận dự án"
      ],
      "required_skills": [
        "Phân tích tài chính",
        "Lập ngân sách và dự báo",
        "Phân tích chênh lệch",
        "Trình bày số liệu"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint"
      ],
      "typical_outputs": [
        "Báo cáo chênh lệch so với ngân sách",
        "Bản dự báo tài chính cập nhật"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Financial Planning & Analysis (FP&A) Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. FUJINET nêu tối đa 2 năm kinh nghiệm trong tài chính, kế toán hoặc kiểm toán.",
      "related_role_ids": [
        "FIN_002",
        "FIN_004",
        "OPS_003",
        "FIN_010"
      ],
      "search_aliases": [
        "FP&A",
        "financial planning",
        "ngân sách",
        "dự báo tài chính",
        "kế hoạch tài chính",
        "FP&A Analyst",
        "Financial Planning & Analysis",
        "Hoạch định và phân tích tài chính"
      ],
      "role_slug": "fp-a-analyst",
      "industry_id": "FIN",
      "function_id": "fin_corporate",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "FUJINET Systems",
          "title": "Financial Planning & Analysis (FP&A) Analyst",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/financial-planning-analysis-fpa-analyst/2145036.html"
        }
      ]
    },
    {
      "role_id": "FIN_002",
      "role_name": "Corporate Treasury",
      "role_name_vi": "Ngân quỹ doanh nghiệp",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Tài chính doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi tiền, giao dịch ngân hàng và dòng tiền ngắn hạn của doanh nghiệp; phối hợp xử lý thanh toán, ngoại tệ và nhu cầu thanh khoản theo phân quyền.",
      "daily_tasks": [
        "Tổng hợp tình trạng tài khoản ngân hàng theo tuần",
        "Theo dõi tài sản bảo đảm và biến động hàng tồn",
        "Đối chiếu giao dịch ngoại tệ cuối tháng",
        "Cập nhật các khoản phải thu và báo cáo hạn mức"
      ],
      "required_skills": [
        "Đối chiếu số liệu tài chính",
        "Phân tích dữ liệu",
        "Lập báo cáo",
        "Phối hợp liên bộ phận"
      ],
      "common_tools": [
        "Power BI (điểm cộng theo JD)",
        "Power Automate (mức làm quen theo JD)"
      ],
      "typical_outputs": [
        "Bảng dự báo dòng tiền",
        "Báo cáo số dư và thanh khoản"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Junior Treasury Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Sucafina nêu tối thiểu 1 năm kinh nghiệm tài chính hoặc kế toán.",
      "related_role_ids": [
        "FIN_001",
        "FIN_003",
        "FIN_009",
        "FIN_011"
      ],
      "search_aliases": [
        "treasury",
        "nguồn vốn",
        "thanh khoản",
        "cash management",
        "ngoại tệ",
        "Treasury Analyst",
        "Junior Treasury Analyst",
        "Corporate Treasury",
        "Ngân quỹ doanh nghiệp"
      ],
      "role_slug": "junior-treasury-analyst",
      "industry_id": "FIN",
      "function_id": "fin_corporate",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Sucafina",
          "title": "Junior Treasury Analyst",
          "market": "TP.HCM",
          "type": "JD trên SmartRecruiters qua Jobs for Humanity",
          "url": "https://jobs.smartrecruiters.com/JobsForHumanity/744000154048615-junior-treasury-analyst"
        }
      ]
    },
    {
      "role_id": "FIN_005",
      "role_name": "Equity Research",
      "role_name_vi": "Phân tích cổ phiếu",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Đầu tư & Thị trường vốn",
      "simulation_status": "available",
      "mission_id": "MISSION_007",
      "role_description": "Nghiên cứu công ty niêm yết và ngành, xây dựng định giá cổ phiếu và trình bày luận điểm đầu tư.",
      "daily_tasks": [
        "Thu thập thông tin doanh nghiệp và ngành",
        "Đọc báo cáo tài chính và phân tích động lực kinh doanh",
        "Định giá cổ phiếu theo các giả định đã xác định",
        "Viết khuyến nghị và trình bày luận điểm cho khách hàng hoặc nhóm nghiên cứu"
      ],
      "required_skills": [
        "Phân tích báo cáo tài chính",
        "Nghiên cứu ngành",
        "Định giá vốn cổ phần",
        "Viết luận điểm đầu tư"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Báo cáo ngành hoặc cổ phiếu",
        "Bảng định giá và luận điểm đầu tư"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Equity Research Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Nguồn MBS mô tả cấp chuyên viên phân tích. Yêu cầu kinh nghiệm cụ thể cần đối chiếu theo tin tuyển.",
      "related_role_ids": [
        "FIN_004",
        "FIN_006"
      ],
      "search_aliases": [
        "equity research",
        "chứng khoán",
        "phân tích cổ phiếu",
        "phân tích công ty niêm yết",
        "Equity Research Analyst"
      ],
      "role_slug": "equity-research-analyst",
      "industry_id": "FIN",
      "function_id": "fin_invest",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Chứng khoán MB (MBS)",
          "title": "Equity Research Analyst",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.mbs.com.vn/vi/tuyen-dung/vi-tri-tuyen-dung/equity-research-analyst-1/"
        }
      ]
    },
    {
      "role_id": "FIN_006",
      "role_name": "Investment Banking",
      "role_name_vi": "Ngân hàng đầu tư",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Đầu tư & Thị trường vốn",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Hỗ trợ giao dịch huy động vốn và mua bán sáp nhập qua phân tích tài chính, tài liệu giao dịch và thẩm định.",
      "daily_tasks": [
        "Lập mô hình tài chính và định giá theo kịch bản",
        "Soạn tài liệu giới thiệu giao dịch và đề xuất tư vấn",
        "Sắp xếp tài liệu thẩm định trong phòng dữ liệu",
        "Theo dõi câu hỏi nhà đầu tư và tiến độ giao dịch"
      ],
      "required_skills": [
        "Mô hình tài chính",
        "Định giá DCF và so sánh",
        "Thẩm định giao dịch",
        "Quản lý thông tin giao dịch"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint",
        "Capital IQ (ví dụ trong JD)",
        "Virtual Data Room"
      ],
      "typical_outputs": [
        "Mô hình định giá",
        "Tài liệu giới thiệu giao dịch và danh mục thẩm định"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Investment Banking Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Maples Capital nêu khoảng 1–2 năm kinh nghiệm liên quan trong JD tham chiếu.",
      "related_role_ids": [
        "FIN_004",
        "FIN_005"
      ],
      "search_aliases": [
        "investment banking",
        "IB analyst",
        "M&A",
        "huy động vốn",
        "tư vấn giao dịch",
        "Investment Banking Analyst",
        "Ngân hàng đầu tư"
      ],
      "role_slug": "investment-banking-analyst",
      "industry_id": "FIN",
      "function_id": "fin_invest",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Maples Capital",
          "title": "Investment Banking Analyst",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/investment-banking-analyst-at-maples-capital-4436519991"
        }
      ]
    },
    {
      "role_id": "FIN_004",
      "role_name": "Investment Analysis",
      "role_name_vi": "Phân tích đầu tư",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Đầu tư & Thị trường vốn",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Nghiên cứu doanh nghiệp và thị trường, lập mô hình định giá và hỗ trợ chuẩn bị hồ sơ ra quyết định đầu tư.",
      "daily_tasks": [
        "Nghiên cứu ngành và sàng lọc doanh nghiệp",
        "Lập hoặc cập nhật mô hình tài chính và định giá",
        "Thu thập và rà soát dữ liệu phục vụ thẩm định",
        "Chuẩn bị bản ghi nhớ và tài liệu trình bày đầu tư"
      ],
      "required_skills": [
        "Nghiên cứu ngành",
        "Mô hình tài chính",
        "Định giá",
        "Tổng hợp và viết phân tích"
      ],
      "common_tools": [
        "Excel"
      ],
      "typical_outputs": [
        "Mô hình tài chính",
        "Bản ghi nhớ cơ hội đầu tư"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Investment Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Maples Capital nêu 0–2 năm. Kinh nghiệm thực tập tài chính là điểm cộng.",
      "related_role_ids": [
        "FIN_001",
        "FIN_003",
        "FIN_005",
        "FIN_006"
      ],
      "search_aliases": [
        "đầu tư",
        "investment research",
        "phân tích đầu tư",
        "định giá",
        "financial modeling",
        "Investment Analyst",
        "Investment Analysis"
      ],
      "role_slug": "investment-analyst",
      "industry_id": "FIN",
      "function_id": "fin_invest",
      "role_order": 3,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Maples Capital",
          "title": "Investment Analyst",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://maples.vc/en/career-detail/investment-analyst.html"
        }
      ]
    },
    {
      "role_id": "FIN_003",
      "role_name": "Credit Analysis",
      "role_name_vi": "Phân tích tín dụng",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Ngân hàng doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phân tích khả năng trả nợ và rủi ro từ dữ liệu tài chính để hỗ trợ đề xuất tín dụng.",
      "daily_tasks": [
        "Thu thập và phân tích dữ liệu tài chính của doanh nghiệp",
        "Đánh giá hồ sơ vay cùng người phụ trách thẩm định",
        "Đề xuất hạn mức hoặc phương án kèm lập luận",
        "Theo dõi danh mục và báo cáo dấu hiệu rủi ro"
      ],
      "required_skills": [
        "Đọc báo cáo tài chính",
        "Phân tích khả năng trả nợ",
        "Lập luận rủi ro",
        "Phân tích dữ liệu danh mục"
      ],
      "common_tools": [
        "Excel",
        "SQL",
        "Power BI"
      ],
      "typical_outputs": [
        "Tóm tắt hồ sơ tín dụng",
        "Đề xuất đánh giá khả năng trả nợ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Chuyên viên Phân tích Tín dụng (Credit Analyst)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Advance Vietnam nêu 2–3 năm kinh nghiệm liên quan.",
      "related_role_ids": [
        "FIN_002",
        "FIN_004",
        "FIN_007",
        "FIN_008"
      ],
      "search_aliases": [
        "credit analyst",
        "phân tích tín dụng",
        "thẩm định tín dụng",
        "rủi ro tín dụng",
        "Credit Analysis"
      ],
      "role_slug": "credit-analyst",
      "industry_id": "FIN",
      "function_id": "fin_banking",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Advance Vietnam",
          "title": "Chuyên viên Phân tích Tín dụng (Credit Analyst)",
          "market": "Việt Nam",
          "type": "JD trên CareerBox",
          "url": "https://www.careerbox.vn/tuyen-dung/viec-lam/484/chuyen-vien-phan-tich-tin-dung--credit-analyst"
        }
      ]
    },
    {
      "role_id": "FIN_007",
      "role_name": "Corporate Banking Relationship Management",
      "role_name_vi": "Quan hệ khách hàng doanh nghiệp",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Ngân hàng doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Quản lý quan hệ và tư vấn giải pháp ngân hàng cho doanh nghiệp, đồng thời theo dõi danh mục và rủi ro sau cấp tín dụng.",
      "daily_tasks": [
        "Tìm hiểu hoạt động và nhu cầu tài chính của doanh nghiệp",
        "Tư vấn sản phẩm tài trợ hoặc dịch vụ ngân hàng",
        "Phối hợp chuẩn bị và trình đề xuất tín dụng",
        "Theo dõi danh mục, chất lượng phục vụ và dấu hiệu rủi ro"
      ],
      "required_skills": [
        "Phân tích nhu cầu doanh nghiệp",
        "Tư vấn sản phẩm ngân hàng",
        "Quản lý quan hệ khách hàng",
        "Nhận diện rủi ro tín dụng"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Đề xuất giải pháp cho khách hàng",
        "Báo cáo theo dõi danh mục"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Chuyên viên cao cấp Quản lý quan hệ khách hàng doanh nghiệp - SME",
        "Chuyên viên quan hệ khách hàng doanh nghiệp (40001764)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Tin chuyên viên Techcombank tham chiếu yêu cầu ít nhất 3 năm. JD cao cấp SME nêu 5 năm trở lên.",
      "related_role_ids": [
        "FIN_003",
        "OPS_006",
        "FIN_018"
      ],
      "search_aliases": [
        "RM",
        "RM SME",
        "quan hệ khách hàng doanh nghiệp",
        "corporate banking",
        "SME banking",
        "Corporate Relationship Manager",
        "Corporate Banking Relationship Management"
      ],
      "role_slug": "corporate-relationship-manager",
      "industry_id": "FIN",
      "function_id": "fin_banking",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Techcombank",
          "title": "Chuyên viên cao cấp Quản lý quan hệ khách hàng doanh nghiệp - SME",
          "market": "Long An",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.techcombankjobs.com/job/Long-An-Chuy%C3%AAn-vi%C3%AAn-cao-c%E1%BA%A5p-Qu%E1%BA%A3n-l%C3%BD-quan-h%E1%BB%87-kh%C3%A1ch-h%C3%A0ng-doanh-nghi%E1%BB%87p-SME-(40000899)/61072444/"
        },
        {
          "org": "Techcombank",
          "title": "Chuyên viên quan hệ khách hàng doanh nghiệp (40001764)",
          "market": "Hà Nội",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.techcombankjobs.com/job/TP_-H%C3%A0-N%E1%BB%99i-Chuy%C3%AAn-vi%C3%AAn-quan-h%E1%BB%87-kh%C3%A1ch-h%C3%A0ng-doanh-nghi%E1%BB%87p-(40001764/58161844/"
        }
      ]
    },
    {
      "role_id": "FIN_008",
      "role_name": "Credit Risk Analysis",
      "role_name_vi": "Phân tích rủi ro tín dụng",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Quản trị rủi ro",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi rủi ro ở cấp danh mục tín dụng và phân tích dữ liệu để đề xuất điều chỉnh chính sách hoặc kiểm soát.",
      "daily_tasks": [
        "Truy vấn dữ liệu giao dịch để theo dõi chỉ số rủi ro",
        "Phân tích nguyên nhân khi chỉ số biến động",
        "Kiểm tra kết quả phân tích với dữ liệu nguồn",
        "Đánh giá tác động của thay đổi quy tắc hoặc thử nghiệm"
      ],
      "required_skills": [
        "SQL phân tích",
        "Thống kê và thử nghiệm",
        "Giám sát danh mục",
        "Đối chiếu và giải thích dữ liệu"
      ],
      "common_tools": [
        "SQL",
        "Python (ưu tiên)",
        "BigQuery (ưu tiên theo JD)"
      ],
      "typical_outputs": [
        "Báo cáo rủi ro danh mục",
        "Phân tích tác động của thay đổi chính sách"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Credit Risk Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD MoMo yêu cầu kinh nghiệm thực hành phân tích dữ liệu và SQL trên dữ liệu giao dịch.",
      "related_role_ids": [
        "FIN_003",
        "FIN_009",
        "DATA_001",
        "DATA_006",
        "FIN_019"
      ],
      "search_aliases": [
        "credit risk",
        "portfolio risk",
        "rủi ro tín dụng",
        "giám sát danh mục",
        "Credit Risk Analyst",
        "Credit Risk Analysis",
        "Phân tích rủi ro tín dụng"
      ],
      "role_slug": "credit-risk-analyst",
      "industry_id": "FIN",
      "function_id": "fin_risk",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "MoMo",
          "title": "Credit Risk Analyst",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://momo.careers/jobs/credit-risk-analyst-19379"
        }
      ]
    },
    {
      "role_id": "FIN_009",
      "role_name": "Market Risk Analysis",
      "role_name_vi": "Phân tích rủi ro thị trường",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Quản trị rủi ro",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Đo mức độ danh mục chịu tác động từ biến động lãi suất, tỷ giá hoặc giá thị trường và theo dõi giới hạn rủi ro.",
      "daily_tasks": [
        "Theo dõi mức phơi nhiễm và biến động các yếu tố thị trường",
        "Đo chỉ số rủi ro và so sánh với giới hạn được giao",
        "Phân tích kịch bản bất lợi hoặc biến động lớn",
        "Tổng hợp báo cáo, cảnh báo và đề xuất biện pháp kiểm soát"
      ],
      "required_skills": [
        "Phân tích rủi ro thị trường",
        "Đọc dữ liệu lãi suất và tỷ giá",
        "Phân tích kịch bản",
        "Báo cáo và kiểm soát giới hạn"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Báo cáo giới hạn rủi ro",
        "Kết quả phân tích kịch bản"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Expert, Market and Liquidity Risk Analysis",
        "Chuyên viên Quản lý rủi ro"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Nguồn Techcombank tham chiếu có phạm vi rủi ro thị trường và thanh khoản cấp chuyên gia. Nhãn web mô tả nhánh công việc.",
      "related_role_ids": [
        "FIN_002",
        "FIN_008",
        "FIN_012"
      ],
      "search_aliases": [
        "market risk",
        "rủi ro thị trường",
        "VaR",
        "stress test",
        "rủi ro lãi suất",
        "Market Risk Analyst",
        "Market Risk Analysis",
        "Phân tích rủi ro thị trường"
      ],
      "role_slug": "market-risk-analyst",
      "industry_id": "FIN",
      "function_id": "fin_risk",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn Expert bao gồm Market và Liquidity Risk. Chỉ giữ đo lường rủi ro thị trường; không đưa trách nhiệm Expert hoặc quản trị thanh khoản thành nhiệm vụ bắt buộc đầu vào.",
      "sources": [
        {
          "org": "Techcombank",
          "title": "Expert, Market and Liquidity Risk Analysis",
          "market": "Việt Nam",
          "type": "JD trên U&Bank",
          "url": "https://ub.edu.vn/tuyen-dung-ngan-hang/expert-market-and-liquidity-risk-analysis-40000794-techcombank-56447444"
        },
        {
          "org": "Sở Giao dịch Hàng hóa Việt Nam (MXV)",
          "title": "Chuyên viên Quản lý rủi ro",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://mxv.com.vn/thong-tin/tuyen-dung/chuyen-vien-quan-ly-rui-ro-i129.html"
        }
      ]
    },
    {
      "role_id": "FIN_010",
      "role_name": "General Accounting",
      "role_name_vi": "Kế toán tổng hợp",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kế toán doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tổng hợp nghiệp vụ kế toán, đối chiếu số liệu và hỗ trợ lập báo cáo, khóa sổ đúng kỳ.",
      "daily_tasks": [
        "Kiểm tra và ghi nhận giao dịch kế toán",
        "Đối chiếu tài khoản, lập bút toán và bảng giải trình",
        "Thực hiện các bước khóa sổ cuối kỳ",
        "Hỗ trợ lập báo cáo và chuẩn bị hồ sơ kiểm toán"
      ],
      "required_skills": [
        "Hạch toán",
        "Đối chiếu và khóa sổ",
        "Đọc chứng từ",
        "Lập báo cáo kế toán"
      ],
      "common_tools": [
        "SAP"
      ],
      "typical_outputs": [
        "Bảng đối chiếu tài khoản",
        "Bảng hỗ trợ khóa sổ và báo cáo tài chính"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Kế toán tổng hợp / General Accountant"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Olam Việt Nam nêu tối thiểu 3 năm kế toán tổng hợp và yêu cầu SAP.",
      "related_role_ids": [
        "FIN_011",
        "FIN_012",
        "FIN_001",
        "FIN_015",
        "FIN_016"
      ],
      "search_aliases": [
        "general accounting",
        "kế toán tổng hợp",
        "kế toán",
        "khóa sổ",
        "hạch toán",
        "General Accountant"
      ],
      "role_slug": "general-accountant",
      "industry_id": "FIN",
      "function_id": "fin_accounting",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Olam Việt Nam",
          "title": "Kế toán tổng hợp / General Accountant",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên CareerViet",
          "url": "https://vieclam.tuoitre.vn/vi/tim-viec-lam/ke-toan-tong-hop-general-accountant.35C8D68D.html"
        }
      ]
    },
    {
      "role_id": "FIN_011",
      "role_name": "Accounts Receivable Accounting",
      "role_name_vi": "Kế toán phải thu",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kế toán doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Đối soát doanh thu và số phải thu, theo dõi thanh toán và xử lý chênh lệch hoặc khoản nợ quá hạn.",
      "daily_tasks": [
        "Kiểm tra ghi nhận doanh thu và khoản phải thu",
        "Đối soát dữ liệu giữa hệ thống nghiệp vụ và kế toán",
        "Theo dõi nợ đến hạn, quá hạn và tiến độ thu hồi",
        "Chuẩn bị báo cáo phải thu và dữ liệu khóa sổ"
      ],
      "required_skills": [
        "Đối soát doanh thu",
        "Phân tích tuổi nợ",
        "Theo dõi thu hồi",
        "Lập báo cáo phải thu"
      ],
      "common_tools": [
        "Oracle ERP hoặc SAP",
        "Hệ thống nghiệp vụ (HIS trong JD bệnh viện)"
      ],
      "typical_outputs": [
        "Báo cáo tuổi nợ",
        "Bảng đối soát doanh thu và phải thu"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Accounts Receivable Accountant"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Hoàn Mỹ nêu 4–6 năm ở kế toán phải thu, doanh thu hoặc tổng hợp.",
      "related_role_ids": [
        "FIN_010",
        "FIN_002",
        "OPS_007",
        "FIN_013"
      ],
      "search_aliases": [
        "AR accountant",
        "công nợ phải thu",
        "kế toán doanh thu",
        "aging",
        "đối soát công nợ",
        "Accounts Receivable Accountant",
        "Accounts Receivable Accounting",
        "Kế toán phải thu"
      ],
      "role_slug": "accounts-receivable-accountant",
      "industry_id": "FIN",
      "function_id": "fin_accounting",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn Hoàn Mỹ yêu cầu 4–6 năm là điều kiện của tin cụ thể, không phải yêu cầu toàn bộ nghề AR.",
      "sources": [
        {
          "org": "Tập đoàn Y khoa Hoàn Mỹ",
          "title": "Accounts Receivable Accountant",
          "market": "TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://hoanmy.com/career/vi/accounts-receivable-accountant"
        }
      ]
    },
    {
      "role_id": "FIN_013",
      "role_name": "Accounts Payable Accounting",
      "role_name_vi": "Kế toán phải trả",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kế toán doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Kiểm tra chứng từ mua hàng và theo dõi nghĩa vụ thanh toán nhà cung cấp.",
      "daily_tasks": [
        "Đối chiếu hóa đơn với PO",
        "Kiểm tra hồ sơ",
        "Cập nhật công nợ phải trả",
        "Lưu và phối hợp xử lý chênh lệch"
      ],
      "required_skills": [
        "Đối chiếu chứng từ",
        "Nghiệp vụ kế toán",
        "Quản lý hồ sơ"
      ],
      "common_tools": [
        "Excel",
        "Phần mềm kế toán (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bảng đối chiếu hóa đơn",
        "Danh sách công nợ phải trả"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Accountant Payable Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_011"
      ],
      "search_aliases": [
        "Accounts Payable Accounting",
        "Kế toán phải trả",
        "Accountant Payable Intern"
      ],
      "role_slug": "accounts-payable-accounting",
      "industry_id": "FIN",
      "function_id": "fin_accounting",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Eurofins",
          "title": "Accountant Payable Intern",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/Eurofins/744000106748080--thu-duc-accountant-payable-intern-6-months-with-allowance"
        }
      ]
    },
    {
      "role_id": "FIN_015",
      "role_name": "Tax Accounting",
      "role_name_vi": "Kế toán thuế",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kế toán doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Đối chiếu dữ liệu kế toán và chuẩn bị hồ sơ phục vụ nghĩa vụ thuế theo phân công.",
      "daily_tasks": [
        "Kiểm tra chứng từ",
        "Đối chiếu số liệu",
        "Chuẩn bị hồ sơ thuế",
        "Theo dõi lịch và lưu giải trình"
      ],
      "required_skills": [
        "Kế toán",
        "Đối chiếu số liệu",
        "Quản lý thời hạn"
      ],
      "common_tools": [
        "Phần mềm kế toán và kê khai (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bảng đối chiếu thuế",
        "Hồ sơ kê khai"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Accountants and Auditors"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_010"
      ],
      "search_aliases": [
        "Tax Accounting",
        "Kế toán thuế",
        "Accountants and Auditors"
      ],
      "role_slug": "tax-accounting",
      "industry_id": "FIN",
      "function_id": "fin_accounting",
      "role_order": 4,
      "content_basis": "professional_framework",
      "publication_status": "framework_or_listing_review",
      "review_note": "Mô tả chức năng chung; không đưa quy định thuế Hoa Kỳ vào nội dung Việt Nam",
      "sources": [
        {
          "org": "BLS",
          "title": "Accountants and Auditors",
          "market": "Quốc tế",
          "type": "Khung nghề chuyên môn",
          "url": "https://www.bls.gov/ooh/business-and-financial/accountants-and-auditors.htm"
        }
      ]
    },
    {
      "role_id": "FIN_016",
      "role_name": "Cost Accounting",
      "role_name_vi": "Kế toán chi phí và giá thành",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kế toán doanh nghiệp",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi chi phí, định giá tồn kho và phân tích chênh lệch trong bối cảnh sản xuất.",
      "daily_tasks": [
        "Đối chiếu dữ liệu chi phí",
        "Kiểm tra định giá tồn kho",
        "Phân tích chênh lệch",
        "Hỗ trợ báo cáo chi phí"
      ],
      "required_skills": [
        "Kế toán chi phí",
        "Phân tích chênh lệch",
        "Kiểm tra dữ liệu"
      ],
      "common_tools": [
        "ERP",
        "Excel (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bảng giá thành",
        "Báo cáo chênh lệch chi phí"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Sr. Cost Accountant"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_010"
      ],
      "search_aliases": [
        "Cost Accounting",
        "Kế toán chi phí và giá thành",
        "Sr. Cost Accountant"
      ],
      "role_slug": "cost-accounting",
      "industry_id": "FIN",
      "function_id": "fin_accounting",
      "role_order": 5,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "JD cấp Senior tại nhà máy; chỉ tổng hợp chức năng nghề, không gắn lối vào Intern",
      "sources": [
        {
          "org": "Jabil",
          "title": "Sr. Cost Accountant",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.jabil.com/en/job/nhon-trach/sr-cost-accountant/626/102778598800"
        }
      ]
    },
    {
      "role_id": "FIN_012",
      "role_name": "Internal Audit",
      "role_name_vi": "Kiểm toán nội bộ",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kiểm toán & Kiểm soát nội bộ",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Rà soát quy trình và hồ sơ để đánh giá kiểm soát, phát hiện sai lệch và theo dõi việc khắc phục.",
      "daily_tasks": [
        "Lập kế hoạch và phạm vi kiểm toán nội bộ",
        "Kiểm tra chứng từ, dữ liệu và quy trình theo mẫu",
        "Phân tích sai lệch, rủi ro và nguyên nhân",
        "Báo cáo phát hiện, kiến nghị và theo dõi khắc phục"
      ],
      "required_skills": [
        "Kiểm tra bằng chứng",
        "Đánh giá kiểm soát nội bộ",
        "Phân tích rủi ro",
        "Viết báo cáo kiểm toán"
      ],
      "common_tools": [
        "Excel",
        "Microsoft Office"
      ],
      "typical_outputs": [
        "Biên bản phát hiện",
        "Báo cáo và danh sách kiến nghị sau kiểm toán"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Kiểm toán Nội bộ (Internal Auditor)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD JIT Việt Nam nêu 3–5 năm trong kiểm toán nội bộ hoặc độc lập.",
      "related_role_ids": [
        "FIN_010",
        "FIN_009",
        "OPS_003",
        "FIN_014",
        "FIN_017"
      ],
      "search_aliases": [
        "internal audit",
        "kiểm toán nội bộ",
        "audit findings",
        "Internal Auditor"
      ],
      "role_slug": "internal-auditor",
      "industry_id": "FIN",
      "function_id": "fin_audit",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "JIT Việt Nam",
          "title": "Kiểm toán Nội bộ (Internal Auditor)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/kiem-toan-noi-bo-internal-auditor/2253781.html"
        }
      ]
    },
    {
      "role_id": "FIN_014",
      "role_name": "External Audit",
      "role_name_vi": "Kiểm toán độc lập",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kiểm toán & Kiểm soát nội bộ",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Thực hiện thủ tục kiểm toán để hỗ trợ đánh giá báo cáo tài chính của khách hàng.",
      "daily_tasks": [
        "Tìm hiểu hoạt động khách hàng",
        "Thu thập và lưu bằng chứng",
        "Thực hiện thủ tục được phân công",
        "Báo cáo vấn đề cho nhóm kiểm toán"
      ],
      "required_skills": [
        "Kế toán và kiểm toán",
        "Phân tích",
        "Lập hồ sơ làm việc"
      ],
      "common_tools": [
        "Công cụ hồ sơ kiểm toán (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Giấy tờ làm việc",
        "Danh sách vấn đề kiểm toán"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Graduate Staff",
        "GFS Assurance"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_012"
      ],
      "search_aliases": [
        "External Audit",
        "Kiểm toán độc lập",
        "Graduate Staff",
        "GFS Assurance"
      ],
      "role_slug": "external-audit",
      "industry_id": "FIN",
      "function_id": "fin_audit",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "EY",
          "title": "Graduate Staff | GFS Assurance",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.ey.com/ey/job/Ho-Chi-Minh-City-Graduate-Staff-GFS-Assurance-%28Banking-%26-Financial-Industry%29-HCMC-Office/709831301/"
        }
      ]
    },
    {
      "role_id": "FIN_017",
      "role_name": "Internal Control",
      "role_name_vi": "Kiểm soát nội bộ",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Kiểm toán & Kiểm soát nội bộ",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Hỗ trợ thiết kế và theo dõi các kiểm soát trong quy trình nhằm hạn chế sai sót và rủi ro.",
      "daily_tasks": [
        "Lập bản đồ quy trình/rủi ro",
        "Kiểm tra thực hiện kiểm soát",
        "Theo dõi ngoại lệ",
        "Phối hợp khắc phục"
      ],
      "required_skills": [
        "Phân tích quy trình",
        "Đánh giá kiểm soát",
        "Tài liệu hóa"
      ],
      "common_tools": [
        "Công cụ kiểm soát và tài liệu (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Ma trận rủi ro–kiểm soát",
        "Báo cáo ngoại lệ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Staff / Assistant - Technology Assurance",
        "Internal Control Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_012"
      ],
      "search_aliases": [
        "Internal Control",
        "Kiểm soát nội bộ",
        "Staff / Assistant - Technology Assurance"
      ],
      "role_slug": "internal-control",
      "industry_id": "FIN",
      "function_id": "fin_audit",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "JD chuyên trách kiểm soát nội bộ; kết hợp quản lý tuân thủ/quy trình và kiểm tra. Không dùng kiểm toán nội bộ làm tên đồng nghĩa.",
      "sources": [
        {
          "org": "EY",
          "title": "Staff / Assistant - Technology Assurance",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.ey.com/ey/job/Ha-Noi-Staff-Assistant-Technology-Assurance-Hanoi-Office/1186201401/"
        },
        {
          "org": "LS Electric Vietnam",
          "title": "Internal Control Specialist",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.topcv.vn/viec-lam/internal-control-specialist/2122661.html"
        },
        {
          "org": "LS Electric Vietnam",
          "title": "Internal Control Specialist",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.topcv.vn/viec-lam/internal-control-specialist/2122661.html"
        }
      ]
    },
    {
      "role_id": "FIN_018",
      "role_name": "Retail Banking Relationship Management",
      "role_name_vi": "Quan hệ khách hàng cá nhân",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Ngân hàng bán lẻ",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phát triển khách hàng cá nhân, tư vấn sản phẩm và phối hợp hoàn thiện hồ sơ ngân hàng.",
      "daily_tasks": [
        "Tìm khách hàng",
        "Tư vấn và bán sản phẩm",
        "Thu thập hồ sơ",
        "Theo dõi và phối hợp sau giải ngân"
      ],
      "required_skills": [
        "Bán hàng tư vấn",
        "Hiểu sản phẩm",
        "Quản lý hồ sơ"
      ],
      "common_tools": [
        "CRM ngân hàng (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Hồ sơ khách hàng",
        "Báo cáo hoạt động bán hàng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Chuyên viên khách hàng cá nhân"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_007"
      ],
      "search_aliases": [
        "Retail Banking Relationship Management",
        "Quan hệ khách hàng cá nhân",
        "Chuyên viên khách hàng cá nhân"
      ],
      "role_slug": "retail-banking-relationship-management",
      "industry_id": "FIN",
      "function_id": "fin_retail",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Techcombank",
          "title": "Chuyên viên khách hàng cá nhân",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.techcombankjobs.com/job/TP_-C%E1%BA%A7n-Th%C6%A1-Chuy%C3%AAn-vi%C3%AAn-kh%C3%A1ch-h%C3%A0ng-c%C3%A1-nh%C3%A2n/4147944/"
        }
      ]
    },
    {
      "role_id": "FIN_019",
      "role_name": "AML & Financial Crime Compliance",
      "role_name_vi": "Phòng chống rửa tiền và tuân thủ tài chính",
      "industry_group": "Tài chính, Kế toán & Ngân hàng",
      "function": "Tuân thủ & Phòng chống tội phạm tài chính",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Rà soát thông tin và dấu hiệu bất thường để hỗ trợ tuân thủ, phòng chống tội phạm tài chính.",
      "daily_tasks": [
        "Rà soát hồ sơ KYC",
        "Phân tích cảnh báo theo quy trình",
        "Ghi nhận và chuyển cấp",
        "Duy trì hồ sơ kiểm tra"
      ],
      "required_skills": [
        "Phân tích hồ sơ",
        "Tuân thủ quy trình",
        "Viết báo cáo"
      ],
      "common_tools": [
        "Hệ thống KYC/giám sát (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Hồ sơ rà soát",
        "Báo cáo chuyển cấp"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Vietnam careers – CDD / AML responsibilities"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "FIN_008"
      ],
      "search_aliases": [
        "AML & Financial Crime Compliance",
        "Phòng chống rửa tiền và tuân thủ tài chính",
        "Vietnam careers – CDD / AML responsibilities"
      ],
      "role_slug": "aml-financial-crime-compliance",
      "industry_id": "FIN",
      "function_id": "fin_compliance",
      "role_order": 1,
      "content_basis": "professional_framework",
      "publication_status": "framework_or_listing_review",
      "review_note": "Nguồn xác nhận nhiệm vụ CDD/AML; chưa xác nhận JD AML Analyst chuyên trách hoặc cấp độ đầu vào",
      "sources": [
        {
          "org": "HSBC",
          "title": "Vietnam careers – CDD / AML responsibilities",
          "market": "Việt Nam",
          "type": "Trang nghề nghiệp doanh nghiệp",
          "url": "https://portal.careers.hsbc.com/careers?location=vietnam"
        }
      ]
    },
    {
      "role_id": "OPS_002",
      "role_name": "B2B Business Development",
      "role_name_vi": "Phát triển kinh doanh B2B",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Phát triển & Hỗ trợ kinh doanh",
      "simulation_status": "available",
      "mission_id": "MISSION_003",
      "role_description": "Tìm khách hàng doanh nghiệp, tìm hiểu nhu cầu và phối hợp đưa ra đề xuất giải pháp.",
      "daily_tasks": [
        "Tìm khách hàng tiềm năng qua các kênh tiếp cận",
        "Khai thác nhu cầu và xác định cơ hội phù hợp",
        "Tư vấn hoặc phối hợp làm đề xuất giải pháp",
        "Cập nhật thông tin và trạng thái cơ hội bán hàng"
      ],
      "required_skills": [
        "Tìm kiếm và sàng lọc khách hàng",
        "Khai thác nhu cầu",
        "Tư vấn và đàm phán",
        "Quản lý cơ hội B2B"
      ],
      "common_tools": [
        "HubSpot hoặc Salesforce (ví dụ CRM)",
        "Email",
        "LinkedIn"
      ],
      "typical_outputs": [
        "Danh sách khách hàng tiềm năng",
        "Đề xuất hợp tác"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Business Development Executive - B2B (HN/HCM)",
        "Business Development Executive (BDE)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Sapo nêu tối thiểu 6 tháng kinh nghiệm Sales B2B hoặc Business Development.",
      "related_role_ids": [
        "OPS_001",
        "OPS_003",
        "OPS_007",
        "OPS_006",
        "OPS_016"
      ],
      "search_aliases": [
        "BDE",
        "BD",
        "B2B sales",
        "phát triển kinh doanh",
        "tìm kiếm khách hàng",
        "Business Development Executive (B2B)",
        "B2B Business Development",
        "Phát triển kinh doanh B2B"
      ],
      "role_slug": "business-development-executive-b2b",
      "industry_id": "OPS",
      "function_id": "ops_sales",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Sapo",
          "title": "Business Development Executive - B2B (HN/HCM)",
          "market": "Hà Nội / TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tuyendung.sapo.vn/co-hoi-viec-lam/business-development-executive-b2b-hn-hcm-a3546.html"
        },
        {
          "org": "TC Data",
          "title": "Business Development Executive (BDE)",
          "market": "TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tcdata.vn/career/business-development-executive-bde/"
        }
      ]
    },
    {
      "role_id": "OPS_007",
      "role_name": "Sales Administration",
      "role_name_vi": "Hỗ trợ hành chính kinh doanh",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Phát triển & Hỗ trợ kinh doanh",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Xử lý hồ sơ bán hàng, đơn hàng và báo cáo để dữ liệu giữa kinh doanh và kế toán được cập nhật đúng.",
      "daily_tasks": [
        "Tiếp nhận đơn và rà soát dữ liệu khách hàng",
        "Tạo đơn bán hàng và đối chiếu thông tin CRM với ERP",
        "Theo dõi mã hợp đồng, phiếu thu hoặc hồ sơ đổi trả",
        "Tổng hợp báo cáo định kỳ cho đội kinh doanh"
      ],
      "required_skills": [
        "Quản lý đơn hàng",
        "Đối chiếu dữ liệu",
        "Quản lý hợp đồng",
        "Lập báo cáo bán hàng"
      ],
      "common_tools": [
        "CRM (nhóm công cụ)",
        "ERP (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Danh sách đơn và hồ sơ theo dõi",
        "Báo cáo bán hàng định kỳ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Nhân viên Sales Admin"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Mutosi mô tả cấp nhân viên hỗ trợ xử lý đơn và hồ sơ bán hàng.",
      "related_role_ids": [
        "OPS_002",
        "FIN_011",
        "OPS_014"
      ],
      "search_aliases": [
        "sales admin",
        "sales support",
        "hỗ trợ kinh doanh",
        "quản trị đơn hàng",
        "đơn bán hàng",
        "Sales Administration",
        "Hỗ trợ hành chính kinh doanh"
      ],
      "role_slug": "sales-admin",
      "industry_id": "OPS",
      "function_id": "ops_sales",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Mutosi Group",
          "title": "Nhân viên Sales Admin",
          "market": "Hà Nội",
          "type": "JD doanh nghiệp trên JobsGO",
          "url": "https://jobsgo.vn/viec-lam/nhan-vien-sales-admin-28652776320.html"
        }
      ]
    },
    {
      "role_id": "OPS_014",
      "role_name": "Sales Operations",
      "role_name_vi": "Vận hành bán hàng",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Phát triển & Hỗ trợ kinh doanh",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Duy trì dữ liệu, nhịp báo cáo và quy trình hỗ trợ đội bán hàng hoạt động hiệu quả.",
      "daily_tasks": [
        "Cập nhật cơ hội kinh doanh",
        "Tổng hợp báo cáo",
        "Điều phối họp và đầu việc",
        "Theo dõi vấn đề quy trình"
      ],
      "required_skills": [
        "Quản lý dữ liệu CRM",
        "Báo cáo",
        "Điều phối"
      ],
      "common_tools": [
        "CRM",
        "Excel"
      ],
      "typical_outputs": [
        "Báo cáo pipeline",
        "Danh sách đầu việc bán hàng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Coordinator - Sales Operations"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_007"
      ],
      "search_aliases": [
        "Sales Operations",
        "Vận hành bán hàng",
        "Coordinator - Sales Operations"
      ],
      "role_slug": "sales-operations",
      "industry_id": "OPS",
      "function_id": "ops_sales",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Expeditors",
          "title": "Coordinator - Sales Operations",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/Expeditors/744000156707319-coordinator-sales-operations"
        }
      ]
    },
    {
      "role_id": "OPS_016",
      "role_name": "Sales",
      "role_name_vi": "Bán hàng",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Phát triển & Hỗ trợ kinh doanh",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tư vấn giải pháp và theo dõi cơ hội đến thương lượng, chốt bán và bàn giao.",
      "daily_tasks": [
        "Tìm hiểu nhu cầu",
        "Giới thiệu giải pháp",
        "Theo dõi báo giá và thương lượng",
        "Cập nhật cơ hội và bàn giao"
      ],
      "required_skills": [
        "Bán hàng tư vấn",
        "Đàm phán",
        "Theo dõi CRM"
      ],
      "common_tools": [
        "CRM (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Báo giá",
        "Báo cáo cơ hội và kết quả"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "District Sales Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_002",
        "SC_006"
      ],
      "search_aliases": [
        "Sales",
        "Bán hàng",
        "District Sales Executive"
      ],
      "role_slug": "sales",
      "industry_id": "OPS",
      "function_id": "ops_sales",
      "role_order": 4,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Bối cảnh dịch vụ logistics; nghề chung liên kết với Logistics Sales, không đếm hai case tương đương",
      "sources": [
        {
          "org": "Expeditors",
          "title": "District Sales Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/Expeditors/744000142802249-district-sales-executive"
        }
      ]
    },
    {
      "role_id": "OPS_006",
      "role_name": "Key Account Management",
      "role_name_vi": "Quản lý khách hàng trọng điểm",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Quản lý & Dịch vụ khách hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phụ trách nhóm khách hàng trọng điểm, đàm phán kế hoạch hợp tác và theo dõi kết quả kinh doanh.",
      "daily_tasks": [
        "Duy trì liên hệ với đầu mối của khách hàng hoặc chuỗi bán lẻ",
        "Đề xuất chương trình hợp tác, chiết khấu và điều kiện thương mại",
        "Theo dõi hợp đồng, giao hàng và xử lý phát sinh",
        "Phân tích doanh số, tồn kho và hiệu quả chương trình theo tài khoản"
      ],
      "required_skills": [
        "Quản lý tài khoản",
        "Đàm phán thương mại",
        "Phân tích doanh số",
        "Phối hợp bán hàng và cung ứng"
      ],
      "common_tools": [
        "Excel hoặc Google Sheets"
      ],
      "typical_outputs": [
        "Đề xuất hợp tác cho khách hàng",
        "Báo cáo hiệu quả từng tài khoản"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Key Account Executive (Modern Trade–HORECA–B2B)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Huyền Thoại Núi yêu cầu kinh nghiệm B2B hoặc Key Account; ưu tiên Modern Trade hoặc HORECA.",
      "related_role_ids": [
        "OPS_002",
        "MKT_008",
        "OPS_010",
        "FIN_007",
        "MKT_012"
      ],
      "search_aliases": [
        "KAE",
        "key account",
        "khách hàng trọng điểm",
        "modern trade",
        "HORECA",
        "Key Account Executive",
        "Key Account Management",
        "Quản lý khách hàng trọng điểm"
      ],
      "role_slug": "key-account-executive",
      "industry_id": "OPS",
      "function_id": "ops_accounts",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Huyền Thoại Núi",
          "title": "Key Account Executive (Modern Trade–HORECA–B2B)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/key-account-executive-modern-tradehorecab2b/2329807.html"
        }
      ]
    },
    {
      "role_id": "OPS_010",
      "role_name": "Customer Success",
      "role_name_vi": "Đồng hành cùng khách hàng",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Quản lý & Dịch vụ khách hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Giúp doanh nghiệp triển khai phần mềm, đưa người dùng vào vận hành và cải thiện hiệu quả sử dụng sau bàn giao.",
      "daily_tasks": [
        "Khảo sát nhu cầu và đề xuất cách triển khai",
        "Lập kế hoạch, theo dõi tiến độ và xử lý vấn đề dự án",
        "Đào tạo người dùng và chuẩn bị tài liệu hướng dẫn",
        "Theo dõi mức độ sử dụng và đề xuất cải thiện định kỳ"
      ],
      "required_skills": [
        "Khai thác nhu cầu khách hàng",
        "Quản lý triển khai",
        "Đào tạo người dùng",
        "Theo dõi mức độ sử dụng"
      ],
      "common_tools": [
        "Base.vn (nền tảng triển khai trong JD)"
      ],
      "typical_outputs": [
        "Kế hoạch triển khai",
        "Tài liệu hướng dẫn và báo cáo sử dụng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Customer Success Executive – Chuyên viên Triển khai Phần mềm (B2B SaaS)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Base Enterprise nêu 1–3 năm kinh nghiệm làm việc.",
      "related_role_ids": [
        "OPS_006",
        "OPS_011",
        "OPS_001",
        "OPS_012"
      ],
      "search_aliases": [
        "customer success",
        "CS",
        "SaaS onboarding",
        "triển khai phần mềm",
        "thành công khách hàng",
        "Customer Success Executive",
        "Đồng hành cùng khách hàng"
      ],
      "role_slug": "customer-success-executive",
      "industry_id": "OPS",
      "function_id": "ops_accounts",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Base Enterprise",
          "title": "Customer Success Executive – Chuyên viên Triển khai Phần mềm (B2B SaaS)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/customer-success-executive-chuyen-vien-trien-khai-phan-mem-b2b-saas/2204028.html"
        }
      ]
    },
    {
      "role_id": "OPS_012",
      "role_name": "Customer Service",
      "role_name_vi": "Dịch vụ khách hàng",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Quản lý & Dịch vụ khách hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tiếp nhận và xử lý yêu cầu dịch vụ, theo dõi phản hồi và chuyển cấp khi cần.",
      "daily_tasks": [
        "Tiếp nhận yêu cầu",
        "Tra cứu và phối hợp xử lý",
        "Cập nhật trạng thái",
        "Tổng hợp vấn đề lặp lại"
      ],
      "required_skills": [
        "Giao tiếp",
        "Xử lý vấn đề",
        "Theo dõi yêu cầu"
      ],
      "common_tools": [
        "Email",
        "Hệ thống hỗ trợ khách hàng (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Nhật ký yêu cầu",
        "Báo cáo chất lượng dịch vụ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Digital Customer Service Center Specialist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_010"
      ],
      "search_aliases": [
        "Customer Service",
        "Dịch vụ khách hàng",
        "Digital Customer Service Center Specialist"
      ],
      "role_slug": "customer-service",
      "industry_id": "OPS",
      "function_id": "ops_accounts",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Bosch",
          "title": "Digital Customer Service Center Specialist",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/BoschGroup/744000132129920-digital-customer-service-center-specialist-mobility-aftermarket-division-10-open-positions-"
        }
      ]
    },
    {
      "role_id": "OPS_003",
      "role_name": "Business Operations",
      "role_name_vi": "Vận hành doanh nghiệp",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Vận hành & Điều phối dự án",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi chất lượng vận hành, chuẩn hóa cách phối hợp và xử lý điểm nghẽn trong quy trình dịch vụ.",
      "daily_tasks": [
        "Rà soát điểm nghẽn trong quá trình triển khai và bàn giao",
        "Chuẩn hóa quy trình, checklist và biểu mẫu",
        "Theo dõi tiến độ, chất lượng và khối lượng công việc",
        "Tổng hợp dữ liệu và đề xuất cải tiến vận hành"
      ],
      "required_skills": [
        "Thiết kế quy trình",
        "Phân tích chỉ số vận hành",
        "Điều phối liên phòng ban",
        "Chuẩn hóa tài liệu"
      ],
      "common_tools": [
        "Excel",
        "Google Sheets",
        "Looker Studio hoặc Power BI"
      ],
      "typical_outputs": [
        "Báo cáo chỉ số vận hành",
        "Đề xuất cải tiến quy trình"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Business (Solution) Operations Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Base Enterprise nêu từ 1 năm kinh nghiệm vận hành hoặc phân tích nghiệp vụ.",
      "related_role_ids": [
        "FIN_001",
        "OPS_001",
        "OPS_002",
        "OPS_005",
        "FIN_012",
        "OPS_011"
      ],
      "search_aliases": [
        "bizops",
        "business operations",
        "vận hành kinh doanh",
        "SOP",
        "cải tiến quy trình",
        "Business Operations Executive",
        "Vận hành doanh nghiệp"
      ],
      "role_slug": "business-operations-executive",
      "industry_id": "OPS",
      "function_id": "ops_process",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Base Enterprise",
          "title": "Business (Solution) Operations Executive",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/business-solution-operations-executive/2330302.html"
        }
      ]
    },
    {
      "role_id": "OPS_011",
      "role_name": "IT Project Coordination",
      "role_name_vi": "Điều phối dự án CNTT",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Vận hành & Điều phối dự án",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi tiến độ, tổ chức trao đổi và hỗ trợ đội dự án CNTT kiểm soát các đầu việc đến lúc bàn giao.",
      "daily_tasks": [
        "Cập nhật lịch, mốc tiến độ và trạng thái đầu việc",
        "Tổ chức họp, ghi biên bản và theo dõi người phụ trách",
        "Ghi nhận vấn đề, rủi ro và phụ thuộc giữa các nhóm",
        "Tổng hợp báo cáo và quản lý hồ sơ bàn giao"
      ],
      "required_skills": [
        "Điều phối dự án",
        "Theo dõi tiến độ và rủi ro",
        "Viết biên bản và báo cáo",
        "Quản lý tài liệu"
      ],
      "common_tools": [
        "Excel",
        "PowerPoint",
        "Jira hoặc Confluence (ưu tiên theo nguồn)"
      ],
      "typical_outputs": [
        "Báo cáo tiến độ",
        "Biên bản họp và danh sách việc cần làm"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "IT Project Coordinator"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Tin tham chiếu gắn cấp Junior và mô tả công việc điều phối dự án CNTT.",
      "related_role_ids": [
        "OPS_003",
        "OPS_010",
        "OPS_001",
        "OPS_013"
      ],
      "search_aliases": [
        "project coordinator",
        "điều phối dự án",
        "PMO",
        "theo dõi tiến độ",
        "IT project",
        "IT Project Coordinator",
        "IT Project Coordination",
        "Điều phối dự án CNTT"
      ],
      "role_slug": "it-project-coordinator",
      "industry_id": "OPS",
      "function_id": "ops_process",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "FPT IS",
          "title": "IT Project Coordinator",
          "market": "Hà Nội",
          "type": "JD trích đăng trên TechJobs",
          "url": "https://techjobs.vn/companies/fpt-is/jobs/01000000-3331-fe30-879f-08df1f5cdbad"
        }
      ]
    },
    {
      "role_id": "OPS_013",
      "role_name": "Project Coordination",
      "role_name_vi": "Điều phối dự án",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Vận hành & Điều phối dự án",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi kế hoạch, tài liệu và phối hợp các bên để hỗ trợ bàn giao dự án.",
      "daily_tasks": [
        "Cập nhật tiến độ",
        "Chuẩn bị biên bản và tài liệu",
        "Theo dõi đầu việc/rủi ro",
        "Phối hợp bàn giao"
      ],
      "required_skills": [
        "Tổ chức công việc",
        "Theo dõi tiến độ",
        "Giao tiếp đa bên"
      ],
      "common_tools": [
        "Công cụ tài liệu và quản lý dự án (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bảng tiến độ",
        "Biên bản và checklist bàn giao"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Project Coordinator, Campus Development"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_011"
      ],
      "search_aliases": [
        "Project Coordination",
        "Điều phối dự án",
        "Project Coordinator, Campus Development"
      ],
      "role_slug": "project-coordination",
      "industry_id": "OPS",
      "function_id": "ops_process",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Bối cảnh dự án cơ sở vật chất; không coi yêu cầu chuyên ngành này là chuẩn mọi dự án",
      "sources": [
        {
          "org": "RMIT Vietnam",
          "title": "Project Coordinator, Campus Development",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://rmit.wd3.myworkdayjobs.com/en-US/RMIT_Careers/job/Ho-Chi-Minh-City/Project-Coordinator--Campus-Development_JR50762-1"
        }
      ]
    },
    {
      "role_id": "OPS_004",
      "role_name": "E-commerce Operations",
      "role_name_vi": "Vận hành thương mại điện tử",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Thương mại điện tử & Ngành hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Hỗ trợ vận hành gian hàng trực tuyến, xử lý dữ liệu sản phẩm, khuyến mãi và theo dõi đơn hàng.",
      "daily_tasks": [
        "Cập nhật danh mục, thông tin và hình ảnh sản phẩm",
        "Hỗ trợ thiết lập chương trình khuyến mãi trên sàn",
        "Theo dõi tồn kho hoặc tình trạng đơn hàng",
        "Tổng hợp chỉ số bán hàng và báo cáo vấn đề phát sinh"
      ],
      "required_skills": [
        "Vận hành gian hàng",
        "Kiểm tra dữ liệu sản phẩm",
        "Đọc chỉ số bán hàng",
        "Phối hợp xử lý đơn và tồn kho"
      ],
      "common_tools": [
        "Shopee",
        "TikTok Shop",
        "Lazada",
        "Excel",
        "Google Sheets"
      ],
      "typical_outputs": [
        "Checklist chuẩn bị chương trình trên sàn",
        "Báo cáo đơn hàng và vấn đề vận hành"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "E-commerce Operations Intern (Shopee/TikTok Shop)",
        "E-Commerce Operations Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD eGURU ghi không yêu cầu kinh nghiệm. UpBase xem kinh nghiệm thực tế là điểm cộng.",
      "related_role_ids": [
        "MKT_002",
        "MKT_003",
        "OPS_005",
        "OPS_015"
      ],
      "search_aliases": [
        "ecommerce",
        "e-commerce",
        "TMĐT",
        "vận hành sàn",
        "Shopee",
        "TikTok Shop",
        "thực tập vận hành",
        "E-commerce Operations Intern",
        "E-commerce Operations",
        "Vận hành thương mại điện tử"
      ],
      "role_slug": "e-commerce-operations-intern",
      "industry_id": "OPS",
      "function_id": "ops_ecommerce",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "UpBase",
          "title": "E-commerce Operations Intern (Shopee/TikTok Shop)",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/e-commerce-operations-intern-shopee-tiktok-shop-at-upbase-ai-data-ecommerce-partner-4488314596"
        },
        {
          "org": "AIRR Labs",
          "title": "E-Commerce Operations Intern",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/e-commerce-operations-intern-at-airr-labs-4311335701"
        },
        {
          "org": "eGURU",
          "title": "E-Commerce Operations Intern",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/e-commerce-operations-intern/2352966.html"
        }
      ]
    },
    {
      "role_id": "OPS_015",
      "role_name": "Category Management",
      "role_name_vi": "Quản lý ngành hàng",
      "industry_group": "Kinh doanh & Vận hành doanh nghiệp",
      "function": "Thương mại điện tử & Ngành hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi danh mục sản phẩm, đối tác và hiệu quả thương mại của một ngành hàng.",
      "daily_tasks": [
        "Phân tích danh mục và doanh số",
        "Theo dõi giá/khuyến mãi",
        "Phối hợp đối tác",
        "Đề xuất cải thiện danh mục"
      ],
      "required_skills": [
        "Phân tích bán hàng",
        "Điều phối thương mại",
        "Quản lý đối tác"
      ],
      "common_tools": [
        "Công cụ dữ liệu thương mại (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Báo cáo ngành hàng",
        "Đề xuất danh mục"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Group Brand Manager (Beauty Category) / E-commerce roles",
        "Category Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_004"
      ],
      "search_aliases": [
        "Category Management",
        "Quản lý ngành hàng",
        "Group Brand Manager (Beauty Category) / E-commerce roles"
      ],
      "role_slug": "category-management",
      "industry_id": "OPS",
      "function_id": "ops_ecommerce",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn chức danh Category Executive tại Việt Nam; cần phân biệt category development phía nhà sản xuất và merchandising phía nhà bán lẻ, không coi nhiệm vụ hoàn toàn đồng nhất.",
      "sources": [
        {
          "org": "Intrepid Asia",
          "title": "Group Brand Manager (Beauty Category) / E-commerce roles",
          "market": "Việt Nam",
          "type": "Trang nghề nghiệp doanh nghiệp",
          "url": "https://intrepid.asia/careers/"
        },
        {
          "org": "Nestlé",
          "title": "Category Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/category-executive-at-nestl%C3%A9-4432365776"
        },
        {
          "org": "Nestlé",
          "title": "Category Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/category-executive-at-nestl%C3%A9-4432365776"
        }
      ]
    },
    {
      "role_id": "OPS_005",
      "role_name": "Logistics Coordination",
      "role_name_vi": "Điều phối logistics",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Điều phối vận tải & Logistics",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Điều phối yêu cầu vận chuyển, theo dõi tiến độ và xử lý phát sinh để việc bàn giao đúng lịch.",
      "daily_tasks": [
        "Tiếp nhận yêu cầu vận chuyển và phân công tuyến hoặc tài xế",
        "Cập nhật lịch lấy hàng, địa chỉ và trạng thái vận chuyển",
        "Ghi nhận trễ hẹn, lỗi dữ liệu hoặc sự cố bàn giao",
        "Báo cáo tỷ lệ đúng giờ và đề xuất cải thiện"
      ],
      "required_skills": [
        "Điều phối tuyến và lịch",
        "Theo dõi tiến độ",
        "Xử lý sự cố",
        "Phân tích dữ liệu vận hành"
      ],
      "common_tools": [
        "Excel",
        "Google Sheets",
        "Hệ thống điều phối vận chuyển"
      ],
      "typical_outputs": [
        "Bảng theo dõi lô hàng",
        "Danh sách vấn đề giao nhận cần xử lý"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Logistics Coordinator / Điều Phối Vận Hành Logistics"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. DIAG nêu từ 3 năm kinh nghiệm trong logistics hoặc vận hành tương đương.",
      "related_role_ids": [
        "OPS_003",
        "OPS_004",
        "OPS_008",
        "OPS_009",
        "SC_002"
      ],
      "search_aliases": [
        "logistics",
        "dispatch",
        "điều phối vận tải",
        "điều phối giao hàng",
        "giao nhận",
        "Logistics Coordinator",
        "Logistics Coordination",
        "Điều phối logistics"
      ],
      "role_slug": "logistics-coordinator",
      "industry_id": "SC",
      "function_id": "sc_transport",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "DIAG",
          "title": "Logistics Coordinator / Điều Phối Vận Hành Logistics",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên JobOKO",
          "url": "https://vn.joboko.com/viec-lam-logistics-coordinator-dieu-phoi-van-hanh-logistics-xvi6827715"
        }
      ]
    },
    {
      "role_id": "OPS_008",
      "role_name": "Demand Planning",
      "role_name_vi": "Hoạch định nhu cầu",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Hoạch định nhu cầu & Cung ứng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Dự báo nhu cầu bán hàng theo danh mục và phối hợp với cung ứng để điều chỉnh kế hoạch.",
      "daily_tasks": [
        "Cập nhật dự báo nhu cầu theo kỳ và theo nhóm sản phẩm",
        "Điều chỉnh giả định cho khuyến mãi hoặc sản phẩm mới",
        "So sánh dự báo với doanh số thực tế và phân tích sai lệch",
        "Phối hợp họp kế hoạch bán hàng và cung ứng để xử lý chênh lệch"
      ],
      "required_skills": [
        "Dự báo nhu cầu",
        "Đo độ chính xác dự báo",
        "Phân tích biến động",
        "Phối hợp S&OP"
      ],
      "common_tools": [
        "Kinaxis",
        "Splanner"
      ],
      "typical_outputs": [
        "Bản dự báo nhu cầu",
        "Báo cáo độ chính xác và các giả định"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Skin Cleansing Vietnam Demand Planner"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Unilever mô tả vai trò chịu trách nhiệm dự báo danh mục và vận hành hệ thống hoạch định.",
      "related_role_ids": [
        "OPS_005",
        "OPS_009",
        "MKT_008",
        "SC_004"
      ],
      "search_aliases": [
        "demand planner",
        "demand planning",
        "hoạch định nhu cầu",
        "forecast",
        "S&OP"
      ],
      "role_slug": "demand-planner",
      "industry_id": "SC",
      "function_id": "sc_planning",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Unilever Việt Nam",
          "title": "Skin Cleansing Vietnam Demand Planner",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/skin-cleansing-vietnam-demand-planner-at-unilever-4425822248"
        }
      ]
    },
    {
      "role_id": "SC_004",
      "role_name": "Supply Planning",
      "role_name_vi": "Hoạch định cung ứng",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Hoạch định nhu cầu & Cung ứng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Chuyển nhu cầu thành kế hoạch cung ứng phù hợp năng lực, tồn kho và thời hạn.",
      "daily_tasks": [
        "Rà soát nhu cầu",
        "Lập kế hoạch vật tư/bổ sung",
        "Theo dõi lịch nhà cung cấp",
        "Điều chỉnh theo ràng buộc tồn kho"
      ],
      "required_skills": [
        "Hoạch định",
        "Phân tích tồn kho",
        "Phối hợp mua hàng và sản xuất"
      ],
      "common_tools": [
        "ERP",
        "Công cụ hoạch định (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Kế hoạch cung ứng",
        "Danh sách thiếu hụt"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Supply Chain Planner – Binh Duong"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "SC_003",
        "OPS_008",
        "SC_005"
      ],
      "search_aliases": [
        "Supply Planning",
        "Hoạch định cung ứng",
        "Supply Chain Planner – Binh Duong"
      ],
      "role_slug": "supply-planning",
      "industry_id": "SC",
      "function_id": "sc_planning",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "AB Agri",
          "title": "Supply Chain Planner – Binh Duong",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.abagri.com/popups/displayfile.aspx?StoredFilePathID=VvuXtNBJrivKQTj8OYAQWQ"
        }
      ]
    },
    {
      "role_id": "SC_005",
      "role_name": "Production & Material Planning",
      "role_name_vi": "Hoạch định sản xuất và vật tư",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Hoạch định nhu cầu & Cung ứng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Lập kế hoạch sản xuất và nhu cầu vật tư theo năng lực nhà máy và đơn hàng.",
      "daily_tasks": [
        "Theo dõi kế hoạch nhu cầu",
        "Cân đối năng lực/vật tư",
        "Cập nhật lịch sản xuất",
        "Phối hợp xử lý thiếu hụt"
      ],
      "required_skills": [
        "Hoạch định",
        "Phân tích dữ liệu",
        "Điều phối nhà máy"
      ],
      "common_tools": [
        "ERP/MRP (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Lịch sản xuất",
        "Kế hoạch vật tư"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Oral Vietnam Production Planner"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "SC_004"
      ],
      "search_aliases": [
        "Production & Material Planning",
        "Hoạch định sản xuất và vật tư",
        "Oral Vietnam Production Planner"
      ],
      "role_slug": "production-material-planning",
      "industry_id": "SC",
      "function_id": "sc_planning",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Unilever",
          "title": "Oral Vietnam Production Planner",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://unilever.wd3.myworkdayjobs.com/en-US/Unilever_Experienced_Professionals/job/Oral-Vietnam-Production-Planner_R-1183162"
        }
      ]
    },
    {
      "role_id": "OPS_009",
      "role_name": "Procurement",
      "role_name_vi": "Mua hàng",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Mua hàng",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Tổ chức mua hàng hóa hoặc dịch vụ theo yêu cầu về chất lượng, thời hạn và điều kiện thương mại.",
      "daily_tasks": [
        "Làm rõ yêu cầu mua hàng với bộ phận sử dụng",
        "Tìm nguồn, lấy báo giá và so sánh nhà cung cấp",
        "Thương lượng điều kiện và chuẩn bị hồ sơ mua",
        "Theo dõi thực hiện đơn hàng và phối hợp xử lý phát sinh"
      ],
      "required_skills": [
        "Tìm nguồn cung",
        "So sánh báo giá",
        "Đàm phán",
        "Quản lý tiến độ và hồ sơ mua"
      ],
      "common_tools": [],
      "typical_outputs": [
        "Bảng so sánh báo giá",
        "Hồ sơ đề xuất nhà cung cấp"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Chuyên viên Mua hàng (Procurement Executive)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD Elcom mô tả cấp chuyên viên mua từ nhà cung cấp trong và ngoài nước.",
      "related_role_ids": [
        "OPS_005",
        "OPS_008"
      ],
      "search_aliases": [
        "procurement",
        "purchasing",
        "buyer",
        "mua hàng",
        "thu mua",
        "RFQ",
        "Procurement Executive"
      ],
      "role_slug": "procurement-executive",
      "industry_id": "SC",
      "function_id": "sc_procurement",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Elcom",
          "title": "Chuyên viên Mua hàng (Procurement Executive)",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.elcom.com.vn/tuyen-dung/chuyen-vien-mua-hang-procurement-executive"
        }
      ]
    },
    {
      "role_id": "SC_001",
      "role_name": "Import–Export Documentation",
      "role_name_vi": "Chứng từ xuất nhập khẩu",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Xuất nhập khẩu & Giao nhận quốc tế",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Kiểm tra và phối hợp luân chuyển chứng từ cho các lô hàng xuất nhập khẩu.",
      "daily_tasks": [
        "Kiểm tra dữ liệu/chứng từ lô hàng",
        "Cập nhật hồ sơ",
        "Theo dõi mốc giao nhận",
        "Phối hợp các bên và chuyển cấp"
      ],
      "required_skills": [
        "Kiểm tra chứng từ",
        "Hiểu quy trình lô hàng",
        "Giao tiếp"
      ],
      "common_tools": [
        "Excel",
        "Hệ thống quản lý lô hàng (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Bộ hồ sơ lô hàng",
        "Bảng theo dõi chứng từ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Ocean Export Agent"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "SC_002"
      ],
      "search_aliases": [
        "Import–Export Documentation",
        "Chứng từ xuất nhập khẩu",
        "Ocean Export Agent"
      ],
      "role_slug": "import-export-documentation",
      "industry_id": "SC",
      "function_id": "sc_trade",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "JD forwarder xuất biển tại Hà Nội; phần chứng từ, không suy diễn nghiệp vụ tự khai hải quan",
      "sources": [
        {
          "org": "Expeditors",
          "title": "Ocean Export Agent",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/expeditors/744000161209238"
        }
      ]
    },
    {
      "role_id": "SC_002",
      "role_name": "Freight Forwarding Customer Service",
      "role_name_vi": "Dịch vụ khách hàng giao nhận quốc tế",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Xuất nhập khẩu & Giao nhận quốc tế",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Điều phối thông tin với khách hàng, hãng vận chuyển và đại lý trong quá trình giao nhận quốc tế.",
      "daily_tasks": [
        "Tiếp nhận yêu cầu lô hàng",
        "Theo dõi booking/lịch",
        "Thông báo trạng thái",
        "Phối hợp xử lý phát sinh"
      ],
      "required_skills": [
        "Giao tiếp quốc tế",
        "Theo dõi lô hàng",
        "Xử lý vấn đề"
      ],
      "common_tools": [
        "Email",
        "Hệ thống quản lý lô hàng"
      ],
      "typical_outputs": [
        "Thông báo lô hàng",
        "Nhật ký vấn đề"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Ocean Export Agent"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "SC_001",
        "OPS_005"
      ],
      "search_aliases": [
        "Freight Forwarding Customer Service",
        "Dịch vụ khách hàng giao nhận quốc tế",
        "Ocean Export Agent"
      ],
      "role_slug": "freight-forwarding-customer-service",
      "industry_id": "SC",
      "function_id": "sc_trade",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Cùng JD có cả chứng từ và CS; hai thẻ là hai trọng tâm, không tuyên bố doanh nghiệp nào cũng tách vị trí",
      "sources": [
        {
          "org": "Expeditors",
          "title": "Ocean Export Agent",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/expeditors/744000161209238"
        }
      ]
    },
    {
      "role_id": "SC_003",
      "role_name": "Warehouse & Inventory Operations",
      "role_name_vi": "Vận hành kho và tồn kho",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Kho & Tồn kho",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Theo dõi dữ liệu nhập, xuất và tồn để hỗ trợ vận hành kho chính xác.",
      "daily_tasks": [
        "Nhập dữ liệu đơn hàng",
        "Kiểm tra chứng từ kho",
        "Theo dõi xuất/nhập/tồn",
        "Đối chiếu và xử lý sai lệch"
      ],
      "required_skills": [
        "Kiểm tra dữ liệu",
        "Hiểu quy trình kho",
        "Điều phối"
      ],
      "common_tools": [
        "WMS (nhóm công cụ)",
        "Excel"
      ],
      "typical_outputs": [
        "Báo cáo tồn kho",
        "Danh sách chênh lệch"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Agent / Lead Agent - Distribution Warehouse"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "SC_004"
      ],
      "search_aliases": [
        "Warehouse & Inventory Operations",
        "Vận hành kho và tồn kho",
        "Agent / Lead Agent - Distribution Warehouse"
      ],
      "role_slug": "warehouse-inventory-operations",
      "industry_id": "SC",
      "function_id": "sc_warehouse",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Expeditors",
          "title": "Agent / Lead Agent - Distribution Warehouse",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/Expeditors/744000156461189-agent-lead-agent-distribution-warehouse"
        }
      ]
    },
    {
      "role_id": "SC_006",
      "role_name": "Logistics Sales",
      "role_name_vi": "Kinh doanh dịch vụ logistics",
      "industry_group": "Chuỗi cung ứng & Logistics",
      "function": "Kinh doanh dịch vụ logistics",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phát triển khách hàng và đề xuất dịch vụ vận chuyển/giao nhận phù hợp nhu cầu.",
      "daily_tasks": [
        "Tìm khách hàng",
        "Làm rõ tuyến và yêu cầu",
        "Phối hợp báo giá",
        "Theo dõi và bàn giao cơ hội"
      ],
      "required_skills": [
        "Bán hàng B2B",
        "Hiểu dịch vụ logistics",
        "Điều phối"
      ],
      "common_tools": [
        "CRM",
        "Email"
      ],
      "typical_outputs": [
        "Đề xuất dịch vụ",
        "Danh sách cơ hội"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "District Sales Executive"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_016"
      ],
      "search_aliases": [
        "Logistics Sales",
        "Kinh doanh dịch vụ logistics",
        "District Sales Executive"
      ],
      "role_slug": "logistics-sales",
      "industry_id": "SC",
      "function_id": "sc_commercial",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Việt Nam; theo bối cảnh JD tham khảo",
      "sources": [
        {
          "org": "Expeditors",
          "title": "District Sales Executive",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://jobs.smartrecruiters.com/Expeditors/744000142802249-district-sales-executive"
        }
      ]
    },
    {
      "role_id": "OPS_001",
      "role_name": "IT Business Analysis",
      "role_name_vi": "Phân tích nghiệp vụ phần mềm",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Phân tích nghiệp vụ & Hệ thống",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Chuyển nhu cầu kinh doanh thành quy trình, yêu cầu và tiêu chí để đội sản phẩm có thể xây và kiểm thử giải pháp.",
      "daily_tasks": [
        "Thu thập và làm rõ yêu cầu với các bên liên quan",
        "Vẽ quy trình và viết user story, tiêu chí nghiệm thu",
        "Phối hợp với thiết kế và phát triển để làm rõ giải pháp",
        "Hỗ trợ viết kịch bản kiểm thử và xác thực tính năng"
      ],
      "required_skills": [
        "Khai thác yêu cầu",
        "Mô hình hóa quy trình",
        "Viết đặc tả",
        "Phối hợp Product, Dev và QC"
      ],
      "common_tools": [
        "Draw.io",
        "Jira",
        "Confluence",
        "SQL cơ bản"
      ],
      "typical_outputs": [
        "Tài liệu yêu cầu nghiệp vụ",
        "Kịch bản kiểm thử chấp nhận người dùng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Junior Business Analyst",
        "Business Analyst Intern"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. TP Techlabs tuyển cấp Junior. JD tham chiếu dùng phạm vi BA sản phẩm phần mềm.",
      "related_role_ids": [
        "MKT_005",
        "OPS_002",
        "OPS_003",
        "OPS_010",
        "OPS_011",
        "DATA_005",
        "DATA_001",
        "DATA_004",
        "DATA_008"
      ],
      "search_aliases": [
        "BA",
        "junior BA",
        "business analyst",
        "phân tích nghiệp vụ",
        "business requirements",
        "IT Business Analyst",
        "Junior Business Analyst",
        "IT Business Analysis",
        "Phân tích nghiệp vụ phần mềm"
      ],
      "role_slug": "junior-business-analyst",
      "industry_id": "DATA",
      "function_id": "data_systems",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "TP Techlabs",
          "title": "Junior Business Analyst",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tp.com.vn/recruitment/junior-business-analyst/"
        },
        {
          "org": "Cốc Cốc",
          "title": "Business Analyst Intern",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.coccoc.com/jobs/business-analyst-intern-2"
        }
      ]
    },
    {
      "role_id": "DATA_005",
      "role_name": "Systems Analysis",
      "role_name_vi": "Phân tích hệ thống",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Phân tích nghiệp vụ & Hệ thống",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Làm rõ hệ thống cần hoạt động thế nào, mô tả luồng dữ liệu và tích hợp để đội kỹ thuật triển khai.",
      "daily_tasks": [
        "Làm rõ yêu cầu và luồng xử lý hệ thống",
        "Mô tả dữ liệu, tích hợp và trường hợp ngoại lệ",
        "Phân tích tác động thay đổi cùng đội kỹ thuật",
        "Chuẩn bị tiêu chí chấp nhận và hỗ trợ UAT"
      ],
      "required_skills": [
        "Phân tích yêu cầu hệ thống",
        "Mô hình hóa luồng dữ liệu và xử lý",
        "Hiểu tích hợp API theo bối cảnh",
        "Phối hợp kiểm thử và viết tài liệu"
      ],
      "common_tools": [
        "SQL (theo JD Home Credit)",
        "Công cụ mô hình hóa và tài liệu hệ thống (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Tài liệu đặc tả hệ thống",
        "Bảng phân tích tác động và kịch bản UAT"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Senior UW System Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Nguồn Home Credit là vị trí Senior chuyên hệ thống thẩm định, nêu khoảng 3–5 năm kinh nghiệm kỹ thuật.",
      "related_role_ids": [
        "OPS_001",
        "DATA_003"
      ],
      "search_aliases": [
        "system analyst",
        "SA",
        "phân tích hệ thống",
        "API",
        "system design",
        "UAT",
        "Systems Analysis"
      ],
      "role_slug": "system-analyst",
      "industry_id": "DATA",
      "function_id": "data_systems",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "JD Senior UW System Analyst tại Home Credit mang bối cảnh underwriting. Tách nhiệm vụ phân tích hệ thống khỏi yêu cầu dẫn dắt giải pháp và kiến trúc cấp Senior.",
      "sources": [
        {
          "org": "Home Credit Việt Nam",
          "title": "Senior UW System Analyst",
          "market": "TP.HCM",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://career.homecredit.vn/en/job/senior-uw-system-analyst/"
        }
      ]
    },
    {
      "role_id": "DATA_001",
      "role_name": "Data Analysis",
      "role_name_vi": "Phân tích dữ liệu",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Phân tích dữ liệu, BI & Sản phẩm",
      "simulation_status": "available",
      "mission_id": "MISSION_005",
      "role_description": "Chuyển câu hỏi nghiệp vụ thành phân tích dữ liệu để giải thích xu hướng, biến động và đưa ra đề xuất.",
      "daily_tasks": [
        "Thống nhất câu hỏi phân tích và định nghĩa chỉ tiêu",
        "Truy vấn, làm sạch và kiểm tra độ chính xác của dữ liệu",
        "Phân tích xu hướng, phân nhóm hoặc nguyên nhân biến động",
        "Trình bày kết quả bằng biểu đồ, báo cáo và khuyến nghị"
      ],
      "required_skills": [
        "SQL và xử lý dữ liệu",
        "Thống kê mô tả",
        "Trực quan hóa",
        "Diễn giải và trình bày phát hiện"
      ],
      "common_tools": [
        "SQL",
        "Python hoặc R",
        "Power BI hoặc Tableau"
      ],
      "typical_outputs": [
        "Bản phân tích chỉ tiêu",
        "Báo cáo xu hướng và khuyến nghị"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Data Analyst (Middle/Senior)",
        "Data Analyst (Junior/Middle)",
        "Fresher / Intern Data Analysts - Financial Services"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. CMC TS nêu tối thiểu 2–3 năm ở JD Middle/Senior. JD Matechmobile có nhãn Junior/Middle và nêu tối thiểu 2 năm.",
      "related_role_ids": [
        "DATA_002",
        "DATA_004",
        "OPS_001",
        "MKT_007",
        "MKT_009",
        "FIN_008",
        "HR_014"
      ],
      "search_aliases": [
        "DA",
        "data analytics",
        "phân tích dữ liệu",
        "data analyst",
        "dashboard",
        "SQL",
        "Data Analysis"
      ],
      "role_slug": "data-analyst",
      "industry_id": "DATA",
      "function_id": "data_analysis",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "CMC TS",
          "title": "Data Analyst (Middle/Senior)",
          "market": "Hà Nội",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://careers.cmcts.com.vn/job/hn-data-analyst-middlesenior-5706"
        },
        {
          "org": "Matechmobile",
          "title": "Data Analyst (Junior/Middle)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp trên TopCV",
          "url": "https://www.topcv.vn/viec-lam/data-analyst-junior-middle-mobile-app-sql-power-bi-1225-trieu/1305294.html"
        },
        {
          "org": "EY",
          "title": "Fresher / Intern Data Analysts - Financial Services",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.ey.com/ey/job/Ha-Noi-Fresher-Intern-Data-Analysts-Financial-Services-Hanoi-Office/1369497533"
        }
      ]
    },
    {
      "role_id": "DATA_002",
      "role_name": "Business Intelligence",
      "role_name_vi": "Phân tích và báo cáo BI",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Phân tích dữ liệu, BI & Sản phẩm",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Biến chỉ số kinh doanh thành dashboard và báo cáo có thể theo dõi lặp lại với số liệu nhất quán.",
      "daily_tasks": [
        "Làm rõ nhu cầu báo cáo và định nghĩa KPI",
        "Truy vấn, kết hợp và kiểm tra dữ liệu từ nhiều bảng",
        "Xây dashboard và báo cáo định kỳ cho người dùng nghiệp vụ",
        "Theo dõi tính nhất quán số liệu và giải thích biến động chính"
      ],
      "required_skills": [
        "SQL và xử lý dữ liệu",
        "Tư duy kho dữ liệu",
        "Thiết kế dashboard",
        "Kiểm tra tính chính xác"
      ],
      "common_tools": [
        "SQL",
        "Python (pandas, NumPy)",
        "Metabase hoặc Tableau hoặc Power BI"
      ],
      "typical_outputs": [
        "Dashboard KPI",
        "Danh mục định nghĩa chỉ tiêu và báo cáo định kỳ"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Business Intelligence Analyst, Zalo Business Solutions"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Zalo Business Solutions yêu cầu tối thiểu 2 năm ở vai trò phân tích liên quan.",
      "related_role_ids": [
        "DATA_001",
        "DATA_003",
        "DATA_007"
      ],
      "search_aliases": [
        "BI",
        "business intelligence",
        "BI analyst",
        "Power BI",
        "dashboard",
        "báo cáo quản trị",
        "Business Intelligence Analyst",
        "Phân tích và báo cáo BI"
      ],
      "role_slug": "business-intelligence-analyst",
      "industry_id": "DATA",
      "function_id": "data_analysis",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "DA và BI có thể chồng lấn. Phân loại theo trọng tâm phân tích và hệ thống báo cáo, không coi là hai phạm vi loại trừ.",
      "sources": [
        {
          "org": "Zalo",
          "title": "Business Intelligence Analyst, Zalo Business Solutions",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://www.zalo.careers/job/business-intelligence-analyst-zalo-business-solutions-n-YHMiJ8Mrn4W_abqr"
        }
      ]
    },
    {
      "role_id": "DATA_004",
      "role_name": "Product Analytics",
      "role_name_vi": "Phân tích sản phẩm",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Phân tích dữ liệu, BI & Sản phẩm",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phân tích cách người dùng đi qua luồng sản phẩm và đánh giá thay đổi để cân bằng kết quả nghiệp vụ với trải nghiệm.",
      "daily_tasks": [
        "Xác định sự kiện và chỉ số cần theo dõi theo luồng",
        "Phân tích dữ liệu để tìm nguyên nhân hoặc điểm gây trở ngại",
        "Đề xuất thay đổi và cách đo hiệu quả",
        "Đánh giá thử nghiệm hoặc quy tắc mới rồi cập nhật đề xuất"
      ],
      "required_skills": [
        "SQL và kiểm tra dữ liệu",
        "Phân tích nguyên nhân",
        "Thiết kế thử nghiệm",
        "Đọc luồng trải nghiệm người dùng"
      ],
      "common_tools": [
        "SQL",
        "Công cụ đo lường thử nghiệm (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Báo cáo phân tích luồng",
        "Đề xuất thay đổi và kết quả thử nghiệm"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Product Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD MoMo mô tả Product Analyst trong phạm vi an toàn giao dịch và chống gian lận.",
      "related_role_ids": [
        "DATA_001",
        "MKT_005",
        "OPS_001",
        "MKT_011",
        "DATA_006",
        "DATA_010"
      ],
      "search_aliases": [
        "product analyst",
        "product analytics",
        "phân tích sản phẩm",
        "funnel",
        "A/B testing"
      ],
      "role_slug": "product-analyst",
      "industry_id": "DATA",
      "function_id": "data_analysis",
      "role_order": 3,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn Product Analyst tại MoMo mang bối cảnh fraud/giao dịch; không đại diện toàn bộ sản phẩm số.",
      "sources": [
        {
          "org": "MoMo",
          "title": "Product Analyst",
          "market": "TP.HCM",
          "type": "JD doanh nghiệp trên LinkedIn",
          "url": "https://vn.linkedin.com/jobs/view/product-analyst-at-momo-m-service-4348204190"
        }
      ]
    },
    {
      "role_id": "DATA_003",
      "role_name": "Data Engineering",
      "role_name_vi": "Kỹ thuật dữ liệu",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Kỹ thuật & Quản trị dữ liệu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Xây dựng các luồng thu thập, biến đổi và lưu trữ dữ liệu để các nhóm phân tích có nguồn sử dụng ổn định.",
      "daily_tasks": [
        "Tích hợp dữ liệu từ các hệ thống nguồn",
        "Thiết kế và triển khai luồng ETL để chuẩn hóa dữ liệu",
        "Kiểm tra chất lượng dữ liệu và xử lý sự cố luồng chạy",
        "Cập nhật tài liệu dữ liệu và phối hợp với nhóm phân tích hoặc khoa học dữ liệu"
      ],
      "required_skills": [
        "SQL",
        "Thiết kế luồng ETL",
        "Mô hình hóa dữ liệu",
        "Kiểm thử và xử lý sự cố"
      ],
      "common_tools": [
        "SQL",
        "Python",
        "Công cụ ETL (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Luồng ETL",
        "Tài liệu mô hình và kiểm tra chất lượng dữ liệu"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Data Engineer",
        "Intern / Trainee - Data Engineer"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Viettel IDC mô tả vai trò phát triển giải pháp dữ liệu. JD TC Data cho thấy có lối vào Intern/Trainee ở một doanh nghiệp khác.",
      "related_role_ids": [
        "DATA_002",
        "DATA_006",
        "DATA_007",
        "DATA_005"
      ],
      "search_aliases": [
        "DE",
        "data engineer",
        "ETL",
        "pipeline",
        "kỹ sư dữ liệu",
        "kho dữ liệu",
        "Data Engineering",
        "Kỹ thuật dữ liệu"
      ],
      "role_slug": "data-engineer",
      "industry_id": "DATA",
      "function_id": "data_platform",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "Viettel IDC",
          "title": "Data Engineer",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tuyendung.viettelidc.com.vn/viec-lam/data-engineer.35abfacf.html"
        },
        {
          "org": "TC Data",
          "title": "Intern / Trainee - Data Engineer",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://tcdata.vn/career/intern-trainee-data-engineer/"
        }
      ]
    },
    {
      "role_id": "DATA_007",
      "role_name": "Data Governance",
      "role_name_vi": "Quản trị dữ liệu",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Kỹ thuật & Quản trị dữ liệu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Thiết lập quy tắc, định nghĩa và trách nhiệm để dữ liệu được hiểu, kiểm soát và sử dụng nhất quán.",
      "daily_tasks": [
        "Xây dựng quy tắc quản trị và chất lượng dữ liệu",
        "Cập nhật danh mục, thuật ngữ và luồng truy xuất nguồn gốc",
        "Phân tích lỗi chất lượng và phối hợp đơn vị xử lý",
        "Theo dõi khắc phục và hỗ trợ các nhóm áp dụng tiêu chuẩn"
      ],
      "required_skills": [
        "Quản lý metadata",
        "Thiết kế quy tắc chất lượng",
        "Phân tích nguyên nhân lỗi",
        "Điều phối Data Owner và Data Steward"
      ],
      "common_tools": [
        "SQL",
        "Oracle (lợi thế theo JD)",
        "Hệ thống Data Catalog (nhóm công cụ)"
      ],
      "typical_outputs": [
        "Danh mục và thuật ngữ dữ liệu",
        "Bộ quy tắc chất lượng và danh sách lỗi"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Data Governance (Middle, Senior) / Quản trị Dữ liệu"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD GPBank cấp Middle/Senior nêu 3–5 năm trong lĩnh vực dữ liệu.",
      "related_role_ids": [
        "DATA_002",
        "DATA_003",
        "HR_007",
        "DATA_009"
      ],
      "search_aliases": [
        "data governance",
        "data quality",
        "data catalog",
        "metadata",
        "quản trị dữ liệu",
        "lineage",
        "Data Governance Specialist"
      ],
      "role_slug": "data-governance-specialist",
      "industry_id": "DATA",
      "function_id": "data_platform",
      "role_order": 2,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "GPBank",
          "title": "Data Governance (Middle, Senior) / Quản trị Dữ liệu",
          "market": "Việt Nam",
          "type": "JD ngân hàng trên U&Bank",
          "url": "https://ub.edu.vn/tuyen-dung-ngan-hang/data-govermance-middle-seniorquan-tri-du-lieu-gpbank-16022"
        }
      ]
    },
    {
      "role_id": "DATA_009",
      "role_name": "Data Quality Analysis",
      "role_name_vi": "Phân tích chất lượng dữ liệu",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Kỹ thuật & Quản trị dữ liệu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Phát hiện và theo dõi lỗi dữ liệu để dữ liệu đáp ứng quy tắc chất lượng đã thống nhất.",
      "daily_tasks": [
        "Xây quy tắc kiểm tra",
        "Phân tích lỗi/chênh lệch",
        "Phối hợp khắc phục",
        "Duy trì báo cáo chất lượng"
      ],
      "required_skills": [
        "SQL",
        "Phân tích nguyên nhân",
        "Tài liệu hóa"
      ],
      "common_tools": [
        "SQL",
        "Python/R (ví dụ theo JD)"
      ],
      "typical_outputs": [
        "Bộ quy tắc chất lượng",
        "Báo cáo lỗi dữ liệu"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Senior Data Quality Analyst"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "DATA_007"
      ],
      "search_aliases": [
        "Data Quality Analysis",
        "Phân tích chất lượng dữ liệu",
        "Senior Data Quality Analyst"
      ],
      "role_slug": "data-quality-analysis",
      "industry_id": "DATA",
      "function_id": "data_platform",
      "role_order": 3,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn Senior tối thiểu 3 năm; không xác nhận lối vào Intern",
      "sources": [
        {
          "org": "Techcombank",
          "title": "Senior Data Quality Analyst",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://vn.linkedin.com/jobs/view/senior-data-quality-analyst-at-techcombank-tcb-4320401482"
        }
      ]
    },
    {
      "role_id": "DATA_006",
      "role_name": "Data Science",
      "role_name_vi": "Khoa học dữ liệu",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Khoa học dữ liệu",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Xây dựng và đánh giá mô hình học máy để giải quyết bài toán dự báo, phân loại hoặc tự động hóa.",
      "daily_tasks": [
        "Làm rõ bài toán và thước đo chất lượng mô hình",
        "Chuẩn bị dữ liệu, thử nghiệm và so sánh mô hình",
        "Đánh giá kết quả trên dữ liệu kiểm tra và phân tích lỗi",
        "Phối hợp triển khai, theo dõi chất lượng và cải tiến"
      ],
      "required_skills": [
        "Thống kê và học máy",
        "Thiết kế thử nghiệm",
        "Đánh giá mô hình",
        "Lập trình xử lý dữ liệu"
      ],
      "common_tools": [
        "Python hoặc R",
        "TensorFlow hoặc PyTorch"
      ],
      "typical_outputs": [
        "Báo cáo thử nghiệm mô hình",
        "Phân tích lỗi và kế hoạch theo dõi chất lượng"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Data Scientist"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. JD VIB nêu mốc từ 3 năm cho cấp chuyên viên và mức cao hơn cho vai trò cấp cao.",
      "related_role_ids": [
        "DATA_003",
        "DATA_004",
        "FIN_008"
      ],
      "search_aliases": [
        "DS",
        "data science",
        "machine learning",
        "khoa học dữ liệu",
        "ML",
        "mô hình dự báo",
        "Data Scientist"
      ],
      "role_slug": "data-scientist",
      "industry_id": "DATA",
      "function_id": "data_model",
      "role_order": 1,
      "content_basis": "inherited_jd",
      "publication_status": "ready_for_review",
      "review_note": "Tên nghề là nhãn biên tập; chức danh và yêu cầu cụ thể lưu ở Sources.",
      "sources": [
        {
          "org": "VIB",
          "title": "Data Scientist",
          "market": "Việt Nam",
          "type": "Trang tuyển dụng doanh nghiệp",
          "url": "https://careers.vib.com.vn/careers/job/33924"
        }
      ]
    },
    {
      "role_id": "DATA_008",
      "role_name": "ERP Functional Consulting",
      "role_name_vi": "Tư vấn nghiệp vụ ERP",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Hệ thống doanh nghiệp & Vận hành sản phẩm",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Chuyển yêu cầu quy trình kinh doanh thành cấu hình và giải pháp nghiệp vụ ERP.",
      "daily_tasks": [
        "Thu thập yêu cầu quy trình",
        "Phân tích phù hợp/khoảng trống",
        "Hỗ trợ cấu hình và kiểm thử",
        "Chuẩn bị hướng dẫn người dùng"
      ],
      "required_skills": [
        "Phân tích quy trình",
        "Hiểu phân hệ ERP",
        "Tài liệu hóa và kiểm thử"
      ],
      "common_tools": [
        "SAP theo phân hệ (ví dụ)"
      ],
      "typical_outputs": [
        "Tài liệu nghiệp vụ",
        "Kịch bản UAT và hướng dẫn"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "SAP Functional Consultant (FICO / MM / SD / PP)"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "OPS_001"
      ],
      "search_aliases": [
        "ERP Functional Consulting",
        "Tư vấn nghiệp vụ ERP",
        "SAP Functional Consultant (FICO / MM / SD / PP)"
      ],
      "role_slug": "erp-functional-consulting",
      "industry_id": "DATA",
      "function_id": "data_enterprise",
      "role_order": 1,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Bối cảnh SAP; không quy mọi ERP đều yêu cầu cùng phân hệ hoặc cấp độ",
      "sources": [
        {
          "org": "EY",
          "title": "SAP Functional Consultant (FICO / MM / SD / PP)",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://careers.ey.com/ey/job/Ho-Chi-Minh-City-SAP-Functional-Consultant-%28FICO-MM-SD-PP%29-HCMC-Office/1376804833/"
        }
      ]
    },
    {
      "role_id": "DATA_010",
      "role_name": "Product Operations",
      "role_name_vi": "Vận hành sản phẩm số",
      "industry_group": "Dữ liệu & Phân tích nghiệp vụ",
      "function": "Hệ thống doanh nghiệp & Vận hành sản phẩm",
      "simulation_status": "not_available",
      "mission_id": null,
      "role_description": "Vận hành quy trình, dữ liệu và phối hợp các đội để sản phẩm số hoạt động hiệu quả.",
      "daily_tasks": [
        "Chuẩn hóa SOP",
        "Tổng hợp phản hồi và chỉ số",
        "Phối hợp thay đổi sản phẩm",
        "Theo dõi vấn đề và chuyển cấp"
      ],
      "required_skills": [
        "Phân tích vận hành",
        "Thiết kế quy trình",
        "Phối hợp kỹ thuật"
      ],
      "common_tools": [
        "Excel",
        "SQL",
        "Công cụ BI (nhóm công cụ)"
      ],
      "typical_outputs": [
        "SOP vận hành",
        "Dashboard và danh sách vấn đề"
      ],
      "experience_level": "varies_by_jd",
      "reference_titles": [
        "Product Operations Specialist, Media"
      ],
      "experience_note": "Các JD tham khảo có thể khác cấp độ. Yêu cầu kinh nghiệm theo JD/nguồn; không tự suy diễn Intern hoặc Junior.",
      "related_role_ids": [
        "DATA_004"
      ],
      "search_aliases": [
        "Product Operations",
        "Vận hành sản phẩm số",
        "Product Operations Specialist, Media"
      ],
      "role_slug": "product-operations",
      "industry_id": "DATA",
      "function_id": "data_enterprise",
      "role_order": 2,
      "content_basis": "reviewed_jd",
      "publication_status": "ready_for_review",
      "review_note": "Nguồn về safety operations, yêu cầu từ 2 năm; chỉ tổng hợp nhiệm vụ vận hành, không coi là Product Manager",
      "sources": [
        {
          "org": "Zalo",
          "title": "Product Operations Specialist, Media",
          "market": "Việt Nam",
          "type": "JD doanh nghiệp",
          "url": "https://www.zalo.careers/job/product-operations-specialist-media-n-h82N7_f6GITa_kS1"
        }
      ]
    }
  ]
};
