import { atom } from 'recoil';

const ebayUserAtom = atom({
  key: 'ebayUser', // unique ID (with respect to other atoms/selectors)
  default: null, // default value (aka initial value)
});

export default ebayUserAtom;