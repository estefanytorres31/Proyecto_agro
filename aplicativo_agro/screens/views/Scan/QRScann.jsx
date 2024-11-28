import React, {useState, useRef, useEffect} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import Button from '../../components/Buttons';


const QRScann = () => {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const [scanning, setScanning] = useState(false);
    const [cameraProps, setCameraProps] = useState({
        zoom: 0,
        facing: 'back',
        flash: 'on',
        animateShutter: false,
        enableTorch: false
    });

    const cameraRef = useRef(null);

    useEffect(() => {
        if (cameraPermission && cameraPermission.granted === 'granted') {
        }
      }, [cameraPermission]);
    
      if (!cameraPermission) {
        return <View />;
      }
    
      if (!cameraPermission.granted) {
        return (
          <View style={styles.container}>
            <Text>Necesitamos permiso de cámara para poder continuar.</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                requestCameraPermission();
              }}
            >
              <Text style={styles.buttonText}>Solicitar permiso</Text>
            </TouchableOpacity>
          </View>
        );
      }
    
      const toggleProperty = (prop, option1, option2) => {
        setCameraProps((current) => ({
          ...current,
          [prop]: current[prop] === option1 ? option2 : option1
        }));
      };
    
      const handleBarcodeScanned = ({ type, data }) => {
        if (!scanning) {
          setScanning(true);
          Alert.alert('QR escaneado!', `Tipo: ${type}\nDatos: ${data}`);
          setScanning(false);
        }
      };
    
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
            style={styles.camera}
            zoom={cameraProps.zoom}
            facing={cameraProps.facing}
            flash={cameraProps.flash}
            enableTorch={cameraProps.enableTorch}
            ref={cameraRef}
            onBarcodeScanned={scanning ? undefined : handleBarcodeScanned}
          >
            <View style={styles.overlay}>
              <Text style={styles.text}>Escanea un código QR</Text>
            </View>
    
            {/* Cuadro delimitador de escaneo centrado */}
            <View style={styles.scanBox}>
            </View>
          </CameraView>
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 30,
      },
      topControlsContainer: {
        height: 100,
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
      },
      button: {
        backgroundColor: 'blue',
        padding: 10,
        margin: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: 'white',
        fontSize: 16,
      },
      camera: {
        flex: 1,
        width: '100%',
      },
      overlay: {
        position: 'absolute',
        top: '10%',
        left: '5%',
        right: '5%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0)',
        borderRadius: 10,
      },
      text: {
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
      },
      scanBox: {
        position: 'center',
        top: '40%', // Aumenta para centrar más abajo en la pantalla
        left: '10%',
        right: '10%',
        height: 200,
        width: 200, // Ajusta el ancho para que ocupe un porcentaje de la pantalla
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
      },
    });
    
    export default QRScann;