import React from 'react';
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
} from '@/components/Icons';

export default function TestimoniPage() {
  const router = useRouter();

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

      {/* 2. Notice Section */}
      <View style={styles.noticeSection}>
        <View style={styles.noticeCard}>
          <Sparkles size={32} color={THEME.colors.terracotta} />
          <Text style={styles.noticeTitle}>Testimoni Sedang Diperbarui</Text>
          <Text style={styles.noticeDesc}>
            Ulasan pembeli dan dokumentasi OOTD terbaru sedang dikurasi untuk koleksi batch ini. Ingin konsultasi ukuran atau melihat rekomendasi look? Hubungi kami langsung via WhatsApp!
          </Text>
          <View style={styles.noticeActions}>
            <TouchableOpacity
              onPress={() => router.push('/katalog')}
              style={styles.noticePrimaryBtn}
              activeOpacity={0.88}
            >
              <Text style={styles.noticePrimaryBtnText}>Lihat Katalog Produk</Text>
              <ArrowRight size={16} color="#FFF" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (typeof window !== 'undefined') window.open(THEME.contact.whatsappUrl, '_blank');
              }}
              style={styles.noticeWaBtn}
              activeOpacity={0.88}
            >
              <MessageCircle size={16} color={THEME.colors.waGreen} />
              <Text style={styles.noticeWaBtnText}>Tanya Admin via WA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* 3. CTA Bottom */}
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
  noticeSection: {
    paddingVertical: 64,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  noticeCard: {
    maxWidth: 680,
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    padding: 36,
    alignItems: 'center',
    textAlign: 'center' as any,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    gap: 14,
  },
  noticeTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.textMain,
    textAlign: 'center',
  },
  noticeDesc: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 520,
  },
  noticeActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
    justifyContent: 'center',
  },
  noticePrimaryBtn: {
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  noticePrimaryBtnText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  noticeWaBtn: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  noticeWaBtnText: {
    color: THEME.colors.textMain,
    fontSize: 14,
    fontWeight: '700',
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
