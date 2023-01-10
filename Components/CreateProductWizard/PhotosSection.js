import { prototype } from 'form-data';
import React, { useEffect } from 'react';
import {
  View,
  Pressable,
  StyleSheet,
  Image,
  useWindowDimensions,
} from 'react-native';
import {
  useTheme,
  Text,
  Card,
  Surface,
  Button,
  Searchbar,
  SegmentedButtons,
  Banner,
  IconButton,
  ActivityIndicator,
  Divider,
} from 'react-native-paper';
import { useRecoilState } from 'recoil';
import urlImagesAtom from '../../Store/atoms/urlImagesAtom';
import ToggleStages from './ToggleStages';
import Header from '../Header';

export default function PhotosSection(props) {
  //const theme = useTheme();

  const [urlImages, setUrlImages] = useRecoilState(urlImagesAtom);

  const { width, height } = useWindowDimensions();

  const processCategories = () => {
    //console.log('CATEGORY: ', props.category);

    if (props.category === '') {
      props.getCategories();
    }
  };

  useEffect(() => {
    processCategories();
  }, []);

  return (
    <View>
      <Header
        title={props.title}
        //type='createListing'
        onDeleteItem={props.onDeleteItem}
        saveListing={props.saveListing}
        processingSaveListing={props.processingSaveListing}
        type={props.typeHeader}
        //actionBack={props.navigation.goBack}
        actionBack={props.onOpenBackDialog}
      />

      <ToggleStages
        step={props.step}
        gotoStep={props.gotoStep}
        lastStep={props.lastStep}
      />

      <View>
        <Banner visible={true} icon={'image'}>
          {props.type === 'clothing' || props.type === 'shoes'
            ? 'The main photo is required, you can also take a photo of the product tags. Add up to 9 additional photos.'
            : 'The main photo is required. Add up to 9 more photos.'}
        </Banner>

        <View style={props.styles.clothingButtons}>
          <Pressable onPress={() => props.onMainPhotoOpen()}>
            <Surface style={props.styles.surface} elevation={4}>
              {props.photoMain ? (
                !props.processingRemoveBackground ? (
                  <Image
                    style={props.styles.preview}
                    source={{
                      //uri: 'data:image/jpg;base64,' + props.photoMain.base64,
                      uri: `${urlImages}${props.photoMain}`,
                    }}
                  />
                ) : (
                  <ActivityIndicator animating={true} />
                )
              ) : (
                <View>
                  <IconButton icon='image' />
                  <Text style={{ fontSize: 12 }}>Main Photo</Text>
                </View>
              )}
            </Surface>
            {props.photoMain && props.photoMain !== '' ? (
              <View>
                <Text
                  style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}
                >
                  Main Photo
                </Text>
              </View>
            ) : (
              ''
            )}
            {props.photoMain ? (
              <View style={{ flexDirection: 'row' }}>
                <IconButton
                  style={{ alignSelf: 'center' }}
                  onPress={() => props.deleteMainPic()}
                  icon='delete'
                />
                <IconButton
                  style={{ alignSelf: 'center' }}
                  onPress={() => props.removeBackground()}
                  icon='circle-opacity'
                  disabled={
                    props.processedRemoveBackground ||
                    props.processingRemoveBackground
                  }
                />
              </View>
            ) : (
              ''
            )}
          </Pressable>

          {props.type === 'clothing' || props.type === 'shoes' ? (
            <Pressable onPress={() => props.onLabelPhotoOpen()}>
              <Surface style={props.styles.surface} elevation={4}>
                {props.photoLabel ? (
                  <Image
                    style={props.styles.preview}
                    source={{
                      //uri: 'data:image/jpg;base64,' + props.photoLabel.base64,
                      uri: `${urlImages}${props.photoLabel}`,
                    }}
                  />
                ) : (
                  <View>
                    <IconButton icon='tag-outline' />
                    <Text style={{ fontSize: 12 }}>Photo Tag</Text>
                  </View>
                )}
              </Surface>
              {props.photoLabel && props.photoLabel !== '' ? (
                <View>
                  <Text
                    style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}
                  >
                    Photo Tag
                  </Text>
                </View>
              ) : (
                ''
              )}
              {props.photoLabel ? (
                <IconButton
                  style={{ alignSelf: 'center' }}
                  onPress={() => props.deleteLabelPic()}
                  icon='delete'
                />
              ) : (
                ''
              )}
            </Pressable>
          ) : (
            ''
          )}

          {props.type === 'clothing' || props.type === 'shoes' ? (
            <Pressable onPress={() => props.onLabelPhotoOpenExtra()}>
              <Surface style={props.styles.surface} elevation={4}>
                {props.photoLabelExtra ? (
                  <Image
                    style={props.styles.preview}
                    source={{
                      //uri: 'data:image/jpg;base64,' + props.photoLabel.base64,
                      uri: `${urlImages}${props.photoLabelExtra}`,
                    }}
                  />
                ) : (
                  <View>
                    <IconButton icon='tag-outline' />
                    <Text style={{ fontSize: 12 }}>Photo Tag 2</Text>
                  </View>
                )}
              </Surface>

              {props.photoLabelExtra && props.photoLabelExtra !== '' ? (
                <View>
                  <Text
                    style={{ textAlign: 'center', fontSize: 12, marginTop: 5 }}
                  >
                    Photo Tag 2
                  </Text>
                </View>
              ) : (
                ''
              )}

              {props.photoLabelExtra ? (
                <IconButton
                  style={{ alignSelf: 'center' }}
                  onPress={() => props.deleteLabelPicExtra()}
                  icon='delete'
                />
              ) : (
                ''
              )}
            </Pressable>
          ) : (
            ''
          )}
        </View>
        {/*<Divider style={{ marginTop: 0 }} bold='true' horizontalInset='true' />*/}

        <View
          style={{ alignSelf: 'center', marginTop: -8 }}
          /*style={{ marginLeft: 60, marginRight: 60, marginTop: 20 }}*/
        >
          {props.photoMain && props.photos.length < 9 ? (
            <Button
              icon='image'
              mode='contained-tonal'
              onPress={() => props.onOpenPreviewPhoto()}
              labelStyle={{ fontSize: 12 }}
              disabled={
                props.photoMain && props.photos.length < 9 ? false : true
              }
            >
              Add more photos
            </Button>
          ) : (
            ''
          )}
          {/*<IconButton
            icon='camera-plus'
            size={30}
            onPress={() => props.onOpenPreviewPhoto()}
            disabled={props.photoMain && props.photos.length < 8 ? false : true}
        />*/}
        </View>

        <View style={props.styles.clothingButtons}>
          {props.photos.map((item) => {
            return (
              <View key={item.id}>
                <View style={props.styles.imageList}>
                  <Pressable onPress={() => props.onOpenEditPhoto(item.id)}>
                    <Surface style={props.styles.surfaceSmall} elevation={4}>
                      <Image
                        style={props.styles.preview}
                        source={{
                          //uri: 'data:image/jpg;base64,' + item.value.base64,
                          uri: `${urlImages}${item.value}`,
                        }}
                      />
                    </Surface>
                  </Pressable>
                </View>
                <IconButton
                  size={18}
                  style={{ alignSelf: 'center', marginTop: -10 }}
                  onPress={() => props.deleteEditPic(item.id)}
                  icon='delete'
                />
              </View>
            );
          })}
        </View>
      </View>

      <SegmentedButtons
        //style={props.styles.nextBackControl}
        style={{ justifyContent: 'center' }}
        onValueChange={() => console.log('Change value')}
        buttons={[
          {
            value: 'back',
            //label: 'Back',
            icon: 'arrow-left',
            style: props.styles.nextBackControlButton,
            onPress: () => props.backward(),
            disabled:
              props.type === 'clothing' || props.type === 'shoes'
                ? true
                : false, //props.backward(),
          },
          {
            value: 'next',
            //label: 'Next',
            icon: 'arrow-right',
            style: props.styles.nextBackControlButton,
            onPress: () => {
              props.onMainPicIsTaken(false);
              props.forward();
            },
            disabled: props.photoMain ? false : true,
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
  );
}
