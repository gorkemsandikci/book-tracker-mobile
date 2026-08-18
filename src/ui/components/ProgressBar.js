import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors, radii, sizes } from '../theme';

export function ProgressBar({ progress = 0, color = colors.primary }) {
  const clamped = Math.max(0, Math.min(100, progress));

  return (
    <View style={styles.track}>
      <View
        style={[
          styles.fill,
          {
            width: `${clamped}%`,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: sizes.progressHeight,
    backgroundColor: colors.progressTrack,
    borderRadius: radii.pill,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radii.pill,
  },
});
