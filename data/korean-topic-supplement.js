// User-supplied review list: one canonical entry per headword, with links to earlier lessons.
(() => {
  'use strict';
  const topics=[['daily','Sinh hoạt & công việc','🧹'],['clothes','Mặc & cởi','👕'],['communication','Giao tiếp & giúp đỡ','📞'],['movement','Di chuyển','🚌'],['leisure','Du lịch & vận động','🏊'],['states','Trạng thái & cuộc sống','💛'],['study','Học tập & giải trí','📚'],['animals','Động vật','🦒'],['places','Địa điểm tham quan','🌿'],['food','Ăn uống','🍔']].map(([id,title,emoji])=>({id,title,emoji}));
  const rows=[
    ['만들다','mandeulda','Làm; chế tạo','daily','만들었어요','mandeureosseoyo','closed'],
    ['청소하다','cheongsohada','Dọn dẹp','daily','청소했어요','cheongsohaesseoyo','hada'],
    ['요리하다','yorihada','Nấu ăn','daily','요리했어요','yorihaesseoyo','hada'],
    ['전화하다','jeonhwahada','Gọi điện thoại','communication','전화했어요','jeonhwahaesseoyo','hada'],
    ['씻다','ssitda','Rửa; tắm rửa','daily','씻었어요','ssiseosseoyo','s'],
    ['기다리다','gidarida','Chờ đợi','daily','기다렸어요','gidaryeosseoyo','vowel'],
    ['입다','ipda','Mặc (quần áo)','clothes','입었어요','ibeosseoyo','closed'],
    ['벗다','beotda','Cởi (quần áo, giày, mũ)','clothes','벗었어요','beoseosseoyo','s'],
    ['타다','tada','Đi bằng phương tiện; lên xe; cưỡi','movement','탔어요','tasseoyo','vowel'],
    ['내리다','naerida','Xuống xe; hạ xuống; rơi xuống (mưa/tuyết…)','movement','내렸어요','naeryeosseoyo','vowel'],
    ['시작하다','sijakhada','Bắt đầu','daily','시작했어요','sijakhaesseoyo','hada'],
    ['끝나다','kkeunnada','Kết thúc; xong','daily','끝났어요','kkeunnasseoyo','vowel'],
    ['필요하다','piryohada','Cần; cần thiết (tính từ/trạng thái)','states','필요했어요','piryohaesseoyo','hada'],
    ['좋아하다','joahada','Thích','states','좋아했어요','joahaesseoyo','hada'],
    ['싫어하다','sireohada','Ghét; không thích','states','싫어했어요','sireohaesseoyo','hada'],
    ['웃다','utda','Cười','states','웃었어요','useosseoyo','s'],
    ['울다','ulda','Khóc; kêu (chim…)','states','울었어요','ureosseoyo','closed'],
    ['결혼하다','gyeolhonhada','Kết hôn','states','결혼했어요','gyeolhonhaesseoyo','hada'],
    ['이혼하다','ihonhada','Ly hôn','states','이혼했어요','ihonhaesseoyo','hada'],
    ['살다','salda','Sống','states','살았어요','sarasseoyo','closed'],
    ['죽다','jukda','Chết','states','죽었어요','jugeosseoyo','closed'],
    ['여행하다','yeohaenghada','Du lịch','leisure','여행했어요','yeohaenghaesseoyo','hada'],
    ['수영하다','suyeonghada','Bơi','leisure','수영했어요','suyeonghaesseoyo','hada'],
    ['등산하다','deungsanhada','Leo núi; đi bộ đường núi','leisure','등산했어요','deungsanhaesseoyo','hada'],
    ['걷다','geotda','Đi bộ','leisure','걸었어요','georeosseoyo','d'],
    ['달리다','dallida','Chạy','leisure','달렸어요','dallyeosseoyo','vowel'],
    ['사용하다','sayonghada','Sử dụng','daily','사용했어요','sayonghaesseoyo','hada'],
    ['보내다','bonaeda','Gửi; trải qua (thời gian, kỳ nghỉ…)','communication','보냈어요','bonaesseoyo','vowel'],
    ['받다','batda','Nhận','communication','받았어요','badasseoyo','closed'],
    ['도와주다','dowajuda','Giúp đỡ','communication','도와줬어요','dowajwosseoyo','vowel'],
    ['사자','saja','Sư tử','animals'],['토끼','tokki','Thỏ','animals'],['원숭이','wonsungi','Khỉ','animals'],['식물원','singmurwon','Vườn thực vật','places'],['수족관','sujokgwan','Thủy cung','places'],['동물원','dongmurwon','Vườn thú; sở thú','places'],['캠핑장','kaempingjang','Khu cắm trại','places'],['거북이','geobugi','Rùa','animals'],['먹다','meokda','Ăn','food'],['쉬다','swida','Nghỉ ngơi','states'],['오다','oda','Đến','movement'],['햄버거','haembeogeo','Hamburger','food'],['달리기','dalligi','Việc chạy bộ; môn chạy; cuộc chạy đua tùy ngữ cảnh (danh từ)','leisure'],['공부하다','gongbuhada','Học bài; học tập','study'],['보다','boda','Xem; nhìn','study'],['가다','gada','Đi','movement'],['기린','girin','Hươu cao cổ','animals'],['호랑이','horangi','Hổ','animals'],['동영상','dongyeongsang','Video; clip','study'],
  ];
  const aliases={'수영하다':['수영을 하다'],'공부하다':['공부를 하다'],'만들다':['음식을 만들다'],'입다':['옷을 입다'],'타다':['자전거를 타다'],'보다':['TV를 보다']};
  const sourceNames=['ONE','TWO','THREE','FOUR','FIVE','SIX','SEVEN','EIGHT','NINE','TEN','ELEVEN','TWELVE'];
  const sources=sourceNames.flatMap((name,i)=>Object.entries(window).filter(([key])=>key===`KOREAN_LESSON_${name}`||key.startsWith(`KOREAN_LESSON_${name}_`)).map(([,data])=>({lesson:i+1,data})));
  function findWords(data){const found=[],seen=new WeakSet();function visit(value){if(!value||typeof value!=='object'||seen.has(value))return;seen.add(value);if(value.text&&value.romanization&&value.meaning)found.push(value);Object.values(value).forEach(visit);}visit(data);return found;}
  const index=sources.map(s=>({...s,entries:findWords(s.data)}));
  const pastGroups=[
    {id:'hada',title:'하다 → 했어요',explanation:'Bỏ 다 để lấy thân 하, thêm 였어요: 하였어요 → 했어요 (hayeosseoyo → haesseoyo). Đây là rút gọn, không phải nối âm. Phần 하 của từ ghép đổi thành 했; không bỏ phần đứng trước. 필요하다 (piryohada · cần thiết) là tính từ nhưng vẫn theo cách chia này.'},
    {id:'d',title:'ㄷ bất quy tắc',explanation:'걷다 (geotda · đi bộ): 걷 → 걸 trước 었어요 → 걸었어요 (georeosseoyo). Không áp dụng cho mọi ㄷ: 받다 (batda · nhận) vẫn giữ ㄷ trong 받았어요 (badasseoyo).'},
    {id:'s',title:'Giữ ㅅ: 벗다 · 웃다 · 씻다',explanation:'Ba từ 벗다 (beotda · cởi), 웃다 (utda · cười), 씻다 (ssitda · rửa) giữ ㅅ trong chính tả khi chia. Đọc lần lượt beoseosseoyo, useosseoyo, ssiseosseoyo; không bỏ ㅅ như nhóm bất quy tắc khác.'},
    {id:'closed',title:'Thân có phụ âm cuối',explanation:'만들다 (mandeulda), 입다 (ipda), 울다 (ulda), 살다 (salda), 죽다 (jukda), 받다 (batda) đều có batchim, không thuộc nhóm kết thúc bằng nguyên âm. Giữ phụ âm cuối và thêm 았/었어요 theo nguyên âm của thân.'},
    {id:'vowel',title:'Thân kết thúc bằng nguyên âm',explanation:'기다리다 → 기다렸어요 (gidarida → gidaryeosseoyo), 타다 → 탔어요 (tada → tasseoyo), 보내다 → 보냈어요 (bonaeda → bonaesseoyo): ghép đuôi rồi rút gọn. 도와주었어요 → 도와줬어요 (dowajueosseoyo → dowajwosseoyo) đều đúng.'},
  ];
  const rules={
    '만들다':'만들 + 었어요 → 만들었어요 · mandeul + eosseoyo → mandeureosseoyo; giữ ㄹ.',
    '씻다':'씻 + 었어요 → 씻었어요 · ssit + eosseoyo → ssiseosseoyo; giữ ㅅ.',
    '기다리다':'기다리 + 었어요 → 기다렸어요 · gidari + eosseoyo → gidaryeosseoyo.',
    '입다':'입 + 었어요 → 입었어요 · ip + eosseoyo → ibeosseoyo; giữ ㅂ.',
    '벗다':'벗 + 었어요 → 벗었어요 · beot + eosseoyo → beoseosseoyo; giữ ㅅ.',
    '타다':'타 + 았어요 → 탔어요 · ta + asseoyo → tasseoyo.',
    '내리다':'내리 + 었어요 → 내렸어요 · naeri + eosseoyo → naeryeosseoyo.',
    '끝나다':'끝나 + 았어요 → 끝났어요 · kkeunna + asseoyo → kkeunnasseoyo.',
    '웃다':'웃 + 었어요 → 웃었어요 · ut + eosseoyo → useosseoyo; giữ ㅅ.',
    '울다':'울 + 었어요 → 울었어요 · ul + eosseoyo → ureosseoyo; giữ ㄹ.',
    '살다':'살 + 았어요 → 살았어요 · sal + asseoyo → sarasseoyo; giữ ㄹ.',
    '죽다':'죽 + 었어요 → 죽었어요 · juk + eosseoyo → jugeosseoyo.',
    '걷다':'걷 → 걸 + 었어요 → 걸었어요 · geot → geol + eosseoyo → georeosseoyo.',
    '달리다':'달리 + 었어요 → 달렸어요 · dalli + eosseoyo → dallyeosseoyo.',
    '보내다':'보내 + 었어요 → 보냈어요 · bonae + eosseoyo → bonaesseoyo.',
    '받다':'받 + 았어요 → 받았어요 · bat + asseoyo → badasseoyo; giữ ㄷ.',
    '도와주다':'도와주었어요 → 도와줬어요 · dowajueosseoyo → dowajwosseoyo.',
  };
  const notes={
    '타다':'Tùy danh từ đi kèm: 자전거를 타다 (jajeongeoreul tada · đạp/đi xe đạp), 버스를 타다 (beoseureul tada · đi/lên xe buýt). Không luôn mang nghĩa tự điều khiển phương tiện.',
    '수영하다':'Cùng nghĩa với 수영을 하다 (suyeongeul hada). Hai cách ghi được gộp vào một mục tra cứu.',
    '공부하다':'Cũng dùng 공부를 하다 (gongbureul hada). Không tạo hai mục từ chỉ vì có/không có tiểu từ.',
    '달리기':'Danh từ chỉ hoạt động/môn chạy. Phân biệt 달리다 (dallida · chạy), là động từ.',
    '필요하다':'Tính từ chỉ trạng thái cần thiết; không gắn nhãn động từ hành động chỉ vì kết thúc bằng 하다.',
    '좋아하다':'Động từ chỉ thích, khác 좋다 (jota · tốt/hay).',
    '싫어하다':'Động từ chỉ không thích, khác 싫다 (silta · không thích/không vừa ý), là từ miêu tả trạng thái.',
  };
  const words=rows.map(([text,romanization,meaning,topic,past,pastRoma,pastGroup])=>{
    const accepted=new Set([text,...(aliases[text]||[])]),matches=index.flatMap(s=>s.entries.filter(w=>accepted.has(w.text)).map(w=>({lesson:s.lesson,word:w}))),existing=matches.find(m=>m.word.text===text)?.word||matches[0]?.word;
    return {text,romanization,meaning,topic,past,pastRoma,pastGroup,aliases:aliases[text]||[],reading:existing?.reading||'',lessons:[...new Set(matches.map(m=>m.lesson))].sort((a,b)=>a-b),newEntry:!matches.length,note:notes[text]||'',rule:pastGroup==='hada'?`${text.slice(0,-2)}하였어요 → ${past} · ${romanization.slice(0,-4)}hayeosseoyo → ${pastRoma}; rút gọn 하였 thành 했.`:rules[text],alternative:pastGroup==='hada'?text.slice(0,-2)+'하였어요':text==='도와주다'?'도와주었어요':undefined};
  });
  const lesson9=window.KOREAN_LESSON_NINE;
  if(lesson9){
    const original=new Set(lesson9.forms.map(f=>f.text));
    words.filter(w=>w.past).forEach(w=>{const existing=lesson9.forms.find(f=>f.text===w.text);if(existing){existing.reviewGroup=w.pastGroup;}else lesson9.forms.push({text:w.text,romanization:w.romanization,meaning:w.meaning,past:w.past,pastRoma:w.pastRoma,rule:w.rule,alternative:w.alternative,reviewGroup:w.pastGroup,supplement:true});});
    lesson9.topicPastGroups=pastGroups;
    lesson9.originalPastWords=original;
  }
  window.KOREAN_TOPIC_SUPPLEMENT={topics,words,pastGroups};
})();
