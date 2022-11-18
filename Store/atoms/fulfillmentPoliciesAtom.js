import { atom } from 'recoil';

const fulfillmentPoliciesAtom = atom({
  key: 'fulfillmentPolicies', // unique ID (with respect to other atoms/selectors)
  default: [], // default value (aka initial value)
});

export default fulfillmentPoliciesAtom;
