// Bài 6.pdf, all 28 pages. Source images retained separately from annotated learning content.
(() => {
  const line = (text, romanization, meaning) => ({ text, romanization, meaning });
  const vocabulary = [
    ['front','앞','ap','ap','phía trước','↗','position',3,'앞에','ape'],
    ['behind','뒤','dwi','tuy','phía sau','↙','position',3,'뒤에','dwie'],
    ['above','위','wi','uy','bên trên','↑','position',3,'위에','wie'],
    ['below','아래','arae','a-re','bên dưới','↓','position',3,'아래에','araee'],
    ['inside','안','an','an','bên trong','▣','position',4,'안에','ane'],
    ['beside','옆','yeop','yơp','bên cạnh','↔','position',4,'옆에','yeope'],
    ['left','왼쪽','oenjjok','uên-jjôk','bên trái','←','position',4,'왼쪽에','oenjjoge'],
    ['right','오른쪽','oreunjjok','ô-rưn-jjôk','bên phải','→','position',4,'오른쪽에','oreunjjoge'],
    ['window','창문','changmun','chang-mun','cửa sổ','🪟','objects',5],
    ['calendar','달력','dallyeok','tal-lyơk','lịch','📅','objects',5],
    ['wall','벽','byeok','pyơk','bức tường','🧱','objects',5],
    ['door','문','mun','mun','cửa','🚪','objects',5],
    ['pillow','베개','begae','pê-ge','gối','🛏️','objects',6],
    ['bed','침대','chimdae','chim-đe','giường','🛏️','objects',6],
    ['shelf','책장','chaekjang','chek-jjang','kệ sách','📚','objects',6],
    ['ball','농구공','nonggugong','nông-gu-gông','quả bóng rổ','🏀','objects',6],
    ['sofa','소파','sopa','sô-pha','ghế sofa','🛋️','objects',7],
    ['cat','고양이','goyangi','kô-yang-i','mèo','🐈','objects',7],
    ['dog','강아지','gangaji','kang-a-ji','chó con; cún','🐕','objects',7],
    ['table','테이블','teibeul','thê-i-bưl','bàn','🪑','objects',7],
    ['crayons','크레파스','keurepaseu','khư-re-pha-sư','bút sáp màu','🖍️','reading',1],
    ['desk','책상','chaeksang','chek-ssang','bàn học','🪑','review',8],
    ['chair','의자','uija','ưi-ja','ghế','🪑','review',8],
    ['room','방','bang','pang','phòng','🚪','review',8],
    ['book','책','chaek','chek','sách','📕','review',10],
    ['bag','가방','gabang','ka-bang','cặp, túi','🎒','review',11],
    ['eraser','지우개','jiugae','chi-u-ge','tẩy','🧽','review',16],
    ['comic','만화책','manhwachaek','man-hoa-chek','truyện tranh','📖','review',17],
    ['pencil','연필','yeonpil','yơn-phil','bút chì','✏️','review',21],
    ['glasses','안경','angyeong','an-gyơng','kính mắt','👓','review',21],
    ['doll','인형','inhyeong','in-hyơng','búp bê','🧸','review',23],
  ].map(([id,text,romanization,reading,meaning,emoji,group,page,location,locationRoma]) => ({id,text,romanization,reading,meaning,emoji,group,page,location,locationRoma}));
  const words = Object.fromEntries(vocabulary.map((w) => [w.id,w]));
  const subjects = {cat:'goyangiga',dog:'gangajiga',book:'chaegi',crayons:'keurepaseuga',pillow:'begaega',ball:'nonggugongi',eraser:'jiugaega',calendar:'dallyeogi',door:'muni',window:'changmuni',desk:'chaeksangi',bed:'chimdaega',shelf:'chaekjangi',sofa:'sopaga',comic:'manhwachaegi',pencil:'yeonpiri',glasses:'angyeongi',bag:'gabangi',doll:'inhyeongi'};
  const particle = (text) => (text.charCodeAt(text.length-1)-0xac00)%28 ? '이' : '가';
  function locationSentence(subject,anchor,position) {
    const s=words[subject],a=words[anchor],p=words[position];
    return line(`${s.text}${particle(s.text)} ${a.text} ${p.location} 있어요.`, `${subjects[subject]} ${a.romanization} ${p.locationRoma} isseoyo.`, `${s.meaning} ở ${p.meaning} ${a.meaning}.`);
  }
  const reading = [
    ['여기는 영준이 방이에요.','Yeogineun Yeongjuni bangieyo.','Đây là phòng của Youngjun.'],
    ['영준이 방에는 침대하고 책장하고 책상하고 의자가 있어요.','Yeongjuni bangeneun chimdaehago chaekjanghago chaeksanghago uijaga isseoyo.','Trong phòng Youngjun có giường, kệ sách, bàn học và ghế.'],
    ['침대는 방 왼쪽에 있어요.','Chimdaeneun bang oenjjoge isseoyo.','Giường nằm bên trái căn phòng.'],
    ['그리고 침대 오른쪽에는 책장이 있어요.','Geurigo chimdae oreunjjogeneun chaekjangi isseoyo.','Và bên phải giường có kệ sách.'],
    ['책장 안에 책이 열 권 있어요.','Chaekjang ane chaegi yeol gwon isseoyo.','Trong kệ có mười cuốn sách.'],
    ['만화책이 책상 위에 있어요.','Manhwachaegi chaeksang wie isseoyo.','Truyện tranh ở trên bàn học.'],
    ['만화책 옆에는 크레파스가 있어요.','Manhwachaek yeopeneun keurepaseuga isseoyo.','Bên cạnh truyện tranh có bút sáp màu.'],
    ['책상 아래에는 농구공이 한 개 있어요.','Chaeksang araeeneun nonggugongi han gae isseoyo.','Dưới bàn có một quả bóng rổ.'],
    ['강아지하고 고양이도 영준이 방에 있어요.','Gangajihago goyangido Yeongjuni bange isseoyo.','Chó con và mèo cũng ở trong phòng Youngjun.'],
    ['강아지는 책상 오른쪽에 있어요. 강아지 이름은 쿠키예요.','Gangajineun chaeksang oreunjjoge isseoyo. Gangaji ireumeun Kukiyeyo.','Chó con ở bên phải bàn. Tên cún là Cookie.'],
    ['고양이는 의자 아래에 있어요. 고양이 이름은 캔디예요. 캔디는 예뻐요.','Goyangineun uija araee isseoyo. Goyangi ireumeun Kaendiyeyo. Kaendineun yeppeoyo.','Mèo ở dưới ghế. Tên mèo là Candy. Candy xinh xắn.'],
    ['영준이 방은 커요. 그리고 좋아요.','Yeongjuni bangeun keoyo. Geurigo joayo.','Phòng Youngjun lớn. Và đẹp/tốt nữa.'],
  ].map((s) => line(...s));
  const sourceNotes = [
    'Phần từ vựng chính: 8 từ vị trí và 12 danh từ ở trang 3–7. Bút sáp màu xuất hiện ở tiêu đề và bài đọc; từ cũ có nhãn ôn tập.',
    'Viết tách danh từ và vị trí: 책상 위에 (chaeksang wie · ở trên bàn). Tiểu từ 에 viết liền với từ vị trí.',
    'Tài liệu dùng 달력이 벽 위에 있어요 (Dallyeogi byeok wie isseoyo · lịch ở phía trên bức tường). Nếu muốn nói lịch treo trên mặt tường, cách thông thường là 달력이 벽에 있어요 (Dallyeogi byeoge isseoyo).',
    'Không có audio gốc đính kèm. Nút nghe đọc phần chữ bằng giọng tổng hợp tiếng Hàn của trình duyệt.',
  ];
  const grammar = [
    {title:'Nối các danh từ bằng 하고',formula:'N1 + 하고 + N2',romanization:'hago · và',explanation:'Gắn 하고 vào danh từ thứ nhất để liệt kê. Có hay không có batchim đều dùng 하고; tiểu từ chủ ngữ/tân ngữ đặt sau danh từ cuối theo vai trò của cả nhóm.',examples:[line('책상하고 의자가 방에 있어요.','Chaeksanghago uijaga bange isseoyo.','Bàn học và ghế ở trong phòng.'),line('저는 강아지하고 고양이를 좋아해요.','Jeoneun gangajihago goyangireul joahaeyo.','Tôi thích chó con và mèo.')]},
    {title:'Nói đồ vật ở đâu',formula:'N + 이/가 + địa điểm + 에 있어요',romanization:'i/ga · e isseoyo',explanation:'Danh từ có batchim dùng 이, không có dùng 가. 에 đánh dấu nơi tồn tại; không dùng 에서 cho nghĩa ở/có tại trong những câu này.',examples:[line('고양이가 방에 있어요.','Goyangiga bange isseoyo.','Mèo ở trong phòng.'),line('의자 아래에 고양이가 있어요.','Uija araee goyangiga isseoyo.','Dưới ghế có mèo.')]},
    {title:'Hỏi và trả lời vị trí',formula:'N + 이/가 어디에 있어요?',romanization:'eodie isseoyo · ở đâu?',explanation:'Muốn nói vị trí tương đối: mốc đồ vật + từ vị trí + 에. Có thể đặt nơi chốn ở đầu câu để giới thiệu điều có ở đó.',examples:[line('책이 어디에 있어요?','Chaegi eodie isseoyo?','Sách ở đâu?'),locationSentence('book','desk','above')]},
  ];
  const wordBank = ['cat','dog','bed','pillow','door','window','sofa','book','calendar','table'];
  const nounPrompts = [
    ['가 침대 위에 있어요.','ga chimdae wie isseoyo.','cat','bed','above'],
    ['이 벽 위에 있어요.','i byeok wie isseoyo.','calendar','wall','above'],
    ['가 문 앞에 있어요.','ga mun ape isseoyo.','dog','door','front'],
    ['이 테이블 위에 있어요.','i teibeul wie isseoyo.','book','table','above'],
    ['가 침대 아래에 있어요.','ga chimdae araee isseoyo.','cat','bed','below'],
    ['이 방에 있어요.','i bange isseoyo.','window'],
    ['가 소파 옆에 있어요.','ga sopa yeope isseoyo.','dog','sofa','beside'],
    ['이 창문 옆에 있어요.','i changmun yeope isseoyo.','door','window','beside'],
  ].map(([prompt,roma,s,a,p]) => ({prompt:'___'+prompt,promptRomanization:'___'+roma,sample:a?locationSentence(s,a,p):line('창문이 방에 있어요.','Changmuni bange isseoyo.','Trong phòng có cửa sổ.'),explanation:'Trang 10 không chỉ định duy nhất một đồ vật. Chọn từ hợp ngữ cảnh và đúng 이/가 đã cho. Viết cả câu để tự đối chiếu; mẫu không phải đáp án duy nhất.'}));
  const locationTasks = [
    ['pillow','bed','above'],['dog','door','front'],['book','bag','inside'],['cat','bed','below'],['sofa','table','beside'],
  ].map(([s,a,p]) => ({prompt:`${words[s].text}${particle(words[s].text)} ${words[a].text} ___에 있어요.`,promptRomanization:`${subjects[s]} ${words[a].romanization} ___e isseoyo.`,meaning:locationSentence(s,a,p).meaning,options:['above','below','front','behind','inside','beside'].map(id=>words[id]),answers:[words[p].text],sample:locationSentence(s,a,p),explanation:'Chọn theo nghĩa tiếng Việt của đề, rồi ghép từ vị trí với 에 (e).'}));
  const imagined = [['book','shelf','inside'],['cat','bed','below'],['dog','sofa','beside'],['door','window','beside'],['pillow','bed','above'],['calendar','wall','above'],['ball','bed','below'],['desk','window','beside']].map(([s,a,p])=>({prompt:`${words[s].text}${particle(words[s].text)} ${words[a].text} ___ 있어요.`,promptRomanization:`${subjects[s]} ${words[a].romanization} ___ isseoyo.`,sample:locationSentence(s,a,p),explanation:'Tưởng tượng phòng của bạn. Phần điền cần có cả từ vị trí và 에; có thể chọn vị trí khác câu mẫu. Với lịch treo trên mặt tường, dùng 벽에 (byeoge).'}));
  const corrections = [
    ['책이 테이블를 위에 있어요.','Chaegi teibeulreul wie isseoyo.','book','table','above','Bỏ 를: mốc đồ vật đứng trước từ vị trí, không gắn tiểu từ tân ngữ.'],
    ['고양이가 침대에서 있어요.','Goyangiga chimdaeeseo isseoyo.',null,null,null,'Nói vị trí tồn tại: dùng 에 (e), không dùng 에서 (eseo).',line('고양이가 침대에 있어요.','Goyangiga chimdaee isseoyo.','Mèo ở trên/ở giường.')],
    ['강아지가 문 앞을 있어요.','Gangajiga mun apeul isseoyo.','dog','door','front','Dùng 앞에 (ape · phía trước), không dùng 앞을.'],
    ['침대하고 베개를 방에 있어요.','Chimdaehago begaereul bange isseoyo.',null,null,null,'Giường và gối là những vật hiện diện; tiểu từ chủ ngữ 가 đặt sau danh từ cuối.',line('침대하고 베개가 방에 있어요.','Chimdaehago begaega bange isseoyo.','Giường và gối ở trong phòng.')],
    ['책장가 침대 옆에 있어요.','Chaekjangga chimdae yeope isseoyo.','shelf','bed','beside','책장 có batchim ㅇ nên dùng 책장이 (chaekjangi).'],
    ['고양이하고 강아지가 방을 있어요.','Goyangihago gangajiga bangeul isseoyo.',null,null,null,'방 là nơi tồn tại → 방에 (bange).',line('고양이하고 강아지가 방에 있어요.','Goyangihago gangajiga bange isseoyo.','Mèo và chó con ở trong phòng.')],
    ['베개가 침대 위를 있어요.','Begaega chimdae wireul isseoyo.','pillow','bed','above','Nói ở bên trên dùng 위에 (wie), không dùng 위를.'],
    ['문이 창문 앞에서 있어요.','Muni changmun apeseo isseoyo.','door','window','front','Vị trí tồn tại dùng 앞에 (ape).'],
  ].map(([prompt,promptRomanization,s,a,p,explanation,sample])=>({prompt,promptRomanization,explanation,sample:sample||locationSentence(s,a,p)}));
  const compose = [['book','table','above'],['cat','bed','below'],['dog','door','front'],['pillow','bed','above'],['calendar','wall','above']].map(([s,a,p])=>({prompt:`${words[s].text} → ${words[a].text} ${words[p].text}`,promptRomanization:`${words[s].romanization} → ${words[a].romanization} ${words[p].romanization}`,sample:locationSentence(s,a,p),explanation:'Thêm 이/가 sau vật cần tả, 에 sau vị trí, rồi kết thúc bằng 있어요. Có thể đảo cụm địa điểm lên đầu.'}));
  const roomMatches = [['crayons','desk','above'],['door','desk','right'],['dog','chair','below'],['eraser','book','beside']].map(([s,a,p])=>({prompt:`${words[s].text} · ${words[s].meaning} ở đâu trong phòng Minji?`,promptRomanization:words[s].romanization,options:[['chair','below'],['desk','above'],['desk','right'],['book','beside']].map(([anchor,pos])=>({text:`${words[anchor].text} ${words[pos].location}`,romanization:`${words[anchor].romanization} ${words[pos].locationRoma}`})),answers:[`${words[a].text} ${words[p].location}`],sample:locationSentence(s,a,p),explanation:'Đối chiếu tranh phòng Minji ở trang 15 và các cặp nối ở trang 16.',image:'assets/korean/lesson-6/slides/slide-15.jpg',imageAlt:'Phòng Minji trong tài liệu trang 15'}));
  const readingQuestions = [
    ['Giường ở phía nào của phòng?', ['왼쪽','오른쪽'],['oenjjok','oreunjjok'],'왼쪽',reading[2]],
    ['Trong kệ sách có bao nhiêu cuốn sách?', ['열 권','한 권'],['yeol gwon','han gwon'],'열 권',reading[4]],
    ['Truyện tranh ở đâu?', ['책상 위','책상 아래'],['chaeksang wi','chaeksang arae'],'책상 위',reading[5]],
    ['Dưới bàn có gì?', ['농구공','베개'],['nonggugong','begae'],'농구공',reading[7]],
    ['Cún Cookie ở đâu?', ['책상 오른쪽','의자 아래'],['chaeksang oreunjjok','uija arae'],'책상 오른쪽',reading[9]],
    ['Mèo Candy ở đâu?', ['의자 아래','침대 위'],['uija arae','chimdae wi'],'의자 아래',reading[10]],
  ].map(([prompt,opts,romas,answer,sample])=>({prompt,options:opts.map((text,i)=>({text,romanization:romas[i]})),answers:[answer],sample,explanation:'Đáp án theo đoạn đọc ở trang 17 (trang sách 66).'}));
  const pairReading = [
    line('고양이하고 책이 테이블 위에 있어요.','Goyangihago chaegi teibeul wie isseoyo.','Mèo và sách ở trên bàn.'),
    line('연필하고 공이 의자 아래에 있어요.','Yeonpilhago gongi uija araee isseoyo.','Bút chì và bóng ở dưới ghế.'),
    line('인형하고 가방이 소파 앞에 있어요.','Inhyeonghago gabangi sopa ape isseoyo.','Búp bê và cặp ở phía trước sofa.'),
    line('강아지하고 책 두 권이 소파 옆에 있어요.','Gangajihago chaek du gwoni sopa yeope isseoyo.','Chó con và hai cuốn sách ở cạnh sofa.'),
  ];
  const provinces = [['경기도','Gyeonggi-do'],['강원도','Gangwon-do'],['충청북도','Chungcheongbuk-do'],['충청남도','Chungcheongnam-do'],['경상북도','Gyeongsangbuk-do'],['경상남도','Gyeongsangnam-do'],['전라북도','Jeollabuk-do'],['전라남도','Jeollanam-do'],['제주도','Jeju-do']].map(([text,romanization])=>line(text,romanization,`Địa danh ${romanization} trong sơ đồ tài liệu`));
  const slideRows = [
    ['Bút sáp màu ở trên bàn','Câu trọng tâm và chủ đề vị trí đồ vật.','grammar',['desk','crayons','above']],['Lộ trình Bài 6','Từ vựng → ngữ pháp → luyện tập → vận dụng.','vocab',[]],
    ['Vị trí 1','Trước, sau, trên, dưới.','vocab',['front','behind','above','below']],['Vị trí 2','Trong, cạnh, trái, phải.','vocab',['inside','beside','left','right']],
    ['Đồ vật trong phòng 1','Cửa sổ, lịch, tường, cửa.','vocab',['window','calendar','wall','door']],['Đồ vật trong phòng 2','Gối, giường, kệ sách, bóng rổ.','vocab',['pillow','bed','shelf','ball']],['Đồ vật trong phòng 3','Sofa, mèo, cún, bàn.','vocab',['sofa','cat','dog','table']],
    ['Nối danh từ với 하고','Liệt kê hai hoặc nhiều danh từ.','grammar',[]],['Vị trí với 에 있어요','Nói ai hoặc vật gì đang ở đâu.','grammar',[]],
    ['Chọn đồ vật','8 câu mở, có thể có nhiều lựa chọn phù hợp.','practice',[]],['Điền từ vị trí','5 câu có nghĩa tiếng Việt để chọn đáp án.','practice',[]],['Căn phòng tưởng tượng','Tự chọn vị trí cho 8 câu.','practice',[]],['Sửa tiểu từ','8 câu phân biệt vị trí, chủ ngữ và tân ngữ.','practice',[]],['Đặt câu vị trí','5 câu từ vật và vị trí cho sẵn.','practice',[]],
    ['Phòng Minji','Nhìn tranh, gọi tên đồ vật.','lab',['window','bed','pillow','door']],['Nối đồ vật với vị trí','Đối chiếu phòng Minji trang trước.','practice',['crayons','eraser','dog']],
    ['Phòng Youngjun','Đọc/nghe 12 đoạn có phiên âm và nghĩa.','reading',[]],['Ghép câu theo tranh','Miêu tả truyện tranh, bút sáp, bóng, cún và sách.','lab',[]],['Nghe và vẽ phòng','Đọc đoạn tả cho bạn, người nghe vẽ lại rồi so sánh.','reading',[]],['Miêu tả bàn của bạn','Kể những vật trên bàn bằng 하고.','lab',[]],
    ['Hỏi đồ vật ở đâu','Luyện hỏi đáp vị trí sách, bút, tẩy, kính, cặp.','lab',['book','pencil','eraser','glasses','bag']],['Phòng khách Youngjun','Liệt kê người và vật bằng 하고.','grammar',[]],['Hai người cùng luyện','4 câu chỉ dẫn cho hai bạn.','reading',[]],['Nghe và bổ sung tranh','Đổi vai, đọc câu, bổ sung vật rồi so sánh tranh.','reading',[]],['Nói theo bức tranh','Hỏi và trả lời về hai vật cùng vị trí.','lab',[]],['Tìm vật bị giấu','Một bạn giấu đồ, bạn khác hỏi và nghe gợi ý vị trí.','lab',[]],['Địa danh trong tài liệu','Đọc tên trên bản đồ và nói về vị trí tương đối.','reading',[]],['Ghép bản đồ','Đọc gợi ý vị trí rồi ghép mảnh bản đồ với bạn.','reading',[]],
  ];
  window.KOREAN_LESSON_SIX = {
    title:'책상 위에 크레파스가 있어요.', romanization:'Chaeksang wie keurepaseuga isseoyo.', meaning:'Trên bàn học có bút sáp màu.',
    vocabulary, words, subjects, particle, locationSentence, reading, grammar, sourceNotes, pairReading, provinces, wordBank,
    workbook: { sections: [
      {id:'nouns',title:'Trang 10 · Chọn đồ vật',type:'open',note:'Các từ trong ngân hàng bên dưới là gợi ý, không bắt buộc dùng mỗi từ đúng một lần.',items:nounPrompts},
      {id:'positions',title:'Trang 11 · Chọn vị trí',type:'choice',note:'Chọn theo câu tiếng Việt.',items:locationTasks},
      {id:'imagine',title:'Trang 12 · Tưởng tượng phòng',type:'open',note:'Viết cả câu theo căn phòng bạn hình dung.',items:imagined},
      {id:'corrections',title:'Trang 13 · Sửa lỗi',type:'open',note:'Tìm lỗi tiểu từ, rồi gõ câu đã sửa.',items:corrections},
      {id:'compose',title:'Trang 14 · Đặt câu',type:'open',note:'Ghép danh từ, từ vị trí và đuôi câu.',items:compose},
      {id:'match',title:'Trang 15–16 · Nối vị trí',type:'choice',note:'Nhìn phòng Minji, rồi chọn vị trí từng đồ vật.',items:roomMatches},
      {id:'reading',title:'Trang 17 · Đọc hiểu',type:'choice',note:'Trả lời theo đoạn đọc về phòng Youngjun.',items:readingQuestions},
    ]},
    slides: slideRows.map(([title,summary,target,words],i)=>({page:i+1,title,summary,target,words})),
  };
})();
