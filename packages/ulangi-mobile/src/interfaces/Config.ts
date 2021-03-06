/*
 * Copyright (c) Minh Loi.
 *
 * This file is part of Ulangi which is released under GPL v3.0.
 * See LICENSE or go to https://www.gnu.org/licenses/gpl-3.0.txt
 */

import {
  CategorySortType,
  Feedback,
  ReviewPriority,
  ReviewStrategy,
  SetStatus,
  VocabularySortType,
  VocabularyStatus,
  WordClass,
} from '@ulangi/ulangi-common/enums';
import {
  AutoArchiveSettings,
  FeatureSettings,
  ReminderSettings,
  ThemeSettings,
} from '@ulangi/ulangi-common/interfaces';

export interface Config {
  readonly general: {
    readonly guestEmailDomain: string;
    readonly guestPassword: string;
    readonly animationDuration: number;
    readonly checkDatabaseTimeout: number;
  };

  readonly ad: {
    readonly showAdTimeout: number;
  };

  readonly links: {
    readonly reddit: string;
    readonly twitter: string;
    readonly instagram: string;
    readonly facebookPage: string;
    readonly facebookPageFallback: string;
    readonly github: string;
    readonly ulangiSheetsAddOn: {
      readonly youtubeDemo: string;
      readonly installTutorial: string;
      readonly useTutorial: string;
    };
  };

  readonly styles: {
    readonly primaryColor: string;
    readonly lightPrimaryColor: string;
    readonly darkPrimaryColor: string;
    readonly blueColor: string;
    readonly greenColor: string;
    readonly regularMembershipColor: string;
    readonly premiumMembershipColor: string;
    readonly iosMainFont: string;
    readonly iosMainFontBold: string;
    readonly androidMainFont: string;
    readonly androidMainFontBold: string;
    readonly light: {
      primaryBackgroundColor: string;
      secondaryBackgroundColor: string;
      tertiaryBackgroundColor: string;
      primaryTextColor: string;
      secondaryTextColor: string;
      primaryBorderColor: string;
      secondaryBorderColor: string;
    };
    readonly dark: {
      primaryBackgroundColor: string;
      secondaryBackgroundColor: string;
      tertiaryBackgroundColor: string;
      primaryTextColor: string;
      secondaryTextColor: string;
      primaryBorderColor: string;
      secondaryBorderColor: string;
    };
  };

  readonly user: {
    readonly passwordMinLength: number;
    readonly defaultGlobalAutoArchive: AutoArchiveSettings;
    readonly defaultGlobalReminder: ReminderSettings;
    readonly defaultThemeSettings: ThemeSettings;
  };

  readonly set: {
    readonly statusMap: {
      [P in SetStatus]: {
        readonly name: string;
      }
    };
    readonly defaultFeatureSettings: FeatureSettings;
  };

  readonly vocabulary: {
    readonly fetchLimit: number;
    readonly sortMap: {
      [P in VocabularySortType]: {
        readonly name: string;
        readonly longName: string;
      }
    };
    readonly statusMap: {
      [P in VocabularyStatus]: {
        readonly name: string;
        readonly shortName: string;
        readonly textColor: string;
        readonly borderColor: string;
      }
    };
  };

  readonly level: {
    readonly colorMap: string[];
  };

  readonly heatMap: {
    readonly mapping: {
      range: [number, number];
      styles: {
        backgroundColor: string;
      };
    }[];
    readonly onFire: {
      min: number;
      styles: {
        backgroundColor: string;
      };
    };
    readonly unavailable: {
      styles: {
        borderColor: string;
        borderWidth: number;
      };
    };
  };

  readonly category: {
    readonly fetchSuggestionsLimit: number;
    readonly sortMap: {
      [P in CategorySortType]: {
        readonly name: string;
        readonly longName: string;
      }
    };
  };

