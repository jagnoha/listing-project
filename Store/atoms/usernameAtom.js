import { atom } from 'recoil';

const usernameAtom = atom({
  key: 'username', // unique ID (with respect to other atoms/selectors)
  default: '', // default value (aka initial value)
});

export default usernameAtom;
