// Bài 9.pdf, 27 pages. Source images are preserved; corrections are documented.
(() => {
  'use strict';
  const line=(text,romanization,meaning)=>({text,romanization,meaning});
  const rows=[
    ['giraffe','기린','girin','Hươu cao cổ','🦒',3,'animals'],
    ['monkey','원숭이','wonsungi','Khỉ','🐒',3,'animals'],
    ['elephant','코끼리','kokkiri','Voi','🐘',3,'animals'],
    ['bear','곰','gom','Gấu','🐻',3,'animals'],
    ['lion','사자','saja','Sư tử','🦁',4,'animals'],
    ['rabbit','토끼','tokki','Thỏ','🐇',4,'animals'],
    ['tiger','호랑이','horangi','Hổ','🐅',4,'animals'],
    ['turtle','거북이','geobugi','Rùa','🐢',4,'animals'],
    ['aquarium','수족관','sujokgwan','Thủy cung','🐠',5,'places'],
    ['garden','식물원','singmurwon','Vườn thực vật','🌿',5,'places'],
    ['zoo','동물원','dongmurwon','Vườn thú','🦒',5,'places',8],
    ['amusement','놀이공원','norigongwon','Công viên giải trí','🎡',6,'places'],
    ['camp','캠핑장','kaempingjang','Khu cắm trại','⛺',6,'places'],
    ['waterpark','워터파크','woteopakeu','Công viên nước','🌊',6,'places'],
    ['feed','먹이를 주다','meogireul juda','Cho ăn; cho thức ăn','🥕',7,'activities'],
    ['enter','유령의 집에 들어가다','yuryeongui jibe deureogada','Vào nhà ma','🏠',7,'activities'],
    ['photo','사진을 찍다','sajineul jjikda','Chụp ảnh','📷',7,'activities',8],
    ['show','물개 쇼를 보다','mulgae syoreul boda','Xem biểu diễn hải cẩu','🦭',7,'activities'],
    ['touch','불가사리를 만지다','bulgasarireul manjida','Chạm vào sao biển','⭐',7,'activities'],
    ['summer','여름방학','yeoreumbanghak','Kỳ nghỉ hè','☀️',8,'other'],
    ['burger','햄버거','haembeogeo','Bánh hamburger','🍔',8,'other'],
    ['come','오다','oda','Đến','🚶',8,'other',5],
    ['video','동영상','dongyeongsang','Video; hình ảnh động','🎬',8,'other'],
    ['yesterday','어제','eoje','Hôm qua','📅',8,'other',5],
    ['running','달리기','dalligi','Chạy bộ; môn chạy (danh từ)','🏃',8,'other'],
    ['rest','쉬다','swida','Nghỉ ngơi','🛋️',9,'other','nền tảng'],
    ['keep','계속','gyesok','Liên tục; tiếp tục','➡️',9,'other'],
    ['hard','열심히','yeolsimhi','Chăm chỉ; hết sức (phó từ)','💪',9,'other'],
    ['arrive','도착하다','dochakada','Đến nơi','📍',9,'other'],
    ['first','먼저','meonjeo','Trước; trước tiên','①',9,'other'],
    ['carousel','회전목마','hoejeonmongma','Vòng quay ngựa gỗ','🎠',10,'support'],
    ['panda','판다','panda','Gấu trúc','🐼',23,'support'],
    ['rhino','코뿔소','koppulso','Tê giác','🦏',23,'support'],
    ['koala','코알라','koalla','Gấu túi koala','🐨',23,'support'],
    ['icecream','아이스크림','aiseukeurim','Kem','🍦',23,'support'],
    ['frisbee','프리스비','peuriseubi','Đĩa ném; trò ném đĩa','🥏',26,'support'],
    ['slide','미끄럼틀','mikkeureomteul','Cầu trượt','🛝',26,'support'],
    ['together','같이','gachi','Cùng nhau','🤝',10,'support'],
    ['animal','동물','dongmul','Động vật','🐾',17,'support'],
  ];
  const vocabulary=rows.map(([id,text,romanization,meaning,emoji,page,group,review])=>({id,text,romanization,meaning,emoji,page,group,review,core:group!=='support'}));
  const words=Object.fromEntries(vocabulary.map(w=>[w.id,w]));
  const forms=[
    ['힘들다','himdeulda','Mệt; vất vả','힘들었어요','himdeureosseoyo','힘들 + 었어요'],
    ['먹다','meokda','Ăn','먹었어요','meogeosseoyo','먹 + 었어요'],
    ['공부하다','gongbuhada','Học bài','공부했어요','gongbuhaesseoyo','공부하였어요 → 공부했어요','공부하였어요'],
    ['쉬다','swida','Nghỉ ngơi','쉬었어요','swieosseoyo','쉬 + 었어요'],
    ['만나다','mannada','Gặp','만났어요','mannasseoyo','만나 + 았어요 → 만났어요'],
    ['달리다','dallida','Chạy','달렸어요','dallyeosseoyo','달리 + 었어요 → 달렸어요'],
    ['도착하다','dochakada','Đến nơi','도착했어요','dochakaesseoyo','도착하였어요 → 도착했어요','도착하였어요'],
    ['찍다','jjikda','Chụp (ảnh)','찍었어요','jjigeosseoyo','찍 + 었어요'],
    ['가다','gada','Đi','갔어요','gasseoyo','가 + 았어요 → 갔어요'],
    ['만지다','manjida','Chạm; sờ','만졌어요','manjyeosseoyo','만지 + 었어요 → 만졌어요'],
    ['오다','oda','Đến','왔어요','wasseoyo','오 + 았어요 → 왔어요'],
    ['주다','juda','Cho','줬어요','jwosseoyo','주었어요 → 줬어요','주었어요'],
    ['보다','boda','Xem; nhìn','봤어요','bwasseoyo','보았어요 → 봤어요','보았어요'],
    ['타다','tada','Đi; cưỡi (phương tiện)','탔어요','tasseoyo','타 + 았어요 → 탔어요'],
    ['하다','hada','Làm','했어요','haesseoyo','하였어요 → 했어요','하였어요'],
    ['작다','jakda','Nhỏ','작았어요','jagasseoyo','작 + 았어요'],
    ['많다','manta','Nhiều','많았어요','manasseoyo','많 + 았어요'],
    ['재미있다','jaemiitda','Thú vị','재미있었어요','jaemiisseosseoyo','재미있 + 었어요'],
    ['좋다','jota','Tốt; hay','좋았어요','joasseoyo','좋 + 았어요'],
    ['맛있다','masitda','Ngon','맛있었어요','masisseosseoyo','맛있 + 었어요'],
  ].map(([text,romanization,meaning,past,pastRoma,rule,alternative])=>({text,romanization,meaning,past,pastRoma,rule,alternative}));
  const grammar=[
    {title:'Cùng với ai?',formula:'N + 하고 같이 + V · hago gachi · cùng với…',explanation:'Gắn 하고 sau người đi cùng, rồi dùng 같이 trước phần hành động. 하고 ở đây là “với”, không phải động từ 하다 (hada · làm). Cách nói này dùng được với danh từ có hoặc không có batchim. 같이 đọc gachi.',examples:[line('가족하고 같이 캠핑장에 갔어요.','Gajokhago gachi kaempingjange gasseoyo.','Tôi đã đến khu cắm trại cùng gia đình.'),line('동생하고 같이 회전목마를 탔어요.','Dongsaenghago gachi hoejeonmongmareul tasseoyo.','Tôi đã đi vòng quay ngựa gỗ cùng em.')]},
    {title:'Kể điều đã xảy ra',formula:'Thân V/A + 았/었어요 · at/eosseoyo · đã…',explanation:'Bỏ 다 (da) để lấy thân từ. Xét nguyên âm cuối của thân: ㅏ/ㅗ (a/o) thường thêm 았어요 (asseoyo); các nguyên âm khác thêm 었어요 (eosseoyo). Đuôi này dùng cho cả hành động và trạng thái quá khứ. Bảng bên dưới hiển thị các dạng rút gọn cụ thể, không tự áp công thức cho mọi từ bất quy tắc.',examples:[line('동물들이 많았어요.','Dongmuldeuri manasseoyo.','Có nhiều động vật.'),line('어제 집에서 쉬었어요.','Eoje jibeseo swieosseoyo.','Hôm qua tôi đã nghỉ ở nhà.')]},
    {title:'Nhớ riêng nhóm 하다',formula:'하다 → 하였어요 → 했어요 · hada → hayeosseoyo → haesseoyo',explanation:'Các động từ nhóm 하다 thường dùng dạng quá khứ rút gọn 했어요. Đây là sự rút gọn, không phải “nối âm”. Chữ 하다 là dạng từ điển, không phải tên một nguyên âm. Ôn lại cách chia hiện tại ở Bài 4 trước khi luyện đối chiếu.',examples:[line('어제 공부했어요.','Eoje gongbuhaesseoyo.','Hôm qua tôi đã học bài.'),line('가족하고 같이 캠핑을 했어요.','Gajokhago gachi kaempingeul haesseoyo.','Tôi đã cắm trại cùng gia đình.')]},
  ];
  const reading=[
    ['여름방학에 가족하고 같이 동물원에 갔어요.','Yeoreumbanghage gajokhago gachi dongmurwone gasseoyo.','Trong kỳ nghỉ hè, tôi đến vườn thú cùng gia đình.'],
    ['동물원에는 동물들이 많았어요.','Dongmurwoneneun dongmuldeuri manasseoyo.','Trong vườn thú có nhiều động vật.'],
    ['오전에는 코끼리하고 기린을 보았어요.','Ojeoneneun kokkirihago girineul boasseoyo.','Buổi sáng, tôi đã xem voi và hươu cao cổ.'],
    ['동생하고 같이 코끼리한테 먹이를 주었어요.','Dongsaenghago gachi kokkirihante meogireul jueosseoyo.','Tôi đã cho voi ăn cùng em.'],
    ['코알라 사진을 찍었어요.','Koalla sajineul jjigeosseoyo.','Tôi đã chụp ảnh koala.'],
    ['아빠하고 같이 곰을 보았어요.','Appahago gachi gomeul boasseoyo.','Tôi đã xem gấu cùng bố.'],
    ['원숭이하고 호랑이도 보았어요.','Wonsungihago horangido boasseoyo.','Tôi cũng đã xem khỉ và hổ.'],
    ['그리고 동물원 식당에서 점심을 먹었어요.','Geurigo dongmurwon sikdangeseo jeomsimeul meogeosseoyo.','Và tôi đã ăn trưa ở nhà hàng trong vườn thú.'],
    ['햄버거하고 아이스크림이 너무 맛있었어요.','Haembeogeohago aiseukeurimi neomu masisseosseoyo.','Hamburger và kem rất ngon.'],
    ['오후에는 판다하고 사자하고 코뿔소를 보았어요.','Ohueneun pandahago sajahago koppulsoreul boasseoyo.','Buổi chiều, tôi đã xem gấu trúc, sư tử và tê giác.'],
    ['저녁에 집에 왔어요.','Jeonyeoge jibe wasseoyo.','Buổi tối, tôi đã về nhà.'],
    ['그리고 가족하고 같이 저녁을 먹었어요.','Geurigo gajokhago gachi jeonyeogeul meogeosseoyo.','Và tôi đã ăn tối cùng gia đình.'],
    ['오늘 동물원에서 사진하고 동영상을 많이 찍었어요.','Oneul dongmurwoneseo sajinhago dongyeongsangeul mani jjigeosseoyo.','Hôm nay, tôi đã chụp nhiều ảnh và quay nhiều video ở vườn thú.'],
    ['집에서 그 사진하고 동영상을 보았어요.','Jibeseo geu sajinhago dongyeongsangeul boasseoyo.','Ở nhà, tôi đã xem những ảnh và video ấy.'],
    ['동물원은 아주 재미있었어요.','Dongmurwoneun aju jaemiisseosseoyo.','Chuyến đi vườn thú rất thú vị.'],
  ].map(s=>line(...s));
  const zoo=['giraffe','elephant','monkey','bear','lion','tiger'].map((id,i)=>({...words[id],number:i+1}));
  const companions=[line('가족','gajok','Gia đình'),line('친구','chingu','Bạn'),line('동생','dongsaeng','Em')];
  const outings=[
    ['zoo','동물원에 갔어요.','Dongmurwone gasseoyo.','đến vườn thú','코끼리를 보았어요.','Kokkirireul boasseoyo.','Tôi đã xem voi.'],
    ['garden','식물원에 갔어요.','Singmurwone gasseoyo.','đến vườn thực vật','사진을 찍었어요.','Sajineul jjigeosseoyo.','Tôi đã chụp ảnh.'],
    ['aquarium','수족관에 갔어요.','Sujokgwane gasseoyo.','đến thủy cung','물개 쇼를 보았어요.','Mulgae syoreul boasseoyo.','Tôi đã xem biểu diễn hải cẩu.'],
    ['camp','캠핑장에 갔어요.','Kaempingjange gasseoyo.','đến khu cắm trại','캠핑을 했어요.','Kaempingeul haesseoyo.','Tôi đã cắm trại.'],
    ['amusement','놀이공원에 갔어요.','Norigongwone gasseoyo.','đến công viên giải trí','회전목마를 탔어요.','Hoejeonmongmareul tasseoyo.','Tôi đã đi vòng quay ngựa gỗ.'],
    ['waterpark','워터파크에 갔어요.','Woteopakeue gasseoyo.','đến công viên nước','사진을 찍었어요.','Sajineul jjigeosseoyo.','Tôi đã chụp ảnh.'],
  ].map(([id,text,romanization,meaning,a,b,c])=>({id,...line(text,romanization,meaning),activity:line(a,b,c)}));
  function trip(person,place){const p=companions[person],o=outings[place];if(!p||!o)throw new RangeError('Lựa chọn ngoài bài');return [line(`어제 ${p.text}하고 같이 ${o.text}`,`Eoje ${p.romanization}hago gachi ${o.romanization[0].toLowerCase()+o.romanization.slice(1)}`,`Hôm qua tôi đã ${o.meaning} cùng ${p.meaning.toLowerCase()}.`),o.activity];}
  const odd=[
    [['lion','rabbit','monkey','garden'],'garden','Ba từ còn lại là động vật; vườn thực vật là địa điểm.'],
    [['aquarium','zoo','camp','turtle'],'turtle','Rùa là động vật; ba từ còn lại là địa điểm.'],
    [[line('먹다','meokda','Ăn'),words.rest,words.come,words.burger],'burger','Hamburger là danh từ; ba từ còn lại là động từ.'],
    [[words.running,line('공부하다','gongbuhada','Học bài'),line('보다','boda','Xem'),line('가다','gada','Đi')],'running','달리기 (dalligi) là danh từ chỉ việc chạy; ba từ còn lại ở dạng động từ.'],
    [['giraffe','lion','tiger','video'],'video','Video không phải tên động vật.'],
  ].map(([opts,answer,explanation],i)=>({prompt:`Chọn từ khác nhóm · câu ${i+1}`,options:opts.map(o=>typeof o==='string'?words[o]:o),answers:[words[answer].text],sample:words[answer],explanation}));
  const past=forms.slice(0,10).map(f=>({prompt:f.text,promptRomanization:f.romanization,meaning:f.meaning,answers:[f.past,...(f.alternative?[f.alternative]:[])],sample:line(f.past,f.pastRoma,'Đã '+f.meaning.toLowerCase()),explanation:'Chỉ nhập dạng quá khứ lịch sự của từ đã cho.'}));
  const matchIds=['garden','camp','running','aquarium','monkey'];
  const matching=matchIds.map(id=>({prompt:`Chọn từ có nghĩa: ${words[id].meaning.toLowerCase()}`,options:matchIds.map(id=>words[id]),answers:[words[id].text],sample:words[id],explanation:'Nối nghĩa theo bảng ở trang 16.'}));
  const order=[
    [['같이','친구하고','갔어요','식물원에'],['gachi','chinguhago','gasseoyo','singmurwone'],'친구하고 같이 식물원에 갔어요.','Chinguhago gachi singmurwone gasseoyo.','Tôi đã đến vườn thực vật cùng bạn.'],
    [['찍었어요','사진을','많이'],['jjigeosseoyo','sajineul','mani'],'사진을 많이 찍었어요.','Sajineul mani jjigeosseoyo.','Tôi đã chụp nhiều ảnh.'],
    [['캠핑을','가족하고 같이','했어요'],['kaempingeul','gajokhago gachi','haesseoyo'],'가족하고 같이 캠핑을 했어요.','Gajokhago gachi kaempingeul haesseoyo.','Tôi đã cắm trại cùng gia đình.'],
    [['먹이를','동물한테','줬어요'],['meogireul','dongmulhante','jwosseoyo'],'동물한테 먹이를 줬어요.','Dongmulhante meogireul jwosseoyo.','Tôi đã cho động vật ăn.'],
    [['쉬었어요','집에서','어제'],['swieosseoyo','jibeseo','eoje'],'어제 집에서 쉬었어요.','Eoje jibeseo swieosseoyo.','Hôm qua tôi đã nghỉ ở nhà.'],
    [['동영상을','봤어요','재미있는'],['dongyeongsangeul','bwasseoyo','jaemiinneun'],'재미있는 동영상을 봤어요.','Jaemiinneun dongyeongsangeul bwasseoyo.','Tôi đã xem video thú vị.'],
  ].map(([tokens,tokenRoma,text,roma,meaning],i)=>({prompt:`Sắp xếp câu ${i+1}`,meaning,tokens,tokenRoma,sample:line(text,roma,meaning),explanation:i===3?'Đã sửa đề: bản gốc ghi 동물이 (dongmuri · động vật là chủ ngữ), không diễn đạt “cho động vật ăn”. Dùng 동물한테 (dongmulhante · cho động vật), ôn 한테 ở Bài 8.':'Động từ ở cuối câu. Trật tự các cụm đầu câu có thể thay đổi; so sánh với mẫu.'}));
  const writing=[
    ['어제 + 동물원 + 가다','eoje + dongmurwon + gada','Hôm qua + vườn thú + đi','어제 동물원에 갔어요.','Eoje dongmurwone gasseoyo.','Hôm qua tôi đã đến vườn thú.'],
    ['친구하고 같이 + 사진을 찍다','chinguhago gachi + sajineul jjikda','Cùng bạn + chụp ảnh','친구하고 같이 사진을 찍었어요.','Chinguhago gachi sajineul jjigeosseoyo.','Tôi đã chụp ảnh cùng bạn.'],
    ['가족 + 캠핑장 + 가다','gajok + kaempingjang + gada','Gia đình + khu cắm trại + đi','가족하고 같이 캠핑장에 갔어요.','Gajokhago gachi kaempingjange gasseoyo.','Tôi đã đến khu cắm trại cùng gia đình.'],
    ['집에서 + 쉬다','jibeseo + swida','Ở nhà + nghỉ','집에서 쉬었어요.','Jibeseo swieosseoyo.','Tôi đã nghỉ ở nhà.'],
    ['동영상을 + 보다','dongyeongsangeul + boda','Video + xem','동영상을 봤어요.','Dongyeongsangeul bwasseoyo.','Tôi đã xem video.'],
    ['햄버거를 + 먹다','haembeogeoreul + meokda','Hamburger + ăn','햄버거를 먹었어요.','Haembeogeoreul meogeosseoyo.','Tôi đã ăn hamburger.'],
  ].map(([prompt,promptRomanization,meaning,...s])=>({prompt,promptRomanization,meaning,sample:line(...s),explanation:'Tự viết cả câu ở quá khứ. Câu mẫu chỉ là một cách diễn đạt.'}));
  const animalQuiz=zoo.map(w=>({prompt:`Bản đồ trang 19 · Con vật số ${w.number} là gì?`,image:'assets/korean/lesson-9/slides/slide-19.jpg',imageAlt:'Bản đồ vườn thú với sáu con vật đánh số',options:zoo,answers:[w.text],sample:w,explanation:`Số ${w.number}: ${w.meaning}. Số 1 là ví dụ trong PDF, được đưa lại để ôn.`}));
  const tfOptions=[line('O','','Đúng theo bài đọc'),line('X','','Không đúng theo bài đọc')];
  const tf=[
    ['사진을 찍었어요.','Sajineul jjigeosseoyo.','Thomas đã chụp ảnh.','O','Đoạn đọc nói chụp ảnh koala và nhiều ảnh ở vườn thú.'],
    ['물개 쇼에 갔어요.','Mulgae syoe gasseoyo.','Thomas đã đi xem biểu diễn hải cẩu.','X','Không có thông tin đi xem biểu diễn hải cẩu trong đoạn đọc.'],
    ['곰을 보았어요.','Gomeul boasseoyo.','Thomas đã xem gấu.','O','Thomas xem gấu cùng bố.'],
    ['동물원 밖에서 점심을 먹었어요.','Dongmurwon bakkeseo jeomsimeul meogeosseoyo.','Thomas ăn trưa bên ngoài vườn thú.','X','Đoạn đọc nói ăn ở nhà hàng trong vườn thú, không phải bên ngoài.'],
    ['코끼리한테 먹이를 주었어요.','Kokkirihante meogireul jueosseoyo.','Thomas đã cho voi ăn.','O','Thomas cùng em cho voi ăn.'],
  ].map(([prompt,promptRomanization,meaning,answer,explanation])=>({prompt,promptRomanization,meaning,options:tfOptions,answers:[answer],sample:line(prompt,promptRomanization,meaning),explanation}));
  const who=[
    ['가족','gajok','Gia đình',0],['아빠','appa','Bố',5],['동생','dongsaeng','Em',3],
  ].map(([text,roma,meaning,index])=>({prompt:`Thomas đã làm gì cùng ${meaning.toLowerCase()}?`,options:[reading[0],reading[3],reading[5]],answers:[reading[index].text],sample:reading[index],explanation:`Ghép với ${text} (${roma} · ${meaning.toLowerCase()}) theo bài đọc, trang 24.`}));
  const yuna=[
    ['그리고 프리스비를 ___.','Geurigo peuriseubireul ___.','Và tôi đã chơi ném đĩa.','하다'],
    ['놀이터에서 미끄럼틀을 ___.','Noriteoeseo mikkeureomteureul ___.','Tôi đã chơi cầu trượt ở sân chơi.','타다'],
    ['아주 ___.','Aju ___.','Rất thú vị.','재미있다'],
    ['그리고 점심을 ___.','Geurigo jeomsimeul ___.','Và tôi đã ăn trưa.','먹다'],
    ['오후에는 사진을 ___.','Ohueneun sajineul ___.','Buổi chiều, tôi đã chụp ảnh.','찍다'],
    ['지난 주말은 참 ___.','Jinan jumareun cham ___.','Cuối tuần trước thật tuyệt.','좋다'],
  ].map(([prompt,promptRomanization,meaning,verb])=>{const f=forms.find(f=>f.text===verb);return {prompt,promptRomanization,meaning,answers:[f.past,...(f.alternative?[f.alternative]:[])],sample:line(prompt.replace('___',f.past),promptRomanization.replace('___',f.pastRoma),meaning),explanation:`Chỉ điền đuôi từ còn thiếu. Từ gợi ý: ${f.text} (${f.romanization} · ${f.meaning.toLowerCase()}).`};});
  const speaking=[
    ['달리기를 했어요','dalligireul haesseoyo','chạy bộ','친구','chingu','bạn'],
    ['춤을 췄어요','chumeul chwosseoyo','nhảy múa','동생','dongsaeng','em'],
    ['게임했어요','geimhaesseoyo','chơi game','친구','chingu','bạn'],
    ['아침을 먹었어요','achimeul meogeosseoyo','ăn sáng','형','hyeong','anh trai (nam giới gọi)'],
  ].map(([a,ar,am,p,pr,pm])=>({prompt:`누구하고 같이 ${a}?`,promptRomanization:`Nuguhago gachi ${ar}?`,meaning:`Bạn đã ${am} cùng ai? Gợi ý: ${p} (${pr} · ${pm}).`,sample:line(`${p}하고 같이 ${a}.`,`${pr}hago gachi ${ar}.`,`Tôi đã ${am} cùng ${pm}.`),explanation:'Luyện hỏi và tự trả lời thành tiếng. Có thể gõ câu trước khi mở mẫu; không ghi âm hay chấm phát âm.'}));
  const notes=[
    'Trang 4: sửa 거복이 thành 거북이 (geobugi · rùa). Trang 9: 도착하다 (dochakada) là “đến nơi”, không phải “xuất phát”. Ảnh nguồn được giữ nguyên.',
    'Trang 13: 하다 → 하였어요 → 했어요 là rút gọn, không phải nối âm. Ôn cách chia hiện tại ở Bài 4; bài này bổ sung quá khứ, không chép lại toàn bộ kiến thức cũ.',
    'Trang 17 câu 4 được đổi 동물이 thành 동물한테 (dongmulhante · cho động vật) để khớp nghĩa “cho động vật ăn”. Câu gốc dùng động vật làm chủ ngữ, mang nghĩa khác.',
    'Trang 23 lời dẫn nói “kỳ nghỉ hè trước”, còn lời kể có 오늘 (oneul · hôm nay). Phần đọc giữ nguyên góc nhìn lời kể; không tự thêm ngày tháng cụ thể.',
    'Cho ăn, chạm động vật hoặc xem biểu diễn phụ thuộc từng địa điểm và quy định. Bài chọn hoạt động là luyện nói, không phải chỉ dẫn được phép làm ở mọi vườn thú.',
    'Nút nghe sử dụng giọng tổng hợp tiếng Hàn của trình duyệt; PDF không kèm audio gốc. Romanization hỗ trợ đọc, không thay thế việc nghe phát âm.',
  ];
  const slideRows=[
    ['Đi vườn thú cùng gia đình','Câu chủ đề ở thì quá khứ.','grammar',[]],['Lộ trình Bài 9','Từ vựng, ngữ pháp, luyện câu và vận dụng.','vocab',[]],
    ['Động vật 1','Hươu cao cổ, khỉ, voi và gấu.','vocab',['giraffe','monkey','elephant','bear']],['Động vật 2','Sư tử, thỏ, hổ và rùa; đã sửa chính tả rùa ở thẻ học.','vocab',['lion','rabbit','tiger','turtle']],
    ['Địa điểm 1','Thủy cung, vườn thực vật, vườn thú.','vocab',['aquarium','garden','zoo']],['Địa điểm 2','Công viên giải trí, khu cắm trại, công viên nước.','vocab',['amusement','camp','waterpark']],
    ['Hoạt động','Năm cụm hoạt động theo tranh.','vocab',['feed','enter','photo','show','touch']],['Từ khác 1','Nghỉ hè, đồ ăn, video và thời gian.','vocab',['summer','burger','come','video','yesterday','running']],['Từ khác 2','Nghỉ, tiếp tục, chăm chỉ, đến nơi và trước tiên.','vocab',['rest','keep','hard','arrive','first']],
    ['Cùng với ai?','Danh từ chỉ người + 하고 같이 (hago gachi · cùng với).','grammar',['together','carousel']],['Thì quá khứ','Kể lại hành động và trạng thái.','grammar',[]],['Nhóm nguyên âm a/o','Đuôi 았어요 (asseoyo) và dạng rút gọn.','grammar',[]],['Các nhóm còn lại & làm','Đuôi 었어요 (eosseoyo), 했어요 (haesseoyo).','grammar',[]],
    ['Từ khác nhóm','5 câu chọn từ theo nghĩa hoặc từ loại.','practice',[]],['Chia quá khứ','10 câu nhập đáp án.','practice',[]],['Nối nghĩa','5 câu chọn nghĩa đúng.','practice',[]],['Sắp xếp câu','6 câu ghép mảnh; câu 4 có ghi chú sửa đề.','practice',[]],['Tự viết câu','6 câu mở dựa trên cụm từ gợi ý.','practice',[]],
    ['Bản đồ vườn thú','Chọn số để xem tên con vật.','zoo',['giraffe','elephant','monkey','bear','lion','tiger']],['Ghép con vật và số','6 con vật, gồm ví dụ số 1.','practice',[]],['Chọn hoạt động','Chọn hoạt động bạn muốn kể; tùy quy định địa điểm.','zoo',['feed','enter','photo','show','touch']],['Bạn muốn đi đâu?','Chọn trong sáu địa điểm của bài rồi thử kể chuyến đi.','zoo',['aquarium','garden','zoo','amusement','camp','waterpark']],
    ['Chuyến đi của Thomas','15 câu có phiên âm và nghĩa; 5 câu O/X.','reading',['koala','panda','rhino','icecream']],['Thomas đi cùng ai?','3 câu ghép người và hoạt động.','practice',[]],['Bạn thích con vật nào?','Tự chọn con vật và luyện nói ở mục Vườn thú.','zoo',[]],['Cuối tuần của Yuna','6 chỗ trống sau câu ví dụ.','practice',['frisbee','slide']],['Luyện nói theo cặp','4 câu hỏi và trả lời cùng ai.','practice',[]],
  ];
  window.KOREAN_LESSON_NINE={title:'가족하고 동물원에 갔어요.',romanization:'Gajokhago dongmurwone gasseoyo.',meaning:'Tôi đã đến vườn thú cùng gia đình.',vocabulary,words,forms,grammar,reading,zoo,companions,outings,trip,notes,
    workbook:{sections:[
      {id:'odd',title:'Trang 14 · Khác nhóm',type:'choice',note:'Chọn từ khác nhóm về nghĩa hoặc từ loại.',items:odd},
      {id:'past',title:'Trang 15 · Chia quá khứ',type:'exact',note:'Chỉ nhập dạng quá khứ lịch sự của động từ/tính từ.',items:past},
      {id:'match',title:'Trang 16 · Nối nghĩa',type:'choice',note:'Chọn từ tương ứng với nghĩa tiếng Việt.',items:matching},
      {id:'order',title:'Trang 17 · Ghép câu',type:'order',note:'Bấm để thêm hoặc gỡ mảnh từ; đối chiếu mẫu khi ghép xong.',items:order},
      {id:'write',title:'Trang 18 · Tự viết',type:'open',note:'Thêm tiểu từ và chia quá khứ. Có nhiều câu đúng, không chấm theo một chuỗi duy nhất.',items:writing},
      {id:'animals',title:'Trang 19–20 · Con vật số mấy?',type:'choice',note:'Nhìn bản đồ; câu số 1 là ví dụ được đưa lại để ôn.',items:animalQuiz},
      {id:'tf',title:'Trang 23 · Đúng / sai',type:'choice',note:'Chọn theo thông tin trong bài Thomas, không suy đoán ngoài đoạn đọc.',items:tf},
      {id:'who',title:'Trang 24 · Cùng với ai?',type:'choice',note:'Ghép người và hoạt động theo bài đọc.',items:who},
      {id:'yuna',title:'Trang 26 · Cuối tuần của Yuna',type:'exact',note:'Ví dụ: 저는 지난 주말에 공원에 갔어요 (Jeoneun jinan jumare gongwone gasseoyo · Cuối tuần trước tôi đến công viên). Buổi sáng Yuna đi dạo; hãy điền sáu chỗ trống tiếp theo.',items:yuna},
      {id:'speak',title:'Trang 27 · Luyện nói',type:'open',note:'Hỏi đã làm gì cùng ai, tự trả lời rồi đối chiếu mẫu.',items:speaking},
    ]},slides:slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
