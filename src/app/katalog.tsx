import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { THEME } from '@/constants/theme';
import ProductCard from '@/components/ProductCard';
import { Search, X, Sparkles } from '@/components/Icons';
import PageContainer from '@/components/PageContainer';


type SortOption = 'popular' | 'price-low' | 'price-high' | 'rating';

export default function KatalogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.motif.toLowerCase().includes(q) ||
          p.material.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // popular
      result.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }

    return result;
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBanner}>
        <View style={styles.headerInner}>
          <View style={styles.pillBadge}>
            <Sparkles size={12} color={THEME.colors.terracotta} />
            <Text style={styles.pillBadgeText}>KOLEKSI RESMI A.F. VEST</Text>
          </View>
          <Text style={styles.title}>Katalog Outer Crop Eksklusif</Text>
          <Text style={styles.subtitle}>
            Pilihan outer crop rasio 1:2 dengan motif 3D bertekstur, vintage botanical tapestry, dan sunflower cerah untuk Gen Z.
          </Text>

          {/* Search Bar */}
          <View style={styles.searchBarWrapper}>
            <Search size={18} color={THEME.colors.textMuted} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Cari nama vest, motif 3D, tapestry, atau sunflower..."
              placeholderTextColor={THEME.colors.textLight}
              style={styles.searchInput}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity
                onPress={() => setSearchQuery('')}
                style={styles.clearSearchButton}
              >
                <X size={16} color={THEME.colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>

      {/* Filter and Control Bar */}
      <View style={styles.filterSection}>
        <View style={styles.filterInner}>
          {/* Category Chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryChipsContainer}
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setSelectedCategory(cat)}
                  style={[
                    styles.categoryChip,
                    isActive && styles.categoryChipActive,
                  ]}
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.categoryChipText,
                      isActive && styles.categoryChipTextActive,
                    ]}
                  >
                    {cat}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Sort Buttons */}
          <View style={styles.sortRow}>
            <Text style={styles.sortLabel}>Urutkan:</Text>
            <TouchableOpacity
              onPress={() => setSortBy('popular')}
              style={[styles.sortButton, sortBy === 'popular' && styles.sortButtonActive]}
            >
              <Text style={[styles.sortButtonText, sortBy === 'popular' && styles.sortButtonTextActive]}>
                Terpopuler
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy('price-low')}
              style={[styles.sortButton, sortBy === 'price-low' && styles.sortButtonActive]}
            >
              <Text style={[styles.sortButtonText, sortBy === 'price-low' && styles.sortButtonTextActive]}>
                Termurah
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setSortBy('price-high')}
              style={[styles.sortButton, sortBy === 'price-high' && styles.sortButtonActive]}
            >
              <Text style={[styles.sortButtonText, sortBy === 'price-high' && styles.sortButtonTextActive]}>
                Termahal
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Products Grid Content */}
      <View style={styles.contentSection}>
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsCount}>
            Menampilkan <Text style={styles.boldText}>{filteredProducts.length}</Text> Produk Vest
          </Text>
          {(searchQuery || selectedCategory !== 'All') && (
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={styles.resetFilterButton}
            >
              <Text style={styles.resetFilterText}>Reset Filter</Text>
            </TouchableOpacity>
          )}
        </View>

        {filteredProducts.length > 0 ? (
          <View style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCol}>
                <ProductCard product={product} />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconCircle}>
              <Search size={32} color={THEME.colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Produk Tidak Ditemukan</Text>
            <Text style={styles.emptySubtitle}>
              Tidak ada produk yang cocok dengan pencarian &quot;{searchQuery}&quot;. Coba kata kunci lain atau reset filter.
            </Text>
            <TouchableOpacity
              onPress={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              style={styles.emptyResetBtn}
            >
              <Text style={styles.emptyResetBtnText}>Tampilkan Semua Produk</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </PageContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.cream,
  },
  headerBanner: {
    backgroundColor: '#F7F2EB',
    paddingVertical: 48,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
  },
  headerInner: {
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center' as any,
  },
  pillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: THEME.colors.terracottaLight,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: THEME.radius.full,
    marginBottom: 12,
  },
  pillBadgeText: {
    color: THEME.colors.terracotta,
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: THEME.colors.textMain,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 28,
    maxWidth: 580,
  },
  searchBarWrapper: {
    width: '100%',
    maxWidth: 560,
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: THEME.colors.creamBorder,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: THEME.colors.textMain,
    outlineWidth: 0 as any,
  },
  clearSearchButton: {
    padding: 4,
    cursor: 'pointer' as any,
  },
  filterSection: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  filterInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
  },
  categoryChipsContainer: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: THEME.radius.full,
    backgroundColor: THEME.colors.creamWarm,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    cursor: 'pointer' as any,
  },
  categoryChipActive: {
    backgroundColor: THEME.colors.terracotta,
    borderColor: THEME.colors.terracotta,
  },
  categoryChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  categoryChipTextActive: {
    color: '#FFF',
    fontWeight: '700',
  },
  sortRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMuted,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: THEME.colors.creamWarm,
    cursor: 'pointer' as any,
  },
  sortButtonActive: {
    backgroundColor: THEME.colors.charcoal,
  },
  sortButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: THEME.colors.textMain,
  },
  sortButtonTextActive: {
    color: '#FFF',
  },
  contentSection: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  resultsCount: {
    fontSize: 14,
    color: THEME.colors.textMuted,
  },
  boldText: {
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  resetFilterButton: {
    cursor: 'pointer' as any,
  },
  resetFilterText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.terracotta,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'flex-start',
  },
  productCol: {
    flex: 1,
    minWidth: 260,
    maxWidth: 280,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: THEME.colors.creamWarm,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.textMain,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    maxWidth: 400,
    lineHeight: 20,
    marginBottom: 20,
  },
  emptyResetBtn: {
    backgroundColor: THEME.colors.terracotta,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: THEME.radius.full,
    cursor: 'pointer' as any,
  },
  emptyResetBtnText: {
    color: '#FFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
