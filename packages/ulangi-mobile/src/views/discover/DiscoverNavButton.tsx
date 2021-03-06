/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import { ObservableScreenLayout } from '@ulangi/ulangi-observable';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';

import { DefaultText } from '../common/DefaultText';
import {
  DiscoverNavButtonStyles,
  discoverNavButtonResponsiveStyles,
} from './DiscoverNavButton.style';

export interface DiscoverNavButtonProps {
  theme: Theme;
  screenLayout: ObservableScreenLayout;
  testID: string;
  isSelected: boolean;
  onPress: () => void;
  text: string;
  count: null | number;
  styles?: {
    light: DiscoverNavButtonStyles;
    dark: DiscoverNavButtonStyles;
  };
}

export class DiscoverNavButton extends React.Component<DiscoverNavButtonProps> {
  public get styles(): DiscoverNavButtonStyles {
    return discoverNavButtonResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={[
          this.styles.touchable,
          this.props.isSelected ? this.styles.selected_touchable : null,
        ]}
        onPress={this.props.onPress}>
        <DefaultText
          style={[
            this.styles.text,
            this.props.isSelected ? this.styles.selected_text : null,
          ]}>
          {this.props.text}
        </DefaultText>
      </TouchableOpacity>
    );
  }
}