  readonly builtInWordClass: {
    readonly map: {
      [P in WordClass]: {
        readonly name: string;
        readonly abbr: string;
        readonly textColor: string;
        readonly backgroundColor: string;
        readonly borderColor: string;
      }
    };
  };

  readonly customWordClass: {
    readonly map: {
      [P in string]: {
        readonly textColor: string;
        readonly backgroundColor: string;
        readonly borderColor: string;
      }
    };
  };

  readonly search: {
    readonly searchLimit: number;
  };

  readonly manage: {
    readonly fetchVocabularyLimit: number;
    readonly fetchCategoryLimit: number;
  };

  readonly library: {
    readonly fetchPublicSetLimit: number;
    readonly searchPublicSetLimit: number;
    readonly searchPublicVocabularyLimit: number;
  };

  readonly reviewFeedback: {
    readonly feedbackMap: {
      [P in Feedback]: {
        readonly color: string;
      }
    };
  };

  readonly lightBox: {
    readonly animationDuration: number;
  };

  readonly spacedRepetition: {
    readonly maxLevel: number;
    readonly minPerLesson: number;
    readonly maxPerLesson: number;
    readonly selectableLimits: readonly number[];
    readonly defaultInitialInterval: number;
    readonly defaultReviewStrategy: ReviewStrategy;
    readonly defaultReviewPriority: ReviewPriority;
    readonly defaultFeedbackButtons: 3 | 4 | 5;
    readonly defaultAutoplayAudio: boolean;
    readonly selectableInitialIntervals: readonly number[];
    readonly selectableFeedbackButtons: readonly (3 | 4 | 5)[];
    readonly gradeScale: { [P in string]: [number, number] };
  };

  readonly writing: {
    readonly maxLevel: number;
    readonly minPerLesson: number;
    readonly maxPerLesson: number;
    readonly selectableLimits: readonly number[];
    readonly defaultInitialInterval: number;
    readonly defaultFeedbackButtons: 3 | 4 | 5;
    readonly defaultAutoplayAudio: boolean;
    readonly defaultAutoShowKeyboard: boolean;
    readonly defaultHighlightOnError: boolean;
    readonly defaultReviewPriority: ReviewPriority;
    readonly selectableInitialIntervals: readonly number[];
    readonly selectableFeedbackButtons: readonly (3 | 4 | 5)[];
    readonly gradeScale: { [P in string]: [number, number] };
  };

  readonly quiz: {
    readonly defaultVocabularyPool: 'learned' | 'active';
    readonly selectableVocabularyPool: readonly ('learned' | 'active')[];
    readonly multipleChoice: {
      readonly minPerQuiz: number;
      readonly defaultQuizSize: number;
      readonly selectableQuizSizes: readonly number[];
    };
    readonly writing: {
      readonly minPerQuiz: number;
      readonly defaultQuizSize: number;
      readonly selectableQuizSizes: readonly number[];
      readonly defaultAutoShowKeyboard: boolean;
      readonly defaultHighlightOnError: boolean;
    };
    readonly gradeScale: { [P in string]: [number, number] };
  };

  readonly atom: {
    readonly fetchLimit: number;
    readonly fetchTriggerThreshold: number;
    readonly minCharacters: number;
    readonly maxCharacters: number;
    readonly initialMoveCount: number;
    readonly backgroundColor: string;
    readonly primaryColor: string;
    readonly secondaryColor: string;
    readonly textColor: string;
    readonly particleSize: number;
    readonly innerShellDiameter: number;
    readonly outerShellDiameter: number;
    readonly originSize: number;
    readonly bottomOffset: number;
  };

  readonly reflex: {
    readonly fetchLimit: number;
    readonly fetchTriggerThreshold: number;
    readonly backgroundColor: string;
    readonly timePerQuestion: number;
  };

  readonly audio: {
    readonly cacheFolderName: string;
  };

  readonly sync: {
    readonly delayBetweenTransactions: number;
  };
}
