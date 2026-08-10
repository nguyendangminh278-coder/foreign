window.IELTS_COURSE = {
  sourceFiles: [
    "Reading_ True _ False _ Not Given.docx",
    "Reading_ Gap-Filling.docx",
    "Quy trình làm reading.docx",
    "Kiến thức writing task 1.docx",
    "Writting task 2.docx",
    "Writting task 2 (2).docx",
    "Writting task 2 (3).docx",
  ],
  modules: [
    { id: "reading", tab: "en-reading", number: "01", title: "Quy trình Reading", summary: "Đọc Passage 1–2 theo thành tố, mạch ý và thứ tự câu hỏi.", icon: "scan-search" },
    { id: "tfng", tab: "en-tfng", number: "02", title: "True / False / Not Given", summary: "Bắt mạch, nối dữ kiện và phân biệt ba loại đáp án.", icon: "list-checks" },
    { id: "gap", tab: "en-gap", number: "03", title: "Gap-filling", summary: "Xác định động từ chính, từ trung tâm và kiểu biến đổi câu.", icon: "text-cursor-input" },
    { id: "task1", tab: "en-task1", number: "04", title: "Writing Task 1", summary: "Biểu đồ thay đổi, biểu đồ tĩnh, map và process.", icon: "chart-no-axes-combined" },
    { id: "task2", tab: "en-task2", number: "05", title: "Writing Task 2", summary: "Mở bài, tìm ý, triển khai thân bài và kết luận.", icon: "notebook-pen" },
  ],
  assessment: [
    { code: "TA/TR", title: "Task Achievement / Response", text: "Trả lời đúng và đủ yêu cầu của đề." },
    { code: "CC", title: "Coherence & Cohesion", text: "Tổ chức ý mạch lạc, liên kết hợp lý." },
    { code: "LR", title: "Lexical Resource", text: "Paraphrase đúng nghĩa và dùng từ theo chủ đề." },
    { code: "GRA", title: "Grammatical Range & Accuracy", text: "Dùng cấu trúc đa dạng và kiểm soát lỗi ngữ pháp." },
  ],
  readingProcess: {
    passage1: [
      { title: "Xé câu hỏi", text: "Lấy câu đầu của hai dạng bài trong Passage 1, gạch các thành tố quan trọng." },
      { title: "Đọc đoạn 1 và đối chiếu", text: "Nếu một đoạn chứa ít nhất hai thành tố của câu hỏi, ưu tiên tìm dữ kiện trả lời tại đoạn đó." },
      { title: "Mở thêm câu hỏi", text: "Trả lời được câu nào thì mở ngay câu tiếp theo; chỉ chuyển đoạn khi cả hai dạng đều chưa thể trả lời." },
    ],
    passage2: [
      { title: "Ý nằm ở đoạn nào / Heading", order: "Không theo thứ tự", text: "Note ít nhất hai thành tố, sau đó đọc tuần tự từng đoạn để tìm nơi chúng cùng xuất hiện." },
      { title: "Tên riêng nối với ý nào", order: "Không theo thứ tự", text: "Quét tên riêng trước vì đây là dấu mốc dễ định vị nhất." },
      { title: "Điền từ", order: "Theo thứ tự", text: "Bắt đầu từ câu đầu tiên, ưu tiên danh từ rồi mới tới tính từ, trạng từ/cụm từ và động từ." },
    ],
    elementPriority: ["Danh từ", "Tính từ", "Trạng từ / cụm trạng ngữ", "Động từ"],
    reduceNoise: [
      "Tạm bỏ mệnh đề quan hệ để hai thành tố chính đứng gần nhau hơn.",
      "Tạm bỏ động từ nối “be/là” khi chỉ cần nhìn quan hệ giữa hai danh từ.",
      "Tách ví dụ sau such as, like, including, namely, e.g. khỏi ý khái quát.",
    ],
    trackingSignals: [
      { signal: "this / that / these / those", use: "Thường trỏ về ý ngay câu trước hoặc rất gần đó." },
      { signal: "the", use: "Đối tượng đã được nhắc trước; nên nhìn ngược lên." },
      { signal: "a / an", use: "Đối tượng mới được giới thiệu; thường cần đọc tiếp xuống." },
      { signal: "he / she / it / they", use: "Nối đại từ về đúng người, vật hoặc nhóm đã xuất hiện." },
    ],
    fallback: "Nếu thiếu một thành tố, kiểm tra tối đa hai câu quanh câu chứa nhiều thành tố nhất trước khi mở rộng vùng tìm kiếm.",
  },
  tfng: {
    flowPatterns: [
      { title: "Giữ mạch", text: "Câu sau nhắc lại sự vật ở câu trước và giữ loại từ; thường đi từ khái quát tới cụ thể.", example: "Nhiều người bị béo phì. Tùng nặng 200 kg." },
      { title: "Đảo mạch", text: "Câu sau tiếp tục cùng sự vật nhưng đổi vai trò hoặc loại từ.", example: "Tùng ăn một cái bánh. Cái bánh này đã mốc." },
    ],
    decisions: [
      { answer: "TRUE", tone: "true", text: "Bài đọc xác nhận cùng ý; từ khóa có thể được paraphrase." },
      { answer: "FALSE", tone: "false", text: "Bài đọc đưa thông tin đối lập hoặc phủ định trực tiếp câu hỏi." },
      { answer: "NOT GIVEN", tone: "unknown", text: "Không đủ dữ kiện để nối tất cả thành tố; không tự suy diễn." },
    ],
    taskTypes: [
      { title: "Dữ kiện trong một câu", note: "Dễ định vị nhưng thường có một thành tố trong câu hỏi cần kiểm tra bằng paraphrase.", patterns: ["Ví dụ/liệt kê: such as, like, namely, including, e.g.", "Câu ghép hỗ trợ nguyên nhân–kết quả: because, so.", "Câu ghép nhượng bộ/đối lập: although, but.", "Mệnh đề quan hệ: who, which, that."] },
      { title: "Dữ kiện ở nhiều câu", note: "Phải lần theo mạch tuyến tính và tham chiếu giữa các câu.", patterns: ["Tìm chỉ từ, đại từ và mạo từ.", "Tóm tắt mỗi câu thành cụm danh từ ngắn.", "Ghi quan hệ dạng: người = đặc điểm; vật = giá/địa điểm/chức năng."] },
    ],
    checklist: ["Gạch ít nhất hai thành tố của câu hỏi.", "Tìm câu chứa nhiều thành tố nhất.", "Nối các câu bằng đại từ, mạo từ và từ đồng nghĩa.", "Chỉ chọn False khi có ý đối lập rõ; thiếu dữ kiện là Not Given."],
  },
  gapFilling: {
    mainVerbSignals: ["have / has / had + past participle → thì hoàn thành", "be + V-ing → thì tiếp diễn", "V-s/es → hiện tại đơn với chủ ngữ số ít", "V-ed → quá khứ đơn hoặc phân từ; kiểm tra tân ngữ để nhận diện bị động", "Modal verbs: can, could, may, might, should, would, will", "Liên từ nối mệnh đề: and, but, or, because, when…"],
    exclusions: ["Sau đại từ quan hệ who / which / that, động từ có thể thuộc mệnh đề phụ.", "Sau từ để hỏi what / where / when, phần sau có thể là cụm danh từ câu hỏi.", "to + verb thường là cụm chỉ mục đích, không phải động từ chính của toàn câu."],
    coreSteps: [
      { title: "Xác định hai vế quanh động từ chính", text: "Đảm bảo vế đang xét không phải cụm V-ing chỉ “việc” hoặc mệnh đề bắt đầu bằng từ để hỏi." },
      { title: "Tìm “hột” — từ trung tâm", text: "Giả định từ cuối của vế là trung tâm rồi kiểm tra các thành phần đứng trước đang bổ nghĩa cho nó theo cách nào." },
      { title: "Kiểm tra lớp bảo vệ", text: "Giới từ → trạng ngữ; to + verb → mục đích; V-ing → mệnh đề quan hệ rút gọn; dấu phẩy/gạch ngang/hai chấm → phần chú thích." },
    ],
    mappings: [
      { title: "Xuôi", text: "Thành tố trong câu gốc và câu hỏi giữ cùng trật tự quanh động từ.", example: "Tùng mặc áo đỏ → người đàn ông khoác lên xiêm y đỏ." },
      { title: "Đầu–đít", text: "Câu hỏi đảo chủ động/bị động hoặc đảo trật tự thành tố so với câu gốc.", example: "Tùng mặc áo đỏ → chiếc áo đỏ được mặc bởi người đàn ông." },
      { title: "Biến đổi bổ nghĩa", text: "Tính từ, cụm of và mệnh đề có thể chuyển đổi mà không đổi nghĩa.", example: "a big boat ↔ a boat of a large size" },
      { title: "Hòa hợp số", text: "Nếu chỗ trống là danh từ trung tâm của chủ ngữ, nhìn động từ để đoán số ít/số nhiều và đếm được/không đếm được." },
    ],
    transformations: ["that type of food ↔ food of that type", "a big boat ↔ a boat of a large size", "a book about a student ↔ a book telling the story of a student", "a large dog ↔ the dog is large"],
  },
  writingTask1: {
    structure: [
      { part: "Introduction", text: "Paraphrase loại biểu đồ/sơ đồ, chỉ số chính, đối tượng, địa điểm và thời gian." },
      { part: "Overview", text: "Nêu 2–3 đặc điểm nổi bật nhất; đây là phần quan trọng nhất và không đưa số liệu vụn." },
      { part: "Body 1–2", text: "Chia nhóm hợp lý, so sánh và đưa số liệu chọn lọc." },
      { part: "Conclusion", text: "Không cần kết bài riêng cho IELTS Academic Writing Task 1." },
    ],
    introFormula: "The [line/bar/pie] chart / table gives information about + cụm danh từ câu hỏi + địa điểm + thời gian, measured in + đơn vị.",
    questionNouns: [
      { label: "Đếm được", formula: "how many + plural noun + verb", noun: "the number of…" },
      { label: "Không đếm được", formula: "how much + uncountable noun + verb", noun: "the amount of…" },
      { label: "Giá", formula: "how much + item + cost", noun: "the price / cost of…" },
    ],
    taskTypes: [
      { id: "time-changing", title: "Time-changing chart", overview: ["Câu 1: nhóm đối tượng tăng, giảm hoặc đi ngang; nhấn mạnh thay đổi rõ nhất.", "Câu 2: nêu đối tượng luôn cao/thấp nhất hoặc kết thúc ở mức cao nhất."], formula: "Overall, X decreased, while Y increased, with the most pronounced change seen in Z.", body: "Chia nhóm theo xu hướng hoặc giai đoạn; mô tả điểm đầu, bước ngoặt, đỉnh/đáy và điểm cuối." },
      { id: "map", title: "Map", overview: ["Nêu mức độ thay đổi chung và thay đổi nổi bật nhất.", "Chia thân bài theo cửa vào/trung tâm/phần còn lại hoặc theo Bắc–Nam–Đông–Tây."], formula: "The maps illustrate the layout of [place] in [year] and how it looked / will look in [year].", body: "Mỗi mô tả cần đủ: vật A + vị trí + thay đổi + vật B được thêm/thay thế (nếu có)." },
      { id: "time-fixed", title: "Time-fixed chart", overview: ["Chỉ ra hạng mục lớn nhất ở mỗi biểu đồ/nhóm.", "So sánh nơi biểu đồ/nhóm 1 cao hơn hoặc thấp hơn nhóm 2."], formula: "The chart compares how much / how many… across [number] specific groups, measured in…", body: "Luân phiên chủ ngữ: số liệu, hạng mục, đối tượng và cụm the proportion/amount/figure." },
      { id: "process", title: "Process", overview: ["Xác định quy trình tuyến tính hay tuần hoàn và tổng số giai đoạn.", "Nêu điểm bắt đầu, các chặng chính và sản phẩm/kết quả cuối."], formula: "The diagram illustrates a systematic process involved in the production of…", body: "Dùng hiện tại đơn và bị động khi trọng tâm là vật liệu/sản phẩm; nối bước bằng trạng từ thời gian." },
    ],
    trendVocabulary: [
      { label: "Tăng", words: "increase, rise, jump, climb, grow / growth" }, { label: "Giảm", words: "decrease, decline, fall, drop" }, { label: "Ổn định", words: "level off, stabilize, remain unchanged, hit a plateau" }, { label: "Nhẹ", words: "slight, subtle, marginal" }, { label: "Vừa phải", words: "moderate" }, { label: "Đáng kể", words: "considerable, significant, substantial" }, { label: "Mạnh", words: "dramatic, drastic, enormous, tremendous" }, { label: "Dần/đều", words: "gradual(ly), steady/steadily" },
    ],
    positionVocabulary: [
      { label: "Ngay trên", words: "just over, just above, upwards of" }, { label: "Ngay dưới", words: "just under, just shy of" }, { label: "Xấp xỉ", words: "around, about, approximately, roughly, nearly" }, { label: "Đỉnh", words: "peak at, reach a peak / the highest point of" }, { label: "Đáy", words: "hit a low / nadir of, decline to" },
    ],
    mapVocabulary: [
      { label: "Xây / thêm", words: "build, construct, erect, install, add, introduce" }, { label: "Phá / bỏ", words: "demolish, knock down, remove, clear, eliminate, cut down" }, { label: "Chuyển đổi", words: "transform / convert / repurpose into, redevelop" }, { label: "Mở rộng", words: "extend, widen, enlarge, broaden, expand" }, { label: "Thu hẹp", words: "narrow, reduce in size, shrink" }, { label: "Không đổi", words: "remain unchanged/untouched, experience no changes" },
    ],
    mapPatterns: ["The former A was cleared to make way for the construction of B.", "B was erected at the expense of removing A.", "The new B was built in [position], replacing the former A.", "The existing A was upgraded with the addition of B.", "No changes were made to A / A remained unchanged."],
    comparisonPatterns: ["More [noun] was recorded in A than in B, with X compared with Y.", "A recorded X, exceeding the corresponding figure for B by [difference].", "The figure for A was higher than that for B, at X and Y respectively.", "The margin between the two groups was the largest for [category]."],
    processVocabulary: [
      { label: "Trình tự", words: "first, next, following that, afterward, subsequently, finally" }, { label: "Sản xuất", words: "make, create, produce, manufacture, fabricate" }, { label: "Xử lý", words: "extract, heat, cool, freeze, condense, melt, vaporize" }, { label: "Sơ chế", words: "harvest, crush, grind, blend, filter, sort, wash, shape" }, { label: "Hoàn thiện", words: "package, store, distribute; finished/end products" },
    ],
    directionVocabulary: ["in the north/south/east/west of…", "in the northern/southern/eastern/western part", "at the top/bottom left/right corner", "to the north/south/east/west of…", "opposite, in front of, behind, between, among, adjacent to"],
  },
  writingTask2: {
    structure: [
      { part: "Introduction", text: "Paraphrase đề và nêu câu trả lời/quan điểm rõ ràng." }, { part: "Body 1", text: "Trả lời câu hỏi 1 hoặc triển khai luận điểm thứ nhất." }, { part: "Body 2", text: "Trả lời câu hỏi 2 hoặc triển khai luận điểm thứ hai." }, { part: "Conclusion", text: "Tóm tắt hai luận điểm và nhắc lại quan điểm; không thêm ý mới." },
    ],
    introductionTypes: [
      { title: "Một ý — quan điểm", cue: "Đề có đánh giá và hỏi agree/disagree.", starter: "It is believed that…" }, { title: "Một ý — sự thật/thực trạng", cue: "Đề nêu thực trạng và hỏi nguyên nhân, giải pháp, lợi/hại.", starter: "It is true that…" }, { title: "Hai ý / hai quan điểm", cue: "Đề đặt hai phía để thảo luận.", starter: "It is debatable whether…" },
    ],
    paraphraseSteps: ["Xác định động từ chính của câu gốc.", "Xác định chủ ngữ gốc là người, vật hay sự việc.", "Đổi chủ ngữ hoặc danh từ hóa vấn đề nhưng giữ nguyên nghĩa.", "Giữ nguyên phạm vi tuyệt đối/tương đối của đề; không làm câu mạnh hơn."],
    ideaMatrix: {
      columns: ["Cá nhân", "Tập thể / tổ chức"],
      rows: [
        { area: "Kinh tế", prompts: "thu nhập, tiết kiệm, thói quen mua sắm" }, { area: "Tinh thần", prompts: "áp lực, mối quan hệ, sự hưởng thụ" }, { area: "Sức khỏe", prompts: "thể chất, bệnh tật, tiếp cận y tế" }, { area: "Năng lực", prompts: "chăm sóc, dạy dỗ, bảo vệ, học tập, sự nghiệp" }, { area: "Công nghệ", prompts: "công cụ mới, nền tảng sẵn có" },
      ],
      note: "Chọn hai ô có khả năng tạo hai luận điểm khác nhau; tài liệu gọi cách danh từ hóa luận điểm là “5Hy”.",
    },
    bodyTools: [
      { title: "Topic sentence", text: "Nêu trực tiếp nguyên nhân, hệ quả, giải pháp hoặc quan điểm của đoạn." }, { title: "Regarding the former…", text: "Mở phần giải thích cho luận điểm thứ nhất." }, { title: "In terms of the latter…", text: "Chuyển sang luận điểm thứ hai." }, { title: "From an individual’s standpoint…", text: "Triển khai vai trò/giải pháp phía cá nhân." }, { title: "From the government’s standpoint…", text: "Triển khai vai trò/giải pháp phía nhà nước." }, { title: "Phản đề", text: "Bác bỏ quan điểm đối lập, rào trước phản biện; với đề quyền/nghĩa vụ có thể xét năng lực của bên chịu trách nhiệm, với đề triết học cần làm rõ định nghĩa." },
    ],
    planExamples: [
      { prompt: "Family members are spending less time together. What are the causes and what solutions can be suggested?", thesis: "Áp lực tài chính và sự phổ biến của công nghệ làm giảm tương tác; thành viên gia đình và chính phủ/tổ chức có thể phối hợp giải quyết." },
      { prompt: "Some students are reluctant to attend school regularly. What are the causes and what solutions can be implemented?", thesis: "Sức hấp dẫn của hoạt động ngoài trường và chất lượng truyền đạt có thể là hai hướng phân tích; học sinh và nhà trường cùng chịu trách nhiệm cho giải pháp." },
      { prompt: "Some people travel abroad more often than before. What are the reasons and what are the effects?", thesis: "Nhu cầu trải nghiệm và điều kiện kinh tế/di chuyển là hai nguyên nhân; phân tích hệ quả lên cộng đồng địa phương và nhà nước." },
    ],
  },
  glossary: [
    { term: "ĐTNC", meaning: "Đối tượng nghiên cứu trong biểu đồ/sơ đồ." }, { term: "Chỉ số chính", meaning: "Đại lượng mà đề yêu cầu mô tả: số lượng, mức tiêu thụ, tỷ lệ, chi phí…" }, { term: "Hột", meaning: "Cách gọi trong tài liệu cho từ trung tâm của một cụm hoặc vế cần xác định." }, { term: "5Hy", meaning: "Ký hiệu ghi nhớ riêng của tài liệu gốc; được giữ nguyên khi nhắc tới cách danh từ hóa luận điểm." },
  ],
};
