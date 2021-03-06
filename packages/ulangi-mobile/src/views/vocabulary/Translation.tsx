/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableScreenLayout,
  ObservableTranslation,
} from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { Image, View } from 'react-native';

import { Images } from '../../constants/Images';
import { VocabularyFormIds } from '../../constants/ids/VocabularyFormIds';
import { DefaultText } from '../common/DefaultText';
import { AddDefinitionButton } from './AddDefinitionButton';
import {
  TranslationStyles,
  translationResponsiveStyles,
} from './Translation.style';

export interface TranslationProps {
  index: number;
  theme: Theme;
  screenLayout: ObservableScreenLayout;
  translation: ObservableTranslation;
  onPick: (translation: ObservableTranslation) => void;
  styles?: {
    light: TranslationStyles;
    dark: TranslationStyles;
  };
}

@observer
export class Translation extends React.Component<TranslationProps> {
  public get styles(): TranslationStyles {
    return translationResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <View style={this.styles.definition_container}>
        <View style={this.styles.definition_content_container}>
          <View style={this.styles.meaning_container}>
            <DefaultText style={this.styles.meaning_text}>
              {this.props.translation.translatedText}
            </DefaultText>
            {this.props.translation.translatedBy === 'google' ? (
              <Image
                source={
                  this.props.theme === Theme.LIGHT
                    ? Images.TRANSLATE_BY_GOOGLE_COLOR_SHORT
                    : Images.TRANSLATE_BY_GOOGLE_WHITE_SHORT
                }
              />
            ) : null}
          </View>
        </View>
        <View style={this.styles.add_button_container}>
          <AddDefinitionButton
            testID={VocabularyFormIds.ADD_DEFINITION_FROM_TRANSLATION_BY_INDEX(
              this.props.index,
            )}
            theme={this.props.theme}
            screenLayout={this.props.screenLayout}
            disabled={this.props.translation.isAdded}
            isAdded={this.props.translation.isAdded}
            onPress={(): void => this.props.onPick(this.props.translation)}
          />
        </View>
      </View>
    );
  }
}
