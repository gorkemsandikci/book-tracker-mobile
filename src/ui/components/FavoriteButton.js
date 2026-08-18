import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors } from '../theme';
import { Icon } from './Icon';

export function FavoriteButton({ active = false, onPress, size = 22 }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={active ? 'Remove from favorites' : 'Add to favorites'}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Icon
        name={active ? 'heart' : 'heart-outline'}
        size={size}
        color={active ? colors.primary : colors.textSecondary}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.5,
  },
});
