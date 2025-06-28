import Stack from '@mui/material/Stack';

import { Section } from '@components';
import type { AchievementDifficulty, Completion, QuestDifficulty } from '@types';
import { useMemo, type ReactNode } from 'react';

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
  getItem: (item: T, completion: Completion) => ReactNode;
}

/**
 * Renders unlocked, locked, and completed sections of the given arrays.
 * @param {object} props Properties object
 * @returns
 */
const Tab = <T,>({ completed, locked, unlocked, getItem }: TabProps<T>) => {
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
          {items.map((item) => getItem(item, completion))}
        </Section>
      ))}
    </Stack>
  );
};

export default Tab;
