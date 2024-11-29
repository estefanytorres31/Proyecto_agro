import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg'; 

const QRInfo = ({ route }) => {
  const { qrData } = route.params; // QR data passed from navigation
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState("");

  const manejarCambioMantenimiento = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento);
  };

  const manejarGuardar = () => {
    if (mantenimientoSeleccionado) {
      Alert.alert("Éxito", `Mantenimiento seleccionado: ${mantenimientoSeleccionado}`);
    } else {
      Alert.alert("Error", "Por favor, selecciona un mantenimiento.");
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
});

export default QRInfo;
