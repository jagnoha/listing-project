import { atom } from 'recoil';

const selectedAtom = atom({
    key: 'selected', // unique ID (with respect to other atoms/selectors)
    default: [], // default value (aka initial value)
  });

export default selectedAtom;