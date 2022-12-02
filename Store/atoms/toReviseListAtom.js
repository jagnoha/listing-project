import { atom } from 'recoil';

const toReviseListAtom = atom({
  key: 'toReviseList', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default toReviseListAtom;