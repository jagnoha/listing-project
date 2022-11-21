import React from 'react';
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
            onPress={() => console.log('Edit title')}
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
              onPress={() => console.log('Edit description')}
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
              disabled: true, //props.category !== '' ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}
