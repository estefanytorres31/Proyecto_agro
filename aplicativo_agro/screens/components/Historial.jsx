import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const formatDateTime = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return `${day}-${month}-${year}, Hora:${hours}:${minutes}:${seconds}`;
};

const Historial = ({ getData, codigoPlanta, formatData }) => {
  const [historial, setHistorial] = useState([]);

  useEffect(() => {
    const fetchHistorial = async () => {
      try {
        const data = await getData(codigoPlanta);
        setHistorial(data || []);
      } catch (error) {
        console.error("Error al cargar el historial:", error);
      }
    };

    fetchHistorial();
  }, [codigoPlanta, getData]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Últimos registros:</Text>
      {historial.length > 0 ? (
        historial.map((item, index) => (
          <View key={index} style={styles.historialItem}>
            <Text style={styles.texto}>
              Fecha: {formatData ? formatDateTime(item.fecha_registro) : item.fecha}
            </Text>
            {item.tamaño_fruto && (
              <Text style={styles.texto}>Tamaño del fruto: {item.tamaño_fruto}</Text>
            )}
            {item.mantenimiento && (
              <Text style={styles.texto}>Tipo de mantenimiento: {item.mantenimiento}</Text>
            )}
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
    marginBottom: 30,
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
    fontSize: 12,
    color: "black",
  },
});

export default Historial;
