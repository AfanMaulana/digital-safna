import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useCart, CheckoutCustomer } from '@/context/CartContext';
import { formatRupiah, getImageSource } from '@/data/products';
import { THEME } from '@/constants/theme';
import PageContainer from '@/components/PageContainer';

import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Truck,
  Copy,
  ArrowLeft,
} from '@/components/Icons';

export default function CartPage() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    totalItems,
    buildWhatsAppOrderUrl,
  } = useCart();

  const [customer, setCustomer] = useState<CheckoutCustomer>({
    nama: '',
    alamat: '',
    noHp: '',
    catatan: '',
  });

  const [formErrors, setFormErrors] = useState<{
    nama?: boolean;
    alamat?: boolean;
    noHp?: boolean;
  }>({});

  const [copiedSuccess, setCopiedSuccess] = useState(false);

  const validateForm = (): boolean => {
    const errors: { nama?: boolean; alamat?: boolean; noHp?: boolean } = {};
    if (!customer.nama.trim()) errors.nama = true;
    if (!customer.alamat.trim()) errors.alamat = true;
    if (!customer.noHp.trim()) errors.noHp = true;

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCheckoutWhatsApp = () => {
    if (!validateForm()) {
      alert('Mohon lengkapi Nama, Alamat, dan Nomor HP terlebih dahulu ya kak ✨');
      return;
    }

    const waUrl = buildWhatsAppOrderUrl(customer);
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank');
    }
  };

  const handleCopyMessage = () => {
    if (!validateForm()) {
      alert('Mohon lengkapi data form sebelum menyalin pesan.');
      return;
    }
    const waUrl = buildWhatsAppOrderUrl(customer);
    const decodedText = decodeURIComponent(waUrl.split('text=')[1] || '');

    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(decodedText);
      setCopiedSuccess(true);
      setTimeout(() => setCopiedSuccess(false), 2500);
    }
  };

  return (
    <PageContainer style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Banner */}
      <View style={styles.headerBar}>
        <View style={styles.headerInner}>
          <TouchableOpacity
            onPress={() => router.push('/katalog')}
            style={styles.backButton}
          >
            <ArrowLeft size={18} color={THEME.colors.textMain} />
            <Text style={styles.backButtonText}>Lanjut Belanja</Text>
          </TouchableOpacity>

          <View style={styles.headerTitleGroup}>
            <Text style={styles.headerTitle}>Keranjang & Checkout</Text>
            <Text style={styles.headerSubtitle}>
              Pemesanan langsung terhubung otomatis ke WhatsApp Admin A.F. Vest
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.mainContent}>
        {items.length === 0 ? (
          /* Empty Cart State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <ShoppingBag size={42} color={THEME.colors.terracotta} />
            </View>
            <Text style={styles.emptyTitle}>Keranjang Belanja Masih Kosong</Text>
            <Text style={styles.emptySubtitle}>
              Yuk pilih outer vest impianmu dan buat penampilanmu makin jenjang & stand out!
            </Text>
            <TouchableOpacity
              onPress={() => router.push('/katalog')}
              style={styles.browseButton}
              activeOpacity={0.88}
            >
              <Text style={styles.browseButtonText}>Lihat Katalog A.F. Vest</Text>
              <ArrowRight size={18} color="#FFF" />
            </TouchableOpacity>
          </View>
        ) : (
          /* Cart Content: Items & Checkout Form */
          <View style={styles.cartLayout}>
            {/* Left Column: Cart Items List */}
            <View style={styles.itemsColumn}>
              <View style={styles.columnHeader}>
                <Text style={styles.sectionHeading}>
                  Daftar Pesanan ({totalItems} pcs)
                </Text>
                <TouchableOpacity onPress={clearCart}>
                  <Text style={styles.clearCartText}>Kosongkan</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.itemsList}>
                {items.map(({ product, quantity }) => (
                  <View key={product.id} style={styles.cartItemCard}>
                    <Image
                      source={getImageSource(product.images[0])}
                      style={styles.itemImage}
                      resizeMode="cover"
                    />

                    <View style={styles.itemInfo}>
                      <View style={styles.itemTopRow}>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.itemName} numberOfLines={2}>
                            {product.name}
                          </Text>
                          <Text style={styles.itemMotif}>
                            Motif: {product.motif}
                          </Text>
                          <Text style={styles.itemSpecs}>
                            LD: {product.lingkarDada} • P: {product.panjang}
                          </Text>
                        </View>

                        <TouchableOpacity
                          onPress={() => removeFromCart(product.id)}
                          style={styles.deleteBtn}
                        >
                          <Trash2 size={16} color="#EF4444" />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.itemBottomRow}>
                        <View>
                          <Text style={styles.itemPrice}>
                            {formatRupiah(product.price)}
                          </Text>
                          {quantity > 1 && (
                            <Text style={styles.itemSubtotal}>
                              Subtotal: {formatRupiah(product.price * quantity)}
                            </Text>
                          )}
                        </View>

                        {/* Qty controller */}
                        <View style={styles.qtyController}>
                          <TouchableOpacity
                            onPress={() => updateQuantity(product.id, quantity - 1)}
                            style={styles.qtyStepBtn}
                          >
                            <Minus size={13} color={THEME.colors.textMain} />
                          </TouchableOpacity>
                          <Text style={styles.qtyValue}>{quantity}</Text>
                          <TouchableOpacity
                            onPress={() => updateQuantity(product.id, quantity + 1)}
                            style={styles.qtyStepBtn}
                          >
                            <Plus size={13} color={THEME.colors.textMain} />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                ))}
              </View>

              {/* Guarantees Box */}
              <View style={styles.guaranteeBox}>
                <View style={styles.guaranteeItem}>
                  <Truck size={18} color={THEME.colors.sage} />
                  <Text style={styles.guaranteeText}>
                    Pengiriman H+1 setelah invoice diterbitkan Admin
                  </Text>
                </View>
                <View style={styles.guaranteeItem}>
                  <ShieldCheck size={18} color={THEME.colors.terracotta} />
                  <Text style={styles.guaranteeText}>
                    Garansi retur barang cacat / salah kirim 1x24 jam
                  </Text>
                </View>
              </View>
            </View>

            {/* Right Column: Customer Form & WhatsApp Checkout */}
            <View style={styles.checkoutColumn}>
              <View style={styles.checkoutCard}>
                <View style={styles.checkoutCardHeader}>
                  <Text style={styles.checkoutHeading}>Data Pemesan</Text>
                  <Text style={styles.checkoutSub}>
                    Diperlukan untuk pembuatan invoice otomatis ke WhatsApp
                  </Text>
                </View>

                {/* Form Inputs */}
                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>
                    Nama Lengkap <Text style={styles.requiredMark}>*</Text>
                  </Text>
                  <TextInput
                    value={customer.nama}
                    onChangeText={(val) => {
                      setCustomer({ ...customer, nama: val });
                      if (formErrors.nama) setFormErrors({ ...formErrors, nama: false });
                    }}
                    placeholder="Contoh: Safna Aulia"
                    placeholderTextColor={THEME.colors.textLight}
                    style={[styles.textInput, formErrors.nama && styles.inputError]}
                  />
                  {formErrors.nama && (
                    <Text style={styles.errorText}>Nama wajib diisi</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>
                    Nomor WhatsApp / HP <Text style={styles.requiredMark}>*</Text>
                  </Text>
                  <TextInput
                    value={customer.noHp}
                    onChangeText={(val) => {
                      setCustomer({ ...customer, noHp: val });
                      if (formErrors.noHp) setFormErrors({ ...formErrors, noHp: false });
                    }}
                    placeholder="Contoh: 081234567890"
                    placeholderTextColor={THEME.colors.textLight}
                    keyboardType="phone-pad"
                    style={[styles.textInput, formErrors.noHp && styles.inputError]}
                  />
                  {formErrors.noHp && (
                    <Text style={styles.errorText}>Nomor WhatsApp wajib diisi</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>
                    Alamat Lengkap Pengiriman <Text style={styles.requiredMark}>*</Text>
                  </Text>
                  <TextInput
                    value={customer.alamat}
                    onChangeText={(val) => {
                      setCustomer({ ...customer, alamat: val });
                      if (formErrors.alamat) setFormErrors({ ...formErrors, alamat: false });
                    }}
                    placeholder="Jalan, No Rumah, Kelurahan, Kecamatan, Kota / Kab, Kode Pos"
                    placeholderTextColor={THEME.colors.textLight}
                    multiline
                    numberOfLines={3}
                    style={[styles.textAreaInput, formErrors.alamat && styles.inputError]}
                  />
                  {formErrors.alamat && (
                    <Text style={styles.errorText}>Alamat pengiriman wajib diisi</Text>
                  )}
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.inputLabel}>Catatan Khusus (Opsional)</Text>
                  <TextInput
                    value={customer.catatan}
                    onChangeText={(val) => setCustomer({ ...customer, catatan: val })}
                    placeholder="Misal: Titip di pos satpam / minta kirim pagi"
                    placeholderTextColor={THEME.colors.textLight}
                    style={styles.textInput}
                  />
                </View>

                {/* Price Breakdown */}
                <View style={styles.summaryBox}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal Produk ({totalItems} pcs)</Text>
                    <Text style={styles.summaryVal}>{formatRupiah(subtotal)}</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Biaya Layanan Web</Text>
                    <Text style={[styles.summaryVal, { color: THEME.colors.sage }]}>GRATIS</Text>
                  </View>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Estimasi Ongkir</Text>
                    <Text style={styles.summaryVal}>Dihitung oleh Admin WA</Text>
                  </View>
                  <View style={styles.summaryDivider} />
                  <View style={styles.summaryTotalRow}>
                    <Text style={styles.totalLabel}>Total Produk</Text>
                    <Text style={styles.totalVal}>{formatRupiah(subtotal)}</Text>
                  </View>
                </View>

                {/* Submit to WhatsApp Button */}
                <TouchableOpacity
                  onPress={handleCheckoutWhatsApp}
                  style={styles.checkoutWaButton}
                  activeOpacity={0.88}
                >
                  <MessageCircle size={20} color="#FFF" />
                  <Text style={styles.checkoutWaButtonText}>
                    Kirim Pesanan via WhatsApp
                  </Text>
                </TouchableOpacity>

                {/* Copy Text Option */}
                <TouchableOpacity
                  onPress={handleCopyMessage}
                  style={styles.copyButton}
                  activeOpacity={0.8}
                >
                  <Copy size={15} color={THEME.colors.textMuted} />
                  <Text style={styles.copyButtonText}>
                    {copiedSuccess ? '✓ Format Pesanan Disalin!' : 'Salin Format Teks Pesanan'}
                  </Text>
                </TouchableOpacity>

                <Text style={styles.waNoteText}>
                  Setelah klik, kamu akan dialihkan langsung ke chat resmi WhatsApp Admin 
                  A.F. Vest (+62 859-5640-3941) dengan pesan yang sudah terisi otomatis!
                </Text>
              </View>
            </View>
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
  headerBar: {
    backgroundColor: '#F7F2EB',
    paddingVertical: 28,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
  },
  headerInner: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    gap: 12,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer' as any,
  },
  backButtonText: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  headerTitleGroup: {
    gap: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  headerSubtitle: {
    fontSize: 14,
    color: THEME.colors.textMuted,
  },
  mainContent: {
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 36,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 64,
    paddingHorizontal: 20,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: THEME.colors.terracottaLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: THEME.colors.textMain,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: THEME.colors.textMuted,
    textAlign: 'center',
    maxWidth: 420,
    lineHeight: 22,
    marginBottom: 28,
  },
  browseButton: {
    backgroundColor: THEME.colors.terracotta,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.terracotta,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    cursor: 'pointer' as any,
  },
  browseButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  cartLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 36,
    justifyContent: 'space-between',
  },
  itemsColumn: {
    flex: 1.3,
    minWidth: 320,
    gap: 16,
  },
  columnHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  clearCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#EF4444',
    cursor: 'pointer' as any,
  },
  itemsList: {
    gap: 14,
  },
  cartItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.lg,
    padding: 14,
    flexDirection: 'row',
    gap: 16,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },
  itemImage: {
    width: 86,
    height: 100,
    borderRadius: THEME.radius.md,
    backgroundColor: '#F5EFE6',
  },
  itemInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 14,
    fontWeight: '700',
    color: THEME.colors.textMain,
    lineHeight: 18,
  },
  itemMotif: {
    fontSize: 11,
    color: THEME.colors.textMuted,
    marginTop: 2,
  },
  itemSpecs: {
    fontSize: 11,
    color: THEME.colors.textLight,
    marginTop: 2,
  },
  deleteBtn: {
    padding: 4,
    cursor: 'pointer' as any,
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  itemSubtotal: {
    fontSize: 11,
    color: THEME.colors.textLight,
  },
  qtyController: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME.colors.creamWarm,
    borderRadius: THEME.radius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyStepBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer' as any,
  },
  qtyValue: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
    paddingHorizontal: 10,
  },
  guaranteeBox: {
    backgroundColor: THEME.colors.creamWarm,
    padding: 16,
    borderRadius: THEME.radius.md,
    gap: 10,
    marginTop: 8,
  },
  guaranteeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  guaranteeText: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    fontWeight: '600',
  },
  checkoutColumn: {
    flex: 1,
    minWidth: 320,
  },
  checkoutCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: THEME.radius.xl,
    padding: 24,
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    shadowColor: THEME.colors.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    gap: 16,
  },
  checkoutCardHeader: {
    gap: 4,
    borderBottomWidth: 1,
    borderBottomColor: THEME.colors.creamBorder,
    paddingBottom: 14,
  },
  checkoutHeading: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  checkoutSub: {
    fontSize: 12,
    color: THEME.colors.textMuted,
    lineHeight: 16,
  },
  formGroup: {
    gap: 6,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  requiredMark: {
    color: '#EF4444',
  },
  textInput: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: THEME.colors.textMain,
    outlineWidth: 0 as any,
  },
  textAreaInput: {
    backgroundColor: '#FDFBF7',
    borderWidth: 1,
    borderColor: THEME.colors.creamBorder,
    borderRadius: THEME.radius.md,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 13,
    color: THEME.colors.textMain,
    textAlignVertical: 'top',
    minHeight: 70,
    outlineWidth: 0 as any,
  },
  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FEF2F2',
  },
  errorText: {
    fontSize: 11,
    color: '#EF4444',
    fontWeight: '600',
  },
  summaryBox: {
    backgroundColor: THEME.colors.creamWarm,
    borderRadius: THEME.radius.md,
    padding: 16,
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: 13,
    color: THEME.colors.textMuted,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '700',
    color: THEME.colors.textMain,
  },
  summaryDivider: {
    height: 1,
    backgroundColor: THEME.colors.creamBorder,
    marginVertical: 4,
  },
  summaryTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: THEME.colors.textMain,
  },
  totalVal: {
    fontSize: 20,
    fontWeight: '800',
    color: THEME.colors.terracotta,
  },
  checkoutWaButton: {
    backgroundColor: THEME.colors.waGreen,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: 14,
    borderRadius: THEME.radius.full,
    shadowColor: THEME.colors.waGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    cursor: 'pointer' as any,
  },
  checkoutWaButtonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '800',
  },
  copyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 10,
    cursor: 'pointer' as any,
  },
  copyButtonText: {
    fontSize: 12,
    fontWeight: '700',
    color: THEME.colors.textMuted,
  },
  waNoteText: {
    fontSize: 11,
    color: THEME.colors.textLight,
    textAlign: 'center',
    lineHeight: 16,
  },
});
