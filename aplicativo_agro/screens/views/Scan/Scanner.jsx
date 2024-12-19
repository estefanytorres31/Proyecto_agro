import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import qr from "../../image/qr.png";
import fondo from "../../image/fondo.png"

const Scanner = ({ navigation }) => {
  return (
    <ImageBackground source={fondo} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escanee código QR</Text>
        <Text style={styles.headerSubtitle}>
          Para poder obtener información de la palma, debe escanear el código QR
        </Text>
      </View>

      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('QRScann')}
      >
        <View style={styles.scanButtonContent}>
          <MaterialCommunityIcons name="camera" size={24} color="#000" />
          <Text style={styles.scanButtonText}>Escanear</Text>
        </View>
      </TouchableOpacity>
      </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  header: {
    width: '70%',
    backgroundColor: '#e3f2fd',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    marginBottom: 60,
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  qrCode: {
    width: 200,
    height: 200,
    marginBottom: 80,
  },
  scanButton: {
    width: '80%',
    backgroundColor: '#e3f2fd',
    paddingVertical: 15,
    borderRadius: 10,
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 10,
  },
});

export default Scanner;