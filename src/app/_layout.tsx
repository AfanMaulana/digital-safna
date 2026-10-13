import { View, StyleSheet } from 'react-native';
import { Slot } from 'expo-router';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { THEME } from '@/constants/theme';
import '../global.css';

export default function RootLayout() {
  return (
    <CartProvider>
      <View style={styles.root}>
        <Navbar />
        <View style={styles.content}>
          <Slot />
        </View>
        <Footer />
      </View>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    minHeight: '100%',
    width: '100%',
    backgroundColor: THEME.colors.cream,
    flexDirection: 'column',
  },
  content: {
    flexGrow: 1,
    flexShrink: 0,
    width: '100%',
  },
});

