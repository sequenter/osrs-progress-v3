import { setIsComplete } from '@redux/reducers/PetsReducer';

import { SectionItem, Tab } from '@components';
import { useActions } from '@hooks/useActions';
import type { Completion, PetState } from '@types';
import { wikiIcon } from '@utils/icons';

/**
 * Renders unlocked, locked, and completed pets.
 * @returns JSX Element
 */
const PetsTab = () => {
  const { completedPets, lockedPets, unlockedPets } = useActions();

  /**
   * Returns a section item utilising a given Pet.
   */
  const handleItem = ({ icon, name, requirements }: PetState, completion: Completion) => (
    <SectionItem
      key={name}
      completion={completion}
      icon={wikiIcon(icon)}
      id={name}
      title={name}
      requirements={requirements}
      onCompletion={setIsComplete}
    />
  );

  return <Tab<PetState> completed={completedPets} locked={lockedPets} unlocked={unlockedPets} getItem={handleItem} />;
};

export default PetsTab;
