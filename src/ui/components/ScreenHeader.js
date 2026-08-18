import React from 'react';
import { View, StyleSheet } from 'react-native';
import { spacing } from '../theme';
import { AppText } from './AppText';
import { IconButton } from './IconButton';

export function ScreenHeader({ title, actions = [], onBack }) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <IconButton
          name="chevron-back"
          onPress={onBack}
          accessibilityLabel="Go back"
        />
      ) : null}
      <AppText variant="screenTitle" style={styles.title} numberOfLines={1}>
        {title}
      </AppText>
      <View style={styles.actionRow}>
        {actions.map(action => (
          <IconButton
            key={action.name + (action.accessibilityLabel || '')}
            name={action.name}
            onPress={action.onPress}
            accessibilityLabel={action.accessibilityLabel}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  title: {
    flex: 1,
    marginRight: spacing.sm,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
