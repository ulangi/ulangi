/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ScreenName } from '@ulangi/ulangi-common/enums';
import { AutoArchiveSettings } from '@ulangi/ulangi-common/interfaces';

import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableAutoArchiveSettings } from './ObservableAutoArchiveSettings';

export class ObservableAutoArchiveScreen extends ObservableScreen {
  public readonly autoArchiveSettings: ObservableAutoArchiveSettings;

  public constructor(
    autoArchiveSettings: AutoArchiveSettings,
    componentId: string,
    screenName: ScreenName,
    topBar: ObservableTitleTopBar
  ) {
    super(componentId, screenName, topBar);
    this.autoArchiveSettings = new ObservableAutoArchiveSettings(
      autoArchiveSettings.autoArchiveEnabled,
      autoArchiveSettings.spacedRepetitionLevelThreshold,
      autoArchiveSettings.writingLevelThreshold
    );
  }
}
