import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import QRCode from 'react-native-qrcode-svg'; 

const QRInfo = ({ route }) => {
  const { qrData } = route.params || {}; // Validar si existe qrData
  const [menuSeleccionado, setMenuSeleccionado] = useState("");

  const manejarCambioMenu = (menu) => {
    setMenuSeleccionado(menu);
  };

  const manejarGuardar = () => {
    if (menuSeleccionado) {
      Alert.alert(
        "Éxito",
        `Menú seleccionado: ${menuSeleccionado}`,
        [{ text: "OK", onPress: () => console.log("Menú guardado") }]
      );
    } else {
      Alert.alert(
        "Error",
        "Por favor, selecciona un menú.",
        [{ text: "OK", onPress: () => console.log("Alerta cerrada") }]
      );
    }
  };

  if (!qrData) {
    return (
      <View style={estilos.contenedor}>
        <Text style={estilos.textoError}>Error: No se recibió información del código QR.</Text>
      </View>
    );
  }

  return (
    <View style={estilos.contenedor}>
      {/* Código QR */}
      <View style={estilos.contenedorQR}>
        <QRCode value={qrData} size={150} />
        <Text style={estilos.textoQR}>{qrData}</Text>
      </View>

      {/* Contenedor de menús */}
      <View style={estilos.contenedorMenus}>
        <Text style={estilos.subtitulo}>Seleccione un menú:</Text>
        <View style={estilos.menus}>
          {["Cosecha", "Mantenimiento"].map((menu) => (
            <TouchableOpacity
              key={menu}
              style={[
                estilos.itemMenu,
                menuSeleccionado === menu && estilos.itemMenuActivo,
              ]}
              onPress={() => manejarCambioMenu(menu)}
            >
              <Text
                style={
                  menuSeleccionado === menu
                    ? estilos.textoMenuActivo
                    : estilos.textoMenu
                }
              >
                {menu}
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
  textoError: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 20,
  },
  contenedorMenus: {
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
  menus: {
    width: "100%",
  },
  itemMenu: {
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
  itemMenuActivo: {
    backgroundColor: "#007bff",
    borderColor: "#007bff",
  },
  textoMenu: {
    fontSize: 14,
    color: "#333",
  },
  textoMenuActivo: {
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
