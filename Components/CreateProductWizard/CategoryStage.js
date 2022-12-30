import React, { useEffect, useState, useRef } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Title,
  Avatar,
  Surface,
  Button,
  TextInput,
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

  const searchInput = useRef(null);

  console.log(props.categories);

  const [searchText, setSearchText] = useState('');


  /*useEffect(() => {
    if (props.photoLabel || props.photoLabelExtra) {
      props.processLabel();
    }
    console.log('CategoryStage!!!!');
  }, []);*/

  const onProcessCategories = async () => {
    console.log(searchText);
    props.getCategoriesSearch(searchText);
    setSearchText('');
    searchInput.current.blur();
  }

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
          <ScrollView style={{ height: '45%' }}>
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

        {/*<View style ={{paddingLeft: 20, marginTop: 10, backgroundColor: 'black'}}>
          <Text style={{color: 'white'}}>Can't find the right category? Give me more information</Text>
          
          </View>*/}
        
        <Card mode='elevated' style={{  backgroundColor: '#E0FFFF', marginTop: 10, marginLeft: 10, marginRight: 10}}>
        <Card.Title
    title="Can't find the right category?"
    left={(props) => <Avatar.Icon {...props} icon="information" />}
    
  />

        {/*<Card.Content>
        
          <Title style={{fontSize: 14, fontWeight: 'bold'}}>Can't find the right category?</Title>
          
          
        </Card.Content>*/}

        <TextInput
          ref={searchInput} 
          mode='outlined'
          value={searchText}
          onChangeText={text => setSearchText(text)}
          style={{marginLeft: 10, marginBottom: 10, marginRight: 10, fontSize: 14}}
          label="Enter more details about your product"
          right={<TextInput.Icon icon="send" disabled={searchText && searchText.length > 0 ? false : true} onPress={()=>onProcessCategories()} />}
        />
            
          </Card>
      
         

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
              //disabled: 'false'
              //disabled: categoryId
            },
            {
              value: 'next',
              //label: 'Next',
              icon: 'arrow-right',
              style: props.styles.nextBackControlButton,
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
