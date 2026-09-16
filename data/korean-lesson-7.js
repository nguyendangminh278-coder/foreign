// Source: Bài 7.pdf, 31 pages. Source images and adapted activities are kept distinct.
(() => {
  'use strict';
  const line = (text, romanization, meaning) => ({text, romanization, meaning});
  const days = [
    ['월요일','woryoil','Thứ hai'],['화요일','hwayoil','Thứ ba'],['수요일','suyoil','Thứ tư'],
    ['목요일','mogyoil','Thứ năm'],['금요일','geumyoil','Thứ sáu'],['토요일','toyoil','Thứ bảy'],['일요일','iryoil','Chủ nhật'],
  ].map(s => line(...s));
  const vocabulary = [
    ...days.map((d,i)=>({id:`day${i}`, ...d, group:'days',page:3,emoji:'📅',core:true})),
    ...[
      ['morning','아침','achim','Buổi sáng; bữa sáng','🌤️','time',4,5],
      ['am','오전','ojeon','Buổi sáng; trước 12 giờ trưa (AM)','☀️','time',4],
      ['pm','오후','ohu','Buổi chiều; sau 12 giờ trưa (PM)','🌤️','time',4],
      ['evening','저녁','jeonyeok','Buổi tối; bữa tối','🌆','time',4,5],
      ['night','밤','bam','Ban đêm','🌙','time',4],
      ['academy','학원','hagwon','Trung tâm/lớp học thêm','🎹','places',5],
      ['pool','수영장','suyeongjang','Bể bơi','🏊','places',5,5],
      ['company','회사','hoesa','Công ty','🏢','places',5,1],
      ['kindergarten','유치원','yuchiwon','Trường mẫu giáo','🧸','places',6],
      ['gym','체육관','cheyukgwan','Nhà thi đấu; phòng tập','🏀','places',6,5],
      ['mountain','산','san','Núi','⛰️','places',6],
      ['week','일주일','iljuil','Một tuần','🗓️','routine',7],
      ['range','부터 … 까지','buteo … kkaji','Từ … đến …','↔️','routine',7],
      ['daily','매일','maeil','Mỗi ngày','📅','routine',7],
      ['usually','보통','botong','Thường; thông thường','🔁','routine',7],
      ['cheap','싸다','ssada','Rẻ (싸요 · ssayo)','🏷️','routine',7],
      ['weekend','주말','jumal','Cuối tuần','🌿','routine',7],
      ['weekly','매주','maeju','Mỗi tuần','🗓️','routine',8],
      ['early','일찍','iljjik','Sớm','⏰','routine',8],
      ['sleep','자다','jada','Ngủ (자요 · jayo)','🛌','routine',8,4],
      ['which','무슨','museun','Gì/nào; đứng trước danh từ','❔','routine',8],
      ['when','언제','eonje','Khi nào','🕐','routine',8],
      ['this','이번','ibeon','Lần này; 이번 주 · ibeon ju · tuần này','📌','routine',8],
      ['library','도서관','doseogwan','Thư viện','📚','support',1,5],
      ['piano','피아노','piano','Đàn piano','🎹','support',10],
      ['borrow','빌리다','billida','Mượn (빌려요 · billyeoyo)','📖','support',17],
      ['story','동화책','donghwachaek','Sách truyện thiếu nhi/cổ tích','📙','support',18],
      ['mart','마트','mateu','Siêu thị','🛒','support',18],
      ['koreanschool','한국학교','hangukhakgyo','Trường dạy tiếng/văn hóa Hàn Quốc','🏫','support',18],
      ['ballet','발레 학원','balle hagwon','Lớp/trung tâm múa ba lê','🩰','support',23],
      ['school','학교','hakgyo','Trường học','🏫','support',9,1],
      ['home','집','jip','Nhà','🏡','support',9,2],
      ['park','공원','gongwon','Công viên','🌳','support',18,4],
      ['comic','만화책','manhwachaek','Truyện tranh','📘','support',18,4],
      ['vegetable','채소','chaeso','Rau củ','🥬','support',18,4],
      ['dayword','요일','yoil','Thứ trong tuần','📅','support',16],
    ].map(([id,text,romanization,meaning,emoji,group,page,review])=>({id,text,romanization,meaning,emoji,group,page,review,core:group!=='support'})),
  ];
  const words=Object.fromEntries(vocabulary.map(w=>[w.id,w]));
  const grammar=[
    {title:'Đi đến đâu? · 에',formula:'Địa điểm + 에 가요',romanization:'e gayo · đi đến…',explanation:'Ở nghĩa đích đến, gắn 에 vào nơi mình đi tới. Đây không phải mọi cách dùng của 에: nơi tồn tại đã học ở Bài 6; thời gian sẽ học ngay bên cạnh.',examples:[line('동생은 학교에 가요.','Dongsaengeun hakgyoe gayo.','Em đi đến trường.'),line('저는 지금 집에 가요.','Jeoneun jigeum jibe gayo.','Bây giờ tôi về nhà.')]},
    {title:'Làm khi nào? · 에',formula:'Thời gian + 에 + hành động',romanization:'e · vào/lúc…',explanation:'Dùng sau giờ, thứ, tháng và buổi. Khi ghép thứ + buổi, đặt 에 ở cuối cả cụm. Trong nghĩa thời gian thông thường, không thêm 에 sau 오늘 (oneul · hôm nay), 내일 (naeil · ngày mai), 어제 (eoje · hôm qua), 지금 (jigeum · bây giờ).',examples:[line('화요일에 피아노를 배워요.','Hwayoire pianoreul baewoyo.','Tôi học piano vào thứ ba.'),line('토요일 오후에 친구를 만나요.','Toyoil ohue chingureul mannayo.','Tôi gặp bạn vào chiều thứ bảy.'),line('오늘 한국어를 공부해요.','Oneul hangugeoreul gongbuhaeyo.','Hôm nay tôi học tiếng Hàn.')]},
    {title:'Một tuần lặp lại',formula:'매주 / 매일 · 부터 … 까지',romanization:'maeju / maeil · buteo … kkaji',explanation:'매주: mỗi tuần; 매일: mỗi ngày. 부터…까지: từ…đến…; viết liền với mốc thời gian. Muốn hỏi thứ mấy dùng 무슨 요일 (museun yoil), muốn hỏi khi nào dùng 언제 (eonje).',examples:[line('매주 토요일에 도서관에 가요.','Maeju toyoire doseogwane gayo.','Tôi đến thư viện vào mỗi thứ bảy.'),line('월요일부터 금요일까지 학교에 가요.','Woryoilbuteo geumyoilkkaji hakgyoe gayo.','Tôi đến trường từ thứ hai đến thứ sáu.'),line('언제 수영장에 가요?','Eonje suyeongjange gayo?','Khi nào bạn đến bể bơi?')]},
  ];
  const reading=[
    ['노아 가족은 월요일부터 금요일까지 바빠요.','Noa gajogeun woryoilbuteo geumyoilkkaji bappayo.','Gia đình Noa bận rộn từ thứ hai đến thứ sáu.'],
    ['아빠는 매일 회사에 가요.','Appaneun maeil hoesae gayo.','Bố đến công ty mỗi ngày.'],
    ['노아도 매일 학교에 가요.','Noado maeil hakgyoe gayo.','Noa cũng đến trường mỗi ngày.'],
    ['동생 미나는 화요일하고 목요일에 유치원에 가요.','Dongsaeng Minaneun hwayoil hago mogyoire yuchiwone gayo.','Em Mina đến trường mẫu giáo vào thứ ba và thứ năm.'],
    ['엄마는 보통 수요일에 마트에 가요.','Eommaneun botong suyoire mateue gayo.','Mẹ thường đến siêu thị vào thứ tư.'],
    ['수요일에는 채소가 싸요.','Suyoireneun chaesoga ssayo.','Vào thứ tư, rau củ rẻ.'],
    ['노아는 주말을 좋아해요.','Noaneun jumareul joahaeyo.','Noa thích cuối tuần.'],
    ['매주 토요일 오전에 한국학교에 가요.','Maeju toyoil ojeone hangukhakgyoe gayo.','Mỗi sáng thứ bảy, Noa đến trường Hàn Quốc.'],
    ['한국학교에서 한국어를 배워요.','Hangukhakgyoeseo hangugeoreul baewoyo.','Noa học tiếng Hàn tại trường Hàn Quốc.'],
    ['그리고 토요일 오후에는 도서관에 가요.','Geurigo toyoil ohueneun doseogwane gayo.','Và chiều thứ bảy, Noa đến thư viện.'],
    ['도서관에서 노아는 만화책을 읽어요.','Doseogwaneseo Noaneun manhwachaegeul ilgeoyo.','Ở thư viện, Noa đọc truyện tranh.'],
    ['미나는 동화책을 빌려요.','Minaneun donghwachaegeul billyeoyo.','Mina mượn sách truyện thiếu nhi.'],
    ['보통 일요일 오후에 노아 가족은 공원에서 산책을 해요.','Botong iryoil ohue Noa gajogeun gongwoneseo sanchaegeul haeyo.','Gia đình Noa thường đi dạo ở công viên vào chiều chủ nhật.'],
    ['그리고 일요일 밤에는 일찍 자요.','Geurigo iryoil bameneun iljjik jayo.','Và tối chủ nhật, cả nhà đi ngủ sớm.'],
  ].map(s=>line(...s));
  const community=[
    ['우리 동네에는 학교, 도서관, 수영장, 공원, 마트가 있어요.','Uri dongneeneun hakgyo, doseogwan, suyeongjang, gongwon, mateuga isseoyo.','Khu phố chúng tôi có trường học, thư viện, bể bơi, công viên và siêu thị.'],
    ['피아노 학원하고 체육관도 있어요.','Piano hagwonhago cheyukgwando isseoyo.','Cũng có lớp piano và nhà thi đấu.'],
    ['민수하고 저는 보통 토요일에 도서관에 가요.','Minsuhago jeoneun botong toyoire doseogwane gayo.','Minsu và tôi thường đến thư viện vào thứ bảy.'],
    ['다니엘은 일요일에 공원에서 운동해요.','Danieleun iryoire gongwoneseo undonghaeyo.','Daniel tập thể dục ở công viên vào chủ nhật.'],
    ['우리 동네는 아주 좋아요!','Uri dongneneun aju joayo!','Khu phố chúng tôi rất tốt đẹp!'],
  ].map(s=>line(...s));
  // The builder only combines the places and activities appearing in this PDF.
  const routines=[
    ['library','📚','도서관','doseogwan','thư viện','책을 읽어요','chaegeul ilgeoyo','đọc sách'],
    ['school','🏫','학교','hakgyo','trường học','공부해요','gongbuhaeyo','học bài'],
    ['korean','🇰🇷','한국학교','hangukhakgyo','trường Hàn Quốc','한국어를 배워요','hangugeoreul baewoyo','học tiếng Hàn'],
    ['pool','🏊','수영장','suyeongjang','bể bơi','수영을 배워요','suyeongeul baewoyo','học bơi'],
    ['park','🌳','공원','gongwon','công viên','산책을 해요','sanchaegeul haeyo','đi dạo'],
    ['piano','🎹','피아노 학원','piano hagwon','lớp piano','피아노를 배워요','pianoreul baewoyo','học piano'],
  ].map(([id,emoji,place,placeRoma,placeMeaning,action,actionRoma,actionMeaning])=>({id,emoji,place,placeRoma,placeMeaning,action,actionRoma,actionMeaning}));
  const periods=[line('','','Cả ngày / không nêu buổi'),line('오전','ojeon','buổi sáng'),line('오후','ohu','buổi chiều'),line('저녁','jeonyeok','buổi tối')];
  function buildRoutine(dayIndex,periodIndex,routineId,mode){
    const day=days[dayIndex],period=periods[periodIndex],r=routines.find(r=>r.id===routineId);
    const when=period.text?`${day.text} ${period.text}에`:`${day.text}에`;
    const whenRoma=period.text?`${day.romanization} ${period.romanization==='jeonyeok'?'jeonyeoge':period.romanization+'e'}`:day.romanization.replace(/l$/,'r')+'e';
    const destination=mode==='go';
    const placeRoma=r.placeRoma+(destination?'e':'eseo');
    return {...line(`저는 ${when} ${r.place}${destination?'에':'에서'} ${destination?'가요':r.action}.`, `Jeoneun ${whenRoma} ${placeRoma} ${destination?'gayo':r.actionRoma}.`, `Vào ${period.meaning==='Cả ngày / không nêu buổi'?'':period.meaning+' '}${day.meaning.toLowerCase()}, tôi ${destination?'đến '+r.placeMeaning:r.actionMeaning+' ở '+r.placeMeaning}.`),when,whenRoma,routine:r};
  }
  const orders=[
    [['가요','학교에','동생은'],['gayo','hakgyoe','dongsaengeun'],grammar[0].examples[0]],
    [['만나요','친구를','토요일 오후에'],['mannayo','chingureul','toyoil ohue'],grammar[1].examples[1]],
    [['자요','밤에','저는'],['jayo','bame','jeoneun'],line('저는 밤에 자요.','Jeoneun bame jayo.','Tôi ngủ vào ban đêm.')],
    [['회사에','아버지는','가요'],['hoesae','abeojineun','gayo'],line('아버지는 회사에 가요.','Abeojineun hoesae gayo.','Bố đến công ty.')],
    [['배워요','화요일에','피아노를'],['baewoyo','hwayoire','pianoreul'],grammar[1].examples[0]],
  ].map(([tokens,tokenRoma,sample])=>({prompt:'Sắp xếp các mảnh thành câu.',meaning:sample.meaning,tokens,tokenRoma,sample,explanation:'Động từ đặt cuối câu. Cụm thời gian và chủ đề có thể đổi vị trí; đối chiếu cấu trúc chứ không chấm sai chỉ vì khác thứ tự mẫu.'}));
  const corrections=[
    ['오늘에 학교에 가요.','Oneure hakgyoe gayo.','오늘 학교에 가요.','Oneul hakgyoe gayo.','Hôm nay tôi đến trường.','오늘 (oneul · hôm nay) không thêm 에 trong cách nói thời gian này.'],
    ['학교에 공부해요.','Hakgyoe gongbuhaeyo.','학교에서 공부해요.','Hakgyoeseo gongbuhaeyo.','Tôi học bài ở trường.','Nơi diễn ra hành động học dùng 에서 (eseo).'],
    ['토요일에 오후 친구를 만나요.','Toyoire ohu chingureul mannayo.','토요일 오후에 친구를 만나요.','Toyoil ohue chingureul mannayo.','Tôi gặp bạn vào chiều thứ bảy.','Thứ + buổi là một cụm; 에 đặt sau 오후.'],
    ['저는 집에서 가요.','Jeoneun jibeseo gayo.','저는 집에 가요.','Jeoneun jibe gayo.','Tôi về nhà.','Theo nghĩa đề yêu cầu là đi ĐẾN nhà, dùng 집에 (jibe). 집에서 (jibeseo) có thể chỉ xuất phát TỪ nhà trong ngữ cảnh khác; không phải lúc nào câu nguồn cũng sai.'],
    ['내일에 친구를 만나요.','Naeire chingureul mannayo.','내일 친구를 만나요.','Naeil chingureul mannayo.','Ngày mai tôi gặp bạn.','내일 (naeil · ngày mai) không thêm 에.'],
  ].map(([prompt,promptRomanization,text,roma,meaning,explanation])=>({prompt,promptRomanization,meaning:'Sửa để diễn đạt: '+meaning,sample:line(text,roma,meaning),explanation}));
  const particleOptions=[line('에','e','Thời gian / đích đến'),line('에서','eseo','Nơi diễn ra hành động'),line('Không thêm','—','Giữ nguyên, không gắn tiểu từ')];
  const particles=[
    ['저는 월요일 ___ 학교에 가요.','Jeoneun woryoil ___ hakgyoe gayo.','에','저는 월요일에 학교에 가요.','Jeoneun woryoire hakgyoe gayo.','Tôi đến trường vào thứ hai.','Sau thứ trong tuần dùng 에.'],
    ['동생은 집 ___ 자요.','Dongsaengeun jip ___ jayo.','에서','동생은 집에서 자요.','Dongsaengeun jibeseo jayo.','Em ngủ ở nhà.','Ngủ là hành động diễn ra ở nhà → 에서.'],
    ['토요일 오후 ___ 친구를 만나요.','Toyoil ohu ___ chingureul mannayo.','에',...Object.values(grammar[1].examples[1]),'에 đặt ở cuối cụm thời gian.'],
    ['저는 학교 ___ 공부해요.','Jeoneun hakgyo ___ gongbuhaeyo.','에서','저는 학교에서 공부해요.','Jeoneun hakgyoeseo gongbuhaeyo.','Tôi học bài ở trường.','Nơi học dùng 에서.'],
    ['아침 ___ 운동해요.','Achim ___ undonghaeyo.','에','아침에 운동해요.','Achime undonghaeyo.','Tôi tập thể dục buổi sáng.','Buổi sáng là thời gian → 에.'],
    ['지금 회사 ___ 가요.','Jigeum hoesa ___ gayo.','에','지금 회사에 가요.','Jigeum hoesae gayo.','Bây giờ tôi đến công ty.','Công ty là đích đến → 에.'],
    ['오늘 ___ 한국어를 공부해요.','Oneul ___ hangugeoreul gongbuhaeyo.','Không thêm',...Object.values(grammar[1].examples[2]),'Trang 13 chỉ nêu 에/에서 nhưng câu này cần lựa chọn không thêm: 오늘 không gắn 에 ở đây.'],
    ['친구는 유치원 ___ 가요.','Chinguneun yuchiwon ___ gayo.','에','친구는 유치원에 가요.','Chinguneun yuchiwone gayo.','Bạn đến trường mẫu giáo.','Đích đến dùng 에.'],
    ['저녁 ___ 밥을 먹어요.','Jeonyeok ___ babeul meogeoyo.','에','저녁에 밥을 먹어요.','Jeonyeoge babeul meogeoyo.','Tôi ăn cơm vào buổi tối.','Buổi tối là thời gian → 에.'],
    ['병원 ___ 일해요.','Byeongwon ___ ilhaeyo.','에서','병원에서 일해요.','Byeongwoneseo ilhaeyo.','Tôi làm việc ở bệnh viện.','Nơi làm việc dùng 에서.'],
  ].map(([prompt,promptRomanization,answer,text,roma,meaning,explanation])=>({prompt,promptRomanization,meaning,options:particleOptions,answers:[answer],sample:line(text,roma,meaning),explanation}));
  const translate=[
    ['Tôi đến lớp học thêm vào thứ hai.','저는 월요일에 학원에 가요.','Jeoneun woryoire hagwone gayo.'],
    ['Tôi đi ngủ lúc 10 giờ.','저는 열 시에 자요.','Jeoneun yeol sie jayo.'],
    ['Tôi gặp bạn vào chiều thứ bảy.','저는 토요일 오후에 친구를 만나요.','Jeoneun toyoil ohue chingureul mannayo.'],
    ['Em tôi đến bể bơi.','제 동생은 수영장에 가요.','Je dongsaengeun suyeongjange gayo.'],
    ['Tôi tập thể dục buổi sáng.','저는 아침에 운동해요.','Jeoneun achime undonghaeyo.'],
  ].map(([meaning,text,roma])=>({prompt:meaning,sample:line(text,roma,meaning),explanation:'Một câu mẫu theo trang 14. Có thể lược chủ ngữ hoặc đổi vị trí cụm thời gian khi ngữ cảnh đã rõ.'}));
  const trueFalse=[
    ['아빠는 월요일부터 금요일까지 회사에 가요.','Appaneun woryoilbuteo geumyoilkkaji hoesae gayo.','Bố đến công ty từ thứ hai đến thứ sáu.',true,reading[1],'Bài đọc mở đầu nói về lịch bận rộn từ thứ hai đến thứ sáu.'],
    ['노아는 월요일부터 목요일까지 학교에 가요.','Noaneun woryoilbuteo mogyoilkkaji hakgyoe gayo.','Noa đến trường từ thứ hai đến thứ năm.',false,reading[2],'Theo đáp án mà bài luyện hướng đến, lịch đi học là từ thứ hai đến thứ sáu. Câu đề nêu đến thứ năm là chưa đủ lịch; điều này không có nghĩa Noa không đi học trong những ngày thứ hai đến thứ năm.'],
    ['미나는 화요일하고 수요일에 유치원에 가요.','Minaneun hwayoil hago suyoire yuchiwone gayo.','Mina đến mẫu giáo vào thứ ba và thứ tư.',false,reading[3],'Mina đi thứ ba và thứ năm, không phải thứ tư.'],
    ['엄마는 보통 금요일에 마트에 가요.','Eommaneun botong geumyoire mateue gayo.','Mẹ thường đến siêu thị vào thứ sáu.',false,reading[4],'Mẹ thường đi siêu thị thứ tư.'],
  ].map(([prompt,promptRomanization,meaning,right,sample,explanation])=>({prompt,promptRomanization,meaning,options:[line('Đúng','O','Khớp lịch trong bài'),line('Sai','X','Không khớp lịch trong bài')],answers:[right?'Đúng':'Sai'],sample,explanation}));
  const choices=(prompt,options,answer,sample,explanation)=>({prompt,options,answers:[answer],sample,explanation});
  const weekend=[
    choices('Trang 19 · Noa thích hai ngày nào?', [line('토요일하고 일요일','toyoil hago iryoil','Thứ bảy và chủ nhật'),line('월요일하고 화요일','woryoil hago hwayoil','Thứ hai và thứ ba')],'토요일하고 일요일',reading[6],'주말 (jumal · cuối tuần) ở đây là thứ bảy và chủ nhật.'),
    choices('Trang 20 · Sáng thứ bảy, Noa đi đâu?', [words.koreanschool,words.gym,words.pool],'한국학교',reading[7],'Chọn theo lịch của Noa, không theo mọi địa điểm xuất hiện trong tranh.'),
    choices('Trang 20 · Ở thư viện, Noa làm gì?', [line('만화책을 읽어요','manhwachaegeul ilgeoyo','Đọc truyện tranh'),line('동화책을 빌려요','donghwachaegeul billyeoyo','Mượn truyện thiếu nhi')],'만화책을 읽어요',reading[10],'Noa đọc truyện tranh; Mina mới là người mượn truyện thiếu nhi.'),
    choices('Trang 20 · Gia đình Noa làm gì ở công viên?', [line('산책을 해요','sanchaegeul haeyo','Đi dạo'),line('수영을 배워요','suyeongeul baewoyo','Học bơi')],'산책을 해요',reading[12],'Gia đình thường đi dạo vào chiều chủ nhật.'),
  ];
  const conversations=[
    ['언제 농구를 해요?','Eonje nonggureul haeyo?','Khi nào bạn chơi bóng rổ?','월요일하고 수요일에 농구를 해요.','Woryoil hago suyoire nonggureul haeyo.','Tôi chơi bóng rổ vào thứ hai và thứ tư.'],
    ['언제 자전거를 타요?','Eonje jajeongeoreul tayo?','Khi nào bạn đi xe đạp?','토요일 오전에 자전거를 타요.','Toyoil ojeone jajeongeoreul tayo.','Tôi đi xe đạp vào sáng thứ bảy.'],
    ['언제 책을 읽어요?','Eonje chaegeul ilgeoyo?','Khi nào bạn đọc sách?','매일 저녁에 책을 읽어요.','Maeil jeonyeoge chaegeul ilgeoyo.','Tôi đọc sách mỗi tối.'],
    ['언제 수영을 배워요?','Eonje suyeongeul baewoyo?','Khi nào bạn học bơi?','매주 일요일에 수영을 배워요.','Maeju iryoire suyeongeul baewoyo.','Tôi học bơi mỗi chủ nhật.'],
    ['금요일 저녁에 어디에 가요?','Geumyoil jeonyeoge eodie gayo?','Tối thứ sáu bạn đi đâu?','도서관에 가요.','Doseogwane gayo.','Tôi đến thư viện.'],
    ['매주 화요일에 어디에 가요?','Maeju hwayoire eodie gayo?','Mỗi thứ ba bạn đi đâu?','발레 학원에 가요.','Balle hagwone gayo.','Tôi đến lớp ba lê.'],
    ['매일 아침에 어디에 가요?','Maeil achime eodie gayo?','Mỗi sáng bạn đi đâu?','학교에 가요.','Hakgyoe gayo.','Tôi đến trường.'],
    ['이번 주말에 어디에 가요?','Ibeon jumare eodie gayo?','Cuối tuần này bạn đi đâu?','할머니 집에 가요.','Halmeoni jibe gayo.','Tôi đến nhà bà.'],
  ].map(([text,roma,meaning,a,ar,am])=>({question:line(text,roma,meaning),answer:line(a,ar,am)}));
  const speaking=[
    {question:line('오늘은 무슨 요일이에요?','Oneureun museun yoirieyo?','Hôm nay là thứ mấy?'),answer:line('오늘은 월요일이에요.','Oneureun woryoirieyo.','Hôm nay là thứ hai. (Mẫu; đổi theo ngày thực tế.)')},
    {question:line('주말에 뭘 해요?','Jumare mwol haeyo?','Cuối tuần bạn làm gì? Nói hai hoạt động.'),answer:line('책을 읽어요. 그리고 산책을 해요.','Chaegeul ilgeoyo. Geurigo sanchaegeul haeyo.','Tôi đọc sách. Và đi dạo.')},
    {question:line('무슨 요일을 좋아해요?','Museun yoireul joahaeyo?','Bạn thích thứ mấy?'),answer:line('토요일을 좋아해요.','Toyoireul joahaeyo.','Tôi thích thứ bảy.')},
    {question:line('언제 학교에 가요?','Eonje hakgyoe gayo?','Khi nào bạn đến trường?'),answer:grammar[2].examples[1]},
    {question:line('뭘 배워요?','Mwol baewoyo?','Bạn học gì?'),answer:line('한국어를 배워요.','Hangugeoreul baewoyo.','Tôi học tiếng Hàn.')},
  ];
  const sourceNotes=[
    '30 mục ở bảng từ vựng trang 3–8, trong đó có từ đã học; 13 mục bổ trợ lấy từ các trang còn lại. Nhãn ôn tập không tính thành kiến thức hoàn toàn mới.',
    'Trang 13: câu có 오늘 (oneul · hôm nay) cần để trống, dù hướng dẫn nguồn chỉ cho 에/에서. Web bổ sung lựa chọn “Không thêm”.',
    'Trang 12: 집에서 가요 (jibeseo gayo) có thể hiểu là đi từ nhà. Bài sửa trên web nêu rõ nghĩa cần nói “về nhà” để chọn 집에 가요 (jibe gayo).',
    'Trang 25–27 dùng lời hướng dẫn tiếng Việt nhắc tuần đã qua, nhưng câu mẫu tiếng Hàn ở hiện tại. Hoạt động trên web luyện lịch thường lệ; chưa thêm ngữ pháp quá khứ.',
    'Không kèm file audio gốc. Nút nghe sử dụng giọng tiếng Hàn tổng hợp của trình duyệt. Phiên âm hỗ trợ đọc, không thay thế việc nghe.',
  ];
  const slideRows=[
    ['Mỗi thứ bảy đến thư viện','Câu chủ đề của Bài 7.','grammar',['weekly','day5','library']],
    ['Lộ trình bài học','Từ vựng, ngữ pháp, luyện tập và vận dụng.','vocab',[]],
    ['Bảy ngày trong tuần','Đọc tên thứ từ thứ hai đến chủ nhật.','vocab',days.map((_,i)=>`day${i}`)],
    ['Các buổi trong ngày','Sáng, AM, PM, tối và đêm.','vocab',['morning','am','pm','evening','night']],
    ['Địa điểm 1','Lớp học thêm, bể bơi, công ty.','vocab',['academy','pool','company']],
    ['Địa điểm 2','Mẫu giáo, nhà thi đấu, núi.','vocab',['kindergarten','gym','mountain']],
    ['Nhịp sinh hoạt 1','Một tuần, từ–đến, mỗi ngày, thường, rẻ, cuối tuần.','vocab',['week','range','daily','usually','cheap','weekend']],
    ['Nhịp sinh hoạt 2','Mỗi tuần, sớm, ngủ, thứ nào, khi nào, lần này.','vocab',['weekly','early','sleep','which','when','this']],
    ['Đích đến với 에','Địa điểm + 에 가요 (e gayo · đi đến).','grammar',['school','home']],
    ['Thời gian với 에','Thứ/buổi + 에 (e); các từ thời gian không thêm 에.','grammar',['day1','day5','pm']],
    ['Sắp xếp câu','5 câu ghép mảnh tương tác.','practice',[]],
    ['Sửa lỗi trong câu','5 câu tự sửa, kèm giải thích và câu mẫu.','practice',[]],
    ['Chọn tiểu từ','10 câu: 에 / 에서 (e / eseo) hoặc không thêm.','practice',[]],
    ['Dịch Việt → Hàn','5 câu tự viết có phiên âm mẫu.','practice',[]],
    ['Khu phố của Noa','Nhìn tranh gọi tên địa điểm quanh nhà.','week',['school','kindergarten','library','pool','park']],
    ['Nhớ các ngày','Chạm từng thứ trên lịch để luyện đọc theo thứ tự.','week',days.map((_,i)=>`day${i}`)],
    ['Hoạt động cuối tuần','Tự chọn hoạt động đã học; luyện nói theo mẫu.','week',['borrow','library']],
    ['Một tuần của gia đình Noa','14 câu đọc có phiên âm; 4 câu đúng/sai.','reading',[]],
    ['Noa thích ngày nào?','Đọc hiểu về cuối tuần.','practice',['weekend','day5','day6']],
    ['Noa đi đâu và làm gì?','Phân biệt lịch của Noa và Mina.','practice',['koreanschool','comic','story','park']],
    ['Lịch của bạn','Chọn thứ, địa điểm và ghép câu của mình.','week',[]],
    ['Hỏi khi nào','4 cặp hỏi đáp hoạt động và thời gian.','practice',['when']],
    ['Hỏi đi đâu','4 cặp hỏi đáp địa điểm và thời gian.','practice',['ballet','library']],
    ['Lịch tuần của Minsu','Đọc tranh gốc, hỏi ngày đi bơi; đối chiếu mẫu bên dưới.','week',['day0','day2','pool']],
    ['Viết lịch cá nhân','Dùng bộ ghép câu để ghi lịch thường lệ.','week',[]],
    ['Hỏi bạn về lịch tuần','Đổi vai hỏi ngày và hoạt động; không giới thiệu thì quá khứ.','week',[]],
    ['So sánh lịch với bạn','Hỏi buổi sáng/chiều rồi đối chiếu lịch.','week',[]],
    ['Khu phố của nhóm','Chọn địa điểm, lập bảng đi đâu và khi nào.','reading',[]],
    ['Vẽ bản đồ khu phố','Xem tranh gốc, gọi tên và giới thiệu các địa điểm.','reading',[]],
    ['Giới thiệu khu phố','5 câu có phiên âm, nghĩa và nút nghe.','reading',[]],
    ['Trò chơi luyện nói','Bản gốc là trò chơi bàn cờ theo nhóm; web chuyển thành thẻ hỏi đáp để tự luyện.','week',[]],
  ];
  window.KOREAN_LESSON_SEVEN={
    title:'매주 토요일에 도서관에 가요.',romanization:'Maeju toyoire doseogwane gayo.',meaning:'Mỗi thứ bảy tôi đến thư viện.',
    vocabulary,words,days,periods,routines,buildRoutine,grammar,reading,community,conversations,speaking,sourceNotes,
    workbook:{sections:[
      {id:'order',title:'Trang 11 · Sắp xếp câu',type:'order',note:'Bấm các mảnh từ để ghép, bấm lại mảnh đã ghép để gỡ. Câu của bạn được đối chiếu với mẫu.',items:orders},
      {id:'corrections',title:'Trang 12 · Sửa câu',type:'open',note:'Đọc nghĩa cần diễn đạt trước khi sửa. Đáp án mở không chấm bằng so khớp máy móc.',items:corrections},
      {id:'particles',title:'Trang 13 · Chọn tiểu từ',type:'choice',note:'Phân biệt thời gian/đích đến, nơi hành động và từ không cần gắn tiểu từ.',items:particles},
      {id:'translate',title:'Trang 14 · Tự viết',type:'open',note:'Viết câu tiếng Hàn, rồi xem phiên âm và giải thích mẫu.',items:translate},
      {id:'reading',title:'Trang 18 · Đúng hay sai?',type:'choice',note:'Đối chiếu lịch trong bài đọc, không suy đoán thêm hoạt động.',items:trueFalse},
      {id:'weekend',title:'Trang 19–20 · Cuối tuần của Noa',type:'choice',note:'Chọn đáp án theo đoạn đọc.',items:weekend},
      {id:'conversation',title:'Trang 22–23 · Hỏi đáp',type:'open',note:'Viết câu trả lời theo gợi ý tiếng Việt. Đổi vai đọc câu hỏi và đáp án.',items:conversations.map(c=>({prompt:c.question.text,promptRomanization:c.question.romanization,meaning:`${c.question.meaning} → Gợi ý: ${c.answer.meaning}`,sample:c.answer,explanation:'Mẫu theo gợi ý trong tài liệu. Có thể nhắc lại toàn bộ cụm thời gian trong câu trả lời.'}))},
    ]},
    slides:slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
