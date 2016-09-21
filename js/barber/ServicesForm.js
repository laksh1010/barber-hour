import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Switch,
  ActivityIndicator,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import Toolbar from '../common/Toolbar';
import Button from '../common/Button';
import ImageChooser from './ImageChooser';
import formStyle from '../forms/style';

import { createServices, toggleService, changeServicePrice, addError, getServices } from '../actions/services';

class ServicesForm extends Component {
  _createServices() {
    var selectedServices = this.props.form.services.filter(service => service.selected);

    if (selectedServices.length) {
      var data = this.props.form.services.map(service => {
        return {
          id: service.id,
          name: service.name,
          price: this._formatPrice(service.price),
          _destroy: !service.selected
        }
      });
      this.props.dispatch(createServices(data));
    } else {
      this.props.dispatch(addError());
    }
  }

  _formatPrice(price) {
    if (price) {
      return price.replace(',', '.');
    }
  }

  _valueToPrice(value) {
    if (value) {
      return value.replace('.', ',');
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(getServices());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      if (this.props.edit) {
        this.props.navigator.pop();
      } else {
        const route = {
          component: ImageChooser,
          title: 'Fotos'
        };

        Platform.OS === 'ios' ? this.props.navigator.replace(route) : this.props.navigator.resetTo(route);
      }
    }
  }

  toggleService(name, value) {
    this.props.dispatch(toggleService(name, value));
  }

  changeServicePrice(name, price) {
    this.props.dispatch(changeServicePrice(name, price));
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
      errorMessage = <Text style={formStyle.errorBlock}>Por favor, selecione pelo menos um serviço.</Text>;
    }

    var content;
    if (this.props.form.isRequestingInfo) {
      content = <ActivityIndicator size='small' />;
    }

    var toolbarContent;
    if (this.props.edit) {
      toolbarContent = <Toolbar backIcon navigator={this.props.navigator} />;
    }

    var isLoading = this.props.form.isLoading || this.props.form.isRequestingInfo;

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={isLoading} />
        {toolbarContent}
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Serviços</Text>
          <Text style={styles.info}>Selecione os serviços que você realiza:</Text>
          {content}
          <View style={styles.formContainer}>
            {this.props.form.services.map((service) => {
              var errorBlock = service.error ? (
                <Text style={formStyle.errorBlock}>{service.error}</Text>
              ) : <View />;

              var price = service.selected ? (
                <View style={styles.servicePrice}>
                  <TextInput
                    style={formStyle.textbox.normal}
                    onChangeText={(text) => {this.changeServicePrice(service.name, text)}}
                    value={this._valueToPrice(service.price)}
                    placeholder='preço (R$)'
                    editable={!isLoading}
                    maxLength={11}
                    keyboardType='numeric' />
                  {errorBlock}
                </View>
              ) : <View />;

              return(
                <View key={service.name} style={styles.row}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Switch
                    style={styles.serviceSwitch}
                    onValueChange={(value) => {this.toggleService(service.name, value)}}
                    disabled={isLoading}
                    onTintColor='#004575'
                    value={service.selected} />
                  {price}
                </View>
              )
            })}
          </View>
          {errorMessage}
          <Button
            containerStyle={styles.button}
            text={this._getButtonLabel()}
            disabled={isLoading}
            onPress={this._createServices.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.services
  };
}

export default connect(select)(ServicesForm);

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
    marginTop: 10
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  serviceName: {
    fontSize: 16,
    flex: .5
  },
  servicePrice: {
    flex: .3
  },
  serviceSwitch: {
    marginBottom: Platform.OS === 'ios' ? 5 : 0,
    marginRight: Platform.OS === 'ios' ? 5 : 0
  }
});
