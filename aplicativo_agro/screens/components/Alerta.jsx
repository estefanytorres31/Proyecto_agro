import React from 'react';
import { Modal, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ALERT_TYPES = {
  SUCCESS: {
    backgroundColor: '#4CAF50',
    icon: 'check-circle',
    title: '¡Éxito!',
  },
  ERROR: {
    backgroundColor: '#F44336',
    icon: 'times-circle',
    title: 'Error',
  },
  WARNING: {
    backgroundColor: '#FF9800',
    icon: 'exclamation-circle',
    title: 'Advertencia',
  },
  INFO: {
    backgroundColor: '#2196F3',
    icon: 'info-circle',
    title: 'Información',
  },
};

const CustomAlert = ({
  isVisible,
  onClose,
  type = 'SUCCESS',
  title,
  message,
  iconName,
  customIcon,
  buttonText = 'Cerrar',
  buttonStyle,
  buttonTextStyle,
  modalStyle,
  titleStyle,
  messageStyle,
  iconColor,
  iconSize = 40,
  overlayStyle,
}) => {
  const alertConfig = ALERT_TYPES[type] || ALERT_TYPES.SUCCESS;
  
  const defaultIconColor = iconColor || '#fff';
  const defaultBackgroundColor = alertConfig.backgroundColor;
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={[styles.centeredView, overlayStyle]}>
        <View style={[styles.modalView, modalStyle]}>
          {/* Icono */}
          <View style={[
            styles.iconWrapper, 
            { backgroundColor: defaultBackgroundColor }
          ]}>
            {customIcon || (
              <Icon 
                name={iconName || alertConfig.icon} 
                size={iconSize} 
                color={defaultIconColor} 
              />
            )}
          </View>

          {/* Título */}
          <Text style={[
            styles.title, 
            titleStyle
          ]}>
            {title || alertConfig.title}
          </Text>

          {/* Mensaje */}
          <Text style={[
            styles.message,
            messageStyle
          ]}>
            {message || ''}
          </Text>

          {/* Botón */}
          <TouchableOpacity 
            style={[
              styles.button, 
              { backgroundColor: defaultBackgroundColor },
              buttonStyle
            ]} 
            onPress={onClose}
          >
            <Text style={[
              styles.buttonText,
              buttonTextStyle
            ]}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 7,
    width: '85%',
    maxWidth: 400,
  },
  iconWrapper: {
    borderRadius: 50,
    padding: 15,
    marginBottom: 20,
  },
  title: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  message: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    elevation: 2,
    minWidth: 120,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CustomAlert;