// Source: Bài 10.pdf (29 pages). Missing audio is not replaced with invented answers.
(() => {
  'use strict';
  const line=(text,romanization,meaning)=>({text,romanization,meaning});
  const vocabulary=[
    ['spring','봄','bom','Mùa xuân','🌸',3,'seasons'],
    ['summer','여름','yeoreum','Mùa hè','☀️',3,'seasons'],
    ['autumn','가을','gaeul','Mùa thu','🍂',3,'seasons'],
    ['winter','겨울','gyeoul','Mùa đông','❄️',3,'seasons'],
    ['cloudy','흐리다','heurida','Âm u; nhiều mây','☁️',4,'weather'],
    ['cold','춥다','chupda','Lạnh (thời tiết, cảm giác lạnh)','🧣',4,'weather'],
    ['hot','덥다','deopda','Nóng (thời tiết, cảm giác nóng)','🌡️',4,'weather'],
    ['snow','눈이 오다','nuni oda','Tuyết rơi','🌨️',4,'weather'],
    ['rain','비가 오다','biga oda','Trời mưa','🌧️',5,'weather'],
    ['cool','시원하다','siwonhada','Mát mẻ; dễ chịu','🍃',5,'weather'],
    ['warm','따뜻하다','ttatteutada','Ấm áp','🌤️',5,'weather'],
    ['wind','바람이 불다','barami bulda','Gió thổi','💨',5,'weather'],
    ['season','계절','gyejeol','Mùa','🗓️',6,'other'],
    ['australia','호주','hoju','Nước Úc','🇦🇺',6,'other',2],
    ['sydney','시드니','sideuni','Sydney','🏙️',6,'other'],
    ['newyork','뉴욕','nyuyok','New York','🏙️',6,'other'],
    ['london','런던','reondeon','London','🏙️',6,'other'],
    ['snowfight','눈싸움을 하다','nunssaumeul hada','Chơi ném tuyết','⛄',6,'other'],
    ['bloom','꽃이 피다','kkochi pida','Hoa nở','🌷',6,'other'],
    ['flowertrip','꽃구경을 가다','kkotgugyeongeul gada','Đi ngắm hoa','🌸',7,'other'],
    ['heavy','무겁다','mugeopda','Nặng','📚',7,'other'],
    ['light','가볍다','gabyeopda','Nhẹ','🪶',7,'other'],
    ['fun','즐겁다','jeulgeopda','Vui vẻ; vui thích','🎉',7,'other'],
    ['snowman','눈사람','nunsaram','Người tuyết','☃️',7,'other'],
    ['scary','무섭다','museopda','Đáng sợ; sợ (tùy chủ thể/ngữ cảnh)','👻',7,'other'],
    ['easy','쉽다','swipda','Dễ','👌',7,'other'],
    ['difficult','어렵다','eoryeopda','Khó','🧩',8,'other'],
    ['thunder','천둥번개가 치다','cheondungbeongaega chida','Có sấm chớp','⛈️',8,'other'],
    ['tornado','토네이도','toneido','Lốc xoáy','🌪️',8,'other'],
    ['cute','귀엽다','gwiyeopda','Đáng yêu','🧸',8,'other'],
    ['narrow','좁다','jopda','Hẹp','↔️',10,'support',4],
    ['wear','입다','ipda','Mặc','👕',10,'support',5],
    ['chew','씹다','ssipda','Nhai','🍴',10,'support'],
    ['catch','잡다','japda','Nắm; bắt','✋',10,'support'],
    ['weather','날씨','nalssi','Thời tiết','🌦️',13,'support'],
    ['tv','텔레비전','tellebijeon','Ti vi','📺',21,'support'],
    ['teddy','곰인형','gominhyeong','Gấu bông','🧸',25,'support'],
    ['mapletrip','단풍구경을 가다','danpunggugyeongeul gada','Đi ngắm lá thu','🍁',29,'support'],
    ['sportsday','운동회를 하다','undonghoereul hada','Tổ chức/tham gia ngày hội thể thao','🏅',29,'support'],
    ['valley','계곡에서 놀다','gyegogeseo nolda','Chơi ở thung lũng, khe suối','🏞️',29,'support'],
    ['seaside','바닷가에 가다','badatgae gada','Đi đến bờ biển','🏖️',29,'support'],
    ['picnic','공원에 소풍을 가다','gongwone sopungeul gada','Đi dã ngoại ở công viên','🧺',29,'support'],
    ['flowerwatch','꽃구경을 하다','kkotgugyeongeul hada','Ngắm hoa','🌸',29,'support'],
    ['bingsu','팥빙수','patbingsu','Đá bào đậu đỏ','🍧',29,'support'],
    ['samgyetang','삼계탕','samgyetang','Canh gà hầm nhân sâm','🍲',29,'support'],
    ['hwajeon','화전','hwajeon','Bánh hoa áp chảo','🌸',29,'support'],
    ['springgreens','봄나물','bomnamul','Rau mùa xuân','🥬',29,'support'],
    ['sweetpotato','군고구마','gungoguma','Khoai lang nướng','🍠',29,'support'],
    ['fishbread','붕어빵','bungeoppang','Bánh hình cá','🐟',29,'support'],
    ['persimmon','감','gam','Quả hồng','🍊',29,'support'],
    ['pear','배','bae','Quả lê','🍐',29,'support'],
    ['apple','사과','sagwa','Quả táo','🍎',29,'support',2],
    ['songpyeon','송편','songpyeon','Bánh gạo Songpyeon','🥟',29,'support'],
  ].map(([id,text,romanization,meaning,emoji,page,group,review])=>({id,text,romanization,meaning,emoji,page,group,review,core:group!=='support'}));
  const words=Object.fromEntries(vocabulary.map(w=>[w.id,w]));
  const forms=[
    ['cold','추워요','chuwoyo','추 + 우 + 어요 → 추워요',true],
    ['hot','더워요','deowoyo','더 + 우 + 어요 → 더워요',true],
    ['heavy','무거워요','mugeowoyo','무거 + 우 + 어요 → 무거워요',true],
    ['light','가벼워요','gabyeowoyo','가벼 + 우 + 어요 → 가벼워요',true],
    ['fun','즐거워요','jeulgeowoyo','즐거 + 우 + 어요 → 즐거워요',true],
    ['scary','무서워요','museowoyo','무서 + 우 + 어요 → 무서워요',true],
    ['easy','쉬워요','swiwoyo','쉬 + 우 + 어요 → 쉬워요',true],
    ['difficult','어려워요','eoryeowoyo','어려 + 우 + 어요 → 어려워요',true],
    ['cute','귀여워요','gwiyeowoyo','귀여 + 우 + 어요 → 귀여워요',true],
    ['narrow','좁아요','jobayo','좁 + 아요 → 좁아요',false],
    ['wear','입어요','ibeoyo','입 + 어요 → 입어요',false],
    ['chew','씹어요','ssibeoyo','씹 + 어요 → 씹어요',false],
    ['catch','잡아요','jabayo','잡 + 아요 → 잡아요',false],
  ].map(([id,present,presentRoma,rule,irregular])=>({...words[id],present,presentRoma,rule,irregular}));
  const progressive=[
    ['읽다','ikda','Đọc','읽고 있어요','ikgo isseoyo'],
    ['타다','tada','Đi; cưỡi phương tiện','타고 있어요','tago isseoyo'],
    ['하다','hada','Làm','하고 있어요','hago isseoyo'],
    ['가다','gada','Đi','가고 있어요','gago isseoyo'],
    ['공부하다','gongbuhada','Học bài','공부하고 있어요','gongbuhago isseoyo'],
    ['먹다','meokda','Ăn','먹고 있어요','meokgo isseoyo'],
    ['보다','boda','Xem','보고 있어요','bogo isseoyo'],
    ['걷다','geotda','Đi bộ','걷고 있어요','geotgo isseoyo'],
  ].map(([text,romanization,meaning,present,presentRoma])=>({text,romanization,meaning,present,presentRoma}));
  const grammar=[
    {title:'Bất quy tắc ㅂ · bieup',formula:'ㅂ → 우 + 어요 → 워요 · u + eoyo → woyo',explanation:'Với các từ bất quy tắc trong bài, bỏ batchim ㅂ trước đuôi bắt đầu bằng nguyên âm, thêm 우 rồi ghép đuôi. Không áp dụng cho mọi từ có ㅂ. Đây là nhóm từ cần ghi nhớ, không chỉ nhìn nguyên âm trước ㅂ để đoán.',examples:[line('제 동생은 귀여워요.','Je dongsaengeun gwiyeowoyo.','Em tôi đáng yêu.'),line('이번 여름은 더워요.','Ibeon yeoreumeun deowoyo.','Mùa hè này nóng.')]},
    {title:'Những từ vẫn giữ ㅂ',formula:'좁아요 · jobayo / 입어요 · ibeoyo',explanation:'좁다 (jopda · hẹp), 입다 (ipda · mặc), 씹다 (ssipda · nhai), 잡다 (japda · nắm/bắt) là các từ quy tắc trong slide: giữ ㅂ rồi thêm 아/어요. Bảng chọn bên dưới giúp so sánh hai nhóm.',examples:[line('방이 좁아요.','Bangi jobayo.','Phòng hẹp.'),line('옷을 입어요.','Oseul ibeoyo.','Tôi mặc quần áo.')]},
    {title:'Đang làm gì?',formula:'Thân V + 고 있어요 · go isseoyo · đang…',explanation:'Bỏ 다 (da) của động từ, thêm 고 있어요. Bài này dùng để nói hành động đang diễn ra. Không gắn máy móc vào tính từ thời tiết: nói 추워요 (chuwoyo · lạnh), không nói 춥고 있어요. Đuôi 고 bắt đầu bằng phụ âm nên 걷다 giữ ㄷ: 걷고 있어요 (geotgo isseoyo · đang đi bộ).',examples:[line('자전거를 타고 있어요.','Jajeongeoreul tago isseoyo.','Tôi đang đi xe đạp.'),line('지금 책을 읽고 있어요.','Jigeum chaegeul ikgo isseoyo.','Bây giờ tôi đang đọc sách.')]},
  ];
  const weather=[
    ['cloudy','날씨가 흐려요.','Nalssiga heuryeoyo.','Trời nhiều mây.'],['cold','날씨가 추워요.','Nalssiga chuwoyo.','Trời lạnh.'],['hot','날씨가 더워요.','Nalssiga deowoyo.','Trời nóng.'],['snow','눈이 오고 있어요.','Nuni ogo isseoyo.','Tuyết đang rơi.'],['rain','비가 오고 있어요.','Biga ogo isseoyo.','Trời đang mưa.'],['cool','날씨가 시원해요.','Nalssiga siwonhaeyo.','Trời mát mẻ.'],['warm','날씨가 따뜻해요.','Nalssiga ttatteutaeyo.','Trời ấm áp.'],['wind','바람이 불고 있어요.','Barami bulgo isseoyo.','Gió đang thổi.'],
  ].map(([id,...s])=>({id,emoji:words[id].emoji,...line(...s)}));
  const cities=[
    {id:'london',prefix:'런던은',roma:'Reondeoneun',country:line('영국','yeongguk','Anh'),number:1},
    {id:'sydney',prefix:'시드니는',roma:'Sideunineun',country:words.australia,number:2},
    {id:'newyork',prefix:'뉴욕은',roma:'Nyuyogeun',country:line('미국','miguk','Mỹ'),number:3},
  ].map(c=>({...words[c.id],...c}));
  function forecast(cityIndex,weatherIndex){const c=cities[cityIndex],w=weather[weatherIndex];if(!c||!w)throw new RangeError('Lựa chọn ngoài bài');return line(`${c.prefix} 지금 ${w.text}`,`${c.roma} jigeum ${w.romanization[0].toLowerCase()+w.romanization.slice(1)}`,`Ở ${c.meaning} bây giờ: ${w.meaning.toLowerCase()}`);}
  const seasons=[
    ['spring','봄을','bomeul','봄에는 꽃이 많이 피어요.','Bomeneun kkochi mani pieoyo.','Mùa xuân có nhiều hoa nở.','꽃구경을 하고 있어요.','Kkotgugyeongeul hago isseoyo.','Tôi đang ngắm hoa.'],
    ['summer','여름을','yeoreumeul','여름에는 날씨가 더워요.','Yeoreumeneun nalssiga deowoyo.','Mùa hè trời nóng.','바다에서 수영하고 있어요.','Badaeseo suyeonghago isseoyo.','Tôi đang bơi ở biển.'],
    ['autumn','가을을','gaeureul','가을에는 날씨가 시원해요.','Gaeureneun nalssiga siwonhaeyo.','Mùa thu trời mát.','단풍구경을 하고 있어요.','Danpunggugyeongeul hago isseoyo.','Tôi đang ngắm lá thu.'],
    ['winter','겨울을','gyeoureul','겨울에는 눈이 와요.','Gyeoureneun nuni wayo.','Mùa đông có tuyết rơi.','눈싸움을 하고 있어요.','Nunssaumeul hago isseoyo.','Tôi đang chơi ném tuyết.'],
  ].map(([id,object,objectRoma,a,b,c,e,f,g])=>({...words[id],intro:line(`저는 ${object} 좋아해요.`,`Jeoneun ${objectRoma} joahaeyo.`,`Tôi thích ${words[id].meaning.toLowerCase()}.`),description:line(a,b,c),activity:line(e,f,g)}));
  // Full dialogue, grouped by the ten speaker turns in the source.
  const reading=[
    ['Yuna','거기는 오늘 날씨가 어때요?','Geogineun oneul nalssiga eottaeyo?','Hôm nay thời tiết ở đó thế nào?'],
    ['Ella','조금 더워요. 호주는 12월이 여름이에요.','Jogeum deowoyo. Hojuneun sibiwori yeoreumieyo.','Hơi nóng. Ở Úc, tháng 12 là mùa hè.'],
    ['Yuna','아, 그래요? 여기 뉴욕은 지금 겨울이에요.','A, geuraeyo? Yeogi nyuyogeun jigeum gyeourieyo.','À, vậy sao? Ở đây, New York hiện là mùa đông.'],
    ['Ella','뭘 하고 있어요?','Mwol hago isseoyo?','Bạn đang làm gì?'],
    ['Yuna','오늘은 날씨가 흐려요. 그리고 밖에 비가 오고 있어요. 그래서 집에서 텔레비전을 보고 있어요.','Oneureun nalssiga heuryeoyo. Geurigo bakke biga ogo isseoyo. Geuraeseo jibeseo tellebijeoneul bogo isseoyo.','Hôm nay trời nhiều mây. Bên ngoài đang mưa. Vì vậy tôi đang xem ti vi ở nhà.'],
    ['Ella','지금 많이 추워요?','Jigeum mani chuwoyo?','Bây giờ có lạnh lắm không?'],
    ['Yuna','아니요, 오늘은 안 추워요. 바람은 많이 불어요. 그런데 어느 계절을 좋아해요?','Aniyo, oneureun an chuwoyo. Barameun mani bureoyo. Geureonde eoneu gyejeoreul joahaeyo?','Không, hôm nay không lạnh. Nhưng gió thổi nhiều. Mà bạn thích mùa nào?'],
    ['Ella','저는 가을을 좋아해요. 가을은 시원해요.','Jeoneun gaeureul joahaeyo. Gaeureun siwonhaeyo.','Tôi thích mùa thu. Mùa thu mát mẻ.'],
    ['Yuna','저는 겨울을 좋아해요. 뉴욕은 겨울에 눈이 많이 와요. 저는 겨울 방학에 친구들하고 같이 눈사람을 만들 거예요.','Jeoneun gyeoureul joahaeyo. Nyuyogeun gyeoure nuni mani wayo. Jeoneun gyeoul banghage chingudeulhago gachi nunsarameul mandeul geoyeyo.','Tôi thích mùa đông. Ở New York, mùa đông có nhiều tuyết. Kỳ nghỉ đông tôi sẽ làm người tuyết cùng bạn bè.'],
    ['Ella','저는 이번 크리스마스에 가족하고 같이 바다에서 수영할 거예요.','Jeoneun ibeon keuriseumaseue gajokhago gachi badaeseo suyeonghal geoyeyo.','Giáng sinh này tôi sẽ bơi ở biển cùng gia đình.'],
  ].map(([speaker,...s])=>({speaker,...line(...s)}));
  const progressivePrompts=[
    ['지금 저는 책을 ___.','Jigeum jeoneun chaegeul ___.','Bây giờ tôi đang đọc sách.'],['민수는 자전거를 ___.','Minsuneun jajeongeoreul ___.','Minsu đang đi xe đạp.'],['아이들이 눈싸움을 ___.','Aideuri nunssaumeul ___.','Các em nhỏ đang chơi ném tuyết.'],['우리는 꽃구경을 ___.','Urineun kkotgugyeongeul ___.','Chúng tôi đang đi ngắm hoa.'],['학생들이 한국어를 ___.','Haksaengdeuri hangugeoreul ___.','Các học sinh đang học tiếng Hàn.'],['엄마는 밥을 ___.','Eommaneun babeul ___.','Mẹ đang ăn cơm.'],['아버지는 TV를 ___.','Abeojineun tibireul ___.','Bố đang xem ti vi.'],['친구들이 공원에서 ___.','Chingudeuri gongwoneseo ___.','Các bạn đang đi bộ trong công viên.'],
  ].map(([prompt,promptRomanization,meaning],i)=>{const f=progressive[i];return {prompt,promptRomanization,meaning:`${meaning} · Từ gợi ý: ${f.text} (${f.romanization})`,answers:[f.present],sample:line(prompt.replace('___',f.present),promptRomanization.replace('___',f.presentRoma),meaning),explanation:`Dùng ${f.text} (${f.romanization} · ${f.meaning.toLowerCase()}) + 고 있어요 (go isseoyo). Chỉ nhập phần còn thiếu.${i===7?' Giữ ㄷ trước 고, không đổi thành ㄹ.':''}`};});
  const irregularPrompts=[
    ['오늘은 바람이 불어서 ___.','Oneureun barami bureoseo ___.','Hôm nay vì gió thổi nên lạnh.','cold'],['강아지가 정말 ___.','Gangajiga jeongmal ___.','Chú cún thật đáng yêu.','cute'],['여름에는 날씨가 ___.','Yeoreumeneun nalssiga ___.','Mùa hè trời nóng.','hot'],['한국어는 조금 ___.','Hangugeoneun jogeum ___.','Tiếng Hàn hơi khó.','difficult'],
  ].map(([prompt,promptRomanization,meaning,id])=>{const f=forms.find(f=>f.id===id);return {prompt,promptRomanization,meaning:`${meaning} · Từ gợi ý: ${f.text} (${f.romanization})`,answers:[f.present],sample:line(prompt.replace('___',f.present),promptRomanization.replace('___',f.presentRoma),meaning),explanation:`${f.text} (${f.romanization}) thuộc nhóm ㅂ bất quy tắc; đổi thành ${f.present} (${f.presentRoma}).`};});
  const choice=(prompt,promptRomanization,meaning,options,answers,explanation)=>({prompt,promptRomanization,meaning,options:options.map(o=>line(...o)),answers,sample:line(prompt.replace('___',answers[0]),promptRomanization.replace('___',options.find(o=>o[0]===answers[0])[1]),meaning),samples:Object.fromEntries(options.filter(o=>answers.includes(o[0])).map(o=>[o[0],line(prompt.replace('___',o[0]),promptRomanization.replace('___',o[1]),meaning)])),explanation});
  const choices=[
    choice('겨울은 날씨가 많이 ___.','Gyeoureun nalssiga mani ___.','Mùa đông trời rất lạnh (ngữ cảnh mùa đông Hàn Quốc trong bài).',[['더워요','deowoyo','Nóng'],['추워요','chuwoyo','Lạnh']],['추워요'],'Chọn lạnh theo ngữ cảnh bài, không phải khẳng định mọi nơi trên thế giới đều lạnh vào mùa đông.'),
    choice('봄에는 꽃이 ___.','Bomeneun kkochi ___.','Mùa xuân hoa nở.',[['펴요','pyeoyo','Nở · dạng rút gọn'],['피어요','pieoyo','Nở · dạng đầy đủ']],['펴요','피어요'],'Cả hai đều đúng: 피어요 có thể rút gọn thành 펴요. Không chấm sai một dạng hợp lệ.'),
    choice('지금 친구가 자전거를 ___.','Jigeum chinguga jajeongeoreul ___.','Bây giờ bạn đang đi xe đạp.',[['타고 있어요','tago isseoyo','Đang đi'],['타요','tayo','Đi; đang đi theo ngữ cảnh']],['타고 있어요','타요'],'Cả hai có thể dùng với 지금. Dạng 고 있어요 nhấn mạnh hành động đang diễn ra; bài này khuyến khích luyện dạng đó.'),
    choice('지금 학생들이 한국어를 ___.','Jigeum haksaengdeuri hangugeoreul ___.','Bây giờ các học sinh đang học tiếng Hàn.',[['공부하고 있어요','gongbuhago isseoyo','Đang học'],['공부해요','gongbuhaeyo','Học; đang học theo ngữ cảnh']],['공부하고 있어요','공부해요'],'Hiện tại đơn vẫn diễn tả được việc đang làm theo ngữ cảnh. Dạng 고 있어요 làm rõ nghĩa tiếp diễn.'),
    choice('눈이 와요. 그래서 아이들이 ___.','Nuni wayo. Geuraeseo aideuri ___.','Tuyết rơi. Vì vậy các em nhỏ chơi ném tuyết.',[['눈싸움을 하고 있어요','nunssaumeul hago isseoyo','Đang chơi ném tuyết'],['눈싸움을 해요','nunssaumeul haeyo','Chơi ném tuyết']],['눈싸움을 하고 있어요','눈싸움을 해요'],'Cả hai cách nói đều hợp ngữ cảnh. Đã bổ sung tiểu từ 이 sau 아이들 để câu rõ ràng hơn.'),
  ];
  const order=[
    [['날씨가','오늘','더워요'],['nalssiga','oneul','deowoyo'],'오늘 날씨가 더워요.','Oneul nalssiga deowoyo.','Hôm nay trời nóng.'],
    [['자전거를','타고','저는','있어요'],['jajeongeoreul','tago','jeoneun','isseoyo'],'저는 자전거를 타고 있어요.','Jeoneun jajeongeoreul tago isseoyo.','Tôi đang đi xe đạp.'],
    [['꽃이','봄에','피어요'],['kkochi','bome','pieoyo'],'봄에 꽃이 피어요.','Bome kkochi pieoyo.','Mùa xuân hoa nở.'],
    [['하고','친구들이','있어요','눈싸움을'],['hago','chingudeuri','isseoyo','nunssaumeul'],'친구들이 눈싸움을 하고 있어요.','Chingudeuri nunssaumeul hago isseoyo.','Các bạn đang chơi ném tuyết.'],
    [['공원에','꽃구경을','가고','우리는','있어요'],['gongwone','kkotgugyeongeul','gago','urineun','isseoyo'],'우리는 공원에 꽃구경을 가고 있어요.','Urineun gongwone kkotgugyeongeul gago isseoyo.','Chúng tôi đang đi ngắm hoa ở công viên.'],
    [['많이','겨울은','추워요'],['mani','gyeoureun','chuwoyo'],'겨울은 많이 추워요.','Gyeoureun mani chuwoyo.','Mùa đông rất lạnh.'],
  ].map(([tokens,tokenRoma,...s],i)=>({prompt:`Ghép câu ${i+1}`,meaning:s[2],tokens,tokenRoma,sample:line(...s),explanation:'Bấm các mảnh để ghép câu, sau đó đối chiếu. Trật tự cụm đầu câu có thể thay đổi.'}));
  const seasonOptions=['winter','spring','summer','autumn'].map(id=>words[id]);
  const seasonMatch=[
    ['눈이 와요.','Nuni wayo.','Có tuyết rơi.','winter'],['꽃이 피어요.','Kkochi pieoyo.','Hoa nở.','spring'],['날씨가 더워요.','Nalssiga deowoyo.','Trời nóng.','summer'],['날씨가 시원해요.','Nalssiga siwonhaeyo.','Trời mát.','autumn'],
  ].map(([prompt,promptRomanization,meaning,id])=>({prompt,promptRomanization,meaning,options:seasonOptions,answers:[words[id].text],sample:words[id],explanation:'Ghép theo bảng bốn mùa ở trang 16; đây là mô tả điển hình trong bài học.'}));
  const pictureMatch=[['winter','1'],['spring','2'],['summer','3']].map(([id,n])=>({prompt:`Trang 18 · Tranh số ${n} thuộc mùa nào?`,image:'assets/korean/lesson-10/slides/slide-18.jpg',options:seasonOptions,answers:[words[id].text],sample:words[id],explanation:'Theo tranh người tuyết, hoa nở và bãi biển. Tranh mùa thu ở trên là ví dụ có sẵn.'}));
  const tfOptions=[line('O','','Đúng theo bài'),line('X','','Sai theo bài')];
  const tf=[
    ['미국하고 호주는 12월이 겨울이에요.','Migukhago hojuneun sibiwori gyeourieyo.','Ở Mỹ và Úc, tháng 12 đều là mùa đông.','X','Ella nói tháng 12 ở Úc là mùa hè; Yuna ở New York đang có mùa đông.'],
    ['오늘 뉴욕은 날씨가 흐려요. 그리고 비가 와요.','Oneul nyuyogeun nalssiga heuryeoyo. Geurigo biga wayo.','Hôm nay New York nhiều mây và mưa.','O','Yuna nói trời nhiều mây và ngoài trời đang mưa. Đây là thời tiết trong hội thoại, không phải dự báo trực tiếp.'],
    ['뉴욕은 오늘 아주 추워요. 그리고 바람도 많이 불어요.','Nyuyogeun oneul aju chuwoyo. Geurigo baramdo mani bureoyo.','Hôm nay New York rất lạnh và nhiều gió.','X','Gió thổi nhiều nhưng Yuna nói hôm nay không lạnh.'],
  ].map(([prompt,promptRomanization,meaning,a,explanation])=>({prompt,promptRomanization,meaning,options:tfOptions,answers:[a],sample:line(prompt,promptRomanization,meaning),explanation}));
  const preferences=[['Ella','autumn',7],['Yuna','winter',8]].map(([name,id,i])=>({prompt:`${name} thích mùa nào?`,options:seasonOptions,answers:[words[id].text],sample:reading[i],explanation:'Chọn theo lời nhân vật ở trang 21–22.'}));
  const plans=[
    ['Yuna','눈사람을 만들 거예요.','Nunsarameul mandeul geoyeyo.','Sẽ làm người tuyết.'],
    ['Ella','바다에서 수영할 거예요.','Badaeseo suyeonghal geoyeyo.','Sẽ bơi ở biển.'],
  ].map(([name,...s])=>({prompt:`${name} dự định làm gì trong dịp nghỉ được kể?`,options:[line('눈사람을 만들 거예요.','Nunsarameul mandeul geoyeyo.','Sẽ làm người tuyết.'),line('크리스마스 파티를 할 거예요.','Keuriseumaseu patireul hal geoyeyo.','Sẽ tổ chức tiệc Giáng sinh.'),line('눈싸움을 할 거예요.','Nunssaumeul hal geoyeyo.','Sẽ chơi ném tuyết.'),line('바다에서 수영할 거예요.','Badaeseo suyeonghal geoyeyo.','Sẽ bơi ở biển.')],answers:[s[0]],sample:line(...s),explanation:'Không suy ra mùa đông ở cả hai nơi: Yuna nói kỳ nghỉ đông; Giáng sinh của Ella ở Úc là mùa hè.'}));
  const speaking=[
    ['곰인형이 어때요?','Gominhyeongi eottaeyo?','Gấu bông thế nào?','곰인형이 귀여워요.','Gominhyeongi gwiyeowoyo.','Gấu bông đáng yêu.'],
    ['생일 파티가 어때요?','Saengil patiga eottaeyo?','Tiệc sinh nhật thế nào?','생일 파티가 즐거워요.','Saengil patiga jeulgeowoyo.','Tiệc sinh nhật rất vui.'],
    ['영화가 무서워요?','Yeonghwaga museowoyo?','Bộ phim có đáng sợ không?','아니요, 안 무서워요.','Aniyo, an museowoyo.','Không, không đáng sợ.'],
    ['한국어가 쉬워요?','Hangugeoga swiwoyo?','Tiếng Hàn có dễ không?','아니요, 어려워요.','Aniyo, eoryeowoyo.','Không, khó.'],
  ].map(([prompt,promptRomanization,meaning,...s])=>({prompt,promptRomanization,meaning,sample:line(...s),explanation:'Nói theo cảm nhận của bạn; câu mẫu không phải đáp án duy nhất. Dùng dạng lịch sự của từ có ㅂ.'}));
  const park=[
    ['노엘','Noel','노엘은 아이스크림을 먹고 있어요.','Noereun aiseukeurimeul meokgo isseoyo.','Noel đang ăn kem.'],
    ['민석','Minseok','민석은 책을 읽고 있어요.','Minseogeun chaegeul ikgo isseoyo.','Minseok đang đọc sách.'],
    ['세라','Sera','세라는 꽃 사진을 찍고 있어요.','Seraneun kkot sajineul jjikgo isseoyo.','Sera đang chụp ảnh hoa.'],
    ['다니엘','Daniel','다니엘은 물을 마시고 있어요.','Daniereun mureul masigo isseoyo.','Daniel đang uống nước.'],
  ].map(([name,roma,...s])=>({prompt:`${name}${name==='세라'?'가':'이'} 뭘 하고 있어요?`,promptRomanization:`${roma==='Noel'?'Noeri':roma==='Minseok'?'Minseogi':roma==='Sera'?'Seraga':'Danieri'} mwol hago isseoyo?`,meaning:`${roma} đang làm gì?`,image:'assets/korean/lesson-10/slides/slide-26.jpg',sample:line(...s),explanation:'Dựa vào tranh trang 26, dùng động từ + 고 있어요 (go isseoyo).'}));
  park[2].prompt='세라가 뭘 하고 있어요?';
  const weatherSpeaking=[
    ['뉴욕 날씨가 어때요?','Nyuyok nalssiga eottaeyo?','Thời tiết New York thế nào?','눈이 오고 있어요.','Nuni ogo isseoyo.','Tuyết đang rơi.'],
    ['오늘 날씨가 어때요?','Oneul nalssiga eottaeyo?','Hôm nay thời tiết thế nào?','바람이 많이 불고 있어요.','Barami mani bulgo isseoyo.','Gió đang thổi nhiều.'],
    ['지금 날씨가 어때요?','Jigeum nalssiga eottaeyo?','Bây giờ thời tiết thế nào?','천둥번개가 치고 있어요.','Cheondungbeongaega chigo isseoyo.','Đang có sấm chớp.'],
    ['거기 날씨가 어때요?','Geogi nalssiga eottaeyo?','Thời tiết ở đó thế nào?','토네이도가 오고 있어요.','Toneidoga ogo isseoyo.','Lốc xoáy đang đến.'],
  ].map(([prompt,promptRomanization,meaning,...s])=>({prompt,promptRomanization,meaning,image:'assets/korean/lesson-10/slides/slide-27.jpg',sample:line(...s),explanation:'Trả lời theo tranh tương ứng, không phải thời tiết thực tế. Gắn 고 있어요 vào động từ của cụm.'}));
  const culture=[
    ['winter',['스키를 타요.','Seukireul tayo.','Trượt tuyết.'],['눈사람을 만들어요.','Nunsarameul mandeureoyo.','Làm người tuyết.']],
    ['autumn',['단풍구경을 가요.','Danpunggugyeongeul gayo.','Đi ngắm lá thu.'],['운동회를 해요.','Undonghoereul haeyo.','Tổ chức/tham gia ngày hội thể thao.']],
    ['summer',['계곡에서 놀아요.','Gyegogeseo norayo.','Chơi ở khe suối.'],['바닷가에 가요.','Badatgae gayo.','Đi ra bờ biển.']],
    ['spring',['공원에 소풍을 가요.','Gongwone sopungeul gayo.','Đi dã ngoại ở công viên.'],['꽃구경을 해요.','Kkotgugyeongeul haeyo.','Ngắm hoa.']],
  ].map(([id,...rows])=>({id,lines:rows.map(s=>line(...s))}));
  const foodGroups=[['summer',['bingsu','samgyetang']],['spring',['hwajeon','springgreens']],['winter',['sweetpotato','fishbread']],['autumn',['persimmon','pear','apple','songpyeon']]];
  const cultureQuiz=[...culture.map(c=>({prompt:'Theo trang 29, nhóm hoạt động này gắn với mùa nào?',meaning:c.lines.map(s=>`${s.text} (${s.romanization}) · ${s.meaning}`).join(' / '),options:seasonOptions,answers:[words[c.id].text],sample:words[c.id],explanation:'Ghép theo hình minh họa trong tài liệu; hoạt động không bị giới hạn chỉ làm vào mùa này.'})),...foodGroups.map(([id,ids])=>({prompt:'Theo trang 29, nhóm món ăn này gắn với mùa nào?',meaning:ids.map(id=>`${words[id].text} (${words[id].romanization}) · ${words[id].meaning}`).join(' / '),options:seasonOptions,answers:[words[id].text],sample:words[id],explanation:'Đây là liên hệ mùa trong bài học, không có nghĩa món ăn chỉ được ăn vào mùa đó.'}))];
  const notes=[
    'Trang 9–11 và 17–29 bị chồng tiêu đề trong ảnh gốc; nội dung chữ được trình bày lại trong phần học, ảnh gốc vẫn giữ để đối chiếu.',
    'Trang 14 câu 2: 피어요 (pieoyo) và 펴요 (pyeoyo) đều đúng. Câu 3–5 chấp nhận cả hiện tại và tiếp diễn theo ngữ cảnh; phần luyện điền trang 12 yêu cầu riêng 고 있어요 nên cần dùng đúng cấu trúc đó.',
    'Trang 19 thiếu audio/transcript cho Steve và Nicole. Chỉ biết ví dụ Suji là số 3 (New York); không suy đoán hai đáp án còn lại. Mục thời tiết dùng câu mới để luyện, không giả làm đáp án của audio gốc.',
    'Trang 23 dùng lời dẫn “mùa đông này”, nhưng Ella sống ở Úc và nói đi bơi vào Giáng sinh mùa hè. Bài luyện hỏi theo dịp nghỉ từng nhân vật để tránh nhầm.',
    'Quy tắc ㅂ → 우 là phạm vi nhóm từ trong bài. Có ngoại lệ khác ngoài bài; không dùng bảng này làm bộ chia tự động cho mọi từ tiếng Hàn.',
    'Nghe bằng giọng tổng hợp ko-KR của trình duyệt, không phải audio gốc. Lựa chọn thời tiết là giả định để học, không lấy dữ liệu dự báo hiện tại.',
  ];
  const slideRows=[
    ['Ở đây trời đang mưa','Câu chủ đề với cấu trúc đang diễn ra.','grammar',[]],['Lộ trình Bài 10','Từ vựng, ngữ pháp, luyện và vận dụng.','vocab',[]],
    ['Bốn mùa','Xuân, hạ, thu, đông.','vocab',['spring','summer','autumn','winter']],['Thời tiết 1','Nhiều mây, lạnh, nóng, tuyết.','vocab',['cloudy','cold','hot','snow']],['Thời tiết 2','Mưa, mát, ấm và gió.','vocab',['rain','cool','warm','wind']],
    ['Từ khác 1','Mùa, địa danh và hoạt động.','vocab',['season','australia','sydney','newyork','london','snowfight','bloom']],['Từ khác 2','Ngắm hoa, đặc điểm và người tuyết.','vocab',['flowertrip','heavy','light','fun','snowman','scary','easy']],['Từ khác 3','Khó, sấm chớp, lốc xoáy và đáng yêu.','vocab',['difficult','thunder','tornado','cute']],
    ['Bất quy tắc ㅂ','bieup · đổi trước đuôi nguyên âm trong nhóm bất quy tắc.','grammar',[]],['Nhóm vẫn giữ ㅂ','Bốn từ quy tắc và ví dụ.','grammar',['narrow','wear','chew','catch']],['Đang làm gì?','고 있어요 · go isseoyo · đang…','grammar',[]],
    ['Điền dạng tiếp diễn','8 câu nhập đáp án.','practice',[]],['Điền dạng bất quy tắc','4 câu nhập đáp án.','practice',[]],['Chọn cách diễn đạt','5 câu; chấp nhận nhiều đáp án khi hợp ngữ pháp.','practice',[]],['Ghép câu','6 câu sắp xếp mảnh từ.','practice',[]],['Nối mùa và thời tiết','4 câu chọn theo bảng nguồn.','practice',[]],
    ['Bản đồ địa danh','London, Sydney, New York.','weather',['london','sydney','newyork']],['Tranh bốn mùa','3 câu ghép, mùa thu là ví dụ cho sẵn.','practice',['winter','spring','summer']],['Nghe tên nơi sống','Thiếu audio cho Steve/Nicole: không dựng đáp án.','weather',[]],['Thời tiết chỗ bạn','Bộ chọn thành phố và thời tiết giả định.','weather',[]],
    ['Yuna và Ella gọi video','10 lượt thoại có phiên âm, nghĩa và nghe tổng hợp.','reading',[]],['Hai bạn thích mùa nào?','Mùa thu và mùa đông.','practice',[]],['Kế hoạch kỳ nghỉ','Làm người tuyết và bơi ở biển.','practice',[]],['Mùa yêu thích của bạn','Chọn mùa để tạo đoạn giới thiệu.','weather',[]],['Luyện nói với từ có ㅂ','4 tình huống, câu mẫu đối chiếu.','practice',[]],['Mọi người đang làm gì?','4 câu theo tranh công viên.','practice',[]],['Nói thời tiết đang diễn ra','4 câu theo tranh, không phải dự báo.','practice',[]],['Trình bày mùa yêu thích','Bộ tạo câu và ô tự viết, giữ trong phiên.','weather',[]],['Hoạt động và món ăn theo mùa','8 câu ghép theo hình văn hóa Hàn Quốc.','practice',['mapletrip','sportsday','valley','seaside','picnic','flowerwatch','bingsu','samgyetang','hwajeon','springgreens','sweetpotato','fishbread','persimmon','pear','apple','songpyeon']],
  ];
  window.KOREAN_LESSON_TEN={title:'여기는 비가 오고 있어요.',romanization:'Yeogineun biga ogo isseoyo.',meaning:'Ở đây trời đang mưa.',vocabulary,words,forms,progressive,grammar,weather,cities,forecast,seasons,reading,culture,foodGroups,notes,
    workbook:{sections:[
      {id:'progressive',title:'Trang 12 · Đang làm',type:'exact',note:'Chỉ nhập phần còn thiếu, dùng đuôi 고 있어요 (go isseoyo · đang).',items:progressivePrompts},
      {id:'irregular',title:'Trang 13 · Bất quy tắc ㅂ',type:'exact',note:'Chia từ theo đuôi lịch sự 아/어요 (a/eoyo).',items:irregularPrompts},
      {id:'choices',title:'Trang 14 · Chọn đáp án',type:'choice',note:'Một số câu có hai cách nói đúng. Chọn một rồi đọc giải thích.',items:choices},
      {id:'order',title:'Trang 15 · Ghép câu',type:'order',note:'Chọn mảnh từ, bấm lại để gỡ. So sánh với câu mẫu khi hoàn thành.',items:order},
      {id:'season',title:'Trang 16 · Mùa & thời tiết',type:'choice',note:'Chọn theo mô tả mùa điển hình trong bài học.',items:seasonMatch},
      {id:'pictures',title:'Trang 18 · Tranh bốn mùa',type:'choice',note:'Mùa thu là ví dụ cho sẵn; chọn mùa cho ba tranh được đánh số.',items:pictureMatch},
      {id:'tf',title:'Trang 21 · Đúng / sai',type:'choice',note:'Chọn theo đoạn hội thoại, không dùng thời tiết hiện tại.',items:tf},
      {id:'preferences',title:'Trang 22 · Mùa yêu thích',type:'choice',note:'Yuna và Ella thích mùa nào?',items:preferences},
      {id:'plans',title:'Trang 23 · Kế hoạch',type:'choice',note:'Chọn hoạt động từng bạn sẽ làm theo lời kể.',items:plans},
      {id:'speaking',title:'Trang 25 · Luyện nói ㅂ',type:'open',note:'Tự trả lời bằng từ chỉ đặc điểm; câu mẫu không phải đáp án duy nhất.',items:speaking},
      {id:'park',title:'Trang 26 · Trong công viên',type:'open',note:'Nhìn tranh và trả lời ai đang làm gì.',items:park},
      {id:'weather',title:'Trang 27 · Nói thời tiết',type:'open',note:'Trả lời theo hình của câu tương ứng, dùng dạng đang diễn ra.',items:weatherSpeaking},
      {id:'culture',title:'Trang 29 · Văn hóa bốn mùa',type:'choice',note:'Ghép theo tài liệu, gồm cả hai ví dụ có sẵn để ôn.',items:cultureQuiz},
    ]},slides:slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
