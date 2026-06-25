import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Alert,
    ScrollView
} from 'react-native';

import api from '../../services/api';

export default function LeadForm({ navigation }) {

    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [interesse, setInteresse] = useState('');
    const [status, setStatus] = useState('ABERTO');
    const [observacao, setObservacao] = useState('');

    async function salvarLead() {

        if (!nome || !telefone) {

            Alert.alert(
                'Campos obrigatórios',
                'Preencha nome e telefone.'
            );

            return;
        }

        try {

            await api.post('/leads', {

                nome,
                telefone,
                interesse,
                status,
                observacao

            });

            Alert.alert(
                'Sucesso',
                'Lead cadastrado com sucesso.'
            );

            navigation.goBack();

        } catch (error) {

            console.log(error);

            Alert.alert(
                'Erro',
                'Não foi possível cadastrar o lead.'
            );
        }
    }

    return (

        <ScrollView style={styles.container}>

            <Text style={styles.titulo}>
                Novo Lead
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>
                    Nome
                </Text>

                <TextInput
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                    placeholder="Nome do paciente"
                />

                <Text style={styles.label}>
                    Telefone
                </Text>

                <TextInput
                    style={styles.input}
                    value={telefone}
                    onChangeText={setTelefone}
                    keyboardType="phone-pad"
                    placeholder="(21) 99999-9999"
                />

                <Text style={styles.label}>
                    Interesse
                </Text>

                <TextInput
                    style={styles.input}
                    value={interesse}
                    onChangeText={setInteresse}
                    placeholder="Implante, limpeza, clareamento..."
                />

                <Text style={styles.label}>
                    Status
                </Text>

                <View style={styles.row}>

                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            status === 'ABERTO' && styles.statusSelecionado
                        ]}
                        onPress={() => setStatus('ABERTO')}
                    >
                        <Text>ABERTO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            status === 'GANHO' && styles.statusSelecionado
                        ]}
                        onPress={() => setStatus('GANHO')}
                    >
                        <Text>GANHO</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.statusButton,
                            status === 'PERDIDO' && styles.statusSelecionado
                        ]}
                        onPress={() => setStatus('PERDIDO')}
                    >
                        <Text>PERDIDO</Text>
                    </TouchableOpacity>

                </View>

                <Text style={styles.label}>
                    Observações
                </Text>

                <TextInput
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    value={observacao}
                    onChangeText={setObservacao}
                    placeholder="Observações do atendimento..."
                />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={salvarLead}
                >
                    <Text style={styles.textoBotao}>
                        Salvar Lead
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
        marginBottom: 20
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        elevation: 3
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#444',
        marginTop: 15,
        marginBottom: 8
    },

    input: {
        height: 55,
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        paddingHorizontal: 15,
        borderWidth: 1,
        borderColor: '#DDD'
    },

    textArea: {
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        padding: 15,
        textAlignVertical: 'top',
        height: 120
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    statusButton: {
        flex: 1,
        backgroundColor: '#EEEEEE',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 5
    },

    statusSelecionado: {
        backgroundColor: '#C8E6C9'
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
        fontWeight: 'bold',
        fontSize: 16
    }

});