import React, { useState, useEffect, useRef } from 'react';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  Banner,
} from 'react-native-paper';

import { useRecoilState } from 'recoil';
import axios from 'axios';

import { Pressable } from 'react-native';
import Svg, { Circle, Rect } from 'react-native-svg';
import { StyleSheet, View, Image, Platform, SafeAreaView } from 'react-native';
//import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

import { useNavigation, useRoute } from '@react-navigation/native';

import usernameAtom from '../Store/atoms/usernameAtom';
import fulfillmentPoliciesAtom from '../Store/atoms/fulfillmentPoliciesAtom';
import paymentPoliciesAtom from '../Store/atoms/paymentPoliciesAtom';
import returnPoliciesAtom from '../Store/atoms/returnPoliciesAtom';

import Header from './Header';
import SearchProduct from './CreateProductWizard/SearchProduct';
import PhotosSection from './CreateProductWizard/PhotosSection';
import BarcodeStage from './CreateProductWizard/BarcodeStage';
import CategoryStage from './CreateProductWizard/CategoryStage';
import ItemSpecificsStage from './CreateProductWizard/ItemSpecificsStage';
import ConditionStage from './CreateProductWizard/ConditionStage';
import DimensionStage from './CreateProductWizard/DimensionStage';
import PolicyStage from './CreateProductWizard/PolicyStage';

