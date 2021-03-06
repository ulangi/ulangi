/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { assertExists } from '@ulangi/assert';
import { Mutable } from '@ulangi/extended-types';
import { ActionType, createAction } from '@ulangi/ulangi-action';
import { ErrorBag, Set } from '@ulangi/ulangi-common/interfaces';
import { EventBus, group, on, once } from '@ulangi/ulangi-event';
import { ObservableSetFormState } from '@ulangi/ulangi-observable';

export class EditSetDelegate {
  private eventBus: EventBus;
  private setFormState: ObservableSetFormState;

  public constructor(eventBus: EventBus, setFormState: ObservableSetFormState) {
    this.eventBus = eventBus;
    this.setFormState = setFormState;
  }

  public saveEdit(
    originalSet: Set,
    callback: {
      onSaving: () => void;
      onSaveSucceeded: (set: Set) => void;
      onSaveFailed: (errorBag: ErrorBag) => void;
    },
  ): void {
    const learningLanguageCode = assertExists(
      this.setFormState.learningLanguageCode,
      'Cannot save edit because learningLanguageCode is null',
    );
    const translatedToLanguageCode = assertExists(
      this.setFormState.translatedToLanguageCode,
      'Cannot save edit because translatedToLanguageCode is null',
    );

    const setName =
      this.setFormState.setName === ''
        ? this.setFormState.autoGeneratedSetName
        : this.setFormState.setName;

    const editedSet = {
      setName,
      learningLanguageCode: learningLanguageCode,
      translatedToLanguageCode: translatedToLanguageCode,
    };

    // Get only changes
    let setDiff = this.getSetDiff(originalSet, editedSet);

    // Only submit the difference
    this.eventBus.pubsub(
      createAction(ActionType.SET__EDIT, {
        set: {
          setId: this.setFormState.setId,
          ...setDiff,
        },
      }),
      group(
        on(ActionType.SET__EDITING, callback.onSaving),
        once(
          ActionType.SET__EDIT_SUCCEEDED,
          ({ set }): void => callback.onSaveSucceeded(set),
        ),
        once(
          ActionType.SET__EDIT_FAILED,
          (errorBag): void => callback.onSaveFailed(errorBag),
        ),
      ),
    );
  }

  private getSetDiff(originalSet: Set, editedSet: Partial<Set>): Partial<Set> {
    const diff: Mutable<Partial<Set>> = {};

    for (let key in editedSet) {
      if (editedSet.hasOwnProperty(key)) {
        if (
          key === 'setName' ||
          key === 'learningLanguageCode' ||
          key === 'translatedToLanguageCode'
        ) {
          const editedValue = editedSet[key];
          if (editedValue !== originalSet[key]) {
            diff[key] = editedValue;
          }
        }
      }
    }

    return diff;
  }
}
