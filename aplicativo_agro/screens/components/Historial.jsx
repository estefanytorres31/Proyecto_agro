import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import useCosecha from "../hooks/Cosecha/useCosecha"; 

const HistorialCosechas = ({ qrData }) => {
  const { getLastCosecha } = useCosecha();
  const [historial, setHistorial] = useState([]); // Estado inicial como arreglo vacío

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await getLastCosecha(qrData);
        console.log(data);
        console.log("qrData recibido en Historial:", qrData);
        setHistorial(data || []); // Si `data` es null, establece un arreglo vacío
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    };

    fetchHistorial();
  }, [qrData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimas 3 cosechas:</Text>
      {historial.length > 0 ? ( // Esto ahora es seguro porque `historial` siempre es un arreglo
        historial.map((cosecha, index) => (
          <View key={index} style={styles.historialItem}>
            <Text style={styles.texto}>Tamaño: {cosecha.tamano_fruto}</Text>
            <Text style={styles.texto}>Fecha: {cosecha.fecha_registro}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.texto}>No hay historial disponible.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#E3F2FD",
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  historialItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  texto: {
    fontSize: 14,
    color: "#333",
  },
});

export default HistorialCosechas;
