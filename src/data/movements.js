// 9대 근대 화파 및 복수 대표작 목록 (화파별 4개씩 완벽한 교과서 및 명작 매칭)
export const MOVEMENTS = [
  {
    id: 'neoclassicism',
    name: '신고전주의',
    nameZh: '新古典主义',
    artist: '다비드 / 앵그르',
    artistZh: '达维特 / 安格尔',
    artwork: '호라티우스 형제의 맹세',
    artworkZh: '荷拉斯兄弟之誓',
    image: '/artworks/neoclassicism_1.jpg',
    artworks: [
      { title: '호라티우스 형제의 맹세', artist: '다비드', image: '/artworks/neoclassicism_1.jpg' },
      { title: '마라의 죽음', artist: '다비드', image: '/artworks/neoclassicism_2.jpg' },
      { title: '발팽송의 목욕하는 여인', artist: '앵그르', image: '/artworks/neoclassicism_3.jpg' },
      { title: '알프스를 넘는 나폴레옹', artist: '다비드', image: '/artworks/neoclassicism_4.jpg' }
    ],
    keywords: ['이성', '완벽한 비례', '명확한 윤곽선', '역사·교훈'],
    badgeClass: 'bg-amber-700 text-white',
    desc: '그리스·로마의 고전미 부활! 절제된 이성과 반듯한 균형미',
    descZh: '复兴古希腊罗马古典美！克制的理性与端庄的均衡美'
  },
  {
    id: 'romanticism',
    name: '낭만주의',
    nameZh: '浪漫主义',
    artist: '들라크루아 / 제리코',
    artistZh: '德拉克罗瓦 / 籍里柯',
    artwork: '민중을 이끄는 자유의 여신',
    artworkZh: '自由引导人民',
    image: '/artworks/romanticism_1.jpg',
    artworks: [
      { title: '민중을 이끄는 자유의 여신', artist: '들라크루아', image: '/artworks/romanticism_1.jpg' },
      { title: '메두사호의 뗏목', artist: '제리코', image: '/artworks/romanticism_2.jpg' },
      { title: '안개 바다 위의 방랑자', artist: '카스파르 다비트 프리드리히', image: '/artworks/romanticism_3.jpg' },
      { title: '키오스 섬의 학살', artist: '들라크루아', image: '/artworks/romanticism_4.jpg' }
    ],
    keywords: ['격정', '자유', '강렬한 색채', '인간의 감정'],
    badgeClass: 'bg-rose-700 text-white',
    desc: '이성보다 뜨거운 심장! 벅차오르는 감정과 드라마틱한 에너지',
    descZh: '比理性更炽热的心跳！澎湃的情感与戏剧般的张力'
  },
  {
    id: 'naturalism',
    name: '자연주의',
    nameZh: '自然主义',
    artist: '밀레 / 컨스터블',
    artistZh: '米勒 / 康斯特勃',
    artwork: '이삭 줍는 여인들',
    artworkZh: '拾穗者',
    image: '/artworks/naturalism_1.jpg',
    artworks: [
      { title: '이삭 줍는 여인들', artist: '밀레', image: '/artworks/naturalism_1.jpg' },
      { title: '옥수수밭', artist: '컨스터블', image: '/artworks/naturalism_2.jpg' },
      { title: '만종', artist: '밀레', image: '/artworks/naturalism_3.jpg' },
      { title: '건초 마차', artist: '컨스터블', image: '/artworks/naturalism_4.jpg' }
    ],
    keywords: ['대자연', '소박한 삶', '농촌 풍경', '따뜻한 시선'],
    badgeClass: 'bg-stone-700 text-white',
    desc: '있는 그대로의 대자연과 묵묵히 살아가는 서민들의 경건한 일상',
    descZh: '忠于自然本真，描绘劳动人民质朴敬虔的日常生活'
  },
  {
    id: 'realism',
    name: '사실주의',
    nameZh: '现实主义',
    artist: '쿠르베 / 도미에',
    artistZh: '库尔贝 / 杜米埃',
    artwork: '돌 깨는 사람들',
    artworkZh: '采石工',
    image: '/artworks/realism_1.jpg',
    artworks: [
      { title: '돌 깨는 사람들', artist: '쿠르베', image: '/artworks/realism_1.jpg' },
      { title: '삼등 열차', artist: '도미에', image: '/artworks/realism_2.jpg' },
      { title: '안녕하세요, 쿠르베 씨', artist: '쿠르베', image: '/artworks/realism_3.jpg' },
      { title: '세탁부', artist: '도미에', image: '/artworks/realism_4.jpg' }
    ],
    keywords: ['눈에 보이는 진실', '사회 현실', '노동자', '객관성'],
    badgeClass: 'bg-amber-900 text-white',
    desc: '“천사를 보여주면 그리겠다!” 꾸밈없이 포착한 거친 사회 현실',
    descZh: '“给我看天使我就画！”真实记录不加修饰的社会现实'
  },
  {
    id: 'impressionism',
    name: '인상주의',
    nameZh: '印象主义',
    artist: '모네 / 마네 / 르누아르',
    artistZh: '莫奈 / 马奈 / 雷诺阿',
    artwork: '인상, 해돋이',
    artworkZh: '日出·印象',
    image: '/artworks/impressionism_1.jpg',
    artworks: [
      { title: '인상, 해돋이', artist: '모네', image: '/artworks/impressionism_1.jpg' },
      { title: '폴리베르제르의 술집', artist: '마네', image: '/artworks/impressionism_2.jpg' },
      { title: '수련 연못', artist: '모네', image: '/artworks/impressionism_3.jpg' },
      { title: '물랭 드 라 갈레트의 무도회', artist: '르누아르', image: '/artworks/impressionism_4.jpg' }
    ],
    keywords: ['빛의 변화', '순간의 포착', '밝은 색채', '야외 사생'],
    badgeClass: 'bg-sky-600 text-white',
    desc: '사물의 고유색은 없다! 시시각각 눈부시게 춤추는 빛의 마법',
    descZh: '否定固有色！捕捉在晨曦与晚霞中闪烁跃动的光彩'
  },
  {
    id: 'neo_impressionism',
    name: '신인상주의',
    nameZh: '新印象主义',
    artist: '시냐크 / 쇠라',
    artistZh: '西涅克 / 修拉',
    artwork: '아비뇽 교황청',
    artworkZh: '阿维尼翁教皇宫',
    image: '/artworks/neo_impressionism_1.jpg',
    artworks: [
      { title: '아비뇽 교황청', artist: '시냐크', image: '/artworks/neo_impressionism_1.jpg' },
      { title: '그랑드자트섬의 일요일 오후', artist: '쇠라', image: '/artworks/neo_impressionism_2.jpg' },
      { title: '서커스', artist: '쇠라', image: '/artworks/neo_impressionism_3.jpg' },
      { title: '우물가의 여인들', artist: '시냐크', image: '/artworks/neo_impressionism_4.jpg' }
    ],
    keywords: ['점묘법', '광학 이론', '시각적 혼합', '체계적 질서'],
    badgeClass: 'bg-teal-700 text-white',
    desc: '물감을 섞지 않고 캔버스 위에 순수한 색점을 찍는 과학적 예술',
    descZh: '不调和颜料，以纯色细密小点在眼中交融的科学艺术'
  },
  {
    id: 'post_gogh',
    name: '후기 인상주의(고흐)',
    nameZh: '后印象主义 (梵高)',
    artist: '빈센트 반 고흐',
    artistZh: '文森特·梵高',
    artwork: '밤의 카페 테라스',
    artworkZh: '夜间咖啡馆',
    image: '/artworks/post_gogh_1.jpg',
    artworks: [
      { title: '밤의 카페 테라스', artist: '반 고흐', image: '/artworks/post_gogh_1.jpg' },
      { title: '해바라기', artist: '반 고흐', image: '/artworks/post_gogh_2.jpg' },
      { title: '별이 빛나는 밤', artist: '반 고흐', image: '/artworks/post_gogh_3.jpg' },
      { title: '아를의 침실', artist: '반 고흐', image: '/artworks/post_gogh_4.jpg' }
    ],
    keywords: ['내면의 격정', '소용돌이 터치', '강렬한 노랑과 파랑', '표현주의의 뿌리'],
    badgeClass: 'bg-yellow-600 text-stone-900 font-extrabold',
    desc: '내 영혼의 요동치는 감정을 거친 붓결과 찬란한 색채에 쏟아붓다',
    descZh: '将灵魂中燃烧的炽烈情感，倾注于旋转笔触与灿烂色彩'
  },
  {
    id: 'post_gauguin',
    name: '후기 인상주의(고갱)',
    nameZh: '后印象主义 (高更)',
    artist: '폴 고갱',
    artistZh: '保罗·高更',
    artwork: '파라우 아피',
    artworkZh: '闲聊 (塔希提之夏)',
    image: '/artworks/post_gauguin_1.jpg',
    artworks: [
      { title: '파라우 아피', artist: '고갱', image: '/artworks/post_gauguin_1.jpg' },
      { title: '언제 결혼하니?', artist: '고갱', image: '/artworks/post_gauguin_2.jpg' },
      { title: '황색의 그리스도', artist: '고갱', image: '/artworks/post_gauguin_3.jpg' },
      { title: '타히티의 여인들', artist: '고갱', image: '/artworks/post_gauguin_4.jpg' }
    ],
    keywords: ['원시적 생명력', '대담한 원색', '형태 단순화', '야수파의 뿌리'],
    badgeClass: 'bg-orange-600 text-white',
    desc: '문명을 벗어나 원초적 자연과 인간 본연의 순수함을 노래하다',
    descZh: '远离现代文明，探索热带海岛中纯粹质朴的原生力量'
  },
  {
    id: 'post_cezanne',
    name: '후기 인상주의(세잔)',
    nameZh: '后印象主义 (塞尚)',
    artist: '폴 세잔',
    artistZh: '保罗·塞尚',
    artwork: '사과와 오렌지가 있는 정물',
    artworkZh: '苹果与橘子静物',
    image: '/artworks/post_cezanne_1.jpg',
    artworks: [
      { title: '사과와 오렌지가 있는 정물', artist: '세잔', image: '/artworks/post_cezanne_1.jpg' },
      { title: '생트빅투아르산', artist: '세잔', image: '/artworks/post_cezanne_2.jpg' },
      { title: '카드놀이하는 사람들', artist: '세잔', image: '/artworks/post_cezanne_3.jpg' },
      { title: '붉은 조끼를 입은 소년', artist: '세잔', image: '/artworks/post_cezanne_4.jpg' }
    ],
    keywords: ['견고한 구조', '다시점', '원기둥·구·원뿔', '현대 회화의 아버지'],
    badgeClass: 'bg-indigo-700 text-white',
    desc: '자연의 모든 것은 구, 원기둥, 원뿔! 사물의 본질과 다각도의 시선',
    descZh: '“用圆柱体、球体和圆锥体看自然”——开启立体派的先锋'
  }
];

