import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { colors, radii, sizes, spacing, typography } from '../theme';
import { Icon } from './Icon';

export function SearchBar({
  value,
  onChangeText,
  placeholder = 'Search',
}) {
  return (
    <View style={styles.container}>
      <Icon name="search" size={18} color={colors.textSecondary} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.control,
    borderRadius: radii.xl,
    height: sizes.searchHeight,
    paddingHorizontal: spacing.sm,
  },
  icon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    ...typography.search,
    paddingVertical: 0,
  },
});
