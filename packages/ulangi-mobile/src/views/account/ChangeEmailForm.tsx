/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import { ObservableChangeEmailScreen } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';

import { config } from '../../constants/config';
import { ChangeEmailScreenIds } from '../../constants/ids/ChangeEmailScreenIds';
import { DefaultTextInput } from '../common/DefaultTextInput';
import {
  ChangeEmailFormStyles,
  changeEmailFormResponsiveStyles,
} from './ChangeEmailForm.style';

export interface ChangeEmailProps {
  theme: Theme;
  observableScreen: ObservableChangeEmailScreen;
  styles?: {
    light: ChangeEmailFormStyles;
    dark: ChangeEmailFormStyles;
  };
}

@observer
export class ChangeEmailForm extends React.Component<ChangeEmailProps> {
  public get styles(): ChangeEmailFormStyles {
    return changeEmailFormResponsiveStyles.compile(
      this.props.observableScreen.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.form}>
        <View style={this.styles.text_input_container}>
          <DefaultTextInput
            testID={ChangeEmailScreenIds.NEW_EMAIL_INPUT}
            style={this.styles.text_input}
            value={this.props.observableScreen.email}
            onChangeText={(text): void => {
              this.props.observableScreen.email = text;
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholder="Enter new email"
            placeholderTextColor={
              this.props.theme === Theme.LIGHT
                ? config.styles.light.secondaryTextColor
                : config.styles.dark.secondaryTextColor
            }
          />
        </View>
        <View style={this.styles.text_input_container}>
          <DefaultTextInput
            testID={ChangeEmailScreenIds.CURRENT_PASSWORD_INPUT}
            style={[this.styles.password_input, this.styles.no_border]}
            value={this.props.observableScreen.password}
            autoCapitalize="none"
            placeholder="Enter current password"
            placeholderTextColor={
              this.props.theme === Theme.LIGHT
                ? config.styles.light.secondaryTextColor
                : config.styles.dark.secondaryTextColor
            }
            onChangeText={(text): void => {
              this.props.observableScreen.password = text;
            }}
            secureTextEntry={true}
          />
        </View>
      </View>
    );
  }
}
