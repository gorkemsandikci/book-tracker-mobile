import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { colors, radii, shadows, sizes } from '../theme';
import { AppText } from './AppText';

export function BookCover({ uri, color = '#5B4636', title = '' }) {
  if (uri) {
    return (
      <Image
        source={{ uri }}
        style={[styles.cover, shadows.cover]}
        resizeMode="cover"
      />
    );
  }

  return (
    <View style={[styles.cover, shadows.cover, { backgroundColor: color }]}>
      <AppText variant="caption" color={colors.surface} align="center" numberOfLines={3} style={styles.fallback}>
        {title}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  cover: {
    width: sizes.coverWidth,
    height: sizes.coverHeight,
    borderRadius: radii.sm,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
  },
  fallback: {
    fontSize: 9,
    lineHeight: 12,
  },
});
