import React from 'react';
import { useRecoilState } from 'recoil';
import { Appbar, useTheme } from 'react-native-paper';
import selectedAtom from '../Store/atoms/selectedAtom';

export default function Header(props) {
  const theme = useTheme();
  const [selected, setSelected] = useRecoilState(selectedAtom);

  const onBack = () => {
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
            onPress={() => console.log('Delete items!')}
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
