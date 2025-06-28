import { setIsComplete } from '@redux/reducers/QuestsReducer';

import { Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Quest } from '@types';
import { wikiIcon } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed quests.
 * @returns JSX Element
 */
const QuestsTab = () => {
  const { completedQuests, lockedQuests, unlockedQuests } = useActions();

  /**
   * Get details for a Quest item.
   */
  const handleItemDetails = ({ difficulty, icon, length, name, release }: Quest) => ({
    difficulty,
    description: `${release}, ${length}`,
    icon: wikiIcon(icon),
    id: name,
    title: name
  });

  return (
    <Tab<Quest>
      completed={completedQuests}
      locked={lockedQuests}
      unlocked={unlockedQuests}
      getItemDetails={handleItemDetails}
      onCompletion={setIsComplete}
    />
  );
};

export default QuestsTab;
