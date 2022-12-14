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
  SegmentedButtons,
  Banner,
  Paragraph,
  ActivityIndicator,
  IconButton,
} from 'react-native-paper';
import Header from '../Header';

export default function CategoryStage(props) {
  //const theme = useTheme();

  console.log(props.categories);

  return (
    <View>
      <Header
        title={props.title}
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        //type='createListing'
        type={props.typeHeader}
        actionBack={props.onOpenBackDialog}
      />
      <View>
        <Banner visible={true} icon={'shape'}>
          Choose the category that corresponds to this item.
        </Banner>

        {props.processingCategories ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <ScrollView style={{ height: '55%' }}>
            {props.categories.map((item) => {
              return (
                <View key={item.categoryId}>
                  <Pressable
                    onPress={() => props.onSelectedCategory(item.categoryId)}
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
                            <Title>{item.title}</Title>
                            <Paragraph>{item.subtitle}</Paragraph>
                          </View>
                          {props.category === item.categoryId ? (
                            <View>
                              <IconButton
                                icon='check-outline'
                                iconColor={'green'}
                                size={20}
                              />
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
            })}
          </ScrollView>
        )}

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
              onPress: () => props.forward(),
              disabled: props.category !== '' ? false : true,
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
