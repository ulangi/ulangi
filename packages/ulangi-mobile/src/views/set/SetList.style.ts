/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { StyleSheet, TextStyle, ViewStyle } from 'react-native';

import { config } from '../../constants/config';
import { ResponsiveStyleSheet, ScaleByFactor } from '../../utils/responsive';

export interface SetListStyles {
  empty_list_container: ViewStyle;
  empty_text: TextStyle;
  list_container: ViewStyle;
  list: ViewStyle;
}

export class SetListResponsiveStyles extends ResponsiveStyleSheet<
  SetListStyles
> {
  public baseStyles(scaleByFactor: ScaleByFactor): SetListStyles {
    return {
      empty_list_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },

      empty_text: {
        fontSize: scaleByFactor(16),
      },

      list_container: {
        flex: 1,
      },

      list: {
        borderTopWidth: StyleSheet.hairlineWidth,
      },
    };
  }

  public lightStyles(): Partial<SetListStyles> {
    return {
      empty_text: {
        color: config.styles.light.secondaryTextColor,
      },

      list: {
        borderTopColor: config.styles.light.primaryBorderColor,
      },
    };
  }

  public darkStyles(): Partial<SetListStyles> {
    return {
      empty_text: {
        color: config.styles.dark.secondaryTextColor,
      },

      list: {
        borderTopColor: config.styles.dark.primaryBorderColor,
      },
    };
  }
}

export const setListResponsiveStyles = new SetListResponsiveStyles();
