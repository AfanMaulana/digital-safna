import React, { createContext, useContext, useState } from 'react';
import { Product, formatRupiah } from '@/data/products';
import { THEME } from '@/constants/theme';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutCustomer {
  nama: string;
  alamat: string;
  noHp: string;
  catatan?: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  buildWhatsAppOrderUrl: (customer: CheckoutCustomer) => string;
  buildDirectProductWhatsAppUrl: (product: Product, quantity?: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((curr) => (curr === msg ? null : curr));
    }, 2800);
  };

  const addToCart = (product: Product, quantity: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`✓ "${product.shortName}" ditambahkan ke keranjang! ✨`);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item berhasil dihapus dari keranjang');
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const buildWhatsAppOrderUrl = (customer: CheckoutCustomer): string => {
    const itemsListText = items
      .map(
        (item) =>
          `- ${item.product.name} x ${item.quantity} (${formatRupiah(
            item.product.price * item.quantity
          )})`
      )
      .join('\n');

    const message = [
      'Halo Admin A.F. Vest! ✨',
      'Aku mau pesan A.F. Vest dong.',
      '',
      'Detail Pesanan:',
      itemsListText || '- (Belum ada produk dipilih)',
      '',
      `Total Belanja: ${formatRupiah(subtotal)}`,
      '',
      'Data Pemesan:',
      `Nama: ${customer.nama || '-'}`,
      `Alamat: ${customer.alamat || '-'}`,
      `No HP: ${customer.noHp || '-'}`,
      customer.catatan ? `Catatan: ${customer.catatan}` : '',
      '',
      'Mohon info total biaya dan nomor rekeningnya ya! Terima kasih 🤍',
    ]
      .filter((line) => line !== undefined)
      .join('\n');

    const baseUrl = THEME.contact.whatsappUrl || `https://wa.me/${THEME.contact.whatsappNumber}`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  };

  const buildDirectProductWhatsAppUrl = (
    product: Product,
    quantity: number = 1
  ): string => {
    const message = [
      'Halo Admin A.F. Vest! ✨',
      `Aku mau pesan langsung produk:`,
      `*${product.name}*`,
      `Jumlah: ${quantity} pcs (${formatRupiah(product.price * quantity)})`,
      `Motif: ${product.motif}`,
      `Ukuran: LD ${product.lingkarDada}`,
      '',
      'Apakah stok masih ready kak? Mohon info total biaya & ongkirnya ya! Terima kasih 🤍',
    ].join('\n');

    const baseUrl = THEME.contact.whatsappUrl || `https://wa.me/${THEME.contact.whatsappNumber}`;
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  };


  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItems,
        subtotal,
        toastMessage,
        showToast,
        buildWhatsAppOrderUrl,
        buildDirectProductWhatsAppUrl,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
