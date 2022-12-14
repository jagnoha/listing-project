/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getListing = /* GraphQL */ `
  query GetListing($id: ID!) {
    getListing(id: $id) {
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
export const listListings = /* GraphQL */ `
  query ListListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listListings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncListings = /* GraphQL */ `
  query SyncListings(
    $filter: ModelListingFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncListings(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const getItemsCompatibility = /* GraphQL */ `
  query GetItemsCompatibility($id: ID!) {
    getItemsCompatibility(id: $id) {
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
export const listItemsCompatibilities = /* GraphQL */ `
  query ListItemsCompatibilities(
    $filter: ModelItemsCompatibilityFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listItemsCompatibilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        compatibilityList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncItemsCompatibilities = /* GraphQL */ `
  query SyncItemsCompatibilities(
    $filter: ModelItemsCompatibilityFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncItemsCompatibilities(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        compatibilityList
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getAccounts = /* GraphQL */ `
  query GetAccounts($id: ID!) {
    getAccounts(id: $id) {
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
export const listAccounts = /* GraphQL */ `
  query ListAccounts(
    $filter: ModelAccountsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isNewAccount
        plan
        ebayAccountId
        postalCode
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncAccounts = /* GraphQL */ `
  query SyncAccounts(
    $filter: ModelAccountsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        isNewAccount
        plan
        ebayAccountId
        postalCode
        username
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getEbayAccounts = /* GraphQL */ `
  query GetEbayAccounts($id: ID!) {
    getEbayAccounts(id: $id) {
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
export const listEbayAccounts = /* GraphQL */ `
  query ListEbayAccounts(
    $filter: ModelEbayAccountsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEbayAccounts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncEbayAccounts = /* GraphQL */ `
  query SyncEbayAccounts(
    $filter: ModelEbayAccountsFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncEbayAccounts(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
