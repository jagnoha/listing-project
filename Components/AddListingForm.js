import React, { useState, useEffect, useRef } from 'react';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Dialog,
  Portal,
  Searchbar,
  SegmentedButtons,
  Banner,
  ActivityIndicator,
} from 'react-native-paper';

import FormData from 'form-data';

import { encode } from 'html-entities';

import * as FileSystem from 'expo-file-system';

//import { fs } from 'fs';

import { ListingType } from '../src/models';

import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import { Amplify, Storage, API } from 'aws-amplify';
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
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import converter from 'javascript-binary-converter';

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
import urlImagesAtom from '../Store/atoms/urlImagesAtom';

import TitleRevisionStage from './CreateProductWizard/TitleRevisionStage';

import awsconfig from '../src/aws-exports';
Amplify.configure(awsconfig);

export default function AddListingForm(props) {
  let cameraRef = useRef();

  const [hasCameraPermission, setHasCameraPermission] = useState();

  const [listingId, setListingId] = useState();

  const [listingVersion, setListingVersion] = useState();

  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const [urlImages, setUrlImages] = useRecoilState(urlImagesAtom);

  const [processingRemoveBackground, setProcessingRemoveBackground] =
    useState(false);
  const [processedRemoveBackground, setProcessedRemoveBackground] =
    useState(false);

  const [processingSelectedAspectValue, setProcessingSelectedAspectValue] =
    useState(false);

  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);

  const [openBackListingDialog, setOpenBackListingDialog] = useState(false);

  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);

  const [processingImage, setProcessingImage] = useState(false);

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

  const [aspectValues, setAspectValues] = useState([]);

  const [wordsFromLabel, setWordsFromLabel] = useState([]);

  const [brand, setBrand] = useState('');

  const [searchCategories, setSearchCategories] = useState('');
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photos, setPhotos] = useState([]);
  const [photoMain, setPhotoMain] = useState();
  const [photoLabel, setPhotoLabel] = useState();
  const [photoLabelExtra, setPhotoLabelExtra] = useState();
  const [barcodeValue, setBarcodeValue] = useState();
  const [categories, setCategories] = useState([]);

  const [processingPublishEbay, setProcessingPublishEbay] = useState(false);

  const [categoryFeatures, setCategoryFeatures] = useState();

  const [fetchPoliciesProcessing, setFetchPoliciesProcessing] = useState(false);

  const [processingPolicies, setProcessingPolicies] = useState(false);

  const [processingCategoryFeatures, setProcessingCategoryFeatures] =
    useState();

  const [checkedAllAspects, setCheckedAllAspects] = useState(false);

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
  const [isChangedAspects, setIsChangedAspects] = useState(false);

  const [condition, setCondition] = useState('');

  const [conditionName, setConditionName] = useState('');

  const [conditionDescription, setConditionDescription] = useState('');

  const [barcodeOpen, setBarcodeOpen] = useState(false);

  const [listings, setListings] = useRecoilState(listingsAtom);

  //const [listPhotoOpen, setListPhotoOpen] = useState(0);

  const [step, setStep] = useState(0);

  const navigation = useNavigation();
  const route = useRoute();
  const { title, type } = route.params;

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === 'granted');
    })();
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
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
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

  const goToStep = async (n) => {
    setStep(n);
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

  const createNewListingDraft = async () => {
    try {
      console.log('Saving Listing');

      const id = uuidv4();

      const listingDetails = {
        id: id,
        sku: id,
        accountsID: userAccount.id,
        title: titleProcessed,
        description: descriptionProcessed,
        price: priceProduct,
        itemsSpecifics: JSON.stringify(aspects),
        categoryFeatures: JSON.stringify(categoryFeatures),
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
        query: mutations.createListing,
        variables: { input: listingDetails },
      });

      /*console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
      );*/
      /*console.log(listings);
      console.log(
        '*****************************************************************'
      );*/
      /*console.log(newListing);
      console.log(
        '*****************************************************************'
      );*/

      if (newListing) {
        //setListings((old) => [...old, newListing.data.createListing]);
        //navigation.goBack();

        console.log(newListing);

        setListingId(id);
        //console.log('Version: ', newListing.data.createListing._version)
        setListingVersion(newListing.data.createListing._version);
        setSnackBar({ visible: true, text: 'Listing Saved as Draft' });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const createNewListingOnline = async (id) => {
    try {
      console.log('Saving Listing Online');

      //const id = uuidv4();

      const listingDetails = {
        id: id,
        sku: id,
        accountsID: userAccount.id,
        title: titleProcessed,
        description: descriptionProcessed,
        price: priceProduct,
        itemsSpecifics: JSON.stringify(aspects),
        categoryFeatures: JSON.stringify(categoryFeatures),
        isDraft: false,
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
        query: mutations.createListing,
        variables: { input: listingDetails },
      });

      /*console.log(
        '@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@'
      );*/
      /*console.log(listings);
      console.log(
        '*****************************************************************'
      );*/
      /*console.log(newListing);
      console.log(
        '*****************************************************************'
      );*/
    } catch (error) {
      console.log(JSON.stringify(error));
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

  const uploadImageRemoveBackground = async (filename, img, uri) => {
    try {
      const apiKey = 'acc_8b37536dc24d083';
      const apiSecret = '5bd5d7fe8b2beb3a56f4ee52cc00988d';

      let headers = {
        Authorization:
          'Basic ' +
          'YWNjXzhiMzc1MzZkYzI0ZDA4Mzo1YmQ1ZDdmZThiMmJlYjNhNTZmNGVlNTJjYzAwOTg4ZA==',
      };

      //const img2 = await fetchImageFromUri(uri);

      console.log(uri);

      console.log(img._data.blobId, img._data.type, img._data.size);

      const responseAWS = await Storage.put(filename, img, {
        level: 'public',
        contentType: 'image/jpeg',
      });

      console.log(filename);

      const urlAWS = `${urlImages}${responseAWS.key}`;

      /*let urlAWS =
        'https://listerfast-storage-f596989e161256-staging.s3.amazonaws.com/public/cb7b524d-59ed-441c-a0f5-f44cbe295031.jpg';
*/
      console.log(urlAWS);

      const imgProccesed = await axios.get(
        `https://api.imagga.com/v2/remove-background?image_url=${decodeURIComponent(
          urlAWS
        )}`,
        {
          username: apiKey,
          password: apiSecret,
          headers: headers,
        }
      );

      const myFile = new File([img], 'image.jpeg', {
        type: img.type,
      });

      console.log(myFile);
      //console.log(myFile instanceof File);

      /*const imgProccesed = await axios.post(
        `https://api.imagga.com/v2/remove-background`,
        {
          username: apiKey,
          password: apiSecret,
          image: img,
          headers: headers,
        }
      );*/

      //let imgData = new Blob(imgProccesed.data.buffer, { type: 'image/png' });

      //console.log(imgData._data.blobId, imgData._data.type, imgData._data.size);

      /*
      //console.log('IMAGE PROCESSED!!!!: ', imgProccesed.data);

      let binary = imgProccesed.data;

      //let imgData = new Blob(binary.buffer, { type: 'image/png' });

      let imgData = binary;

      let pngFileName = responseAWS.key.split('jpg')[0] + 'png'; //.push('png').join('');

      //console.log('NEW FILE NAME: ', pngFileName);

      const finalImage = await Storage.put(pngFileName, imgData, {
        level: 'public',
        contentType: 'image/png',
      });

      //console.log(finalImage);*/

      return responseAWS.key;

      /*return Storage.put(filename, img, {
      level: 'public',
      contentType: 'image/jpeg',      
    })
      .then((response) => {
        console.log('MIERDA!!!');
        return response.key;
      })
      .catch((error) => {
        console.log(error);
        return error.response;
      });*/
    } catch (error) {
      console.log(error);
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

  const handleImageRemoveBackground = async (photoResult, nameFile) => {
    try {
      const img = await fetchImageFromUri(photoResult.uri);
      const uploadUrl = await uploadImage(nameFile, img);
      //console.log(uploadUrl);
      return uploadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  /*const handleImageRemoveBackground = async (photoResult, nameFile) => {
    try {
      const img = await fetchImageFromUri(photoResult.uri);

      const apiKey = 'acc_8b37536dc24d083';
      const apiSecret = '5bd5d7fe8b2beb3a56f4ee52cc00988d';

      //console.log(photoResult.uri);

      let headers = {
        Authorization:
          'Basic ' +
          'YWNjXzhiMzc1MzZkYzI0ZDA4Mzo1YmQ1ZDdmZThiMmJlYjNhNTZmNGVlNTJjYzAwOTg4ZA==',
      };

      const imgProccesed = await axios.get(
        `https://api.imagga.com/v2/remove-background?image_url=${encodeURIComponent(
          photoResult.uri
        )}`,
        {
          username: apiKey,
          password: apiSecret,
          headers: headers,
        }
      );

      console.log(imgProccesed.data);

      console.log(img);

      const uploadUrl = await uploadImage(nameFile, imgProccesed);
      //console.log(uploadUrl);
      return uploadUrl;
    } catch (error) {
      console.log(error);
    }
  };*/

  const updateListingDraft = async () => {
    try {
      console.log('Saving Listing');

      const id = listingId;

      const version = listingVersion;

      const listingDetails = {
        id: id,
        sku: id,
        _version: version,
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
        console.log(newListing);
        setSnackBar({ visible: true, text: 'Listing Saved' });
      }
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const saveListing = async () => {
    try {
      //console.log('Saving Listing');
      if (!listingId) {
        await createNewListingDraft();
      } else {
        await updateListingDraft();
      }
      //handleImage(photoMain);
      //console.log(photoMain);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeProductPrice = (price) => {
    setPriceProduct(price);
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

  //console.log(type);

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

    const size = aspects.find((item) => item.localizedAspectName === 'Size');
    const style = aspects.find((item) => item.localizedAspectName === 'Style');
    const sizeType = aspects.find(
      (item) => item.localizedAspectName === 'Size Type'
    );
    const color = aspects.find((item) => item.localizedAspectName === 'Color');
    const type = aspects.find((item) => item.localizedAspectName === 'Type');
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

    const categoryNew = categories.find((item) => item.categoryId === category);

    const inseam = aspects.find(
      (item) => item.localizedAspectName === 'Inseam'
    );

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
      inseam: inseam ? inseam.value : '',

      fit: fit ? fit.value : '',

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
    )}</h2><p style={font-size: 1.2em}>${
      categoryFeatures.conditions.find((item) => item.ID === condition)
        .DisplayName
    }</p>  
${conditionDescription.length > 0 ? `** ${conditionDescription} **` : ''}
<b>Item Specifics & Features:</b>    
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

  const processingTitle = async () => {
    let pendingTitle = [];
    let shortPendingTitle = [];

    const keywords = getImportantAspectsValues();
    const extraAspects = getExtraAspectsValuesClothing().filter(
      (itm) => itm !== ''
    );

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

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      if (keywords['fit'] !== '') {
        if (keywords['fit'] !== 'Regular') {
          pendingTitle.push(`${keywords['fit']} Fit`);
          shortPendingTitle.push(`${keywords['fit']} Fit`);
        }
      }

      if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(keywords['department']);
        shortPendingTitle.push(keywords['department']);
      }

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

      // processing long title
      let uniqueFilteredTitle = filtetedTitle.join(' ').split(' ');
      uniqueFilteredTitle = [...new Set(uniqueFilteredTitle)];

      uniqueFilteredTitle = uniqueFilteredTitle
        .join(' ')
        .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase());

      // processing short title
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

      if (keywords['type'] === '') {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      } else if (!keywords['category'].includes(keywords['type'])) {
        pendingTitle.push(keywords['category']);
        shortPendingTitle.push(keywords['category']);
      }

      pendingTitle.push(keywords['type']);
      shortPendingTitle.push(keywords['type']);

      pendingTitle.push(keywords['style']);
      shortPendingTitle.push(keywords['style']);

      pendingTitle.push(type);
      shortPendingTitle.push(type);

      pendingTitle.push(keywords['color']);
      shortPendingTitle.push(keywords['color']);

      pendingTitle.push(keywords['features']);

      pendingTitle.push(extraAspects.join(' '));
      shortPendingTitle.push(extraAspects.slice(0, 2).join(' '));

      if (keywords['department'] === '') {
        pendingTitle.push(keywords['gender']);
        shortPendingTitle.push(keywords['gender']);
      } else {
        pendingTitle.push(keywords['department']);
        shortPendingTitle.push(keywords['department']);
      }
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
    /*console.log('Processing Title and Description!!!');
    console.log(getExtraAspectsValuesClothing());*/
    //processingTitle()
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

  /*const onChangeWeight = async (value) => {
    setWeight(value);
  };*/

  const onChangeWeightMayor = async (value) => {
    setWeightMayor(value);
  };

  const onChangeWeightMinor = async (value) => {
    setWeightMinor(value);
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

      //console.log(JSON.stringify(json.Category.ConditionValues));

      /*const url = `https://listerfast.com/api/ebay/categoryfeatures/${username}/${categoryId}`;

      const response = await axios.get(url);

      console.log(response.data.Category);*/

      /*const url = `https://listerfast.com/api/ebay/categoryfeatures/${username}/${categoryId}`;
      const res = await axios.get(url, {
        //responseType: 'arraybuffer',
        headers: { 'Access-Control-Allow-Origin': '*' },
      });*/

      //console.log(res);
      /*console.log(
          res.data.filter((item) => item.localizedAspectName !== 'Brand')
        );*/
      //console.log('CATEGORY FEATURES >>>>>>>>>>>>>>>>>>>>>>>>', res.data);
      //setCategoryFeatures(res.data);

      //console.log(res.data.Category.BestOfferEnabled);
      //console.log(result.conditions);

      /*console.log(result.Category.UPCEnabled);
      console.log(result.Category.ISBNEnabled);
      console.log(result.Category.EANEnabled);*/

      setCategoryFeatures(result);
      setProcessingCategoryFeatures(false);
    } catch (error) {
      console.log(error);
      setProcessingCategoryFeatures(false);
    }
  };

  const onSelectedCondition = (conditionId, conditionName) => {
    setCondition(conditionId);
    setIsChangedAspects(true);
    setConditionName(conditionName);
  };

  const getAspectValues = async (categoryId) => {
    try {
      setProcessingAspects(true);

      console.log(type);

      console.log('PRODUCT CODE!: ', getTypeProductCode(type));

      console.log(categoryId);

      const response = await fetch(
        `https://listerfast.com/api/ebay/aspectsbycategory/${ebayUser}/${getTypeProductCode(
          type
        )}/${categoryId}`
      );

      const json = await response.json();

      //console.log(json);

      let aspectValues = [];

      for (const item of json.filter(
        (item) => item.aspectConstraint.aspectUsage === 'RECOMMENDED'
      )) {
        if (
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
        } else if (item.localizedAspectName === 'Brand') {
          aspectValues.push({
            id: item.localizedAspectName,
            value: [],
          });
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

  const findCommonElements = (array1, array2) => {
    const intersection = array1.filter((element) => array2.includes(element));

    return intersection.length > 0 ? intersection[0] : '';
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
              value:
                itemProduct.aspectValues &&
                Array.isArray(itemProduct.aspectValues)
                  ? itemProduct.aspectValues.map(
                      (value) => value.localizedValue
                    )
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
              value: [], //[],
            });

            return {
              localizedAspectName: itemProduct.localizedAspectName,
              //aspectValues: [],
              value: brand, //'',
              require: true,
              cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
              mode: itemProduct.aspectConstraint.aspectMode,
            };
          }

          console.log('ITEM PRODUCT ASPECT VALUES: ', itemProduct.aspectValues);

          const tempSizeList =
            itemProduct.aspectValues && Array.isArray(itemProduct.aspectValues)
              ? itemProduct.aspectValues.map((value) => value.localizedValue)
              : [];

          console.log(tempSizeList);
          //let tempSize = '';

          let tempSize = findCommonElements(wordsFromLabel, tempSizeList);

          console.log('TempSize: ', tempSize);

          if (
            itemProduct.localizedAspectName === 'Size' &&
            type !== 'autoparts'
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
              value: tempSize,
              require: true,
              cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
              mode: itemProduct.aspectConstraint.aspectMode,
            };
          }

          aspectValues.push({
            id: itemProduct.localizedAspectName,
            value:
              itemProduct.aspectValues &&
              Array.isArray(itemProduct.aspectValues)
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
      /*console.log(
        '***********************************************************************************'
      );*/
      //console.log(aspectValues);
      setAspectValues(aspectValues);
      /*console.log(
        '***********************************************************************************'
      );*/

      setAspects(aspects.sort((a, b) => b.require - a.require));
      setProcessingAspects(false);
    } catch (error) {
      console.log(error);
      setProcessingAspects(false);
    }
  };

  const changeValueItemAspect = (itm, value) => {
    //console.log(itm);
    //console.log(value);
    setProcessingSelectedAspectValue(true);
    if (lastStep > 7) {
      setIsChangedAspects(true);
    }
    const newAspects = aspects.map((item) => {
      if (item.localizedAspectName === itm) {
        return {
          //aspectValues: item.aspectValues,
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

  const onIsChangedAspects = (value) => {
    setIsChangedAspects(value);
  };

  let goToFirstStep = async () => {
    if (step > 1) {
      setStep(1);
      return true;
    }

    return false;
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

          /*keywords['fit'] !== ''
            ? pendingTitle.push(`${keywords['fit']} Fit`)
            : '';*/

          if (keywords['fit'] !== '') {
            if (keywords['fit'] !== 'Regular') {
              pendingTitle.push(`${keywords['fit']} Fit`);
            }
          }

          //pendingTitle.push(keywords['sleeveLength']);
          //pendingTitle.push(keywords['skirtLength']);
          //pendingTitle.push(keywords['dressLength']);
          //pendingTitle.push(keywords['occasion']);

          if (keywords['department'] === '') {
            pendingTitle.push(keywords['gender']);
          } else {
            pendingTitle.push(keywords['department']);
          }

          /*if (!keywords['model'].includes(keywords['brand'])) {
          pendingTitle.push(keywords['brand']);
        }

        pendingTitle.push(keywords['type']);

        if (keywords['type'] === ''){
          if (keywords['category'].slice(keywords['category'].length - 2) === 'es'){
          pendingTitle.push(keywords['category'].slice(0,keywords['category'].length - 2));
        } else {
          pendingTitle.push(keywords['category'].slice(0,keywords['category'].length - 1))
        }
        } else if (!keywords['category'].includes(keywords['type'])) {
          if (keywords['category'].slice(keywords['category'].length - 2) === 'es'){
            pendingTitle.push(keywords['category'].slice(0,keywords['category'].length - 2));
          } else {
            pendingTitle.push(keywords['category'].slice(0,keywords['category'].length - 1))
          }
        };


        pendingTitle.push(keywords['vintage']);

      

      pendingTitle.push(keywords['model']);

      

      
      pendingTitle.push(keywords['style']);
      pendingTitle.push(keywords['characterFamily']);
      pendingTitle.push(keywords['character']);
      
      
      pendingTitle.push(keywords['neckline']);
      pendingTitle.push(keywords['fit']);
      pendingTitle.push(keywords['sleeveLength']);
      pendingTitle.push(keywords['skirtLength']);
      pendingTitle.push(keywords['dressLength']);
      pendingTitle.push(keywords['department']);
      //pendingTitle.push(keywords['sizeType']);
      //pendingTitle.push(`Size ${keywords['size']}`);*/
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

          //pendingTitle.push(extraAspects.join(' '));

          //keywords['fit'] !== '' ? pendingTitle.push(`${keywords['fit']} Fit`) : '';

          if (keywords['department'] === '') {
            pendingTitle.push(keywords['gender']);
            shortPendingTitle.push(keywords['gender']);
          } else {
            pendingTitle.push(keywords['department']);
            shortPendingTitle.push(keywords['department']);
          }

          //pendingTitle.push(`Size ${keywords['usShoeSize']}`);
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

        /*console.log(
          'PENDING TITLE***********************************: ',
          pendingTitle
        );*/

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
    setCategory(id);
    forward();
    getItemAspects(id);
    getCategoriesFeatures(id);
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
    setStep((old) => old - 1);
  };

  let takePicMain = async () => {
    try {
      let nameFile = `${uuidv4()}.jpg`;

      let options = {
        quality: 0.6,
        base64: true,
        //skipProcessing: true,
        exif: false,
      };

      //const ratios = await cameraRef.current.getSupportedRatiosAsync();
      //console.log(ratios);
      //console.log(await cameraRef.current.getAvailablePictureSizesAsync('4:3'));

      let newPhoto = await cameraRef.current.takePictureAsync(options);

      const source = newPhoto;

      //console.log('Source: ', source);

      if (source) {
        await cameraRef.current.pausePreview();
        let newPhotoAWS = await handleImage(source, nameFile);
        setPhotoMain(newPhotoAWS);
        setProcessedRemoveBackground(false);
        setOpenCamera(false);
        setMainPhotoOpen(false);

        //console.log('picture source', source);
      }
    } catch (error) {
      console.log(error);
      setProcessingImage(false);
    }
  };

  const onBack = async () => {
    setOpenBackListingDialog(false);
    navigation.goBack();
  };

  const onOpenBackDialog = () => {
    setOpenBackListingDialog(true);
  };

  const handleBarCodeScanned = ({ type, data }) => {
    /*console.log(type);
    console.log(data);*/
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
    let options = {
      quality: 0.6,
      base64: true,
      //skipProcessing: true,
      exif: false,
    };

    let nameFile = `${uuidv4()}.jpg`;

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    //const source = newPhoto.uri;

    const source = newPhoto;

    if (source) {
      await cameraRef.current.pausePreview();
      let newPhotoAWS = await handleImage(source, nameFile);
      setPhotos((old) => [...old, { id: newPhotoAWS, value: newPhotoAWS }]);

      setMorePhotosOpen(false);
      setOpenCamera(false);
      //console.log('picture source', source);
    }
  };

  const takeEditPic = async () => {
    let options = {
      quality: 0.6,
      base64: true,
      //skipProcessing: true,
      exif: false,
    };

    let nameFile = `${uuidv4()}.jpg`;

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    //setPhotos((old) => [...old, { id: newPhoto.uri, value: newPhoto }]);

    const source = newPhoto;

    if (source) {
      await cameraRef.current.pausePreview();
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
      //console.log('picture source', source);
    }
  };

  const checkBestOffer = () => {
    let policy = paymentPolicies.find((item) => item.id === paymentPolicyId);

    if (policy.name.includes('Immediate')) {
      return false;
    }

    return true;
  };

  const onPublishEbay = async () => {
    try {
      setProcessingPublishEbay(true);

      const id = uuidv4();

      let urlPost = 'https://listerfast.com/api/ebay/additem';

      let images = [];
      let pictureMain = `${urlImages}${photoMain}`;
      let pictureLabel = photoLabel ? `${urlImages}${photoLabel}` : [];
      let pictureLabelExtra = photoLabelExtra ? `${urlImages}${photoLabelExtra}` : [];
      let photosTemp = photos.map((item) => `${urlImages}${item.value}`);

      images = images.concat(pictureMain, photosTemp, pictureLabel, pictureLabelExtra);

      //console.log(images);
      console.log(descriptionProcessed.split('\n').join('<br>'));

      const res = await axios.post(urlPost, {
        product: {
          SKU: id,
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

      //console.log('resultado!!!!!!!!!!!: ', JSON.stringify(res.data.result));

      if (res.data.result.Ack === 'Success') {
        console.log('Product Uploaded on eBay');

        console.log('Product Uploaded on eBay');
        createNewListingOnline(id);
        setProcessingPublishEbay(false);
        navigation.goBack();
        setSnackBar({ visible: true, text: 'Listing published on eBay' });
      } else {
        console.log('Error con eBay!');
        setProcessingPublishEbay(false);
        setSnackBar({
          visible: true,
          text: 'Error with eBay Account',
          color: 'red',
        });
      }

      console.log('Publish on eBay!!!');
    } catch (error) {
      console.log(error);
      setProcessingPublishEbay(false);
    }
  };

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

    if (photoLabelExtra && photoLabelExtra !== ''){

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
  } catch(error){
    console.log(error);
    setProcessingSelectedAspectValue(false);
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

  const checkLabel = async (textDetections, textDetectionsExtra) => {
    try {
      //setProcessingSelectedAspectValue(true);

      console.log('TEXT DETECTIONS: ', textDetections.concat(textDetectionsExtra));

      


      const textList = textDetections.concat(textDetectionsExtra)
        .filter((item) => item.Type === 'LINE')
        .map((item) => item.DetectedText);

      const words = textDetections.concat(textDetectionsExtra)
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
        words.map((item) =>
          item
            .toLowerCase()
            .replace(/(^\w{1})|(\s+\w{1})/g, (letter) => letter.toUpperCase())
            .includes(x)
        )
      );

      console.log('SIZE: ', size);

      console.log('Country: ', country);

      let batchProcess = [];
      if (brand !== '') {
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

  const takePicLabel = async () => {
    let options = {
      quality: 0.6,
      base64: true,
      //skipProcessing: true,
      exif: false,
    };

    let nameFile = `${uuidv4()}.jpg`;

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    const source = newPhoto;

    //setPhotoLabel(newPhoto);

    //const source = newPhoto.uri;
    //await cameraRef.current.pausePreview();

    if (source) {
      await cameraRef.current.pausePreview();
      let newPhotoAWS = await handleImage(source, nameFile);
      setPhotoLabel(newPhotoAWS);

      /*const tagChecked = await fetch(
        `https://listerfast.com/api/utils/textfromimage/${newPhotoAWS}`
      );

      const json = await tagChecked.json();
      let textDetections = json.TextDetections;

      checkLabel(textDetections);*/

      setLabelPhotoOpen(false);
      setOpenCamera(false);
    }
  };

  const takePicLabelExtra = async () => {
    let options = {
      quality: 0.6,
      base64: true,
      //skipProcessing: true,
      exif: false,
    };

    let nameFile = `${uuidv4()}.jpg`;

    let newPhoto = await cameraRef.current.takePictureAsync(options);

    const source = newPhoto;

    //setPhotoLabel(newPhoto);

    //const source = newPhoto.uri;
    //await cameraRef.current.pausePreview();

    if (source) {
      await cameraRef.current.pausePreview();
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
    }
  };

  const closePic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setMorePhotosOpen(false);
    setEditPhotoOpen('');
    setOpenCamera(false);
  };

  const deleteEditPic = async () => {
    setPhotos((old) => old.filter((item) => item.id !== editPhotoOpen));
    setEditPhotoOpen('');
    setOpenCamera(false);
  };

  const deleteMainPic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoMain(undefined);
    setProcessedRemoveBackground(false);
  };

  const deleteLabelPic = async () => {
    setLabelPhotoOpen(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoLabel(undefined);
  };

  const deleteLabelPicExtra = async () => {
    setLabelPhotoOpenExtra(false);
    setMainPhotoOpen(false);
    setOpenCamera(false);
    setPhotoLabelExtra(undefined);
  };

  const onOpenCamera = async () => {
    setOpenCamera((old) => !old);
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
                  saveListing();
                  onBack();
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

  if (step === 0) {
    return (
      <SearchProduct
        title={title}
        typeHeader={'searchListing'}
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
            title={title}
            typeHeader={'createListing'}
            navigation={navigation}
            styles={styles}
            deleteMainPic={deleteMainPic}
            deleteLabelPic={deleteLabelPic}
            deleteLabelPicExtra={deleteLabelPicExtra}
            onMainPhotoOpen={onMainPhotoOpen}
            photoMain={photoMain}
            photoLabel={photoLabel}
            photoLabelExtra={photoLabelExtra}
            onLabelPhotoOpen={onLabelPhotoOpen}
            onLabelPhotoOpenExtra={onLabelPhotoOpenExtra}
            photos={photos}
            backward={backward}
            forward={forward}
            removeBackground={removeBackground}
            onOpenBackDialog={onOpenBackDialog}
            //goToFirstStep={goToFirstStep}
            type={type}
            onOpenPreviewPhoto={onOpenPreviewPhoto}
            onOpenEditPhoto={onOpenEditPhoto}
            saveListing={saveListing}
            processedRemoveBackground={processedRemoveBackground}
            processingRemoveBackground={processingRemoveBackground}
            getCategories={getCategories}
            category={category}
          />
        </View>
      );
    } else {
      if (mainPhotoOpen) {
        /*if (processingImage) {
          return (<View><Text>Processing</Text></View>)
        } else {*/
        /*if (processingImage) {
        return (
          <View style={{flex: 1, alignItems: 'center', alignContent:'center', alignSelf:'center',   marginTop: '50%'}}><ActivityIndicator size='large' animating={true} /></View>
        )
        }*/

        return (
          <Camera
            style={styles.container}
            ref={cameraRef}
            pictureSize='1280x960'
            //ratio='4:3'
            //onCameraReady={() => setMainPhotoOpen(false)}
          >
            <SegmentedButtons
              density='small'
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
                  //disabled: photoMain && photoLabel ? false : true
                  //disabled : processingImage ? true : false,
                },
                /*{
                  value: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  onPress: () => deleteMainPic(),
                  style: styles.buttonPreviewCameraControl,
                  disabled: photoMain ? false : true,
                },*/
              ]}
            />
          </Camera>
        );
      } else if (labelPhotoOpen) {
        return (
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
                /*{
                  value: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  onPress: () => deleteLabelPic(),
                  style: styles.buttonPreviewCameraControl,
                  disabled: photoLabel ? false : true,
                  //disabled: photoMain && photoLabel ? false : true
                },*/
              ]}
            />
          </Camera>
        );
      } else if (labelPhotoOpenExtra) {
        return (
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
                /*{
                  value: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  onPress: () => deleteLabelPic(),
                  style: styles.buttonPreviewCameraControl,
                  disabled: photoLabel ? false : true,
                  //disabled: photoMain && photoLabel ? false : true
                },*/
              ]}
            />
          </Camera>
        );
      }
      
      
      else if (morePhotosOpen) {
        return (
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
                /*{
                value: 'delete',
                label: 'Delete',
                icon: 'delete',
                onPress: ()=>deleteLabelPic(),
                style: styles.buttonPreviewCameraControl,
                disabled: photoLabel ? false : true 
                //disabled: photoMain && photoLabel ? false : true 
              },*/
              ]}
            />
          </Camera>
        );
      } else if (editPhotoOpen !== '') {
        return (
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
        );
      }
    }
  }

  if (step === 2) {
    return (
      <BarcodeStage
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
        barcodeOpen={barcodeOpen}
        onOpenBarcode={onOpenBarcode}
        handleBarCodeScanned={handleBarCodeScanned}
        barcodeValue={barcodeValue}
        deleteBarcodeValue={deleteBarcodeValue}
        getCategories={getCategories}
        category={category}
        searchCategories={searchCategories}
        saveListing={saveListing}
      />
    );
  }

  if (step === 3) {
    return (
      <CategoryStage
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        onOpenBackDialog={onOpenBackDialog}
        goToFirstStep={goToFirstStep}
        processingCategories={processingCategories}
        categories={categories}
        onSelectedCategory={onSelectedCategory}
        category={category}
        saveListing={saveListing}
        //processLabel={processLabel}
        //photoLabel={photoLabel}
      />
    );
  }

  if (step === 4) {
    return (
      <ItemSpecificsStage
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
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
        photoLabel={photoLabel}
        type={type}
        processLabel={processLabel}
      />
    );
  }

  if (step === 5) {
    return (
      <ConditionStage
        title={title}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
        processingCategoryFeatures={processingCategoryFeatures}
        categoryFeatures={categoryFeatures}
        condition={condition}
        onSelectedCondition={onSelectedCondition}
        conditionDescription={conditionDescription}
        onChangeConditionDescription={onChangeConditionDescription}
        saveListing={saveListing}
        onProcessingTitle={onProcessingTitle}

        //changeValueItemAspect={changeValueItemAspect}
        //checkedAllAspects={checkedAllAspects}
      />
    );
  }

  if (step === 6) {
    return (
      <DimensionStage
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
        //onChangeDimensions={onChangeDimensions}
        onChangeLength={onChangeLength}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        //onChangeWeight={onChangeWeight}
        onChangeWeightMayor={onChangeWeightMayor}
        onChangeWeightMinor={onChangeWeightMinor}
        length={length}
        height={height}
        width={width}
        weightMayor={weightMayor}
        weightMinor={weightMinor}
        saveListing={saveListing}
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
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
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
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
        forward={forward}
        titleProcessed={titleProcessed}
        descriptionProcessed={descriptionProcessed}
        onChangeTitle={onChangeTitle}
        onChangeDescription={onChangeDescription}
        processingPrices={processingPrices}
        getPrices={getPrices}
        saveListing={saveListing}
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
        title={title}
        typeHeader={'createListing'}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        goToFirstStep={goToFirstStep}
        onOpenBackDialog={onOpenBackDialog}
        getPrices={getPrices}
        prices={prices}
        processingPrices={processingPrices}
        pricingList={pricingList}
        onChangeProductPrice={onChangeProductPrice}
        priceProduct={priceProduct}
        onChangeQuantity={onChangeQuantity}
        quantity={quantity}
        saveListing={saveListing}
        category={category}
        getCategoriesFeatures={getCategoriesFeatures}
        checkedAllAspects={checkedAllAspects}
        onProcessingTitle={onProcessingTitle}
        onPublishEbay={onPublishEbay}
        titleProcessed={titleProcessed}
        goToStep={goToStep}
        isChangedAspects={isChangedAspects}

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
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  imageList: {
    //marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  surface: {
    height: 138,
    width: 103.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  surfaceSmall: {
    height: 70,
    width: 52.5,
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
    marginTop: 25,
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
