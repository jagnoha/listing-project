import { atom } from 'recoil';

const urlImagesAtom = atom({
  key: 'urlImages', // unique ID (with respect to other atoms/selectors)
  default: 'https://listerfast-storage-f596989e161256-staging.s3.amazonaws.com/public/', // default value (aka initial value)
});

export default urlImagesAtom;