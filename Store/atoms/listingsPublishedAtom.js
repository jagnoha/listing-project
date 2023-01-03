import { atom } from 'recoil';

const listingsPublishedAtom = atom({
  key: 'listingsPublished', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default listingsPublishedAtom;