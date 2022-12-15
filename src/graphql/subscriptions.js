/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateListing = /* GraphQL */ `
  subscription OnCreateListing($filter: ModelSubscriptionListingFilterInput) {
    onCreateListing(filter: $filter) {
      id
      title
      description
      price
      categoryID
      shippingProfileID
      returnProfileID
      paymentProfileID
      ebayMotors
      itemsSpecifics
      manufacturerPartNumber
      interchangePartNumber
      otherPartNumber
      UPC
      EAN
      ISBN
      conditionCode
      conditionDescription
      length
      width
      height
      weightMayor
      quantity
      sku
      isDraft
      brand
      accountsID
      ItemsCompatibility {
        id
        compatibilityList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      type
      categoryList
      photoMain
      photoLabel
      photos
      lastStep
      conditionName
      isReadyToGo
      barcodeValue
      categoryFeatures
      weightMinor
      isChangedAspects
      photoLabelExtra
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const onUpdateListing = /* GraphQL */ `
  subscription OnUpdateListing($filter: ModelSubscriptionListingFilterInput) {
    onUpdateListing(filter: $filter) {
      id
      title
      description
      price
      categoryID
      shippingProfileID
      returnProfileID
      paymentProfileID
      ebayMotors
      itemsSpecifics
      manufacturerPartNumber
      interchangePartNumber
      otherPartNumber
      UPC
      EAN
      ISBN
      conditionCode
      conditionDescription
      length
      width
      height
      weightMayor
      quantity
      sku
      isDraft
      brand
      accountsID
      ItemsCompatibility {
        id
        compatibilityList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      type
      categoryList
      photoMain
      photoLabel
      photos
      lastStep
      conditionName
      isReadyToGo
      barcodeValue
      categoryFeatures
      weightMinor
      isChangedAspects
      photoLabelExtra
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const onDeleteListing = /* GraphQL */ `
  subscription OnDeleteListing($filter: ModelSubscriptionListingFilterInput) {
    onDeleteListing(filter: $filter) {
      id
      title
      description
      price
      categoryID
      shippingProfileID
      returnProfileID
      paymentProfileID
      ebayMotors
      itemsSpecifics
      manufacturerPartNumber
      interchangePartNumber
      otherPartNumber
      UPC
      EAN
      ISBN
      conditionCode
      conditionDescription
      length
      width
      height
      weightMayor
      quantity
      sku
      isDraft
      brand
      accountsID
      ItemsCompatibility {
        id
        compatibilityList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      type
      categoryList
      photoMain
      photoLabel
      photos
      lastStep
      conditionName
      isReadyToGo
      barcodeValue
      categoryFeatures
      weightMinor
      isChangedAspects
      photoLabelExtra
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const onCreateItemsCompatibility = /* GraphQL */ `
  subscription OnCreateItemsCompatibility(
    $filter: ModelSubscriptionItemsCompatibilityFilterInput
  ) {
    onCreateItemsCompatibility(filter: $filter) {
      id
      compatibilityList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateItemsCompatibility = /* GraphQL */ `
  subscription OnUpdateItemsCompatibility(
    $filter: ModelSubscriptionItemsCompatibilityFilterInput
  ) {
    onUpdateItemsCompatibility(filter: $filter) {
      id
      compatibilityList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteItemsCompatibility = /* GraphQL */ `
  subscription OnDeleteItemsCompatibility(
    $filter: ModelSubscriptionItemsCompatibilityFilterInput
  ) {
    onDeleteItemsCompatibility(filter: $filter) {
      id
      compatibilityList
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateAccounts = /* GraphQL */ `
  subscription OnCreateAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onCreateAccounts(filter: $filter) {
      id
      isNewAccount
      plan
      Listings {
        nextToken
        startedAt
      }
      ebayAccountId
      postalCode
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateAccounts = /* GraphQL */ `
  subscription OnUpdateAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onUpdateAccounts(filter: $filter) {
      id
      isNewAccount
      plan
      Listings {
        nextToken
        startedAt
      }
      ebayAccountId
      postalCode
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteAccounts = /* GraphQL */ `
  subscription OnDeleteAccounts($filter: ModelSubscriptionAccountsFilterInput) {
    onDeleteAccounts(filter: $filter) {
      id
      isNewAccount
      plan
      Listings {
        nextToken
        startedAt
      }
      ebayAccountId
      postalCode
      username
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onCreateEbayAccounts = /* GraphQL */ `
  subscription OnCreateEbayAccounts(
    $filter: ModelSubscriptionEbayAccountsFilterInput
  ) {
    onCreateEbayAccounts(filter: $filter) {
      id
      name
      accessTokenUAT
      expiresInUAT
      refreshTokenUAT
      refreshTokenExpiresInUAT
      refreshTokenExpirationDate
      tokenTypeUAT
      returnPolicy
      postalCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onUpdateEbayAccounts = /* GraphQL */ `
  subscription OnUpdateEbayAccounts(
    $filter: ModelSubscriptionEbayAccountsFilterInput
  ) {
    onUpdateEbayAccounts(filter: $filter) {
      id
      name
      accessTokenUAT
      expiresInUAT
      refreshTokenUAT
      refreshTokenExpiresInUAT
      refreshTokenExpirationDate
      tokenTypeUAT
      returnPolicy
      postalCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
export const onDeleteEbayAccounts = /* GraphQL */ `
  subscription OnDeleteEbayAccounts(
    $filter: ModelSubscriptionEbayAccountsFilterInput
  ) {
    onDeleteEbayAccounts(filter: $filter) {
      id
      name
      accessTokenUAT
      expiresInUAT
      refreshTokenUAT
      refreshTokenExpiresInUAT
      refreshTokenExpirationDate
      tokenTypeUAT
      returnPolicy
      postalCode
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
    }
  }
`;
