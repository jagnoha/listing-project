import { atom } from 'recoil';

const userAccountAtom = atom({
  key: 'userAccount', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export default userAccountAtom;
