import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert} from "react-native";
import QRCode from 'react-native-qrcode-svg'; 


const QRInfo = ({ route }) => {
  const { qrData } = route.params; // QR data passed from navigation
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      Alert.alert(
      );
    } else {
      Alert.alert("Error", "Por favor, selecciona un tamaño de fruto.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Código QR */}
      <View style={styles.qrCodeContainer}>
        <QRCode value={qrData} size={150} />
        <Text style={styles.qrDataText}>{qrData}</Text>
      </View>

      {/* Contenedor de opciones */}
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
              <Text
                style={
                  selectedOption === option
                    ? styles.optionTextActive
                    : styles.optionText
                }
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>GUARDAR</Text>
      </TouchableOpacity>
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
  switchContainer: {
    marginBottom: 20,
  },
  switchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchLabel: {
    fontSize: 14,
    color: "#333",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: "#30C81E",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default QRInfo;
