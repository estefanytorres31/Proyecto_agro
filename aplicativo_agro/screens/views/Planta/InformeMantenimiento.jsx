import React, { useState } from "react"; 
import { ScrollView, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import QRCode from 'react-native-qrcode-svg'; 
import useMantenimiento from "../../hooks/Mantenimiento/useMantenimiento";
import { useNavigation } from "@react-navigation/native";
import Historial from "../../components/Historial";
import Button from "../../components/Buttons";
import CustomAlert from "../../components/Alerta";

const Mantenimiento = ({ route }) => {
  const { qrData } = route.params; 
  const { addMantenimiento, obtener3registros } = useMantenimiento();
  const navigation = useNavigation();
  const [mantenimientoSeleccionado, setMantenimientoSeleccionado] = useState("");
  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    type: 'SUCCESS',
    message: '',
  });

  const manejarCambioMantenimiento = (mantenimiento) => {
    setMantenimientoSeleccionado(mantenimiento);
  };

  const handleCloseAlert = () => {
    setAlertConfig(prev => ({ ...prev, visible: false }));
    if (alertConfig.type === 'SUCCESS') {
      navigation.navigate("QRScann");
    }
  };

  const showAlert = (message, type = 'SUCCESS') => {
    setAlertConfig({
      visible: true,
      type,
      message
    });
  };

  const manejarGuardar = async () => {
    if (!mantenimientoSeleccionado) {
      showAlert("Error: Selecciona un mantenimiento.", "ERROR");
      return;
    }

    try {
      const response = await addMantenimiento(qrData, mantenimientoSeleccionado);
      if (response) {
        showAlert("¡Mantenimiento guardado correctamente!");
      } else {
        showAlert("Error al guardar el mantenimiento.", "ERROR");
      }
    } catch (error) {
      showAlert("Error interno.", "ERROR");
    }
  };

  return (
    <View style={estilos.contenedor}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={estilos.contenedorQR}>
          <QRCode value={qrData} size={150} />
          <Text style={estilos.textoQR}>{qrData}</Text>
        </View>

        <Historial 
          getData={obtener3registros} 
          codigoPlanta={qrData} 
          formatData={true}
        />

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
                <Text style={
                  mantenimientoSeleccionado === mantenimiento
                    ? estilos.textoMantenimientoActivo
                    : estilos.textoMantenimiento
                }>
                  {mantenimiento}
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
          style={estilos.boton} 
          onPress={manejarGuardar} 
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
    padding: 14,
    height: 58,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  }
});

export default Mantenimiento;