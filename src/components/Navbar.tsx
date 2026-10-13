import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { ShoppingBag, Menu, X, MessageCircle, Sparkles } from '@/components/Icons';
import { THEME } from '@/constants/theme';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { totalItems, toastMessage } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '/' },
    { label: 'Katalog Produk', href: '/katalog' },
    { label: 'Kenapa A.F. Vest?', href: '/solusi' },
    { label: 'Mix & Match OOTD', href: '/ootd' },
    { label: 'Testimoni', href: '/testimoni' },
  ];

  return (
    <>
      {/* Top Banner Notice */}
      <View style={styles.topAnnouncement}>
        <View style={styles.announcementInner}>
          <Sparkles size={14} color="#FFF" />
          <Text style={styles.announcementText}>
            PROMO LAUNCHING: Dapatkan Golden Ratio Crop Vest Eksklusif! Kirim H+1 • Free Konsultasi Size
          </Text>
        </View>
      </View>

      {/* Main Navbar */}
      <View style={styles.navContainer}>
        <View style={styles.navInner}>
          {/* Brand Logo */}
          <Pressable onPress={() => router.push('/')} style={styles.brandContainer}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>A.F</Text>
            </View>
            <View>
              <Text style={styles.brandTitle}>A.F. VEST</Text>
              <Text style={styles.brandSubtitle}>CROPPED OUTER SPECIALIST</Text>
            </View>
          </Pressable>

          {/* Desktop Nav Links */}
          <View style={styles.desktopNav}>
            {navLinks.map((link, idx) => {
              const isActive = pathname === link.href;
              return (
                <Pressable
                  key={idx}
                  onPress={() => router.push(link.href as any)}
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

          {/* Action Buttons: Cart & WA */}
          <View style={styles.actionsContainer}>
            {/* Direct WA Consultation Button */}
            <TouchableOpacity
              onPress={() => {
                if (typeof window !== 'undefined') window.open(THEME.contact.whatsappUrl, '_blank');
              }}
              style={styles.waButton}
              activeOpacity={0.8}
            >

              <MessageCircle size={16} color="#FFF" />
              <Text style={styles.waButtonText}>Chat WA</Text>
            </TouchableOpacity>

            {/* Cart Button with Badge */}
            <Pressable
              onPress={() => router.push('/keranjang')}
              style={styles.cartButton}
            >
              <ShoppingBag size={20} color={THEME.colors.textMain} />
              {totalItems > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{totalItems}</Text>
                </View>
              )}
            </Pressable>

            {/* Mobile Hamburger Button */}
            <TouchableOpacity
              onPress={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={styles.hamburgerButton}
            >
              {mobileMenuOpen ? (
                <X size={24} color={THEME.colors.textMain} />
              ) : (
                <Menu size={24} color={THEME.colors.textMain} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <View style={styles.mobileMenu}>
            {navLinks.map((link, idx) => (
              <Pressable
                key={idx}
                onPress={() => {
                  setMobileMenuOpen(false);
                  router.push(link.href as any);
                }}
                style={styles.mobileMenuItem}
              >
                <Text style={styles.mobileMenuText}>{link.label}</Text>
              </Pressable>
            ))}
            <View style={styles.mobileMenuDivider} />
            <TouchableOpacity
              onPress={() => {
                setMobileMenuOpen(false);
                router.push('/keranjang');
              }}
              style={styles.mobileCartItem}
            >
              <ShoppingBag size={18} color={THEME.colors.terracotta} />
              <Text style={styles.mobileCartText}>
                Keranjang Belanja ({totalItems} item)
              </Text>
            </TouchableOpacity>
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
  },
  announcementInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  announcementText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  navContainer: {
    backgroundColor: '#FDFBF7F0',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    zIndex: 100,
  },
  navInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
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
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  logoBadgeText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  brandTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textMain,
    letterSpacing: 1.2,
  },
  brandSubtitle: {
    fontSize: 9,
    fontWeight: '700',
    color: THEME.colors.textMuted,
    letterSpacing: 1.5,
  },
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 28,
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
    gap: 12,
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
  waButtonText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
  cartButton: {
    width: 42,
    height: 42,
    borderRadius: THEME.radius.full,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    cursor: 'pointer' as any,
  },
  cartBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: THEME.colors.terracotta,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  cartBadgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
  },
  hamburgerButton: {
    display: 'flex',
    padding: 6,
    marginLeft: 4,
    cursor: 'pointer' as any,
  },
  mobileMenu: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: THEME.colors.creamBorder,
    paddingVertical: 14,
    paddingHorizontal: 20,
    gap: 12,
  },
  mobileMenuItem: {
    paddingVertical: 8,
  },
  mobileMenuText: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.colors.textMain,
  },
  mobileMenuDivider: {
    height: 1,
    backgroundColor: THEME.colors.creamBorder,
    marginVertical: 4,
  },
  mobileCartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  mobileCartText: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.terracotta,
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
