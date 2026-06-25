import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView
} from 'react-native';

import api from '../../services/api';

export default function ClienteForm({ navigation }) {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    async function salvarCliente() {

        if (!nome || !telefone) {
            Alert.alert(
                'Campos obrigatórios',
                'Preencha nome e telefone.'
            );
            return;
        }

        try {

            await api.post('/clientes', {
                nome,
                telefone
            });

            Alert.alert(
                'Sucesso',
                'Cliente cadastrado com sucesso!'
            );

            navigation.goBack();

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível cadastrar o cliente.'
            );

        }

    }

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>
                Novo Cliente
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    Nome
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="Nome completo"
                    value={nome}
                    onChangeText={setNome}
                />

                <Text style={styles.label}>
                    Telefone
                </Text>

                <TextInput
                    style={styles.input}
                    placeholder="(21) 99999-9999"
                    keyboardType="phone-pad"
                    value={telefone}
                    onChangeText={setTelefone}
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={salvarCliente}
                >
                    <Text style={styles.textoBotao}>
                        Salvar Cliente
                    </Text>
                </TouchableOpacity>

            </View>

        </ScrollView>

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
        marginBottom: 25
    },

    card: {
        backgroundColor: '#FFF',
        padding: 20,
        borderRadius: 20,
        elevation: 3
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444',
        marginBottom: 8,
        marginTop: 15
    },

    input: {
        height: 55,
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0'
    },

    botao: {
        backgroundColor: '#2E7D32',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 30
    },

    textoBotao: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: 'bold'
    }

});