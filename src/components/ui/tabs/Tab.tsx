import Stack from '@mui/material/Stack';

import type { ActionCreatorWithPayload } from '@reduxjs/toolkit/react';

import { Section, SectionItem } from '@components';
import type { AchievementDifficulty, Completion, QuestDifficulty } from '@types';
import { useMemo } from 'react';

interface Sections<T> {
  completion: Completion;
  items: Array<T>;
}

interface Item {
  id: string;
  description?: string;
  difficulty?: AchievementDifficulty | QuestDifficulty;
  icon: string;
  title: string;
}

interface TabProps<T> {
  completed: Array<T>;
  locked: Array<T>;
  unlocked: Array<T>;
  getItemDetails: (item: T) => Item;
  onCompletion: ActionCreatorWithPayload<{ id: string; isComplete: boolean }>;
}

/**
 * Renders unlocked, locked, and completed sections of the given arrays.
 * @param {object} props Properties object
 * @returns
 */
const Tab = <T,>({ completed, locked, unlocked, getItemDetails, onCompletion }: TabProps<T>) => {
  const sections = useMemo(
    /**
     * Mapped sections.
     * @returns {Array<Sections<T>>}
     */
    (): Array<Sections<T>> => [
      {
        completion: 'unlocked',
        items: unlocked
      },
      {
        completion: 'locked',
        items: locked
      },
      {
        completion: 'completed',
        items: completed
      }
    ],
    [completed, locked, unlocked]
  );

  return (
    <Stack direction="column" gap={2}>
      {sections.map(({ completion, items }) => (
        <Section key={completion} title={completion}>
          {items.map((item) =>
            (({ id, description, difficulty, icon, title }) => (
              <SectionItem
                key={id}
                completion={completion}
                description={description}
                difficulty={difficulty}
                icon={icon}
                id={id}
                title={title}
                onCompletion={onCompletion}
              />
            ))(getItemDetails(item))
          )}
        </Section>
      ))}
    </Stack>
  );
};

export default Tab;
