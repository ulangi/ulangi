/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ScreenName } from '@ulangi/ulangi-common/enums';
import { IObservableValue, observable } from 'mobx';

import { ObservableScreen } from '../screen/ObservableScreen';
import { ObservableTitleTopBar } from '../top-bar/ObservableTitleTopBar';
import { ObservableWritingFormState } from '../writing/ObservableWritingFormState';
import { ObservableWritingResult } from '../writing/ObservableWritingResult';

export class ObservableQuizWritingScreen extends ObservableScreen {
  @observable
  public screenAppearedTimes: number;

  public readonly writingFormState: ObservableWritingFormState;

  public readonly writingResult: ObservableWritingResult;

  public readonly shouldHighlightOnError: IObservableValue<boolean>;

  public readonly shouldShowResult: IObservableValue<boolean>;

  public constructor(
    screenAppearedTimes: number,
    writingFormState: ObservableWritingFormState,
    writingResult: ObservableWritingResult,
    shouldHighlightOnError: IObservableValue<boolean>,
    shouldShowResult: IObservableValue<boolean>,
    componentId: string,
    screenName: ScreenName,
    topBar: ObservableTitleTopBar
  ) {
    super(componentId, screenName, topBar);
    this.screenAppearedTimes = screenAppearedTimes;
    this.writingFormState = writingFormState;
    this.writingResult = writingResult;
    this.shouldHighlightOnError = shouldHighlightOnError;
    this.shouldShowResult = shouldShowResult;
  }
}
