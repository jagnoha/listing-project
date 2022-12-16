import React, { useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useRecoilState } from 'recoil';
import { View } from 'react-native';
import {
  Appbar,
  useTheme,
  Dialog,
  Button,
  Portal,
  ActivityIndicator,
  Text,
} from 'react-native-paper';
import selectedAtom from '../Store/atoms/selectedAtom';
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import snackBarAtom from '../Store/atoms/snackBarAtom';
import generalProcessingAtom from '../Store/atoms/generalProcessingAtom';
import ebayUserAtom from '../Store/atoms/ebayUserAtom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import urlImagesAtom from '../Store/atoms/urlImagesAtom';
import userAccountAtom from '../Store/atoms/userAccountAtom';
import paymentPoliciesAtom from '../Store/atoms/paymentPoliciesAtom';

import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

export default function Header(props) {
  const theme = useTheme();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [ebayUser, setEbayUser] = useRecoilState(ebayUserAtom);
  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);
  const [urlImages, setUrlImages] = useRecoilState(urlImagesAtom);

  const [userAccount, setUserAccount] = useRecoilState(userAccountAtom);

  const [generalProcessing, setGeneralProcessing] = useRecoilState(
    generalProcessingAtom
  );

  const [paymentPolicies, setPaymentPolicies] =
    useRecoilState(paymentPoliciesAtom);

  const [processing, setProcessing] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openPublishDialog, setOpenPublishDialog] = useState(false);

  const onBack = () => {
    setSelected([]);
  };

  const deleteListing = async (item) => {
    try {
      console.log('deleted Listing');

      const id = item.id;

      const version = item.version;

      const listingDetails = {
        id: id,
        _version: version,
      };

      const deletedListing = await API.graphql({
        query: mutations.deleteListing,
        variables: { input: listingDetails },
      });

      /*if (deletedListing) {
        
        console.log(deleteListing);
      }*/
    } catch (error) {
      console.log(error);
    }
  };

  const onCopyItem = async () => {
    try {
      const id = selected[0].id;

      const listing = await API.graphql({
        query: queries.getListing,
        variables: { id: id },
      });

      const listingResult = listing.data.getListing;

      //***************************************************** */

      const newId = uuidv4();

      const listingDetails = {
        id: newId,
        sku: newId,
        modelType: 'Listing',
        accountsID: listingResult.accountsID,
        title: `(Copy) ${listingResult.title}`,
        description: listingResult.description,
        price: listingResult.price,
        itemsSpecifics: listingResult.itemsSpecifics,
        categoryFeatures: listingResult.categoryFeatures,
        isDraft: listingResult.isDraft,
        type: listingResult.type,
        photoMain: listingResult.photoMain,
        photoLabel: listingResult.photoLabel,
        photos: listingResult.photos,
        lastStep: listingResult.lastStep,
        ebayMotors: listingResult.ebayMotors,
        categoryID: listingResult.categoryID,
        categoryList: listingResult.categoryList,
        shippingProfileID: listingResult.shippingProfileID,
        returnProfileID: listingResult.returnProfileID,
        paymentProfileID: listingResult.paymentProfileID,
        conditionCode: listingResult.conditionCode,
        conditionDescription: listingResult.conditionDescription,
        conditionName: listingResult.conditionName,
        UPC: listingResult.UPC,
        ISBN: listingResult.ISBN,
        EAN: listingResult.EAN,
        barcodeValue: listingResult.barcodeValue,
        length: listingResult.length,
        width: listingResult.width,
        height: listingResult.height,
        weightMayor: listingResult.weightMayor,
        weightMinor: listingResult.weightMinor,
        quantity: listingResult.quantity,
        isReadyToGo: listingResult.isReadyToGo,
      };

      const newListing = await API.graphql({
        query: mutations.createListing,
        variables: { input: listingDetails },
      });

      //console.log(newListing);

      setSnackBar({
        visible: true,
        text: `Listing Copied`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteItems = async () => {
    setOpenDeleteDialog(true);
  };

  const publishItems = async () => {
    try {
      //setOpenPublishDialog(false);

      setProcessing(true);

      for await (const item of selected) {
        publishListing(item.id);
      }

      setProcessing(false);
      setOpenPublishDialog(false);

      setSnackBar({
        visible: true,
        text: `${selected.length} Listing(s) publish on eBay`,
      });
      setSelected([]);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  const updateItemOnline = async (id, version) => {
    try {
      const listingDetails = {
        id: id,
        _version: version,
        isDraft: false,
      };

      const updateListing = await API.graphql({
        query: mutations.updateListing,
        variables: { input: listingDetails },
      });

      //console.log(updateListing);
    } catch (error) {
      console.log(error);
    }
  };

  const checkBestOffer = (paymentPolicyId) => {
    let policy = paymentPolicies.find((item) => item.id === paymentPolicyId);

    if (policy.name.includes('Immediate')) {
      return false;
    }

    return true;
  };

  const publishListing = async (id) => {
    try {
      const oneListing = await API.graphql({
        query: queries.getListing,
        variables: { id: id },
      });

      const listing = oneListing.data.getListing;

      const version = listing._version;

      //console.log(listing.title);

      //getCategoriesFeatures(listing.categoryID);

      const photoMain = listing.photoMain;
      const photoLabel = listing.photoLabel;
      const photos = JSON.parse(listing.photos);
      const aspects = JSON.parse(listing.itemsSpecifics);
      const category = listing.categoryID;

      const condition = Number(listing.conditionCode);
      const conditionDescription = listing.conditionDescription;
      const length = listing.length.toString();
      const height = listing.height.toString();
      const width = listing.width.toString();
      const weightMayor = listing.weightMayor.toString();
      const weightMinor = listing.weightMinor.toString();

      const fulfillmentPolicyId = listing.shippingProfileID;
      const returnPolicyId = listing.returnProfileID;
      const paymentPolicyId = listing.paymentProfileID;
      const titleProcessed = listing.title;
      const descriptionProcessed = listing.description;
      const quantity = listing.quantity.toString();
      const priceProduct = listing.price.toString();

      const type = listing.type;

      /****************************************************/

      let urlPost = 'https://listerfast.com/api/ebay/additem';

      let images = [];
      let pictureMain = `${urlImages}${photoMain}`;
      let pictureLabel = photoLabel ? `${urlImages}${photoLabel}` : [];
      let photosTemp = photos.map((item) => `${urlImages}${item.value}`);

      images = images.concat(pictureMain, photosTemp, pictureLabel);

      //console.log(images);

      const res = await axios.post(urlPost, {
        product: {
          SKU: id,
          bestOffer: checkBestOffer(paymentPolicyId),
          title: titleProcessed,
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
              Value: item.value,
              Source: 'ItemSpecific',
            })),
          },

          weightMajor: Number(weightMayor),
          weightMinor: Number(weightMinor),
          packageDepth: Number(height),
          packageLength: Number(length),
          packageWidth: Number(width),
          siteID: type === 'AUTOPARTS' ? '100' : '0',
          site: type === 'AUTOPARTS' ? 'eBayMotors' : 'US',
          ebayAccountLinked: ebayUser,
        },
      });

      console.log(res.data.result.Ack);

      if (res.data.result.Ack === 'Success') {
        console.log('Product Uploaded on eBay');
        updateItemOnline(id, version);
      } else {
        console.log('Error con eBay!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onPublishItems = async () => {
    setOpenPublishDialog(true);
  };

  const deleteItems = async () => {
    try {
      setOpenDeleteDialog(false);

      setProcessing(true);

      for await (const item of selected) {
        deleteListing(item);
      }

      setProcessing(false);
      setSnackBar({
        visible: true,
        text: `${selected.length} Listing(s) Deleted`,
      });
      setSelected([]);
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  if (processing) {
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
      <Portal>
        <Dialog
          visible={openDeleteDialog}
          onDismiss={() => setOpenDeleteDialog(false)}
        >
          <Dialog.Icon icon='alert' />

          <Dialog.Title style={{ textAlign: 'center', fontSize: 20 }}>
            Are you sure you want to delete these listings?
          </Dialog.Title>
          <Dialog.Actions>
            <Button onPress={() => setOpenDeleteDialog(false)}>Cancel</Button>
            <Button onPress={() => deleteItems()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  if (openPublishDialog) {
    return (
      <Portal>
        <Dialog
          visible={openPublishDialog}
          onDismiss={() => setOpenPublishDialog(false)}
        >
          <Dialog.Icon icon='information-outline' />
          <Dialog.Title style={{ textAlign: 'center', fontSize: 20 }}>
            You are about to publish these products on the ebay account{' '}
            <Text style={{ fontWeight: 'bold', color: 'blue' }}>
              {ebayUser}
            </Text>
            . Proceed?
          </Dialog.Title>

          <Dialog.Actions>
            <Button onPress={() => setOpenPublishDialog(false)}>Cancel</Button>
            <Button onPress={() => publishItems()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }

  if (props.type === 'selection') {
    //if (props.indexTab === 0) {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => onBack()} />
        <Appbar.Content
          title={selected.length}
          color={theme.colors.onBackground}
        />
        {selected.length === 1 ? (
          <Appbar.Action
            icon='plus-circle-multiple-outline'
            onPress={() => onCopyItem()}
          />
        ) : (
          ''
        )}
        <Appbar.Action icon='delete-outline' onPress={() => onDeleteItems()} />
      </Appbar.Header>
    );
    //}
  }

  if (props.type === 'selectionReadyToGo') {
    //if (props.indexTab === 0) {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => onBack()} />
        <Appbar.Content
          title={selected.length}
          color={theme.colors.onBackground}
        />
        {selected.length === 1 ? (
          <Appbar.Action
            icon='plus-circle-multiple-outline'
            onPress={() => onCopyItem()}
          />
        ) : (
          ''
        )}
        <Appbar.Action icon='publish' onPress={() => onPublishItems()} />
        <Appbar.Action icon='delete-outline' onPress={() => onDeleteItems()} />
      </Appbar.Header>
    );
    //}
  }

  if (props.type === 'configureNewAccount') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
        <Appbar.Action icon='logout' onPress={() => props.onPress()} />
      </Appbar.Header>
    );
  }

  if (props.type === 'back') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => props.actionBack()} />
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
        {/*<Appbar.Action icon='save' onPress={()=>console.log('Delete items!')} />*/}
      </Appbar.Header>
    );
  }

  if (props.type === 'searchListing') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => props.actionBack()} />
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
        
        {/*<Appbar.Action icon='content-save-outline' onPress={()=>console.log('Save item!')} />*/}
      </Appbar.Header>
    );
  }

  if (props.type === 'createListing') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => props.actionBack()} />
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
        <Appbar.Action
          icon='content-save-outline'
          onPress={() => props.saveListing()}
        />
        {/*<Appbar.Action icon='content-save-outline' onPress={()=>console.log('Save item!')} />*/}
      </Appbar.Header>
    );
  }

  if (props.type === 'editListing') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => props.actionBack()} />
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
        <Appbar.Action
          icon='content-save-outline'
          onPress={() => props.saveListing()}
        />
        <Appbar.Action
          icon='delete-outline'
          onPress={() => props.onDeleteItem()}
        />
      </Appbar.Header>
    );
  }

  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
      <Appbar.Content
        title={props.title}
        color={theme.colors.onBackground}
        titleStyle={{ textAlign: 'center' }}
      />
    </Appbar.Header>
  );
}
