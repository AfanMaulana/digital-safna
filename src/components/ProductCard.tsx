import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Product, formatRupiah, getImageSource } from '@/data/products';
import { THEME } from '@/constants/theme';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingBag, Eye } from '@/components/Icons';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleCardPress = () => {
    router.push(`/produk/${product.id}` as any);
  };

  return (
    <View style={styles.cardContainer}>
      {/* Image Container with Badges */}
      <Pressable onPress={handleCardPress} style={styles.imageWrapper}>
        <Image
          source={getImageSource(product.images[0])}
          style={styles.productImage}
          resizeMode="cover"
        />

        {/* Badge Ribbon */}
        <View style={[styles.badgeTag, { backgroundColor: product.badgeColor }]}>
          <Text style={styles.badgeText}>{product.badge}</Text>
        </View>

        {/* 1:2 Golden Ratio Mark */}
        <View style={styles.ratioPill}>
          <Text style={styles.ratioPillText}>1:2 Crop</Text>
        </View>
      </Pressable>

      {/* Product Details */}
      <View style={styles.detailsContainer}>
        {/* Rating & Sold */}
        <View style={styles.metaRow}>
          <View style={styles.ratingBox}>
            <Star size={13} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.ratingText}>{product.rating.toFixed(1)}</Text>
            <Text style={styles.reviewsCount}>({product.reviewsCount})</Text>
          </View>
          <Text style={styles.soldText}>{product.soldCount}</Text>
        </View>

        {/* Title */}
        <Pressable onPress={handleCardPress}>
          <Text style={styles.productTitle} numberOfLines={2}>
            {product.name}
          </Text>
        </Pressable>

        {/* Motif description */}
        <Text style={styles.motifText} numberOfLines={1}>
          {product.motif}
        </Text>

        {/* Size tag */}
        <View style={styles.sizeTagRow}>
          <View style={styles.sizePill}>
            <Text style={styles.sizePillText}>LD: {product.lingkarDada}</Text>
          </View>
          <View style={styles.sizePill}>
            <Text style={styles.sizePillText}>P: {product.panjang}</Text>
          </View>
        </View>

        {/* Price Row */}
        <View style={styles.priceRow}>
          <View>
            <Text style={styles.currentPrice}>{formatRupiah(product.price)}</Text>
            <Text style={styles.originalPrice}>{formatRupiah(product.originalPrice)}</Text>
          </View>

          <View style={styles.discountBadge}>
            <Text style={styles.discountBadgeText}>
              -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsRow}>
          <TouchableOpacity
            onPress={() => addToCart(product, 1)}
            style={styles.quickAddButton}
            activeOpacity={0.85}
          >
            <ShoppingBag size={15} color="#FFF" />
            <Text style={styles.quickAddText}>+ Keranjang</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleCardPress}
            style={styles.detailButton}
            activeOpacity={0.8}
          >
            <Eye size={16} color={THEME.colors.textMain} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.lg,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    overflow: 'hidden',
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
  },
  imageWrapper: {
    width: '100%',
    height: 260,
    backgroundColor: '#F5EFE6',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer' as any,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  badgeTag: {
    position: 'absolute',
    top: 12,
    left: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  ratioPill: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    backgroundColor: 'rgba(38, 34, 31, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  ratioPillText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: '700',
  },
  detailsContainer: {
    padding: 16,
    gap: 8,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  reviewsCount: {
    fontSize: 11,
    color: THEME.colors.textLight,
  },
  soldText: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: THEME.colors.textMain,
    lineHeight: 20,
    minHeight: 40,
    cursor: 'pointer' as any,
  },
  motifText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
  },
  sizeTagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 2,
  },
  sizePill: {
    backgroundColor: THEME.colors.creamWarm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sizePillText: {
    fontSize: 10,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  currentPrice: {
    fontSize: 17,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  originalPrice: {
    fontSize: 12,
    color: THEME.colors.textLight,
    textDecorationLine: 'line-through',
  },
  discountBadge: {
    backgroundColor: THEME.colors.terracottaLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 4,
  },
  quickAddButton: {
    flex: 1,
    backgroundColor: THEME.colors.charcoal,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 10,
    borderRadius: THEME.radius.md,
    cursor: 'pointer' as any,
  },
  quickAddText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '700',
  },
  detailButton: {
    width: 38,
    height: 38,
    borderRadius: THEME.radius.md,
    backgroundColor: THEME.colors.creamWarm,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
});
