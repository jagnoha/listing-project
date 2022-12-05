import { atom } from 'recoil';

const listingsAtom = atom({
  key: 'listings', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default listingsAtom;