export default function AddListingForm(props) {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();

  const [username, setUsername] = useRecoilState(usernameAtom);

  const [fulfillmentPolicies, setFulfillmentPolicies] = useRecoilState(
    fulfillmentPoliciesAtom
  );
  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);
  const [returnPolicies, setReturnPoliciesAtom] =
    useRecoilState(returnPoliciesAtom);

  //const [hasBarcodePermission, setHasBarcodePermission] = useState();
  const [searchCategories, setSearchCategories] = useState('');
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photos, setPhotos] = useState([]);
  const [photoMain, setPhotoMain] = useState();
  const [photoLabel, setPhotoLabel] = useState();
  const [barcodeValue, setBarcodeValue] = useState();
  const [categories, setCategories] = useState([]);

  const [categoryFeatures, setCategoryFeatures] = useState();

  //const [fulfillmentPolicies, setFulfillmentPolicies] = useState([]);
  //const [paymentPolicies, setPaymentPolicies] = useState([]);
  //const [returnPolicies, setReturnPolicies] = useState([]);

  const [processingPolicies, setProcessingPolicies] = useState(false);

  const [processingCategoryFeatures, setProcessingCategoryFeatures] =
    useState();

  const [checkedAllAspects, setCheckedAllAspects] = useState(false);

  /*const [dimensions, setDimensions] = useState({length: '6', height: '6', width: '6'});*/

  const [length, setLength] = useState('6');
  const [height, setHeight] = useState('6');
  const [width, setWidth] = useState('6');
  const [weight, setWeight] = useState('6');

  const [category, setCategory] = useState('');

  const [processingCategories, setProcessingCategories] = useState(false);

  const [aspects, setAspects] = useState([]);
  const [processingAspects, setProcessingAspects] = useState(false);

  const [openCamera, setOpenCamera] = useState(false);
  const [mainPhotoOpen, setMainPhotoOpen] = useState(false);
  const [labelPhotoOpen, setLabelPhotoOpen] = useState(false);
  const [morePhotosOpen, setMorePhotosOpen] = useState(false);
  const [editPhotoOpen, setEditPhotoOpen] = useState('');

  const [condition, setCondition] = useState('');
  const [conditionDescription, setConditionDescription] = useState('');

  const [barcodeOpen, setBarcodeOpen] = useState(false);

  const [listPhotoOpen, setListPhotoOpen] = useState(0);

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

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>;
  } else if (!hasCameraPermission) {
    return (
      <Text>
        Permission for camera not granted. Please change this in settings.
      </Text>
    );
  }

  const getTypeProductCode = (typeName) => {
    if (typeName === 'autoparts') {
      return 1;
    }
    return 0;
  };

  const onChangeConditionDescription = async (value) => {
    setConditionDescription(value);
  };

  /*const onChangeDimensions = async (value, dimension) => {
    
    //setDimensions({...old,  })
console.log('Hola');

  }*/

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
        `https://listerfast.com/api/ebay/categoryfeatures/${username}/${categoryId}`
      );

      const json = await response.json();
      let result;

      if (json.Category.ConditionEnabled) {
        console.log('conditions!');
        result = json;
        result.conditions = result.Category.ConditionValues.Condition;
      } else {
        console.log('No conditions!');
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
      console.log(result.conditions);
      setCategoryFeatures(result);
      setProcessingCategoryFeatures(false);
    } catch (error) {
      console.log(error);
      setProcessingCategoryFeatures(false);
    }
  };

  const onSelectedCondition = (conditionId) => {
    setCondition(conditionId);
  };

  const getItemAspects = async (categoryId) => {
    try {
      setProcessingAspects(true);
      const response = await fetch(
        `https://listerfast.com/api/ebay/aspectsbycategory/${username}/${getTypeProductCode(
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
            return {
              localizedAspectName: itemProduct.localizedAspectName,
              aspectValues: itemProduct.aspectValues
                ? itemProduct.aspectValues.map((value) => value.localizedValue)
                : [],
              value: '',
              require: true,
              cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
              mode: itemProduct.aspectConstraint.aspectMode,
            };
          }

          return {
            localizedAspectName: itemProduct.localizedAspectName,
            aspectValues: itemProduct.aspectValues
              ? itemProduct.aspectValues.map((value) => value.localizedValue)
              : [],
            value: '',
            require: itemProduct.aspectConstraint.aspectRequired ? true : false,
            cardinality: itemProduct.aspectConstraint.itemToAspectCardinality,
            mode: itemProduct.aspectConstraint.aspectMode,
          };
        });

      console.log(aspects);

      setAspects(aspects.sort((a, b) => b.require - a.require));
      setProcessingAspects(false);
    } catch (error) {
      console.log(error);
      setProcessingAspects(false);
    }
  };

  const changeValueItemAspect = (itm, value) => {
    console.log(itm);
    console.log(value);
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
  };

  const getPolicies = async () => {
    try {
      if (
        fulfillmentPolicies.length === 0 &&
        paymentPolicies.length === 0 &&
        returnPolicies.length === 0
      ) {
        setProcessingPolicies(true);

        const responseFulfillment = await fetch(
          `https://listerfast.com/api/ebay/policies/fulfillment/${username}/${getTypeProductCode(
            type
          )}`
        );

        const responsePayment = await fetch(
          `https://listerfast.com/api/ebay/policies/payment/${username}/${getTypeProductCode(
            type
          )}`
        );

        const responseReturn = await fetch(
          `https://listerfast.com/api/ebay/policies/return/${username}/${getTypeProductCode(
            type
          )}`
        );

        const jsonFulfillment = await responseFulfillment.json();
        const jsonPayment = await responsePayment.json();
        const jsonReturn = await responseReturn.json();

        setFulfillmentPolicies(jsonFulfillment);
        setPaymentPolicies(jsonPayment);
        setReturnPolicies(jsonReturn);

        console.log(jsonFulfillment);
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

      const response = await fetch(
        `https://listerfast.com/api/ebay/categorysuggestions/${username}/${getTypeProductCode(
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
      console.log(categories);
      setProcessingCategories(false);
    } catch (error) {
      setProcessingCategories(false);
      console.log(error);
    }
  };

  const onSelectedCategory = (id) => {
    setCategory(id);
    console.log(id);
    forward();
    getItemAspects(id);
  };

  let forward = async () => {
    setStep((old) => old + 1);
  };

  let backward = async () => {
    setStep((old) => old - 1);
  };

  let takePicMain = async () => {
    let options = {
      quality: 0.7,
      base64: true,
      skipProcessing: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotoMain(newPhoto);

    const source = newPhoto.uri;
    if (source) {
      await cameraRef.current.pausePreview();
      setOpenCamera(false);
      setMainPhotoOpen(false);
      console.log('picture source', source);
    }
  };

  const handleBarCodeScanned = ({ type, data }) => {
    console.log(type);
    console.log(data);
    setBarcodeValue({ type, data });
    setBarcodeOpen(false);
  };

  const deleteBarcodeValue = () => {
    setBarcodeValue();
  };

  const onOpenPreviewPhoto = (async = () => {
    console.log('ADD NEW PHOTO!!!!');
    setOpenCamera(true);
    setMorePhotosOpen(true);
  });

  const onOpenEditPhoto = (async = (id) => {
    console.log('EDIT PHOTO: ', id);
    setOpenCamera(true);
    setEditPhotoOpen(id);
  });

  const onOpenBarcode = (async = (value) => {
    setBarcodeOpen(value);
  });

  const takeNewPic = async () => {
    let options = {
      quality: 0.7,
      base64: true,
      skipProcessing: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotos((old) => [...old, { id: newPhoto.uri, value: newPhoto }]);

    const source = newPhoto.uri;

    if (source) {
      await cameraRef.current.pausePreview();
      setMorePhotosOpen(false);
      setOpenCamera(false);
      console.log('picture source', source);
    }
  };

  const takeEditPic = async () => {
    let options = {
      quality: 0.7,
      base64: true,
      skipProcessing: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotos((old) =>
      old.map((item) => {
        if (item.id === editPhotoOpen) {
          return {
            id: item.id,
            value: newPhoto,
          };
        }
        return item;
      })
    );
    //setPhotos((old) => [...old, { id: newPhoto.uri, value: newPhoto }]);

    const source = newPhoto.uri;

    if (source) {
      await cameraRef.current.pausePreview();
      //setMorePhotosOpen(false);
      setEditPhotoOpen('');
      setOpenCamera(false);
      console.log('picture source', source);
    }
  };

  const takePicLabel = async () => {
    let options = {
      quality: 0.7,
      base64: true,
      skipProcessing: true,
      exif: false,
    };

    let newPhoto = await cameraRef.current.takePictureAsync(options);
    setPhotoLabel(newPhoto);

    const source = newPhoto.uri;

    if (source) {
      await cameraRef.current.pausePreview();
      setLabelPhotoOpen(false);
      setOpenCamera(false);
      console.log('picture source', source);
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

  const onMainPhotoOpen = async () => {
    setMainPhotoOpen(true);
    setOpenCamera(true);
  };

  const onLabelPhotoOpen = async () => {
    setLabelPhotoOpen(true);
    setOpenCamera(true);
  };

  const onSearchCategories = async (query) => {
    setSearchCategories(query);
  };

  if (step === 0) {
    return (
      <SearchProduct
        title={title}
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
            navigation={navigation}
            styles={styles}
            onMainPhotoOpen={onMainPhotoOpen}
            photoMain={photoMain}
            photoLabel={photoLabel}
            onLabelPhotoOpen={onLabelPhotoOpen}
            photos={photos}
            backward={backward}
            forward={forward}
            type={type}
            onOpenPreviewPhoto={onOpenPreviewPhoto}
            onOpenEditPhoto={onOpenEditPhoto}
          />
        </View>
      );
    } else {
      if (mainPhotoOpen) {
        return (
          <Camera style={styles.container} ref={cameraRef}>
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
                  onPress: () => takePicMain(),
                  style: styles.buttonPreviewCameraControl,
                  //disabled: photoMain && photoLabel ? false : true
                },
                {
                  value: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  onPress: () => deleteMainPic(),
                  style: styles.buttonPreviewCameraControl,
                  disabled: photoMain ? false : true,
                },
              ]}
            />
          </Camera>
        );
      } else if (labelPhotoOpen) {
        return (
          <Camera style={styles.container} ref={cameraRef}>
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
                {
                  value: 'delete',
                  label: 'Delete',
                  icon: 'delete',
                  onPress: () => deleteLabelPic(),
                  style: styles.buttonPreviewCameraControl,
                  disabled: photoLabel ? false : true,
                  //disabled: photoMain && photoLabel ? false : true
                },
              ]}
            />
          </Camera>
        );
      } else if (morePhotosOpen) {
        return (
          <Camera style={styles.container} ref={cameraRef}>
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
          <Camera style={styles.container} ref={cameraRef}>
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
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        barcodeOpen={barcodeOpen}
        onOpenBarcode={onOpenBarcode}
        handleBarCodeScanned={handleBarCodeScanned}
        barcodeValue={barcodeValue}
        deleteBarcodeValue={deleteBarcodeValue}
        getCategories={getCategories}
        category={category}
        searchCategories={searchCategories}
      />
    );
  }

  if (step === 3) {
    return (
      <CategoryStage
        title={title}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        processingCategories={processingCategories}
        categories={categories}
        onSelectedCategory={onSelectedCategory}
        category={category}
      />
    );
  }

  if (step === 4) {
    return (
      <ItemSpecificsStage
        title={title}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        processingAspects={processingAspects}
        aspects={aspects}
        changeValueItemAspect={changeValueItemAspect}
        checkedAllAspects={checkedAllAspects}
        category={category}
        getCategoriesFeatures={getCategoriesFeatures}
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
        processingCategoryFeatures={processingCategoryFeatures}
        categoryFeatures={categoryFeatures}
        condition={condition}
        onSelectedCondition={onSelectedCondition}
        conditionDescription={conditionDescription}
        onChangeConditionDescription={onChangeConditionDescription}

        //changeValueItemAspect={changeValueItemAspect}
        //checkedAllAspects={checkedAllAspects}
      />
    );
  }

  if (step === 6) {
    return (
      <DimensionStage
        title={title}
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        //onChangeDimensions={onChangeDimensions}
        onChangeLength={onChangeLength}
        onChangeHeight={onChangeHeight}
        onChangeWidth={onChangeWidth}
        onChangeWeight={onChangeWeight}
        length={length}
        height={height}
        width={width}
        weight={weight}
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
        navigation={navigation}
        styles={styles}
        backward={backward}
        forward={forward}
        processingPolicies={processingPolicies}
        fulfillmentPolicies={fulfillmentPolicies}
        paymentPolicies={paymentPolicies}
        returnPolicies={returnPolicies}

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
    height: 350,
    marginTop: '40%',
    //marginBottom: '55%',
    position: 'absolute',
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

    height: '80%', //window.height / 2,
    width: '80%', //window.height,
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
    height: 115,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },

  surfaceSmall: {
    height: 70,
    width: 90,
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
