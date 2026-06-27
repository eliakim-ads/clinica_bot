import React, { useCallback, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

export default function ClienteDetalhe({ navigation, route }) {
    const clienteInicial = route.params?.cliente;
    const [cliente, setCliente] = useState(clienteInicial);
    const [carregando, setCarregando] = useState(false);

    async function carregarCliente() {
        if (!clienteInicial?.idCliente) {
            return;
        }

        try {
            setCarregando(true);

            const response = await api.get(`/clientes/${clienteInicial.idCliente}`);
            setCliente(response.data);
        } catch (error) {
            console.log(error);
            Alert.alert('Erro', 'Nao foi possivel carregar os dados do cliente.');
        } finally {
            setCarregando(false);
        }
    }

    useFocusEffect(
        useCallback(() => {
            carregarCliente();
        }, [clienteInicial?.idCliente])
    );

    function formatarData(dataCadastro) {
        if (!dataCadastro) {
            return 'Nao informado';
        }

        const data = new Date(dataCadastro);

        if (Number.isNaN(data.getTime())) {
            return dataCadastro;
        }

        return data.toLocaleDateString('pt-BR');
    }

    if (carregando && !cliente) {
        return (
            <View style={styles.feedbackContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
                <Text style={styles.feedbackText}>Carregando cliente...</Text>
            </View>
        );
    }

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
                    {cliente?.nome || 'Nao informado'}
                </Text>

                <Text style={styles.label}>
                    Telefone
                </Text>

                <Text style={styles.valor}>
                    {cliente?.telefone || 'Nao informado'}
                </Text>

                <Text style={styles.label}>
                    Data Cadastro
                </Text>

                <Text style={styles.valor}>
                    {formatarData(cliente?.dataCadastro)}
                </Text>
            </View>

            <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => navigation.navigate('ClienteForm', { cliente })}
            >
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
    },

    feedbackContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAF8'
    },

    feedbackText: {
        color: '#666',
        marginTop: 12
    }
});
