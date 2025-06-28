import { setIsComplete } from '@redux/reducers/PetsReducer';

import { Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Pet } from '@types';
import { wikiIcon } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed pets.
 * @returns JSX Element
 */
const PetsTab = () => {
  const { completedPets, lockedPets, unlockedPets } = useActions();

  /**
   * Get details for a Pet item.
   */
  const handleItemDetails = ({ icon, name }: Pet) => ({
    id: name,
    icon: wikiIcon(icon),
    title: name
  });

  return (
    <Tab<Pet>
      completed={completedPets}
      locked={lockedPets}
      unlocked={unlockedPets}
      getItemDetails={handleItemDetails}
      onCompletion={setIsComplete}
    />
  );
};

export default PetsTab;
