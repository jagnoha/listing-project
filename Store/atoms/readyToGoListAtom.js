import { atom } from 'recoil';

const readyToGoListAtom = atom({
  key: 'readyToGoList', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default readyToGoListAtom;