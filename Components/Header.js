import React from 'react';
import { Amplify, API, graphqlOperation } from 'aws-amplify';
import { useRecoilState } from 'recoil';
import { Appbar, useTheme } from 'react-native-paper';
import selectedAtom from '../Store/atoms/selectedAtom';
import * as mutations from '../src/graphql/mutations';
import snackBarAtom from '../Store/atoms/snackBarAtom';
import generalProcessingAtom from '../Store/atoms/generalProcessingAtom';

import awsconfig from '../src/aws-exports';

Amplify.configure(awsconfig);

export default function Header(props) {
  const theme = useTheme();
  const [selected, setSelected] = useRecoilState(selectedAtom);
  const [snackBar, setSnackBar] = useRecoilState(snackBarAtom);
  const [generalProcessing, setGeneralProcessing] = useRecoilState(
    generalProcessingAtom
  );

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

  const onDeleteItems = async () => {
    setGeneralProcessing(true);
    for await (const item of selected) {
      deleteListing(item);
    }

    setGeneralProcessing(false);
    setSnackBar({
      visible: true,
      text: `${selected.length} Listing(s) Deleted`,
    });
    setSelected([]);
  };

  if (props.type === 'selection') {
    if (props.indexTab === 0) {
      return (
        <Appbar.Header style={{ backgroundColor: theme.colors.background }}>
          <Appbar.BackAction onPress={() => onBack()} />
          <Appbar.Content
            title={props.title}
            color={theme.colors.onBackground}
          />
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
