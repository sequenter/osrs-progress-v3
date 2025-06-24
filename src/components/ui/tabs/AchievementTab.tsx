import Stack from '@mui/material/Stack';

import { setIsComplete } from '@redux/reducers/AchievementsReducer';

import { Section, SectionItem } from '@components';
import { useStoreDispatch } from '@hooks';
import { useActions } from '@hooks/useActions';
import type { AchievementState, Completion } from '@types';
import { diaryIconMap } from '@utils/icons';
import { useCallback, useMemo } from 'react';

interface Sections {
  completion: Completion;
  achievements: AchievementState;
}

/**
 * Renders unlocked, locked, and completed achievements.
 * @returns JSX Element
 */
const AchievementsTab = () => {
  const { completedAchievements, lockedAchievements, unlockedAchievements } = useActions();

  const dispatch = useStoreDispatch();

  /**
   * Dispatches update to achievement completion state.
   * @param {boolean} isComplete Task completion state
   * @param {string} task The task to update as complete/incomplete
   */
  const onCompletion = useCallback(
    (isComplete: boolean, task: string) => dispatch(setIsComplete({ isComplete, task })),
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
        achievements: unlockedAchievements
      },
      {
        completion: 'locked',
        achievements: lockedAchievements
      },
      {
        completion: 'completed',
        achievements: completedAchievements
      }
    ],
    [completedAchievements, lockedAchievements, unlockedAchievements]
  );

  return (
    <Stack direction="column" gap={2}>
      {sections.map(({ completion, achievements }) => (
        <Section key={completion} title={completion}>
          {achievements.map(({ diary, difficulty, task }) => (
            <SectionItem
              key={task}
              completion={completion}
              completionId={task}
              description={task}
              difficulty={difficulty}
              icon={diaryIconMap[diary]}
              title={diary}
              onCompletion={onCompletion}
            />
          ))}
        </Section>
      ))}
    </Stack>
  );
};

export default AchievementsTab;
