import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { THEME } from '@/constants/theme';
import PageContainer from '@/components/PageContainer';

import {
  Sparkles,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  X,
  Ruler,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from '@/components/Icons';

export default function SolusiPage() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const openWhatsApp = () => {
    if (typeof window !== 'undefined') window.open(THEME.contact.whatsappUrl, '_blank');
  };


  const faqs = [
    {
      q: 'Tinggi badan saya 150-155 cm (Petite), apakah vest ini tidak kependekan atau kebesaran?',
      a: 'Justru untuk tinggi 150-155 cm efek 1:2 Golden Ratio paling terlihat dramatis! Panjang 42 cm berhenti pas di garis lingkar pinggang atas (high-waist), sehingga bagian bawah tubuh (kaki) langsung terlihat 2x lebih jenjang di foto.',
    },
    {
      q: 'Saya berhijab, bagaimana cara styling vest crop tanpa kelihatan terbuka?',
      a: 'Sangat aman dan estetik! Kamu cukup melapisinya di atas kemeja putih oversized (panjang menutup pinggul) atau manset baju terusan. Vest ini bertindak sebagai aksen visual berstruktur di dada, memberi siluet tegas tanpa mengurangi kesopanan busana hijab.',
    },
    {
      q: 'Apakah lingkar dada (LD) saya muat jika berukuran 95 cm?',
      a: 'Pasti muat! A.F. Vest didesain dengan bukaan depan dan 2 tali pita fleksibel (adjustable ribbon). Ukuran lingkar dada fleksibel dari 85 cm hingga 100 cm. Kamu bisa mengatur ikatan pita lebih renggang jika ingin ruang gerak lebih longgar.',
    },
    {
      q: 'Bagaimana kualitas bahannya, apakah gerah saat dipakai seharian?',
      a: 'Bahan luar menggunakan Canvas Cotton 3D berserat timbul dan Tapestry tenun premium yang kokoh (tidak letoi). Bagian dalam kami lapisi furing katun khusus yang lembut, halus, dan menyerap keringat sehingga sejuk dipakai seharian di iklim tropis.',
    },
  ];

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. Header Banner */}
      <View style={styles.heroSection}>
        <View style={styles.heroInner}>
          <View style={styles.badgePill}>
            <Sparkles size={14} color={THEME.colors.terracotta} />
            <Text style={styles.badgePillText}>KENAPA A.F. VEST?</Text>
          </View>
          <Text style={styles.heroTitle}>
            Rahasia Proporsi Tubuh 1:2 Golden Ratio ✨
          </Text>
          <Text style={styles.heroSubtitle}>
            Didesain khusus untuk cewek Gen Z yang sering merasa &quot;tenggelam&quot; atau memiliki proporsi torso panjang. Kembalikan proporsi ideal tubuhmu secara instan!
          </Text>

          <View style={styles.heroCtas}>
            <TouchableOpacity
              onPress={() => router.push('/katalog')}
              style={styles.ctaPrimary}
              activeOpacity={0.88}
            >
              <Text style={styles.ctaPrimaryText}>Lihat Koleksi Vest</Text>
              <ArrowRight size={16} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openWhatsApp}
              style={styles.ctaSecondary}
              activeOpacity={0.88}
            >
              <MessageCircle size={16} color={THEME.colors.waGreen} />
              <Text style={styles.ctaSecondaryText}>Konsultasi Ukuran via WA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 2. Visual Diagram: Masalah Long Torso vs 1:2 Ratio */}
      <View style={styles.diagramSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Anatomi Proporsi Tubuh & Panjang Baju</Text>
          <Text style={styles.sectionSubtitle}>
            Banyak wanita tidak sadar bahwa salah memilih panjang outer bisa membuat kaki tampak jauh lebih pendek dari aslinya.
          </Text>
        </View>

        <View style={styles.cardsRow}>
          {/* Card 1: Masalah Outer Biasa */}
          <View style={[styles.boxCard, styles.badBox]}>
            <View style={styles.boxHeader}>
              <View style={[styles.statusDot, { backgroundColor: '#FEE2E2' }]}>
                <X size={18} color="#DC2626" />
              </View>
              <Text style={styles.boxTitle}>Outer Biasa (Panjang 60 cm)</Text>
            </View>
            <Text style={styles.boxRatioBad}>Rasio Visual 1 : 1 (Kaki Tenggelam)</Text>

            <View style={styles.boxContent}>
              <Text style={styles.textBad}>
                ✕ Outer biasa menutup area pinggul hingga paha atas.
              </Text>
              <Text style={styles.textBad}>
                ✕ Menyamarkan garis pinggang alami (natural waistline).
              </Text>
              <Text style={styles.textBad}>
                ✕ Menjadikan tubuh terlihat &apos;boxy&apos; dan torso terlihat sangat panjang.
              </Text>
              <Text style={styles.textBad}>
                ✕ Foto full-body terlihat kurang proporsional.
              </Text>
            </View>
          </View>

          {/* Card 2: Solusi A.F. Vest */}
          <View style={[styles.boxCard, styles.goodBox]}>
            <View style={styles.boxHeader}>
              <View style={[styles.statusDot, { backgroundColor: '#DCFCE7' }]}>
                <CheckCircle2 size={18} color="#16A34A" />
              </View>
              <Text style={[styles.boxTitle, { color: THEME.colors.terracotta }]}>
                A.F. Vest Crop (Panjang 42 cm)
              </Text>
            </View>
            <Text style={styles.boxRatioGood}>Rasio Emas 1 : 2 (Kaki Jenjang Instan)</Text>

            <View style={styles.boxContent}>
              <Text style={styles.textGood}>
                ✓ Potongan presisi 42 cm berhenti tepat di atas pusar (high-waist level).
              </Text>
              <Text style={styles.textGood}>
                ✓ Mengekspos garis kaki dari pinggang ke bawah, memberi ilusi kaki 2x lebih panjang.
              </Text>
              <Text style={styles.textGood}>
                ✓ Tali depan adjustable memberi siluet dada rapi tanpa menekan.
              </Text>
              <Text style={styles.textGood}>
                ✓ Otomatis membuat setiap angle foto terlihat slim &amp; aesthetic!
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* 3. 4 Keunggulan Utama A.F. Vest */}
      <View style={styles.featuresSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>4 Alasan Utama Memilih A.F. Vest</Text>
          <Text style={styles.sectionSubtitle}>
            Bukan sekadar outer crop biasa, tapi dirancang garmen presisi dengan material terpilih.
          </Text>
        </View>

        <View style={styles.featuresGrid}>
          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: THEME.colors.terracottaLight }]}>
              <Ruler size={24} color={THEME.colors.terracotta} />
            </View>
            <Text style={styles.featureCardTitle}>1. Cutting Golden Ratio 42 cm</Text>
            <Text style={styles.featureCardDesc}>
              Berdasarkan uji fitting terhadap puluhan bentuk tubuh wanita Indonesia, panjang 42 cm terbukti paling ideal mengekspos high-waist pants.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: THEME.colors.sageLight }]}>
              <Sparkles size={24} color={THEME.colors.sage} />
            </View>
            <Text style={styles.featureCardTitle}>2. Motif 3D Relief &amp; Tapestry</Text>
            <Text style={styles.featureCardDesc}>
              Corak floral timbul nyata (embossed relief) dan tenun tapestry Parisian vintage yang berkelas, bukan sekadar sablon printing biasa.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: THEME.colors.warmYellowLight }]}>
              <CheckCircle2 size={24} color={THEME.colors.warmYellowDark} />
            </View>
            <Text style={styles.featureCardTitle}>3. Dual Tie Ribbon Fleksibel</Text>
            <Text style={styles.featureCardDesc}>
              Dua pasang tali pita di bagian dada memungkinkan penyesuaian fleksibel untuk lingkar dada 85 cm hingga 100 cm tanpa resleting kaku.
            </Text>
          </View>

          <View style={styles.featureCard}>
            <View style={[styles.featureIconBox, { backgroundColor: THEME.colors.dustyPinkLight }]}>
              <ShieldCheck size={24} color={THEME.colors.dustyPinkDark} />
            </View>
            <Text style={styles.featureCardTitle}>4. Lapis Furing Katun Halus</Text>
            <Text style={styles.featureCardDesc}>
              Bagian dalam selalu dilapisi furing katun adem yang tidak tembus pandang, nyaman menyentuh kulit, dan tidak gatal saat dipakai lama.
            </Text>
          </View>
        </View>
      </View>


      {/* 5. FAQ Section */}
      <View style={styles.faqSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pertanyaan yang Sering Diajukan (FAQ)</Text>
          <Text style={styles.sectionSubtitle}>
            Semua hal yang perlu kamu ketahui sebelum memesan outer A.F. Vest favoritmu.
          </Text>
        </View>

        <View style={styles.faqList}>
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <View key={index} style={styles.faqCard}>
                <TouchableOpacity
                  onPress={() => setOpenFaq(isOpen ? null : index)}
                  style={styles.faqQuestionRow}
                >
                  <Text style={styles.faqQuestionText}>{faq.q}</Text>
                  {isOpen ? (
                    <ChevronUp size={18} color={THEME.colors.terracotta} />
                  ) : (
                    <ChevronDown size={18} color={THEME.colors.textMuted} />
                  )}
                </TouchableOpacity>

                {isOpen && (
                  <View style={styles.faqAnswerContainer}>
                    <Text style={styles.faqAnswerText}>{faq.a}</Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* 6. CTA Bottom */}
      <View style={styles.ctaBottomSection}>
        <View style={styles.ctaCard}>
          <Text style={styles.ctaCardTitle}>Siap Upgrade OOTD Jadi Lebih Jenjang?</Text>
          <Text style={styles.ctaCardDesc}>
            Pilih motif yang paling mencerminkan kepribadianmu dan rasakan bedanya di foto!
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/katalog')}
            style={styles.ctaCardBtn}
            activeOpacity={0.88}
          >
            <Text style={styles.ctaCardBtnText}>Kunjungi Katalog Produk</Text>
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
    marginBottom: 32,
    maxWidth: 620,
  },
  heroCtas: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    justifyContent: 'center',
  },
  ctaPrimary: {
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    cursor: 'pointer' as any,
  },
  ctaPrimaryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  ctaSecondary: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.creamBorder,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  ctaSecondaryText: {
    color: THEME.colors.textMain,
    fontSize: 14,
    fontWeight: '700',
  },
  diagramSection: {
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
  cardsRow: {
    maxWidth: 1000,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  boxCard: {
    flex: 1,
    minWidth: 320,
    borderRadius: THEME.radius.xl,
    padding: 28,
  },
  badBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  goodBox: {
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: THEME.colors.terracotta,
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
  },
  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  statusDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  boxRatioBad: {
    fontSize: 13,
    fontWeight: '700',
    color: '#DC2626',
    marginBottom: 18,
  },
  boxRatioGood: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
    marginBottom: 18,
  },
  boxContent: {
    gap: 12,
  },
  textBad: {
    fontSize: 13,
    color: '#7F1D1D',
    lineHeight: 20,
  },
  textGood: {
    fontSize: 13,
    color: THEME.colors.textMain,
    lineHeight: 20,
    fontWeight: '500',
  },
  featuresSection: {
    backgroundColor: '#F7F2EB',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  featuresGrid: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
    justifyContent: 'center',
  },
  featureCard: {
    flex: 1,
    minWidth: 260,
    maxWidth: 280,
    backgroundColor: '#FFFFFF',
    padding: 24,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 12,
  },
  featureIconBox: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureCardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  featureCardDesc: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 20,
  },
  faqSection: {
    backgroundColor: '#FDFBF7',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  faqList: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    gap: 14,
  },
  faqCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    overflow: 'hidden',
  },
  faqQuestionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    cursor: 'pointer' as any,
  },
  faqQuestionText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
    flex: 1,
    paddingRight: 12,
  },
  faqAnswerContainer: {
    paddingHorizontal: 18,
    paddingBottom: 18,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamWarm,
  },
  faqAnswerText: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 22,
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
