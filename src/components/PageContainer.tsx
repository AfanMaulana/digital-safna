import React from 'react';
import { View, ScrollView, Platform, StyleSheet, StyleProp, ViewStyle } from 'react-native';

interface PageContainerProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  showsVerticalScrollIndicator?: boolean;
}

export default function PageContainer({
  children,
  style,
  showsVerticalScrollIndicator = false,
}: PageContainerProps) {
  if (Platform.OS === 'web') {
    return <View style={[styles.webRoot, style]}>{children}</View>;
  }
  return (
    <ScrollView
      style={[styles.nativeRoot, style]}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  webRoot: {
    width: '100%',
    flexGrow: 1,
  },
  nativeRoot: {
    flex: 1,
  },
});
