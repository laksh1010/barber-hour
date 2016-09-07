package com.barberhour;

import android.app.Application;
import android.util.Log;
import android.content.Intent;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

import com.magus.fblogin.FacebookLoginPackage;
import com.imagepicker.ImagePickerPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.devfd.RNGeocoder.RNGeocoderPackage;

public class MainApplication extends Application implements ReactApplication {
  private ReactNativePushNotificationPackage mReactNativePushNotificationPackage;

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    protected boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      mReactNativePushNotificationPackage = new ReactNativePushNotificationPackage();

      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new FacebookLoginPackage(),
          new ImagePickerPackage(),
          new VectorIconsPackage(),
          new RNGeocoderPackage(),
          mReactNativePushNotificationPackage
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
      return mReactNativeHost;
  }

  public void onNewIntent(Intent intent) {
      if (mReactNativePushNotificationPackage != null) {
          mReactNativePushNotificationPackage.newIntent(intent);
      }
   }
}
