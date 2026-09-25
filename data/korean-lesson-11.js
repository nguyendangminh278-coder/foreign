// Bài 11.pdf, 29 pages. Source images remain intact; teaching adaptations are documented.
(() => {
  'use strict';
  const line=(text,romanization,meaning)=>({text,romanization,meaning});
  const vocabulary=[
    ['taekwondo','태권도','taegwondo','Taekwondo','🥋',3,'activities'],
    ['homework','숙제를 하다','sukjereul hada','Làm bài tập về nhà','📒',3,'activities',5],
    ['badminton','배드민턴을 치다','baedeuminteoneul chida','Đánh cầu lông','🏸',3,'activities'],
    ['piano','피아노를 치다','pianoreul chida','Chơi piano','🎹',3,'activities'],
    ['violin','바이올린을 켜다','baiollineul kyeoda','Chơi violin','🎻',4,'activities'],
    ['skateboard','스케이트보드를 타다','seukeiteubodeureul tada','Trượt ván','🛹',4,'activities'],
    ['play','놀다','nolda','Chơi','🧩',4,'activities',5],
    ['practice','연습하다','yeonseupada','Luyện tập','🎯',4,'activities'],
    ['good','잘하다','jalhada','Làm giỏi; làm tốt','⭐',5,'other'],
    ['dojo','태권도 도장','taegwondo dojang','Võ đường Taekwondo','🥋',5,'other'],
    ['first','먼저','meonjeo','Trước; trước tiên','①',5,'other',9],
    ['sick','아프다','apeuda','Đau; ốm','🩹',5,'other',4],
    ['baseball','야구를 하다','yagureul hada','Chơi bóng chày','⚾',5,'other',5],
    ['rank','1위','irwi','Hạng nhất; vị trí số 1','🥇',6,'other'],
    ['tug','줄다리기','juldarigi','Kéo co','🪢',6,'other'],
    ['sportsday','운동회','undonghoe','Ngày hội thể thao','🏅',6,'other',10],
    ['sports','스포츠','seupocheu','Thể thao','⚽',6,'other'],
    ['game','놀이','nori','Trò chơi; sự vui chơi','🎲',6,'other'],
    ['afterschool','방과 후','banggwa hu','Sau giờ học','🎒',15,'support'],
    ['activity','활동','hwaldong','Hoạt động','🏃',19,'support'],
    ['longtime','오랜만에','oraenmane','Sau một thời gian dài; lâu rồi mới','🗓️',19,'support'],
    ['learn','배우다','baeuda','Học (tiếp thu kiến thức/kỹ năng)','📖',19,'support',5],
    ['card','생일 카드','saengil kadeu','Thiệp sinh nhật','💌',19,'support'],
    ['already','벌써','beolsseo','Đã; đã… rồi (sớm hơn dự tính)','⏰',19,'support'],
    ['diary','일기','ilgi','Nhật ký','📔',8,'support'],
    ['swim','수영을 하다','suyeongeul hada','Bơi','🏊',25,'support',5],
    ['soccer','축구를 하다','chukgureul hada','Chơi bóng đá','⚽',28,'support',5],
    ['draw','그림을 그리다','geurimeul geurida','Vẽ tranh','🎨',24,'support'],
    ['glasses','안경을 쓰다','angyeongeul sseuda','Đeo kính','👓',29,'support'],
    ['mirror','거울','geoul','Gương','🪞',29,'support'],
  ].map(([id,text,romanization,meaning,emoji,page,group,review])=>({id,text,romanization,meaning,emoji,page,group,review,core:group!=='support'}));
  const words=Object.fromEntries(vocabulary.map(w=>[w.id,w]));
  const forms=[
    ['해요','haeyo','해','hae','Làm','V/A'],['쳐요','chyeoyo','쳐','chyeo','Đánh; chơi (piano, cầu lông)','V/A'],['켜요','kyeoyo','켜','kyeo','Chơi đàn (violin)','V/A'],['놀아요','norayo','놀아','nora','Chơi','V/A'],['타요','tayo','타','ta','Đi/cưỡi (phương tiện)','V/A'],['잘해요','jalhaeyo','잘해','jalhae','Làm giỏi','V/A'],['아파요','apayo','아파','apa','Đau; ốm','V/A'],['먹어요','meogeoyo','먹어','meogeo','Ăn','V/A'],['공부해요','gongbuhaeyo','공부해','gongbuhae','Học bài','V/A'],['가요','gayo','가','ga','Đi','V/A'],['재미있어요','jaemiisseoyo','재미있어','jaemiisseo','Thú vị','V/A'],['운동해요','undonghaeyo','운동해','undonghae','Tập thể dục','V/A'],
    ['학생이에요','haksaengieyo','학생이야','haksaengiya','Là học sinh','Danh từ có batchim'],['친구예요','chinguyeyo','친구야','chinguya','Là bạn','Danh từ không batchim'],['할 거예요','hal geoyeyo','할 거야','hal geoya','Sẽ làm','Tương lai · ôn Bài 8'],['했어요','haesseoyo','했어','haesseo','Đã làm','Quá khứ · ôn Bài 9'],['배웠어요','baewosseoyo','배웠어','baewosseo','Đã học','Quá khứ · bài đọc'],['썼어요','sseosseoyo','썼어','sseosseo','Đã viết','Quá khứ · bài đọc'],
  ].map(([polite,politeRoma,casual,casualRoma,meaning,group])=>({polite,politeRoma,casual,casualRoma,meaning,group}));
  const grammar=[
    {title:'Nói thân mật · 반말',formula:'아/어요 → 아/어 · a/eoyo → a/eo',explanation:'Trong nhóm câu đang học, bỏ 요 của đuôi lịch sự: 해요 → 해 (haeyo → hae · làm). Dùng giữa bạn thân khi hai bên thoải mái với cách xưng hô này. Không mặc định dùng với người mới quen, người lớn tuổi hay cấp trên. Cùng tuổi không tự động có nghĩa được nói 반말.',examples:[line('오늘은 태권도장에 가.','Oneureun taegwondojange ga.','Hôm nay tớ đến võ đường Taekwondo.'),line('날마다 일기를 써.','Nalmada ilgireul sseo.','Tớ viết nhật ký mỗi ngày.')]},
    {title:'Câu hỏi thân mật',formula:'아/어? · a/eo? · giữ dạng từ, đổi ngữ điệu',explanation:'Câu hỏi và câu kể có thể cùng dạng kết thúc; dựa vào ngữ cảnh, ngữ điệu và dấu hỏi khi viết. Không chỉ máy móc nâng giọng cho mọi câu. Với người bạn thân, thường dùng 나 (na · tớ) thay 저 (jeo · tôi khiêm nhường).',examples:[line('너는 생일이 언제야?','Neoneun saengiri eonjeya?','Sinh nhật cậu khi nào?'),line('한국어가 재미있어?','Hangugeoga jaemiisseo?','Tiếng Hàn có thú vị không?')]},
    {title:'Danh từ & dự định: đổi đuôi riêng',formula:'이에요/예요 → 이야/야 · ieyo/yeyo → iya/ya',explanation:'Không chỉ bỏ 요 ở câu “là…”. Danh từ có batchim dùng 이야; không có batchim dùng 야. 거예요 → 거야 (geoyeyo → geoya · sẽ… trong mẫu dự định). Quá khứ đã học vẫn giữ dấu quá khứ, chỉ đổi mức độ lịch sự.',examples:[line('나는 학생이야.','Naneun haksaengiya.','Tớ là học sinh.'),line('숙제를 먼저 할 거야.','Sukjereul meonjeo hal geoya.','Tớ sẽ làm bài tập trước.'),line('엄마하고 배드민턴을 쳤어.','Eommahago baedeuminteoneul chyeosseo.','Tớ đã đánh cầu lông cùng mẹ.')]},
  ];
  const reading=[
    ['Minji','어제 뭘 했어?','Eoje mwol haesseo?','Hôm qua cậu đã làm gì?'],
    ['Daniel','네 시부터 다섯 시까지 태권도를 배웠어. 그리고 저녁에는 숙제를 했어. 너는 어제 뭘 했어?','Ne sibuteo daseot sikkaji taegwondoreul baewosseo. Geurigo jeonyeogeneun sukjereul haesseo. Neoneun eoje mwol haesseo?','Tớ học Taekwondo từ 4 giờ đến 5 giờ. Buổi tối tớ làm bài tập. Hôm qua cậu làm gì?'],
    ['Minji','나는 엄마하고 오랜만에 배드민턴을 쳤어. 그리고 저녁에는 피아노 연습을 했어.','Naneun eommahago oraenmane baedeuminteoneul chyeosseo. Geurigo jeonyeogeneun piano yeonseubeul haesseo.','Lâu rồi tớ mới đánh cầu lông cùng mẹ. Buổi tối tớ luyện piano.'],
    ['Daniel','난 바이올린을 배워. 바이올린은 아주 재미있어.','Nan baiollineul baewo. Baiollineun aju jaemiisseo.','Tớ học violin. Violin rất thú vị.'],
    ['Minji','피아노도 재미있어. 그런데 조금 어려워.','Pianodo jaemiisseo. Geureonde jogeum eoryeowo.','Piano cũng thú vị. Nhưng hơi khó.'],
    ['Daniel','이번 주말에 뭘 할 거야?','Ibeon jumare mwol hal geoya?','Cuối tuần này cậu sẽ làm gì?'],
    ['Minji','이번 주에는 학교 숙제가 많아. 그래서 숙제를 먼저 할 거야. 그리고 동생하고 같이 게임을 할 거야. 너는 주말에 뭘 할 거야?','Ibeon jueneun hakgyo sukjega mana. Geuraeseo sukjereul meonjeo hal geoya. Geurigo dongsaenghago gachi geimeul hal geoya. Neoneun jumare mwol hal geoya?','Tuần này có nhiều bài tập. Tớ sẽ làm bài tập trước, rồi chơi game cùng em. Cuối tuần cậu sẽ làm gì?'],
    ['Daniel','다음 주 월요일이 노아 생일이야. 그래서 생일 선물을 살 거야.','Daeum ju woryoiri Noa saengiriya. Geuraeseo saengil seonmureul sal geoya.','Thứ Hai tuần sau là sinh nhật Noa. Vì vậy tớ sẽ mua quà sinh nhật.'],
    ['Minji','나도 노아 생일 파티에 가. 나는 생일 카드를 벌써 썼어.','Nado Noa saengil patie ga. Naneun saengil kadeureul beolsseo sseosseo.','Tớ cũng đi dự tiệc sinh nhật Noa. Tớ đã viết thiệp sinh nhật rồi.'],
    ['Daniel','아, 그래? 노아가 아주 좋아할 거야.','A, geurae? Noaga aju joahal geoya.','À, vậy à? Noa sẽ rất thích đấy.'],
  ].map(([speaker,...s])=>({speaker,...line(...s)}));
  const activities=[
    ['taekwondo','태권도를','taegwondoreul','해','hae','잘해','jalhae','tập Taekwondo'],
    ['homework','숙제를','sukjereul','해','hae','잘해','jalhae','làm bài tập'],
    ['badminton','배드민턴을','baedeuminteoneul','쳐','chyeo','잘 쳐','jal chyeo','đánh cầu lông'],
    ['piano','피아노를','pianoreul','쳐','chyeo','잘 쳐','jal chyeo','chơi piano'],
    ['violin','바이올린을','baiollineul','켜','kyeo','잘 켜','jal kyeo','chơi violin'],
    ['skateboard','스케이트보드를','seukeiteubodeureul','타','ta','잘 타','jal ta','trượt ván'],
    ['swim','수영을','suyeongeul','해','hae','잘해','jalhae','bơi'],
    ['soccer','축구를','chukgureul','해','hae','잘해','jalhae','chơi bóng đá'],
  ].map(([id,object,objectRoma,verb,verbRoma,good,goodRoma,meaning])=>({...words[id],object,objectRoma,verb,verbRoma,good,goodRoma,actionMeaning:meaning}));
  function routine(index,polite=false){const a=activities[index];if(!a)throw new RangeError('Hoạt động ngoài bài');return line(`${polite?'저는':'나는'} 방과 후에 ${a.object} ${a.verb}${polite?'요':''}.`,`${polite?'Jeoneun':'Naneun'} banggwa hue ${a.objectRoma} ${a.verbRoma}${polite?'yo':''}.`,`${polite?'Tôi':'Tớ'} ${a.actionMeaning} sau giờ học.`);}
  const people=[{text:'민지',romanization:'Minji',meaning:'Minji',topic:'민지는',topicRoma:'Minjineun'},{text:'다니엘',romanization:'Daniel',meaning:'Daniel',topic:'다니엘은',topicRoma:'Daniereun'}];
  function interview(person,like,good){const p=people[person],a=activities[like],b=activities[good];if(!p||!a||!b)throw new RangeError('Lựa chọn ngoài bài');return [line(`${p.topic} ${a.object} 좋아해.`,`${p.topicRoma} ${a.objectRoma} joahae.`,`${p.meaning} thích ${a.actionMeaning}.`),line(`그리고 ${b.object} ${b.good}.`,`Geurigo ${b.objectRoma} ${b.goodRoma}.`,`Và ${p.meaning} ${b.actionMeaning} giỏi.`)];}
  const pollOptions=['tug','soccer','badminton','baseball','taekwondo'].map(id=>words[id]);
  function winners(votes){if(votes.length!==pollOptions.length||votes.some(n=>!Number.isInteger(n)||n<0||n>99))throw new RangeError('Số phiếu phải là số nguyên từ 0 đến 99');const max=Math.max(...votes);return max?pollOptions.filter((_,i)=>votes[i]===max):[];}
  const mirror=[
    [line('거울아 거울아! 우리 반에서 누가 태권도를 잘해?','Geoura geoura! Uri baneseo nuga taegwondoreul jalhae?','Gương ơi gương ơi! Ai trong lớp giỏi Taekwondo?'),line('내가 태권도를 잘해.','Naega taegwondoreul jalhae.','Tớ giỏi Taekwondo.')],
    [line('거울아 거울아! 우리 반에서 누가 그림을 잘 그려?','Geoura geoura! Uri baneseo nuga geurimeul jal geuryeo?','Gương ơi gương ơi! Ai trong lớp vẽ giỏi?'),line('내가 그림을 잘 그려.','Naega geurimeul jal geuryeo.','Tớ vẽ giỏi.')],
    [line('거울아 거울아! 우리 반에서 누가 안경을 쓰고 있어?','Geoura geoura! Uri baneseo nuga angyeongeul sseugo isseo?','Gương ơi gương ơi! Ai trong lớp đang đeo kính?'),line('내가 안경을 쓰고 있어.','Naega angyeongeul sseugo isseo.','Tớ đang đeo kính.')],
  ];
  const fill=[
    ['나는 태권도를 ___.','Naneun taegwondoreul ___.','Tớ tập Taekwondo.','하다','hada','해','hae'],['민수는 피아노를 ___.','Minsuneun pianoreul ___.','Minsu chơi piano.','치다','chida','쳐','chyeo'],['오늘 숙제를 많이 ___.','Oneul sukjereul mani ___.','Hôm nay làm nhiều bài tập.','하다','hada','해','hae'],['언니는 바이올린을 ___.','Eonnineun baiollineul ___.','Chị chơi violin (em gái gọi).','켜다','kyeoda','켜','kyeo'],['친구들이 공원에서 ___.','Chingudeuri gongwoneseo ___.','Các bạn chơi ở công viên.','놀다','nolda','놀아','nora'],['나는 스케이트보드를 ___.','Naneun seukeiteubodeureul ___.','Tớ trượt ván.','타다','tada','타','ta'],['동생이 운동을 아주 ___.','Dongsaengi undongeul aju ___.','Em tập thể dục rất giỏi.','잘하다','jalhada','잘해','jalhae'],['오늘 몸이 조금 ___.','Oneul momi jogeum ___.','Hôm nay hơi đau/ốm.','아프다','apeuda','아파','apa'],['우리는 줄다리기를 ___.','Urineun juldarigireul ___.','Chúng tớ chơi kéo co.','하다','hada','해','hae'],['형은 축구를 정말 ___.','Hyeongeun chukgureul jeongmal ___.','Anh chơi bóng đá rất giỏi (em trai gọi).','잘하다','jalhada','잘해','jalhae'],
  ].map(([prompt,promptRomanization,meaning,verb,roma,a,ar])=>({prompt,promptRomanization,meaning:`${meaning} · Gợi ý: ${verb} (${roma})`,answers:[a],sample:line(prompt.replace('___',a),promptRomanization.replace('___',ar),meaning),explanation:'Chỉ nhập phần còn thiếu. Với hội thoại bạn thân, hai câu dùng 저는 trong nguồn được đổi thành 나는; trọng tâm vẫn là đuôi thân mật.'}));
  const convert=[...['먹어요','놀아요','공부해요','가요','재미있어요','아파요','잘해요','운동해요'].map(t=>forms.find(f=>f.polite===t)),{polite:'배드민턴을 쳐요',politeRoma:'baedeuminteoneul chyeoyo',casual:'배드민턴을 쳐',casualRoma:'baedeuminteoneul chyeo',meaning:'Đánh cầu lông'},{polite:'피아노를 쳐요',politeRoma:'pianoreul chyeoyo',casual:'피아노를 쳐',casualRoma:'pianoreul chyeo',meaning:'Chơi piano'}].map(f=>({prompt:f.polite,promptRomanization:f.politeRoma,meaning:f.meaning,answers:[f.casual],sample:line(f.casual,f.casualRoma,f.meaning),explanation:'Giữ nội dung, đổi đuôi lịch sự sang thân mật.'}));
  const questions=[
    ['너 태권도 해요?','Neo taegwondo haeyo?','Cậu tập Taekwondo à?','너 태권도 해?','Neo taegwondo hae?'],['한국어 재미있어요?','Hangugeo jaemiisseoyo?','Tiếng Hàn có thú vị không?','한국어 재미있어?','Hangugeo jaemiisseo?'],['오늘 숙제 많아요?','Oneul sukje manayo?','Hôm nay nhiều bài tập không?','오늘 숙제 많아?','Oneul sukje mana?'],['너 피아노 쳐요?','Neo piano chyeoyo?','Cậu chơi piano à?','너 피아노 쳐?','Neo piano chyeo?'],['지금 어디 가요?','Jigeum eodi gayo?','Bây giờ cậu đi đâu?','지금 어디 가?','Jigeum eodi ga?'],['배드민턴 잘 쳐요?','Baedeuminteon jal chyeoyo?','Cậu đánh cầu lông giỏi không?','배드민턴 잘 쳐?','Baedeuminteon jal chyeo?'],
  ].map(([prompt,promptRomanization,meaning,a,ar])=>({prompt,promptRomanization,meaning,sample:line(a,ar,meaning),explanation:'Câu đề giữ theo slide để luyện chuyển đuôi. 너 thường đi cùng cách nói thân mật; tránh dùng 너 với người cần nói lịch sự. Có thể thêm tiểu từ phù hợp nên không chấm cứng một chuỗi.'}));
  const order=[
    [['태권도를','잘','나는','해'],['taegwondoreul','jal','naneun','hae'],'나는 태권도를 잘해.','Naneun taegwondoreul jalhae.','Tớ giỏi Taekwondo.'],[['숙제를','지금','해'],['sukjereul','jigeum','hae'],'지금 숙제를 해.','Jigeum sukjereul hae.','Bây giờ tớ làm bài tập.'],[['친구들이','공원에서','놀아'],['chingudeuri','gongwoneseo','nora'],'친구들이 공원에서 놀아.','Chingudeuri gongwoneseo nora.','Các bạn chơi ở công viên.'],[['너','배드민턴을','쳐?'],['neo','baedeuminteoneul','chyeo?'],'너 배드민턴을 쳐?','Neo baedeuminteoneul chyeo?','Cậu đánh cầu lông à?'],[['오늘','운동회에','가?'],['oneul','undonghoee','ga?'],'오늘 운동회에 가?','Oneul undonghoee ga?','Hôm nay cậu đi ngày hội thể thao à?'],[['피아노를','언니가','쳐'],['pianoreul','eonniga','chyeo'],'언니가 피아노를 쳐.','Eonniga pianoreul chyeo.','Chị chơi piano.'],
  ].map(([tokens,tokenRoma,...s],i)=>({prompt:`Ghép câu ${i+1}`,meaning:s[2],tokens,tokenRoma,sample:line(...s),explanation:i===0?'Đổi 저는 thành 나는 cho ngữ cảnh bạn thân. 잘 + 해 được viết 잘해 khi mang nghĩa làm giỏi; đối chiếu mẫu sau khi ghép.':'Động từ thường ở cuối; trật tự các cụm đầu câu có thể thay đổi.'}));
  const rewrite=[
    ['민수는 태권도를 해요.','Minsuneun taegwondoreul haeyo.','Minsu tập Taekwondo.','민수는 태권도를 해.','Minsuneun taegwondoreul hae.'],['친구들이 놀아요.','Chingudeuri norayo.','Các bạn chơi.','친구들이 놀아.','Chingudeuri nora.'],['저는 숙제를 해요.','Jeoneun sukjereul haeyo.','Tôi làm bài tập.','나는 숙제를 해.','Naneun sukjereul hae.'],['언니는 바이올린을 켜요.','Eonnineun baiollineul kyeoyo.','Chị chơi violin.','언니는 바이올린을 켜.','Eonnineun baiollineul kyeo.'],['동생이 피아노를 쳐요.','Dongsaengi pianoreul chyeoyo.','Em chơi piano.','동생이 피아노를 쳐.','Dongsaengi pianoreul chyeo.'],['오늘 몸이 아파요.','Oneul momi apayo.','Hôm nay người đau/ốm.','오늘 몸이 아파.','Oneul momi apa.'],
  ].map(([prompt,promptRomanization,meaning,a,ar])=>({prompt,promptRomanization,meaning,sample:line(a,ar,meaning),explanation:'Đổi sang lời nói với bạn thân. Mẫu dùng 나 thay 저; nếu chỉ đổi đuôi theo đề gốc, hãy so sánh thêm cách xưng hô, không coi việc giữ 저 là luôn sai trong mọi ngữ cảnh.'}));
  const tfOptions=[line('O','','Có thông tin trong đoạn'),line('X','','Không được nhắc trong đoạn')];
  const readingQuiz=[
    ['Daniel','태권도를 배워.','Taegwondoreul baewo.','Học Taekwondo.','O','Daniel đã học Taekwondo từ 4 đến 5 giờ.'],['Daniel','숙제를 해.','Sukjereul hae.','Làm bài tập.','O','Daniel nói buổi tối hôm qua đã làm bài tập.'],['Daniel','바이올린을 배워.','Baiollineul baewo.','Học violin.','O','Daniel nói hiện đang học violin; không khẳng định đã học violin hôm qua.'],['Daniel','수영을 해.','Suyeongeul hae.','Bơi.','X','Đoạn đọc không nhắc Daniel bơi.'],
    ['Minji','숙제를 해.','Sukjereul hae.','Làm bài tập.','O','Minji nói sẽ làm bài tập trước vào cuối tuần. Đây là dự định, không phải việc đã làm hôm qua.'],['Minji','피아노 연습을 해.','Piano yeonseubeul hae.','Luyện piano.','O','Minji nói đã luyện piano buổi tối.'],['Minji','강아지하고 놀아.','Gangajihago nora.','Chơi cùng cún.','X','Tranh gợi hoạt động với cún, nhưng đoạn đọc không nói Minji làm việc này.'],['Minji','배드민턴을 쳐.','Baedeuminteoneul chyeo.','Đánh cầu lông.','O','Minji đã đánh cầu lông cùng mẹ.'],
  ].map(([name,t,r,m,a,explanation])=>({prompt:`${name}: hoạt động này có được nhắc tới không?`,meaning:`${t} (${r}) · ${m}`,options:tfOptions,answers:[a],sample:line(t,r,m),explanation}));
  const monday={prompt:'Thứ Hai tuần sau, Daniel và Minji đi đâu?',options:[line('숙제를 해','sukjereul hae','Làm bài tập'),line('피아노를 쳐','pianoreul chyeo','Chơi piano'),line('게임을 해','geimeul hae','Chơi game'),line('노아 생일 파티에 가','Noa saengil patie ga','Đi dự tiệc sinh nhật Noa')],answers:['노아 생일 파티에 가'],sample:line('노아 생일 파티에 가.','Noa saengil patie ga.','Đi dự tiệc sinh nhật Noa.'),explanation:'Sinh nhật Noa là thứ Hai tuần sau; cả hai cùng nói về việc dự tiệc.'};
  const dialogueA=[
    ['뭘 하고 있어?','Mwol hago isseo?','Cậu đang làm gì?','숙제를 해.','Sukjereul hae.','Tớ làm bài tập.'],['내일 뭘 해?','Naeil mwol hae?','Ngày mai cậu làm gì?','바이올린을 켜.','Baiollineul kyeo.','Tớ chơi violin.'],['무슨 동물이 좋아?','Museun dongmuri joa?','Cậu thích con vật nào?','강아지가 좋아.','Gangajiga joa.','Tớ thích cún.'],['어디에 가?','Eodie ga?','Cậu đi đâu?','공원에 가.','Gongwone ga.','Tớ đi công viên.'],
  ].map(([prompt,promptRomanization,meaning,...s],i)=>({prompt,promptRomanization,meaning,sample:line(...s),explanation:i===1?'Trang 23 dùng 하다 cho violin; phần học dùng 켜다 (kyeoda · chơi đàn kéo dây) nhất quán với bảng từ. Câu hỏi được điền sẵn để tập trả lời.':'Câu hỏi đã được điền sẵn từ slide; tự nói câu trả lời rồi đối chiếu mẫu.'}));
  const dialogueB=[
    ['교실에서 그림을 그려.','Gyosireseo geurimeul geuryeo.','Tớ vẽ tranh trong lớp.','어디에서 그림을 그려?','Eodieseo geurimeul geuryeo?','Cậu vẽ tranh ở đâu?'],['친구들하고 야구해.','Chingudeulhago yaguhae.','Tớ chơi bóng chày với bạn bè.','친구들하고 야구해?','Chingudeulhago yaguhae?','Cậu chơi bóng chày với bạn bè à?'],['아니, 안 아파.','Ani, an apa.','Không, tớ không đau/ốm.','어디 아파?','Eodi apa?','Cậu đau chỗ nào / không khỏe à?'],['응, 숙제가 많이 어려워.','Eung, sukjega mani eoryeowo.','Ừ, bài tập khó lắm.','숙제가 어려워?','Sukjega eoryeowo?','Bài tập có khó không?'],
  ].map(([prompt,promptRomanization,meaning,...s])=>({prompt,promptRomanization,meaning:`Đây là câu trả lời: ${meaning} Hãy viết câu hỏi thân mật phù hợp.`,sample:line(...s),explanation:'Trang 24: đặt câu hỏi tương ứng với câu trả lời. Câu mở có thể có nhiều cách diễn đạt đúng.'}));
  const contexts=[
    ['Nói với bạn thân, hai bên đã đồng ý nói thân mật.','친구야','chinguya','Là bạn','친구예요','chinguyeyo','Là bạn (lịch sự)',0],
    ['Chọn cách nói lịch sự hơn khi hỏi một người mới quen đi đâu.','어디 가?','Eodi ga?','Đi đâu? (thân mật)','어디 가요?','Eodi gayo?','Bạn đi đâu ạ?',1],
    ['Kể với bạn thân: tớ sẽ làm bài tập.','숙제를 할 거야.','Sukjereul hal geoya.','Tớ sẽ làm bài tập.','숙제를 할 거예.','Sukjereul hal geoye.','Dạng sai do chỉ bỏ 요',0],
  ].map(([prompt,a,ar,am,b,br,bm,correct])=>{const options=[line(a,ar,am),line(b,br,bm)];return {prompt,options,answers:[options[correct].text],sample:options[correct],explanation:correct===1?'Khi mới quen và chưa thống nhất cách xưng hô, nên giữ đuôi lịch sự 요 (yo).':'Chọn cách thân mật đúng theo ngữ cảnh yêu cầu; danh từ và 거예요 có cách đổi riêng.'};});
  const notes=[
    'Trang 7–8 ghi “평사”; phần học dùng “평서” (pyeongseo · trần thuật). Đây là ghi chú sửa thuật ngữ, ảnh gốc giữ nguyên.',
    'Trang 9 ghi 나는 생일이 언제야? (naneun saengiri eonjeya · sinh nhật tớ khi nào?). Để hỏi sinh nhật bạn, phần học đổi thành 너는 생일이 언제야? (neoneun saengiri eonjeya).',
    'Một số bài gốc ghép 저는 với đuôi thân mật. Trong ngữ cảnh bạn bè ở đây, mẫu dùng 나는 cho nhất quán. Không kết luận 저 và đuôi thân mật không bao giờ có thể cùng xuất hiện.',
    'Trang 23 dùng 하다 (hada · làm) với violin. Phần trả lời mẫu dùng 켜다 (kyeoda · chơi violin) như bảng từ trang 4; đây là điều chỉnh có ghi chú.',
    'Trang 17 thiếu audio/transcript để ghép tên người với số trên tranh. Không đoán từ vị trí nhân vật. Nút nghe ở các mục khác dùng giọng tổng hợp ko-KR, không phải bản ghi gốc; audio/lesson-11.mp3 của khóa tiếng Trung không được dùng cho bài này.',
    'Bài đọc nhắc cả hôm qua, hiện tại và dự định. Câu O/X hỏi hoạt động được nhắc, không coi tất cả đã diễn ra hôm qua. Phỏng vấn và bình chọn trên web là luyện tập cục bộ, không gửi dữ liệu hay thu phiếu từ người khác.',
  ];
  const slideRows=[
    ['Đánh cầu lông cùng mẹ','Câu chủ đề ở quá khứ thân mật.','grammar',[]],['Lộ trình Bài 11','Hoạt động, cách nói thân mật và vận dụng.','vocab',[]],['Sau giờ học 1','Taekwondo, bài tập, cầu lông và piano.','vocab',['taekwondo','homework','badminton','piano']],['Sau giờ học 2','Violin, trượt ván, chơi và luyện tập.','vocab',['violin','skateboard','play','practice']],['Từ khác 1','Làm giỏi, võ đường, trước tiên, đau và bóng chày.','vocab',['good','dojo','first','sick','baseball']],['Từ khác 2','Hạng nhất, kéo co, ngày hội thể thao và trò chơi.','vocab',['rank','tug','sportsday','sports','game']],
    ['Khi nào dùng thân mật?','반말 · banmal · cần phù hợp quan hệ giao tiếp.','grammar',[]],['Đổi đuôi câu kể','Không chỉ bỏ 요 (yo) ở câu danh từ.','grammar',[]],['Câu hỏi thân mật','Dùng ngữ cảnh và ngữ điệu.','grammar',[]],['Điền đuôi thân mật','10 câu điền có từ gợi ý.','practice',[]],['Đổi cách nói','10 câu đổi lịch sự sang thân mật.','practice',[]],['Chuyển câu hỏi','6 câu hỏi mở.','practice',[]],['Sắp xếp câu','6 câu ghép mảnh.','practice',[]],['Viết lại câu','6 câu đổi cách nói, có lưu ý xưng hô.','practice',[]],
    ['Các bạn sau giờ học','Bộ chọn hoạt động để tự giới thiệu.','friends',['afterschool']],['Bạn thường làm gì?','Chọn nhiều hoạt động, xem câu tương ứng.','friends',[]],['Nghe và ghép tên','Thiếu audio: không tự tạo đáp án cho tranh.','friends',[]],['Bạn giỏi điều gì?','Bộ phỏng vấn về sở thích và thế mạnh.','friends',[]],['Daniel làm gì?','Hội thoại 10 lượt; đọc hiểu 4 câu.','reading',[]],['Minji làm gì?','Phân biệt việc đã làm và dự định trong 4 câu.','practice',[]],['Thứ Hai tuần sau','Hai bạn dự tiệc sinh nhật Noa.','practice',[]],['Nói về buổi chiều','Bộ tạo câu và ô tự viết.','friends',[]],['Điền câu trả lời','4 tình huống thân mật.','practice',[]],['Điền câu hỏi','4 câu hỏi dựa trên câu trả lời.','practice',[]],['Phỏng vấn bạn cùng lớp','Chọn sở thích và thế mạnh; dữ liệu mẫu.','friends',[]],['Giới thiệu về bạn','Tạo hai câu có phiên âm và nghĩa.','friends',[]],['Bình chọn thể thao','Nhập số phiếu luyện tập, không thu dữ liệu mạng.','friends',[]],['Trình bày kết quả','Hiển thị hạng nhất và đồng hạng.','friends',[]],['Gương ơi gương ơi','Ba thẻ hỏi đáp, chơi theo lượt.','friends',['mirror','glasses','draw']],
  ];
  window.KOREAN_LESSON_ELEVEN={title:'엄마하고 배드민턴을 쳤어.',romanization:'Eommahago baedeuminteoneul chyeosseo.',meaning:'Tớ đã đánh cầu lông cùng mẹ.',vocabulary,words,forms,grammar,reading,activities,routine,people,interview,pollOptions,winners,mirror,notes,
    workbook:{sections:[{id:'fill',title:'Trang 10 · Điền thân mật',type:'exact',note:'Chỉ nhập đuôi từ còn thiếu theo gợi ý.',items:fill},{id:'convert',title:'Trang 11 · Đổi đuôi',type:'exact',note:'Đổi cả cụm sang thân mật, giữ nguyên nghĩa.',items:convert},{id:'questions',title:'Trang 12 · Câu hỏi',type:'open',note:'Tự viết câu hỏi thân mật; thêm tiểu từ khi cần.',items:questions},{id:'order',title:'Trang 13 · Ghép câu',type:'order',note:'Bấm để thêm/gỡ mảnh rồi đối chiếu mẫu.',items:order},{id:'rewrite',title:'Trang 14 · Viết lại',type:'open',note:'Đổi câu để nói với bạn thân; xem lưu ý cách xưng hô.',items:rewrite},{id:'reading',title:'Trang 19–20 · Đọc hiểu',type:'choice',note:'Có nhắc trong hội thoại hay không? Chú ý cả quá khứ, hiện tại và dự định.',items:readingQuiz},{id:'monday',title:'Trang 21 · Thứ Hai',type:'choice',note:'Chọn theo thông tin hội thoại.',items:[monday]},{id:'answers',title:'Trang 23 · Trả lời',type:'open',note:'Câu hỏi đã điền sẵn; hãy viết câu trả lời thân mật.',items:dialogueA},{id:'ask',title:'Trang 24 · Đặt câu hỏi',type:'open',note:'Đọc câu trả lời rồi đặt câu hỏi phù hợp.',items:dialogueB},{id:'context',title:'Ôn ngữ pháp · Chọn ngữ cảnh',type:'choice',note:'Ba câu bổ trợ quy tắc dùng thân mật; không nằm trong bảng bài tập gốc.',items:contexts}]},slides:slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
