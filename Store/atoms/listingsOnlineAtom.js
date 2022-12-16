import { atom } from 'recoil';

const listingsOnlineAtom = atom({
  key: 'listingsOnline', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default listingsOnlineAtom;
