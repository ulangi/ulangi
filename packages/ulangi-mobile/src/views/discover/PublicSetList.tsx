/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { ActivityState, ButtonSize, Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservablePublicSet,
  ObservablePublicSetListState,
  ObservableScreenLayout,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { FlatList, View } from 'react-native';

import { DiscoverScreenIds } from '../../constants/ids/DiscoverScreenIds';
import { fullRoundedButtonStyles } from '../../styles/FullRoundedButtonStyles';
import { DefaultActivityIndicator } from '../common/DefaultActivityIndicator';
import { DefaultButton } from '../common/DefaultButton';
import { DefaultText } from '../common/DefaultText';
import { PublicSetItem } from './PublicSetItem';
import {
  PublicSetListStyles,
  publicSetListResponsiveStyles,
} from './PublicSetList.style';

export interface PublicSetListProps {
  theme: Theme;
  screenLayout: ObservableScreenLayout;
  publicSetListState: ObservablePublicSetListState;
  showSetDetailModal: (set: ObservablePublicSet) => void;
  onEndReached: () => void;
  refresh: () => void;
  styles?: {
    light: PublicSetListStyles;
    dark: PublicSetListStyles;
  };
  headerComponent?: null | React.ReactElement<any>;
}

@observer
export class PublicSetList extends React.Component<PublicSetListProps> {
  private keyExtractor = (item: [string, ObservablePublicSet]): string =>
    item[0];

  private get styles(): PublicSetListStyles {
    return publicSetListResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    if (
      this.props.publicSetListState.searchState.get() === ActivityState.ERROR
    ) {
      return (
        <View
          testID={DiscoverScreenIds.ERROR}
          style={this.styles.center_container}>
          <DefaultText style={this.styles.message}>
            An error occurred. Please check internet connection.
          </DefaultText>
          <View style={this.styles.button_container}>
            <DefaultButton
              styles={fullRoundedButtonStyles.getGreyOutlineStyles(
                ButtonSize.SMALL,
                this.props.theme,
                this.props.screenLayout,
              )}
              text="Retry"
              onPress={this.props.refresh}
            />
          </View>
        </View>
      );
    } else if (
      this.props.publicSetListState.publicSetList !== null &&
      this.props.publicSetListState.publicSetList.size === 0
    ) {
      return (
        <View
          testID={DiscoverScreenIds.NO_RESULTS}
          style={this.styles.center_container}>
          <DefaultText style={this.styles.message}>
            No categories found.
          </DefaultText>
        </View>
      );
    } else {
      return (
        <FlatList
          testID={DiscoverScreenIds.PUBLIC_SET_LIST}
          contentContainerStyle={this.styles.list_container}
          keyExtractor={this.keyExtractor}
          data={
            this.props.publicSetListState.publicSetList
              ? Array.from(this.props.publicSetListState.publicSetList)
              : []
          }
          renderItem={({
            item,
          }: {
            item: [string, ObservablePublicSet];
          }): React.ReactElement<any> => {
            const [, set] = item;
            return (
              <PublicSetItem
                theme={this.props.theme}
                screenLayout={this.props.screenLayout}
                set={set}
                showSetDetailModal={this.props.showSetDetailModal}
              />
            );
          }}
          onEndReachedThreshold={0.5}
          onEndReached={this.props.onEndReached}
          onRefresh={this.props.refresh}
          refreshing={this.props.publicSetListState.isRefreshing.get()}
          ListHeaderComponent={this.props.headerComponent}
          ListFooterComponent={
            <DefaultActivityIndicator
              activityState={this.props.publicSetListState.searchState}
              isRefreshing={this.props.publicSetListState.isRefreshing}
              size="small"
            />
          }
        />
      );
    }
  }
}
