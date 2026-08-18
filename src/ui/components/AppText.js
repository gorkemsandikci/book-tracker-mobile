import React from 'react';
import { Text as RNText, StyleSheet } from 'react-native';
import { typography } from '../theme';

const VARIANT_MAP = {
  screenTitle: typography.screenTitle,
  bookTitle: typography.bookTitle,
  body: typography.body,
  author: typography.author,
  caption: typography.caption,
  tabLabel: typography.tabLabel,
  search: typography.search,
  segment: typography.segment,
};

export function AppText({
  variant = 'body',
  color,
  align,
  style,
  children,
  numberOfLines,
}) {
  return (
    <RNText
      numberOfLines={numberOfLines}
      style={[
        styles.base,
        VARIANT_MAP[variant] || typography.body,
        color ? { color } : null,
        align ? { textAlign: align } : null,
        style,
      ]}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});
