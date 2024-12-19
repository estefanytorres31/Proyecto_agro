import React, { useState } from "react";
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import useCosecha from "../../hooks/Cosecha/useCosecha"; 
import { useNavigation, CommonActions } from "@react-navigation/native";
import Historial from "../../components/Historial";
import Button from "../../components/Buttons";
import CustomAlert from "../../components/Alerta";

const QRInfo = ({ route }) => {
  const { qrData } = route.params;
  const { addCosecha, getLastCosecha } = useCosecha(); 
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState("");
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: 'SUCCESS',
    message: '',
  });

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleCloseAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
    if (alertConfig.type === 'SUCCESS') {
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            { name: 'Scanner' },
            { name: 'QRScann' }
          ],
        })
      );
    }
  };

  const showAlert = (message, type = 'SUCCESS') => {
    setAlertConfig({
      visible: true,
      type,
      message
    });
  };

  const handleSave = async () => {
    if (!selectedOption) {
      showAlert("Error: Selecciona un tamaño de fruto.", "ERROR");
      return;
    }

    try {
      const response = await addCosecha(qrData, selectedOption);
      if (response) {
        showAlert("¡Cosecha guardada correctamente!");
      } else {
        showAlert("Error al guardar la cosecha.", "ERROR");
      }
    } catch (error) {
      showAlert("Error interno.", "ERROR");
    }
  };

  // Manejador para el botón de retroceso
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      if (selectedOption && !alertConfig.visible) {
        e.preventDefault();
        
        Alert.alert(
          'Datos sin guardar',
          '¿Estás seguro que deseas salir? Los cambios no guardados se perderán.',
          [
            { text: 'Cancelar', style: 'cancel', onPress: () => {} },
            {
              text: 'Salir',
              style: 'destructive',
              onPress: () => {
                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      { name: 'Scanner' },
                      { name: 'QRScann' }
                    ],
                  })
                );
              },
            },
          ]
        );
      }
    });

    return unsubscribe;
  }, [navigation, selectedOption, alertConfig.visible]);

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.qrCodeContainer}>
          <QRCode value={qrData} size={150} />
          <Text style={styles.qrDataText}>{qrData}</Text>
        </View>

        <Historial 
          getData={getLastCosecha} 
          codigoPlanta={qrData} 
          formatData={true}
        />

        <View style={styles.optionsContainer}>
          <Text style={styles.subtitle}>Seleccione el tamaño de fruto:</Text>
          <View style={styles.options}>
            {["Grande", "Mediano", "Pequeño", "No hay fruto"].map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionItem,
                  selectedOption === option && styles.optionItemActive,
                ]}
                onPress={() => handleOptionChange(option)}
              >
                <Text style={
                  selectedOption === option
                    ? styles.optionTextActive
                    : styles.optionText
                }>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <Button 
          icon="save" 
          text="GUARDAR" 
          size={24}
          color="#fff" 
          style={styles.saveButton} 
          onPress={handleSave} 
        />
      </ScrollView>

      <CustomAlert
        isVisible={alertConfig.visible}
        type={alertConfig.type}
        message={alertConfig.message}
        onClose={handleCloseAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrDataText: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  optionsContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  options: {
    width: "100%",
  },
  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f4f4f4",
    marginBottom: 10,
  },
  optionItemActive: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  optionTextActive: {
    color: "#fff",
  },
  saveButton: {
    backgroundColor: "#30C81E",
    padding: 14,
    height: 58,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  }
});

export default QRInfo;