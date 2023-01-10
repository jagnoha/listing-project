import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncItem, AsyncCollection } from "@aws-amplify/datastore";

export enum ListingType {
  CLOTHING = "CLOTHING",
  SHOES = "SHOES",
  AUTOPARTS = "AUTOPARTS",
  OTHER = "OTHER",
  BOOKS = "BOOKS"
}

export enum Plans {
  PERSONAL = "PERSONAL",
  PROFESSIONAL = "PROFESSIONAL"
}

type ListingMetaData = {
  readOnlyFields: 'updatedAt';
}

type ItemsCompatibilityMetaData = {
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
  readonly height?: number | null;
  readonly weightMayor?: number | null;
  readonly quantity?: number | null;
  readonly lot?: number | null;
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
  readonly conditionName?: string | null;
  readonly isReadyToGo?: boolean | null;
  readonly barcodeValue?: string | null;
  readonly categoryFeatures?: string | null;
  readonly weightMinor?: number | null;
  readonly isChangedAspects?: boolean | null;
  readonly photoLabelExtra?: string | null;
  readonly modelType: string;
  readonly createdAt: string;
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
  readonly height?: number | null;
  readonly weightMayor?: number | null;
  readonly quantity?: number | null;
  readonly lot?: number | null;
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
  readonly conditionName?: string | null;
  readonly isReadyToGo?: boolean | null;
  readonly barcodeValue?: string | null;
  readonly categoryFeatures?: string | null;
  readonly weightMinor?: number | null;
  readonly isChangedAspects?: boolean | null;
  readonly photoLabelExtra?: string | null;
  readonly modelType: string;
  readonly createdAt: string;
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

type EagerAccounts = {
  readonly id: string;
  readonly isNewAccount?: boolean | null;
  readonly plan?: Plans | keyof typeof Plans | null;
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