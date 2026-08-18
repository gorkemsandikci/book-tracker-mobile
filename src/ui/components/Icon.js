import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme';

export function Icon({
  name,
  size = 22,
  color = colors.primary,
  style,
}) {
  return <Ionicons name={name} size={size} color={color} style={style} />;
}
