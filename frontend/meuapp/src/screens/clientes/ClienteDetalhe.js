import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function ClienteDetalhe({ route }) {

    const { cliente } = route.params;

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Dados do Cliente
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    Nome
                </Text>

                <Text style={styles.valor}>
                    {cliente.nome}
                </Text>

                <Text style={styles.label}>
                    Telefone
                </Text>

                <Text style={styles.valor}>
                    {cliente.telefone}
                </Text>

                <Text style={styles.label}>
                    Data Cadastro
                </Text>

                <Text style={styles.valor}>
                    {cliente.dataCadastro}
                </Text>

            </View>

            <TouchableOpacity style={styles.botaoEditar}>
                <Text style={styles.textoBotao}>
                    Editar Cliente
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
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 20
    },

    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 15,
        elevation: 3
    },

    label: {
        color: '#666',
        marginTop: 15
    },

    valor: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333'
    },

    botaoEditar: {
        backgroundColor: '#2E7D32',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 25
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    }

});