import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableNativeFeedback,
  Image,
  Alert,
  ActivityIndicator
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImagePickerManager } from 'NativeModules';
import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import Button from '../common/Button';
import ScheduleBuilder from './ScheduleBuilder';
import formStyle from '../forms/style';

import { addImage, removeImage, createImages, getImages, addError } from '../actions/images';

class ImageChooser extends Component {
  _addImage() {
    ImagePickerManager.showImagePicker({
      title: 'Selecionar foto',
      cancelButtonTitle: 'Cancelar',
      takePhotoButtonTitle: 'Tirar foto',
      chooseFromLibraryButtonTitle: 'Escolher da galeria'
    }, (response) => {
      if (!response.didCancel && !response.error) {
        const dataURI = `data:${response.type};base64,${response.data}`;
        const source = {uri: response.uri, isStatic: true, dataURI: dataURI};
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
    var images = this.props.form.images.filter(image => !image.destroyed);

    if (images.length) {
      var data = this.props.form.images.map(image => {
        var newImage = { id: image.id, _destroy: image.destroyed };
        if (image.source) {
          newImage.data = image.source.dataURI;
        };
        return newImage;
      });
      this.props.dispatch(createImages(data));
    } else {
      this.props.dispatch(addError());
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(getImages());
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

  _getButtonLabel() {
    if (this.props.edit) {
      return this.props.isLoading ? 'Alterando...' : 'Alterar';
    } else {
      return this.props.isLoading ? 'Cadastrando...' : 'Avançar';
    }
  }

  render() {
    var errorMessage;

    if (this.props.form.error) {
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, adicione pelo menos uma foto.</Text>;
    }

    var infoPrefix = this.props.edit ? 'Altere as' : 'Adicione algumas';
    var content;
    if (this.props.form.isRequestingInfo) {
      content = <ActivityIndicator size='small' />;
    }
    var isLoading = this.props.form.isLoading || this.props.form.isRequestingInfo;
    var onPress = isLoading ? null : this._addImage.bind(this);
    var opacity = isLoading ? { opacity: .6 } : { opacity: 1 };
    var images = this.props.form.images.filter(image => !image.destroyed);
    var toolbarContent;
    if (this.props.edit) {
      toolbarContent = <Toolbar backIcon navigator={this.props.navigator} />;
    }

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        {toolbarContent}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Fotos</Text>
          <Text style={styles.info}>{infoPrefix} fotos de sua barbearia:</Text>
          {content}
          <View style={styles.formContainer}>
            <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()} onPress={onPress}>
              <View style={[styles.image, opacity]}>
                <Icon name='control-point' size={25} />
              </View>
            </TouchableNativeFeedback>
            {images.map((image) => {
              return(
                <TouchableNativeFeedback key={image.uid}
                  background={TouchableNativeFeedback.SelectableBackground()}
                  onPress={() => {this._confirmImageDeletion(image.uid)}}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={this._getImageURL(image)}
                      style={styles.image} />
                  </View>
                </TouchableNativeFeedback>
              )
            })}
          </View>
          {errorMessage}
          <Button
            containerStyle={styles.button}
            text={this._getButtonLabel()}
            disabled={isLoading}
            onPress={this._createImages.bind(this)} />
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
  },
  imageContainer: {
    width: 90,
    height: 90,
  }
});
