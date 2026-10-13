import { ImageSourcePropType } from 'react-native';

export const ootdImages = {
  vintagePeonyHijab: require('../../assets/images/ootd/ootd-vintage-peony-hijab.jpg'),
  vintagePeonyDress: require('../../assets/images/ootd/ootd-vintage-peony-dress.jpg'),
  retroDitsyCasual: require('../../assets/images/ootd/ootd-retro-ditsy-casual.jpg'),
  retroDitsyHijab: require('../../assets/images/ootd/ootd-retro-ditsy-hijab.jpg'),
};

export interface OotdLook {
  id: string;
  tabLabel: string;
  iconName: string;
  title: string;
  subtitle: string;
  badge: string;
  vestName: string;
  vestMotif: string;
  image: any;
  formula: string[];
  tip: string;
  description: string;
  occasion: string;
}

export const OOTD_LOOKS: Record<string, OotdLook> = {
  'casual-dress': {
    id: 'casual-dress',
    tabLabel: 'Casual Cafe Date',
    iconName: 'sparkles',
    title: 'Casual Parisian & Cafe Date',
    subtitle: 'Effortless, Feminine, & Sweet Aesthetic',
    badge: 'Most Viral Look 🔥',
    vestName: 'A.F. Vest – Vintage Peony / Classic Rose',
    vestMotif: 'Motif Classic Vintage Botanical Floral peony/mawar warm earth-tone & soft pink',
    image: ootdImages.vintagePeonyDress,
    formula: [
      'A.F. Vest Vintage Peony (Setengah tapestry mawar, setengah cream)',
      'Long Hoodie Maxi Dress / Terusan Hitam Polos',
      'Retro Sneakers (Adidas Samba / White Trainers)',
      'Classic Brown Leather Handbag',
    ],
    tip: 'Layering vest crop di atas dress hitam instan memecah siluet lurus dan mengekspos garis pinggang lebih tinggi!',
    description:
      'Look santai akhir pekan yang memikat! Layering vest crop 42 cm di atas maxi dress hitam panjang instan membagi proporsi tubuh agar tidak terlihat tenggelam. Tali pita depan memberi aksen manis dan siluet pinggang tampak lebih ramping secara natural.',
    occasion: 'Nongkrong cafe aesthetic, weekend date, museum date, jalan-jalan santai.',
  },
  'hijab-chic': {
    id: 'hijab-chic',
    tabLabel: 'Modest Hijab Chic',
    iconName: 'flower',
    title: 'Modest Chic & Hijab Friendly',
    subtitle: 'Sopan, Rapi, & Proporsi Kaki Jenjang Instan',
    badge: 'Hijabers Favorite ✨',
    vestName: 'A.F. Vest – Vintage Peony / Classic Rose',
    vestMotif: 'Motif Classic Vintage Botanical Floral tenunan tapestry premium',
    image: ootdImages.vintagePeonyHijab,
    formula: [
      'A.F. Vest Vintage Peony (Tali pita depan diikat rapi di dada)',
      'Inner Long Sleeve Manset / Kaos Hitam',
      'High-Waist Wide Leg Trousers (Broken White / Cream)',
      'Pashmina Ceruty Nude / Cream Senada',
      'Pointed-Toe Heels (Memberi ilusi kaki ramping & ekstra jenjang)',
    ],
    tip: 'Paduan celana high-waist cream dengan sepatu pointed heels membuat kaki kelihatan 2x lipat lebih tinggi di foto mirror selfie.',
    description:
      'Buktikan bahwa berhijab bisa tetap tampil jenjang dan sangat berkelas! A.F. Vest crop 42 cm berhenti pas di atas pinggang celana high-waist cream, menciptakan rasio golden 1:2 tubuh atas dan bawah yang proporsional tanpa terkesan ketat.',
    occasion: 'Kantor kreatif, kuliah, arisan, kondangan kasual, photoshoot OOTD.',
  },
  'street-y2k': {
    id: 'street-y2k',
    tabLabel: 'Streetwear Y2K',
    iconName: 'zap',
    title: 'Streetwear & Y2K Aesthetic',
    subtitle: 'Playful, Trendy, & Statement Making',
    badge: 'Gen Z Trend 🌸',
    vestName: 'A.F. Vest – Retro Ditsy Pop',
    vestMotif: 'Motif Ditsy Floral Pattern warna-warni taburan bunga ceria Y2K',
    image: ootdImages.retroDitsyCasual,
    formula: [
      'A.F. Vest Retro Ditsy Pop (Setengah cream, setengah bunga warna-warni)',
      'Black High-Neck / Turtleneck Long Sleeve',
      'High-Waist Pleated Trousers (Cream / Broken White)',
      'White Platform Shoes / Tabi Shoes',
      'Brown Suede Handbag & Hair Bun Updo',
    ],
    tip: 'Aksen tali pita bunga ditsy yang dibiarkan menjuntai memberi kesan playful ala Gen Z!',
    description:
      'Tampil stand out di tongkrongan! Paduan motif floral ditsy yang playful dengan celana high-waist berlipit cream menciptakan kontras warna yang fresh dan chic. Aksen setengah motif setengah cream bikin penampilan tidak monoton.',
    occasion: 'Hunting foto cafe, festival pop culture, hangout kampus, street photography.',
  },
  'hijab-daily': {
    id: 'hijab-daily',
    tabLabel: 'Monochrome Hijab',
    iconName: 'heart',
    title: 'Monochrome Hijab Daily Style',
    subtitle: 'Modern, Fresh, & Effortlessly Cool',
    badge: 'Daily Essential 🖤',
    vestName: 'A.F. Vest – Retro Ditsy Pop',
    vestMotif: 'Motif Ditsy Floral Pattern warna-warni ceria dengan furing katun adem',
    image: ootdImages.retroDitsyHijab,
    formula: [
      'A.F. Vest Retro Ditsy Pop (Motif bunga mungil Y2K pop)',
      'Black Turtleneck Top / Kaos Hitam Lengan Panjang',
      'Loose Wide Leg Pants Hitam Monokrom',
      'Clean White Sneakers',
      'Pashmina Soft Beige / Cream & Brown Bag',
    ],
    tip: 'Outfit serba hitam di dalam membuat warna bunga A.F. Vest jadi pusat perhatian visual utama.',
    description:
      'Paduan monokrom hitam all-black dengan aksen cerah dari vest crop bunga mungil. Cutting 42 cm menaikkan visual pinggang, membuat tubuh tampak tinggi dan tegak tanpa repot mix-and-match.',
    occasion: 'Kuliah santai, nonton bioskop, ngopi sore, travelling kota.',
  },
};
