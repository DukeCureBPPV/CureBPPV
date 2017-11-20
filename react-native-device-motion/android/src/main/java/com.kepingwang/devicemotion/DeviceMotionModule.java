package com.kepingwang.devicemotion;

import android.content.Context;
import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.RCTNativeAppEventEmitter;


public class DeviceMotionModule extends ReactContextBaseJavaModule implements SensorEventListener {

    private final ReactApplicationContext reactContext;
    private SensorManager sensorManager;
    private Sensor sensor;

    public DeviceMotionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        sensorManager = (SensorManager) reactContext.getSystemService(Context.SENSOR_SERVICE);
        if (sensorManager != null) {
            sensor = sensorManager.getDefaultSensor(Sensor.TYPE_GAME_ROTATION_VECTOR);
        }
    }

    @Override
    public String getName() {
        return "DeviceMotion";
    }

    @ReactMethod
    public void startUpdates() {
        if (sensorManager == null || sensor == null) {
            return; // TODO: use a promise to tell JS success or not.
        }
        sensorManager.registerListener(this, sensor, 16667);
    }

    @Override
    public void onSensorChanged(SensorEvent sensorEvent) {
        if (sensorEvent.sensor.getType() != Sensor.TYPE_GAME_ROTATION_VECTOR) {
            return;
        }
        float[] rotationVector = sensorEvent.values;
        float[] quaternion = new float[4];
        SensorManager.getQuaternionFromVector(quaternion, rotationVector);

        WritableMap params = Arguments.createMap();
        params.putDouble("w", quaternion[0]);
        params.putDouble("x", quaternion[1]);
        params.putDouble("y", quaternion[2]);
        params.putDouble("z", quaternion[3]);
        params.putDouble("timestamp", (double) System.currentTimeMillis() / 1000);

        reactContext.getJSModule(RCTNativeAppEventEmitter.class)
                .emit("Rotation", params);
    }

    @Override
    public void onAccuracyChanged(Sensor sensor, int i) {
        // do nothing
    }
}