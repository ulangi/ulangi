import { addVocabularyScreen } from '../screen-objects/AddVocabularyScreen';
import { createFirstSetScreen } from '../screen-objects/CreateFirstSetScreen';
import { learnScreen } from '../screen-objects/LearnScreen';
import { lightBoxDialog } from '../screen-objects/LightBoxDialog';
import { manageScreen } from '../screen-objects/ManageScreen';
import { quizScreen } from '../screen-objects/QuizScreen';
import { quizSettingsScreen } from '../screen-objects/QuizSettingsScreen';
import { quizWritingScreen } from '../screen-objects/QuizWritingScreen';
import { welcomeScreen } from '../screen-objects/welcomeScreen';

describe('Quiz writing minimum required', (): void => {
  describe('Tests start at ManageScreen', (): void => {
    beforeEach(
      async (): Promise<void> => {
        await welcomeScreen.tapYes();
        await createFirstSetScreen.selectLanguagesAndSubmit(
          'English',
          'English'
        );
      }
    );

    it('cannot start quiz because no terms available', async (): Promise<
      void
    > => {
      await manageScreen.navigateToLearnScreen();
      await learnScreen.navigateToQuizScreen();

      await quizScreen.navigateToQuizSettingsScreen();
      await quizSettingsScreen.changeVocabularyPool('Active');
      await quizSettingsScreen.expectToHaveVocabularyPool('Active');
      await quizSettingsScreen.save();
      await lightBoxDialog.close();

      await quizScreen.navigateToQuizWritingScreen();
      await lightBoxDialog.expectFailedDialogToExist();
      await lightBoxDialog.close();
    });

    it('can start quiz if it has one term', async (): Promise<void> => {
      await manageScreen.navigateToAddVocabularyScreen();
      await addVocabularyScreen.fillAndSaveMultpleTerms([
        {
          vocabularyText: 'vocabulary 1',
          definitions: ['meaning 1'],
        },
      ]);
      await lightBoxDialog.close();
      await manageScreen.navigateToLearnScreen();
      await learnScreen.navigateToQuizScreen();

      await quizScreen.navigateToQuizSettingsScreen();
      await quizSettingsScreen.changeVocabularyPool('Active');
      await quizSettingsScreen.expectToHaveVocabularyPool('Active');
      await quizSettingsScreen.save();
      await lightBoxDialog.close();

      await quizScreen.navigateToQuizWritingScreen();
      await quizWritingScreen.expectToExist();
      await quizWritingScreen.back();
      await quizWritingScreen.expectToNotExist();
    });
  });
});
