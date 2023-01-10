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
  IconButton,
} from 'react-native-paper';
import Header from '../Header';
import ToggleStages from './ToggleStages';

export default function ConditionStage(props) {
  //const theme = useTheme();

  console.log(props.categoryFeatures);

  return (
    <View>
      <Header
        title={props.title}
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        //type='createListing'
        type={props.typeHeader}
        actionBack={props.onOpenBackDialog}
        processingSaveListing={props.processingSaveListing}
      />
      <ToggleStages
        step={props.step}
        gotoStep={props.gotoStep}
        lastStep={props.lastStep}
      />
      <View>
        <Banner visible={true} icon={'playlist-edit'}>
          Select the condition of this item. If there are some additional
          details or defects, you can add it in the condition description.
        </Banner>

        <TextInput
          //mode='outlined'
          label='Condition Description'
          placeholder='Add Condition Description'
          onChangeText={props.onChangeConditionDescription}
          value={props.conditionDescription}
          mode='outlined'
          style={{ margin: 10 }}
        />

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
            <ScrollView style={{ height: 300 }}>
              {Array.isArray(props.categoryFeatures.conditions) ? (
                props.categoryFeatures.conditions.map((item) => {
                  return (
                    <View key={item.ID}>
                      <Pressable
                        //onPress={() => props.onSelectedCategory(item.categoryId)}
                        //onPress={() => console.log(item.ID)}
                        onPress={() =>
                          props.onSelectedCondition(item.ID, item.DisplayName)
                        }
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
                              {props.condition === item.ID ? (
                                <View>
                                  {/*<IconButton
                              icon='check-outline'
                              iconColor={'green'}
                              size={20}
                            />*/}
                                  <Text>
                                    <IconButton
                                      icon='check-outline'
                                      iconColor={'green'}
                                      size={15}
                                    />
                                  </Text>
                                </View>
                              ) : (
                                ''
                              )}
                            </View>
                          </Card.Content>
                        </Card>
                      </Pressable>
                    </View>
                  );
                })
              ) : (
                <View key={props.categoryFeatures.conditions.ID}>
                  <Pressable
                    //onPress={() => props.onSelectedCategory(item.categoryId)}
                    //onPress={() => console.log(item.ID)}
                    onPress={() =>
                      props.onSelectedCondition(
                        props.categoryFeatures.conditions.ID,
                        props.categoryFeatures.conditions.DisplayName
                      )
                    }
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
                            <Title>
                              {props.categoryFeatures.conditions.DisplayName}
                            </Title>
                          </View>
                          {props.condition ===
                          props.categoryFeatures.conditions.ID ? (
                            <View>
                              {/*<IconButton
                              icon='check-outline'
                              iconColor={'green'}
                              size={20}
                            />*/}
                              <Text>
                                <IconButton
                                  icon='check-outline'
                                  iconColor={'green'}
                                  size={15}
                                />
                              </Text>
                            </View>
                          ) : (
                            ''
                          )}
                        </View>
                      </Card.Content>
                    </Card>
                  </Pressable>
                </View>
              )}
            </ScrollView>
          </View>
        )}

        <SegmentedButtons
          style={props.styles.nextBackControl}
          onValueChange={() => console.log('Change value')}
          buttons={[
            {
              value: 'firststep',
              //label: 'First Step',
              icon: 'page-first',
              style: props.styles.nextBackControlButton,
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
              style: props.styles.nextBackControlButton,
              onPress: () => props.backward(),
              //disabled: 'true'
            },
            {
              value: 'next',
              //label: 'Next',
              icon: 'arrow-right',
              style: props.styles.nextBackControlButton,
              onPress: () => {
                //props.onProcessingTitle();
                props.forward();
              },
              disabled: props.condition !== '' ? false : true,
              //disabled: props.searchCategories.length > 0 ? false : true,
            },
          ]}
        />
        {/*
          <Button
            style={{ marginTop: 15 }}
            icon='clock-edit-outline'
            onPress={() => props.saveListing()}
          >
            Save and close to finish later
          </Button>
        */}
      </View>
    </View>
  );
}
