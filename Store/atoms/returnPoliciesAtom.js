import { atom } from 'recoil';

const returnPoliciesAtom = atom({
  key: 'returnPolicies', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default returnPoliciesAtom;