// 요구사항 2: 글씨가 선명하게 잘 보이는 파스텔/소프트 컬러 팔레트 10종
export const PASTEL_CARD_PALETTES = [
  { id: 'cream', bg: 'bg-[#FFFDF7]', border: 'border-amber-300', text: 'text-stone-900', accent: '#D97706' },
  { id: 'peach', bg: 'bg-[#FFF7ED]', border: 'border-orange-300', text: 'text-stone-900', accent: '#EA580C' },
  { id: 'rose', bg: 'bg-[#FFF1F2]', border: 'border-rose-300', text: 'text-stone-900', accent: '#E11D48' },
  { id: 'mint', bg: 'bg-[#F0FDF4]', border: 'border-emerald-300', text: 'text-stone-900', accent: '#059669' },
  { id: 'sky', bg: 'bg-[#F0F9FF]', border: 'border-sky-300', text: 'text-stone-900', accent: '#0284C7' },
  { id: 'lavender', bg: 'bg-[#FAF5FF]', border: 'border-purple-300', text: 'text-stone-900', accent: '#9333EA' },
  { id: 'lemon', bg: 'bg-[#FEFCE8]', border: 'border-yellow-300', text: 'text-stone-900', accent: '#CA8A04' },
  { id: 'lime', bg: 'bg-[#F7FEE7]', border: 'border-lime-300', text: 'text-stone-900', accent: '#65A30D' },
  { id: 'linen', bg: 'bg-[#FAF6EE]', border: 'border-amber-200', text: 'text-stone-900', accent: '#78350F' },
  { id: 'cloud', bg: 'bg-[#F8FAFC]', border: 'border-slate-300', text: 'text-stone-900', accent: '#475569' }
];

