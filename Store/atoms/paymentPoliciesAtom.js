import { atom } from 'recoil';

const paymentPoliciesAtom = atom({
  key: 'paymentPolicies', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default paymentPoliciesAtom;
