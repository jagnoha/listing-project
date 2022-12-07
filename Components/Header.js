import React, { useState } from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useRecoilState } from 'recoil';
import {
  
  View
  
} from 'react-native';
import { Appbar, useTheme, Dialog, Button, Portal, ActivityIndicator } from 'react-native-paper';
import selectedAtom from '../Store/atoms/selectedAtom';
import * as mutations from '../src/graphql/mutations';
import * as queries from '../src/graphql/queries';
import snackBarAtom from '../Store/atoms/snackBarAtom';
import generalProcessingAtom from '../Store/atoms/generalProcessingAtom';
import { v4 as uuidv4 } from 'uuid';


import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

export default function Header(props) {
  const theme = useTheme();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);
  const [generalProcessing, setGeneralProcessing] = useRecoilState(
    generalProcessingAtom
  );

  const [processing, setProcessing] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

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

      if (deletedListing) {
        //navigation.goBack();
        //setSelected(old => old.filter(item => item.id !== id ));
        console.log(deleteListing);
        //setSnackBar({ visible: true, text: 'Listing Deleted' });
      }
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
        weight: listingResult.weight,
        quantity: listingResult.quantity,
        isReadyToGo: listingResult.isReadyToGo,
      };      

      const newListing = await API.graphql({
        query: mutations.createListing,
        variables: { input: listingDetails },
      });

      console.log(newListing);


     


    } catch(error){
      console.log(error);
    }

  }

  const onDeleteItems = async () => {
    
    setOpenDeleteDialog(true);
    
    
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

    } catch(error){
      console.log(error);
      setProcessing(false);
    }
  }

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
            <Dialog.Title style={{ textAlign: 'center' }}>
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


  if (props.type === 'selection') {
    if (props.indexTab === 0) {
      return (
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
          <Appbar.BackAction onPress={() => onBack()} />
          <Appbar.Content
            title={props.title}
            color={theme.colors.onBackground}
          />
          {selected.length === 1 ? <Appbar.Action
            icon='plus-circle-multiple-outline'
            onPress={() => onCopyItem()}
      />:''}
          <Appbar.Action
            icon='delete-outline'
            onPress={() => onDeleteItems()}
          />
        </Appbar.Header>
      );
    }
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

  if (props.type === 'createListing') {
    return (
      <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
        <Appbar.BackAction onPress={() => props.actionBack()} />
        <Appbar.Content title={props.title} color={theme.colors.onBackground} />
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
