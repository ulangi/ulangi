/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { StyleSheet, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import { ResponsiveStyleSheet } from '../../utils/responsive';

export interface WritingLessonScreenStyles {
  screen: ViewStyle;
  dismiss_keyboard_view: ViewStyle;
}

export class WritingLessonScreenResponsiveStyles extends ResponsiveStyleSheet<
  WritingLessonScreenStyles
> {
  public baseStyles(): WritingLessonScreenStyles {
    return {
      screen: {
        flex: 1,
        borderTopWidth: StyleSheet.hairlineWidth,
      },

      dismiss_keyboard_view: {
        flex: 1,
      },
    };
  }

  public lightStyles(): Partial<WritingLessonScreenStyles> {
    return {
      screen: {
        borderTopColor: config.styles.light.primaryBorderColor,
      },
    };
  }

  public darkStyles(): Partial<WritingLessonScreenStyles> {
    return {
      screen: {
        borderTopColor: config.styles.dark.primaryBorderColor,
      },
    };
  }
}

export const writingLessonScreenResponsiveStyles = new WritingLessonScreenResponsiveStyles();
