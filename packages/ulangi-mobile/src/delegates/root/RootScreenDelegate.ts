/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import { Navigation, OptionsBottomTabs } from '@ulangi/react-native-navigation';
import { ScreenName } from '@ulangi/ulangi-common/enums';
import { ObservableThemeStore } from '@ulangi/ulangi-observable';

import { Images } from '../../constants/Images';
import { BottomTabIds } from '../../constants/ids/BottomTabIds';
import { bottomTabsStyles } from '../../styles/BottomTabsStyles';

export class RootScreenDelegate {
  private themeStore: ObservableThemeStore;

  public constructor(themeStore: ObservableThemeStore) {
    this.themeStore = themeStore;
  }

  public setRootToSingleScreen(screenName: ScreenName): void {
    const theme = this.themeStore.theme;
    Navigation.setRoot({
      root: {
        stack: {
          children: [
            {
              component: {
                name: screenName,
                passProps: { theme },
              },
            },
          ],
        },
      },
    });
  }

  public setRootToTabBasedScreen(): void {
    const theme = this.themeStore.theme;
    Navigation.setRoot({
      root: {
        bottomTabs: {
          id: BottomTabIds.CONTAINER,
          children: [
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.MANAGE_SCREEN,
                      passProps: { theme },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.MANAGE_BTN,
                    text: 'Manage',
                    icon: Images.MANAGE_GREY_24X24,
                    selectedIcon: Images.MANAGE_BLUE_24X24,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.DISCOVER_SCREEN,
                      passProps: { theme },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.DISCOVER_BTN,
                    text: 'Discover',
                    icon: Images.DISCOVER_GREY_24X24,
                    selectedIcon: Images.DISCOVER_BLUE_24X24,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.LEARN_SCREEN,
                      passProps: { theme },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.LEARN_BTN,
                    text: 'Learn',
                    icon: Images.LEARN_GREY_24X24,
                    selectedIcon: Images.LEARN_BLUE_24X24,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.PROGRESS_SCREEN,
                      passProps: { theme },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.PROGRESS_BTN,
                    text: 'Progress',
                    icon: Images.PROGRESS_GREY_24X24,
                    selectedIcon: Images.PROGRESS_BLUE_24X24,
                  },
                },
              },
            },
            {
              stack: {
                children: [
                  {
                    component: {
                      name: ScreenName.MORE_SCREEN,
                      passProps: { theme },
                    },
                  },
                ],
                options: {
                  bottomTab: {
                    testID: BottomTabIds.MORE_BTN,
                    text: 'More',
                    icon: Images.MORE_GREY_24X24,
                    selectedIcon: Images.MORE_BLUE_24X24,
                  },
                },
              },
            },
          ],
          options: {
            bottomTabs: {
              backgroundColor: bottomTabsStyles.getBackgroundColor(theme),
            },
          },
        },
      },
    });
  }

  public mergeBottomTabsOptions(options: OptionsBottomTabs): void {
    Navigation.mergeOptions(BottomTabIds.CONTAINER, {
      bottomTabs: options,
    });
  }
}
