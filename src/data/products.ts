import { ImageSourcePropType } from 'react-native';

const vestPastelBloom = require('../../assets/images/products/vest-pastel-bloom.jpg');
const vestVintagePeony = require('../../assets/images/products/vest-vintage-peony.jpg');
const vestSunnySunflower = require('../../assets/images/products/vest-sunny-sunflower.jpg');
const vestRetroDitsy = require('../../assets/images/products/vest-retro-ditsy.jpg');

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: '3D Relief' | 'Classic Vintage' | 'Sunflower' | 'Retro Pop';
  categoryLabel: string;
  price: number;
  originalPrice: number;
  motif: string;
  material: string;
  lingkarDada: string;
  panjang: string;
  badge: string;
  badgeColor: string;
  rating: number;
  reviewsCount: number;
  soldCount: string;
  stock: number;
  description: string;
  highlights: string[];
  images: any[];
}

export function getImageSource(img: any): ImageSourcePropType {
  if (typeof img === 'string') {
    return { uri: img };
  }
  return img as ImageSourcePropType;
}

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'A.F. Vest – Pastel Bloom (3D Relief Series)',
    shortName: 'Pastel Bloom 3D',
    category: '3D Relief',
    categoryLabel: 'Bunga Timbul Pastel 3D',
    price: 75000,
    originalPrice: 149000,
    motif: 'Motif 3D Textured / Relief Floral dengan dominasi kelopak bunga embossed warna ungu, kuning, dan biru pastel manis.',
    material: 'Canvas Cotton 3D + Furing Halus',
    lingkarDada: 'Fit to 85-100 cm',
    panjang: '42 cm',
    badge: 'Best Seller 3D',
    badgeColor: '#D6897E',
    rating: 5.0,
    reviewsCount: 0,
    soldCount: '0 Terjual',
    stock: 10,
    description: 'Outer crop vest dengan tekstur floral 3D timbul (relief jacquard) yang mewah dan estetik. Dirancang dengan rasio emas 1:2 untuk memberikan ilusi torso lebih proporsional dan kaki lebih panjang secara instan. Dilengkapi 2 tali pengikat fleksibel di bagian dada.',
    highlights: [
      'Motif 3D Textured kelopak embossed timbul ungu, kuning & biru pastel',
      'Rasio Golden Crop 1:2 mengoreksi long torso seketika',
      'Dual adjustable front tie ribbon (LD 85-100 cm)',
      'Lapis furing katun adem, halus & non-see-through',
    ],
    images: [
      vestPastelBloom,
      'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=900&auto=format&fit=crop',
    ],
  },
  {
    id: '2',
    name: 'A.F. Vest – Vintage Peony / Classic Rose',
    shortName: 'Vintage Peony',
    category: 'Classic Vintage',
    categoryLabel: 'Bunga Mawar Vintage',
    price: 75000,
    originalPrice: 139000,
    motif: 'Motif Classic Vintage Botanical Floral berwujud bunga peony/mawar klasik bernuansa warm earth-tone & soft pink.',
    material: 'Tapestry Canvas + Furing Halus',
    lingkarDada: 'Fit to 85-100 cm',
    panjang: '42 cm',
    badge: 'Vintage Aesthetic',
    badgeColor: '#718D7E',
    rating: 5.0,
    reviewsCount: 0,
    soldCount: '0 Terjual',
    stock: 10,
    description: 'Kesan vintage Parisian yang timeless dengan tenunan motif bunga peony dan mawar klasik bernuansa warm earth-tone dan dusty pink. Bahan tapestry canvas tebal kokoh namun jatuh dengan luwes saat dipakai.',
    highlights: [
      'Motif Classic Botanical Floral mawar klasik & peony warm earth-tone',
      'Aksen separuh polos broken white dengan bordir klasik eksklusif',
      'Tali pita depan fleksibel bisa disesuaikan lingkar dada',
      'Panjang 42 cm pas di pinggang atas (high-waist)',
    ],
    images: [
      vestVintagePeony,
      'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=900&auto=format&fit=crop',
    ],
  },
  {
    id: '3',
    name: 'A.F. Vest – Sunny Sunflower',
    shortName: 'Sunny Sunflower',
    category: 'Sunflower',
    categoryLabel: 'Bunga Matahari Statement',
    price: 75000,
    originalPrice: 129000,
    motif: 'Motif Bold Sunflower Floral Print dengan ilustrasi bunga matahari yang cerah dan statement.',
    material: 'Printed Cotton Canvas + Furing Halus',
    lingkarDada: 'Fit to 85-100 cm',
    panjang: '42 cm',
    badge: 'Summer Favorite',
    badgeColor: '#E5A638',
    rating: 5.0,
    reviewsCount: 0,
    soldCount: '0 Terjual',
    stock: 10,
    description: 'Cerahkan OOTD harianmu dengan motif bunga matahari yang ceria dan penuh energi. Paduan kuning warm yellow keemasan dan daun sage green membuat tampilan kasualmu langsung glow up dan eye-catching.',
    highlights: [
      'Motif Bold Sunflower Floral Print cerah & penuh statement',
      'Bahan printed cotton canvas serat natural berbobot',
      'Kombinasi warna warm yellow keemasan ceria',
      'Sempurna untuk outfit piknik, hangout kafe & traveling',
    ],
    images: [
      vestSunnySunflower,
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?q=80&w=900&auto=format&fit=crop',
    ],
  },
  {
    id: '4',
    name: 'A.F. Vest – Retro Ditsy Pop',
    shortName: 'Retro Ditsy Pop',
    category: 'Retro Pop',
    categoryLabel: 'Bunga Mungil Retro Y2K',
    price: 75000,
    originalPrice: 129000,

    motif: 'Motif Ditsy Floral Pattern / Retro Pop berupa taburan bunga-bunga mungil warna-warni berkesan ceria dan vintage Y2K.',
    material: 'Printed Cotton + Furing Halus',
    lingkarDada: 'Fit to 85-100 cm',
    panjang: '42 cm',
    badge: 'Y2K Retro Pop',
    badgeColor: '#C86D51',
    rating: 5.0,
    reviewsCount: 0,
    soldCount: '0 Terjual',
    stock: 10,
    description: 'Nuansa Y2K retro pop dengan motif bunga ditsy multicolor yang playfully chic. Super fleksibel dipadukan dengan baby tee, pleated skirt, denim kulot, atau streetwear sneakers favoritmu.',
    highlights: [
      'Motif Ditsy Floral Pattern bunga mungil warna-warni vintage Y2K',
      'Sangat ringan dan nyaman untuk aktivitas seharian',
      'Dual tie ribbon manis untuk statement outfit',
      'Jahitan garmen export rapi lapis furing premium',
    ],
    images: [
      vestRetroDitsy,
      'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?q=80&w=900&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=900&auto=format&fit=crop',
    ],
  },
];

export const CATEGORIES = [
  'All',
  '3D Relief',
  'Classic Vintage',
  'Sunflower',
  'Retro Pop',
] as const;

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
