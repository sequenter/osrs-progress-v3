import Stack from '@mui/material/Stack';

import { setIsComplete } from '@redux/reducers/QuestsReducer';

import { Section, SectionItem } from '@components';
import { useStoreDispatch } from '@hooks';
import { useActions } from '@hooks/useActions';
import type { Completion, QuestState } from '@types';
import { WIKI_IMAGES_URL } from '@utils/constants';
import { useCallback, useMemo } from 'react';

interface Sections {
  completion: Completion;
  quests: QuestState;
}

/**
 * Renders unlocked, locked, and completed quests.
 * @returns JSX Element
 */
const QuestsTab = () => {
  const { completedQuests, lockedQuests, unlockedQuests } = useActions();

  const dispatch = useStoreDispatch();

  /**
   * Dispatches update to quest completion state.
   * @param {boolean} isComplete Task completion state
   * @param {string} name The name of the quest to update as complete/incomplete
   */
  const onCompletion = useCallback(
    (isComplete: boolean, name: string) => dispatch(setIsComplete({ name, isComplete })),
    [dispatch]
  );

  const sections = useMemo(
    /**
     * Mapped sections.
     * @returns {Array<Sections>}
     */
    (): Array<Sections> => [
      {
        completion: 'unlocked',
        quests: unlockedQuests
      },
      {
        completion: 'locked',
        quests: lockedQuests
      },
      {
        completion: 'completed',
        quests: completedQuests
      }
    ],
    [completedQuests, lockedQuests, unlockedQuests]
  );

  return (
    <Stack direction="column" gap={2}>
      {sections.map(({ completion, quests }) => (
        <Section key={completion} title={completion}>
          {quests.map(({ difficulty, length, name, icon, release }) => (
            <SectionItem
              key={name}
              completion={completion}
              completionId={name}
              description={`Released ${release}, ${length}`}
              difficulty={difficulty}
              icon={`${WIKI_IMAGES_URL}${icon.replaceAll(' ', '_')}.png`}
              title={name}
              onCompletion={onCompletion}
            />
          ))}
        </Section>
      ))}
    </Stack>
  );
};

export default QuestsTab;
