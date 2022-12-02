import { atom } from 'recoil';

const snackBarAtom = atom({
  key: 'snackBar', // unique ID (with respect to other atoms/selectors)
  default: { visible: false, text: '' }, // default value (aka initial value)
});

export default snackBarAtom;
