import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { colors, spacing } from '../theme';
import { AppText } from './AppText';
import { BookCover } from './BookCover';
import { MetaLabel } from './MetaLabel';
import { ProgressBar } from './ProgressBar';
import { Icon } from './Icon';
import { StarRating } from './StarRating';
import { FavoriteButton } from './FavoriteButton';

export const READING_STATUS = {
  toRead: {
    key: 'toRead',
    label: 'To Read',
    icon: 'book-outline',
  },
  reading: {
    key: 'reading',
    label: 'Reading',
    icon: 'book-outline',
  },
  finished: {
    key: 'finished',
    label: 'Finished',
    icon: 'checkmark-circle',
  },
};

export function BookListItem({
  title,
  author,
  genre,
  status = 'toRead',
  progress = 0,
  rating = 0,
  isFavorite = false,
  coverUri,
  coverColor,
  onPress,
  onToggleFavorite,
}) {
  const statusMeta = READING_STATUS[status] || READING_STATUS.toRead;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <BookCover uri={coverUri} color={coverColor} title={title} />
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.titleBlock}>
            <AppText variant="bookTitle" numberOfLines={1}>
              {title}
            </AppText>
            <AppText variant="author" numberOfLines={1}>
              {author}
            </AppText>
          </View>
          <FavoriteButton
            active={isFavorite}
            onPress={onToggleFavorite}
            size={20}
          />
          <Icon name="chevron-forward" size={18} color={colors.textTertiary} />
        </View>
        <View style={styles.metaRow}>
          <MetaLabel icon="pricetag-outline" label={genre} />
          <MetaLabel icon={statusMeta.icon} label={statusMeta.label} />
          <AppText variant="caption" style={styles.percent}>
            {`${Math.round(progress)}%`}
          </AppText>
        </View>
        <View style={styles.ratingRow}>
          <StarRating value={rating} editable={false} size={14} />
        </View>
        <ProgressBar progress={progress} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
  },
  pressed: {
    opacity: 0.7,
  },
  content: {
    flex: 1,
    marginLeft: spacing.sm,
    paddingTop: 2,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    marginRight: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 4,
  },
  ratingRow: {
    marginBottom: 8,
  },
  percent: {
    marginLeft: 'auto',
  },
});
