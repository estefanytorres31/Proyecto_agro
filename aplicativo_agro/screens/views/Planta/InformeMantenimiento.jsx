import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import QRCode from 'react-native-qrcode-svg'; 
import useMantenimiento from "../../hooks/Mantenimiento/useMantenimiento";

const Mantenimiento = ({ route }) => {
  const { qrData } = route.params; 
  const { addMantenimiento } = useMantenimiento();
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStyle, setModalStyle] = useState(estilos.modalSuccess);

  const manejarCambioMantenimiento = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento);
  };

  const manejarGuardar = async () => {
    if (mantenimientoSeleccionado) {
      try {
        const response = await addMantenimiento(qrData, mantenimientoSeleccionado); 
        console.log(response);
        if (response) {
          setModalMessage("¡Mantenimiento guardado correctamente!");
          setModalStyle(estilos.modalSuccess);
        } else {
          setModalMessage("Error al guardar la mantenimiento.");
          setModalStyle(estilos.modalError);
        }
      } catch (error) {
        console.log(error)
        setModalMessage("Error interno.");
        setModalStyle(estilos.modalError);
      }
      setModalVisible(true);
    } else {
      setModalMessage("Error: Selecciona un mantenimiento.");
      setModalStyle(estilos.modalError);
      setModalVisible(true);
    }
  };

  return (
    <View style={estilos.contenedor}>
      {/* Código QR */}
      <View style={estilos.contenedorQR}>
        <QRCode value={qrData} size={150} />
        <Text style={estilos.textoQR}>{qrData}</Text>
      </View>

      {/* Contenedor de mantenimientos */}
      <View style={estilos.contenedorMantenimientos}>
        <Text style={estilos.subtitulo}>Seleccione un mantenimiento:</Text>
        <View style={estilos.mantenimientos}>
          {["Abono", "Poda", "Otros"].map((mantenimiento) => (
            <TouchableOpacity
              key={mantenimiento}
              style={[
                estilos.itemMantenimiento,
                mantenimientoSeleccionado === mantenimiento && estilos.itemMantenimientoActivo,
              ]}
              onPress={() => manejarCambioMantenimiento(mantenimiento)}
            >
              <Text
                style={
                  mantenimientoSeleccionado === mantenimiento
                    ? estilos.textoMantenimientoActivo
                    : estilos.textoMantenimiento
                }
              >
                {mantenimiento}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Botón Guardar */}
      <TouchableOpacity style={estilos.boton} onPress={manejarGuardar}>
        <Text style={estilos.textoBoton}>GUARDAR</Text>
      </TouchableOpacity>
      {/* Modal Personalizado */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={estilos.modalOverlay}>
          <View style={[estilos.modalContent, modalStyle]}>
            <Text style={estilos.modalText}>{modalMessage}</Text>
            <TouchableOpacity
              style={estilos.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={estilos.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  contenedorQR: {
    alignItems: "center",
    marginBottom: 20,
  },
  textoQR: {
    fontSize: 16,
    color: "#333",
    marginTop: 8,
  },
  contenedorMantenimientos: {
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 14,
    color: "#333",
    marginBottom: 16,
  },
  mantenimientos: {
    width: "100%",
  },
  itemMantenimiento: {
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
  itemMantenimientoActivo: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  textoMantenimiento: {
    fontSize: 14,
    color: "#333",
  },
  textoMantenimientoActivo: {
    color: "#fff",
  },
  boton: {
    backgroundColor: "#30C81E",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  textoBoton: {
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


export default Mantenimiento;
