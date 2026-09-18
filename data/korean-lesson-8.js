// Bài 8.pdf: 36 pages. Source images remain unchanged; repaired prompts are labelled.
(() => {
  'use strict';
  const line=(text,romanization,meaning)=>({text,romanization,meaning});
  const months=[['일월','irwol'],['이월','iwol'],['삼월','samwol'],['사월','sawol'],['오월','owol'],['유월','yuwol'],['칠월','chirwol'],['팔월','parwol'],['구월','guwol'],['시월','siwol'],['십일월','sibirwol'],['십이월','sibiwol']].map(([text,romanization],i)=>({...line(text,romanization,`Tháng ${i+1}`),number:i+1}));
  const hours=[['한','han'],['두','du'],['세','se'],['네','ne'],['다섯','daseot'],['여섯','yeoseot'],['일곱','ilgop'],['여덟','yeodeol'],['아홉','ahop'],['열','yeol'],['열한','yeolhan'],['열두','yeoldu']].map(([text,roma],i)=>({...line(text+' 시',roma+' si',`${i+1} giờ`),number:i+1}));
  const minutes=[['','',0],['십 분','sip bun',10],['십오 분','sibo bun',15],['이십 분','isip bun',20],['삼십 분','samsip bun',30],['사십 분','sasip bun',40],['사십오 분','sasibo bun',45],['오십 분','osip bun',50]].map(([text,romanization,number])=>({...line(text,romanization,number?`${number} phút`:'Đúng giờ'),number}));
  const dayRoma=['iril','iil','samil','sail','oil','yugil','chiril','paril','guil','sibil','sibiril','sibiil','sipsamil','sipsail','siboil','simnyugil','sipchiril','sipparil','sipguil','isibil','isibiril','isibiil','isipsamil','isipsail','isiboil','isimnyugil','isipchiril','isipparil','isipguil','samsibil','samsibiril'];
  const digits=['','일','이','삼','사','오','육','칠','팔','구'];
  const sino=n=>n<10?digits[n]:(n>=20?digits[Math.floor(n/10)]:'')+'십'+digits[n%10];
  const days=Array.from({length:31},(_,i)=>line(sino(i+1)+'일',dayRoma[i],`Ngày ${i+1}`));
  const maxDay=month=>[31,29,31,30,31,30,31,31,30,31,30,31][month-1];
  function date(month,day){
    if(!Number.isInteger(month)||month<1||month>12||!Number.isInteger(day)||day<1||day>maxDay(month))throw new RangeError('Ngày tháng không hợp lệ');
    const m=months[month-1],n=days[day-1];return line(`${m.text} ${n.text}`,`${m.romanization} ${n.romanization}`,`Ngày ${day} tháng ${month}`);
  }
  function time(hour,minute,period='',half=false){
    const h=hours[hour-1],m=minutes.find(m=>m.number===minute);
    if(!Number.isInteger(hour)||!h||!m||!['','am','pm'].includes(period))throw new RangeError('Giờ không hợp lệ');
    const p=period==='am'?line('오전','ojeon',hour===12?'đêm (AM)':'sáng (AM)'):period==='pm'?line('오후','ohu',hour===12?'trưa (PM)':hour<6?'chiều (PM)':'tối (PM)'):line('','','');
    return line([p.text,h.text,minute===30&&half?'반':m.text].filter(Boolean).join(' '),[p.romanization,h.romanization,minute===30&&half?'ban':m.romanization].filter(Boolean).join(' '),`${hour} giờ${minute?` ${minute} phút`:''}${p.meaning?' · '+p.meaning:''}`);
  }
  const vocabulary=[
    ...months.map((m,i)=>({...m,id:`month${i+1}`,group:'months',page:i<6?3:4,emoji:'🗓️',core:true})),
    ...hours.map((h,i)=>({...h,id:`hour${i+1}`,group:'hours',page:i<6?6:7,emoji:'🕘',core:true})),
    ...minutes.filter(m=>m.number&&m.number%10===0).map(m=>({...m,id:`minute${m.number}`,group:'minutes',page:9,emoji:'⏱️',core:true})),
    ...[
      ['so','그래서','geuraeseo','Vì vậy; cho nên','💬',11],
      ['skates','스케이트','seukeiteu','Giày trượt băng; môn trượt băng','⛸️',11],
      ['ride','타다','tada','Đi (xe); cưỡi; trượt (với dụng cụ phù hợp)','🛼',11,5],
      ['christmas','크리스마스','keuriseumaseu','Giáng sinh','🎄',11],
      ['all','다','da','Tất cả; hết','✨',11],
      ['receive','받다','batda','Nhận','🎁',11,5],
      ['to','한테','hante','Cho/đến ai; gắn sau danh từ chỉ người hoặc con vật','→',12],
      ['give','주다','juda','Cho; đưa cho','🎁',12],
      ['broccoli','브로콜리','beurokolli','Bông cải xanh','🥦',12],
      ['dance','춤을 추다','chumeul chuda','Nhảy múa','💃',12],
      ['game','게임하다','geimhada','Chơi trò chơi; chơi game','🎮',12],
      ['plan','계획하다','gyehoekhada','Lập kế hoạch','📝',12],
    ].map(([id,text,romanization,meaning,emoji,page,review])=>({id,text,romanization,meaning,emoji,page,review,group:'other',core:true})),
    ...[
      ['half','반','ban','Nửa; trong giờ giấc: rưỡi, 30 phút','◐',10],
      ['birthday','생일','saengil','Sinh nhật','🎂',1],
      ['party','파티','pati','Bữa tiệc','🎉',1],
      ['fruit','과일','gwail','Trái cây','🍎',17],
      ['meat','고기','gogi','Thịt','🍖',17],
      ['gift','선물','seonmul','Quà tặng','🎁',17],
      ['food','음식','eumsik','Đồ ăn','🍽️',23],
      ['cake','케이크','keikeu','Bánh kem','🎂',23],
      ['cupcake','컵케이크','keopkeikeu','Bánh cupcake','🧁',23],
      ['pie','파이','pai','Bánh pie','🥧',23],
      ['pizza','피자','pija','Pizza','🍕',23],
      ['console','게임기','geimgi','Máy chơi game','🎮',23],
      ['robot','로봇','robot','Robot','🤖',23],
      ['rink','아이스 링크','aiseu ringkeu','Sân trượt băng','⛸️',23],
      ['ski','스키를 타다','seukireul tada','Trượt tuyết','⛷️',27],
      ['ballplay','공놀이를 하다','gongnorireul hada','Chơi bóng','⚽',27],
      ['zoo','동물원','dongmurwon','Vườn thú','🦒',28],
      ['shopping','쇼핑하다','syopinghada','Mua sắm','🛍️',30],
      ['photo','사진을 찍다','sajineul jjikda','Chụp ảnh','📷',30],
      ['meal','식사하다','siksahada','Dùng bữa','🍽️',30],
      ['bbq','바비큐를 하다','babikyureul hada','Làm tiệc nướng','🍢',30,5],
      ['cinema','영화관','yeonghwagwan','Rạp chiếu phim','🎬',31],
      ['shower','샤워하다','syawohada','Tắm vòi sen','🚿',33],
    ].map(([id,text,romanization,meaning,emoji,page,review])=>({id,text,romanization,meaning,emoji,page,review,group:'support',core:false})),
  ];
  const words=Object.fromEntries(vocabulary.map(w=>[w.id,w]));
  const forms=[
    ['가다','gada','Đi','안 가요','an gayo','갈 거예요','gal geoyeyo','가 + ㄹ → 갈: thân từ không có batchim.'],
    ['오다','oda','Đến','안 와요','an wayo','올 거예요','ol geoyeyo','오 + ㄹ → 올: thân từ không có batchim.'],
    ['먹다','meokda','Ăn','안 먹어요','an meogeoyo','먹을 거예요','meogeul geoyeyo','먹 có batchim ㄱ → thêm 을.'],
    ['사다','sada','Mua','안 사요','an sayo','살 거예요','sal geoyeyo','사 + ㄹ → 살; không nhầm với động từ 살다 (salda · sống) đã học.'],
    ['만들다','mandeulda','Làm, chế tạo','안 만들어요','an mandeureoyo','만들 거예요','mandeul geoyeyo','만들 đã có batchim ㄹ → giữ ㄹ và thêm 거예요.'],
    ['읽다','ikda','Đọc','안 읽어요','an ilgeoyo','읽을 거예요','ilgeul geoyeyo','읽 có batchim kép ㄺ, không thuộc trường hợp chỉ có ㄹ → thêm 을.'],
    ['만나다','mannada','Gặp','안 만나요','an mannayo','만날 거예요','mannal geoyeyo','만나 + ㄹ → 만날.'],
    ['타다','tada','Đi xe; trượt','안 타요','an tayo','탈 거예요','tal geoyeyo','타 + ㄹ → 탈.'],
    ['하다','hada','Làm','안 해요','an haeyo','할 거예요','hal geoyeyo','하 + ㄹ → 할.'],
    ['주다','juda','Cho','안 줘요','an jwoyo','줄 거예요','jul geoyeyo','주 + ㄹ → 줄.'],
    ['추다','chuda','Nhảy (múa)','안 춰요','an chwoyo','출 거예요','chul geoyeyo','추 + ㄹ → 출; dùng với 춤을 (chumeul · điệu nhảy).'],
    ['공부하다','gongbuhada','Học bài','공부를 안 해요','gongbureul an haeyo','공부할 거예요','gongbuhal geoyeyo','Danh từ hoạt động + 하다: đặt 안 trước 해요; có thể bỏ 를.'],
    ['운동하다','undonghada','Tập thể dục','운동을 안 해요','undongeul an haeyo','운동할 거예요','undonghal geoyeyo','운동 + (을) + 안 해요; đuôi tương lai gắn vào 하 → 할.'],
    ['계획하다','gyehoekhada','Lập kế hoạch','계획을 안 해요','gyehoegeul an haeyo','계획할 거예요','gyehoekhal geoyeyo','계획 + (을) + 안 해요; 하 → 할 trong tương lai.'],
    ['춤추다','chumchuda','Nhảy múa','춤을 안 춰요','chumeul an chwoyo','춤출 거예요','chumchul geoyeyo','Có cả 춤추다 và 춤을 추다. Dạng tách giúp nhìn rõ 안 đứng trước động từ 추다.'],
    ['마시다','masida','Uống','안 마셔요','an masyeoyo','마실 거예요','masil geoyeyo','마시 + ㄹ → 마실.'],
  ].map(([text,romanization,meaning,negative,negativeRoma,future,futureRoma,note])=>({text,romanization,meaning,negative,negativeRoma,future,futureRoma,note}));
  const formByText=Object.fromEntries(forms.map(f=>[f.text,f]));
  const grammar=[
    {title:'Phủ định hành động · 안',formula:'안 + V/A · an · không…',explanation:'안 đứng trước động từ/tính từ đã chia. Với danh từ hoạt động + 하다, cách dùng trong bài là N + (을/를) + 안 해요. Không tách mọi từ kết thúc bằng 하다: 좋아하다 → 안 좋아해요 (joahada → an joahaeyo · không thích). Phủ định “không phải danh từ” là 이/가 아니에요, đã học ở Bài 2.',examples:[line('저는 우유를 안 마셔요.','Jeoneun uyureul an masyeoyo.','Tôi không uống sữa.'),line('저는 운동을 안 해요.','Jeoneun undongeul an haeyo.','Tôi không tập thể dục.')]},
    {title:'Dự định & dự đoán · -(으)ㄹ 거예요',formula:'Thân V + (으)ㄹ 거예요 · (eu)l geoyeyo · sẽ…',explanation:'Bỏ 다 để lấy thân từ. Có batchim (trừ ㄹ): thêm 을 거예요. Không có batchim: gắn ㄹ 거예요. Batchim ㄹ: giữ nguyên, thêm 거예요. Cấu trúc diễn đạt dự định hoặc dự đoán theo ngữ cảnh; không phải lời đảm bảo chắc chắn. Viết 거예요, không viết 거에요; có khoảng trắng trước 거예요.',examples:[line('내일 책을 읽을 거예요.','Naeil chaegeul ilgeul geoyeyo.','Ngày mai tôi sẽ đọc sách.'),line('내일 아마 비가 올 거예요.','Naeil ama biga ol geoyeyo.','Ngày mai có lẽ trời sẽ mưa.')]},
    {title:'Cho ai? · 한테',formula:'N + 한테 · hante · cho/đến ai',explanation:'Trong bài đọc, 한테 đánh dấu người hoặc con vật nhận thứ gì đó. Không dịch máy móc là “đối với” trong mọi câu. Đây là cách nói giao tiếp; ví dụ dùng động từ 주다 (juda · cho).',examples:[line('친구한테 선물을 줄 거예요.','Chinguhante seonmureul jul geoyeyo.','Tôi sẽ tặng quà cho bạn.')]},
  ];
  const reading=[
    {name:'노아',nameRoma:'Noa',meaning:'Noa',emoji:'⛸️',month:10,day:10,hour:12,period:'pm',lines:[
      ['제 생일은 10월 10일이에요.','Je saengireun siwol sibirieyo.','Sinh nhật tôi là ngày 10 tháng 10.'],
      ['저는 스케이트를 좋아해요.','Jeoneun seukeiteureul joahaeyo.','Tôi thích trượt băng.'],
      ['그래서 친구들하고 아이스 링크에서 생일 파티를 할 거예요.','Geuraeseo chingudeulhago aiseu ringkeueseo saengil patireul hal geoyeyo.','Vì vậy tôi sẽ tổ chức tiệc sinh nhật cùng bạn bè ở sân trượt băng.'],
      ['우리는 오후 12시에 만날 거예요.','Urineun ohu yeoldu sie mannal geoyeyo.','Chúng tôi sẽ gặp nhau lúc 12 giờ trưa.'],
      ['그리고 스케이트를 탈 거예요.','Geurigo seukeiteureul tal geoyeyo.','Và chúng tôi sẽ trượt băng.'],
    ]},
    {name:'영준',nameRoma:'Yeongjun',meaning:'Youngjun',emoji:'🎄',month:12,day:24,hour:7,period:'pm',lines:[
      ['제 생일은 12월 24일이에요.','Je saengireun sibiwol isipsairieyo.','Sinh nhật tôi là ngày 24 tháng 12.'],
      ['그래서 오후 7시에 생일 파티하고 크리스마스 파티를 같이 할 거예요.','Geuraeseo ohu ilgop sie saengil patihago keuriseumaseu patireul gachi hal geoyeyo.','Vì vậy tôi sẽ tổ chức chung tiệc sinh nhật và tiệc Giáng sinh lúc 7 giờ tối.'],
      ['저는 케이크를 안 좋아해요.','Jeoneun keikeureul an joahaeyo.','Tôi không thích bánh kem.'],
      ['그래서 사과 파이를 먹을 거예요.','Geuraeseo sagwa paireul meogeul geoyeyo.','Vì vậy tôi sẽ ăn bánh pie táo.'],
      ['저는 생일 선물하고 크리스마스 선물을 다 받을 거예요.','Jeoneun saengil seonmulhago keuriseumaseu seonmureul da badeul geoyeyo.','Tôi sẽ nhận cả quà sinh nhật lẫn quà Giáng sinh.'],
    ]},
    {name:'유나',nameRoma:'Yuna',meaning:'Yuna kể về cún Coco',emoji:'🐶',month:11,day:17,hour:11,period:'am',lines:[
      ['11월 17일은 우리 강아지 코코의 생일이에요.','Sibirwol sipchirireun uri gangaji Kokoui saengirieyo.','Ngày 17 tháng 11 là sinh nhật cún Coco của nhà tôi.'],
      ['그래서 우리 가족은 공원에서 오전 11시에 생일 파티를 할 거예요.','Geuraeseo uri gajogeun gongwoneseo ojeon yeolhan sie saengil patireul hal geoyeyo.','Vì vậy gia đình tôi sẽ tổ chức tiệc sinh nhật ở công viên lúc 11 giờ sáng.'],
      ['코코는 과일을 안 먹어요.','Kokoneun gwaireul an meogeoyo.','Coco không ăn trái cây.'],
      ['그래서 우리는 코코한테 고기하고 우유를 줄 거예요.','Geuraeseo urineun Kokohante gogihago uyureul jul geoyeyo.','Vì vậy chúng tôi sẽ cho Coco thịt và sữa.'],
      ['생일 파티가 재미있을 거예요.','Saengil patiga jaemiisseul geoyeyo.','Bữa tiệc sinh nhật sẽ rất vui.'],
    ]},
  ].map(r=>({...r,lines:r.lines.map(s=>line(...s))}));
  const activities=[
    ['skate','⛸️','스케이트를 탈 거예요','seukeiteureul tal geoyeyo','sẽ trượt băng'],
    ['dance','💃','춤을 출 거예요','chumeul chul geoyeyo','sẽ nhảy múa'],
    ['game','🎮','게임을 할 거예요','geimeul hal geoyeyo','sẽ chơi game'],
    ['swim','🏊','수영할 거예요','suyeonghal geoyeyo','sẽ bơi'],
  ].map(([id,emoji,text,romanization,meaning])=>({id,emoji,text,romanization,meaning}));
  const venues=[line('집에서','jibeseo','ở nhà'),line('공원에서','gongwoneseo','ở công viên'),line('식당에서','sikdangeseo','ở nhà hàng'),line('아이스 링크에서','aiseu ringkeueseo','ở sân trượt băng')];
  const foods=[line('케이크를','keikeureul','bánh kem'),line('컵케이크를','keopkeikeureul','bánh cupcake'),line('파이를','paireul','bánh pie'),line('피자를','pijareul','pizza')];
  function partyPlan(month,day,hour,minute,period,venueIndex,activityIndex,foodIndex){
    const dt=date(month,day),tm=time(hour,minute,period),v=venues[venueIndex],a=activities[activityIndex],f=foods[foodIndex];
    if(!v||!a||!f)throw new RangeError('Lựa chọn không hợp lệ');
    const timeAt=tm.romanization.endsWith('bun')?tm.romanization.slice(0,-3)+'bune':tm.romanization+'e';
    return [line(`${dt.text} ${tm.text}에 생일 파티를 할 거예요.`,`${dt.romanization} ${timeAt} saengil patireul hal geoyeyo.`,`${dt.meaning}, lúc ${tm.meaning}, tôi sẽ tổ chức tiệc sinh nhật.`),line(`${v.text} 파티를 할 거예요.`,`${v.romanization} patireul hal geoyeyo.`,`Tôi sẽ tổ chức tiệc ${v.meaning}.`),line(`${a.text}.`,`${a.romanization}.`,`Tôi ${a.meaning}.`),line(`${f.text} 먹을 거예요.`,`${f.romanization} meogeul geoyeyo.`,`Tôi sẽ ăn ${f.meaning}.`)];
  }
  const monthQuestions=[1,4,6,7,10].map(n=>({prompt:months[n-1].text,promptRomanization:months[n-1].romanization,options:[7,1,10,6,4].map(n=>line(`Tháng ${n}`,'',`Tháng ${n}`)),answers:[`Tháng ${n}`],sample:months[n-1],explanation:n===6||n===10?'Tháng 6 đọc 유월 (yuwol), tháng 10 đọc 시월 (siwol).':'Tháng dùng số Hán Hàn + 월 (wol).'}));
  const fillRows=[
    ['저는 친구를 ___.','Jeoneun chingureul ___.','Tôi gặp bạn.','저는 친구를 만나요.','Jeoneun chingureul mannayo.','만나다 (mannada · gặp) phải chia thành 만나요; mẫu tương lai 만날 거예요 cũng phù hợp nếu nói về kế hoạch.'],
    ['토요일에 공원에서 ___를 탈 거예요.','Toyoire gongwoneseo ___reul tal geoyeyo.','Thứ bảy tôi sẽ trượt băng ở công viên.','토요일에 공원에서 스케이트를 탈 거예요.','Toyoire gongwoneseo seukeiteureul tal geoyeyo.','스케이트 là danh từ; không điền động từ 타다 trước 를.'],
    ['12월에는 ___가 있어요.','Sibiworeneun ___ga isseoyo.','Tháng 12 có Giáng sinh.','12월에는 크리스마스가 있어요.','Sibiworeneun keuriseumaseuga isseoyo.','Điền danh từ 크리스마스 (keuriseumaseu).'],
    ['저는 ___를 안 먹어요.','Jeoneun ___reul an meogeoyo.','Tôi không ăn bông cải xanh.','저는 브로콜리를 안 먹어요.','Jeoneun beurokollireul an meogeoyo.','Gợi ý tiếng Việt xác định món ăn; không coi đây là lựa chọn duy nhất nếu đề không có ngữ cảnh.'],
    ['엄마가 저에게 선물을 ___.','Eommaga jeoege seonmureul ___.','Mẹ tặng quà cho tôi.','엄마가 저에게 선물을 줘요.','Eommaga jeoege seonmureul jwoyo.','주다 → 줘요 (juda → jwoyo). 에게 (ege) trong câu nguồn chỉ người nhận, tương tự 한테 (hante) trong bài.'],
    ['사과는 ___이에요.','Sagwaneun ___ieyo.','Táo là trái cây.','사과는 과일이에요.','Sagwaneun gwairieyo.','과일 (gwail) có batchim ㄹ nên thêm 이에요 (ieyo).'],
    ['저는 내일 공부를 ___.','Jeoneun naeil gongbureul ___.','Ngày mai tôi sẽ lập kế hoạch học tập.','저는 내일 공부를 계획할 거예요.','Jeoneun naeil gongbureul gyehoekhal geoyeyo.','Dùng 계획하다 theo ngân hàng từ của trang 17; chia kế hoạch tương lai thành 계획할 거예요.'],
    ['저녁에 ___를 먹어요.','Jeonyeoge ___reul meogeoyo.','Buổi tối tôi ăn thịt.','저녁에 고기를 먹어요.','Jeonyeoge gogireul meogeoyo.','고기 (gogi · thịt) + 를.'],
    ['친구와 같이 춤을 ___.','Chinguwa gachi chumeul ___.','Tôi sẽ nhảy cùng bạn.','친구와 같이 춤을 출 거예요.','Chinguwa gachi chumeul chul geoyeyo.','Đã sửa khung câu 9: bản gốc “___를 할 거예요” không ghép được trực tiếp với 춤추다 trong ngân hàng. Dùng 춤을 추다 → 춤을 출 거예요.'],
    ['저는 주말에 ___를 탈 거예요.','Jeoneun jumare ___reul tal geoyeyo.','Cuối tuần tôi sẽ trượt băng.','저는 주말에 스케이트를 탈 거예요.','Jeoneun jumare seukeiteureul tal geoyeyo.','Có thể dùng lại 스케이트; nguồn không tạo thành bộ 10 từ dùng đúng một lần.'],
  ];
  const fill=fillRows.map(([prompt,promptRomanization,meaning,text,roma,explanation])=>({prompt,promptRomanization,meaning,sample:line(text,roma,meaning),explanation}));
  const negative=['가다','공부하다','만나다','운동하다','춤추다','마시다','계획하다'].map(text=>{const f=formByText[text];const answers=[f.negative];if(['공부하다','운동하다','계획하다'].includes(text))answers.push(f.negative.replace(/[을를] /,' '));if(text==='춤추다')answers.push('안 춤춰요','춤 안 춰요');return {prompt:f.text,promptRomanization:f.romanization,meaning:`Chia phủ định: không ${f.meaning.toLowerCase()}.`,answers,sample:line(f.negative,f.negativeRoma,`Không ${f.meaning.toLowerCase()}.`),explanation:f.note};});
  const futureRows=[
    ['내일 친구를 ___.','Naeil chingureul ___.','만나다','내일 친구를 만날 거예요.','Naeil chingureul mannal geoyeyo.','Ngày mai tôi sẽ gặp bạn.'],
    ['저는 고기를 ___.','Jeoneun gogireul ___.','먹다','저는 고기를 먹을 거예요.','Jeoneun gogireul meogeul geoyeyo.','Tôi sẽ ăn thịt.'],
    ['토요일에 공원에 ___.','Toyoire gongwone ___.','가다','토요일에 공원에 갈 거예요.','Toyoire gongwone gal geoyeyo.','Thứ bảy tôi sẽ đến công viên.'],
    ['저는 스케이트를 ___.','Jeoneun seukeiteureul ___.','타다','저는 스케이트를 탈 거예요.','Jeoneun seukeiteureul tal geoyeyo.','Tôi sẽ trượt băng.'],
    ['저녁에 공부를 ___.','Jeonyeoge gongbureul ___.','하다','저녁에 공부를 할 거예요.','Jeonyeoge gongbureul hal geoyeyo.','Buổi tối tôi sẽ học bài.'],
    ['크리스마스에 선물을 ___.','Keuriseumaseue seonmureul ___.','주다','크리스마스에 선물을 줄 거예요.','Keuriseumaseue seonmureul jul geoyeyo.','Tôi sẽ tặng quà vào dịp Giáng sinh.'],
    ['저는 과일을 ___.','Jeoneun gwaireul ___.','사다','저는 과일을 살 거예요.','Jeoneun gwaireul sal geoyeyo.','Tôi sẽ mua trái cây.'],
    ['친구와 춤을 ___.','Chinguwa chumeul ___.','추다','친구와 춤을 출 거예요.','Chinguwa chumeul chul geoyeyo.','Tôi sẽ nhảy cùng bạn.'],
  ];
  const future=futureRows.map(([prompt,roma,verb,text,answerRoma,meaning])=>({prompt:`${prompt} (${verb})`,promptRomanization:`${roma} (${formByText[verb].romanization})`,meaning,answers:[formByText[verb].future],sample:line(text,answerRoma,meaning),explanation:formByText[verb].note}));
  const translate=[grammar[0].examples[0],future[0].sample,future[2].sample,future[6].sample,future[7].sample].map(sample=>({prompt:sample.meaning,sample,explanation:'Có thể thêm hoặc lược chủ ngữ khi ngữ cảnh rõ. So sánh tiểu từ và dạng chia, không cần giống từng chữ câu mẫu.'}));
  const readingQuestions=[];
  const dates=reading.map(r=>date(r.month,r.day)),times=reading.map(r=>time(r.hour,0,r.period));
  reading.forEach((r,i)=>{const name=i===2?'Coco':r.meaning;
    readingQuestions.push({prompt:`Sinh nhật ${name} là ngày nào?`,options:dates,answers:[dates[i].text],sample:r.lines[0],explanation:'Ngày tháng được nêu trong đoạn đọc trang 24; không có năm sinh trong nguồn.'});
    readingQuestions.push({prompt:`Tiệc của ${name} bắt đầu/gặp nhau lúc mấy giờ?`,options:times,answers:[times[i].text],sample:r.lines[i===0?3:1],explanation:'Đối chiếu 오전 (ojeon · AM) và 오후 (ohu · PM), không chỉ con số giờ.'});
  });
  const activityOptions=[line('스케이트를 탈 거예요','seukeiteureul tal geoyeyo','Sẽ trượt băng'),line('파이를 먹을 거예요','paireul meogeul geoyeyo','Sẽ ăn bánh pie'),line('고기를 먹을 거예요','gogireul meogeul geoyeyo','Sẽ ăn thịt')];
  reading.forEach((r,i)=>readingQuestions.push({prompt:`Trang 27 · ${i===2?'Coco':r.meaning} sẽ làm gì?`,options:activityOptions,answers:[activityOptions[i].text],sample:i===0?r.lines[4]:i===1?r.lines[3]:line('코코는 고기를 먹을 거예요.','Kokoneun gogireul meogeul geoyeyo.','Coco sẽ ăn thịt.'),explanation:i===2?'Theo trang 27, chọn ăn thịt; đoạn đọc nói gia đình sẽ cho Coco thịt và sữa. Đây là nội dung luyện ngôn ngữ trong nguồn, không phải hướng dẫn chăm sóc thú nuôi.':'Chọn theo thông tin trang 24.'}));
  const negativeSpeech=[
    ['브로콜리를 먹어요?','Beurokollireul meogeoyo?','Bạn ăn bông cải xanh không?','아니요, 브로콜리를 안 먹어요.','Aniyo, beurokollireul an meogeoyo.','Không, tôi không ăn bông cải xanh.'],
    ['춤을 춰요?','Chumeul chwoyo?','Bạn nhảy múa không?','아니요, 춤을 안 춰요.','Aniyo, chumeul an chwoyo.','Không, tôi không nhảy múa.'],
    ['야구를 해요?','Yagureul haeyo?','Bạn chơi bóng chày không?','아니요, 야구를 안 해요.','Aniyo, yagureul an haeyo.','Không, tôi không chơi bóng chày.'],
    ['숙제를 좋아해요?','Sukjereul joahaeyo?','Bạn thích làm bài tập không?','아니요, 숙제를 안 좋아해요.','Aniyo, sukjereul an joahaeyo.','Không, tôi không thích làm bài tập.'],
  ].map(([prompt,promptRomanization,meaning,text,roma,translation])=>({prompt,promptRomanization,meaning,sample:line(text,roma,translation),explanation:'Trả lời phủ định theo dấu X ở trang 29. 좋아하다 dùng 안 좋아해요, không tách thành 좋아 안 해요.'}));
  const family=[
    ['누나','nuna','Chị gái (em trai gọi)','책을 읽을 거예요.','Chaegeul ilgeul geoyeyo.','Chị sẽ đọc sách.'],
    ['형','hyeong','Anh trai (em trai gọi)','사진을 찍을 거예요.','Sajineul jjigeul geoyeyo.','Anh sẽ chụp ảnh.'],
    ['동생','dongsaeng','Em','식사할 거예요.','Siksahal geoyeyo.','Em sẽ dùng bữa.'],
    ['아빠','appa','Bố','바비큐를 할 거예요.','Babikyureul hal geoyeyo.','Bố sẽ làm tiệc nướng.'],
  ].map(([text,roma,meaning,a,ar,am])=>({prompt:`${text}는 이번 주말에 뭘 할 거예요?`,promptRomanization:`${roma}${text==='형'||text==='동생'?'eun':'neun'} ibeon jumare mwol hal geoyeyo?`,meaning:`${meaning} sẽ làm gì cuối tuần này? → ${am}`,sample:line(a,ar,am),explanation:'Trả lời theo tranh trang 30.'}));
  // Batchim nouns use 은, not 는.
  family[1].prompt='형은 이번 주말에 뭘 할 거예요?';family[2].prompt='동생은 이번 주말에 뭘 할 거예요?';
  const calendar=[
    {prompt:'Trang 31 · Yuna sẽ đi xem phim ngày nào?',options:[date(10,5),date(10,26)],answers:[date(10,5).text],sample:line('유나는 10월 5일에 영화관에 갈 거예요.','Yunaneun siwol oire yeonghwagwane gal geoyeyo.','Yuna sẽ đến rạp chiếu phim ngày 5 tháng 10.'),explanation:'Theo ví dụ ngay bên cạnh lịch; không suy đoán từ những biểu tượng chưa có chú thích.'},
    {prompt:'Trang 31 · Tiệc sinh nhật Yuna vào ngày nào?',options:[date(10,5),date(10,26)],answers:[date(10,26).text],sample:line('10월 26일에 생일 파티를 할 거예요.','Siwol isimnyugire saengil patireul hal geoyeyo.','Yuna sẽ tổ chức tiệc sinh nhật vào ngày 26 tháng 10.'),explanation:'Mẫu hỏi đáp trong lịch cho ngày 26 tháng 10.'},
  ];
  const clockQuestions=[[9,15],[6,0],[9,45],[3,30],[12,15],[6,30],[12,0]].map(([h,m],i,all)=>{
    const sample=time(h,m);return {prompt:`Đọc giờ ${h}:${String(m).padStart(2,'0')}`,options:[sample,...all.filter(([a,b])=>a!==h||b!==m).slice(0,2).map(([a,b])=>time(a,b))].sort((a,b)=>a.text.localeCompare(b.text)),answers:[sample.text],sample,explanation:'Giờ dùng số thuần Hàn; phút dùng số Hán Hàn. 30 phút còn có thể đọc 반 (ban · rưỡi).'};
  });
  const tomorrow=[
    ['일어나다','ireonada','Thức dậy','일곱 시 삼십 분에 일어날 거예요.','Ilgop si samsip bune ireonal geoyeyo.','Tôi sẽ dậy lúc 7 giờ 30 phút.'],
    ['샤워하다','syawohada','Tắm vòi sen','내일은 샤워를 안 할 거예요.','Naeireun syaworeul an hal geoyeyo.','Ngày mai tôi sẽ không tắm vòi sen.'],
    ['학교에 가다','hakgyoe gada','Đến trường','내일은 학교에 안 갈 거예요.','Naeireun hakgyoe an gal geoyeyo.','Ngày mai tôi sẽ không đến trường.'],
    ['점심을 먹다','jeomsimeul meokda','Ăn trưa','열두 시에 점심을 먹을 거예요.','Yeoldu sie jeomsimeul meogeul geoyeyo.','Tôi sẽ ăn trưa lúc 12 giờ.'],
    ['게임하다','geimhada','Chơi game','세 시에 게임을 할 거예요.','Se sie geimeul hal geoyeyo.','Tôi sẽ chơi game lúc 3 giờ.'],
    ['자다','jada','Ngủ','아홉 시 반에 잘 거예요.','Ahop si bane jal geoyeyo.','Tôi sẽ ngủ lúc 9 giờ rưỡi.'],
  ].map(([prompt,promptRomanization,meaning,text,roma,translation])=>({prompt,promptRomanization,meaning:`${meaning}: tự chọn giờ hoặc nói sẽ không làm.`,sample:line(text,roma,translation),explanation:'Mẫu theo cột Youngjun trang 33, không phải lịch bắt buộc của bạn. Dấu X: kết hợp 안 với dạng tương lai; chỉ thêm 에 sau thời gian có giờ cụ thể.'}));
  const notes=[
    'Bảng gốc có 41 mục (tháng, giờ, phút và từ khác); từ đã học được ghi chú ôn tập. Mục hỗ trợ chỉ lấy từ ghi chú, bài đọc và luyện tập trong PDF.',
    'Trang 17 không phải bài dùng mỗi từ đúng một lần: có thể lặp lại 스케이트 (seukeiteu · trượt băng), và động từ phải chia. Câu 9 được đổi thành 친구와 같이 춤을 ___ (chinguwa gachi chumeul ___ · cùng bạn nhảy…) để ghép đúng với 출 거예요 (chul geoyeyo · sẽ nhảy).',
    'Trang 25 dùng lời dẫn “ngày tháng năm sinh”, nhưng đoạn đọc chỉ có ngày và tháng; không tự bổ sung năm sinh.',
    'Trang 24 Yuna kể về sinh nhật cún Coco, không phải sinh nhật Yuna. Lịch tháng 10 ở trang 31 là bài tập khác về Yuna.',
    'Các tháng dùng số Hán Hàn; giờ dùng số thuần Hàn; phút dùng số Hán Hàn. 유월 (yuwol · tháng 6) và 시월 (siwol · tháng 10) là hai cách đọc đặc biệt.',
    'Không có audio gốc đi kèm PDF. Nút nghe dùng giọng tổng hợp tiếng Hàn của trình duyệt. Phiên âm không thể thể hiện hoàn toàn mọi biến âm và ngữ điệu.',
  ];
  const slideRows=[
    ['Bạn bè sẽ đến tiệc sinh nhật','Câu chủ đề và kế hoạch tương lai.','grammar',['birthday','party']],['Lộ trình Bài 8','Từ vựng, ngữ pháp, luyện tập và vận dụng.','vocab',[]],
    ['Tháng 1–6','Số Hán Hàn + tháng.','vocab',Array.from({length:6},(_,i)=>`month${i+1}`)],['Tháng 7–12','Nhớ cách đọc tháng 10.','vocab',Array.from({length:6},(_,i)=>`month${i+7}`)],['Hai tháng đặc biệt','Tháng 6 và 10: 유월 / 시월 (yuwol / siwol).','time',['month6','month10']],
    ['Giờ 1–6','Giờ dùng số thuần Hàn.','vocab',Array.from({length:6},(_,i)=>`hour${i+1}`)],['Giờ 7–12','Luyện đọc giờ và nghe.','vocab',Array.from({length:6},(_,i)=>`hour${i+7}`)],['Quy tắc đọc giờ','Không dùng số Hán Hàn cho giờ trong các mẫu này.','time',[]],['Đọc phút','10, 20, 30, 40, 50 phút.','vocab',[10,20,30,40,50].map(n=>`minute${n}`)],['Giờ rưỡi','30 phút có thể nói 반 (ban · rưỡi).','time',['half','minute30']],
    ['Từ khác 1','Vì vậy, trượt băng, Giáng sinh và nhận quà.','vocab',['so','skates','ride','christmas','all','receive']],['Từ khác 2','Người nhận, cho, bông cải, nhảy và kế hoạch.','vocab',['to','give','broccoli','dance','game','plan']],
    ['Không làm gì · 안','an · phủ định trước động từ/tính từ.','grammar',[]],['Nói dự định tương lai','-(으)ㄹ 거예요 · (eu)l geoyeyo · sẽ…','grammar',[]],['Ba cách gắn đuôi','Có batchim, không batchim và batchim ㄹ.','grammar',[]],
    ['Nối tháng','5 câu trắc nghiệm theo bảng nối.','practice',[]],['Điền từ phù hợp','10 câu mở; sửa khung câu 9 có ghi chú.','practice',[]],['Chia phủ định','7 câu nhập đáp án, nhận giải thích.','practice',[]],['Chia tương lai','8 câu điền dạng sẽ làm.','practice',[]],['Dịch Việt → Hàn','5 câu tự viết, đối chiếu mẫu.','practice',[]],
    ['Sinh nhật Daniel','Thiệp mời: 17/11, lúc 12:30 PM.','time',['birthday','cake','gift']],['Đọc ngày sinh','Luyện tháng và ngày trên bảng tương tác.','time',[]],['Chọn đồ ăn, quà và địa điểm','Từ dùng trong bộ lập kế hoạch sinh nhật.','birthday',['food','cake','cupcake','pie','pizza','gift','console','robot','rink']],
    ['Ba kế hoạch sinh nhật','Noa, Youngjun và Yuna kể về Coco; 15 câu đọc/nghe.','birthday',[]],['Sinh nhật ngày nào?','Đọc hiểu ngày và tháng, không có năm sinh.','practice',[]],['Bữa tiệc lúc mấy giờ?','Phân biệt AM và PM.','practice',[]],['Ai sẽ làm gì?','Chọn hoạt động theo đoạn đọc.','practice',['skates','pie','meat']],['Sinh nhật của bạn','Ghép ngày tháng và kế hoạch cá nhân.','birthday',['zoo']],
    ['Nói điều không làm','4 câu hỏi đáp phủ định theo tranh.','practice',['broccoli','dance']],['Gia đình cuối tuần','4 câu tự viết theo tranh hoạt động.','practice',['shopping','photo','meal','bbq']],['Lịch tháng 10 của Yuna','Ví dụ: 5/10 đi xem phim, 26/10 tổ chức sinh nhật.','practice',['cinema']],['Đồng hồ không kim','Chỉnh giờ/phút; luyện đọc 7 mốc giờ trong nguồn.','time',[]],['Kế hoạch ngày mai','6 câu mở; dấu X là hoạt động sẽ không làm.','practice',['shower','game']],['Lịch sinh nhật của lớp','Chọn tháng/ngày để tự giới thiệu; không yêu cầu nhập thông tin bạn học.','birthday',[]],['Chuẩn bị tiệc sinh nhật','Chọn ngày, giờ, nơi, hoạt động và món ăn.','birthday',[]],['Giới thiệu kế hoạch','Bộ tạo câu giúp luyện nói theo khung đã học.','birthday',[]],
  ];
  window.KOREAN_LESSON_EIGHT={title:'생일 파티에 친구들이 올 거예요.',romanization:'Saengil patie chingudeuri ol geoyeyo.',meaning:'Bạn bè sẽ đến bữa tiệc sinh nhật.',months,hours,minutes,days,date,time,maxDay,vocabulary,words,forms,grammar,reading,activities,venues,foods,partyPlan,notes,
    workbook:{sections:[
      {id:'months',title:'Trang 16 · Nối tháng',type:'choice',note:'Chọn tháng tương ứng.',items:monthQuestions},
      {id:'fill',title:'Trang 17 · Điền từ',type:'open',note:'Viết cả câu theo nghĩa gợi ý. Có thể lặp lại từ; câu 9 đã sửa khung sai trong bản gốc.',items:fill},
      {id:'negative',title:'Trang 18 · Phủ định',type:'exact',note:'Chỉ viết dạng phủ định lịch sự. Các cách tách danh từ + (을/를) + 안 해요 hợp lệ đều được nhận.',items:negative},
      {id:'future',title:'Trang 19 · Tương lai',type:'exact',note:'Chỉ điền phần còn thiếu, dùng -(으)ㄹ 거예요.',items:future},
      {id:'translate',title:'Trang 20 · Tự dịch',type:'open',note:'Đáp án mở: đối chiếu mẫu, không chấm sai chỉ vì khác cách diễn đạt.',items:translate},
      {id:'reading',title:'Trang 25–27 · Đọc hiểu',type:'choice',note:'Xem ba đoạn sinh nhật ở mục Sinh nhật. Yuna đang kể về Coco.',items:readingQuestions},
      {id:'no',title:'Trang 29 · Nói không',type:'open',note:'Trả lời theo dấu X trong hình.',items:negativeSpeech},
      {id:'family',title:'Trang 30 · Lịch gia đình',type:'open',note:'Nói kế hoạch theo gợi ý tiếng Việt.',items:family},
      {id:'calendar',title:'Trang 31 · Lịch Yuna',type:'choice',note:'Theo hai câu ví dụ trong lịch tháng 10.',items:calendar},
      {id:'clock',title:'Trang 32 · Đọc đồng hồ',type:'choice',note:'Chọn cách đọc giờ và phút. Chưa cần nêu AM/PM ở dạng này.',items:clockQuestions},
      {id:'tomorrow',title:'Trang 33 · Ngày mai',type:'open',note:'Tự chọn giờ hoặc nói sẽ không làm; mẫu bên dưới theo cột Youngjun.',items:tomorrow},
    ]},slides:slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
