import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import useCosecha from "../../hooks/Cosecha/useCosecha"; // Asegúrate de que la ruta sea correcta

const QRInfo = ({ route }) => {
  const { qrData } = route.params;
  const { addCosecha } = useCosecha(); // Obtén la función desde el contexto
  const [selectedOption, setSelectedOption] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStyle, setModalStyle] = useState(styles.modalSuccess);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSave = async () => {
    if (selectedOption) {
      try {
        const response = await addCosecha(qrData, selectedOption); 
        console.log(response);
        if (response) {
          setModalMessage("¡Cosecha guardada correctamente!");
          setModalStyle(styles.modalSuccess);
        } else {
          setModalMessage("Error al guardar la cosecha.");
          setModalStyle(styles.modalError);
        }
      } catch (error) {
        console.log(error)
        setModalMessage("Error al interno.");
        setModalStyle(styles.modalError);
      }
      setModalVisible(true);
    } else {
      setModalMessage("Error: Selecciona un tamaño de fruto.");
      setModalStyle(styles.modalError);
      setModalVisible(true);
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

      {/* Modal Personalizado */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, modalStyle]}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalSuccess: {
    backgroundColor: "#d4edda",
    borderColor: "#155724",
    borderWidth: 2,
  },
  modalError: {
    backgroundColor: "#f8d7da",
    borderColor: "#721c24",
    borderWidth: 2,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: "center",
  },
  modalButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
});

export default QRInfo;
