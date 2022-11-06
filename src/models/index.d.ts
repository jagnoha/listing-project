import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum ListingType {
  CLOTHING = "CLOTHING",
  SHOES = "SHOES",
  AUTOPARTS = "AUTOPARTS",
  OTHER = "OTHER"
}

export enum Plans {
  PERSONAL = "PERSONAL",
  PROFESSIONAL = "PROFESSIONAL"
}



type ListingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ItemsCompatibilityMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EbayItemsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ProductsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InventoryLocationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BrandsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LocationsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EbayOrdersMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AccountsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type EbayAccountsMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Listing {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly categoryID?: string | null;
  readonly shippingProfileID?: string | null;
  readonly returnProfileID?: string | null;
  readonly paymentProfileID?: string | null;
  readonly ebayMotors?: boolean | null;
  readonly itemsSpecifics?: string | null;
  readonly manufacturerPartNumber?: string | null;
  readonly interchangePartNumber?: string | null;
  readonly otherPartNumber?: string | null;
  readonly UPC?: string | null;
  readonly EAN?: string | null;
  readonly ISBN?: string | null;
  readonly images?: (string | null)[] | null;
  readonly conditionCode?: string | null;
  readonly conditionDescription?: string | null;
  readonly length?: number | null;
  readonly width?: number | null;
  readonly depth?: number | null;
  readonly weight?: number | null;
  readonly quantity?: number | null;
  readonly sku?: string | null;
  readonly isDraft?: boolean | null;
  readonly brand?: string | null;
  readonly accountsID: string;
  readonly ItemsCompatibility?: ItemsCompatibility | null;
  readonly type?: ListingType | keyof typeof ListingType | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listingItemsCompatibilityId?: string | null;
  constructor(init: ModelInit<Listing, ListingMetaData>);
  static copyOf(source: Listing, mutator: (draft: MutableModel<Listing, ListingMetaData>) => MutableModel<Listing, ListingMetaData> | void): Listing;
}

export declare class ItemsCompatibility {
  readonly id: string;
  readonly compatibilityList?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<ItemsCompatibility, ItemsCompatibilityMetaData>);
  static copyOf(source: ItemsCompatibility, mutator: (draft: MutableModel<ItemsCompatibility, ItemsCompatibilityMetaData>) => MutableModel<ItemsCompatibility, ItemsCompatibilityMetaData> | void): ItemsCompatibility;
}

export declare class EbayItems {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly dispatchTimeMax?: number | null;
  readonly itemID?: string | null;
  readonly listingType?: string | null;
  readonly price?: number | null;
  readonly relistParentID?: string | null;
  readonly site?: string | null;
  readonly currency?: string | null;
  readonly listingDuration?: string | null;
  readonly categoryID?: string | null;
  readonly bestOffer?: boolean | null;
  readonly ebayaccountsID: string;
  readonly ItemsCompatibilities?: ItemsCompatibility | null;
  readonly shippingProfileID?: string | null;
  readonly returnProfileID?: string | null;
  readonly paymentProfileID?: string | null;
  readonly ebayMotors?: boolean | null;
  readonly Products?: Products | null;
  readonly itemsSpecifics?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ebayItemsItemsCompatibilitiesId?: string | null;
  constructor(init: ModelInit<EbayItems, EbayItemsMetaData>);
  static copyOf(source: EbayItems, mutator: (draft: MutableModel<EbayItems, EbayItemsMetaData>) => MutableModel<EbayItems, EbayItemsMetaData> | void): EbayItems;
}

