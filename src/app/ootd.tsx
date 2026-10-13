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
import { THEME } from '@/constants/theme';
import PageContainer from '@/components/PageContainer';
import { OOTD_LOOKS } from '@/data/ootd';
import { getImageSource } from '@/data/products';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from '@/components/Icons';


export default function OotdPage() {
  const router = useRouter();
  const [selectedLook, setSelectedLook] = useState<string>('street-y2k');

  const current = OOTD_LOOKS[selectedLook] || OOTD_LOOKS['street-y2k'];

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Banner */}
      <View style={styles.heroSection}>
        <View style={styles.heroInner}>
          <View style={styles.badgePill}>
            <Sparkles size={14} color={THEME.colors.terracotta} />
            <Text style={styles.badgePillText}>INSPIRASI MIX & MATCH OOTD</Text>
          </View>
          <Text style={styles.heroTitle}>
            1 Outer Crop, Puluhan Gaya Slay ✨
          </Text>
          <Text style={styles.heroSubtitle}>
            Panduan lengkap padu padan A.F. Vest dengan foto asli pemakaian langsung. Dari gaya kasual dress, santun berhijab, sampai vibe streetwear kekinian.
          </Text>
        </View>
      </View>

      {/* 2. Interactive Lookbook Tabs */}
      <View style={styles.lookbookSection}>
        <View style={styles.tabsRow}>
          {Object.values(OOTD_LOOKS).map((look) => {
            const isActive = selectedLook === look.id;
            return (
              <TouchableOpacity
                key={look.id}
                onPress={() => setSelectedLook(look.id)}
                style={[styles.tabChip, isActive && styles.tabChipActive]}
                activeOpacity={0.8}
              >
                <Text style={[styles.tabChipText, isActive && styles.tabChipTextActive]}>
                  {look.tabLabel}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Detailed Look Card */}
        <View style={styles.lookCard}>
          <View style={styles.lookCardInner}>
            <View style={styles.lookImageCol}>
              <Image source={getImageSource(current.image)} style={styles.lookImage} resizeMode="cover" />
              <View style={styles.lookBadgeFloat}>
                <Text style={styles.lookBadgeFloatText}>{current.vestName}</Text>
              </View>
            </View>


            <View style={styles.lookContentCol}>
              <Text style={styles.lookTitle}>{current.title}</Text>
              <Text style={styles.lookSubtitle}>{current.subtitle}</Text>
              <Text style={styles.lookDesc}>{current.description}</Text>

              {/* Formula List */}
              <View style={styles.formulaBox}>
                <Text style={styles.formulaHeading}>Formula Padu Padan:</Text>
                {current.formula.map((item, idx) => (
                  <View key={idx} style={styles.formulaItemRow}>
                    <CheckCircle2 size={16} color={THEME.colors.terracotta} />
                    <Text style={styles.formulaItemText}>{item}</Text>
                  </View>
                ))}
              </View>

              {/* Occasion */}
              <View style={styles.occasionBox}>
                <Text style={styles.occasionText}>
                  <Text style={styles.boldText}>Cocok Untuk: </Text>
                  {current.occasion}
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => router.push('/katalog')}
                style={styles.shopLookBtn}
                activeOpacity={0.88}
              >
                <Text style={styles.shopLookBtnText}>Beli Vest Untuk Gaya Ini</Text>
                <ArrowRight size={16} color="#FFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      {/* 3. Color Harmony Guide */}
      <View style={styles.harmonySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Panduan Harmonisasi Warna Bawahan</Text>
          <Text style={styles.sectionSubtitle}>
            Bingung memadukan warna celana atau rok dengan motif vest? Ikuti aturan palette ini:
          </Text>
        </View>

        <View style={styles.harmonyGrid}>
          <View style={styles.harmonyCard}>
            <View style={[styles.colorSquare, { backgroundColor: '#E2D9CE' }]} />
            <Text style={styles.harmonyTitle}>Neutral Cream / Broken White</Text>
            <Text style={styles.harmonyDesc}>
              Warna paling aman &amp; versatile. Membuat motif floral 3D pada vest menjadi pusat perhatian utama.
            </Text>
          </View>

          <View style={styles.harmonyCard}>
            <View style={[styles.colorSquare, { backgroundColor: '#7A91A8' }]} />
            <Text style={styles.harmonyTitle}>Light to Medium Denim</Text>
            <Text style={styles.harmonyDesc}>
              Memberikan sentuhan kasual santai yang awet muda. Sangat cocok dipadukan dengan varian Pastel Bloom atau Sunflower.
            </Text>
          </View>

          <View style={styles.harmonyCard}>
            <View style={[styles.colorSquare, { backgroundColor: '#718D7E' }]} />
            <Text style={styles.harmonyTitle}>Sage &amp; Olive Green</Text>
            <Text style={styles.harmonyDesc}>
              Menonjolkan nuansa Earth-Tone alami yang sejuk. Sangat estetik dipadukan dengan tenunan Vintage Peony.
            </Text>
          </View>

          <View style={styles.harmonyCard}>
            <View style={[styles.colorSquare, { backgroundColor: '#26221F' }]} />
            <Text style={styles.harmonyTitle}>Deep Charcoal / Black</Text>
            <Text style={styles.harmonyDesc}>
              Menciptakan kontras bold ala streetwear. Menyamarkan garis panggul dan memaksimalkan efek jenjang.
            </Text>
          </View>
        </View>
      </View>

      {/* 4. Tips Golden Ratio Sepatu & Tas */}
      <View style={styles.tipsSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>3 Tips Aksesoris Penyempurna Rasio 1:2</Text>
        </View>

        <View style={styles.tipsList}>
          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>01</Text>
            <View style={styles.tipTextGroup}>
              <Text style={styles.tipHeading}>Gunakan Celana Berpotongan High-Waist</Text>
              <Text style={styles.tipBody}>
                Hindari celana low-rise. Celana high-waist yang pas di atas pusar akan bertemu sempurna dengan tepi bawah A.F. Vest (42 cm), menyegel rasio visual 1:2 secara maksimal.
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>02</Text>
            <View style={styles.tipTextGroup}>
              <Text style={styles.tipHeading}>Pilih Tas Model Shoulder Bag atau Handbag Kecil</Text>
              <Text style={styles.tipBody}>
                Tas ransel besar atau crossbody strap tebal bisa memotong bidang visual vest. Shoulder bag yang terselip rapi di bawah ketiak menjaga siluet vest tetap bersih dan rapi.
              </Text>
            </View>
          </View>

          <View style={styles.tipCard}>
            <Text style={styles.tipNumber}>03</Text>
            <View style={styles.tipTextGroup}>
              <Text style={styles.tipHeading}>Alas Kaki Berujung Runcing (Pointed) atau Sedikit Ber-Platform</Text>
              <Text style={styles.tipBody}>
                Sepatu dengan ujung agak runcing atau platform minimal 3 cm memberikan ilusi perpanjangan garis kaki hingga ke ujung jemari.
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 5. CTA Bottom */}
      <View style={styles.ctaBottomSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaCardTitle}>Temukan Vest untuk Gaya Terbaikmu</Text>
          <Text style={styles.ctaCardDesc}>
            Koleksi lengkap A.F. Vest siap dikirim H+1. Dapatkan motif incaranmu hari ini!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/katalog')}
            style={styles.ctaCardBtn}
            activeOpacity={0.88}
          >
            <Text style={styles.ctaCardBtnText}>Kunjungi Katalog Sekarang</Text>
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
  lookbookSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  tabsRow: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
    marginBottom: 36,
  },
  tabChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: THEME.radius.full,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
  tabChipActive: {
    backgroundColor: THEME.colors.terracotta,
    borderColor: THEME.colors.terracotta,
  },
  tabChipText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  tabChipTextActive: {
    color: '#FFF',
  },
  lookCard: {
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
  lookCardInner: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  lookImageCol: {
    flex: 1,
    minWidth: 320,
    height: 520,
    backgroundColor: '#F5EFE6',
    position: 'relative',
    overflow: 'hidden',
  },
  lookImage: {
    width: '100%',
    height: '100%',
  },

  lookBadgeFloat: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(38, 34, 31, 0.85)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
  },
  lookBadgeFloatText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  lookContentCol: {
    flex: 1.2,
    minWidth: 320,
    padding: 36,
    justifyContent: 'center',
  },
  lookTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: THEME.colors.textMain,
    marginBottom: 4,
  },
  lookSubtitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.terracotta,
    marginBottom: 16,
  },
  lookDesc: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    lineHeight: 22,
    marginBottom: 20,
  },
  formulaBox: {
    backgroundColor: THEME.colors.creamWarm,
    padding: 16,
    borderRadius: THEME.radius.md,
    gap: 10,
    marginBottom: 16,
  },
  formulaHeading: {
    fontSize: 13,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  formulaItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  formulaItemText: {
    fontSize: 13,
    color: THEME.colors.textMain,
    flex: 1,
  },
  occasionBox: {
    backgroundColor: THEME.colors.sageLight,
    padding: 12,
    borderRadius: THEME.radius.md,
    marginBottom: 24,
  },
  occasionText: {
    fontSize: 12,
    color: THEME.colors.sageDark,
    lineHeight: 18,
  },
  boldText: {
    fontWeight: '700',
  },
  shopLookBtn: {
    backgroundColor: THEME.colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  shopLookBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  harmonySection: {
    backgroundColor: '#F7F2EB',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  sectionHeader: {
    maxWidth: 720,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 40,
    textAlign: 'center' as any,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.textMain,
    textAlign: 'center',
    marginBottom: 10,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  harmonyGrid: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  harmonyCard: {
    flex: 1,
    minWidth: 220,
    maxWidth: 240,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 10,
  },
  colorSquare: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
  },
  harmonyTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  harmonyDesc: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
  },
  tipsSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  tipsList: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    gap: 20,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    padding: 24,
    flexDirection: 'row',
    gap: 20,
    alignItems: 'flex-start',
  },
  tipNumber: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.terracotta,
    lineHeight: 32,
  },
  tipTextGroup: {
    flex: 1,
    gap: 6,
  },
  tipHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  tipBody: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 20,
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
