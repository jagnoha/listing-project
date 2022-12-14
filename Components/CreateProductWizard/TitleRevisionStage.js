import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    (async () => {
      console.log('Processing title!!!!');
      //props.onProcessingTitle(props.category);
      if (props.titleProcessed === '') {
        props.onProcessingTitle();
      }
    })();
  }, []);

  const onOpenTitle = () => {
    setTextForm(props.titleProcessed);
    setOpenTitle(true);
  };

  const onOpenDescription = () => {
    setTextForm(props.descriptionProcessed);
    setOpenDescription(true);
  };

  const onCloseForm = () => {
    setOpenTitle(false);
    setOpenDescription(false);
    setTextForm('');
  };

  const onApplyTitle = () => {
    props.onChangeTitle(textForm);

    onCloseForm();
  };

  const onApplyDescription = () => {
    props.onChangeDescription(textForm);
    onCloseForm();
  };

  if (openTitle === true) {
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
        <Text style={{ fontSize: 20, paddingBottom: 10, textAlign: 'center' }}>
          Edit Title{' '}
          <Text style={{ color: textForm.length > 80 ? 'red' : 'black' }}>
            ({textForm.length}
          </Text>{' '}
          chars)
        </Text>
        <Text
          style={{
            fontSize: 15,
            color: 'gray',
            textAlign: 'center',
            paddingBottom: 10,
          }}
        >
          Max 80 characters length
        </Text>
        <Surface style={{ padding: 25 }} elevation={4}>
          <TextInput
            mode='outlined'
            label='Title'
            value={textForm}
            onChangeText={(value) => setTextForm(value)}
          />
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
              disabled: textForm.length > 80 ? true : false,
              //onPress: () => onApplyWheel(),
            },
          ]}
        />
      </View>
    );
  }

  if (openDescription === true) {
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
            <TextInput
              multiline={true}
              mode='outlined'
              label='Description'
              value={textForm}
              onChangeText={(value) => setTextForm(value)}
            />
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
    );
  }

  return (
    <View>
      <Header
        title={props.title}
        //type='createListing'
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        type={props.typeHeader}
        actionBack={props.navigation.goBack}
        
      />
      <View>
        <Banner visible={true} icon={'draw'}>
          A <Text style={{ fontWeight: 'bold' }}>Title</Text> and{' '}
          <Text style={{ fontWeight: 'bold' }}>Description</Text> for your new
          listing was processed and built.
        </Banner>

        <View>
          <Surface elevation={4}>
            {props.isChangedAspects ? (
              <View>
                <Text
                  style={{
                    paddingTop: 10,
                    paddingLeft: 20,
                    paddingRight: 20,
                    textAlign: 'center',
                  }}
                >
                  You have made changes to Item Specifics.
                </Text>
                <Button
                  icon='refresh'
                  mode='text'
                  onPress={() => {
                    props.onProcessingTitle();
                    props.onIsChangedAspects(false);
                  }}
                >
                  Refresh Title & Description
                </Button>
              </View>
            ) : (
              ''
            )}
            <Card style={{ padding: 10 }}>
              <Card.Content>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}
                >
                  <Title style={{ fontSize: 20, fontWeight: 'bold' }}>
                    Title{' '}
                    <Text style={{ color: 'red', fontSize: 14 }}>
                      {props.titleProcessed.length > 80
                        ? '( Exceeds 80 chars )'
                        : ''}
                    </Text>
                  </Title>

                  <Text>
                    <IconButton
                      icon='refresh'
                      iconColor={'#67BE65'}
                      onPress={() => {
                        props.onProcessingTitle();
                        props.onIsChangedAspects(false);
                      }}
                    />
                    <IconButton
                      icon='pencil'
                      iconColor={'#27A2CA'}
                      onPress={() => onOpenTitle()}
                    />
                  </Text>
                </View>
                <Paragraph style={{ fontSize: 15 }}>
                  {props.titleProcessed}
                </Paragraph>
              </Card.Content>
            </Card>
          </Surface>

          <ScrollView style={{ height: 200 }}>
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
                      <IconButton
                        icon='pencil'
                        iconColor={'#27A2CA'}
                        onPress={() => onOpenDescription()}
                      />
                    </Text>
                  </View>

                  <Paragraph style={{ fontSize: 15 }}>
                    {props.descriptionProcessed}
                  </Paragraph>
                </Card.Content>
              </Card>
            </Surface>
          </ScrollView>
        </View>

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'firststep',
              //label: 'First Step',
              icon: 'page-first',
              onPress: () => {
                props.goToFirstStep();
                //props.getCategoriesFeatures(props.category);
              },
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'back',
              //label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'next',
              //label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                props.forward();

                //props.getPrices();
              },
              disabled: props.titleProcessed.length > 80,
              //disabled: true, //props.category !== '' ? false : true,
            },
          ]}
        />
        

        {/*<View style={{justifyContent: 'flex-end'}}>
      <Button
          onPress={() => props.saveListing()}
          style={{ marginTop: 15 }}
          icon='clock-edit-outline'
        >
          Save and close to finish later
        </Button>
        </View>*/}

      </View>
    </View>
  );
}
