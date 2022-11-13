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
} from 'react-native-paper';
import Header from '../Header';

export default function CategoryStage(props) {
  //const theme = useTheme();

  return (
    <View>
      <Header
        title={props.title}
        type='createListing'
        actionBack={props.navigation.goBack}
      />
      <View>
        <Banner visible={true} icon={'shape'}>
          Choose the category that corresponds to your product.
        </Banner>

        {props.processingCategories ? (
          <View>
            <ActivityIndicator
              size='large'
              style={{ marginTop: '20%', marginBottom: '20%' }}
            />
          </View>
        ) : (
          <ScrollView style={{ height: '65%' }}>
            {props.categories.map((item) => {
              return (
                <View key={item.categoryId}>
                  <Pressable
                    onPress={() => props.onSelectedCategory(item.categoryId)}
                  >
                    <Card>
                      <Card.Content>
                        <Title>{item.title}</Title>
                        <Paragraph>{item.subtitle}</Paragraph>
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
              onPress: () => props.forward(),
              disabled: 'true',
            },
          ]}
        />
      </View>
    </View>
  );
}
