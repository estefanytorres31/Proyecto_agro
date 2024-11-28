import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Button from '../../components/Buttons';
import { Overlay } from '../../components/Overlay';

const { width, height } = Dimensions.get("window");
const innerDimension = 300;

const QRScann = ({ navigation }) => {
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [regionOfInterest, setRegionOfInterest] = useState(null);
  const [cameraProps, setCameraProps] = useState({
    zoom: 0,
    facing: 'back',
    flash: 'on',
    animateShutter: false,
    enableTorch: false,
  });
  const qrCodeLock = useRef(false);

  const handleRegionOfInterest = (roi) => {
    setRegionOfInterest(roi);
  };

  const toggleProperty = (prop, option1, option2) => {
    setCameraProps((current) => ({
      ...current,
      [prop]: current[prop] === option1 ? option2 : option1,
    }));
  };

  const handleBarcodeScanned = ({ type, data }) => {
    if (!qrCodeLock.current) {
      qrCodeLock.current = true; 
      setScanning(true);
      navigation.navigate('QRInfo', { qrData: data });
      setTimeout(() => {
        qrCodeLock.current = false;
        setScanning(false);
      }, 3000);
    }
  };

  if (!cameraPermission) {
    return <View />;
  }

  if (!cameraPermission.granted) {
    return (
      <View style={styles.container}>
        <Text>Necesitamos permiso de cámara para poder continuar.</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => requestCameraPermission()}
        >
          <Text style={styles.buttonText}>Solicitar permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topControlsContainer}>
        <Button
          icon={cameraProps.flash === 'on' ? 'flash-on' : 'flash-off'}
          onPress={() => toggleProperty('flash', 'on', 'off')}
        />
        <Button
          icon={cameraProps.enableTorch ? 'flashlight-on' : 'flashlight-off'}
          onPress={() => toggleProperty('enableTorch', true, false)}
        />
      </View>
      <CameraView
        style={StyleSheet.absoluteFillObject}
        zoom={cameraProps.zoom}
        facing={cameraProps.facing}
        flash={cameraProps.flash}
        enableTorch={cameraProps.enableTorch}
        onBarcodeScanned={scanning ? undefined : handleBarcodeScanned}
        scannerType="qr"
        scannerOptions={{
          region: regionOfInterest ? {
            x: (regionOfInterest.x / width),
            y: (regionOfInterest.y / height),
            width: (regionOfInterest.width / width),
            height: (regionOfInterest.height / height)
          } : undefined
        }}
      >
        <Overlay onRegionOfInterest={handleRegionOfInterest}/>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topControlsContainer: {
    height: 60,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  }
});

export default QRScann;