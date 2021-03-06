/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Theme } from '@ulangi/ulangi-common/enums';
import {
  ObservableLightBox,
  ObservableScreenLayout,
} from '@ulangi/ulangi-observable';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';
import * as React from 'react';
import {
  PanResponder,
  PanResponderInstance,
  View,
  ViewStyle,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { config } from '../../constants/config';
import {
  LightBoxTouchableBackgroundStyles,
  lightBoxTouchableBackgroundResponsiveStyles,
} from './LightBoxTouchableBackground.style';

export interface LightBoxTouchableBackgroundProps {
  theme: Theme;
  observableLightBox: ObservableLightBox;
  screenLayout: ObservableScreenLayout;
  testID?: string;
  style?: ViewStyle;
  enabled?: boolean;
  onPress?: () => void;
  activeOpacity?: number;
  children?: React.ReactNode;
}

export interface LightBoxTouchableBackgroundState {
  isTouchingBackground: boolean;
}

@observer
export class LightBoxTouchableBackground extends React.Component<
  LightBoxTouchableBackgroundProps,
  LightBoxTouchableBackgroundState
> {
  private panResponder: PanResponderInstance;
  private innerViewLayout: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  private animationContainerRef?: any;
  private animationHandler?: () => void;

  public componentDidMount(): void {
    this.animationHandler = autorun(
      (): void => {
        if (
          this.props.observableLightBox.state === 'willDismiss' &&
          this.animationContainerRef
        ) {
          this.props.observableLightBox.pendingAnimations.push(
            'fading background',
          );
          this.animationContainerRef
            .fadeOut(config.lightBox.animationDuration)
            .then(
              (): void => {
                this.props.observableLightBox.removePendingAnimation(
                  'fading background',
                );
              },
            );
        }
      },
    );
  }

  public componentWillUnmount(): void {
    if (typeof this.animationHandler !== 'undefined') {
      this.animationHandler();
    }
  }

  private get styles(): LightBoxTouchableBackgroundStyles {
    return lightBoxTouchableBackgroundResponsiveStyles.compile(
      this.props.screenLayout,
      this.props.theme,
    );
  }

  public constructor(props: LightBoxTouchableBackgroundProps) {
    super(props);

    this.innerViewLayout = {
      x: 0,
      y: 0,
      height: 0,
      width: 0,
    };

    this.state = {
      isTouchingBackground: false,
    };

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (): boolean => {
        return true;
      },

      onMoveShouldSetPanResponder: (): boolean => true,

      onPanResponderGrant: (evt): void => {
        this.setState({
          isTouchingBackground: this.isTouchingBackground({
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
          }),
        });
      },

      onPanResponderMove: (evt): void => {
        this.setState({
          isTouchingBackground: this.isTouchingBackground({
            x: evt.nativeEvent.pageX,
            y: evt.nativeEvent.pageY,
          }),
        });
      },
      onPanResponderTerminationRequest: (): boolean => true,

      onPanResponderRelease: (evt): void => {
        this.setState(
          {
            isTouchingBackground: this.isTouchingBackground({
              x: evt.nativeEvent.pageX,
              y: evt.nativeEvent.pageY,
            }),
          },
          (): void => {
            if (this.state.isTouchingBackground) {
              this.onBackgroundPress();
            }
          },
        );
      },
    });
  }

  private isTouchingBackground(touchPosition: {
    x: number;
    y: number;
  }): boolean {
    if (
      touchPosition.x >= this.innerViewLayout.x &&
      touchPosition.x <= this.innerViewLayout.x + this.innerViewLayout.width &&
      touchPosition.y >= this.innerViewLayout.y &&
      touchPosition.y <= this.innerViewLayout.y + this.innerViewLayout.height
    ) {
      return false;
    } else {
      return true;
    }
  }

  private onBackgroundPress(): void {
    if (
      this.props.enabled === true &&
      typeof this.props.onPress !== 'undefined'
    ) {
      this.props.onPress();
    }
  }

  public render(): React.ReactElement<any> {
    const innerViewOpacity = this.state.isTouchingBackground
      ? this.props.activeOpacity
      : 1;
    const panHandlers =
      this.props.enabled === true ? this.panResponder.panHandlers : {};

    return (
      <View
        testID={this.props.testID}
        style={[
          this.styles.light_box_container,
          this.props.style,
          {
            width: this.props.screenLayout.width,
            height: this.props.screenLayout.height,
          },
        ]}>
        <Animatable.View
          ref={(ref: any): void => {
            this.animationContainerRef = ref;
          }}
          animation="fadeIn"
          duration={200}
          useNativeDriver
          style={[
            this.styles.background,
            {
              width: this.props.screenLayout.width,
              height: this.props.screenLayout.height,
            },
          ]}
          {...panHandlers}
        />
        <View
          style={{ opacity: innerViewOpacity }}
          onLayout={(event): void => {
            this.innerViewLayout = event.nativeEvent.layout;
          }}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
