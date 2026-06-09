import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Configuracoes() {

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Configurações
            </Text>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.texto}>
                    👤 Perfil
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.texto}>
                    🏥 Dados da Clínica
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.texto}>
                    🤖 Mensagens Automáticas
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.texto}>
                    🔗 Integração WhatsApp
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card}>
                <Text style={styles.texto}>
                    🔐 Alterar Senha
                </Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#F8FAF8',
        padding: 20
    },

    titulo: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 30
    },

    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        marginBottom: 15,
        elevation: 2
    },

    texto: {
        fontSize: 16,
        color: '#333'
    }

});