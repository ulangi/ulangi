/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { SignOutScreenDelegate } from '../../delegates/auth/SignOutScreenDelegate';
import { ScreenFactory } from '../ScreenFactory';

export class SignOutScreenFactory extends ScreenFactory {
  public createScreenDelegate(): SignOutScreenDelegate {
    return new SignOutScreenDelegate(
      this.eventBus,
      this.props.rootStore,
      this.props.observableScreenRegistry,
      this.createNavigatorDelegate(),
    );
  }
}
