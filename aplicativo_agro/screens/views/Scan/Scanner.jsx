import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ImageBackground, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import fondo from "../../image/fondo.webp";

const Scanner = ({ navigation }) => {
  return (
    <ImageBackground source={fondo} style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Escanee código QR</Text>
          <Text style={styles.headerSubtitle}>
            Para poder obtener información de la palma.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.scanButton}
          onPress={() => navigation.navigate('QRScann')}
        >
          <View style={styles.scanButtonContent}>
            <MaterialCommunityIcons name="camera" size={28} color='#000'/>
            <Text style={styles.scanButtonText}>Escanear</Text>
          </View>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  header: {
    backgroundColor: '#e3f2fd',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 30,
  },
  headerIcon: {
    backgroundColor: '#e8f0fe',
    padding: 15,
    borderRadius: 50,
    marginBottom: 15,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#5f6368',
    textAlign: 'center',
    lineHeight: 22,
  },
  scanButton: {
    backgroundColor: '#e3f2fd',
    paddingVertical: 16,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom:15
  },
  scanButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginLeft: 12,
  },
});

export default Scanner;