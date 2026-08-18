import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { Icon } from './Icon';

export function StarRating({
  value = 0,
  onChange,
  size = 20,
  editable = true,
}) {
  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= value;
        return (
          <Pressable
            key={star}
            disabled={!editable}
            hitSlop={4}
            onPress={() => {
              if (!onChange) return;
              onChange(star === value ? 0 : star);
            }}
            accessibilityRole="button"
            accessibilityLabel={`${star} star${star === 1 ? '' : 's'}`}
          >
            <Icon
              name={filled ? 'star' : 'star-outline'}
              size={size}
              color={filled ? colors.primary : colors.textTertiary}
              style={styles.star}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: spacing.xxs,
  },
});
