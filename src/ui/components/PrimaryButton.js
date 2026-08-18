import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme';
import { AppText } from './AppText';

export function PrimaryButton({ title, onPress, color = colors.primary }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: color },
        pressed && styles.pressed,
      ]}
    >
      <AppText variant="segment" color={colors.surface} align="center">
        {title}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radii.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
  },
  pressed: {
    opacity: 0.75,
  },
});
