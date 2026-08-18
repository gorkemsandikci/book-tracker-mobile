import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { colors, sizes } from '../theme';
import { Icon } from './Icon';

export function IconButton({
  name,
  onPress,
  size = sizes.iconButton,
  iconSize = 26,
  color = colors.primary,
  accessibilityLabel,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { width: size + 8, height: size + 8 },
        pressed && styles.pressed,
      ]}
    >
      <Icon name={name} size={iconSize} color={color} />
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
