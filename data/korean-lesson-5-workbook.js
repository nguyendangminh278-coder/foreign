// Transcribed from Bai_tap_luyen_tap_Ngu_phap_tieng_Han.docx (9 sections, 84 items).
(() => {
  const line = (text, romanization, meaning) => ({ text, romanization, meaning });
  const particles = { 은: 'eun', 는: 'neun', 이: 'i', 가: 'ga', 을: 'eul', 를: 'reul' };
  const options = (values) => values.map((text) => ({ text, romanization: particles[text] }));
  const nounForms = { '책': { '은': 'chaegeun', '이': 'chaegi' }, '이것': { '은': 'igeoseun', '이': 'igeosi' } };
  const topic = [
    ['저', 'jeo', '학생이에요.', 'haksaengieyo.', 'Tôi là học sinh.', ['는']],
    ['민수', 'Minsu', '학교에 가요.', 'hakgyoe gayo.', 'Min-su đi đến trường.', ['는', '가']],
    ['친구', 'chingu', '집에 있어요.', 'jibe isseoyo.', 'Bạn ở nhà.', ['는', '가']],
    ['선생님', 'seonsaengnim', '교실에 있어요.', 'gyosire isseoyo.', 'Giáo viên ở trong lớp.', ['은', '이']],
    ['지수', 'Jisu', '한국어를 공부해요.', 'hangugeoreul gongbuhaeyo.', 'Ji-su học tiếng Hàn.', ['는', '가']],
    ['책', 'chaek', '재미있어요.', 'jaemiisseoyo.', 'Cuốn sách thú vị.', ['은', '이']],
    ['학교', 'hakgyo', '커요.', 'keoyo.', 'Trường học lớn.', ['는', '가']],
    ['이것', 'igeot', '책이에요.', 'chaegieyo.', 'Cái này là sách.', ['은', '이']],
    ['동생', 'dongsaeng', '학생이에요.', 'haksaengieyo.', 'Em là học sinh.', ['은', '이']],
    ['한국어', 'hangugeo', '재미있어요.', 'jaemiisseoyo.', 'Tiếng Hàn thú vị.', ['는', '가']],
  ].map(([noun, roma, rest, restRoma, meaning, answers]) => ({
    prompt: `${noun}___ ${rest}`, promptRomanization: `${roma} ___ ${restRoma}`, meaning,
    options: options(['은', '는', '이', '가']), answers,
    sample: line(`${noun}${answers[0]} ${rest}`, `${nounForms[noun]?.[answers[0]] || roma + particles[answers[0]]} ${restRoma}`, meaning),
    samples: Object.fromEntries(answers.map((a) => [a, line(`${noun}${a} ${rest}`, `${nounForms[noun]?.[a] || roma + particles[a]} ${restRoma}`, meaning)])),
    explanation: noun === '저' ? 'Trong khung giữ nguyên 저 (jeo), điền 는 (neun). Muốn dùng tiểu từ chủ ngữ thì đổi thành 제가 (jega), không viết 저가.' : 'Đề không cho ngữ cảnh nên cả chủ đề và chủ ngữ đúng hình thái đều được chấp nhận. Chủ đề nêu điều đang nói tới/đối chiếu; chủ ngữ xác định ai hoặc cái gì thực hiện hành động, có trạng thái.',
  }));
  const objects = [
    ['저는 밥', 'Jeoneun bap', '먹어요.', 'meogeoyo.', '을', '저는 밥을 먹어요.', 'Jeoneun babeul meogeoyo.', 'Tôi ăn cơm.'],
    ['민수는 책', 'Minsuneun chaek', '읽어요.', 'ilgeoyo.', '을', '민수는 책을 읽어요.', 'Minsuneun chaegeul ilgeoyo.', 'Min-su đọc sách.'],
    ['저는 한국어', 'Jeoneun hangugeo', '공부해요.', 'gongbuhaeyo.', '를', '저는 한국어를 공부해요.', 'Jeoneun hangugeoreul gongbuhaeyo.', 'Tôi học tiếng Hàn.'],
    ['친구는 커피', 'Chinguneun keopi', '마셔요.', 'masyeoyo.', '를', '친구는 커피를 마셔요.', 'Chinguneun keopireul masyeoyo.', 'Bạn uống cà phê.'],
    ['저는 음악', 'Jeoneun eumak', '들어요.', 'deureoyo.', '을', '저는 음악을 들어요.', 'Jeoneun eumageul deureoyo.', 'Tôi nghe nhạc.'],
    ['지수는 영화', 'Jisuneun yeonghwa', '봐요.', 'bwayo.', '를', '지수는 영화를 봐요.', 'Jisuneun yeonghwareul bwayo.', 'Ji-su xem phim.'],
    ['학생은 숙제', 'Haksaengeun sukje', '해요.', 'haeyo.', '를', '학생은 숙제를 해요.', 'Haksaengeun sukjereul haeyo.', 'Học sinh làm bài tập.'],
    ['저는 물', 'Jeoneun mul', '마셔요.', 'masyeoyo.', '을', '저는 물을 마셔요.', 'Jeoneun mureul masyeoyo.', 'Tôi uống nước.'],
    ['민수는 친구', 'Minsuneun chingu', '만나요.', 'mannayo.', '를', '민수는 친구를 만나요.', 'Minsuneun chingureul mannayo.', 'Min-su gặp bạn.'],
    ['저는 빵', 'Jeoneun ppang', '먹어요.', 'meogeoyo.', '을', '저는 빵을 먹어요.', 'Jeoneun ppangeul meogeoyo.', 'Tôi ăn bánh mì.'],
  ].map(([start, roma, end, endRoma, answer, text, fullRoma, meaning]) => ({ prompt: `${start}___ ${end}`, promptRomanization: `${roma} ___ ${endRoma}`, meaning, options: options(['을', '를']), answers: [answer], sample: line(text, fullRoma, meaning), explanation: answer === '을' ? 'Danh từ có batchim nên dùng 을 (eul).' : 'Danh từ không có batchim nên dùng 를 (reul).' }));
  const conjugation = [
    ['가다', 'gada', '가요', 'gayo', 'đi', 'ㅏ + 아요 co lại thành 가요.'],
    ['먹다', 'meokda', '먹어요', 'meogeoyo', 'ăn', 'Thân 먹- có nguyên âm ㅓ → thêm 어요.'],
    ['읽다', 'ikda', '읽어요', 'ilgeoyo', 'đọc', 'Thân 읽- có nguyên âm ㅣ → thêm 어요; đọc nối âm il-geoyo.'],
    ['마시다', 'masida', '마셔요', 'masyeoyo', 'uống', '마시 + 어요 → 마셔요 (ㅣ + ㅓ → ㅕ).'],
    ['만나다', 'mannada', '만나요', 'mannayo', 'gặp', '만나 + 아요 → 만나요.'],
    ['공부하다', 'gongbuhada', '공부해요', 'gongbuhaeyo', 'học bài', '하다 → 해요.'],
    ['보다', 'boda', '봐요', 'bwayo', 'xem, nhìn', '보 + 아요 → 봐요 (ㅗ + ㅏ → ㅘ).'],
    ['듣다', 'deutda', '들어요', 'deureoyo', 'nghe', 'Bất quy tắc ㄷ: 듣- → 들- trước 어요.'],
    ['쓰다', 'sseuda', '써요', 'sseoyo', 'viết; dùng', 'Bỏ ㅡ; không có âm tiết trước nên dùng 어요.'],
    ['배우다', 'baeuda', '배워요', 'baewoyo', 'học, học hỏi', '배우 + 어요 → 배워요 (ㅜ + ㅓ → ㅝ).'],
  ].map(([prompt, promptRomanization, text, romanization, meaning, explanation]) => ({ prompt, promptRomanization, meaning, sample: line(text, romanization, meaning), answers: [text], explanation }));
  const sentences = [
    ['저는 학교에서 한국어를 공부해요.', 'Jeoneun hakgyoeseo hangugeoreul gongbuhaeyo.', 'Tôi học tiếng Hàn ở trường.'],
    ['저는 집에서 밥을 먹어요.', 'Jeoneun jibeseo babeul meogeoyo.', 'Tôi ăn cơm ở nhà.'],
    ['저는 도서관에서 책을 읽어요.', 'Jeoneun doseogwaneseo chaegeul ilgeoyo.', 'Tôi đọc sách ở thư viện.'],
    ['저는 교실에서 물을 마셔요.', 'Jeoneun gyosireseo mureul masyeoyo.', 'Tôi uống nước ở lớp học.'],
    ['저는 집에서 음악을 들어요.', 'Jeoneun jibeseo eumageul deureoyo.', 'Tôi nghe nhạc ở nhà.'],
    ['저는 집에서 영화를 봐요.', 'Jeoneun jibeseo yeonghwareul bwayo.', 'Tôi xem phim ở nhà.'],
    ['저는 학교에서 친구를 만나요.', 'Jeoneun hakgyoeseo chingureul mannayo.', 'Tôi gặp bạn ở trường.'],
    ['저는 교실에서 숙제를 해요.', 'Jeoneun gyosireseo sukjereul haeyo.', 'Tôi làm bài tập ở lớp học.'],
  ].map((s) => line(...s));
  const openFrames = [
    ['공부해요', 'gongbuhaeyo', '를'], ['먹어요', 'meogeoyo', '을/를'], ['읽어요', 'ilgeoyo', '을/를'], ['마셔요', 'masyeoyo', '을/를'], ['들어요', 'deureoyo', '을/를'], ['봐요', 'bwayo', '을/를'], ['만나요', 'mannayo', '을/를'], ['해요', 'haeyo', '을/를'],
  ].map(([v, r, p], i) => ({ prompt: `저는 ___에서 ___${p} ${v}.`, promptRomanization: `Jeoneun ___eseo ___${p === '를' ? 'reul' : 'eul/reul'} ${r}.`, sample: sentences[i], explanation: 'Tự chọn địa điểm và danh từ phù hợp. Chọn 을/를 theo batchim; đáp án hiển thị chỉ là một ví dụ.' }));
  const reorder = [
    ['저는 / 밥을 / 먹어요', 'Jeoneun / babeul / meogeoyo', '저는 밥을 먹어요.', 'Jeoneun babeul meogeoyo.', 'Tôi ăn cơm.'],
    ['학교에서 / 공부해요 / 저는 / 한국어를', 'Hakgyoeseo / gongbuhaeyo / jeoneun / hangugeoreul', ...Object.values(sentences[0])],
    ['책을 / 읽어요 / 도서관에서 / 저는', 'Chaegeul / ilgeoyo / doseogwaneseo / jeoneun', ...Object.values(sentences[2])],
    ['친구를 / 만나요 / 학교에서 / 저는', 'Chingureul / mannayo / hakgyoeseo / jeoneun', ...Object.values(sentences[6])],
    ['음악을 / 들어요 / 집에서 / 저는', 'Eumageul / deureoyo / jibeseo / jeoneun', ...Object.values(sentences[4])],
    ['커피를 / 마셔요 / 카페에서 / 민수는', 'Keopireul / masyeoyo / kapeeseo / Minsuneun', '민수는 카페에서 커피를 마셔요.', 'Minsuneun kapeeseo keopireul masyeoyo.', 'Min-su uống cà phê ở quán cà phê.'],
    ['영화를 / 봐요 / 집에서 / 지수는', 'Yeonghwareul / bwayo / jibeseo / Jisuneun', '지수는 집에서 영화를 봐요.', 'Jisuneun jibeseo yeonghwareul bwayo.', 'Ji-su xem phim ở nhà.'],
    ['숙제를 / 해요 / 교실에서 / 학생은', 'Sukjereul / haeyo / gyosireseo / haksaengeun', '학생은 교실에서 숙제를 해요.', 'Haksaengeun gyosireseo sukjereul haeyo.', 'Học sinh làm bài tập ở lớp.'],
  ].map(([prompt, promptRomanization, text, romanization, meaning]) => ({ prompt, promptRomanization, sample: line(text, romanization, meaning), tokens: prompt.split(' / '), tokenRoma: promptRomanization.split(' / '), explanation: 'Tiểu từ đi cùng danh từ; vị ngữ ở cuối. Thứ tự khác câu mẫu có thể vẫn đúng.' }));
  const picturePrompts = [
    ['👦🏻 / 학교 / 책 / 읽다', 'hakgyo / chaek / ikda', '민수는 학교에서 책을 읽어요.', 'Minsuneun hakgyoeseo chaegeul ilgeoyo.', 'Min-su đọc sách ở trường.'],
    ['👧🏻 / 집 / 밥 / 먹다', 'jip / bap / meokda', '지수는 집에서 밥을 먹어요.', 'Jisuneun jibeseo babeul meogeoyo.', 'Ji-su ăn cơm ở nhà.'],
    ['👦🏻 / 카페 / 커피 / 마시다', 'kape / keopi / masida', '민수는 카페에서 커피를 마셔요.', 'Minsuneun kapeeseo keopireul masyeoyo.', 'Min-su uống cà phê ở quán cà phê.'],
    ['👧🏻 / 도서관 / 책 / 읽다', 'doseogwan / chaek / ikda', '지수는 도서관에서 책을 읽어요.', 'Jisuneun doseogwaneseo chaegeul ilgeoyo.', 'Ji-su đọc sách ở thư viện.'],
    ['👦🏻 / 집 / 음악 / 듣다', 'jip / eumak / deutda', '민수는 집에서 음악을 들어요.', 'Minsuneun jibeseo eumageul deureoyo.', 'Min-su nghe nhạc ở nhà.'],
    ['👧🏻 / 학교 / 친구 / 만나다', 'hakgyo / chingu / mannada', '지수는 학교에서 친구를 만나요.', 'Jisuneun hakgyoeseo chingureul mannayo.', 'Ji-su gặp bạn ở trường.'],
    ['👦🏻 / 집 / 영화 / 보다', 'jip / yeonghwa / boda', '민수는 집에서 영화를 봐요.', 'Minsuneun jibeseo yeonghwareul bwayo.', 'Min-su xem phim ở nhà.'],
    ['👩🏻 / 교실 / 한국어 / 가르치다', 'gyosil / hangugeo / gareuchida', '선생님은 교실에서 한국어를 가르쳐요.', 'Seonsaengnimeun gyosireseo hangugeoreul gareuchyeoyo.', 'Giáo viên dạy tiếng Hàn ở lớp.'],
  ].map(([prompt, promptRomanization, text, romanization, meaning]) => ({ prompt, promptRomanization, sample: line(text, romanization, meaning), explanation: 'Hình người trong đề không quy định tên. Tên/chủ ngữ trong câu mẫu là một lựa chọn; có thể thay bằng tên phù hợp.' }));
  const translations = [
    line('저는 학생이에요.', 'Jeoneun haksaengieyo.', 'Tôi là học sinh.'), sentences[1], sentences[0], sentences[2], sentences[4], sentences[3], sentences[6], sentences[5], reorder[5].sample,
    line('지수는 도서관에서 한국어를 공부해요.', 'Jisuneun doseogwaneseo hangugeoreul gongbuhaeyo.', 'Ji-su học tiếng Hàn ở thư viện.'),
  ].map((sample) => ({ prompt: sample.meaning, sample, explanation: 'Đối chiếu chủ đề/chủ ngữ, địa điểm, tân ngữ và đuôi lịch sự. Câu mẫu không phải cách diễn đạt duy nhất.' }));
  const compose = [
    ['저 / 학교에서 / 한국어 / 공부하다', 'jeo / hakgyoeseo / hangugeo / gongbuhada', sentences[0]],
    ['민수 / 집에서 / 밥 / 먹다', 'Minsu / jibeseo / bap / meokda', line('민수는 집에서 밥을 먹어요.', 'Minsuneun jibeseo babeul meogeoyo.', 'Min-su ăn cơm ở nhà.')],
    ['지수 / 도서관에서 / 책 / 읽다', 'Jisu / doseogwaneseo / chaek / ikda', picturePrompts[3].sample],
    ['친구 / 카페에서 / 커피 / 마시다', 'chingu / kapeeseo / keopi / masida', line('친구는 카페에서 커피를 마셔요.', 'Chinguneun kapeeseo keopireul masyeoyo.', 'Bạn uống cà phê ở quán cà phê.')],
    ['저 / 집에서 / 음악 / 듣다', 'jeo / jibeseo / eumak / deutda', sentences[4]],
    ['학생 / 학교에서 / 친구 / 만나다', 'haksaeng / hakgyoeseo / chingu / mannada', line('학생은 학교에서 친구를 만나요.', 'Haksaengeun hakgyoeseo chingureul mannayo.', 'Học sinh gặp bạn ở trường.')],
    ['민수 / 집에서 / 영화 / 보다', 'Minsu / jibeseo / yeonghwa / boda', picturePrompts[6].sample],
    ['저 / 교실에서 / 숙제 / 하다', 'jeo / gyosireseo / sukje / hada', sentences[7]],
    ['지수 / 학교에서 / 한국어 / 배우다', 'Jisu / hakgyoeseo / hangugeo / baeuda', line('지수는 학교에서 한국어를 배워요.', 'Jisuneun hakgyoeseo hangugeoreul baewoyo.', 'Ji-su học tiếng Hàn ở trường.')],
    ['친구 / 식당에서 / 밥 / 먹다', 'chingu / sikdangeseo / bap / meokda', line('친구는 식당에서 밥을 먹어요.', 'Chinguneun sikdangeseo babeul meogeoyo.', 'Bạn ăn cơm ở nhà hàng.')],
  ].map(([prompt, promptRomanization, sample]) => ({ prompt, promptRomanization, sample, explanation: 'Bổ sung tiểu từ phù hợp và chia động từ sang đuôi lịch sự. Giữ địa điểm với 에서.' }));
  const corrections = [
    ['저는 학교를 공부해요.', 'Jeoneun hakgyoreul gongbuhaeyo.', '저는 학교에서 공부해요.', 'Jeoneun hakgyoeseo gongbuhaeyo.', 'Tôi học ở trường.', 'Nơi học dùng 에서 (eseo), không dùng tiểu từ tân ngữ 를 (reul).'],
    ['저는 밥이 먹어요.', 'Jeoneun babi meogeoyo.', '저는 밥을 먹어요.', 'Jeoneun babeul meogeoyo.', 'Tôi ăn cơm.', 'Cơm là đối tượng được ăn → 밥을 (babeul).'],
    ['민수는 책이 읽어요.', 'Minsuneun chaegi ilgeoyo.', '민수는 책을 읽어요.', 'Minsuneun chaegeul ilgeoyo.', 'Min-su đọc sách.', 'Sách là đối tượng được đọc → 책을 (chaegeul).'],
    ['저는 집을 음악을 들어요.', 'Jeoneun jibeul eumageul deureoyo.', ...Object.values(sentences[4]), 'Nhà là nơi nghe → 집에서 (jibeseo).'],
    ['지수는 친구가 만나요.', 'Jisuneun chinguga mannayo.', '지수는 친구를 만나요.', 'Jisuneun chingureul mannayo.', 'Ji-su gặp bạn.', 'Người được gặp là tân ngữ → 친구를 (chingureul).'],
    ['학생은 도서관을 책을 읽어요.', 'Haksaengeun doseogwaneul chaegeul ilgeoyo.', '학생은 도서관에서 책을 읽어요.', 'Haksaengeun doseogwaneseo chaegeul ilgeoyo.', 'Học sinh đọc sách ở thư viện.', 'Nơi đọc dùng 도서관에서 (doseogwaneseo).'],
    ['저는 카페를 커피를 마셔요.', 'Jeoneun kapereul keopireul masyeoyo.', '저는 카페에서 커피를 마셔요.', 'Jeoneun kapeeseo keopireul masyeoyo.', 'Tôi uống cà phê ở quán cà phê.', 'Quán cà phê là địa điểm thực hiện hành động → 카페에서 (kapeeseo).'],
    ['민수는 학교가 한국어를 공부해요.', 'Minsuneun hakgyoga hangugeoreul gongbuhaeyo.', '민수는 학교에서 한국어를 공부해요.', 'Minsuneun hakgyoeseo hangugeoreul gongbuhaeyo.', 'Min-su học tiếng Hàn ở trường.', 'Trường là nơi học, không phải chủ thể thực hiện hành động.'],
    ['저는 집에서 영화를 봐요.', 'Jeoneun jibeseo yeonghwareul bwayo.', ...Object.values(sentences[5]), 'Câu số 9 trong tài liệu đã đúng. Giữ nguyên: nơi xem + 에서, phim + 를, 보다 → 봐요.'],
    ['지수는 학교에서 친구가 만나요.', 'Jisuneun hakgyoeseo chinguga mannayo.', ...Object.values(picturePrompts[5].sample), 'Bạn là người được gặp → 친구를 (chingureul).'],
  ].map(([prompt, promptRomanization, text, romanization, meaning, explanation]) => ({ prompt, promptRomanization, sample: line(text, romanization, meaning), explanation, alreadyCorrect: prompt === text }));
  window.KOREAN_LESSON_FIVE_WORKBOOK = {
    source: 'Bai_tap_luyen_tap_Ngu_phap_tieng_Han.docx',
    vocabulary: [
      ['커피', 'keopi', 'khơ-phi', 'cà phê'], ['음악', 'eumak', 'ư-mak', 'âm nhạc'], ['영화', 'yeonghwa', 'yơng-hoa', 'phim'], ['카페', 'kape', 'kha-phê', 'quán cà phê'], ['물', 'mul', 'mul', 'nước'],
    ].map(([text, romanization, reading, meaning]) => ({ text, romanization, reading, meaning })),
    sections: [
      { id: 'topic', title: '1. Chủ đề & chủ ngữ', type: 'choice', note: 'Chọn tiểu từ đúng hình thái. Khi thiếu ngữ cảnh, có thể có hai đáp án.', items: topic },
      { id: 'object', title: '2. Tiểu từ tân ngữ', type: 'choice', note: 'Có batchim dùng 을 (eul), không có dùng 를 (reul).', items: objects },
      { id: 'ending', title: '3. Chia đuôi lịch sự', type: 'exact', note: 'Gõ dạng lịch sự 아/어요 (a/eoyo), rồi xem cách chia và nghĩa.', items: conjugation },
      { id: 'frames', title: '4. Điền câu của bạn', type: 'open', note: 'Tự chọn từ cho hai chỗ trống. Nhập cả câu để đối chiếu mẫu.', items: openFrames },
      { id: 'order', title: '5. Sắp xếp câu', type: 'order', note: 'Chạm từng mảnh; chạm lại mảnh đã chọn để bỏ.', items: reorder },
      { id: 'pictures', title: '6. Viết theo gợi ý', type: 'open', note: 'Tên nhân vật do bạn chọn; emoji không quy định một tên duy nhất.', items: picturePrompts },
      { id: 'translate', title: '7. Dịch sang tiếng Hàn', type: 'open', note: 'Tự dịch trước khi mở câu mẫu và cách đọc.', items: translations },
      { id: 'compose', title: '8. Hoàn thành câu', type: 'open', note: 'Bổ sung tiểu từ và chia động từ từ những từ gợi ý.', items: compose },
      { id: 'correct', title: '9. Tìm và sửa lỗi', type: 'open', note: 'Không phải câu nào cũng sai. Nếu câu đúng, giữ nguyên.', items: corrections },
    ],
  };
})();
