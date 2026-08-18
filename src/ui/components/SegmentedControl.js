import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { colors, radii, shadows, sizes } from '../theme';
import { AppText } from './AppText';

export function SegmentedControl({ options, value, onChange }) {
  return (
    <View style={styles.track}>
      {options.map((option, index) => {
        const selected = option.key === value;
        return (
          <Pressable
            key={option.key}
            onPress={() => onChange(option.key)}
            style={[
              styles.segment,
              index > 0 && styles.divider,
              selected && [styles.selected, shadows.segment],
            ]}
          >
            <AppText
              variant="segment"
              color={selected ? colors.textPrimary : colors.textSecondary}
              numberOfLines={1}
            >
              {option.label}
            </AppText>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    flexDirection: 'row',
    backgroundColor: colors.control,
    borderRadius: radii.md,
    padding: 2,
    height: sizes.segmentHeight + 4,
  },
  segment: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.sm,
  },
  divider: {
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: 'transparent',
  },
  selected: {
    backgroundColor: colors.surface,
  },
});
