import React, { useState, useEffect, useRef } from 'react';
import {
  useTheme,
  Text,
  Dialog,
  Portal,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  Banner,
  ActivityIndicator,
} from 'react-native-paper';

import { ListingType } from '../src/models';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import urlImagesAtom from '../Store/atoms/urlImagesAtom';

import { encode } from 'html-entities';

import { Amplify, Storage, API, graphqlOperation } from 'aws-amplify';
import { Listing } from '../src/models';

import { useRecoilState } from 'recoil';
import axios from 'axios';

import { Pressable } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import {
  StyleSheet,
  View,
  Image,
  Platform,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import * as queries from '../src/graphql/queries';
import * as mutations from '../src/graphql/mutations';

import { useNavigation, useRoute } from '@react-navigation/native';

import userAccountAtom from '../Store/atoms/userAccountAtom';
import ebayUserAtom from '../Store/atoms/ebayUserAtom';

import fulfillmentPoliciesAtom from '../Store/atoms/fulfillmentPoliciesAtom';
import paymentPoliciesAtom from '../Store/atoms/paymentPoliciesAtom';
import returnPoliciesAtom from '../Store/atoms/returnPoliciesAtom';

import snackBarAtom from '../Store/atoms/snackBarAtom';

import listingsAtom from '../Store/atoms/listingsAtom';

import Header from './Header';
import SearchProduct from './CreateProductWizard/SearchProduct';
import PhotosSection from './CreateProductWizard/PhotosSection';
import BarcodeStage from './CreateProductWizard/BarcodeStage';
import CategoryStage from './CreateProductWizard/CategoryStage';
import ItemSpecificsStage from './CreateProductWizard/ItemSpecificsStage';
import ConditionStage from './CreateProductWizard/ConditionStage';
import DimensionStage from './CreateProductWizard/DimensionStage';
import PolicyStage from './CreateProductWizard/PolicyStage';
import PriceStage from './CreateProductWizard/PriceStage';

import TitleRevisionStage from './CreateProductWizard/TitleRevisionStage';

/*import awsmobile from '../src/aws-exports';
Amplify.configure(awsmobile);*/

export default function EditListingForm(props) {
  let cameraRef = useRef();

  const { listingId, type } = props.route.params;

  //console.log('TYPE: ', type);
  //const { listingId } = props.route.params;

  //const [type, setType] = useState();

  const [urlImages, setUrlImages] = useRecoilState(urlImagesAtom);

  const [hasCameraPermission, setHasCameraPermission] = useState();

  const [hasImagePickerPermission, setHasImagePickerPermission] = useState();

  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const [processingSelectedAspectValue, setProcessingSelectedAspectValue] =
    useState(false);

  const [processingSaveListing, setProcessingSaveListing] = useState(false);

  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);

  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);

  const [aspectValues, setAspectValues] = useState([]);

  const [processingPublishEbay, setProcessingPublishEbay] = useState(false);

  const [processingImage, setProcessingImage] = useState(false);

  const [isChangedAspects, setIsChangedAspects] = useState(false);

  const [letPriceListing, setLetPriceListing] = useState(true);

  const [priceProduct, setPriceProduct] = useState('0.00');

  const [quantity, setQuantity] = useState('1');

  const [fulfillmentPolicyId, setFulfillmentPolicyId] = useState('');
  const [paymentPolicyId, setPaymentPolicyId] = useState('');
  const [returnPolicyId, setReturnPolicyId] = useState('');

  const [fulfillmentPolicies, setFulfillmentPolicies] = useRecoilState(
    fulfillmentPoliciesAtom
  );
  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);
  const [returnPolicies, setReturnPolicies] =
    useRecoilState(returnPoliciesAtom);

  const [searchCategories, setSearchCategories] = useState('');
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photos, setPhotos] = useState([]);
  const [photoMain, setPhotoMain] = useState();
  const [photoLabel, setPhotoLabel] = useState();
  const [photoLabelExtra, setPhotoLabelExtra] = useState();
  const [barcodeValue, setBarcodeValue] = useState();
  const [categories, setCategories] = useState([]);

  const [brand, setBrand] = useState('');
  const [wordsFromLabel, setWordsFromLabel] = useState([]);

  const [istakePicMain, setIsTakePicMain] = useState(false);

  const [processingRemoveBackground, setProcessingRemoveBackground] =
    useState(false);
  const [processedRemoveBackground, setProcessedRemoveBackground] =
    useState(false);

  const [categoryFeatures, setCategoryFeatures] = useState();

  const [fetchPoliciesProcessing, setFetchPoliciesProcessing] = useState(false);

  const [processingPolicies, setProcessingPolicies] = useState(false);

  const [processingCategoryFeatures, setProcessingCategoryFeatures] =
    useState();

  const [checkedAllAspects, setCheckedAllAspects] = useState(false);

  const [listing, setListing] = useState(null);

  const [bestOffer, setBestOffer] = useState(false);

  const [processingPrices, setProcessingPrices] = useState(false);

  const [prices, setPrices] = useState([]);

  const [pricingList, setPricingList] = useState([]);

  const [length, setLength] = useState('6');
  const [height, setHeight] = useState('6');
  const [width, setWidth] = useState('6');
  const [weightMayor, setWeightMayor] = useState('0');
  const [weightMinor, setWeightMinor] = useState('6');

  const [lastStep, setLastStep] = useState(0);

  const [titleProcessed, setTitleProcessed] = useState('');

  const [descriptionProcessed, setDescriptionProcessed] = useState('');

  const [category, setCategory] = useState('');

  const [processingCategories, setProcessingCategories] = useState(false);

  const [aspects, setAspects] = useState([]);
  const [processingAspects, setProcessingAspects] = useState(false);

  const [openCamera, setOpenCamera] = useState(false);
  const [mainPhotoOpen, setMainPhotoOpen] = useState(false);
  const [labelPhotoOpen, setLabelPhotoOpen] = useState(false);
  const [labelPhotoOpenExtra, setLabelPhotoOpenExtra] = useState(false);
  const [morePhotosOpen, setMorePhotosOpen] = useState(false);
  const [editPhotoOpen, setEditPhotoOpen] = useState('');

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [openBackListingDialog, setOpenBackListingDialog] = useState(false);

  const [condition, setCondition] = useState('');

  const [conditionName, setConditionName] = useState('');

  const [conditionDescription, setConditionDescription] = useState('');

  const [barcodeOpen, setBarcodeOpen] = useState(false);

  const [listings, setListings] = useRecoilState(listingsAtom);

  //const [type, setType] = useState(null);

  const [initializingListing, setInitializingListing] = useState(false);

  //const [listPhotoOpen, setListPhotoOpen] = useState(0);

  const [step, setStep] = useState(1);

  const navigation = useNavigation();
  const route = useRoute();
  //const { title } = route.params;

  const titleHeader = `Edit Listing`;

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const imagePickerPermission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasImagePickerPermission(imagePickerPermission.status === 'granted');
    })();
  }, []);

  const processListing = (listing) => {
    try {
      setListing(listing);

      setPhotoMain(listing.photoMain);
      setPhotoLabel(listing.photoLabel);
      setPhotoLabelExtra(listing.photoLabelExtra);
      setPhotos(JSON.parse(listing.photos));
      setBarcodeValue(listing.barcodeValue);
      setCategories(JSON.parse(listing.categoryList));
      setAspects(JSON.parse(listing.itemsSpecifics));
      setCategory(listing.categoryID);

      const aspectList = JSON.parse(listing.itemsSpecifics).filter(
        (item) => item.require === true && item.value === ''
      );

      setCheckedAllAspects(aspectList.length > 0 ? false : true);

      setCondition(Number(listing.conditionCode));
      setConditionDescription(listing.conditionDescription);
      setConditionName(listing.conditionName);
      setLength(listing.length.toString());
      setHeight(listing.height.toString());
      setWidth(listing.width.toString());
      setWeightMayor(listing.weightMayor.toString());
      setWeightMinor(listing.weightMinor.toString());

      setIsChangedAspects(listing.isChangedAspects);
      //setType(listing.type.toLowerCase());

      console.log('TYPE: ', type);

      //setWeight(listing.weight.toString());

      setFulfillmentPolicyId(listing.shippingProfileID);
      setReturnPolicyId(listing.returnProfileID);
      setPaymentPolicyId(listing.paymentProfileID);
      setTitleProcessed(listing.title);
      setDescriptionProcessed(listing.description);
      setQuantity(listing.quantity.toString());
      setPriceProduct(listing.price.toString());
      setCategoryFeatures(JSON.parse(listing.categoryFeatures));

      setStep(step);
      setLastStep(listing.lastStep);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      (async () => {
        setInitializingListing(true);

        //console.log('ESTE ES EL ID DEL LISTING', listingId);

        const oneListing = await API.graphql({
          query: queries.getListing,
          variables: { id: listingId },
        });

        const listing = oneListing.data.getListing;

        console.log('LISTING: ', listing);

        //getCategoriesFeatures(listing.categoryID);

        setListing(listing);

        setPhotoMain(listing.photoMain);
        setPhotoLabel(listing.photoLabel);
        setPhotoLabelExtra(listing.photoLabelExtra);
        setPhotos(JSON.parse(listing.photos));
        setBarcodeValue(listing.barcodeValue);
        setCategories(JSON.parse(listing.categoryList));
        setAspects(JSON.parse(listing.itemsSpecifics));
        setCategory(listing.categoryID);

        const aspectList = JSON.parse(listing.itemsSpecifics).filter(
          (item) => item.require === true && item.value === ''
        );

        setCheckedAllAspects(aspectList.length > 0 ? false : true);

        setCondition(Number(listing.conditionCode));
        setConditionDescription(listing.conditionDescription);
        setConditionName(listing.conditionName);
        setLength(listing.length.toString());
        setHeight(listing.height.toString());
        setWidth(listing.width.toString());
        setWeightMayor(listing.weightMayor.toString());
        setWeightMinor(listing.weightMinor.toString());

        setIsChangedAspects(listing.isChangedAspects);
        //setType(listing.type.toLowerCase());

        console.log('TYPE: ', type);

        //setWeight(listing.weight.toString());

        setFulfillmentPolicyId(listing.shippingProfileID);
        setReturnPolicyId(listing.returnProfileID);
        setPaymentPolicyId(listing.paymentProfileID);
        setTitleProcessed(listing.title);
        setDescriptionProcessed(listing.description);
        setQuantity(listing.quantity.toString());
        setPriceProduct(listing.price.toString());
        setCategoryFeatures(JSON.parse(listing.categoryFeatures));

        setStep(listing.lastStep);
        setLastStep(listing.lastStep);

        //console.log(categoryFeatures);
        /*  console.log(listing.categoryID);
      if (categoryFeatures === 'undefined') {
        getCategoriesFeatures(Number(listing.categoryID));
      }*/

        /*if ( listing.categoryID) {
        getCategoriesFeatures(listing.categoryID);
      };*/

        setInitializingListing(false);

        //console.log(type);
      })();
    } catch (error) {
      console.log(error);
      setInitializingListing(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      //console.log(userAccount.postalCode);

      setFetchPoliciesProcessing(true);

      const responseFulfillment = await fetch(
        `https://listerfast.com/api/ebay/policies/fulfillment/${ebayUser}/0`
      );

      const responsePayment = await fetch(
        `https://listerfast.com/api/ebay/policies/payment/${ebayUser}/0`
      );

      const responseReturn = await fetch(
        `https://listerfast.com/api/ebay/policies/return/${ebayUser}/0`
      );

      const jsonFulfillment = await responseFulfillment.json();
      const jsonPayment = await responsePayment.json();
      const jsonReturn = await responseReturn.json();

      setFulfillmentPolicies(jsonFulfillment);
      setPaymentPolicies(jsonPayment);
      setReturnPolicies(jsonReturn);

      //console.log(fulfillmentPolicies);

      setFetchPoliciesProcessing(false);
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  } else if (!hasCameraPermission) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <Text style={{ textAlign: 'center' }}>
          Permission for camera not granted. Please change this in settings.
        </Text>
      </View>
    );
  }

  if (hasImagePickerPermission === undefined) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  } else if (!hasImagePickerPermission) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <Text style={{ textAlign: 'center' }}>
          Permission for media library not granted. Please change this in
          settings.
        </Text>
      </View>
    );
  }

  const getUPC = () => {
    if (
      categoryFeatures &&
      (categoryFeatures.Category.UPCEnabled === 'Required' ||
        categoryFeatures.Category.UPCEnabled === 'Enabled')
    ) {
      if (categoryFeatures.Category.UPCEnabled === 'Required') {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return 'Does Not Apply';
        }
      } else {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return null;
        }
      }
    }
    return null;
  };

  const onIsChangedAspects = (value) => {
    setIsChangedAspects(value);
  };

  const onLetPriceListing = (value) => {
    setLetPriceListing(value);
  };

  const getISBN = () => {
    if (
      categoryFeatures &&
      (categoryFeatures.Category.ISBNEnabled === 'Required' ||
        categoryFeatures.Category.ISBNEnabled === 'Enabled')
    ) {
      if (categoryFeatures.Category.ISBNEnabled === 'Required') {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return 'Does Not Apply';
        }
      } else {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return null;
        }
      }
    }
    return null;
  };

  const getEAN = () => {
    if (
      categoryFeatures &&
      (categoryFeatures.Category.EANEnabled === 'Required' ||
        categoryFeatures.Category.EANEnabled === 'Enabled')
    ) {
      if (categoryFeatures.Category.EANEnabled === 'Required') {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return 'Does Not Apply';
        }
      } else {
        if (barcodeValue) {
          return barcodeValue.data;
        } else {
          return null;
        }
      }
    }
    return null;
  };

  const updateListingDraft = async () => {
    try {
      console.log('Saving Listing');

      setProcessingSaveListing(true);

      console.log('LISTING ID!!! ', listingId);

      const id = listingId;

      const version = listing._version;

      const listingDetails = {
        id: id,
        sku: listing.sku,
        _version: version,
        modelType: 'Listing',
        accountsID: userAccount.id,
        title: titleProcessed,
        description: descriptionProcessed,
        price: priceProduct,
        itemsSpecifics: JSON.stringify(aspects),
        isDraft: true,
        type: ListingType[type.toUpperCase()],
        photoMain: photoMain,
        photoLabel: photoLabel,
        photoLabelExtra: photoLabelExtra,
        photos: JSON.stringify(photos),
        lastStep: lastStep,
        ebayMotors:
          ListingType[type.toUpperCase()] === 'AUTOPARTS' ? true : false,
        categoryID: category,
        categoryList: JSON.stringify(categories),
        shippingProfileID: fulfillmentPolicyId,
        returnProfileID: returnPolicyId,
        paymentProfileID: paymentPolicyId,
        conditionCode: condition,
        conditionDescription: conditionDescription,
        conditionName: conditionName,
        UPC: getUPC(),
        ISBN: getISBN(),
        EAN: getEAN(),
        barcodeValue: barcodeValue ? barcodeValue.data : null,
        length: length ? Number(length) : 6,
        width: width ? Number(width) : 6,
        height: height ? Number(height) : 6,
        weightMayor: weightMayor ? Number(weightMayor) : 0,
        weightMinor: weightMinor ? Number(weightMinor) : 6,
        quantity: quantity,
        isChangedAspects: isChangedAspects,
        isReadyToGo:
          quantity > 0 &&
          priceProduct > 0 &&
          checkedAllAspects &&
          !isChangedAspects
            ? true
            : false,
      };

      const newListing = await API.graphql({
        query: mutations.updateListing,
        variables: { input: listingDetails },
      });

      /*console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
      );
      console.log(listings);
      console.log(
        '*****************************************************************'
      );
      console.log(newListing);
      console.log(
        '*****************************************************************'
      );*/

      if (newListing) {
        //navigation.goBack();

        processListing(newListing.data.updateListing);
        setProcessingSaveListing(false);
        setSnackBar({ visible: true, text: 'Listing Saved' });
      }
    } catch (error) {
      setProcessingSaveListing(false);
      console.log(JSON.stringify(error));
    }
  };

  const updateListingDraftAndClose = async () => {
    try {
      console.log('Saving Listing');

      console.log('LISTING ID!!! ', listingId);

      const id = listingId;

      const version = listing._version;

      const listingDetails = {
        id: id,
        sku: listing.sku,
        _version: version,
        modelType: 'Listing',
        accountsID: userAccount.id,
        title: titleProcessed,
        description: descriptionProcessed,
        price: priceProduct,
        itemsSpecifics: JSON.stringify(aspects),
        isDraft: true,
        type: ListingType[type.toUpperCase()],
        photoMain: photoMain,
        photoLabel: photoLabel,
        photoLabelExtra: photoLabelExtra,
        photos: JSON.stringify(photos),
        lastStep: lastStep,
        ebayMotors:
          ListingType[type.toUpperCase()] === 'AUTOPARTS' ? true : false,
        categoryID: category,
        categoryList: JSON.stringify(categories),
        shippingProfileID: fulfillmentPolicyId,
        returnProfileID: returnPolicyId,
        paymentProfileID: paymentPolicyId,
        conditionCode: condition,
        conditionDescription: conditionDescription,
        conditionName: conditionName,
        UPC: getUPC(),
        ISBN: getISBN(),
        EAN: getEAN(),
        barcodeValue: barcodeValue ? barcodeValue.data : null,
        length: length ? Number(length) : 6,
        width: width ? Number(width) : 6,
        height: height ? Number(height) : 6,
        weightMayor: weightMayor ? Number(weightMayor) : 0,
        weightMinor: weightMinor ? Number(weightMinor) : 6,
        quantity: quantity,
        isChangedAspects: isChangedAspects,
        isReadyToGo:
          quantity > 0 &&
          priceProduct > 0 &&
          checkedAllAspects &&
          !isChangedAspects
            ? true
            : false,
      };

      const newListing = await API.graphql({
        query: mutations.updateListing,
        variables: { input: listingDetails },
      });

      /*console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
      );
      console.log(listings);
      console.log(
        '*****************************************************************'
      );
      console.log(newListing);
      console.log(
        '*****************************************************************'
      );*/

      if (newListing) {
        //navigation.goBack();

        //processListing(newListing.data.updateListing);
        onBack();

        setSnackBar({ visible: true, text: 'Listing Saved' });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const uploadImage = async (filename, img) => {
    return Storage.put(filename, img, {
      level: 'public',
      contentType: 'image/jpeg',
      /*progressCallback(progress) {
        setLoading(progress);
      },*/
    })
      .then((response) => {
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });
  };

  const fetchImageFromUri = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const handleImage = async (photoResult, nameFile) => {
    try {
      const img = await fetchImageFromUri(photoResult.uri);
      const uploadUrl = await uploadImage(nameFile, img);
      //console.log(uploadUrl);
      return uploadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const removeBackground = async () => {
    try {
      //console.log(photoMain);

      setProcessingRemoveBackground(true);

      const apiKey = 'acc_8b37536dc24d083';
      const apiSecret = '5bd5d7fe8b2beb3a56f4ee52cc00988d';

      let headers = {
        Authorization:
          'Basic ' +
          'YWNjXzhiMzc1MzZkYzI0ZDA4Mzo1YmQ1ZDdmZThiMmJlYjNhNTZmNGVlNTJjYzAwOTg4ZA==',
      };

      const urlAWS = `${urlImages}${photoMain}`;

      const imgProccesed = await axios.get(
        `https://api.imagga.com/v2/remove-background?image_url=${decodeURIComponent(
          urlAWS
        )}`,
        {
          username: apiKey,
          password: apiSecret,
          headers: headers,
          responseType: 'blob',
        }
      );

      let pngFileName = photoMain.split('jpg')[0] + 'png';

      console.log(pngFileName);

      const finalImage = await Storage.put(pngFileName, imgProccesed.data, {
        level: 'public',
        contentType: 'image/png',
      });

      console.log(finalImage);
      console.log(`${urlImages}${finalImage.key}`);

      setPhotoMain(finalImage.key);

      setProcessingRemoveBackground(false);

      setProcessedRemoveBackground(true);
    } catch (error) {
      console.log(error);
      setProcessingRemoveBackground(false);
      setProcessedRemoveBackground(false);
    }
  };

  const handleImageRemoveBackground = async (photoResult, nameFile) => {
    try {
      const img = await fetchImageFromUri(photoResult.uri);

      const apiKey = 'acc_8b37536dc24d083';
      const apiSecret = '5bd5d7fe8b2beb3a56f4ee52cc00988d';

      const imgProccesed = await axios.post(
        'https://api.imagga.com/v2/remove-background',
        {
          image: img,
          username: apiKey,
          password: apiSecret,
        }
      );

      const uploadUrl = await uploadImage(nameFile, imgProccesed);
      //console.log(uploadUrl);
      return uploadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const saveListingAndClose = async () => {
    try {
      await updateListingDraftAndClose();
    } catch (error) {
      console.log(error);
    }
  };

  const saveListing = async () => {
    try {
      //console.log('Saving Listing');
      await updateListingDraft();
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeProductPrice = (price) => {
    setPriceProduct(price.toString());
  };

  const onChangeQuantity = (quantity) => {
    setQuantity(quantity);
  };

  const getTypeProductCode = (typeName) => {
    if (typeName === 'autoparts') {
      return 1;
    }
    return 0;
  };

  const onChangeConditionDescription = async (value) => {
    setConditionDescription(value);
  };

  const getCategoryName = () => {
    const categoryName = categories.find(
      (item) => item.categoryId === category
    );

    return categoryName.title;
  };

  const fetchPolicies = async () => {
    setFetchPoliciesProcessing(true);

    const responseFulfillment = await fetch(
      `https://listerfast.com/api/ebay/policies/fulfillment/${ebayUser}/0`
    );

    const responsePayment = await fetch(
      `https://listerfast.com/api/ebay/policies/payment/${ebayUser}/0`
    );

    const responseReturn = await fetch(
      `https://listerfast.com/api/ebay/policies/return/${ebayUser}/0`
    );

    const jsonFulfillment = await responseFulfillment.json();
    const jsonPayment = await responsePayment.json();
    const jsonReturn = await responseReturn.json();

    setFulfillmentPolicies(jsonFulfillment);
    setPaymentPolicies(jsonPayment);
    setReturnPolicies(jsonReturn);

    setFetchPoliciesProcessing(false);
  };

  const getExtraAspectsValuesClothing = () => {
    let aspectList = aspects.map((item) => ({
      localizedAspectName: item.localizedAspectName,
      value: item.value,
      require: item.require,
    }));

    let require = aspectList.filter(
      (item) =>
        item.localizedAspectName !== 'Brand' &&
        item.localizedAspectName !== 'Size' &&
        item.localizedAspectName !== 'Style' &&
        item.localizedAspectName !== 'Size Type' &&
        item.localizedAspectName !== 'Color' &&
        item.localizedAspectName !== 'Type' &&
        item.localizedAspectName !== 'Department' &&
        item.localizedAspectName !== 'Vintage' &&
        item.localizedAspectName !== 'Model' &&
        item.localizedAspectName !== 'Product' &&
        item.localizedAspectName !== 'Pattern' &&
        item.localizedAspectName !== 'Fabric Wash' &&
        item.localizedAspectName !== 'Neckline' &&
        item.localizedAspectName !== 'Material' &&
        item.localizedAspectName !== 'Gender' &&
        item.localizedAspectName !== 'Fit' &&
        item.localizedAspectName !== 'Features' &&
        item.localizedAspectName !== 'US Shoe Size' &&
        item.localizedAspectName !== 'UK Shoe Size' &&
        item.localizedAspectName !== 'EU Shoe Size' &&
        item.localizedAspectName !== 'Inseam' &&
        item.localizedAspectName !== 'Waist Size' &&
        item.localizedAspectName !== 'Country/Region of Manufacture' &&
        item.localizedAspectName !== 'Manufacturer Part Number' &&
        item.localizedAspectName !== 'MPN' &&
        item.localizedAspectName !== 'OE/OEM Part Number' &&
        item.localizedAspectName !== 'Number of Pieces'
    );

    let values = require.map((item) => {
      if (item.value === 'Yes') {
        return item.localizedAspectName;
      }

      if (item.value === 'No') {
        return '';
      }

      return item.value;
    });

    return values;
  };

  const getImportantAspectsValues = () => {
    const brand = aspects.find((item) => item.localizedAspectName === 'Brand');
    const manufacturerPartNumber = aspects.find(
      (item) => item.localizedAspectName === 'Manufacturer Part Number'
    );

    const MPN = aspects.find((item) => item.localizedAspectName === 'MPN');

    const OEMPartNumber = aspects.find(
      (item) => item.localizedAspectName === 'OE/OEM Part Number'
    );

    const numberOfPieces = aspects.find(
      (item) => item.localizedAspectName === 'Number of Pieces'
    );

    const fabricWash = aspects.find(
      (item) => item.localizedAspectName === 'Fabric Wash'
    );

    const material = aspects.find(
      (item) => item.localizedAspectName === 'Material'
    );

    const pattern = aspects.find(
      (item) => item.localizedAspectName === 'Pattern'
    );
    const neckline = aspects.find(
      (item) => item.localizedAspectName === 'Neckline'
    );

    const size = aspects.find((item) => item.localizedAspectName === 'Size');
    const style = aspects.find((item) => item.localizedAspectName === 'Style');
    const sizeType = aspects.find(
      (item) => item.localizedAspectName === 'Size Type'
    );
    const color = aspects.find((item) => item.localizedAspectName === 'Color');
    const type = aspects.find((item) => item.localizedAspectName === 'Type');

    const product = aspects.find(
      (item) => item.localizedAspectName === 'Product'
    );

    const department = aspects.find(
      (item) => item.localizedAspectName === 'Department'
    );

    const gender = aspects.find(
      (item) => item.localizedAspectName === 'Gender'
    );

    const vintage = aspects.find(
      (item) => item.localizedAspectName === 'Vintage'
    );
    const model = aspects.find((item) => item.localizedAspectName === 'Model');

    const features = aspects.find(
      (item) => item.localizedAspectName === 'Features'
    );

    const fit = aspects.find((item) => item.localizedAspectName === 'Fit');

    const inseam = aspects.find(
      (item) => item.localizedAspectName === 'Inseam'
    );

    const waistSize = aspects.find(
      (item) => item.localizedAspectName === 'Waist Size'
    );

    const categoryNew = categories.find((item) => item.categoryId === category);

    const usShoeSize = aspects.find(
      (item) => item.localizedAspectName === 'US Shoe Size'
    );

    let importantAspects = {
      brand: brand ? (brand.value === 'Unbranded' ? '' : brand.value) : '',
      size: size ? size.value : '',
      style: style ? style.value : '',
      model: model ? model.value : '',
      sizeType: sizeType ? sizeType.value : '',
      type: type ? type.value : '',
      color: color ? color.value : '',
      product: product ? product.value : '',
      fabricWash: fabricWash ? fabricWash.value : '',
      pattern: pattern ? pattern.value : '',

      neckline: neckline ? neckline.value : '',

      material: material ? material.value : '',

      fit: fit ? fit.value : '',
      inseam: inseam ? inseam.value : '',
      waistSize: waistSize ? waistSize.value : '',

      department: department ? department.value : '',
      gender: gender ? gender.value : '',
      vintage: vintage ? (vintage.value === 'Yes' ? 'Vintage' : '') : '',
      model: model ? model.value : '',
      category: categoryNew.title,
      features: features ? features.value : '',

      usShoeSize: usShoeSize ? usShoeSize.value : '',
      manufacturerPartNumber: manufacturerPartNumber
        ? manufacturerPartNumber.value
        : '',
      MPN: MPN ? MPN.value : '',
      OEMPartNumber: OEMPartNumber ? OEMPartNumber.value : '',
      numberOfPieces: numberOfPieces ? numberOfPieces.value : '',
    };

    return importantAspects;
  };

  const onPublishEbay = async () => {
    try {
      setProcessingPublishEbay(true);

      let urlPost = 'https://listerfast.com/api/ebay/additem';

      let images = [];
      let pictureMain = `${urlImages}${photoMain}`;
      let pictureLabel = photoLabel ? `${urlImages}${photoLabel}` : [];
      let pictureLabelExtra = photoLabelExtra
        ? `${urlImages}${photoLabelExtra}`
        : [];
      let photosTemp = photos.map((item) => `${urlImages}${item.value}`);

      images = images.concat(
        pictureMain,
        photosTemp,
        pictureLabel,
        pictureLabelExtra
      );

      //console.log(images);

      const res = await axios.post(urlPost, {
        product: {
          SKU: listingId,
          bestOffer: checkBestOffer(),
          title: encode(titleProcessed),
          description: descriptionProcessed.split('\n').join('<br>'),
          primaryCategory: category,
          price: priceProduct,
          conditionID: condition,
          conditionDescription: conditionDescription,
          country: 'US',
          currency: 'USD',
          dispatchTimeMax: 1,
          listingDuration: 'GTC',
          listingType: 'FixedPriceItem',
          pictures: images,
          postalCode: `${userAccount.postalCode}`,
          quantity: Number(quantity),
          shippingProfileID: fulfillmentPolicyId,
          returnProfileID: returnPolicyId,
          paymentProfileID: paymentPolicyId,
          itemSpecifics: {
            NameValueList: aspects.map((item) => ({
              Name: item.localizedAspectName,
              Value: encode(item.value),
              Source: 'ItemSpecific',
            })),
          },

          weightMajor: Number(weightMayor),
          weightMinor: Number(weightMinor),
          packageDepth: Number(height),
          packageLength: Number(length),
          packageWidth: Number(width),
          siteID: ListingType[type.toUpperCase()] === 'AUTOPARTS' ? '100' : '0',
          site:
            ListingType[type.toUpperCase()] === 'AUTOPARTS'
              ? 'eBayMotors'
              : 'US',
          ebayAccountLinked: ebayUser,
        },
      });

      //console.log(res.data.result.Ack);

      if (res.data.result.Ack === 'Success') {
        console.log('Product Uploaded on eBay');
        saveItemOnline();
        setProcessingPublishEbay(false);
        navigation.goBack();
        setSnackBar({ visible: true, text: 'Listing published on eBay' });
      } else {
        console.log('Error con eBay!');
        console.log(JSON.stringify(res.data.result));
        setProcessingPublishEbay(false);
      }

      console.log('Publish on eBay!!!');
    } catch (error) {
      console.log(error);
      setProcessingPublishEbay(false);
    }
  };

  const onChangeTitle = (newTitle) => {
    setTitleProcessed(newTitle);
  };

  const onChangeDescription = (newDescription) => {
    setDescriptionProcessed(newDescription);
  };

  const processingDescription = async (title) => {
    //let pendingDescription = [];

    //const keywords = getImportantAspectsValues();
    let pendingDescription = `<h2>${encode(
      title
    )}</h2><h3>Condition</h3><p style={font-size: 1.2em}>${
      Array.isArray(categoryFeatures.conditions)
        ? categoryFeatures.conditions.find((item) => item.ID === condition)
            .DisplayName
        : categoryFeatures.conditions.DisplayName
    }</p> 
${conditionDescription.length > 0 ? `** ${conditionDescription} **` : ''}
<b>Additional Details:</b>    
`;
    let aspectsFil = aspects.filter((item) => item.value !== '');

    for (let itm of aspectsFil) {
      //console.log(itm.localizedAspectName + ': ' + itm.value + '\n');
      /*pendingDescription = pendingDescription.concat(
        itm.localizedAspectName + ': ' + itm.value + '\n'
      );*/

      pendingDescription = pendingDescription.concat(`
        <b>${itm.localizedAspectName}:</b> ${itm.value}`);
    }

    pendingDescription = pendingDescription.concat(
      '\n' +
        '<h3>Welcome to my store, it is a pleasure for me to assist you, if you need anything or have any questions do not hesitate to write me.</h3>'
    );

    setDescriptionProcessed(pendingDescription);
  };

  const checkBestOffer = () => {
    let policy = paymentPolicies.find((item) => item.id === paymentPolicyId);

    if (policy.name.includes('Immediate')) {
      return false;
    }

    return true;
  };

  const processingTitle = async () => {
    let pendingTitle = [];
    let shortPendingTitle = [];

    const keywords = getImportantAspectsValues();
    const extraAspects = getExtraAspectsValuesClothing().filter(
      (itm) => itm !== ''
    );

    console.log('EXTRA ASPECTS!!!: ', extraAspects);

    if (type === 'clothing') {
      // step 1

      pendingTitle.push(keywords['vintage']);
      shortPendingTitle.push(keywords['vintage']);

      let tempBrand = keywords['brand'].toUpperCase();
      let tempModel = keywords['model'].toUpperCase();

      if (!tempModel.includes(tempBrand)) {
        pendingTitle.push(keywords['brand']);
        shortPendingTitle.push(keywords['brand']);
      }

      pendingTitle.push(keywords['model']);
      shortPendingTitle.push(keywords['model']);

      pendingTitle.push(keywords['product']);
      shortPendingTitle.push(keywords['product']);

      if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(`${keywords['department']}`);
        shortPendingTitle.push(`${keywords['department']}`);
      }

      if (keywords['type'] === '') {
        if (
          keywords['category'].slice(keywords['category'].length - 2) === 'es'
        ) {
          pendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 2)
          );
          shortPendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 2)
          );
        } else {
          pendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 1)
          );
          shortPendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 1)
          );
        }
      } else if (!keywords['category'].includes(keywords['type'])) {
        if (
          keywords['category'].slice(keywords['category'].length - 2) === 'es'
        ) {
          pendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 2)
          );
          shortPendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 2)
          );
        } else {
          pendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 1)
          );
          shortPendingTitle.push(
            keywords['category'].slice(0, keywords['category'].length - 1)
          );
        }
      }

      pendingTitle.push(keywords['type']);
      shortPendingTitle.push(keywords['type']);
      pendingTitle.push(keywords['color']);
      shortPendingTitle.push(keywords['color']);
      pendingTitle.push(keywords['style']);
      shortPendingTitle.push(keywords['style']);

      pendingTitle.push(keywords['pattern']);
      shortPendingTitle.push(keywords['pattern']);

      pendingTitle.push(keywords['neckline']);
      shortPendingTitle.push(keywords['neckline']);

      if (keywords['material']){
      pendingTitle.push(
        keywords['material'].filter((item) => item !== 'Polyester')
      );


      shortPendingTitle.push(
        keywords['material'].filter((item) => item !== 'Polyester')
      );

      }

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      //console.log('Extra aspects: ', extraAspects.slice(0, 2));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      if (keywords['fit'] !== '') {
        if (keywords['fit'] !== 'Regular') {
          pendingTitle.push(`${keywords['fit']} Fit`);
          shortPendingTitle.push(`${keywords['fit']} Fit`);
        }
      }

      /*if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(keywords['department']);
        shortPendingTitle.push(keywords['department']);
      }*/

      pendingTitle.push(keywords['sizeType']);
      shortPendingTitle.push(keywords['sizeType']);

      if (keywords['inseam'] !== '' && Number(keywords['size'])) {
        pendingTitle.push(
          `Size ${keywords['size']}x${keywords['inseam'].split(' ')[0]}`
        );
        shortPendingTitle.push(
          `Size ${keywords['size']}x${keywords['inseam'].split(' ')[0]}`
        );
      } else if (keywords['size'] !== '') {
        pendingTitle.push(`Size ${keywords['size']}`);
        shortPendingTitle.push(`Size ${keywords['size']}`);
      }

      // Long Title processing

      let expandTitle = [];

      for (let item of pendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitle.push(checkItem.join(' '));
          //}
        } else {
          if (item !== '') {
            expandTitle.push(item);
          }
        }
      }

      let filtetedTitle = expandTitle.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      console.log('FILTETED!!!! ', filtetedTitle);
      

      // Short title processing

      let expandTitleShort = [];

      for (let item of shortPendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitleShort.push(checkItem.join(' '));
          //}
        } else {
          if (item !== '') {
            expandTitleShort.push(item);
          }
        }
      }

      let filtetedTitleShort = expandTitleShort.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitle = filtetedTitle
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .split(' ');

      uniqueFilteredTitle = [...new Set(uniqueFilteredTitle)].join(' ').replace(' Polyester', '').replace(',', ' ');

      let uniqueFilteredTitleShort = filtetedTitleShort
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .split(' ');

      uniqueFilteredTitleShort = [...new Set(uniqueFilteredTitleShort)].join(
        ' '
      ).replace(' Polyester', '').replace(',', ' ');

      //console.log('*********************************', uniqueFilteredTitle);

      if (uniqueFilteredTitle.trim().length <= 80) {
        setTitleProcessed(uniqueFilteredTitle.trim());
      } else {
        setTitleProcessed(uniqueFilteredTitleShort.trim());
      }

      processingDescription(uniqueFilteredTitle.trim());
    } else if (type === 'shoes') {
      pendingTitle.push(keywords['vintage']);
      shortPendingTitle.push(keywords['vintage']);

      let tempBrand = keywords['brand'].toUpperCase();
      let tempModel = keywords['model'].toUpperCase();

      if (!tempModel.includes(tempBrand)) {
        pendingTitle.push(keywords['brand']);
        shortPendingTitle.push(keywords['brand']);
      }

      pendingTitle.push(keywords['model']);
      shortPendingTitle.push(keywords['model']);

      /*if (keywords['type'] === '') {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      } else if (!keywords['category'].includes(keywords['type'])) {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      }*/

      pendingTitle.push(keywords['product']);
      shortPendingTitle.push(keywords['product']);

      if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(`${keywords['department']}`);
        shortPendingTitle.push(`${keywords['department']}`);
      }

      let tempType = keywords['type'].toUpperCase();

      if (!tempModel.includes(tempType)) {
        pendingTitle.push(keywords['type']);
        shortPendingTitle.push(keywords['type']);
      }

      /*pendingTitle.push(keywords['type']);
      shortPendingTitle.push(keywords['type']);*/

      pendingTitle.push(keywords['style']);
      shortPendingTitle.push(keywords['style']);

      pendingTitle.push(type);
      shortPendingTitle.push(type);

      pendingTitle.push(keywords['color']);
      shortPendingTitle.push(keywords['color']);

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      /*if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(keywords['department']);
        shortPendingTitle.push(keywords['department']);
      }*/

      pendingTitle.push(`Size ${keywords['usShoeSize']}`);
      shortPendingTitle.push(`Size ${keywords['usShoeSize']}`);

      // long title

      let expandTitle = [];

      for (let item of pendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitle.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitle.push(item);
          }
        }
      }

      let filtetedTitle = expandTitle.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      //console.log(filtetedTitle.join(' ').length);

      // short title

      let expandTitleShort = [];

      for (let item of shortPendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitleShort.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitleShort.push(item);
          }
        }
      }

      let filtetedTitleShort = expandTitleShort.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitle = filtetedTitle
        .join(' ').replace(',', ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .split(' ');

      uniqueFilteredTitle = [...new Set(uniqueFilteredTitle)].join(' ');

      let uniqueFilteredTitleShort = filtetedTitleShort
        .join(' ').replace(',', ' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        .split(' ');

      uniqueFilteredTitleShort = [...new Set(uniqueFilteredTitleShort)].join(
        ' '
      );

      //console.log('*********************************', uniqueFilteredTitle);

      if (uniqueFilteredTitle.trim().length <= 80) {
        setTitleProcessed(uniqueFilteredTitle.trim());
      } else {
        setTitleProcessed(uniqueFilteredTitleShort.trim());
      }

      processingDescription(uniqueFilteredTitle);
    } else if (type === 'autoparts') {
      pendingTitle.push(keywords['vintage']);
      shortPendingTitle.push(keywords['vintage']);

      let tempBrand = keywords['brand'].toUpperCase();
      let tempModel = keywords['model'].toUpperCase();

      if (!tempModel.includes(tempBrand)) {
        pendingTitle.push(keywords['brand']);
        shortPendingTitle.push(keywords['brand']);
      }

      pendingTitle.push(keywords['model']);
      shortPendingTitle.push(keywords['model']);

      if (keywords['type'] === '') {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      } else if (!keywords['category'].includes(keywords['type'])) {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      }

      pendingTitle.push(keywords['product']);
      shortPendingTitle.push(keywords['product']);

      pendingTitle.push(keywords['type']);
      shortPendingTitle.push(keywords['type']);

      pendingTitle.push(keywords['style']);
      shortPendingTitle.push(keywords['style']);

      pendingTitle.push(keywords['manufacturerPartNumber']);
      shortPendingTitle.push(keywords['manufacturerPartNumber']);

      pendingTitle.push(keywords['MPN']);
      shortPendingTitle.push(keywords['MPN']);

      /*pendingTitle.push(type);
      shortPendingTitle.push(type);*/

      pendingTitle.push(keywords['color']);
      shortPendingTitle.push(keywords['color']);

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      pendingTitle.push(keywords['OEMPartNumber']);
      shortPendingTitle.push(keywords['OEMPartNumber']);

      // long title

      let expandTitle = [];

      for (let item of pendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitle.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitle.push(item);
          }
        }
      }

      let filtetedTitle = expandTitle.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitle = filtetedTitle.join(' ').split(' ');
      uniqueFilteredTitle = [...new Set(uniqueFilteredTitle)];

      uniqueFilteredTitle = uniqueFilteredTitle
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      // short title

      let expandTitleShort = [];

      for (let item of shortPendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitleShort.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitleShort.push(item);
          }
        }
      }

      let filtetedTitleShort = expandTitleShort.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitleShort = filtetedTitleShort.join(' ').split(' ');
      uniqueFilteredTitleShort = [...new Set(uniqueFilteredTitleShort)];

      uniqueFilteredTitleShort = uniqueFilteredTitleShort
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      if (uniqueFilteredTitle.trim().length <= 80) {
        setTitleProcessed(uniqueFilteredTitle.trim());
      } else {
        setTitleProcessed(uniqueFilteredTitleShort.trim());
      }

      processingDescription(uniqueFilteredTitle);
    } else if (type === 'other') {
      pendingTitle.push(keywords['vintage']);
      shortPendingTitle.push(keywords['vintage']);

      let tempBrand = keywords['brand'].toUpperCase();
      let tempModel = keywords['model'].toUpperCase();

      if (!tempModel.includes(tempBrand)) {
        pendingTitle.push(keywords['brand']);
        shortPendingTitle.push(keywords['brand']);
      }

      pendingTitle.push(keywords['model']);
      shortPendingTitle.push(keywords['model']);

      pendingTitle.push(keywords['product']);
      shortPendingTitle.push(keywords['product']);

      pendingTitle.push(keywords['type']);
      shortPendingTitle.push(keywords['type']);

      pendingTitle.push(keywords['style']);
      shortPendingTitle.push(keywords['style']);

      pendingTitle.push(keywords['manufacturerPartNumber']);
      shortPendingTitle.push(keywords['manufacturerPartNumber']);

      pendingTitle.push(keywords['MPN']);
      shortPendingTitle.push(keywords['MPN']);

      /*pendingTitle.push(type);
      shortPendingTitle.push(type);*/

      pendingTitle.push(keywords['color']);
      shortPendingTitle.push(keywords['color']);

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      if (Number(keywords['numberOfPieces']) > 1) {
        pendingTitle.push(`${keywords['numberOfPieces']} PCS`);
        shortPendingTitle.push(`${keywords['numberOfPieces']} PCS`);
      }

      pendingTitle.push(keywords['OEMPartNumber']);
      shortPendingTitle.push(keywords['OEMPartNumber']);

      // long title

      let expandTitle = [];

      for (let item of pendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitle.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitle.push(item);
          }
        }
      }

      let filtetedTitle = expandTitle.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitle = filtetedTitle.join(' ').split(' ');
      uniqueFilteredTitle = [...new Set(uniqueFilteredTitle)];

      uniqueFilteredTitle = uniqueFilteredTitle
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      // short title

      let expandTitleShort = [];

      for (let item of shortPendingTitle) {
        if (Array.isArray(item)) {
          let checkItem = item[0].split(' ');
          checkItem.filter((chk) => !chk.includes(keywords['brand']));
          expandTitleShort.push(checkItem.join(' '));
        } else {
          if (item !== '') {
            expandTitleShort.push(item);
          }
        }
      }

      let filtetedTitleShort = expandTitleShort.filter(
        (item) => item !== '' && item !== 'Regular' && item !== 'Basic'
      );

      let uniqueFilteredTitleShort = filtetedTitleShort.join(' ').split(' ');
      uniqueFilteredTitleShort = [...new Set(uniqueFilteredTitleShort)];

      uniqueFilteredTitleShort = uniqueFilteredTitleShort
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      if (uniqueFilteredTitle.trim().length <= 80) {
        setTitleProcessed(uniqueFilteredTitle.trim());
      } else {
        setTitleProcessed(uniqueFilteredTitleShort.trim());
      }

      processingDescription(uniqueFilteredTitle);
    }
  };

  const onProcessingTitle = async () => {
    processingTitle();
  };

  const onClickPaymentPolicy = (value) => {
    setPaymentPolicyId(value);
  };

  const onClickReturnPolicy = (value) => {
    setReturnPolicyId(value);
  };

  const onClickFulfillmentPolicy = (value) => {
    setFulfillmentPolicyId(value);
  };

  const onChangeLength = async (value) => {
    setLength(value);
  };

  const onChangeWidth = async (value) => {
    setWidth(value);
  };

  const onChangeHeight = async (value) => {
    setHeight(value);
  };

  const onChangeWeight = async (value) => {
    setWeight(value);
  };

  const getCategoriesFeatures = async (categoryId) => {
    try {
      setProcessingCategoryFeatures(true);
      const response = await fetch(
        `https://listerfast.com/api/ebay/categoryfeatures/${ebayUser}/${categoryId}`
      );

      const json = await response.json();

      let result;

      if (json.Category.ConditionEnabled) {
        //console.log('conditions!');
        result = json;
        result.conditions = result.Category.ConditionValues.Condition;
      } else {
        //console.log('No conditions!');
        result = json;
        result.conditions = [
          {
            ID: 1000,
            DisplayName: 'New',
          },
          {
            ID: 1500,
            DisplayName: 'New other',
          },
          {
            ID: 2500,
            DisplayName: 'Remanufactured',
          },
          {
            ID: 3000,
            DisplayName: 'Used',
          },
          {
            ID: 7000,
            DisplayName: 'For parts or not working',
          },
        ];
      }

      setCategoryFeatures(result);
      setProcessingCategoryFeatures(false);
    } catch (error) {
      console.log(error);
      setProcessingCategoryFeatures(false);
    }
  };

  const onSelectedCondition = (conditionId, conditionName) => {
    setCondition(conditionId);
    setConditionName(conditionName);
    setIsChangedAspects(true);
    setLetPriceListing(true);
  };

  const getAspectValues = async (categoryId) => {
    try {
      setProcessingAspects(true);
      const response = await fetch(
        `https://listerfast.com/api/ebay/aspectsbycategory/${ebayUser}/${getTypeProductCode(
          type
        )}/${categoryId}`
      );

      const json = await response.json();

      let aspectValues = [];

      for (const item of json.filter(
        (item) => item.aspectConstraint.aspectUsage === 'RECOMMENDED'
      )) {
        if (
          item.localizedAspectName === 'Brand' ||
          item.localizedAspectName === 'Type' ||
          item.localizedAspectName === 'Manufacturer Part Number' ||
          item.localizedAspectName === 'Color' ||
          item.localizedAspectName === 'Placement on Vehicle' ||
          item.localizedAspectName === 'Connector Type' ||
          item.localizedAspectName === 'Model' ||
          item.localizedAspectName === 'Vintage' ||
          item.localizedAspectName === 'Format' ||
          item.localizedAspectName === 'Edition' ||
          item.localizedAspectName === 'Publication Year' ||
          item.localizedAspectName === 'MPN'
        ) {
          aspectValues.push({
            id: item.localizedAspectName,
            value: item.aspectValues
              ? item.aspectValues.map((value) => value.localizedValue)
              : [],
          });
          /*} else if (item.localizedAspectName === 'Brand') {
          aspectValues.push({
            id: item.localizedAspectName,
            value: [],
          });
        */
        } else {
          aspectValues.push({
            id: item.localizedAspectName,
            value: item.aspectValues
              ? item.aspectValues.map((value) => value.localizedValue)
              : [],
          });
        }

        setAspectValues(aspectValues);
        setProcessingAspects(false);
      }
    } catch (error) {
      console.log(error);
      setProcessingAspects(false);
    }
  };

  const getItemAspects = async (categoryId) => {
    try {
      setProcessingAspects(true);
      const response = await fetch(
        `https://listerfast.com/api/ebay/aspectsbycategory/${ebayUser}/${getTypeProductCode(
          type
        )}/${categoryId}`
      );

      const json = await response.json();

      /*const aspects = json.filter(item => item.aspectConstraint.aspectUsage === 'RECOMMENDED').map(itemProduct => {
            return (
              {
                localizedAspectName: itemProduct.localizedAspectName,
                aspectValues: itemProduct.aspectConstraint.aspectMode !== 'FREE_TEXT' || itemProduct.localizedAspectName === 'Type' ? itemProduct.aspectValues.map(value => value.localizedValue) : []                  
              }
            )
          })*/
      let n = 0;

      let aspectValues = [];

      const aspects = json
        .filter((item) => item.aspectConstraint.aspectUsage === 'RECOMMENDED')
        .map((itemProduct) => {
          n++;

          if (
            itemProduct.localizedAspectName === 'Type' ||
            itemProduct.localizedAspectName === 'Manufacturer Part Number' ||
            itemProduct.localizedAspectName === 'Color' ||
            itemProduct.localizedAspectName === 'Placement on Vehicle' ||
            itemProduct.localizedAspectName === 'Connector Type' ||
            itemProduct.localizedAspectName === 'Model' ||
            itemProduct.localizedAspectName === 'Vintage' ||
            itemProduct.localizedAspectName === 'Format' ||
            itemProduct.localizedAspectName === 'Edition' ||
            itemProduct.localizedAspectName === 'Publication Year' ||
            itemProduct.localizedAspectName === 'MPN'
          ) {
            aspectValues.push({
              id: itemProduct.localizedAspectName,
              value: itemProduct.aspectValues
                ? itemProduct.aspectValues.map((value) => value.localizedValue)
                : [],
            });

            return {
              localizedAspectName: itemProduct.localizedAspectName,
              /*aspectValues: itemProduct.aspectValues
                ? itemProduct.aspectValues.map((value) => value.localizedValue)
                : [],*/
              value: '',
              require: true,
              cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
              mode: itemProduct.aspectConstraint.aspectMode,
            };
          }

          if (itemProduct.localizedAspectName === 'Brand') {
            aspectValues.push({
              id: itemProduct.localizedAspectName,
              value: [],
            });
            return {
              localizedAspectName: itemProduct.localizedAspectName,
              //aspectValues: [],
              value: brand,
              require: true,
              cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
              mode: itemProduct.aspectConstraint.aspectMode,
            };
          }

          aspectValues.push({
            id: itemProduct.localizedAspectName,
            value: itemProduct.aspectValues
              ? itemProduct.aspectValues.map((value) => value.localizedValue)
              : [],
          });

          return {
            localizedAspectName: itemProduct.localizedAspectName,
            /*aspectValues: itemProduct.aspectValues
              ? itemProduct.aspectValues.map((value) => value.localizedValue)
              : [],*/
            value: '',
            require: itemProduct.aspectConstraint.aspectRequired ? true : false,
            cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
            mode: itemProduct.aspectConstraint.aspectMode,
          };
        });

      //console.log(aspects);
      setAspectValues(aspectValues);
      setAspects(aspects.sort((a, b) => b.require - a.require));
      setProcessingAspects(false);
    } catch (error) {
      console.log(error);
      setProcessingAspects(false);
    }
  };

  const onCheckAllAspects = async () => {
    try {
      const aspectList = aspects.filter(
        (item) => item.require === true && item.value === ''
      );

      setCheckedAllAspects(aspectList.length > 0 ? false : true);
    } catch (error) {
      console.log(error);
    }
  };

  const changeValueItemAspectBulk = async (items) => {
    //setProcessingSelectedAspectValue(true);
    setIsChangedAspects(true);

    let newAspects = [];
    for (let item of aspects) {
      let found = items.find((it) => it.itm === item.localizedAspectName);
      if (found) {
        newAspects.push({
          aspectValues: item.aspectValues,
          localizedAspectName: item.localizedAspectName,
          require: item.require,
          value: found.value,
          cardinality: item.cardinality,
          mode: item.mode,
        });
      } else {
        newAspects.push({
          aspectValues: item.aspectValues,
          localizedAspectName: item.localizedAspectName,
          require: item.require,
          value: item.value,
          cardinality: item.cardinality,
          mode: item.mode,
        });
      }
    }

    const aspectList = newAspects.filter(
      (item) => item.require === true && item.value === ''
    );

    setCheckedAllAspects(aspectList.length > 0 ? false : true);

    setAspects(newAspects);

    //setProcessingSelectedAspectValue(false);
  };

  const changeValueItemAspect = async (itm, value) => {
    //console.log(itm);
    //console.log(value);
    setProcessingSelectedAspectValue(true);
    setIsChangedAspects(true);
    setLetPriceListing(true);
    const newAspects = aspects.map((item) => {
      if (item.localizedAspectName === itm) {
        return {
          aspectValues: item.aspectValues,
          localizedAspectName: item.localizedAspectName,
          require: item.require,
          value: value,
          cardinality: item.cardinality,
          mode: item.mode,
        };
      }

      return item;
    });

    const aspectList = newAspects.filter(
      (item) => item.require === true && item.value === ''
    );

    setCheckedAllAspects(aspectList.length > 0 ? false : true);

    setAspects(newAspects);
    setProcessingSelectedAspectValue(false);
  };

  const getAvgPrice = (list) => {
    const n = list.length;
    let sum = 0;
    for (let item of list) {
      sum += item;
    }
    return sum / n;
  };

  const processPrices = async (items) => {
    if (items && items.itemSummaries) {
      let listingsAll = items.itemSummaries;

      let conditionListings = items.itemSummaries.filter(
        (item) => Number(item.conditionId) === Number(condition)
      );

      let listings = [];

      if (listingsAll) {
        if (conditionListings.length > 0) {
          listings = conditionListings;
        } else {
          listings = listingsAll;
        }

        setPricingList(
          listings
            .map((item) => ({
              itemId: item.itemId,
              title: item.title,
              image: item.thumbnailImages
                ? item.thumbnailImages[0].imageUrl
                : null,
              price: item.price.value,
              condition: item.condition,
              //freeShipping: 'No',
              freeShipping:
                item.shippingOptions && Array.isArray(item.shippingOptions)
                  ? item.shippingOptions[0] &&
                    item.shippingOptions[0].shippingCost &&
                    Number(item.shippingOptions[0].shippingCost.value) > 0
                    ? 'No'
                    : 'Yes'
                  : 'Yes',
            }))
            .slice(0, 25)
        );

        let prices = listings.map((item) => Number(item.price.value));

        let priceTitles = listings.map((item) => item.title);

        /*console.log(prices.length);

        console.log(prices);
        console.log(priceTitles);
        console.log('AVG Price: ', getAvgPrice(prices).toFixed(2));
        console.log('Minimum Price: ', prices[0]);*/

        setPrices([prices[0], getAvgPrice(prices).toFixed(2)]);
      } else {
        setPrices([]);
      }
    } else {
      setPrices([]);
    }
  };

  const getGooglePricesAgain = async () => {
    try {
      const isNew = condition === 1000 || condition === 1500 ? 'new' : 'used';

      let title = `${titleProcessed}`;

      if (barcodeValue) {
        title = barcodeValue; //title + ' ' + barcodeValue;
      }

      //const title = descriptionProcessed.split('<h2>')[1].split('</h2>')[0];

      //console.log('TITLE!!!!: ', title);

      //console.log('DESCRIPTION PROCESSED!!!: ', descriptionProcessed.split('<h2>')[1].split('</h2>')[0]);

      const urlGet = `https://listerfast.com/api/utils/searchprices/${title}/${isNew}`;

      //console.log(`TITULO: ${titleProcessed} ${conditionName}`);

      const prices = await axios.get(urlGet, { timeout: 1000 });

      const listings = prices.data;

      console.log(
        listings.map((item) => ({
          itemId: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          condition: isNew.toUpperCase(),
          shop: item.shop,

          //freeShipping: 'No',
          freeShipping: item.freeShipping ? 'Yes' : 'No',
        }))
      );

      setPricingList(
        listings.map((item) => ({
          itemId: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          condition: isNew.toUpperCase(),
          shop: item.shop,
          //freeShipping: 'No',
          freeShipping: item.freeShipping ? 'Yes' : 'No',
        }))
      );

      let pricesL = listings.map((item) => Number(item.price));

      setPrices([pricesL, getAvgPrice(pricesL).toFixed(2)]);

      setProcessingPrices(false);
      setLetPriceListing(false);
    } catch (error) {
      console.log(error);
      setProcessingPrices(false);
    }
  };

  const getGooglePrices = async () => {
    try {
      setProcessingPrices(true);
      const isNew = condition === 1000 || condition === 1500 ? 'new' : 'used';

      let title = `${titleProcessed}`;

      if (barcodeValue) {
        title = barcodeValue; //title + ' ' + barcodeValue;
      }

      //const title = descriptionProcessed.split('<h2>')[1].split('</h2>')[0];

      //console.log('TITLE!!!!: ', title);

      //console.log('DESCRIPTION PROCESSED!!!: ', descriptionProcessed.split('<h2>')[1].split('</h2>')[0]);

      const urlGet = `https://listerfast.com/api/utils/searchprices/${title}/${isNew}`;

      //console.log(`TITULO: ${titleProcessed} ${conditionName}`);

      const prices = await axios.get(urlGet, { timeout: 1000 });

      const listings = prices.data;

      console.log(
        listings.map((item) => ({
          itemId: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          condition: isNew.toUpperCase(),
          shop: item.shop,

          //freeShipping: 'No',
          freeShipping: item.freeShipping ? 'Yes' : 'No',
        }))
      );

      setPricingList(
        listings.map((item) => ({
          itemId: item.id,
          title: item.title,
          image: item.image,
          price: item.price,
          condition: isNew.toUpperCase(),
          shop: item.shop,
          //freeShipping: 'No',
          freeShipping: item.freeShipping ? 'Yes' : 'No',
        }))
      );

      let pricesL = listings.map((item) => Number(item.price));

      setPrices([pricesL, getAvgPrice(pricesL).toFixed(2)]);

      setProcessingPrices(false);
      setLetPriceListing(false);
    } catch (error) {
      console.log(error);
      getGooglePricesAgain();
    }
  };

  const getPrices = async () => {
    try {
      let pendingTitle = [];
      let shortPendingTitle = [];

      const keywords = getImportantAspectsValues();
      const extraAspects = getExtraAspectsValuesClothing().filter(
        (itm) => itm !== ''
      );

      setProcessingPrices(true);

      /*console.log('Get Prices!');
      console.log('Title: ', titleProcessed);
      console.log('Barcode: ', barcodeValue);
      console.log('Category: ', category);
      console.log('Condition: ', condition);*/

      let jsonResponse;

      if (barcodeValue) {
        const response = await fetch(
          `https://listerfast.com/api/ebay/search/${barcodeValue.data}/${category}/US/${userAccount.postalCode}/${condition}/${ebayUser}`
        );

        jsonResponse = await response.json();
        //console.log(barcodeValue.data);

        processPrices(jsonResponse);
      }

      if (
        !barcodeValue ||
        (barcodeValue && !(jsonResponse && jsonResponse.itemSummaries))
      ) {
        //if (!barcodeValue) {
        if (type === 'clothing') {
          let tempBrand = keywords['brand'].toUpperCase();
          let tempModel = keywords['model'].toUpperCase();

          if (!tempModel.includes(tempBrand)) {
            pendingTitle.push(keywords['brand']);
            shortPendingTitle.push(keywords['brand']);
          }

          pendingTitle.push(keywords['model']);
          shortPendingTitle.push(keywords['model']);

          if (keywords['type'] === '') {
            if (
              keywords['category'].slice(keywords['category'].length - 2) ===
              'es'
            ) {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
            } else {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
            }
          } else if (!keywords['category'].includes(keywords['type'])) {
            if (
              keywords['category'].slice(keywords['category'].length - 2) ===
              'es'
            ) {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
            } else {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
            }
          }

          pendingTitle.push(keywords['vintage']);

          shortPendingTitle.push(keywords['vintage']);

          pendingTitle.push(extraAspects.join(' '));

          if (keywords['fit'] !== '') {
            if (keywords['fit'] !== 'Regular') {
              pendingTitle.push(`${keywords['fit']} Fit`);
              shortPendingTitle.push(`${keywords['fit']} Fit`);
            }
          }

          if (keywords['fabricWash'] !== '') {
            pendingTitle.push(`${keywords['fabricWash']} Wash`);
            shortPendingTitle.push(`${keywords['fabricWash']} Wash`);
          }

          if (keywords['department'] === '') {
            pendingTitle.push(keywords['gender']);
          } else {
            pendingTitle.push(keywords['department']);
          }
        }
        if (type === 'shoes') {
          let tempBrand = keywords['brand'].toUpperCase();
          let tempModel = keywords['model'].toUpperCase();

          if (!tempModel.includes(tempBrand)) {
            pendingTitle.push(keywords['brand']);
            shortPendingTitle.push(keywords['brand']);
          }

          pendingTitle.push(keywords['model']);
          shortPendingTitle.push(keywords['model']);

          if (keywords['type'] === '') {
            if (
              keywords['category'].slice(keywords['category'].length - 2) ===
              'es'
            ) {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
            } else {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
            }
          } else if (!keywords['category'].includes(keywords['type'])) {
            if (
              keywords['category'].slice(keywords['category'].length - 2) ===
              'es'
            ) {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 2)
              );
            } else {
              pendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
              shortPendingTitle.push(
                keywords['category'].slice(0, keywords['category'].length - 1)
              );
            }
          }

          pendingTitle.push(keywords['vintage']);
          shortPendingTitle.push(keywords['vintage']);

          if (keywords['department'] === '') {
            pendingTitle.push(keywords['gender']);
            shortPendingTitle.push(keywords['gender']);
          } else {
            pendingTitle.push(keywords['department']);
            shortPendingTitle.push(keywords['department']);
          }
        }

        if (type === 'autoparts') {
          console.log(keywords);

          let tempBrand = keywords['brand'].toUpperCase();
          let tempModel = keywords['model'].toUpperCase();

          if (!tempModel.includes(tempBrand)) {
            pendingTitle.push(keywords['brand']);
            shortPendingTitle.push(keywords['brand']);
          }

          pendingTitle.push(keywords['model']);
          shortPendingTitle.push(keywords['model']);

          pendingTitle.push(keywords['type']);
          shortPendingTitle.push(keywords['type']);

          pendingTitle.push(keywords['manufacturerPartNumber']);
          shortPendingTitle.push(keywords['manufacturerPartNumber']);

          pendingTitle.push(keywords['OEMPartNumber']);
          shortPendingTitle.push(keywords['OEMPartNumber']);

          pendingTitle.push(keywords['vintage']);
          shortPendingTitle.push(keywords['vintage']);
        }

        if (type === 'other') {
          console.log(keywords);

          let tempBrand = keywords['brand'].toUpperCase();
          let tempModel = keywords['model'].toUpperCase();

          if (!tempModel.includes(tempBrand)) {
            pendingTitle.push(keywords['brand']);
            shortPendingTitle.push(keywords['brand']);
          }

          pendingTitle.push(keywords['model']);
          shortPendingTitle.push(keywords['model']);

          pendingTitle.push(keywords['type']);
          shortPendingTitle.push(keywords['type']);

          pendingTitle.push(keywords['manufacturerPartNumber']);
          shortPendingTitle.push(keywords['manufacturerPartNumber']);

          pendingTitle.push(keywords['OEMPartNumber']);
          shortPendingTitle.push(keywords['OEMPartNumber']);

          pendingTitle.push(keywords['vintage']);
          shortPendingTitle.push(keywords['vintage']);
        }

        const response = await fetch(
          `https://listerfast.com/api/ebay/search/${pendingTitle
            .join(' ')
            .replace(/[^a-zA-Z0-9 ]/g, '')}/${category}/US/${
            userAccount.postalCode
          }/[${condition}]/${ebayUser}`
        );

        const jsonResponse = await response.json();

        if (jsonResponse && jsonResponse.itemSummaries) {
          processPrices(jsonResponse);
        } else {
          const response = await fetch(
            `https://listerfast.com/api/ebay/search/${shortPendingTitle
              .join(' ')
              .replace(/[^a-zA-Z0-9 ]/g, '')}/${category}/US/${
              userAccount.postalCode
            }/[${condition}]/${ebayUser}`
          );

          const jsonResponse = await response.json();
          processPrices(jsonResponse);
        }
      }
      setProcessingPrices(false);
    } catch (error) {
      console.log(error);
      setProcessingPrices(false);
    }
  };

  //******************************************************** */

  //console.log('Aspects!: ');
  //console.log(aspects);

  //********************************************************* */

  const getPolicies = async () => {
    try {
      if (
        fulfillmentPolicies.length === 0 &&
        paymentPolicies.length === 0 &&
        returnPolicies.length === 0
      ) {
        setProcessingPolicies(true);

        const responseFulfillment = await fetch(
          `https://listerfast.com/api/ebay/policies/fulfillment/${ebayUser}/${getTypeProductCode(
            type
          )}`
        );

        const responsePayment = await fetch(
          `https://listerfast.com/api/ebay/policies/payment/${ebayUser}/${getTypeProductCode(
            type
          )}`
        );

        const responseReturn = await fetch(
          `https://listerfast.com/api/ebay/policies/return/${ebayUser}/${getTypeProductCode(
            type
          )}`
        );

        const jsonFulfillment = await responseFulfillment.json();
        const jsonPayment = await responsePayment.json();
        const jsonReturn = await responseReturn.json();

        setFulfillmentPolicies(jsonFulfillment);
        setPaymentPolicies(jsonPayment);
        setReturnPolicies(jsonReturn);

        //console.log(jsonFulfillment);
        setProcessingPolicies(false);
      }
    } catch (error) {
      setProcessingPolicies(false);
      console.log(error);
    }
  };

  const deleteLabelPicExtra = async () => {
    setLabelPhotoOpenExtra(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoLabelExtra(undefined);
  };

  const getCategoriesSearch = async (searchCategories) => {
    try {
      setProcessingCategories(true);

      /*const searchCategoriesLarge =
        type !== 'autoparts' && type !== 'others'
          ? `${searchCategories} ${type}`
          : searchCategories;*/

      const searchCategoriesLarge =
        type !== 'autoparts' && type !== 'others'
          ? `${searchCategories}`
          : searchCategories;

      console.log('SEARCH CATEGORIES: ', searchCategories);

      //console.log('Ebay User: ', ebayUser);

      //const searchCategoriesLarge = searchCategories;

      const response = await fetch(
        `https://listerfast.com/api/ebay/categorysuggestions/${ebayUser}/${getTypeProductCode(
          type
        )}/${searchCategoriesLarge}`
      );

      const json = await response.json();

      const categories = json.categorySuggestions.map((item) => {
        return {
          categoryId: item.category.categoryId,
          title: item.category.categoryName,
          subtitle: item.categoryTreeNodeAncestors[0].categoryName,
        };
      });

      setCategory('');
      setCategories(categories);
      //console.log(categories);
      setProcessingCategories(false);
    } catch (error) {
      setProcessingCategories(false);
      console.log(error);
    }
  };

  const getCategories = async () => {
    try {
      setProcessingCategories(true);

      const searchCategoriesLarge =
        type !== 'autoparts' && type !== 'others'
          ? `${searchCategories} ${type}`
          : searchCategories;

      //console.log('Ebay User: ', ebayUser);

      const response = await fetch(
        `https://listerfast.com/api/ebay/categorysuggestions/${ebayUser}/${getTypeProductCode(
          type
        )}/${searchCategoriesLarge}`
      );

      const json = await response.json();

      const categories = json.categorySuggestions.map((item) => {
        return {
          categoryId: item.category.categoryId,
          title: item.category.categoryName,
          subtitle: item.categoryTreeNodeAncestors[0].categoryName,
        };
      });

      setCategory('');
      setCategories(categories);
      //console.log(categories);
      setProcessingCategories(false);
    } catch (error) {
      setProcessingCategories(false);
      console.log(error);
    }
  };

  const onSelectedCategory = (id) => {
    setCheckedAllAspects(false);
    setCategory(id);
    getItemAspects(id);
    //setAspectValues([]);
    getCategoriesFeatures(id);
    forward();
  };

  let forward = async () => {
    setStep((old) => old + 1);

    if (step + 1 > lastStep) {
      setLastStep(step + 1);
      //console.log(step + 1);
    } else {
      console.log(lastStep);
    }
  };

  let backward = async () => {
    if (step > 1) {
      setStep((old) => old - 1);
      return true;
    }
    return false;
  };

  const goToStep = async (n) => {
    setStep(n);
  };

  let goToFirstStep = async () => {
    if (step > 1) {
      setStep(1);
      return true;
    }

    return false;
  };

  let goToListingDetails = async () => {
    if (step > 1) {
      setStep(4);
      return true;
    }

    return false;
  };

  const onMainPicIsTaken = async (value) => {
    setIsTakePicMain(value);
  };

  let takePicMain = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchCameraAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoMain(newPhotoAWS);
        setProcessedRemoveBackground(false);
        setOpenCamera(false);
        setMainPhotoOpen(false);

        setProcessingImage(false);

        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    /*console.log(type);
    console.log(data);*/
    //setBarcodeValue({ type, data });
    setBarcodeValue(data);

    setBarcodeOpen(false);
  };

  const deleteBarcodeValue = () => {
    setBarcodeValue();
  };

  const onOpenPreviewPhoto = (async = () => {
    //console.log('ADD NEW PHOTO!!!!');
    setOpenCamera(true);
    setMorePhotosOpen(true);
  });

  const onOpenEditPhoto = (async = (id) => {
    //console.log('EDIT PHOTO: ', id);
    setOpenCamera(true);
    setEditPhotoOpen(id);
  });

  const onOpenBarcode = (async = (value) => {
    setBarcodeOpen(value);
  });

  const takeNewPic = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchCameraAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotos((old) => [...old, { id: newPhotoAWS, value: newPhotoAWS }]);

        setMorePhotosOpen(false);
        setOpenCamera(false);
        setProcessingImage(false);
        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  let pickPicMain = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchImageLibraryAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //console.log(source);

      //console.log('Source: ', source);

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoMain(newPhotoAWS);
        setProcessedRemoveBackground(false);
        setOpenCamera(false);
        setMainPhotoOpen(false);
        setMainCameraOpen(false);
        onMainPicIsTaken(true);

        //if (istakePicMain){
        processImage(newPhotoAWS);
        //}

        setProcessingImage(false);

        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const pickNewPic = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchImageLibraryAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotos((old) => [...old, { id: newPhotoAWS, value: newPhotoAWS }]);

        setMorePhotosOpen(false);
        setOpenCamera(false);
        setProcessingImage(false);
        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const onDeleteItem = async () => {
    try {
      //console.log(listingId);
      setOpenDeleteDialog(true);
    } catch (error) {
      console.log(error);
    }
  };

  const saveItemOnline = async () => {
    try {
      const id = listingId;
      const version = listing._version;
      const listingDetails = {
        id: id,
        _version: version,
        isDraft: false,
      };

      const savedListing = await API.graphql({
        query: mutations.updateListing,
        variables: { input: listingDetails },
      });

      //console.log(savedListing);

      /*if (savedListing) {
        navigation.goBack();
        setSnackBar({ visible: true, text: 'Listing published on eBay' });
      }*/
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async () => {
    try {
      //console.log(listingId);

      console.log('Delete Listing');

      const id = listingId;

      const version = listing._version;

      const listingDetails = {
        id: id,
        _version: version,
      };

      const deletedListing = await API.graphql({
        query: mutations.deleteListing,
        variables: { input: listingDetails },
      });

      if (deletedListing) {
        navigation.goBack();
        setSnackBar({ visible: true, text: 'Listing Deleted' });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /*const processLabel = async () => {
    try {
      setProcessingSelectedAspectValue(true);
      console.log(photoLabel);

      const tagChecked = await fetch(
        `https://listerfast.com/api/utils/textfromimage/${photoLabel}`
      );

      const json = await tagChecked.json();
      let textDetections = json.TextDetections;

      checkLabel(textDetections);
      setProcessingSelectedAspectValue(false);
    } catch (error) {
      console.log(error);
      setProcessingSelectedAspectValue(false);
    }
  };*/

  const processLabel = async () => {
    try {
      setProcessingSelectedAspectValue(true);
      const tagChecked = await fetch(
        `https://listerfast.com/api/utils/textfromimage/${photoLabel}`
      );

      const json = await tagChecked.json();
      let textDetections = json.TextDetections;

      /*let tagCheckedExtra;
    let jsonExtra;
    let textDetectionsExtra;*/

      if (photoLabelExtra && photoLabelExtra !== '') {
        const tagCheckedExtra = await fetch(
          `https://listerfast.com/api/utils/textfromimage/${photoLabelExtra}`
        );

        let jsonExtra = await tagCheckedExtra.json();
        let textDetectionsExtra = jsonExtra.TextDetections;

        checkLabel(textDetections, textDetectionsExtra);
      } else {
        checkLabel(textDetections, []);
      }

      setProcessingSelectedAspectValue(false);
    } catch (error) {
      console.log(error);
      setProcessingSelectedAspectValue(false);
    }
  };

  const checkLabel = async (textDetections, textDetectionsExtra) => {
    try {
      //setProcessingSelectedAspectValue(true);

      /*console.log(
        'TEXT DETECTIONS: ',
        textDetections.concat(textDetectionsExtra)
      );*/

      const textListBrand = textDetections
        .filter((item) => item.Type === 'LINE')
        .map((item) => item.DetectedText.replace(/[^a-z0-9\s]/gi, ''));

      const wordsBrand = textDetections
        .filter((item) => item.Type === 'WORD')
        .map((item) => item.DetectedText.replace(/[^a-z0-9\s]/gi, ''));

      const textList = textDetections
        .concat(textDetectionsExtra)
        .filter((item) => item.Type === 'LINE')
        .map((item) => item.DetectedText.replace(/[^a-z0-9\s]/gi, ''));

      const words = textDetections
        .concat(textDetectionsExtra)
        .filter((item) => item.Type === 'WORD')
        .map((item) => item.DetectedText.replace(/[^a-z0-9\s]/gi, ''));

      /*const byBrand = textList.filter(
        (item) => item.includes('by') || item.includes('BY')
      );
      const brand =
        byBrand.length > 0 ? `${textList[0]} ${byBrand}` : textList[0];

      console.log(byBrand);

      setBrand(brand);

      console.log(brand);*/

      setWordsFromLabel(words);

      //console.log('WORDS: ', words);
      //console.log('TEXTLIST: ', textList);

      //console.log(setAspects);

      /*const material = textList
        .filter((item) => item.includes('%'))
        .map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        );*/

      /*const country = textList.find(
        (item) => item.includes('Made in') || item.includes('MADE IN')
      )
        ? textList
            .find(
              (item) => item.includes('Made in') || item.includes('MADE IN')
            )
            .toLowerCase()
            .split('made in')[1]
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        : '';*/

      /*const size = textList
        .filter((item) => item.includes('%'))
        .map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        );*/

      /*const sizes = aspectValues
        .find((itm) => itm.localizedAspectName === 'Size')
        .aspectValues.map((name) => name.toUpperCase());*/

      /*const countries = aspectValues.find(
        (itm) => itm.id === 'Country/Region of Manufacture'
      ).value;*/

      const checkedBrands = aspectValues.find((itm) => itm.id === 'Brand');

      const brands = checkedBrands ? checkedBrands.value : [];

      const checkedModels = aspectValues.find((itm) => itm.id === 'Model');

      //console.log('MODELS!!!: ', checkedModels);

      const models = checkedModels
        ? checkedModels.value.map((item) => item.toLowerCase())
        : [];

      const checkedCountries = aspectValues.find(
        (itm) => itm.id === 'Country/Region of Manufacture'
      );

      const countries = checkedCountries ? checkedCountries.value : [];

      //console.log(countries);

      let tempBrands = brands.map((item) => item.toLowerCase());

      let tempWordsBrand = wordsBrand.map((item) => item.toLowerCase());

      let tempWords = words.map((item) => item.toLowerCase());

      //console.log('BRANDS!!: ', brands );

      let tempTextList = textList.map((item) => item.toLowerCase());
      let tempTextListBrand = textListBrand.map((item) => item.toLowerCase());

      console.log('MODELS!!!: ', models);

      console.log('TEMP TEXT LIST: ', tempTextList);
      console.log('TEMP WORDS: ', tempWords);

      //console.log('TEMP WORDS: ', tempWords);

      //console.log('TEMP TEXT LIST: ', tempTextList);

      //const brand = brands.filter((x) => tempWords.includes(x.toLowerCase()));

      let brandListText = tempTextListBrand.filter((x) =>
        tempBrands.includes(x.toLowerCase())
      );

      let brandListWord = tempWordsBrand.filter((x) =>
        tempBrands.includes(x.toLowerCase())
      );

      let brand = brandListText[0];

      if (brandListText.length === 0 && brandListWord.length > 0) {
        brand = tempWordsBrand.filter((x) =>
          tempBrands.includes(x.toLowerCase())
        )[0];
      }

      if (brandListText.length === 0 && brandListWord.length === 0) {
        brand = tempTextListBrand[0];
      }

      /*if (brandList.length === 0) {
        brand = tempWordsBrand[0];
      }*/

      //let brand = tempTextListBrand[0];

      console.log('BRAND!: ', brand);

      brand = brand && brand.length > 1 ? brand : '';

      let modelList = models.filter((x) =>
        tempTextList.map((itm) => `${brand} ${itm}`).includes(x.toLowerCase())
      );

      console.log('MODEL LIST: ', modelList);

      let model = modelList[0];

      if (modelList.length === 0) {
        modelList = models.filter((x) =>
          tempWords.map((itm) => `${brand} ${itm}`).includes(x.toLowerCase())
        );
      }

      if (modelList.length === 0) {
        modelList = models.filter((x) =>
          tempTextList.includes(x.toLowerCase())
        );
      }

      if (modelList.length === 0) {
        modelList = models.filter((x) => tempWords.includes(x.toLowerCase()));
      }

      model = modelList.length > 0 ? modelList[0] : '';

      console.log('MODEL!: ', model);

      /*const model = tempTextList.filter((x) =>
        models.includes(x.toLowerCase())
      );*/

      const country = countries.filter((x) =>
        tempWords.includes(x.toLowerCase())
      );

      //console.log('COUNTRY: ', country);

      const checkedSizes = aspectValues.find((itm) => itm.id === 'Size');

      const sizes = checkedSizes ? checkedSizes.value : [];

      const size = sizes.filter((x) => words.includes(x));

      const checkedMaterials = aspectValues.find(
        (itm) => itm.id === 'Material'
      );

      const materials = checkedMaterials
        ? checkedMaterials.value.map((item) =>
            item
              .toLowerCase()
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          )
        : [];

      //console.log('MATERIALS: ', materials);

      const material = materials.filter((x) =>
        tempWords.includes(x.toLowerCase())
      );

      //console.log('MATERIAL: ', material);

      //console.log('SIZE: ', size);

      //console.log('Country: ', country);

      let batchProcess = [];

      if (brand !== '') {
        batchProcess.push({
          itm: 'Brand',
          value: brand.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          ),
        });
      }

      //console.log('MODEL!!!: ', model);
      //console.log('BRAND!!!: ', brand);

      if (model !== '') {
        batchProcess.push({
          itm: 'Model',
          value: model.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
            letter.toUpperCase()
          ),
        });
      }

      if (size.length > 0) {
        batchProcess.push({ itm: 'Size', value: size[0] });
      }

      if (material.length > 0) {
        batchProcess.push({ itm: 'Material', value: material });
      }

      //console.log('BATCHPROCESS: ', batchProcess);

      //console.log('TEXTLIST: ', textList);

      if (country.length > 0) {
        batchProcess.push({
          itm: 'Country/Region of Manufacture',
          value: country,
        });
      }

      changeValueItemAspectBulk(batchProcess);

      //console.log('Brand: ', brand);
      //setProcessingSelectedAspectValue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const checkLabel_OLD = async (textDetections, textDetectionsExtra) => {
    try {
      //setProcessingSelectedAspectValue(true);

      console.log(
        'TEXT DETECTIONS: ',
        textDetections.concat(textDetectionsExtra)
      );

      const textList = textDetections
        .concat(textDetectionsExtra)
        .filter((item) => item.Type === 'LINE')
        .map((item) => item.DetectedText);

      const words = textDetections
        .concat(textDetectionsExtra)
        .filter((item) => item.Type === 'WORD')
        .map((item) => item.DetectedText);

      const byBrand = textList.filter(
        (item) => item.includes('by') || item.includes('BY')
      );
      const brand =
        byBrand.length > 0 ? `${textList[0]} ${byBrand}` : textList[0];

      console.log(byBrand);

      setBrand(brand);

      console.log(brand);

      setWordsFromLabel(words);

      console.log('WORDS: ', words);
      console.log('TEXTLIST: ', textList);

      //console.log(setAspects);

      /*const material = textList
        .filter((item) => item.includes('%'))
        .map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        );*/

      const country = textList.find(
        (item) => item.includes('Made in') || item.includes('MADE IN')
      )
        ? textList
            .find(
              (item) => item.includes('Made in') || item.includes('MADE IN')
            )
            .toLowerCase()
            .split('made in')[1]
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        : '';

      /*const size = textList
        .filter((item) => item.includes('%'))
        .map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        );*/

      /*const sizes = aspectValues
        .find((itm) => itm.localizedAspectName === 'Size')
        .aspectValues.map((name) => name.toUpperCase());*/

      const sizes = aspectValues.find((itm) => itm.id === 'Size').value;
      const size = sizes.filter((x) => words.includes(x));

      const materials = aspectValues
        .find((itm) => itm.id === 'Material')
        .value.map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
        );

      const material = materials.filter((x) =>
        words
          .map((item) =>
            item
              .toLowerCase()
              .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
          )
          .includes(x)
      );

      console.log('MATERIAL: ', material);

      console.log('SIZE: ', size);

      console.log('Country: ', country);

      let batchProcess = [];
      if (brand && brand !== '') {
        batchProcess.push({ itm: 'Brand', value: brand });
      }
      if (size.length > 0) {
        batchProcess.push({ itm: 'Size', value: size[0] });
      }

      if (material.length > 0) {
        batchProcess.push({ itm: 'Material', value: material[0] });
      }

      if (country !== '') {
        batchProcess.push({
          itm: 'Country/Region of Manufacture',
          value: country,
        });
      }

      changeValueItemAspectBulk(batchProcess);

      console.log('Brand: ', brand);
      //setProcessingSelectedAspectValue(false);
    } catch (error) {
      console.log(error);
    }
  };

  const takeEditPic = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchCameraAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotos((old) =>
          old.map((item) => {
            if (item.id === editPhotoOpen) {
              return {
                id: item.id,
                value: newPhotoAWS,
              };
            }
            return item;
          })
        );
        //setMorePhotosOpen(false);
        setEditPhotoOpen('');
        setOpenCamera(false);
        setProcessingImage(false);
        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const pickEditPic = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchImageLibraryAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotos((old) =>
          old.map((item) => {
            if (item.id === editPhotoOpen) {
              return {
                id: item.id,
                value: newPhotoAWS,
              };
            }
            return item;
          })
        );
        //setMorePhotosOpen(false);
        setEditPhotoOpen('');
        setOpenCamera(false);
        setProcessingImage(false);
        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const takePicLabelExtra = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchCameraAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //setPhotoLabel(newPhoto);

      //const source = newPhoto.uri;
      //await cameraRef.current.pausePreview();

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoLabelExtra(newPhotoAWS);

        /*const tagChecked = await fetch(
        `https://listerfast.com/api/utils/textfromimage/${newPhotoAWS}`
      );

      const json = await tagChecked.json();
      let textDetections = json.TextDetections;

      checkLabel(textDetections);*/

        setLabelPhotoOpenExtra(false);
        setOpenCamera(false);

        setProcessingImage(false);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const pickPicLabelExtra = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchImageLibraryAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //setPhotoLabel(newPhoto);

      //const source = newPhoto.uri;
      //await cameraRef.current.pausePreview();

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoLabelExtra(newPhotoAWS);

        /*const tagChecked = await fetch(
        `https://listerfast.com/api/utils/textfromimage/${newPhotoAWS}`
      );

      const json = await tagChecked.json();
      let textDetections = json.TextDetections;

      checkLabel(textDetections);*/

        setLabelPhotoOpenExtra(false);
        setOpenCamera(false);

        setProcessingImage(false);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const takePicLabel = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchCameraAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //setPhotoLabel(newPhoto);

      //const source = newPhoto.uri;
      //await cameraRef.current.pausePreview();

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoLabel(newPhotoAWS);

        setLabelPhotoOpen(false);
        setOpenCamera(false);
        setProcessingImage(false);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const pickPicLabel = async () => {
    try {
      setProcessingImage(true);
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        //allowsEditing: true,
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      let newPhoto = await ImagePicker.launchImageLibraryAsync(options); //cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //setPhotoLabel(newPhoto);

      //const source = newPhoto.uri;
      //await cameraRef.current.pausePreview();

      if (source) {
        //await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoLabel(newPhotoAWS);

        setLabelPhotoOpen(false);
        setOpenCamera(false);
        setProcessingImage(false);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const closePic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setMorePhotosOpen(false);
    setEditPhotoOpen('');
    setOpenCamera(false);
  };

  const deleteEditPic = async (id) => {
    setPhotos((old) => old.filter((item) => item.id !== id));
    setEditPhotoOpen('');
    setOpenCamera(false);
  };

  const deleteMainPic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoMain(undefined);
  };

  const deleteLabelPic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoLabel(undefined);
  };

  const onOpenCamera = async () => {
    setOpenCamera((old) => !old);
  };

  const onChangeWeightMayor = async (value) => {
    setWeightMayor(value);
  };

  const onChangeWeightMinor = async (value) => {
    setWeightMinor(value);
  };

  const onMainPhotoOpen = async () => {
    setMainPhotoOpen(true);
    setOpenCamera(true);
  };

  const onLabelPhotoOpen = async () => {
    setLabelPhotoOpen(true);
    setOpenCamera(true);
  };

  const onLabelPhotoOpenExtra = async () => {
    setLabelPhotoOpenExtra(true);
    setOpenCamera(true);
  };

  const onBack = async () => {
    setOpenBackListingDialog(false);
    navigation.goBack();
  };

  const onOpenBackDialog = () => {
    setOpenBackListingDialog(true);
  };

  const onSearchCategories = async (query) => {
    setSearchCategories(query);
  };

  if (processingPublishEbay) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 20 }}>Publishing on eBay</Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 15 }}>
          in Account {ebayUser}
        </Text>
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  }

  if (openBackListingDialog) {
    return (
      <View>
        <Portal>
          <Dialog
            visible={openBackListingDialog}
            onDismiss={() => setOpenBackListingDialog(false)}
          >
            <Dialog.Icon icon='alert' />
            <Dialog.Title style={{ textAlign: 'center', fontSize: 20 }}>
              Do you want to save the changes before exiting?
            </Dialog.Title>
            <Dialog.Actions>
              <Button
                onPress={() => {
                  saveListingAndClose();
                  //onBack();
                }}
              >
                Yes
              </Button>
              <Button onPress={() => onBack()}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }

  if (processingImage) {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  }

  if (openDeleteDialog) {
    return (
      <View>
        <Portal>
          <Dialog
            visible={openDeleteDialog}
            onDismiss={() => setOpenDeleteDialog(false)}
          >
            <Dialog.Icon icon='alert' />
            <Dialog.Title style={{ textAlign: 'center', fontSize: 20 }}>
              Are you sure you want to delete this listing?
            </Dialog.Title>
            <Dialog.Actions>
              <Button onPress={() => setOpenDeleteDialog(false)}>Cancel</Button>
              <Button onPress={() => deleteItem()}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }

  if (!initializingListing) {
    if (step === 0) {
      return (
        <SearchProduct
          title={titleProcessed}
          navigation={navigation}
          onSearchCategories={onSearchCategories}
          searchCategories={searchCategories}
          styles={styles}
          backward={backward}
          forward={forward}
          setCategory={setCategory}
        />
      );
    }

    if (step === 1) {
      if (!openCamera) {
        return (
          <View>
            <PhotosSection
              title={titleHeader}
              typeHeader={'editListing'}
              navigation={navigation}
              onOpenBackDialog={onOpenBackDialog}
              styles={styles}
              onMainPhotoOpen={onMainPhotoOpen}
              photoMain={photoMain}
              photoLabel={photoLabel}
              photoLabelExtra={photoLabelExtra}
              onLabelPhotoOpen={onLabelPhotoOpen}
              onLabelPhotoOpenExtra={onLabelPhotoOpenExtra}
              photos={photos}
              backward={backward}
              forward={forward}
              processingSaveListing={processingSaveListing}
              removeBackground={removeBackground}
              //goToFirstStep={goToFirstStep}
              type={type}
              onOpenPreviewPhoto={onOpenPreviewPhoto}
              onOpenEditPhoto={onOpenEditPhoto}
              saveListing={saveListing}
              onDeleteItem={onDeleteItem}
              processedRemoveBackground={processedRemoveBackground}
              processingRemoveBackground={processingRemoveBackground}
              getCategories={getCategories}
              category={category}
              deleteLabelPic={deleteLabelPic}
              deleteMainPic={deleteMainPic}
              deleteLabelPicExtra={deleteLabelPicExtra}
              deleteEditPic={deleteEditPic}
              onMainPicIsTaken={onMainPicIsTaken}
            />
          </View>
        );
      } else {
        if (mainPhotoOpen) {
          return (
            <View style={styles.basicContainer}>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => takePicMain()}
                icon='camera'
              >
                Take a picture
              </Button>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => pickPicMain()}
                icon='image'
              >
                Get an image from your device
              </Button>
              <Button
                style={{ margin: 20 }}
                icon='close'
                onPress={() => closePic()}
              >
                Close
              </Button>
            </View>
          );

          /*return (
           
            
            <Camera
              style={styles.container}
              ref={cameraRef}
              pictureSize='1280x960'              
            >
              <SegmentedButtons
                density='medium'
                style={styles.previewCameraControl}
                onValueChange={() => console.log('Change value')}
                buttons={[
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => closePic(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled : processingImage ? true : false,
                  },
                  {
                    value: 'next',
                    label: 'Take photo',
                    icon: 'camera',
                    onPress: () => takePicMain(),
                    style: styles.buttonPreviewCameraControl,                    
                  },                 
                ]}
              />
            </Camera>
          );*/
        } else if (labelPhotoOpen) {
          return (
            <View style={styles.basicContainer}>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => takePicLabel()}
                icon='camera'
              >
                Take a picture
              </Button>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => pickPicLabel()}
                icon='image'
              >
                Get an image from your device
              </Button>
              <Button
                style={{ margin: 20 }}
                icon='close'
                onPress={() => closePic()}
              >
                Close
              </Button>
            </View>
          );
          /*return (
            <Camera
              style={styles.container}
              ref={cameraRef}
              pictureSize='1280x960'
              //ratio='1:1'
            >
              <SegmentedButtons
                density='medium'
                style={styles.previewCameraControl}
                onValueChange={() => console.log('Change value')}
                buttons={[
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => closePic(),
                    style: styles.buttonPreviewCameraControl,
                  },
                  {
                    value: 'next',
                    label: 'Take photo',
                    icon: 'camera',
                    onPress: () => takePicLabel(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled: photoMain && photoLabel ? false : true
                  },
                  
                ]}
              />
            </Camera>
          );*/
        } else if (labelPhotoOpenExtra) {
          return (
            <View style={styles.basicContainer}>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => takePicLabelExtra()}
                icon='camera'
              >
                Take a picture
              </Button>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => pickPicLabelExtra()}
                icon='image'
              >
                Get an image from your device
              </Button>
              <Button
                style={{ margin: 20 }}
                icon='close'
                onPress={() => closePic()}
              >
                Close
              </Button>
            </View>
          );

          /*return (
            <Camera
              style={styles.container}
              ref={cameraRef}
              pictureSize='1280x960'
              //ratio='1:1'
            >
              <SegmentedButtons
                density='medium'
                style={styles.previewCameraControl}
                onValueChange={() => console.log('Change value')}
                buttons={[
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => closePic(),
                    style: styles.buttonPreviewCameraControl,
                  },
                  {
                    value: 'next',
                    label: 'Take photo',
                    icon: 'camera',
                    onPress: () => takePicLabelExtra(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled: photoMain && photoLabel ? false : true
                  },
                  
                ]}
              />
            </Camera>
          );*/
        } else if (morePhotosOpen) {
          return (
            <View style={styles.basicContainer}>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => takeNewPic()}
                icon='camera'
              >
                Take a picture
              </Button>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => pickNewPic()}
                icon='image'
              >
                Get an image from your device
              </Button>
              <Button
                style={{ margin: 20 }}
                icon='close'
                onPress={() => closePic()}
              >
                Close
              </Button>
            </View>
          );

          /*return (
            <Camera
              style={styles.container}
              ref={cameraRef}
              pictureSize='1280x960'
              //ratio='1:1'
            >
              <SegmentedButtons
                density='medium'
                style={styles.previewCameraControl}
                onValueChange={() => console.log('Change value')}
                buttons={[
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => closePic(),
                    style: styles.buttonPreviewCameraControl,
                  },
                  {
                    value: 'next',
                    label: 'Take photo',
                    icon: 'camera',
                    onPress: () => takeNewPic(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled: photoMain && photoLabel ? false : true
                  },
                  
                ]}
              />
            </Camera>
          );*/
        } else if (editPhotoOpen !== '') {
          return (
            <View style={styles.basicContainer}>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => takeEditPic()}
                icon='camera'
              >
                Take a picture
              </Button>
              <Button
                style={{ margin: 20 }}
                mode='outlined'
                onPress={() => pickEditPic()}
                icon='image'
              >
                Get an image from your device
              </Button>
              <Button
                style={{ margin: 20 }}
                icon='close'
                onPress={() => closePic()}
              >
                Close
              </Button>
            </View>
          );

          /*return (
            <Camera
              style={styles.container}
              ref={cameraRef}
              pictureSize='1280x960'
              //ratio='1:1'
            >
              <SegmentedButtons
                density='medium'
                style={styles.previewCameraControl}
                onValueChange={() => console.log('Change value')}
                buttons={[
                  {
                    value: 'close',
                    label: 'Close',
                    icon: 'close',
                    onPress: () => closePic(),
                    style: styles.buttonPreviewCameraControl,
                  },
                  {
                    value: 'next',
                    label: 'Take photo',
                    icon: 'camera',
                    onPress: () => takeEditPic(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled: photoMain && photoLabel ? false : true
                  },
                  {
                    value: 'delete',
                    label: 'Delete',
                    icon: 'delete',
                    onPress: () => deleteEditPic(),
                    style: styles.buttonPreviewCameraControl,
                    //disabled: photoLabel ? false : true
                    //disabled: photoMain && photoLabel ? false : true
                  },
                ]}
              />
            </Camera>
          );*/
        }
      }
    }

    if (step === 2) {
      return (
        <BarcodeStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          processingSaveListing={processingSaveListing}
          backward={backward}
          onOpenBackDialog={onOpenBackDialog}
          forward={forward}
          goToFirstStep={goToFirstStep}
          barcodeOpen={barcodeOpen}
          onOpenBarcode={onOpenBarcode}
          handleBarCodeScanned={handleBarCodeScanned}
          barcodeValue={barcodeValue}
          deleteBarcodeValue={deleteBarcodeValue}
          getCategories={getCategories}
          category={category}
          searchCategories={searchCategories}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}
        />
      );
    }

    if (step === 3) {
      return (
        <CategoryStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          onOpenBackDialog={onOpenBackDialog}
          processingSaveListing={processingSaveListing}
          forward={forward}
          goToFirstStep={goToFirstStep}
          processingCategories={processingCategories}
          categories={categories}
          onSelectedCategory={onSelectedCategory}
          category={category}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}
          getCategoriesSearch={getCategoriesSearch}
          //processLabel={processLabel}
          //photoLabel={photoLabel}
          //onCheckAllAspects={onCheckAllAspects}
        />
      );
    }

    if (step === 4) {
      return (
        <ItemSpecificsStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          onOpenBackDialog={onOpenBackDialog}
          forward={forward}
          goToFirstStep={goToFirstStep}
          processingSaveListing={processingSaveListing}
          processingAspects={processingAspects}
          aspects={aspects}
          getAspectValues={getAspectValues}
          aspectValues={aspectValues}
          changeValueItemAspect={changeValueItemAspect}
          checkedAllAspects={checkedAllAspects}
          category={category}
          getCategoriesFeatures={getCategoriesFeatures}
          saveListing={saveListing}
          processingSelectedAspectValue={processingSelectedAspectValue}
          onDeleteItem={onDeleteItem}
          onProcessingTitle={onProcessingTitle}
          photoLabel={photoLabel}
          photoLabelExtra={photoLabelExtra}
          type={type}
          processLabel={processLabel}

          //onIsChangedAspects={onIsChangedAspects}
        />
      );
    }

    if (step === 5) {
      return (
        <ConditionStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          onOpenBackDialog={onOpenBackDialog}
          forward={forward}
          goToFirstStep={goToFirstStep}
          processingSaveListing={processingSaveListing}
          processingCategoryFeatures={processingCategoryFeatures}
          //getCategoriesFeatures={getCategoriesFeatures}
          categoryFeatures={categoryFeatures}
          condition={condition}
          onSelectedCondition={onSelectedCondition}
          conditionDescription={conditionDescription}
          onChangeConditionDescription={onChangeConditionDescription}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}
          onProcessingTitle={onProcessingTitle}

          //changeValueItemAspect={changeValueItemAspect}
          //checkedAllAspects={checkedAllAspects}
        />
      );
    }

    if (step === 6) {
      return (
        <DimensionStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          forward={forward}
          goToFirstStep={goToFirstStep}
          onOpenBackDialog={onOpenBackDialog}
          processingSaveListing={processingSaveListing}
          //onChangeDimensions={onChangeDimensions}
          onChangeLength={onChangeLength}
          onChangeHeight={onChangeHeight}
          onChangeWidth={onChangeWidth}
          onChangeWeightMayor={onChangeWeightMayor}
          onChangeWeightMinor={onChangeWeightMinor}
          length={length}
          height={height}
          width={width}
          weightMayor={weightMayor}
          weightMinor={weightMinor}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}
          onProcessingTitle={onProcessingTitle}
          //getPolicies={getPolicies}
          //processingCategoryFeatures={processingCategoryFeatures}
          //categoryFeatures={categoryFeatures}
          //condition={condition}
          //onSelectedCondition={onSelectedCondition}
        />
      );
    }

    if (step === 7) {
      return (
        <PolicyStage
          title={titleHeader}
          navigation={navigation}
          typeHeader={'editListing'}
          styles={styles}
          backward={backward}
          forward={forward}
          goToFirstStep={goToFirstStep}
          onOpenBackDialog={onOpenBackDialog}
          processingSaveListing={processingSaveListing}
          processingPolicies={processingPolicies}
          fulfillmentPolicies={fulfillmentPolicies}
          paymentPolicies={paymentPolicies}
          returnPolicies={returnPolicies}
          onClickPaymentPolicy={onClickPaymentPolicy}
          onClickFulfillmentPolicy={onClickFulfillmentPolicy}
          onClickReturnPolicy={onClickReturnPolicy}
          paymentPolicyId={paymentPolicyId}
          fulfillmentPolicyId={fulfillmentPolicyId}
          returnPolicyId={returnPolicyId}
          onProcessingTitle={onProcessingTitle}
          fetchPolicies={fetchPolicies}
          fetchPoliciesProcessing={fetchPoliciesProcessing}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}

          //onChangeDimensions={onChangeDimensions}
          /*onChangeLength={onChangeLength}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onChangeWeight={onChangeWeight}
        length={length}
        height={height}
        width={width}
        weight={weight}*/
          //processingCategoryFeatures={processingCategoryFeatures}
          //categoryFeatures={categoryFeatures}
          //condition={condition}
          //onSelectedCondition={onSelectedCondition}
        />
      );
    }

    if (step === 8) {
      return (
        <TitleRevisionStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          goToFirstStep={goToFirstStep}
          goToListingDetails={goToListingDetails}
          onOpenBackDialog={onOpenBackDialog}
          processingSaveListing={processingSaveListing}
          forward={forward}
          titleProcessed={titleProcessed}
          descriptionProcessed={descriptionProcessed}
          onChangeTitle={onChangeTitle}
          onChangeDescription={onChangeDescription}
          processingPrices={processingPrices}
          //getPrices={getPrices}
          getGooglePrices={getGooglePrices}
          saveListing={saveListing}
          onDeleteItem={onDeleteItem}
          onProcessingTitle={onProcessingTitle}
          onIsChangedAspects={onIsChangedAspects}
          isChangedAspects={isChangedAspects}
          lastStep={lastStep}

          /*processingPolicies={processingPolicies}
        fulfillmentPolicies={fulfillmentPolicies}
        paymentPolicies={paymentPolicies}
        returnPolicies={returnPolicies}
        onClickPaymentPolicy={onClickPaymentPolicy}
        onClickFulfillmentPolicy={onClickFulfillmentPolicy}
        onClickReturnPolicy={onClickReturnPolicy}
        paymentPolicyId={paymentPolicyId}
        fulfillmentPolicyId={fulfillmentPolicyId}
        returnPolicyId={returnPolicyId}*/

          //onChangeDimensions={onChangeDimensions}
          /*onChangeLength={onChangeLength}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onChangeWeight={onChangeWeight}
        length={length}
        height={height}
        width={width}
        weight={weight}*/
          //processingCategoryFeatures={processingCategoryFeatures}
          //categoryFeatures={categoryFeatures}
          //condition={condition}
          //onSelectedCondition={onSelectedCondition}
        />
      );
    }

    if (step === 9) {
      return (
        <PriceStage
          title={titleHeader}
          typeHeader={'editListing'}
          navigation={navigation}
          styles={styles}
          backward={backward}
          forward={forward}
          goToFirstStep={goToFirstStep}
          goToListingDetails={goToListingDetails}
          //getPrices={getPrices}
          getGooglePrices={getGooglePrices}
          processingSaveListing={processingSaveListing}
          prices={prices}
          processingPrices={processingPrices}
          pricingList={pricingList}
          onChangeProductPrice={onChangeProductPrice}
          priceProduct={priceProduct}
          onChangeQuantity={onChangeQuantity}
          quantity={quantity}
          checkedAllAspects={checkedAllAspects}
          saveListing={saveListing}
          category={category}
          titleProcessed={titleProcessed}
          //getCategoriesFeatures={getCategoriesFeatures}
          onDeleteItem={onDeleteItem}
          onProcessingTitle={onProcessingTitle}
          onPublishEbay={onPublishEbay}
          goToStep={goToStep}
          onOpenBackDialog={onOpenBackDialog}
          isChangedAspects={isChangedAspects}
          //onLetPriceListing={onLetPriceListing}
          letPriceListing={letPriceListing}

          /*titleProcessed={titleProcessed}
        descriptionProcessed={descriptionProcessed}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}*/

          /*processingPolicies={processingPolicies}
        fulfillmentPolicies={fulfillmentPolicies}
        paymentPolicies={paymentPolicies}
        returnPolicies={returnPolicies}
        onClickPaymentPolicy={onClickPaymentPolicy}
        onClickFulfillmentPolicy={onClickFulfillmentPolicy}
        onClickReturnPolicy={onClickReturnPolicy}
        paymentPolicyId={paymentPolicyId}
        fulfillmentPolicyId={fulfillmentPolicyId}
        returnPolicyId={returnPolicyId}*/

          //onChangeDimensions={onChangeDimensions}
          /*onChangeLength={onChangeLength}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onChangeWeight={onChangeWeight}
        length={length}
        height={height}
        width={width}
        weight={weight}*/
          //processingCategoryFeatures={processingCategoryFeatures}
          //categoryFeatures={categoryFeatures}
          //condition={condition}
          //onSelectedCondition={onSelectedCondition}
        />
      );
    }
  } else {
    return (
      <View
        style={{
          flex: 1,
          //justifyContent: 'space-between',
          alignItems: 'center',
          alignContent: 'center',
          alignSelf: 'center',
          justifyContent: 'center',

          //paddingBottom: 100,
        }}
      >
        <ActivityIndicator
          size='large'
          style={{ marginTop: '20%', marginBottom: '20%' }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        //justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        justifyContent: 'center',

        //paddingBottom: 100,
      }}
    >
      <ActivityIndicator
        size='large'
        style={{ marginTop: '20%', marginBottom: '20%' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'flex-end',
    justifyContent: 'flex-end',

    width: '100%',
    //height: Dimensions.get('window').height / 5,
    marginTop:
      (Dimensions.get('window').height - Dimensions.get('window').width) / 4,
    marginBottom:
      (Dimensions.get('window').height - Dimensions.get('window').width) / 3,
    //marginBottom: 100,
    //marginBottom: '55%',
    //position: 'absolute',
  },

  containerBarcode: {
    /*flex: 1,
    justifyContent: 'flex-end',
    //height: '50%',
    //marginTop: 100,
    //marginBottom: 200,
    width: '100%',
    //marginTop: 150,
    //marginBottom: 150,
    height: 250,
    //marginTop: '50%',
    position: 'absolute',*/

    height: '70%', //window.height / 2,
    width: '100%', //window.height,
    marginBottom: 20,
  },

  clothingButtons: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  basicContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: 25,
  },

  imageList: {
    //marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  surface: {
    height: 120,
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },

  surfaceSmall: {
    height: 60,
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContainer: {
    //backgroundColor: '#fff',
    //alignSelf: 'flex-end',
  },

  nextBackControl: {
    justifyContent: 'center',
    marginTop: 10,
  },

  nextBackControlButton: {
    backgroundColor: 'white',
  },

  buttonPreviewCameraControl: {
    backgroundColor: 'white',
  },

  previewCameraControl: {
    justifyContent: 'center',
    padding: 10,

    //marginTop: 25,
  },

  preview: {
    alignSelf: 'stretch',
    flex: 1,
  },
});
