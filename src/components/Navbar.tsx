import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import {
  ShoppingBag,
  Menu,
  X,
  MessageCircle,
  Sparkles,
  Home,
  Layers,
  Ruler,
  Flame,
  ChevronRight,
} from '@/components/Icons';
import { THEME } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, toastMessage } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { width } = useWindowDimensions();

  // Responsive breakpoint: Desktop >= 860px, Mobile < 860px
  const isDesktop = width >= 860;
  const isMobile = !isDesktop;

  const navLinks = [
    {
      label: 'Beranda',
      href: '/',
      desc: 'Halaman Utama & Koleksi',
      Icon: Home,
    },
    {
      label: 'Katalog Produk',
      href: '/katalog',
      desc: '4 Motif Vest & Detail Ukuran',
      Icon: Layers,
    },
    {
      label: 'Kenapa A.F. Vest?',
      href: '/solusi',
      desc: 'Solusi Rasio Emas 1:2 & Long Torso',
      Icon: Ruler,
    },
    {
      label: 'Mix & Match OOTD',
      href: '/ootd',
      desc: 'Lookbook Style & Hijab Friendly',
      Icon: Flame,
    },
  ];

  const handleNavigate = (href: string) => {
    setMobileMenuOpen(false);
    router.push(href as any);
  };

  const handleWhatsApp = () => {
    if (typeof window !== 'undefined') {
      window.open(THEME.contact.whatsappUrl, '_blank');
    }
  };

  return (
    <>
      {/* 1. Top Announcement Bar */}
      <View style={styles.topAnnouncement}>
        <View style={styles.announcementInner}>
          <Sparkles size={13} color="#FFF" />
          <Text style={styles.announcementText} numberOfLines={isMobile ? 2 : 1}>
            PROMO LAUNCHING: Dapatkan Golden Ratio Crop Vest Eksklusif! Kirim H+1 • Free Konsultasi Size
          </Text>
        </View>
      </View>

      {/* 2. Main Navigation Bar */}
      <View style={styles.navContainer}>
        <View style={styles.navInner}>
          {/* Brand Logo */}
          <Pressable onPress={() => handleNavigate('/')} style={styles.brandContainer}>
            <View style={[styles.logoBadge, isMobile && styles.logoBadgeMobile]}>
              <Text style={[styles.logoBadgeText, isMobile && styles.logoBadgeTextMobile]}>A.F</Text>
            </View>
            <View>
              <Text style={[styles.brandTitle, isMobile && styles.brandTitleMobile]}>A.F. VEST</Text>
              <Text style={styles.brandSubtitle}>
                {isMobile ? 'CROPPED SPECIALIST' : 'CROPPED OUTER SPECIALIST'}
              </Text>
            </View>
          </Pressable>

          {/* Desktop Navigation Links (ONLY RENDERED ON DESKTOP) */}
          {isDesktop && (
            <View style={styles.desktopNav}>
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                return (
                  <Pressable
                    key={idx}
                    onPress={() => handleNavigate(link.href)}
                    style={styles.navLinkItem}
                  >
                    <Text style={[styles.navLinkText, isActive && styles.navLinkTextActive]}>
                      {link.label}
                    </Text>
                    {isActive && <View style={styles.activeIndicator} />}
                  </Pressable>
                );
              })}
            </View>
          )}

          {/* Action Buttons: WhatsApp, Cart, and Hamburger */}
          <View style={styles.actionsContainer}>
            {/* WhatsApp Consultation Button */}
            <TouchableOpacity
              onPress={handleWhatsApp}
              style={[styles.waButton, isMobile && styles.waButtonMobile]}
              activeOpacity={0.82}
            >
              <MessageCircle size={isMobile ? 15 : 16} color="#FFF" />
              <Text style={[styles.waButtonText, isMobile && styles.waButtonTextMobile]}>
                {isMobile ? 'WA' : 'Chat WA'}
              </Text>
            </TouchableOpacity>

            {/* Shopping Cart Button */}
            <Pressable
              onPress={() => handleNavigate('/keranjang')}
              style={[styles.cartButton, isMobile && styles.cartButtonMobile]}
            >
              <ShoppingBag size={isMobile ? 18 : 20} color={THEME.colors.textMain} />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
                </View>
              )}
            </Pressable>

            {/* Mobile Hamburger Toggle (ONLY RENDERED ON MOBILE) */}
            {isMobile && (
              <TouchableOpacity
                onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
                style={[
                  styles.hamburgerButton,
                  mobileMenuOpen && styles.hamburgerButtonActive,
                ]}
                activeOpacity={0.7}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X size={22} color={THEME.colors.terracotta} />
                ) : (
                  <Menu size={22} color={THEME.colors.textMain} />
                )}
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. Mobile Dropdown Menu Drawer (Neat, Elegant & Feature-Rich) */}
        {isMobile && mobileMenuOpen && (
          <View style={styles.mobileMenuWrapper}>
            <View style={styles.mobileMenuHeader}>
              <View style={styles.mobileMenuHeaderLeft}>
                <Sparkles size={14} color={THEME.colors.terracotta} />
                <Text style={styles.mobileMenuHeaderTitle}>FITUR &amp; MENU NAVIGASI</Text>
              </View>
              <TouchableOpacity
                onPress={() => setMobileMenuOpen(false)}
                style={styles.mobileMenuCloseBtn}
              >
                <X size={16} color={THEME.colors.textMuted} />
              </TouchableOpacity>
            </View>

            {/* Nav Items List */}
            <View style={styles.mobileMenuList}>
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.href;
                const IconComponent = link.Icon;
                return (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => handleNavigate(link.href)}
                    style={[
                      styles.mobileMenuItem,
                      isActive && styles.mobileMenuItemActive,
                    ]}
                    activeOpacity={0.75}
                  >
                    <View
                      style={[
                        styles.mobileMenuIconBox,
                        isActive && styles.mobileMenuIconBoxActive,
                      ]}
                    >
                      <IconComponent
                        size={18}
                        color={isActive ? '#FFF' : THEME.colors.terracotta}
                      />
                    </View>
                    <View style={styles.mobileMenuTextCol}>
                      <Text
                        style={[
                          styles.mobileMenuLabel,
                          isActive && styles.mobileMenuLabelActive,
                        ]}
                      >
                        {link.label}
                      </Text>
                      <Text style={styles.mobileMenuDesc}>{link.desc}</Text>
                    </View>
                    <ChevronRight
                      size={16}
                      color={isActive ? THEME.colors.terracotta : THEME.colors.textLight}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.mobileMenuDivider} />

            {/* Cart Quick Action */}
            <TouchableOpacity
              onPress={() => handleNavigate('/keranjang')}
              style={styles.mobileCartCard}
              activeOpacity={0.8}
            >
              <View style={styles.mobileCartCardLeft}>
                <View style={styles.mobileCartIconBox}>
                  <ShoppingBag size={18} color={THEME.colors.terracotta} />
                </View>
                <View>
                  <Text style={styles.mobileCartCardTitle}>Keranjang Belanja</Text>
                  <Text style={styles.mobileCartCardSub}>Cek item pesanan Anda</Text>
                </View>
              </View>
              <View style={styles.mobileCartBadgePill}>
                <Text style={styles.mobileCartBadgePillText}>
                  {totalItems > 0 ? `${totalItems} item` : 'Kosong'}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Dedicated WhatsApp Consultation Button */}
            <TouchableOpacity
              onPress={() => {
                setMobileMenuOpen(false);
                handleWhatsApp();
              }}
              style={styles.mobileWaFullBtn}
              activeOpacity={0.88}
            >
              <MessageCircle size={18} color="#FFF" />
              <Text style={styles.mobileWaFullBtnText}>
                Konsultasi Ukuran via WA (Fast Response)
              </Text>
            </TouchableOpacity>

            {/* Footer Trust Note */}
            <View style={styles.mobileMenuFooter}>
              <Text style={styles.mobileMenuFooterText}>
                🚀 Kirim H+1 Kilat • 100% Real Picture &amp; Garansi Pas
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* Global Toast Notification */}
      {toastMessage && (
        <View style={styles.toastContainer}>
          <View style={styles.toastContent}>
            <Sparkles size={16} color="#FFF" />
            <Text style={styles.toastText}>{toastMessage}</Text>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  topAnnouncement: {
    backgroundColor: THEME.colors.terracotta,
    paddingVertical: 7,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  announcementInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    maxWidth: 1200,
  },
  announcementText: {
    color: '#FFF',
    fontSize: 11.5,
    fontWeight: '600',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  navContainer: {
    backgroundColor: '#FDFBF7F8',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    zIndex: 999,
    width: '100%',
  },
  navInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    cursor: 'pointer' as any,
  },
  logoBadge: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: THEME.colors.terracotta,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  logoBadgeMobile: {
    width: 34,
    height: 34,
    borderRadius: 10,
  },
  logoBadgeText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  logoBadgeTextMobile: {
    fontSize: 13,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textMain,
    letterSpacing: 1.1,
  },
  brandTitleMobile: {
    fontSize: 17,
    letterSpacing: 0.8,
  },
  brandSubtitle: {
    fontSize: 8.5,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    letterSpacing: 1.2,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 26,
  },
  navLinkItem: {
    position: 'relative',
    paddingVertical: 6,
    cursor: 'pointer' as any,
  },
  navLinkText: {
    fontSize: 14,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  navLinkTextActive: {
    color: THEME.colors.terracotta,
    fontWeight: '700',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    right: 0,
    height: 2.5,
    backgroundColor: THEME.colors.terracotta,
    borderRadius: 99,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  waButton: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.waGreen,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    cursor: 'pointer' as any,
  },
  waButtonMobile: {
    paddingHorizontal: 10,
    paddingVertical: 6.5,
    gap: 4,
  },
  waButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  waButtonTextMobile: {
    fontSize: 11.5,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: THEME.radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer' as any,
  },
  cartButtonMobile: {
    width: 36,
    height: 36,
  },
  cartBadge: {
    position: 'absolute',
    top: -3,
    right: -3,
    backgroundColor: THEME.colors.terracotta,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '800',
  },
  hamburgerButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer' as any,
  },
  hamburgerButtonActive: {
    backgroundColor: '#FFF5F2',
    borderColor: THEME.colors.terracotta,
  },
  mobileMenuWrapper: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamBorder,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
  },
  mobileMenuHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F2EDE5',
    marginBottom: 8,
  },
  mobileMenuHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  mobileMenuHeaderTitle: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.terracotta,
    letterSpacing: 1,
  },
  mobileMenuCloseBtn: {
    padding: 4,
  },
  mobileMenuList: {
    gap: 4,
  },
  mobileMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 12,
  },
  mobileMenuItemActive: {
    backgroundColor: '#FFF5F2',
  },
  mobileMenuIconBox: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#F8F4EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileMenuIconBoxActive: {
    backgroundColor: THEME.colors.terracotta,
  },
  mobileMenuTextCol: {
    flex: 1,
  },
  mobileMenuLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  mobileMenuLabelActive: {
    color: THEME.colors.terracotta,
  },
  mobileMenuDesc: {
    fontSize: 11,
    color: THEME.colors.textLight,
    marginTop: 1,
  },
  mobileMenuDivider: {
    height: 1,
    backgroundColor: '#F2EDE5',
    marginVertical: 10,
  },
  mobileCartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  mobileCartCardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  mobileCartIconBox: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#FFF5F2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mobileCartCardTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  mobileCartCardSub: {
    fontSize: 10.5,
    color: THEME.colors.textMuted,
  },
  mobileCartBadgePill: {
    backgroundColor: THEME.colors.terracotta,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  mobileCartBadgePillText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  mobileWaFullBtn: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: THEME.colors.waGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  mobileWaFullBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  mobileMenuFooter: {
    marginTop: 10,
    alignItems: 'center',
  },
  mobileMenuFooterText: {
    fontSize: 10.5,
    color: THEME.colors.textLight,
    fontWeight: '500',
  },
  toastContainer: {
    position: 'fixed' as any,
    bottom: 24,
    right: 24,
    zIndex: 9999,
  },
  toastContent: {
    backgroundColor: THEME.colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: THEME.radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
  },
  toastText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
