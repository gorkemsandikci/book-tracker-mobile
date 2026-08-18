import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

export function CheckRow({ label, checked, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <AppText variant="body" style={styles.label}>
        {label}
      </AppText>
      <Icon
        name={checked ? 'checkmark-circle' : 'ellipse-outline'}
        size={22}
        color={checked ? colors.primary : colors.textTertiary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.separator,
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    flex: 1,
    marginRight: spacing.sm,
  },
});
