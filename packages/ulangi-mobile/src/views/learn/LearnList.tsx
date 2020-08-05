/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import { FeatureSettings } from '@ulangi/ulangi-common/interfaces';
import { ObservableScreenLayout } from '@ulangi/ulangi-observable';
import { observer } from 'mobx-react';
import * as React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';

import { LearnScreenIds } from '../../constants/ids/LearnScreenIds';
import { QuizTitle } from '../../views/quiz/QuizTitle';
import { SpacedRepetitionTitle } from '../../views/spaced-repetition/SpacedRepetitionTitle';
import { WritingTitle } from '../../views/writing/WritingTitle';
import { AtomTitle } from '../atom/AtomTitle';
import { ReflexTitle } from '../reflex/ReflexTitle';
import { LearnListStyles, learnListResponsiveStyles } from './LearnList.style';

export interface LearnListProps {
  theme: Theme;
  screenLayout: ObservableScreenLayout;
  featureSettings: FeatureSettings;
  navigateToSpacedRepetitionScreen: () => void;
  navigateToWritingScreen: () => void;
  navigateToQuizScreen: () => void;
  navigateToReflexScreen: () => void;
  navigateToAtomScreen: () => void;
}

@observer
export class LearnList extends React.Component<LearnListProps> {
  public get styles(): LearnListStyles {
    return learnListResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public render(): React.ReactElement<any> {
    return (
      <ScrollView
        testID={LearnScreenIds.LEARN_LIST}
        contentContainerStyle={this.styles.scroll_view_container}>
        {this.props.featureSettings.spacedRepetitionEnabled ? (
          <TouchableOpacity
            testID={LearnScreenIds.SPACED_REPETITION_BTN}
            style={[
              this.styles.learn_item,
              this.styles.spaced_repetition_title_container,
            ]}
            onPress={this.props.navigateToSpacedRepetitionScreen}>
            <SpacedRepetitionTitle
              theme={this.props.theme}
              screenLayout={this.props.screenLayout}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.featureSettings.writingEnabled ? (
          <TouchableOpacity
            testID={LearnScreenIds.WRITING_BTN}
            style={[
              this.styles.learn_item,
              this.styles.writing_title_container,
            ]}
            onPress={this.props.navigateToWritingScreen}>
            <WritingTitle
              theme={this.props.theme}
              screenLayout={this.props.screenLayout}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.featureSettings.quizEnabled ? (
          <TouchableOpacity
            testID={LearnScreenIds.QUIZ_BTN}
            style={[this.styles.learn_item, this.styles.quiz_title_container]}
            onPress={this.props.navigateToQuizScreen}>
            <QuizTitle
              theme={this.props.theme}
              screenLayout={this.props.screenLayout}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.featureSettings.reflexEnabled ? (
          <TouchableOpacity
            testID={LearnScreenIds.REFLEX_BTN}
            style={[this.styles.learn_item, this.styles.reflex_title_container]}
            onPress={this.props.navigateToReflexScreen}>
            <ReflexTitle
              theme={this.props.theme}
              screenLayout={this.props.screenLayout}
            />
          </TouchableOpacity>
        ) : null}
        {this.props.featureSettings.atomEnabled ? (
          <TouchableOpacity
            testID={LearnScreenIds.ATOM_BTN}
            style={[this.styles.learn_item, this.styles.atom_title_container]}
            onPress={this.props.navigateToAtomScreen}>
            <AtomTitle />
          </TouchableOpacity>
        ) : null}
      </ScrollView>
    );
  }
}