// 화파별 복수 작품 랜덤/시드 반환 함수 (명시적 artworkIndex 또는 seed 기반 배정)
export function getArtworkForExhibit(movement, seedOrExhibit = '') {
  if (!movement || !movement.artworks || movement.artworks.length === 0) {
    return { title: movement?.artwork || '대표작', artist: movement?.artist || '화가', image: movement?.image || '' };
  }

  // exhibit 객체가 전달된 경우 명시적 artworkIndex 또는 artworkTitle 우선 적용
  if (typeof seedOrExhibit === 'object' && seedOrExhibit !== null) {
    if (typeof seedOrExhibit.artworkIndex === 'number' && movement.artworks[seedOrExhibit.artworkIndex]) {
      return movement.artworks[seedOrExhibit.artworkIndex];
    }
    if (seedOrExhibit.artworkTitle) {
      const found = movement.artworks.find(a => a.title === seedOrExhibit.artworkTitle);
      if (found) return found;
    }
    seedOrExhibit = seedOrExhibit.id || '';
  }

  // seedString을 이용해 일관된 인덱스 반환 (또는 4개 작품 중 골고루 배정)
  let hash = 0;
  for (let i = 0; i < seedOrExhibit.length; i++) {
    hash = (hash * 31 + seedOrExhibit.charCodeAt(i)) % 10000;
  }
  const idx = Math.abs(hash) % movement.artworks.length;
  return movement.artworks[idx];
}

// 카드별 파스텔 팔레트 반환 함수
export function getPastelPalette(seedString = '') {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = (hash * 19 + seedString.charCodeAt(i)) % 10000;
  }
  const idx = Math.abs(hash) % PASTEL_CARD_PALETTES.length;
  return PASTEL_CARD_PALETTES[idx];
}
