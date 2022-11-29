// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const ListingType = {
  "CLOTHING": "CLOTHING",
  "SHOES": "SHOES",
  "AUTOPARTS": "AUTOPARTS",
  "OTHER": "OTHER"
};

const Plans = {
  "PERSONAL": "PERSONAL",
  "PROFESSIONAL": "PROFESSIONAL"
};

const { Listing, ItemsCompatibility, Accounts, EbayAccounts } = initSchema(schema);

export {
  Listing,
  ItemsCompatibility,
  Accounts,
  EbayAccounts,
  ListingType,
  Plans
};