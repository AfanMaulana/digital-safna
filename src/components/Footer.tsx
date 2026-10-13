import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Instagram,
  MessageCircle,
  Truck,
  ShieldCheck,
  Ruler,
  ExternalLink,
} from '@/components/Icons';
import { THEME } from '@/constants/theme';

export default function Footer() {
  const router = useRouter();

  const openLink = (url: string) => {
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };

  return (
    <View style={styles.footerContainer}>
      {/* Policy Highlights Banner */}
      <View style={styles.policySection}>
        <View style={styles.policyInner}>
          <View style={styles.policyItem}>
            <View style={[styles.policyIconCircle, { backgroundColor: THEME.colors.terracottaLight }]}>
              <Truck size={22} color={THEME.colors.terracotta} />
            </View>
            <View>
              <Text style={styles.policyTitle}>Pengiriman Cepat H+1</Text>
              <Text style={styles.policyDesc}>Pesanan dikirim max H+1 setelah pembayaran terkonfirmasi.</Text>
            </View>
          </View>

          <View style={styles.policyItem}>
            <View style={[styles.policyIconCircle, { backgroundColor: THEME.colors.sageLight }]}>
              <Ruler size={22} color={THEME.colors.sage} />
            </View>
            <View>
              <Text style={styles.policyTitle}>Toleransi Ukuran 1-2 cm</Text>
              <Text style={styles.policyDesc}>Cutting presisi garmen dengan jahitan rapi lapis furing.</Text>
            </View>
          </View>

          <View style={styles.policyItem}>
            <View style={[styles.policyIconCircle, { backgroundColor: THEME.colors.warmYellowLight }]}>
              <ShieldCheck size={22} color={THEME.colors.warmYellowDark} />
            </View>
            <View>
              <Text style={styles.policyTitle}>Garansi Retur 1x24 Jam</Text>
              <Text style={styles.policyDesc}>Wajib menyertakan Video Unboxing tanpa jeda saat klaim.</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Main Footer Links */}
      <View style={styles.mainFooter}>
        <View style={styles.mainFooterInner}>
          {/* Brand Info */}
          <View style={styles.brandCol}>
            <View style={styles.footerLogoBadge}>
              <Text style={styles.footerLogoBadgeText}>A.F</Text>
            </View>
            <Text style={styles.footerBrandTitle}>A.F. VEST</Text>
            <Text style={styles.footerBrandDesc}>
              Brand outer crop spesialis mengatasi proporsi tubuh long torso untuk Gen Z Indonesia. 
              Desain Golden Ratio 1:2 bikin look kamu instan lebih jenjang & stunning!
            </Text>
            <Text style={styles.tagline}>#AlwaysSlayNoCap #GoldenRatioVest</Text>
          </View>

          {/* Nav Links */}
          <View style={styles.linksCol}>
            <Text style={styles.colTitle}>Navigasi Cepat</Text>
            <TouchableOpacity onPress={() => router.push('/')} style={styles.linkItem}>
              <Text style={styles.linkText}>Landing Page</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/katalog')} style={styles.linkItem}>
              <Text style={styles.linkText}>Katalog Semua Produk</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/keranjang')} style={styles.linkItem}>
              <Text style={styles.linkText}>Keranjang Belanja</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/solusi')} style={styles.linkItem}>
              <Text style={styles.linkText}>Kenapa A.F. Vest? (Solusi)</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/ootd')} style={styles.linkItem}>
              <Text style={styles.linkText}>Mix &amp; Match OOTD</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/testimoni')} style={styles.linkItem}>
              <Text style={styles.linkText}>Testimoni Pembeli</Text>
            </TouchableOpacity>
          </View>

          {/* Social Media & Contact */}
          <View style={styles.linksCol}>
            <Text style={styles.colTitle}>Toko & Media Sosial</Text>
            
            <TouchableOpacity
              onPress={() => openLink(THEME.contact.instagramUrl)}
              style={styles.socialItem}
            >
              <Instagram size={18} color={THEME.colors.terracotta} />
              <Text style={styles.socialText}>Instagram @{THEME.contact.instagram}</Text>
              <ExternalLink size={13} color={THEME.colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openLink(THEME.contact.tiktokUrl)}
              style={styles.socialItem}
            >
              <View style={styles.tiktokDot} />
              <Text style={styles.socialText}>TikTok @{THEME.contact.tiktok}</Text>
              <ExternalLink size={13} color={THEME.colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => openLink(THEME.contact.shopeeUrl)}
              style={styles.socialItem}
            >
              <View style={styles.shopeeDot} />
              <Text style={styles.socialText}>Shopee Mall @{THEME.contact.shopee}</Text>
              <ExternalLink size={13} color={THEME.colors.textLight} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                openLink(THEME.contact.whatsappUrl)
              }
              style={styles.socialItem}
            >

              <MessageCircle size={18} color={THEME.colors.waGreen} />
              <Text style={styles.socialText}>WhatsApp: {THEME.contact.whatsappFormatted}</Text>
            </TouchableOpacity>
          </View>

          {/* Terms & Return policy card */}
          <View style={styles.termsCol}>
            <Text style={styles.colTitle}>Syarat & Ketentuan (T&C)</Text>
            <View style={styles.termsCard}>
              <Text style={styles.termsItem}>
                • <Text style={styles.termsBold}>Pengiriman:</Text> H+1 hari kerja (Senin - Sabtu) setelah konfirmasi checkout.
              </Text>
              <Text style={styles.termsItem}>
                • <Text style={styles.termsBold}>Ukuran:</Text> Toleransi jahit ±1-2 cm wajar pada produk garmen massal.
              </Text>
              <Text style={styles.termsItem}>
                • <Text style={styles.termsBold}>Retur & Komplain:</Text> Wajib kirim video unboxing utuh tanpa cut dalam kurun 1x24 jam sejak barang diterima kurir.
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom copyright */}
        <View style={styles.bottomBar}>
          <Text style={styles.copyrightText}>
            © {new Date().getFullYear()} A.F. VEST. All Rights Reserved. Crafted for Gen Z Fashionista 🌸
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: '#F7F2EB',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamBorder,
    marginTop: 40,
  },
  policySection: {
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  policyInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 24,
  },
  policyItem: {
    flex: 1,
    minWidth: 260,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  policyIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textMain,
    marginBottom: 4,
  },
  policyDesc: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
    maxWidth: 260,
  },
  mainFooter: {
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  mainFooterInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 36,
    justifyContent: 'space-between',
  },
  brandCol: {
    flex: 1.2,
    minWidth: 260,
  },
  footerLogoBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: THEME.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  footerLogoBadgeText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '800',
  },
  footerBrandTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.textMain,
    letterSpacing: 1,
    marginBottom: 8,
  },
  footerBrandDesc: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 22,
    marginBottom: 12,
  },
  tagline: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  linksCol: {
    flex: 1,
    minWidth: 180,
  },
  colTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textMain,
    marginBottom: 18,
    letterSpacing: 0.5,
  },
  linkItem: {
    paddingVertical: 7,
    cursor: 'pointer' as any,
  },
  linkText: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    cursor: 'pointer' as any,
  },
  socialText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textMain,
  },
  shopeeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.shopeeOrange,
  },
  tiktokDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: THEME.colors.tiktokBlack,
  },
  termsCol: {
    flex: 1.3,
    minWidth: 260,
  },
  termsCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: THEME.radius.md,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 10,
  },
  termsItem: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 18,
  },
  termsBold: {
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  bottomBar: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    marginTop: 48,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamBorder,
    alignItems: 'center',
  },
  copyrightText: {
    fontSize: 12,
    color: THEME.colors.textLight,
    textAlign: 'center',
  },
});
