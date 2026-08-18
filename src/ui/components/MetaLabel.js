import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { Icon } from './Icon';
import { AppText } from './AppText';

export function MetaLabel({ icon, label }) {
  if (!label) return null;

  return (
    <View style={styles.row}>
      {icon ? (
        <Icon name={icon} size={13} color={colors.textSecondary} style={styles.icon} />
      ) : null}
      <AppText variant="caption" numberOfLines={1}>
        {label}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  icon: {
    marginRight: 4,
  },
});
