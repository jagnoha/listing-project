/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createListing = /* GraphQL */ `
  mutation CreateListing(
    $input: CreateListingInput!
    $condition: ModelListingConditionInput
  ) {
    createListing(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const updateListing = /* GraphQL */ `
  mutation UpdateListing(
    $input: UpdateListingInput!
    $condition: ModelListingConditionInput
  ) {
    updateListing(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const deleteListing = /* GraphQL */ `
  mutation DeleteListing(
    $input: DeleteListingInput!
    $condition: ModelListingConditionInput
  ) {
    deleteListing(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      listingItemsCompatibilityId
    }
  }
`;
export const createItemsCompatibility = /* GraphQL */ `
  mutation CreateItemsCompatibility(
    $input: CreateItemsCompatibilityInput!
    $condition: ModelItemsCompatibilityConditionInput
  ) {
    createItemsCompatibility(input: $input, condition: $condition) {
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
export const updateItemsCompatibility = /* GraphQL */ `
  mutation UpdateItemsCompatibility(
    $input: UpdateItemsCompatibilityInput!
    $condition: ModelItemsCompatibilityConditionInput
  ) {
    updateItemsCompatibility(input: $input, condition: $condition) {
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
export const deleteItemsCompatibility = /* GraphQL */ `
  mutation DeleteItemsCompatibility(
    $input: DeleteItemsCompatibilityInput!
    $condition: ModelItemsCompatibilityConditionInput
  ) {
    deleteItemsCompatibility(input: $input, condition: $condition) {
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
export const createAccounts = /* GraphQL */ `
  mutation CreateAccounts(
    $input: CreateAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    createAccounts(input: $input, condition: $condition) {
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
export const updateAccounts = /* GraphQL */ `
  mutation UpdateAccounts(
    $input: UpdateAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    updateAccounts(input: $input, condition: $condition) {
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
export const deleteAccounts = /* GraphQL */ `
  mutation DeleteAccounts(
    $input: DeleteAccountsInput!
    $condition: ModelAccountsConditionInput
  ) {
    deleteAccounts(input: $input, condition: $condition) {
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
export const createEbayAccounts = /* GraphQL */ `
  mutation CreateEbayAccounts(
    $input: CreateEbayAccountsInput!
    $condition: ModelEbayAccountsConditionInput
  ) {
    createEbayAccounts(input: $input, condition: $condition) {
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
export const updateEbayAccounts = /* GraphQL */ `
  mutation UpdateEbayAccounts(
    $input: UpdateEbayAccountsInput!
    $condition: ModelEbayAccountsConditionInput
  ) {
    updateEbayAccounts(input: $input, condition: $condition) {
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
export const deleteEbayAccounts = /* GraphQL */ `
  mutation DeleteEbayAccounts(
    $input: DeleteEbayAccountsInput!
    $condition: ModelEbayAccountsConditionInput
  ) {
    deleteEbayAccounts(input: $input, condition: $condition) {
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
