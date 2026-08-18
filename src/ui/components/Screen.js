import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../theme';

export function Screen({ children, padded = true, edges = ['top'] }) {
  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={[styles.body, padded && styles.padded]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    ...Platform.select({
      web: {
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
      },
    }),
  },
  body: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    minHeight: 0,
    overflow: 'hidden',
    ...Platform.select({
      web: {
        height: '100%',
        maxHeight: '100%',
      },
    }),
  },
  padded: {
    paddingHorizontal: spacing.md,
  },
});
