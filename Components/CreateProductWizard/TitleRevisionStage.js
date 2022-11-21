import React, {useState} from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Title,
  Surface,
  Button,
  Searchbar,
  TextInput,
  SegmentedButtons,
  Banner,
  Paragraph,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import Header from '../Header';

export default function TitleRevisionStage(props) {
  //const theme = useTheme();

  const [openTitle, setOpenTitle] = useState(false);
  const [openDescription, setOpenDescription] = useState(false);
  const [textForm, setTextForm] = useState('');

  const onOpenTitle = () => {
    setTextForm(props.titleProcessed);
    setOpenTitle(true);
    
  } 

  const onOpenDescription = () => {
    setTextForm(props.descriptionProcessed);
    setOpenDescription(true);
  } 

  const onCloseForm = () => {
    setOpenTitle(false);
    setOpenDescription(false);
    setTextForm('');
  }

  const onApplyTitle = () => {
    props.onChangeTitle(textForm);
    onCloseForm();
  }

  const onApplyDescription = () => {
    props.onChangeDescription(textForm);
    onCloseForm()
  }

  if (openTitle === true){
    return (

        <View
        style={{
          flex: 1,
          //padding: 30,
          //justifyContent: 'space-between',
          //alignItems: 'center',
          //alignContent: 'center',
          //alignSelf: 'center',
          paddingTop: 100,
          //paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 20, textAlign: 'center' }}>
          Edit Title
        </Text>
        <Surface style={{ padding: 25 }} elevation={4}>
        <TextInput mode='outlined' label='Title' value={textForm} onChangeText={value => setTextForm(value)} />
        </Surface>
        


        <SegmentedButtons
            style={props.styles.nextBackControl}
            onValueChange={() => console.log('Change value')}
            buttons={[
              {
                value: 'close',
                label: 'Close',
                icon: 'close',
                onPress: () => onCloseForm(),
              },
             

              {
                value: 'apply',
                label: 'Apply',
                icon: 'check',
                //disabled: searchQuery.length > 0 && wheelItems.length > 0 ? false : true,
                onPress: () => onApplyTitle(),
                //onPress: () => onApplyWheel(),
              },
            ]}
          />

        </View>
        
       


        
    )
  }

  if (openDescription === true){
    return (

        <View
        style={{
          flex: 1,
          //padding: 30,
          //justifyContent: 'space-between',
          //alignItems: 'center',
          //alignContent: 'center',
          //alignSelf: 'center',
          paddingTop: 100,
          //paddingBottom: 100,
        }}
      >
        <Text style={{ fontSize: 20, paddingBottom: 20, textAlign: 'center' }}>
          Edit Description
        </Text>
        <Surface style={{ padding: 25 }} elevation={4}>
        <ScrollView style={{ height: '65%' }}>
        <TextInput multiline={true}  mode='outlined' label='Description' value={textForm} onChangeText={value => setTextForm(value)} />
        </ScrollView>
        </Surface>
        


        <SegmentedButtons
            style={props.styles.nextBackControl}
            onValueChange={() => console.log('Change value')}
            buttons={[
              {
                value: 'close',
                label: 'Close',
                icon: 'close',
                onPress: () => onCloseForm(),
              },
             

              {
                value: 'apply',
                label: 'Apply',
                icon: 'check',
                //disabled: searchQuery.length > 0 && wheelItems.length > 0 ? false : true,
                onPress: () => onApplyDescription(), 
                //onPress: () => onApplyWheel(),
              },
            ]}
          />

        </View>
        
       


        
    )
  }

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'draw'}>
          A <Text style={{ fontWeight: 'bold' }}>Title</Text> and{' '}
          <Text style={{ fontWeight: 'bold' }}>Description</Text> for your new
          listing was processed and built. You can review it and make any
          changes you want before continuing.
        </Banner>

        <View>
          <Pressable
            //onPress={() => props.onSelectedCategory(item.categoryId)}
            onPress={() => onOpenTitle()}
          >
            <Surface elevation={4}>
              <Card style={{ padding: 10 }}>
                <Card.Content>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <Title style={{ fontSize: 20, fontWeight: 'bold' }}>
                      Title
                    </Title>

                    <Text>
                      <IconButton icon='pencil' iconColor={'green'} />
                    </Text>
                  </View>
                  <Paragraph style={{ fontSize: 15 }}>
                    {props.titleProcessed}
                  </Paragraph>
                </Card.Content>
              </Card>
            </Surface>
          </Pressable>
          <ScrollView style={{ height: '40%' }}>
            <Pressable
              //onPress={() => props.onSelectedCategory(item.categoryId)}
              onPress={() => onOpenDescription()}
            >
              <Surface elevation={4}>
                <Card style={{ padding: 10 }}>
                  <Card.Content>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Title style={{ fontSize: 20, fontWeight: 'bold' }}>
                        Description
                      </Title>

                      <Text>
                        <IconButton icon='pencil' iconColor={'green'} />
                      </Text>
                    </View>

                    <Paragraph style={{ fontSize: 15 }}>
                      {props.descriptionProcessed}
                    </Paragraph>
                  </Card.Content>
                </Card>
              </Surface>
            </Pressable>
          </ScrollView>
        </View>

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => props.forward(),
              //disabled: true, //props.category !== '' ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}
