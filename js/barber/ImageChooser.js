import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
  Platform
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { ImagePickerManager } from 'NativeModules';
import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import Button from '../common/Button';
import Touchable from '../common/Touchable';
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
        var dataURI;
        if (response.type) {
          dataURI = `data:${response.type};base64,${response.data}`;
        } else {
          var splittedURI = response.uri.split('.');
          var extension = splittedURI[splittedURI.length - 1];
          dataURI = `data:image/${extension};base64,${response.data}`;
        }
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
        const route = {
          component: ScheduleBuilder,
          title: 'Agenda'
        };

        Platform.OS === 'ios' ? this.props.navigator.replace(route) : this.props.navigator.resetTo(route);
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
      return this.props.form.isLoading ? 'Alterando...' : 'Alterar';
    } else {
      return this.props.form.isLoading ? 'Cadastrando...' : 'Avançar';
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
    var images = this.props.form.images.filter(image => !image.destroyed);

    var onPress = isLoading || images.length === 5 ? null : this._addImage.bind(this);
    var opacity = isLoading || images.length === 5 ? { opacity: .6 } : { opacity: 1 };

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
          <Text style={[formStyle.helpBlock.normal, {textAlign: 'center'}]}>Máximo de fotos: 5</Text>
          {content}
          <View style={styles.formContainer}>
            <Touchable style={[styles.image, opacity]} onPress={onPress}>
              <View style={[styles.image, opacity]}>
                <Icon name='control-point' size={25} />
              </View>
            </Touchable>
            {images.map((image) => {
              return(
                <Touchable key={image.uid}
                  style={styles.imageContainer}
                  onPress={() => {this._confirmImageDeletion(image.uid)}}>
                  <View style={styles.imageContainer}>
                    <Image
                      source={this._getImageURL(image)}
                      style={styles.image} />
                  </View>
                </Touchable>
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
    marginTop: Platform.OS === 'ios' ? 55 : 0
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
    flexWrap: 'wrap',
    justifyContent: 'center'
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
