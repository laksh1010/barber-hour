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
import { connect } from 'react-redux';

import Button from '../common/Button';
import ScheduleBuilder from './ScheduleBuilder';
import formStyle from '../forms/style';

import { addImage, removeImage, createImages, setEditMode, addError } from '../actions/images';

class ImageChooser extends Component {
  _addImage() {
    ImagePickerManager.showImagePicker({
      title: 'Selecionar foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, (response) => {
      if (!response.didCancel && !response.error) {
        const source = {uri: `data:${response.type};base64,${response.data}`, isStatic: true};
        this.props.dispatch(addImage(source));
      }
    });
  }

  _confirmImageDeletion(imageUID) {
    Alert.alert(
      'Remover foto',
      'Tem certeza que quer remover essa foto?',
      [
        {text: 'Remover foto', onPress: () => {this._removeImage(imageUID)} },
        {text: 'Cancelar', style: 'cancel'},
      ]
    );
  }

  _removeImage(imageUID) {
    this.props.dispatch(removeImage(imageUID));
  }

  _createImages() {
    if (this.props.form.images.length) {
      var data = this.props.form.images.map(image => {
        return {
          id: image.id,
          data: image.source.uri,
          _destroy: image.destroyed
        };
      });
      this.props.dispatch(createImages(data));
    } else {
      this.props.dispatch(addError());
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(setEditMode());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        this.props.navigator.resetTo({
          component: ScheduleBuilder
        });
      }
    }
  }

  _getImageURL(image) {
    if (image.url) {
      return {uri: image.url};
    } else {
      return image.source;
    }
  }

  render() {
    var errorMessage;

    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, adicione pelo menos uma foto.</Text>;
    }

    var buttonLabel = this.props.edit ? 'Alterar' : 'Avançar';
    var infoPrefix = this.props.edit ? 'Altere as' : 'Adicione algumas';

    var images = this.props.form.images.filter(image => !image.destroyed);

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Fotos</Text>
          <Text style={styles.info}>{infoPrefix} fotos de sua barbearia:</Text>
          <View style={styles.formContainer}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={this._addImage.bind(this)}>
              <View style={styles.image}>
                <Icon name='control-point' size={25} />
              </View>
            </TouchableNativeFeedback>
            {images.map((image) => {
              return(
                <TouchableNativeFeedback key={image.uid}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => {this._confirmImageDeletion(image.uid)}}>
                  <View style={styles.row}>
                    <Image
                      source={this._getImageURL(image)}
                      style={styles.image} />
                  </View>
                </TouchableNativeFeedback>
              )
            })}
          </View>
          {errorMessage}
          <Button containerStyle={styles.button} text={buttonLabel} onPress={this._createImages.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.images
  };
}

export default connect(select)(ImageChooser);

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
