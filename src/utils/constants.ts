import { default as achievementsJson } from '@assets/json/achievements.json';
import { default as collectionsJson } from '@assets/json/collections.json';
import { default as petsJson } from '@assets/json/pets.json';
import { default as questsJson } from '@assets/json/quests.json';

import type { Achievement, Collection, Pet, Quest } from '@types';
import { ACHIEVEMENT, COLLECTION, parseJSON, PET, QUEST } from './schema';

/* COMMON */

export const WIKI_IMAGES_URL = 'https://oldschool.runescape.wiki/images/';
export const WIKI_IMAGES_ERROR = 'https://oldschool.runescape.wiki/images/Bank_filler.png';

/* DATA EXPORTS */

export const ACHIEVEMENTS: Array<Achievement> = parseJSON(ACHIEVEMENT, achievementsJson);
export const COLLECTIONS: Array<Collection> = parseJSON(COLLECTION, collectionsJson);
export const PETS: Array<Pet> = parseJSON(PET, petsJson);
export const QUESTS: Array<Quest> = parseJSON(QUEST, questsJson);
