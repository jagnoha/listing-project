import { atom } from 'recoil';

const generalProcessingAtom = atom({
  key: 'generalProcessing', // unique ID (with respect to other atoms/selectors)
  default: false, // default value (aka initial value)
});

export default generalProcessingAtom;
