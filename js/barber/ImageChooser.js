import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  Image,
  Alert
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImagePickerManager } from 'NativeModules';

import Button from '../common/Button';
import ScheduleBuilder from './ScheduleBuilder';

var id = 0;

export default class ImageChooser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: []
    };
  }

  _addImage() {
    ImagePickerManager.showImagePicker({
      title: 'Selecionar foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled');
      } else if (response.error) {
        console.log('Error', response.error);
      } else {
        const source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        var image = {id: id++, source: source};
        this.setState({images: this.state.images.concat(image)});
      }
    });
  }

  _confirmImageDeletion(imageID) {
    Alert.alert(
      'Remover foto',
      'Tem certeza que quer remover essa foto?',
      [
        {text: 'Remover foto', onPress: () => {this._removeImage(imageID)} },
        {text: 'Cancelar', style: 'cancel'},
      ]
    );
  }

  _removeImage(imageID) {
    var index = this.state.images.findIndex(image => image.id === imageID);
    var newState = {
      images: [
        ...this.state.images.slice(0, index),
        ...this.state.images.slice(index + 1)
      ]
    };
    this.setState(newState);
  }

  _openScheduleBuilder() {
    this.props.navigator.resetTo({
      component: ScheduleBuilder
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Fotos</Text>
          <Text style={styles.info}>Adicione algumas fotos de sua barbearia:</Text>
          <View style={styles.formContainer}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this._addImage.bind(this)}>
              <View style={styles.image}>
                <Icon name='control-point' size={25} />
              </View>
            </TouchableNativeFeedback>
            {this.state.images.map((image) => {
              return(
                <TouchableNativeFeedback key={image.id}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => {this._confirmImageDeletion(image.id)}}>
                  <View style={styles.row}>
                    <Image
                      source={image.source}
                      style={styles.image} />
                  </View>
                </TouchableNativeFeedback>
              )
            })}
          </View>
          <Button containerStyle={styles.button} text='Avançar' onPress={this._openScheduleBuilder.bind(this)} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  formContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  image: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#A2A2A2',
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  }
});