export declare class Products {
  readonly id: string;
  readonly title?: string | null;
  readonly accountsID: string;
  readonly brandsID: string;
  readonly InventoryLocations?: (InventoryLocations | null)[] | null;
  readonly description?: string | null;
  readonly manufacturerPartNumber?: string | null;
  readonly interchangePartNumber?: string | null;
  readonly otherPartNumber?: string | null;
  readonly UPC?: string | null;
  readonly EAN?: string | null;
  readonly ISBN?: string | null;
  readonly images?: (string | null)[] | null;
  readonly conditionCode?: string | null;
  readonly conditionDescription?: string | null;
  readonly length?: number | null;
  readonly width?: number | null;
  readonly depth?: number | null;
  readonly weight?: number | null;
  readonly weightUnit?: string | null;
  readonly lengthUnit?: string | null;
  readonly totalAvailable?: number | null;
  readonly tags?: (string | null)[] | null;
  readonly listingStatus?: string | null;
  readonly isDraft?: boolean | null;
  readonly price?: number | null;
  readonly sku?: string | null;
  readonly EbayItems?: EbayItems | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productsEbayItemsId?: string | null;
  constructor(init: ModelInit<Products, ProductsMetaData>);
  static copyOf(source: Products, mutator: (draft: MutableModel<Products, ProductsMetaData>) => MutableModel<Products, ProductsMetaData> | void): Products;
}

export declare class InventoryLocations {
  readonly id: string;
  readonly quantity?: number | null;
  readonly productsID: string;
  readonly locationsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<InventoryLocations, InventoryLocationsMetaData>);
  static copyOf(source: InventoryLocations, mutator: (draft: MutableModel<InventoryLocations, InventoryLocationsMetaData>) => MutableModel<InventoryLocations, InventoryLocationsMetaData> | void): InventoryLocations;
}

export declare class Brands {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly Products?: (Products | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Brands, BrandsMetaData>);
  static copyOf(source: Brands, mutator: (draft: MutableModel<Brands, BrandsMetaData>) => MutableModel<Brands, BrandsMetaData> | void): Brands;
}

export declare class Locations {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly InventoryLocations?: (InventoryLocations | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Locations, LocationsMetaData>);
  static copyOf(source: Locations, mutator: (draft: MutableModel<Locations, LocationsMetaData>) => MutableModel<Locations, LocationsMetaData> | void): Locations;
}

export declare class EbayOrders {
  readonly id: string;
  readonly orderId?: string | null;
  readonly legacyOrderId?: string | null;
  readonly creationDate?: string | null;
  readonly lastModifiedDate?: string | null;
  readonly orderFulfillmentStatus?: string | null;
  readonly orderPaymentStatus?: string | null;
  readonly sellerId?: string | null;
  readonly buyer?: string | null;
  readonly salesRecordReference?: string | null;
  readonly accountsID: string;
  readonly ebayaccountsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<EbayOrders, EbayOrdersMetaData>);
  static copyOf(source: EbayOrders, mutator: (draft: MutableModel<EbayOrders, EbayOrdersMetaData>) => MutableModel<EbayOrders, EbayOrdersMetaData> | void): EbayOrders;
}

export declare class Accounts {
  readonly id: string;
  readonly EbayAccounts?: (EbayAccounts | null)[] | null;
  readonly isNewAccount?: boolean | null;
  readonly plan?: Plans | keyof typeof Plans | null;
  readonly EbayOrders?: (EbayOrders | null)[] | null;
  readonly Locations?: (Locations | null)[] | null;
  readonly Brands?: (Brands | null)[] | null;
  readonly Products?: (Products | null)[] | null;
  readonly Listings?: (Listing | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Accounts, AccountsMetaData>);
  static copyOf(source: Accounts, mutator: (draft: MutableModel<Accounts, AccountsMetaData>) => MutableModel<Accounts, AccountsMetaData> | void): Accounts;
}

export declare class EbayAccounts {
  readonly id: string;
  readonly name?: string | null;
  readonly accessTokenUAT?: string | null;
  readonly expiresInUAT?: number | null;
  readonly refreshTokenUAT?: string | null;
  readonly refreshTokenExpiresInUAT?: number | null;
  readonly refreshTokenExpirationDate?: string | null;
  readonly accountsID: string;
  readonly tokenTypeUAT?: string | null;
  readonly EbayOrders?: (EbayOrders | null)[] | null;
  readonly returnPolicy?: string | null;
  readonly postalCode?: string | null;
  readonly EbayItems?: (EbayItems | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<EbayAccounts, EbayAccountsMetaData>);
  static copyOf(source: EbayAccounts, mutator: (draft: MutableModel<EbayAccounts, EbayAccountsMetaData>) => MutableModel<EbayAccounts, EbayAccountsMetaData> | void): EbayAccounts;
}