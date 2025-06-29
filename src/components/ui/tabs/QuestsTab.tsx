import { setIsComplete } from '@redux/reducers/QuestsReducer';

import { SectionItem, Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Completion, QuestState } from '@types';
import { wikiIcon } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed quests.
 * @returns JSX Element
 */
const QuestsTab = () => {
  const { completedQuests, lockedQuests, unlockedQuests } = useActions();

  /**
   * Returns a section item utilising a given Quest.
   */
  const handleItem = (
    { difficulty, icon, length, name, release, requirements, rewards }: QuestState,
    completion: Completion
  ) => (
    <SectionItem
      key={name}
      completion={completion}
      description={`${release}, ${length}`}
      difficulty={difficulty}
      icon={wikiIcon(icon)}
      id={name}
      requirements={requirements}
      rewards={rewards}
      title={name}
      onCompletion={setIsComplete}
    />
  );

  return (
    <Tab<QuestState> completed={completedQuests} locked={lockedQuests} unlocked={unlockedQuests} getItem={handleItem} />
  );
};

export default QuestsTab;
