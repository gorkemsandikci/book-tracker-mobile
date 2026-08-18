import { Platform } from 'react-native';
import { colors } from './colors';

export const fonts = {
  serif: Platform.select({
    ios: 'Georgia',
    android: 'serif',
    default: 'Georgia',
  }),
  sans: Platform.select({
    ios: 'System',
    android: 'sans-serif',
    default: 'System',
  }),
};

export const typography = {
  screenTitle: {
    fontFamily: fonts.serif,
    fontSize: 34,
    fontWeight: '700',
    color: colors.textPrimary,
    letterSpacing: 0.2,
  },
  bookTitle: {
    fontFamily: fonts.sans,
    fontSize: 17,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  body: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  author: {
    fontFamily: fonts.sans,
    fontSize: 15,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  caption: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  tabLabel: {
    fontFamily: fonts.sans,
    fontSize: 10,
    fontWeight: '500',
  },
  search: {
    fontFamily: fonts.sans,
    fontSize: 17,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  segment: {
    fontFamily: fonts.sans,
    fontSize: 13,
    fontWeight: '600',
  },
};
