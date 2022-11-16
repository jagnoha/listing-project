import React from 'react';
import { View, ScrollView, Pressable } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  ActivityIndicator,
  Banner,
  TextInput,
  Title,
} from 'react-native-paper';
import Header from '../Header';

export default function ConditionStage(props) {
  //const theme = useTheme();

  //console.log(props.categoryFeatures);

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'playlist-edit'}>
          Select the condition of this item. If there are some additional
          details or defects, you can add it in the condition description.
        </Banner>

        {props.processingCategoryFeatures ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <View
            style={{ flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <ScrollView style={{ height: '60%' }}>
              {props.categoryFeatures.conditions.map((item) => {
                return (
                  <View key={item.ID}>
                    <Pressable
                      //onPress={() => props.onSelectedCategory(item.categoryId)}
                      onPress={() => console.log(item.ID)}
                    >
                      <Card>
                        <Card.Content>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'space-between',
                            }}
                          >
                            <View>
                              <Title>{item.DisplayName}</Title>
                            </View>
                            {/*props.category === item.categoryId ? <View>
                          <IconButton
                              icon='check-outline'
                              iconColor={'green'}
                              size={20}
                            />
                        </View> : ''*/}
                          </View>
                        </Card.Content>
                      </Card>
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>
            <TextInput
              //mode='outlined'
              label='Condition Description'
              placeholder='Add Condition Description'
            />
            {/*<Searchbar
              icon='pencil'
              placeholder='Condition Description'
              onChangeText={props.onSearchCategories}
              value={props.searchCategories}
            />*/}
          </View>
        )}

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'back',
              label: 'Back',
              icon: 'arrow-left',
              onPress: () => props.backward(),
              //disabled: 'true'
            },
            {
              value: 'next',
              label: 'Next',
              icon: 'arrow-right',
              onPress: () => {
                props.setCategory('');
                props.forward();
              },
              disabled: true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
      </View>
    </View>
  );
}
