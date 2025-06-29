import { CollectionItem, Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { CollectionState, Completion } from '@types';
import { wikiIcon } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed collections.
 * @returns JSX Element
 */
const CollectionsTab = () => {
  const { completedCollections, lockedCollections, unlockedCollections } = useActions();

  /**
   * Returns a section item utilising a given Collection.
   */
  const handleItem = ({ icon, items, name, requirements }: CollectionState, completion: Completion) => (
    <CollectionItem
      key={name}
      completion={completion}
      icon={wikiIcon(icon)}
      items={items}
      title={name}
      requirements={requirements}
    />
  );

  return (
    <Tab<CollectionState>
      completed={completedCollections}
      locked={lockedCollections}
      unlocked={unlockedCollections}
      getItem={handleItem}
    />
  );
};

export default CollectionsTab;
