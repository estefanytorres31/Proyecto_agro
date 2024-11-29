import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useNavigation } from "@react-navigation/native";

const Menu = ({ route }) => {
    const { qrData } = route.params || {};
    const [menuSeleccionado, setMenuSeleccionado] = useState("");
    const navigation = useNavigation(); // Hook de navegación

    const manejarCambioMenu = (menu) => {
        setMenuSeleccionado(menu);

        // Navegar a la pantalla correspondiente
        if (menu === "Cosecha") {
          navigation.navigate("QRInfo", { qrData }); // Asegúrate de pasar los datos del QR
      } else if (menu === "Mantenimiento") {
          navigation.navigate("Mantenimiento", { qrData }); // Asegúrate de pasar los datos del QR
      }
    };

    if (!qrData) {
        return (
            <View style={estilos.contenedor}>
                <Text style={estilos.textoError}>
                    Error: No se recibió información del código QR.
                </Text>
            </View>
        );
    }

    return (
        <View style={estilos.contenedor}>
            <View style={estilos.contenedorQR}>
                <QRCode value={qrData} size={150} />
                <Text style={estilos.textoQR}>{qrData}</Text>
            </View>

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
});

export default Menu;
