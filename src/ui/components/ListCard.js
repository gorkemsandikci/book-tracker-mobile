import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors, radii, spacing } from '../theme';
import { AppText } from './AppText';
import { Icon } from './Icon';

export function ListCard({ name, description, count = 0, icon, onPress, onDelete }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.card, pressed && styles.pressed]}
    >
      {icon ? (
        <Icon name={icon} size={22} color={colors.primary} style={styles.leadIcon} />
      ) : null}
      <View style={styles.body}>
        <AppText variant="bookTitle">{name}</AppText>
        {description ? (
          <AppText variant="author" numberOfLines={2} style={styles.description}>
            {description}
          </AppText>
        ) : null}
        <AppText variant="caption">
          {count} book{count === 1 ? '' : 's'}
        </AppText>
      </View>
      <View style={styles.actions}>
        {onDelete ? (
          <Pressable onPress={onDelete} hitSlop={8} style={styles.delete}>
            <Icon name="trash-outline" size={18} color={colors.textSecondary} />
          </Pressable>
        ) : null}
        <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radii.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  body: {
    flex: 1,
    marginRight: spacing.sm,
  },
  leadIcon: {
    marginRight: spacing.sm,
  },
  description: {
    marginTop: 4,
    marginBottom: 6,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  delete: {
    marginRight: spacing.sm,
  },
});
