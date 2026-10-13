import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { THEME } from '@/constants/theme';
import PageContainer from '@/components/PageContainer';

import {
  Sparkles,
  Star,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
} from '@/components/Icons';

export default function TestimoniPage() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Interactive review form state
  const [reviewName, setReviewName] = useState('');
  const [reviewProduct, setReviewProduct] = useState('Pastel Bloom (3D Relief)');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const reviewsList = [
    {
      id: 1,
      name: 'Nabila Zahra',
      handle: '@nabilazhr_22',
      product: 'Pastel Bloom 3D',
      rating: 5,
      date: '12 Oktober 2024',
      badge: 'Long Torso Solved ✨',
      comment:
        'Jujur aku punya long torso parah, selama ini pake outer apa aja kelihatan bantet karena ketutup pinggulnya. Begitu coba A.F. Vest Pastel Bloom, langsung jatuh cinta! Panjang 42 cm nya pas bgt di pinggang atas. Pas photoshoot kaki keliatan jenjang 2x lipat tanpa perlu angle ribet.',
    },
    {
      id: 2,
      name: 'Rara Santika',
      handle: '@rarasntk',
      product: 'Vintage Peony',
      rating: 5,
      date: '10 Oktober 2024',
      badge: 'Viral di TikTok 🔥',
      comment:
        'Awalnya liat di TikTok waktu ada yang komen viral "Piro lek rego ne lek", iseng checkout varian Vintage Peony. Ternyata bahannya tapestry tenun asli berbobot dan ada furing katun ademnya! Kualitasnya setara outer butik mahal 300 ribuan.',
    },
    {
      id: 3,
      name: 'Keisha Amanda',
      handle: '@keisha.ootd',
      product: 'Sunny Sunflower',
      rating: 5,
      date: '08 Oktober 2024',
      badge: 'Hijab Friendly 🌸',
      comment:
        'Buat hijabers ini game changer sih! Biasanya outer crop itu bikin canggung, tapi karena A.F. Vest ini punya tali depan fleksibel, pas dilayer di atas kemeja oversized putih jadinya rapi banget dan sopan. Motif sunflowernya cerah bikin muka glow up!',
    },
    {
      id: 4,
      name: 'Cindy Clarissa',
      handle: '@cindy.clar',
      product: 'Retro Ditsy Pop',
      rating: 5,
      date: '05 Oktober 2024',
      badge: 'Petite 152 cm Verified',
      comment:
        'TB aku 152 cm, BB 47 kg. Nyari outer yang ga tenggelam itu susahnya minta ampun. A.F. Vest ini panjangnya beneran pas di pusar, tali pitanya lucu bgt bisa dikencengin pas badan. Dipakein celana kulot langsung auto keliatan 160 cm!',
    },
    {
      id: 5,
      name: 'Dinda Maharani',
      handle: '@dinda_mhrn',
      product: 'Pastel Bloom 3D',
      rating: 5,
      date: '02 Oktober 2024',
      badge: 'Tekstur 3D Mewah',
      comment:
        'Bahan 3D Relief nya beneran timbul bertekstur, bukan kain abal-abal ya guys. Furing dalamnya halus gak bikin gatal di kulit walaupun dipake seharian pas cuaca panas. Adminnya juga ramah bgt waktu konsultasi ukuran lewat WA!',
    },
    {
      id: 6,
      name: 'Putri Aliyah',
      handle: '@putri.aliyahs',
      product: 'Vintage Peony',
      rating: 5,
      date: '28 September 2024',
      badge: 'Repeat Order Customer',
      comment:
        'Ini pembelian keduaku setelah kemarin beli sunflower! Varian Vintage Peony ini Parisian vintage vibe nya dapet bgt. Dipaduin sama rok plisket dan pashmina dusty pink cocok bgt buat kondangan kasual.',
    },
  ];

  const filteredReviews =
    selectedFilter === 'All'
      ? reviewsList
      : reviewsList.filter((r) => r.product.includes(selectedFilter));

  const handleSendReview = () => {
    if (!reviewName.trim() || !reviewComment.trim()) {
      alert('Mohon isi nama dan ulasan kamu terlebih dahulu ya kak ✨');
      return;
    }

    const message = [
      'Halo Admin A.F. Vest! ✨',
      'Aku mau kirim ulasan pembeli untuk website:',
      '',
      `Nama: ${reviewName}`,
      `Produk: ${reviewProduct}`,
      `Rating: ${reviewRating} / 5 Bintang ⭐`,
      `Ulasan: "${reviewComment}"`,
      '',
      'Terima kasih A.F. Vest! 🤍',
    ].join('\n');

    const waUrl = THEME.contact.whatsappUrl;
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }

    setSubmittedMessage(true);
    setReviewName('');
    setReviewComment('');
  };

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Banner */}
      <View style={styles.heroSection}>
        <View style={styles.heroInner}>
          <View style={styles.badgePill}>
            <Sparkles size={14} color={THEME.colors.terracotta} />
            <Text style={styles.badgePillText}>TESTIMONI &amp; SOCIAL PROOF</Text>
          </View>
          <Text style={styles.heroTitle}>
            Apa Kata Mereka Tentang A.F. Vest? ✨
          </Text>
          <Text style={styles.heroSubtitle}>
            Lebih dari 100+ cewek Gen Z telah membuktikan rahasia tampil lebih jenjang dan percaya diri dengan cutting Golden Ratio A.F. Vest.
          </Text>
        </View>
      </View>

      {/* 2. Rating Overview Card */}
      <View style={styles.overviewSection}>
        <View style={styles.overviewCard}>
          {/* Big Rating Left */}
          <View style={styles.scoreCol}>
            <Text style={styles.scoreNumber}>4.9</Text>
            <View style={styles.starsRow}>
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} color="#F59E0B" fill="#F59E0B" />
              ))}
            </View>
            <Text style={styles.scoreSub}>Berdasarkan 100+ Pembelian</Text>
          </View>

          <View style={styles.dividerCol} />

          {/* Rating Breakdown Right */}
          <View style={styles.barsCol}>
            <View style={styles.barItem}>
              <Text style={styles.barLabel}>Efek Kaki Lebih Jenjang (1:2)</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '99%' }]} />
              </View>
              <Text style={styles.barPercent}>99%</Text>
            </View>

            <View style={styles.barItem}>
              <Text style={styles.barLabel}>Kualitas Bahan &amp; Furing Adem</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '98%' }]} />
              </View>
              <Text style={styles.barPercent}>98%</Text>
            </View>

            <View style={styles.barItem}>
              <Text style={styles.barLabel}>Kesesuaian Ukuran Tali Pita</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '100%' }]} />
              </View>
              <Text style={styles.barPercent}>100%</Text>
            </View>

            <View style={styles.barItem}>
              <Text style={styles.barLabel}>Kecepatan Pengiriman H+1</Text>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: '97%' }]} />
              </View>
              <Text style={styles.barPercent}>97%</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3. Filter Chips */}
      <View style={styles.filterSection}>
        <View style={styles.filterRow}>
          {['All', 'Pastel Bloom', 'Vintage Peony', 'Sunflower', 'Retro Ditsy'].map((f) => (
            <TouchableOpacity
              key={f}
              onPress={() => setSelectedFilter(f)}
              style={[styles.filterChip, selectedFilter === f && styles.filterChipActive]}
            >
              <Text style={[styles.filterChipText, selectedFilter === f && styles.filterChipTextActive]}>
                {f === 'All' ? 'Semua Ulasan' : f}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* 4. Reviews Grid */}
      <View style={styles.reviewsGridSection}>
        <View style={styles.reviewsGrid}>
          {filteredReviews.map((item) => (
            <View key={item.id} style={styles.reviewCard}>
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name[0]}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewerName}>{item.name}</Text>
                  <Text style={styles.reviewerHandle}>{item.handle} • {item.date}</Text>
                </View>
                <View style={styles.verifiedBadge}>
                  <CheckCircle2 size={12} color="#16A34A" />
                  <Text style={styles.verifiedBadgeText}>Verified</Text>
                </View>
              </View>

              <View style={styles.ratingStars}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                ))}
              </View>

              <Text style={styles.commentText}>&ldquo;{item.comment}&rdquo;</Text>

              <View style={styles.cardFooter}>
                <View style={styles.variantPill}>
                  <Text style={styles.variantPillText}>Varian: {item.product}</Text>
                </View>
                <Text style={styles.tagText}>{item.badge}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* 5. Interactive Form: Kirim Ulasan Kamu */}
      <View style={styles.formSection}>
        <View style={styles.formCard}>
          <View style={styles.formHeader}>
            <Text style={styles.formTitle}>Punya Cerita dengan A.F. Vest?</Text>
            <Text style={styles.formSub}>
              Bagikan pengalamanmu memakai A.F. Vest dan bantu teman-teman Gen Z lainnya menemukan outfit yang tepat!
            </Text>
          </View>

          {submittedMessage && (
            <View style={styles.successNotice}>
              <CheckCircle2 size={18} color="#16A34A" />
              <Text style={styles.successNoticeText}>
                Terima kasih! Ulasan kamu telah disiapkan dan dikirimkan ke Admin.
              </Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Kamu</Text>
            <TextInput
              value={reviewName}
              onChangeText={setReviewName}
              placeholder="Contoh: Safna Aulia"
              placeholderTextColor={THEME.colors.textLight}
              style={styles.input}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Varian Vest yang Dibeli</Text>
            <View style={styles.productSelectRow}>
              {[
                'Pastel Bloom (3D Relief)',
                'Vintage Peony (Tapestry)',
                'Sunny Sunflower',
                'Retro Ditsy Pop',
              ].map((prod) => (
                <TouchableOpacity
                  key={prod}
                  onPress={() => setReviewProduct(prod)}
                  style={[
                    styles.prodPill,
                    reviewProduct === prod && styles.prodPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.prodPillText,
                      reviewProduct === prod && styles.prodPillTextActive,
                    ]}
                  >
                    {prod}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Rating Bintang</Text>
            <View style={styles.starSelectRow}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setReviewRating(star)}
                  style={styles.starSelectBtn}
                >
                  <Star
                    size={24}
                    color="#F59E0B"
                    fill={star <= reviewRating ? '#F59E0B' : 'transparent'}
                  />
                </TouchableOpacity>
              ))}
              <Text style={styles.starSelectLabel}>{reviewRating} / 5 Bintang</Text>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Ulasan / Pengalaman Kamu</Text>
            <TextInput
              value={reviewComment}
              onChangeText={setReviewComment}
              placeholder="Ceritakan bagaimana vest ini mengubah proporsi penampilanmu, kenyamanan bahan, dan reaksimu saat memakai..."
              placeholderTextColor={THEME.colors.textLight}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />
          </View>

          <TouchableOpacity
            onPress={handleSendReview}
            style={styles.submitReviewBtn}
            activeOpacity={0.88}
          >
            <MessageCircle size={18} color="#FFF" />
            <Text style={styles.submitReviewBtnText}>Kirim Ulasan via WhatsApp</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 6. CTA Bottom */}
      <View style={styles.ctaBottomSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaCardTitle}>Ingin Tampil Percaya Diri Seperti Mereka?</Text>
          <Text style={styles.ctaCardDesc}>
            Dapatkan outer crop eksklusif A.F. Vest sekarang juga dengan diskon launching spesial!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/katalog')}
            style={styles.ctaCardBtn}
            activeOpacity={0.88}
          >
            <Text style={styles.ctaCardBtnText}>Beli Koleksi A.F. Vest</Text>
            <ArrowRight size={16} color={THEME.colors.terracotta} />
          </TouchableOpacity>
        </View>
      </View>
    </PageContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.cream,
  },
  heroSection: {
    backgroundColor: '#F7F2EB',
    paddingVertical: 56,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
  },
  heroInner: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center' as any,
  },
  badgePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.colors.terracottaLight,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
    marginBottom: 16,
  },
  badgePillText: {
    color: THEME.colors.terracotta,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 34,
    fontWeight: '800',
    color: THEME.colors.textMain,
    textAlign: 'center',
    lineHeight: 44,
    marginBottom: 12,
  },
  heroSubtitle: {
    fontSize: 15,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 620,
  },
  overviewSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  overviewCard: {
    maxWidth: 960,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    padding: 32,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 28,
    alignItems: 'center',
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  scoreCol: {
    alignItems: 'center',
    minWidth: 180,
  },
  scoreNumber: {
    fontSize: 54,
    fontWeight: '800',
    color: THEME.colors.textMain,
    lineHeight: 58,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 4,
    marginVertical: 6,
  },
  scoreSub: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  dividerCol: {
    width: 1,
    height: 100,
    backgroundColor: THEME.colors.creamBorder,
  },
  barsCol: {
    flex: 1,
    minWidth: 280,
    gap: 10,
  },
  barItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  barLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMain,
    width: 170,
  },
  barTrack: {
    flex: 1,
    height: 8,
    backgroundColor: THEME.colors.creamWarm,
    borderRadius: 4,
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    backgroundColor: THEME.colors.terracotta,
    borderRadius: 4,
  },
  barPercent: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    width: 34,
    textAlign: 'right',
  },
  filterSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  filterRow: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
  },
  filterChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
  filterChipActive: {
    backgroundColor: THEME.colors.terracotta,
    borderColor: THEME.colors.terracotta,
  },
  filterChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  filterChipTextActive: {
    color: '#FFF',
  },
  reviewsGridSection: {
    paddingHorizontal: 20,
    marginBottom: 48,
  },
  reviewsGrid: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  reviewCard: {
    flex: 1,
    minWidth: 320,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.lg,
    padding: 22,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: THEME.colors.terracottaLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  reviewerName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  reviewerHandle: {
    fontSize: 11,
    color: THEME.colors.textLight,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  verifiedBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#16A34A',
  },
  ratingStars: {
    flexDirection: 'row',
    gap: 3,
  },
  commentText: {
    fontSize: 13,
    color: THEME.colors.textMain,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamWarm,
  },
  variantPill: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  variantPillText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  formSection: {
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  formCard: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    padding: 32,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 16,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
  },
  formHeader: {
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingBottom: 16,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  formSub: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 18,
  },
  successNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: THEME.radius.md,
  },
  successNoticeText: {
    fontSize: 13,
    color: '#16A34A',
    fontWeight: '600',
  },
  inputGroup: {
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  input: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: THEME.colors.textMain,
    outlineWidth: 0 as any,
  },
  productSelectRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  prodPill: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    cursor: 'pointer' as any,
  },
  prodPillActive: {
    backgroundColor: THEME.colors.charcoal,
  },
  prodPillText: {
    fontSize: 11,
    fontWeight: '600',
    color: THEME.colors.textMain,
  },
  prodPillTextActive: {
    color: '#FFF',
  },
  starSelectRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  starSelectBtn: {
    padding: 2,
    cursor: 'pointer' as any,
  },
  starSelectLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    marginLeft: 8,
  },
  textArea: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: THEME.colors.textMain,
    textAlignVertical: 'top',
    minHeight: 80,
    outlineWidth: 0 as any,
  },
  submitReviewBtn: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    marginTop: 8,
    cursor: 'pointer' as any,
  },
  submitReviewBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  ctaBottomSection: {
    paddingVertical: 56,
    paddingHorizontal: 20,
  },
  ctaCard: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: THEME.colors.terracotta,
    borderRadius: THEME.radius.xl,
    paddingVertical: 44,
    paddingHorizontal: 28,
    alignItems: 'center',
    textAlign: 'center' as any,
  },
  ctaCardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaCardDesc: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 500,
  },
  ctaCardBtn: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ctaCardBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
});
