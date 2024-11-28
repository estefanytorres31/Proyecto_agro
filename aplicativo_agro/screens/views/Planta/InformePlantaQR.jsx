import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar @expo/vector-icons

const QRInfo = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSave = () => {
    if (selectedOption) {
      Alert.alert("Opción seleccionada", `Has seleccionado: ${selectedOption}`);
    } else {
      Alert.alert("Error", "Por favor, selecciona una opción.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color="#000" />
        <Text style={styles.headerTitle}>Información de código QR</Text>
      </View>

      {/* Código QR */}
      <View style={styles.qrCodeContainer}>
        <Image
          style={styles.qrCode}
          source={{
            uri: "https://res.cloudinary.com/dd6f7nih9/image/upload/v1732801511/qr/oxfn6e7kki4idb5lxs9p.png",
          }}
        />
      </View>

      {/* Contenedor de opciones */}
      <View style={styles.optionsContainer}>
        <Text style={styles.title}>P00001</Text>
        <Text style={styles.subtitle}>Seleccione el tamaño de la palma:</Text>
        <View style={styles.options}>
          {["Grande", "Mediano", "Pequeño", "No hay palma"].map((option) => (
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  qrCodeContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  qrCode: {
    width: 150,
    height: 150,
  },
  optionsContainer: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: "#007bff",
  },
  optionText: {
    fontSize: 14,
    color: "#333",
  },
  /*optionTextActive: {
    color: "#fff",
  },*/
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
