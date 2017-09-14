package com.kepingwang.devicemotion;

import android.widget.Toast;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

public class Accelerometer extends ReactContextBaseJavaModule {

    public Accelerometer(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "Accelerometer";
    }

    private void dummyAlert(String message) {
        Toast.makeText(getReactApplicationContext(), message, Toast.LENGTH_LONG).show();
    }

    private void dummySendEvents() {
        WritableMap params = Arguments.createMap();
        params.putDouble("x", 1.33);
        params.putDouble("y", 1.44);
        params.putDouble("z", 1.55);
        params.putDouble("timestamp", 666.666);

        // TODO: use NativeEventEmitter
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("Accelerometer", params);
    }

    @ReactMethod
    public void setUpdateInterval(double interval) {
        dummyAlert("setUpdateInterval: " + interval);
    }

    @ReactMethod
    public void startUpdates() {
        dummyAlert("updates started");
        dummySendEvents();
    }

}
