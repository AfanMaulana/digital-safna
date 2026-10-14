import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { PRODUCTS, formatRupiah, getImageSource } from '@/data/products';
import { THEME } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import ProductCard from '@/components/ProductCard';
import PageContainer from '@/components/PageContainer';
import {
  ShoppingBag,
  MessageCircle,
  ShieldCheck,
  Ruler,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  Sparkles,
  CheckCircle2,
} from '@/components/Icons';

export function generateStaticParams(): { id: string }[] {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export default function ProductDetailPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addToCart, buildDirectProductWhatsAppUrl } = useCart();

  const product = PRODUCTS.find((p) => p.id === String(id)) || PRODUCTS[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<'specs' | 'size' | 'care' | null>('specs');

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  const handleBuyWhatsApp = () => {
    const url = buildDirectProductWhatsAppUrl(product, quantity);
    if (typeof window !== 'undefined') {
      window.open(url, '_blank');
    }
  };


  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Breadcrumb Navigation */}
      <View style={styles.breadcrumbBar}>
        <View style={styles.breadcrumbInner}>
          <Pressable onPress={() => router.push('/')}>
            <Text style={styles.breadcrumbLink}>Beranda</Text>
          </Pressable>
          <ChevronRight size={14} color={THEME.colors.textLight} />
          <Pressable onPress={() => router.push('/katalog')}>
            <Text style={styles.breadcrumbLink}>Katalog</Text>
          </Pressable>
          <ChevronRight size={14} color={THEME.colors.textLight} />
          <Text style={styles.breadcrumbCurrent} numberOfLines={1}>
            {product.name}
          </Text>
        </View>
      </View>

      {/* Main Detail Section */}
      <View style={styles.mainDetailWrapper}>
        <View style={styles.mainDetailInner}>
          {/* Left Column: Image Gallery */}
          <View style={styles.galleryCol}>
            {/* Big Main Image Preview */}
            <View style={styles.mainImageWrapper}>
              <Image
                source={getImageSource(product.images[selectedImageIndex])}
                style={styles.mainImage}
                resizeMode="cover"
              />

              {/* Floating Badge */}
              <View
                style={[
                  styles.badgeTag,
                  { backgroundColor: product.badgeColor },
                ]}
              >
                <Text style={styles.badgeText}>{product.badge}</Text>
              </View>

              {/* Golden Ratio 1:2 Watermark */}
              <View style={styles.goldenRatioTag}>
                <Sparkles size={12} color="#FFF" />
                <Text style={styles.goldenRatioTagText}>1:2 Golden Ratio</Text>
              </View>
            </View>

            {/* Interactive Thumbnails (only if multiple images) */}
            {product.images.length > 1 && (
              <View style={styles.thumbnailsRow}>
                {product.images.map((imgUri, index) => {
                  const isSelected = selectedImageIndex === index;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => setSelectedImageIndex(index)}
                      style={[
                        styles.thumbnailWrapper,
                        isSelected && styles.thumbnailSelected,
                      ]}
                      activeOpacity={0.8}
                    >
                      <Image
                        source={getImageSource(imgUri)}
                        style={styles.thumbnailImage}
                        resizeMode="cover"
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>

          {/* Right Column: Product Info & Actions */}
          <View style={styles.infoCol}>
            {/* Category / Motif Pill */}
            <View style={styles.motifPill}>
              <Text style={styles.motifPillText}>{product.categoryLabel}</Text>
            </View>

            {/* Product Title */}
            <Text style={styles.productName}>{product.name}</Text>

            {/* Price Box */}
            <View style={styles.priceBox}>
              <View style={styles.priceMainRow}>
                <Text style={styles.priceCurrent}>{formatRupiah(product.price)}</Text>
                <Text style={styles.priceOriginal}>
                  {formatRupiah(product.originalPrice)}
                </Text>
                <View style={styles.discountPill}>
                  <Text style={styles.discountPillText}>
                    Diskon{' '}
                    {Math.round(
                      ((product.originalPrice - product.price) /
                        product.originalPrice) *
                        100
                    )}
                    %
                  </Text>
                </View>
              </View>
              <Text style={styles.priceNote}>
                ⚡ Hemat Rp {new Intl.NumberFormat('id-ID').format(product.originalPrice - product.price)} khusus pesanan online hari ini!
              </Text>
            </View>

            {/* Short Description */}
            <Text style={styles.shortDescription}>{product.description}</Text>

            {/* Highlights bullets */}
            <View style={styles.highlightsContainer}>
              {product.highlights.map((item, idx) => (
                <View key={idx} style={styles.highlightItem}>
                  <CheckCircle2 size={15} color={THEME.colors.sage} />
                  <Text style={styles.highlightItemText}>{item}</Text>
                </View>
              ))}
            </View>

            {/* Quantity Selector */}
            <View style={styles.quantitySection}>
              <Text style={styles.quantityLabel}>Jumlah Pembelian:</Text>
              <View style={styles.quantityCounter}>
                <TouchableOpacity
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  <Minus size={14} color={THEME.colors.textMain} />
                </TouchableOpacity>
                <Text style={styles.qtyNumber}>{quantity}</Text>
                <TouchableOpacity
                  onPress={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  style={styles.qtyBtn}
                >
                  <Plus size={14} color={THEME.colors.textMain} />
                </TouchableOpacity>
              </View>
              <Text style={styles.stockText}>Sisa stok: {product.stock} pcs</Text>
            </View>

            {/* Primary Action Buttons */}
            <View style={styles.primaryActionButtons}>
              {/* Add to Cart Button */}
              <TouchableOpacity
                onPress={() => addToCart(product, quantity)}
                style={styles.addToCartBtn}
                activeOpacity={0.88}
              >
                <ShoppingBag size={18} color="#FFF" />
                <Text style={styles.addToCartBtnText}>Tambah ke Keranjang</Text>
              </TouchableOpacity>

              {/* Direct WhatsApp Checkout Button */}
              <TouchableOpacity
                onPress={handleBuyWhatsApp}
                style={styles.waDirectBtn}
                activeOpacity={0.88}
              >
                <MessageCircle size={18} color="#FFF" />
                <Text style={styles.waDirectBtnText}>Beli Sekarang via WhatsApp</Text>
              </TouchableOpacity>
            </View>


            {/* Specs & Accordion Tabs */}
            <View style={styles.accordionContainer}>
              {/* Accordion Item: Spesifikasi & Ukuran */}
              <TouchableOpacity
                onPress={() =>
                  setExpandedSection(
                    expandedSection === 'specs' ? null : 'specs'
                  )
                }
                style={styles.accordionHeader}
              >
                <View style={styles.accordionHeaderLeft}>
                  <Ruler size={18} color={THEME.colors.terracotta} />
                  <Text style={styles.accordionTitle}>
                    Detail Ukuran & Spesifikasi Lengkap
                  </Text>
                </View>
                {expandedSection === 'specs' ? (
                  <ChevronUp size={18} color={THEME.colors.textMuted} />
                ) : (
                  <ChevronDown size={18} color={THEME.colors.textMuted} />
                )}
              </TouchableOpacity>

              {expandedSection === 'specs' && (
                <View style={styles.accordionBody}>
                  <View style={styles.specRow}>
                    <Text style={styles.specKey}>Lingkar Dada (LD):</Text>
                    <Text style={styles.specValue}>{product.lingkarDada} (Dual tie ribbons)</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specKey}>Jenis Material:</Text>
                    <Text style={styles.specValue}>{product.material}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specKey}>Motif / Corak:</Text>
                    <Text style={styles.specValue}>{product.motif}</Text>
                  </View>
                  <View style={styles.specRow}>
                    <Text style={styles.specKey}>Pelapis Dalam:</Text>
                    <Text style={styles.specValue}>Furing Halus Adem & Nyaman (Non-itch)</Text>
                  </View>
                </View>
              )}

              {/* Accordion Item: Petunjuk Perawatan */}
              <TouchableOpacity
                onPress={() =>
                  setExpandedSection(expandedSection === 'care' ? null : 'care')
                }
                style={styles.accordionHeader}
              >
                <View style={styles.accordionHeaderLeft}>
                  <ShieldCheck size={18} color={THEME.colors.sage} />
                  <Text style={styles.accordionTitle}>Petunjuk Cuci & Perawatan</Text>
                </View>
                {expandedSection === 'care' ? (
                  <ChevronUp size={18} color={THEME.colors.textMuted} />
                ) : (
                  <ChevronDown size={18} color={THEME.colors.textMuted} />
                )}
              </TouchableOpacity>

              {expandedSection === 'care' && (
                <View style={styles.accordionBody}>
                  <Text style={styles.careInstruction}>
                    • Cuci tangan lembut (hand wash) atau gunakan laundry net saat mesin cuci.
                  </Text>
                  <Text style={styles.careInstruction}>
                    • Hindari pemutih keras agar serat relief 3D dan warna cetak tetap prima.
                  </Text>
                  <Text style={styles.careInstruction}>
                    • Setrika dengan suhu sedang (medium) dari bagian dalam vest.
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Recommended Cross-sell Products */}
      <View style={styles.relatedSection}>
        <View style={styles.relatedHeader}>
          <Text style={styles.relatedTitle}>Koleksi Vest Lainnya</Text>
          <Text style={styles.relatedSubtitle}>
            Padukan gaya kamu dengan variasi motif floral dan tapestry unik lainnya.
          </Text>
        </View>

        <View style={styles.relatedGrid}>
          {relatedProducts.map((p) => (
            <View key={p.id} style={styles.relatedCol}>
              <ProductCard product={p} />
            </View>
          ))}
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
  breadcrumbBar: {
    backgroundColor: '#F7F2EB',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  breadcrumbInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  breadcrumbLink: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    fontWeight: '600',
    cursor: 'pointer' as any,
  },
  breadcrumbCurrent: {
    fontSize: 13,
    color: THEME.colors.textMain,
    fontWeight: '700',
    flex: 1,
  },
  mainDetailWrapper: {
    paddingVertical: 36,
    paddingHorizontal: 20,
  },
  mainDetailInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 40,
  },
  galleryCol: {
    flex: 1,
    minWidth: 320,
  },
  mainImageWrapper: {
    width: '100%',
    height: 480,
    borderRadius: THEME.radius.xl,
    backgroundColor: '#F5EFE6',
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  badgeTag: {
    position: 'absolute',
    top: 16,
    left: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '800',
  },
  goldenRatioTag: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    backgroundColor: 'rgba(38, 34, 31, 0.85)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: THEME.radius.full,
  },
  goldenRatioTagText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '700',
  },
  thumbnailsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 14,
  },
  thumbnailWrapper: {
    width: 76,
    height: 76,
    borderRadius: THEME.radius.md,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    cursor: 'pointer' as any,
  },
  thumbnailSelected: {
    borderColor: THEME.colors.terracotta,
  },
  thumbnailImage: {
    width: '100%',
    height: '100%',
  },
  infoCol: {
    flex: 1.2,
    minWidth: 320,
    gap: 14,
  },
  motifPill: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    alignSelf: 'flex-start',
  },
  motifPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  productName: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.textMain,
    lineHeight: 34,
  },
  priceBox: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    gap: 6,
  },
  priceMainRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 12,
  },
  priceCurrent: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  priceOriginal: {
    fontSize: 15,
    color: THEME.colors.textLight,
    textDecorationLine: 'line-through',
  },
  discountPill: {
    backgroundColor: THEME.colors.terracottaLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  discountPillText: {
    color: THEME.colors.terracotta,
    fontSize: 12,
    fontWeight: '800',
  },
  priceNote: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  shortDescription: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    lineHeight: 22,
  },
  highlightsContainer: {
    gap: 8,
    paddingVertical: 4,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  highlightItemText: {
    fontSize: 13,
    color: THEME.colors.textMain,
    fontWeight: '600',
  },
  quantitySection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  quantityLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  quantityCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.full,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer' as any,
  },
  qtyNumber: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textMain,
    paddingHorizontal: 12,
  },
  stockText: {
    fontSize: 12,
    color: THEME.colors.textLight,
  },
  primaryActionButtons: {
    gap: 12,
    marginTop: 8,
  },
  addToCartBtn: {
    backgroundColor: THEME.colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  addToCartBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  waDirectBtn: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.waGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    cursor: 'pointer' as any,
  },
  waDirectBtnText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '700',
  },
  accordionContainer: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.lg,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
  accordionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  accordionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  accordionBody: {
    padding: 16,
    backgroundColor: '#FCFAF6',
    gap: 10,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamWarm,
  },
  specKey: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  specValue: {
    fontSize: 13,
    color: THEME.colors.textMain,
    fontWeight: '700',
  },
  careInstruction: {
    fontSize: 13,
    color: THEME.colors.textMuted,
    lineHeight: 20,
  },
  relatedSection: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 48,
  },
  relatedHeader: {
    marginBottom: 24,
  },
  relatedTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.textMain,
    marginBottom: 4,
  },
  relatedSubtitle: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  relatedGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  relatedCol: {
    flex: 1,
    minWidth: 260,
    maxWidth: 320,
  },
});
