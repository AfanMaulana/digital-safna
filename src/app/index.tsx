import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { PRODUCTS, getImageSource, formatRupiah } from '@/data/products';
import { THEME } from '@/constants/theme';
import ProductCard from '@/components/ProductCard';
import PageContainer from '@/components/PageContainer';
import { OOTD_LOOKS } from '@/data/ootd';

import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  X,
  Star,
} from '@/components/Icons';


export default function LandingPage() {
  const router = useRouter();
  const [heroMotifIdx, setHeroMotifIdx] = useState(0);
  const [activeOotdTab, setActiveOotdTab] = useState<string>('street-y2k');
  const currentOotd = OOTD_LOOKS[activeOotdTab] || OOTD_LOOKS['street-y2k'];

  const openWhatsApp = () => {
    if (typeof window !== 'undefined') window.open(THEME.contact.whatsappUrl, '_blank');
  };



  const testimonials = [
    {
      name: 'Nabila Zahra',
      handle: '@nabilazhr_22',
      rating: 5,
      comment:
        'Jujur aku punya long torso parah, pake outer biasa malah kelihatan pendek. Begitu pake A.F. Vest Pastel Bloom, langsung amazed! Cutting 42 cm nya pas bgt di pinggang atas. Kaki keliatan lebih jenjang 2x lipat pas difoto!',
      product: 'Pastel Bloom 3D',
      verified: true,
      tag: 'Long Torso Solved ✨',
    },
    {
      name: 'Rara Santika',
      handle: '@rarasntk',
      rating: 5,
      comment:
        'Awalnya liat di FYP TikTok pas ada yang nanya "Piro lek rego ne lek" haha, pas check out ternyata bahannya di luar ekspektasi! Tebal, berfuring adem, motif 3D nya beneran timbul berasa outer mahal butik mall.',
      product: 'Vintage Peony',
      verified: true,
      tag: 'Viral on TikTok 🔥',
    },
    {
      name: 'Keisha Amanda',
      handle: '@keisha.ootd',
      rating: 5,
      comment:
        'Hijab friendly bgt! Biasanya susah nemu outer crop yang cocok dilayer kemeja tanpa bikin keliatan aneh. Tali depannya bisa disesuaiin sesuka hati, ga sesak sama sekali di dada. Wajib punya semua motif sih!',
      product: 'Sunny Sunflower',
      verified: true,
      tag: 'Hijab Friendly 🌸',
    },
  ];

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContentWrapper}>
          {/* Left Column: Text & CTA */}
          <View style={styles.heroLeft}>
            {/* Gen Z Badge */}
            <View style={styles.heroBadge}>
              <Sparkles size={14} color={THEME.colors.terracotta} />
              <Text style={styles.heroBadgeText}>✨ Solusi No. 1 Long Torso Gen Z</Text>
            </View>

            {/* Headline */}
            <Text style={styles.heroHeadline}>
              Bye-Bye &quot;Tenggelam&quot;!{'\n'}
              <Text style={styles.heroHeadlineHighlight}>Rahasia Kaki Kelihatan Lebih Jenjang Instan ✨</Text>
            </Text>

            {/* Sub-headline */}
            <Text style={styles.heroSubheadline}>
              A.F. VEST — Outer Potongan Crop yang Didesain Khusus Memperbaiki Proporsi Tubuh Long Torso Kamu (1:2 Golden Ratio). Always Slay, No Cap 🔥
            </Text>

            {/* CTAs */}
            <View style={styles.heroCtaGroup}>
              <TouchableOpacity
                onPress={() => router.push('/katalog')}
                style={styles.heroPrimaryButton}
                activeOpacity={0.88}
              >
                <Text style={styles.heroPrimaryButtonText}>Lihat Katalog Koleksi</Text>
                <ArrowRight size={18} color="#FFF" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={openWhatsApp}
                style={styles.heroSecondaryButton}
                activeOpacity={0.88}
              >
                <MessageCircle size={18} color={THEME.colors.waGreen} />
                <Text style={styles.heroSecondaryButtonText}>Pesan via WA</Text>
              </TouchableOpacity>
            </View>

            {/* Trust points */}
            <View style={styles.heroTrustPoints}>
              <View style={styles.trustItem}>
                <CheckCircle2 size={16} color={THEME.colors.sage} />
                <Text style={styles.trustText}>Kirim H+1 Kilat</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle2 size={16} color={THEME.colors.sage} />
                <Text style={styles.trustText}>Tali Depan Adjustable</Text>
              </View>
              <View style={styles.trustItem}>
                <CheckCircle2 size={16} color={THEME.colors.sage} />
                <Text style={styles.trustText}>LD Fit to 85–100 cm</Text>
              </View>
            </View>
          </View>

          {/* Right Column: Interactive 4 Motifs Showcase */}
          <View style={styles.heroRight}>
            {/* 4 Motifs Quick Selector Tabs */}
            <View style={styles.heroMotifTabsRow}>
              {PRODUCTS.map((prod, idx) => {
                const isActive = heroMotifIdx === idx;
                return (
                  <TouchableOpacity
                    key={prod.id}
                    onPress={() => setHeroMotifIdx(idx)}
                    style={[
                      styles.heroMotifTabBtn,
                      isActive && styles.heroMotifTabBtnActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.heroMotifTabBtnText,
                        isActive && styles.heroMotifTabBtnTextActive,
                      ]}
                    >
                      {idx === 0 ? '🌸 3D Pastel' : idx === 1 ? '🌹 Peony' : idx === 2 ? '🌻 Sunflower' : '🌼 Retro Ditsy'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.heroImageCard}>
              <Image
                source={getImageSource(PRODUCTS[heroMotifIdx].images[0])}
                style={styles.heroMainImage}
                resizeMode="cover"
              />

              {/* Floating Motif Badge */}
              <View
                style={[
                  styles.heroMotifFloatingBadge,
                  { backgroundColor: PRODUCTS[heroMotifIdx].badgeColor },
                ]}
              >
                <Text style={styles.heroMotifFloatingBadgeText}>
                  {PRODUCTS[heroMotifIdx].categoryLabel}
                </Text>
              </View>

              {/* Floating Ratio Card */}
              <View style={styles.floatingRatioBadge}>
                <View style={styles.ratioCircle}>
                  <Text style={styles.ratioCircleText}>1:2</Text>
                </View>
                <View>
                  <Text style={styles.ratioTitle}>Golden Ratio Cut</Text>
                  <Text style={styles.ratioSub}>Panjang 42 cm • Anti Tenggelam</Text>
                </View>
              </View>

              {/* Bottom Info Bar with CTA to Detail */}
              <TouchableOpacity
                onPress={() => router.push(`/produk/${PRODUCTS[heroMotifIdx].id}` as any)}
                style={styles.heroProductBar}
                activeOpacity={0.9}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.heroProductBarTitle} numberOfLines={1}>
                    {PRODUCTS[heroMotifIdx].name}
                  </Text>
                  <Text style={styles.heroProductBarPrice}>
                    {formatRupiah(PRODUCTS[heroMotifIdx].price)}
                  </Text>
                </View>
                <View style={styles.heroProductBarBtn}>
                  <Text style={styles.heroProductBarBtnText}>Detail</Text>
                  <ArrowRight size={13} color="#FFF" />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* 2. PROBLEM & SOLUTION SECTION */}
      <View id="solusi" style={styles.problemSolutionSection}>
        <View style={styles.sectionHeader}>
          <View style={styles.smallPill}>
            <Text style={styles.smallPillText}>THE ANATOMY OF FASHION</Text>
          </View>
          <Text style={styles.sectionTitle}>
            Kenapa Outer Biasa Bikin Kamu Kelihatan &quot;Tenggelam&quot;?
          </Text>
          <Text style={styles.sectionSubtitle}>
            Banyak Gen Z tidak sadar memiliki proporsi tubuh long torso (torso lebih panjang dari kaki). Outer standar panjang 55-65 cm memperparah ilusi tersebut!
          </Text>
        </View>

        {/* Comparison Grid */}
        <View style={styles.comparisonGrid}>
          {/* Card Masalah: Outer Biasa */}
          <View style={[styles.comparisonCard, styles.problemCard]}>
            <View style={styles.comparisonHeader}>
              <View style={[styles.statusIcon, { backgroundColor: '#FEE2E2' }]}>
                <X size={18} color="#DC2626" />
              </View>
              <Text style={styles.comparisonCardTitle}>Outer Standar Biasa</Text>
            </View>
            <Text style={styles.comparisonVerdict}>Rasio 1:1 (Kaki Terlihat Pendek)</Text>
            
            <View style={styles.pointsList}>
              <Text style={styles.pointNegative}>
                ✕ Panjang 60 cm menutupi pinggul, memotong garis kaki alami.
              </Text>
              <Text style={styles.pointNegative}>
                ✕ Tanpa tali pengikat, siluet tampak boxy & kedodoran.
              </Text>
              <Text style={styles.pointNegative}>
                ✕ Bahan tipis mudah kusut tanpa furing pelapis.
              </Text>
              <Text style={styles.pointNegative}>
                ✕ Terlihat &apos;tenggelam&apos; saat difoto OOTD full body.
              </Text>
            </View>
          </View>

          {/* Card Solusi: A.F. VEST */}
          <View style={[styles.comparisonCard, styles.solutionCard]}>
            <View style={styles.solutionTag}>
              <Sparkles size={12} color="#FFF" />
              <Text style={styles.solutionTagText}>SOLUSI A.F. VEST</Text>
            </View>
            <View style={styles.comparisonHeader}>
              <View style={[styles.statusIcon, { backgroundColor: '#DCFCE7' }]}>
                <CheckCircle2 size={18} color="#16A34A" />
              </View>
              <Text style={[styles.comparisonCardTitle, { color: THEME.colors.terracotta }]}>
                A.F. Cropped Vest
              </Text>
            </View>
            <Text style={styles.comparisonVerdictSuccess}>
              Rasio Emas 1:2 (Kaki Kelihatan Jenjang)
            </Text>

            <View style={styles.pointsList}>
              <Text style={styles.pointPositive}>
                ✓ <Text style={styles.boldText}>Panjang Presisi 42 cm:</Text> Berhenti pas di pinggang atas (high-waist), merestorasi rasio visual 1 bagian torso : 2 bagian kaki.
              </Text>
              <Text style={styles.pointPositive}>
                ✓ <Text style={styles.boldText}>Dual Tie Ribbon Adjustable:</Text> Tali dada depan fleksibel untuk LD 85–100 cm tanpa terasa sesak.
              </Text>
              <Text style={styles.pointPositive}>
                ✓ <Text style={styles.boldText}>Tekstur 3D & Tapestry Canvas:</Text> Bahan kokoh tidak letoy, dilapisi furing katun halus yang sejuk di kulit.
              </Text>
              <Text style={styles.pointPositive}>
                ✓ <Text style={styles.boldText}>Proporsi Instant Slay:</Text> Langsung tampil percaya diri di setiap sudut foto kamera!
              </Text>
            </View>
          </View>
        </View>

        {/* Learn more button to /solusi */}
        <View style={styles.viewAllWrapper}>
          <TouchableOpacity
            onPress={() => router.push('/solusi')}
            style={styles.viewAllButton}
            activeOpacity={0.88}
          >
            <Text style={styles.viewAllButtonText}>Pelajari Lengkap Kenapa A.F. Vest Jadi Solusi No. 1 ✨</Text>
            <ArrowRight size={18} color={THEME.colors.terracotta} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 3. PRODUCT HIGHLIGHT SECTION: 4 MOTIF BERURUTAN */}
      <View style={styles.productsHighlightSection}>
        <View style={styles.sectionHeader}>
          <View style={[styles.smallPill, { backgroundColor: THEME.colors.dustyPinkLight }]}>
            <Text style={[styles.smallPillText, { color: THEME.colors.dustyPinkDark }]}>
              4 VARIASI PRODUK RESMI
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Koleksi 4 Motif Unggulan A.F. Vest</Text>
          <Text style={styles.sectionSubtitle}>
            4 motif berurutan dengan karakteristik corak istimewa: dari Bunga Timbul 3D, Mawar Vintage Parisian, Sunflower cerah, hingga Bunga Mungil Y2K.
          </Text>
        </View>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <View key={product.id} style={styles.productGridCol}>
              <ProductCard product={product} />
            </View>
          ))}
        </View>

        {/* View All Button */}
        <View style={styles.viewAllWrapper}>
          <TouchableOpacity
            onPress={() => router.push('/katalog')}
            style={styles.viewAllButton}
            activeOpacity={0.85}
          >
            <Text style={styles.viewAllButtonText}>Jelajahi Semua Koleksi di Katalog</Text>
            <ArrowRight size={18} color={THEME.colors.textMain} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. MIX & MATCH INSPIRATION SECTION */}
      <View id="ootd" style={styles.ootdSection}>
        <View style={styles.sectionHeader}>
          <View style={[styles.smallPill, { backgroundColor: THEME.colors.sageLight }]}>
            <Text style={[styles.smallPillText, { color: THEME.colors.sageDark }]}>
              STYLING GUIDE
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Panduan Mix & Match A.F. Vest</Text>
          <Text style={styles.sectionSubtitle}>
            1 Vest, Puluhan Look! Sesuaikan gaya outfit kamu dari santai ngopi, busana santun hijab, sampai streetwear kekinian.
          </Text>
        </View>

        {/* Tab Buttons */}
        <View style={styles.tabButtonsRow}>
          {Object.values(OOTD_LOOKS).map((look) => {
            const isActive = activeOotdTab === look.id;
            return (
              <TouchableOpacity
                key={look.id}
                onPress={() => setActiveOotdTab(look.id)}
                style={[styles.tabButton, isActive && styles.tabButtonActive]}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive && styles.tabButtonTextActive,
                  ]}
                >
                  {look.tabLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Active Tab Content Card */}
        <View style={styles.ootdCard}>
          <View style={styles.ootdCardInner}>
            {/* Image Col */}
            <View style={styles.ootdImageCol}>
              <Image
                source={getImageSource(currentOotd.image)}
                style={styles.ootdImage}
                resizeMode="cover"
              />
              <View style={styles.ootdBadgeFloat}>
                <Text style={styles.ootdBadgeFloatText}>{currentOotd.badge}</Text>
              </View>
            </View>


            {/* Content Col */}
            <View style={styles.ootdContentCol}>
              <Text style={styles.ootdCardTitle}>{currentOotd.title}</Text>
              <Text style={styles.ootdCardSubtitle}>{currentOotd.subtitle}</Text>
              <Text style={styles.ootdCardDesc}>{currentOotd.description}</Text>

              {/* Outfit formula list */}
              <View style={styles.formulaBox}>
                <Text style={styles.formulaTitle}>Formula Outfit Rekomendasi:</Text>
                {currentOotd.formula.map((item, idx) => (
                  <View key={idx} style={styles.formulaItemRow}>
                    <View style={styles.formulaDot} />
                    <Text style={styles.formulaItemText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Styling tip */}
              <View style={styles.proTipBox}>
                <Sparkles size={16} color={THEME.colors.warmYellowDark} />
                <Text style={styles.proTipText}>
                  <Text style={styles.boldText}>Pro Tip: </Text>
                  {currentOotd.tip}
                </Text>
              </View>

              <View style={styles.ootdButtonRow}>
                <TouchableOpacity
                  onPress={() => router.push('/katalog')}
                  style={styles.ootdShopButton}
                  activeOpacity={0.85}
                >
                  <Text style={styles.ootdShopButtonText}>Belanja Style Ini</Text>
                  <ArrowRight size={16} color="#FFF" />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => router.push('/ootd')}
                  style={styles.ootdExploreButton}
                  activeOpacity={0.85}
                >
                  <Text style={styles.ootdExploreButtonText}>Panduan Lengkap OOTD</Text>
                  <ArrowRight size={16} color={THEME.colors.textMain} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* 5. STATS & SOCIAL PROOF */}
      <View id="testimoni" style={styles.socialProofSection}>
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>100+</Text>
            <Text style={styles.statLabel}>Crop Vest Terjual</Text>
          </View>
          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>99%</Text>
            <Text style={styles.statLabel}>Customer Satisfied</Text>
          </View>
          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>1:2</Text>
            <Text style={styles.statLabel}>Golden Ratio Cut</Text>
          </View>
          <View style={styles.statDivider} />

          <View style={styles.statBox}>
            <Text style={styles.statNumber}>4.9/5</Text>
            <Text style={styles.statLabel}>Rating Kepuasan</Text>
          </View>
        </View>

        {/* Section Header */}
        <View style={[styles.sectionHeader, { marginTop: 48 }]}>
          <View style={[styles.smallPill, { backgroundColor: THEME.colors.terracottaLight }]}>
            <Text style={[styles.smallPillText, { color: THEME.colors.terracotta }]}>
              REAL CUSTOMER STORIES
            </Text>
          </View>
          <Text style={styles.sectionTitle}>Kata Mereka yang Sudah Mencobanya</Text>
          <Text style={styles.sectionSubtitle}>
            Ulasan jujur dari pembeli yang akhirnya menemukan outer yang pas untuk memperbaiki proporsi tubuh mereka.
          </Text>
        </View>

        {/* Testimonials Cards */}
        <View style={styles.testimonialsGrid}>
          {testimonials.map((item, idx) => (
            <View key={idx} style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <View style={styles.userAvatar}>
                  <Text style={styles.userAvatarText}>{item.name[0]}</Text>
                </View>
                <View>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userHandle}>{item.handle}</Text>
                </View>
              </View>

              <View style={styles.starsRow}>
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                ))}
              </View>

              <Text style={styles.reviewComment}>&ldquo;{item.comment}&rdquo;</Text>

              <View style={styles.testimonialFooter}>
                <View style={styles.pillBought}>
                  <Text style={styles.pillBoughtText}>Varian: {item.product}</Text>
                </View>
                <Text style={styles.verifiedText}>{item.tag}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Button to /testimoni */}
        <View style={styles.viewAllWrapper}>
          <TouchableOpacity
            onPress={() => router.push('/testimoni')}
            style={styles.viewAllButton}
            activeOpacity={0.88}
          >
            <Text style={styles.viewAllButtonText}>Lihat Semua Ulasan &amp; Kirim Ceritamu ✨</Text>
            <ArrowRight size={18} color={THEME.colors.terracotta} />
          </TouchableOpacity>
        </View>
      </View>

      {/* 6. BOTTOM CALL TO ACTION BANNER */}
      <View style={styles.ctaBannerSection}>
        <View style={styles.ctaBannerCard}>
          <View style={styles.ctaBadge}>
            <Sparkles size={14} color="#FFF" />
            <Text style={styles.ctaBadgeText}>READY STOCK TERBATAS</Text>
          </View>
          <Text style={styles.ctaBannerTitle}>
            Waktunya Ucapkan Selamat Tinggal Pada Look &quot;Tenggelam&quot;!
          </Text>
          <Text style={styles.ctaBannerSubtitle}>
            Koleksi terbatas batch ini. Jangan sampai kehabisan motif favoritmu sebelum sold out!
          </Text>

          <View style={styles.ctaBannerButtons}>
            <TouchableOpacity
              onPress={() => router.push('/katalog')}
              style={styles.ctaWhiteButton}
              activeOpacity={0.9}
            >
              <Text style={styles.ctaWhiteButtonText}>Pilih Vest Favoritmu Sekarang</Text>
              <ArrowRight size={18} color={THEME.colors.terracotta} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openWhatsApp}
              style={styles.ctaWaBannerButton}
              activeOpacity={0.9}
            >
              <MessageCircle size={18} color="#FFF" />
              <Text style={styles.ctaWaBannerButtonText}>Konsultasi Size via WA</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 48,
    paddingHorizontal: 20,
    backgroundColor: '#FDFBF7',
  },
  heroContentWrapper: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 40,
  },
  heroLeft: {
    flex: 1.2,
    minWidth: 320,
  },
  heroBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: THEME.colors.terracottaLight,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: THEME.radius.full,
    alignSelf: 'flex-start',
    marginBottom: 18,
  },
  heroBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  heroHeadline: {
    fontSize: 38,
    fontWeight: '800',
    color: THEME.colors.textMain,
    lineHeight: 48,
    letterSpacing: -0.5,
    marginBottom: 16,
  },
  heroHeadlineHighlight: {
    color: THEME.colors.terracotta,
  },
  heroSubheadline: {
    fontSize: 16,
    color: THEME.colors.textMuted,
    lineHeight: 26,
    marginBottom: 28,
  },
  heroCtaGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 32,
  },
  heroPrimaryButton: {
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    cursor: 'pointer' as any,
  },
  heroPrimaryButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  heroSecondaryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.creamBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  heroSecondaryButtonText: {
    color: THEME.colors.textMain,
    fontSize: 15,
    fontWeight: '700',
  },
  heroTrustPoints: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamBorder,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  trustText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  heroRight: {
    flex: 1,
    minWidth: 320,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImageCard: {
    width: '100%',
    maxWidth: 440,
    height: 480,
    borderRadius: THEME.radius.xl,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.2,
    shadowRadius: 30,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroMainImage: {
    width: '100%',
    height: '100%',
  },
  floatingRatioBadge: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#FFFFFFF5',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: THEME.radius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  ratioCircle: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratioCircleText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 14,
  },
  ratioTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  ratioSub: {
    fontSize: 11,
    color: THEME.colors.textMuted,
  },
  heroMotifTabsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
    justifyContent: 'center',
  },
  heroMotifTabBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  heroMotifTabBtnActive: {
    backgroundColor: THEME.colors.terracotta,
    borderColor: THEME.colors.terracotta,
  },
  heroMotifTabBtnText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  heroMotifTabBtnTextActive: {
    color: '#FFF',
  },
  heroMotifFloatingBadge: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  heroMotifFloatingBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  heroProductBar: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    cursor: 'pointer' as any,
  },
  heroProductBarTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  heroProductBarPrice: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.terracotta,
    marginTop: 2,
  },
  heroProductBarBtn: {
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
  },
  heroProductBarBtnText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  problemSolutionSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
    backgroundColor: '#F7F2EB',
  },
  sectionHeader: {
    maxWidth: 720,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center' as any,
    marginBottom: 44,
  },
  smallPill: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    marginBottom: 12,
  },
  smallPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.textMuted,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: THEME.colors.textMain,
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 38,
  },
  sectionSubtitle: {
    fontSize: 15,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    lineHeight: 24,
  },
  comparisonGrid: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  comparisonCard: {
    flex: 1,
    minWidth: 320,
    borderRadius: THEME.radius.xl,
    padding: 28,
  },
  problemCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  solutionCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: THEME.colors.terracotta,
    position: 'relative',
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
  },
  solutionTag: {
    position: 'absolute',
    top: -14,
    right: 28,
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
  },
  solutionTagText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  comparisonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  statusIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  comparisonCardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  comparisonVerdict: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 20,
  },
  comparisonVerdictSuccess: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 20,
  },
  pointsList: {
    gap: 14,
  },
  pointNegative: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 20,
  },
  pointPositive: {
    fontSize: 13,
    color: THEME.colors.textMain,
    lineHeight: 20,
  },
  boldText: {
    fontWeight: '700',
  },
  productsHighlightSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  productsGrid: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  productGridCol: {
    flex: 1,
    minWidth: 260,
    maxWidth: 320,
  },
  viewAllWrapper: {
    alignItems: 'center',
    marginTop: 40,
  },
  viewAllButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.creamBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  viewAllButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  ootdSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
    backgroundColor: '#FDFBF7',
  },
  tabButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32,
    flexWrap: 'wrap',
  },
  tabButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
  tabButtonActive: {
    backgroundColor: THEME.colors.terracotta,
    borderColor: THEME.colors.terracotta,
  },
  tabButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  tabButtonTextActive: {
    color: '#FFF',
  },
  ootdCard: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    overflow: 'hidden',
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.12,
    shadowRadius: 24,
  },
  ootdCardInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  ootdImageCol: {
    flex: 1,
    minWidth: 320,
    height: 500,
    backgroundColor: '#F5EFE6',
    position: 'relative',
    overflow: 'hidden',
  },
  ootdImage: {
    width: '100%',
    height: '100%',
  },

  ootdBadgeFloat: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(38, 34, 31, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
  },
  ootdBadgeFloatText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  ootdContentCol: {
    flex: 1.2,
    minWidth: 320,
    padding: 36,
    justifyContent: 'center',
  },
  ootdCardTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: THEME.colors.textMain,
    marginBottom: 4,
  },
  ootdCardSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.terracotta,
    marginBottom: 16,
  },
  ootdCardDesc: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  formulaBox: {
    backgroundColor: THEME.colors.creamWarm,
    padding: 16,
    borderRadius: THEME.radius.md,
    gap: 8,
    marginBottom: 16,
  },
  formulaTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMain,
    marginBottom: 2,
  },
  formulaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formulaDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: THEME.colors.terracotta,
  },
  formulaItemText: {
    fontSize: 13,
    color: THEME.colors.textMain,
  },
  proTipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: THEME.colors.warmYellowLight,
    padding: 12,
    borderRadius: THEME.radius.md,
    marginBottom: 24,
  },
  proTipText: {
    flex: 1,
    fontSize: 12,
    color: THEME.colors.textMain,
    lineHeight: 18,
  },
  ootdButtonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  ootdShopButton: {
    flex: 1,
    minWidth: 160,
    backgroundColor: THEME.colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ootdShopButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  ootdExploreButton: {
    flex: 1,
    minWidth: 160,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.creamBorder,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ootdExploreButtonText: {
    color: THEME.colors.textMain,
    fontSize: 14,
    fontWeight: '700',
  },
  socialProofSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
    backgroundColor: '#F7F2EB',
  },
  statsRow: {
    maxWidth: 900,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    paddingVertical: 24,
    paddingHorizontal: 32,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    gap: 16,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.terracotta,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  statDivider: {
    width: 1,
    height: 36,
    backgroundColor: THEME.colors.creamBorder,
  },
  testimonialsGrid: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  testimonialCard: {
    flex: 1,
    minWidth: 300,
    maxWidth: 380,
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.lg,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 14,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  userAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: THEME.colors.terracottaLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  userName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  userHandle: {
    fontSize: 11,
    color: THEME.colors.textLight,
  },
  starsRow: {
    flexDirection: 'row',
    gap: 3,
  },
  reviewComment: {
    fontSize: 13,
    color: THEME.colors.textMain,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  testimonialFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamWarm,
  },
  pillBought: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  pillBoughtText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  ctaBannerSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  ctaBannerCard: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: THEME.colors.terracotta,
    borderRadius: THEME.radius.xl,
    paddingVertical: 56,
    paddingHorizontal: 36,
    alignItems: 'center',
    textAlign: 'center' as any,
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.3,
    shadowRadius: 32,
  },
  ctaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
    marginBottom: 20,
  },
  ctaBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  ctaBannerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 40,
    maxWidth: 680,
    marginBottom: 16,
  },
  ctaBannerSubtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: 600,
    marginBottom: 36,
  },
  ctaBannerButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  ctaWhiteButton: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ctaWhiteButtonText: {
    color: THEME.colors.terracotta,
    fontSize: 14,
    fontWeight: '800',
  },
  ctaWaBannerButton: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 26,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ctaWaBannerButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
});
