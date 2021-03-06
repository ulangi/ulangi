/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { observable } from 'mobx';

export class ObservableKeyboard {
  @observable
  public state: 'showing' | 'hidden';

  public constructor(state?: 'showing' | 'hidden') {
    this.state = state || 'hidden';
  }
}
