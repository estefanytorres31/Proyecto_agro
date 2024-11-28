import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const QRScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Escanee código QR</Text>
        <Text style={styles.subtitle}>
          Para poder obtener información de la palma, debe escanear el código QR
        </Text>
      </View>

      <Image
        style={styles.qrImage}
        source={{ uri: 'https://w7.pngwing.com/pngs/978/217/png-transparent-qr-code-2d-code-barcode-information-chinese-copy-miscellaneous-text-rectangle.png' }} // Cambia por la imagen del QR
      />

      {/* Botón Escanear */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}> <MaterialCommunityIcons name="scan-helper" size={20} color="#708090" /> Escanear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30,
    color: '#CDDCE2',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  qrImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dce8f0',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
  },
});

export default QRScreen;
