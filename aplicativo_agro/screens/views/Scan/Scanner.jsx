import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Scanner = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Escanee código QR</Text>
        <Text style={styles.headerSubtitle}>
          Para poder obtener información de la palma, debe escanear el código QR
        </Text>
      </View>

      <Image
        style={styles.qrCode}
        source={require('../../../assets')} 
      />

    <TouchableOpacity
        style={styles.scanButton}
        onPress={() => navigation.navigate('QRScann')} 
      >
        <Text style={styles.scanButtonText}>📷 Escanear</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
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
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default Scanner;
