import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

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

type EagerListing = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly categoryID?: string | null;
  readonly shippingProfileID?: string | null;
  readonly returnProfileID?: string | null;
  readonly paymentProfileID?: string | null;
  readonly ebayMotors?: boolean | null;
  readonly itemsSpecifics?: (string | null)[] | null;
  readonly manufacturerPartNumber?: string | null;
  readonly interchangePartNumber?: string | null;
  readonly otherPartNumber?: string | null;
  readonly UPC?: string | null;
  readonly EAN?: string | null;
  readonly ISBN?: string | null;
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
  readonly categoryList?: (string | null)[] | null;
  readonly photoMain?: string | null;
  readonly photoLabel?: string | null;
  readonly photos?: (string | null)[] | null;
  readonly lastStep?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listingItemsCompatibilityId?: string | null;
}

type LazyListing = {
  readonly id: string;
  readonly title?: string | null;
  readonly description?: string | null;
  readonly price?: number | null;
  readonly categoryID?: string | null;
  readonly shippingProfileID?: string | null;
  readonly returnProfileID?: string | null;
  readonly paymentProfileID?: string | null;
  readonly ebayMotors?: boolean | null;
  readonly itemsSpecifics?: (string | null)[] | null;
  readonly manufacturerPartNumber?: string | null;
  readonly interchangePartNumber?: string | null;
  readonly otherPartNumber?: string | null;
  readonly UPC?: string | null;
  readonly EAN?: string | null;
  readonly ISBN?: string | null;
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
  readonly ItemsCompatibility: AsyncItem<ItemsCompatibility | undefined>;
  readonly type?: ListingType | keyof typeof ListingType | null;
  readonly categoryList?: (string | null)[] | null;
  readonly photoMain?: string | null;
  readonly photoLabel?: string | null;
  readonly photos?: (string | null)[] | null;
  readonly lastStep?: number | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly listingItemsCompatibilityId?: string | null;
}

export declare type Listing = LazyLoading extends LazyLoadingDisabled ? EagerListing : LazyListing

export declare const Listing: (new (init: ModelInit<Listing, ListingMetaData>) => Listing) & {
  copyOf(source: Listing, mutator: (draft: MutableModel<Listing, ListingMetaData>) => MutableModel<Listing, ListingMetaData> | void): Listing;
}

