/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ScreenName } from '@ulangi/ulangi-common/enums';
import * as _ from 'lodash';

import { SynchronizerScreenIds } from '../../constants/ids/SynchronizerScreenIds';
import { SecondaryScreenStyle } from '../../styles/SecondaryScreenStyle';
import { useCustomTopBar } from '../../utils/useCustomTopBar';

export class SynchronizerScreenStyle {
  public static SCREEN_BASE_STYLES_ONLY = _.merge(
    {},
    SecondaryScreenStyle.SCREEN_BASE_STYLES_ONLY,
    {
      topBar: useCustomTopBar({
        testID: SynchronizerScreenIds.TOP_BAR,
        screenName: ScreenName.SYNCHRONIZER_SCREEN,
        styles: {
          light: SecondaryScreenStyle.TOP_BAR_LIGHT_STYLES,
          dark: SecondaryScreenStyle.TOP_BAR_DARK_STYLES,
        },
      }),
    },
  );

  public static SCREEN_LIGHT_STYLES_ONLY = _.merge(
    {},
    SecondaryScreenStyle.SCREEN_LIGHT_STYLES_ONLY,
    {},
  );

  public static SCREEN_DARK_STYLES_ONLY = _.merge(
    {},
    SecondaryScreenStyle.SCREEN_DARK_STYLES_ONLY,
    {},
  );

  public static SCREEN_FULL_LIGHT_STYLES = _.merge(
    {},
    SynchronizerScreenStyle.SCREEN_BASE_STYLES_ONLY,
    SynchronizerScreenStyle.SCREEN_LIGHT_STYLES_ONLY,
  );

  public static SCREEN_FULL_DARK_STYLES = _.merge(
    {},
    SynchronizerScreenStyle.SCREEN_BASE_STYLES_ONLY,
    SynchronizerScreenStyle.SCREEN_DARK_STYLES_ONLY,
  );
}
