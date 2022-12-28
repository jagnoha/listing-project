import React from 'react';
import { View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  TextInput,
  Banner,
  Divider,
  
} from 'react-native-paper';
import Header from '../Header';

export default function AccountInfo(props) {
  //const theme = useTheme();

  return (
    <View>
      <Header
        title={'Account Info'}
        type={'back'}
        actionBack={props.goBack}
      />
      <Divider />
      
        <View style={{margin: 15}}>
        <TextInput
                mode="outlined"
                label="Username"
                placeholder="Username"
                value={props.userName}
                editable={false}
        />
        </View>

        <View style={{margin: 15}}>
        <TextInput
                mode="outlined"
                label="Email"
                placeholder="Email"
                value={props.email}
                editable={false}
        />
        </View>

        <View style={{margin: 15}}>
        <TextInput
                mode="outlined"
                label="Plan"
                placeholder="Plan"
                value={props.plan}
                editable={false}
        />
        </View>

        <View style={{margin: 50}}>
        <Button icon="logout-variant" mode="contained" onPress={() => props.logout()}>
            Sign out
        </Button>
        </View>
      

    </View>
  );
}