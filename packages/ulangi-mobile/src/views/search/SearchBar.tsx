/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import { ObservableSearchScreen } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { View } from 'react-native';

import { SearchInput } from '../../views/search/SearchInput';
import { SearchBarStyles, searchBarResponsiveStyles } from './SearchBar.style';

export interface SearchBarProps {
  theme: Theme;
  observableScreen: ObservableSearchScreen;
  handleSearchInputEnd: () => void;
  styles?: {
    light: SearchBarStyles;
    dark: SearchBarStyles;
  };
}

@observer
export class SearchBar extends React.Component<SearchBarProps> {
  private get styles(): SearchBarStyles {
    return searchBarResponsiveStyles.compile(
      this.props.observableScreen.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.container}>
        <SearchInput
          theme={this.props.theme}
          observableScreen={this.props.observableScreen}
          submit={this.props.handleSearchInputEnd}
        />
      </View>
    );
  }
}