type EagerItemsCompatibility = {
  readonly id: string;
  readonly compatibilityList?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItemsCompatibility = {
  readonly id: string;
  readonly compatibilityList?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type ItemsCompatibility = LazyLoading extends LazyLoadingDisabled ? EagerItemsCompatibility : LazyItemsCompatibility

export declare const ItemsCompatibility: (new (init: ModelInit<ItemsCompatibility, ItemsCompatibilityMetaData>) => ItemsCompatibility) & {
  copyOf(source: ItemsCompatibility, mutator: (draft: MutableModel<ItemsCompatibility, ItemsCompatibilityMetaData>) => MutableModel<ItemsCompatibility, ItemsCompatibilityMetaData> | void): ItemsCompatibility;
}

type EagerEbayItems = {
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
}

type LazyEbayItems = {
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
  readonly ItemsCompatibilities: AsyncItem<ItemsCompatibility | undefined>;
  readonly shippingProfileID?: string | null;
  readonly returnProfileID?: string | null;
  readonly paymentProfileID?: string | null;
  readonly ebayMotors?: boolean | null;
  readonly Products: AsyncItem<Products | undefined>;
  readonly itemsSpecifics?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly ebayItemsItemsCompatibilitiesId?: string | null;
}

export declare type EbayItems = LazyLoading extends LazyLoadingDisabled ? EagerEbayItems : LazyEbayItems

export declare const EbayItems: (new (init: ModelInit<EbayItems, EbayItemsMetaData>) => EbayItems) & {
  copyOf(source: EbayItems, mutator: (draft: MutableModel<EbayItems, EbayItemsMetaData>) => MutableModel<EbayItems, EbayItemsMetaData> | void): EbayItems;
}

type EagerProducts = {
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
}

type LazyProducts = {
  readonly id: string;
  readonly title?: string | null;
  readonly accountsID: string;
  readonly brandsID: string;
  readonly InventoryLocations: AsyncCollection<InventoryLocations>;
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
  readonly EbayItems: AsyncItem<EbayItems | undefined>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly productsEbayItemsId?: string | null;
}

export declare type Products = LazyLoading extends LazyLoadingDisabled ? EagerProducts : LazyProducts

export declare const Products: (new (init: ModelInit<Products, ProductsMetaData>) => Products) & {
  copyOf(source: Products, mutator: (draft: MutableModel<Products, ProductsMetaData>) => MutableModel<Products, ProductsMetaData> | void): Products;
}

type EagerInventoryLocations = {
  readonly id: string;
  readonly quantity?: number | null;
  readonly productsID: string;
  readonly locationsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyInventoryLocations = {
  readonly id: string;
  readonly quantity?: number | null;
  readonly productsID: string;
  readonly locationsID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type InventoryLocations = LazyLoading extends LazyLoadingDisabled ? EagerInventoryLocations : LazyInventoryLocations

export declare const InventoryLocations: (new (init: ModelInit<InventoryLocations, InventoryLocationsMetaData>) => InventoryLocations) & {
  copyOf(source: InventoryLocations, mutator: (draft: MutableModel<InventoryLocations, InventoryLocationsMetaData>) => MutableModel<InventoryLocations, InventoryLocationsMetaData> | void): InventoryLocations;
}

type EagerBrands = {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly Products?: (Products | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyBrands = {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly Products: AsyncCollection<Products>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Brands = LazyLoading extends LazyLoadingDisabled ? EagerBrands : LazyBrands

export declare const Brands: (new (init: ModelInit<Brands, BrandsMetaData>) => Brands) & {
  copyOf(source: Brands, mutator: (draft: MutableModel<Brands, BrandsMetaData>) => MutableModel<Brands, BrandsMetaData> | void): Brands;
}

type EagerLocations = {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly InventoryLocations?: (InventoryLocations | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyLocations = {
  readonly id: string;
  readonly name?: string | null;
  readonly accountsID: string;
  readonly InventoryLocations: AsyncCollection<InventoryLocations>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Locations = LazyLoading extends LazyLoadingDisabled ? EagerLocations : LazyLocations

export declare const Locations: (new (init: ModelInit<Locations, LocationsMetaData>) => Locations) & {
  copyOf(source: Locations, mutator: (draft: MutableModel<Locations, LocationsMetaData>) => MutableModel<Locations, LocationsMetaData> | void): Locations;
}

type EagerEbayOrders = {
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEbayOrders = {
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
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EbayOrders = LazyLoading extends LazyLoadingDisabled ? EagerEbayOrders : LazyEbayOrders

export declare const EbayOrders: (new (init: ModelInit<EbayOrders, EbayOrdersMetaData>) => EbayOrders) & {
  copyOf(source: EbayOrders, mutator: (draft: MutableModel<EbayOrders, EbayOrdersMetaData>) => MutableModel<EbayOrders, EbayOrdersMetaData> | void): EbayOrders;
}

type EagerAccounts = {
  readonly id: string;
  readonly isNewAccount?: boolean | null;
  readonly plan?: Plans | keyof typeof Plans | null;
  readonly EbayOrders?: (EbayOrders | null)[] | null;
  readonly Locations?: (Locations | null)[] | null;
  readonly Brands?: (Brands | null)[] | null;
  readonly Products?: (Products | null)[] | null;
  readonly Listings?: (Listing | null)[] | null;
  readonly ebayAccountId?: string | null;
  readonly postalCode?: string | null;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyAccounts = {
  readonly id: string;
  readonly isNewAccount?: boolean | null;
  readonly plan?: Plans | keyof typeof Plans | null;
  readonly EbayOrders: AsyncCollection<EbayOrders>;
  readonly Locations: AsyncCollection<Locations>;
  readonly Brands: AsyncCollection<Brands>;
  readonly Products: AsyncCollection<Products>;
  readonly Listings: AsyncCollection<Listing>;
  readonly ebayAccountId?: string | null;
  readonly postalCode?: string | null;
  readonly username?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Accounts = LazyLoading extends LazyLoadingDisabled ? EagerAccounts : LazyAccounts

export declare const Accounts: (new (init: ModelInit<Accounts, AccountsMetaData>) => Accounts) & {
  copyOf(source: Accounts, mutator: (draft: MutableModel<Accounts, AccountsMetaData>) => MutableModel<Accounts, AccountsMetaData> | void): Accounts;
}

type EagerEbayAccounts = {
  readonly id: string;
  readonly name?: string | null;
  readonly accessTokenUAT?: string | null;
  readonly expiresInUAT?: number | null;
  readonly refreshTokenUAT?: string | null;
  readonly refreshTokenExpiresInUAT?: number | null;
  readonly refreshTokenExpirationDate?: string | null;
  readonly tokenTypeUAT?: string | null;
  readonly returnPolicy?: string | null;
  readonly postalCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyEbayAccounts = {
  readonly id: string;
  readonly name?: string | null;
  readonly accessTokenUAT?: string | null;
  readonly expiresInUAT?: number | null;
  readonly refreshTokenUAT?: string | null;
  readonly refreshTokenExpiresInUAT?: number | null;
  readonly refreshTokenExpirationDate?: string | null;
  readonly tokenTypeUAT?: string | null;
  readonly returnPolicy?: string | null;
  readonly postalCode?: string | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type EbayAccounts = LazyLoading extends LazyLoadingDisabled ? EagerEbayAccounts : LazyEbayAccounts

export declare const EbayAccounts: (new (init: ModelInit<EbayAccounts, EbayAccountsMetaData>) => EbayAccounts) & {
  copyOf(source: EbayAccounts, mutator: (draft: MutableModel<EbayAccounts, EbayAccountsMetaData>) => MutableModel<EbayAccounts, EbayAccountsMetaData> | void): EbayAccounts;
}