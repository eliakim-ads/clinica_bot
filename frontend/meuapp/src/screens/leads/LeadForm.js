import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Modal,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

export default function LeadForm({ navigation }) {
    const [clientes, setClientes] = useState([]);
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [interesse, setInteresse] = useState('');
    const [status, setStatus] = useState('ABERTO');
    const [carregandoClientes, setCarregandoClientes] = useState(false);
    const [salvando, setSalvando] = useState(false);
    const [erroClientes, setErroClientes] = useState('');
    const [seletorVisivel, setSeletorVisivel] = useState(false);

    const carregarClientes = useCallback(async () => {
        try {
            setCarregandoClientes(true);
            setErroClientes('');

            const response = await api.get('/clientes');
            const clientesRecebidos = Array.isArray(response.data) ? response.data : [];

            setClientes(clientesRecebidos);
            setClienteSelecionado(clienteAtual =>
                clientesRecebidos.find(
                    cliente => cliente.idCliente === clienteAtual?.idCliente
                ) || null
            );
        } catch (error) {
            console.log(error);
            setClientes([]);
            setErroClientes('Não foi possível carregar os clientes.');
        } finally {
            setCarregandoClientes(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            carregarClientes();
        }, [carregarClientes])
    );

    async function salvarLead() {
        const interesseNormalizado = interesse.trim();

        if (!clienteSelecionado || !interesseNormalizado) {
            Alert.alert(
                'Campos obrigatórios',
                'Selecione um cliente e informe o interesse.'
            );
            return;
        }

        try {
            setSalvando(true);

            await api.post('/leads', {
                idCliente: clienteSelecionado.idCliente,
                interesse: interesseNormalizado,
                status
            });

            Alert.alert(
                'Sucesso',
                'Lead cadastrado com sucesso.',
                [
                    {
                        text: 'OK',
                        onPress: () => navigation.goBack()
                    }
                ]
            );
        } catch (error) {
            console.log(error);

            const mensagem =
                error.response?.data?.mensagem ||
                'Não foi possível cadastrar o lead.';

            Alert.alert('Erro', mensagem);
        } finally {
            setSalvando(false);
        }
    }

    function selecionarCliente(cliente) {
        setClienteSelecionado(cliente);
        setSeletorVisivel(false);
    }

    return (
        <>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.conteudo}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={styles.titulo}>Novo Lead</Text>

                <View style={styles.card}>
                    <Text style={styles.label}>Cliente</Text>

                    {carregandoClientes ? (
                        <View style={styles.carregandoClientes}>
                            <ActivityIndicator color="#2E7D32" />
                            <Text style={styles.feedbackText}>Carregando clientes...</Text>
                        </View>
                    ) : (
                        <TouchableOpacity
                            style={styles.seletor}
                            onPress={() => setSeletorVisivel(true)}
                            disabled={clientes.length === 0}
                        >
                            <View style={styles.seletorConteudo}>
                                <Text
                                    style={[
                                        styles.seletorTexto,
                                        !clienteSelecionado && styles.placeholder
                                    ]}
                                    numberOfLines={1}
                                >
                                    {clienteSelecionado?.nome || 'Selecione um cliente'}
                                </Text>

                                {clienteSelecionado && (
                                    <Text style={styles.telefoneCliente} numberOfLines={1}>
                                        {clienteSelecionado.telefone}
                                    </Text>
                                )}
                            </View>

                            <Text style={styles.indicadorSeletor}>▼</Text>
                        </TouchableOpacity>
                    )}

                    {erroClientes ? (
                        <TouchableOpacity onPress={carregarClientes}>
                            <Text style={styles.erroText}>{erroClientes} Tentar novamente.</Text>
                        </TouchableOpacity>
                    ) : null}

                    {!carregandoClientes && !erroClientes && clientes.length === 0 ? (
                        <View style={styles.semClientes}>
                            <Text style={styles.feedbackText}>
                                Cadastre um cliente antes de criar um Lead.
                            </Text>
                            <TouchableOpacity
                                style={styles.botaoSecundario}
                                onPress={() => navigation.navigate('ClienteForm')}
                            >
                                <Text style={styles.textoBotaoSecundario}>Cadastrar cliente</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null}

                    <Text style={styles.label}>Interesse</Text>
                    <TextInput
                        style={styles.input}
                        value={interesse}
                        onChangeText={setInteresse}
                        placeholder="Implante, limpeza, clareamento..."
                    />

                    <Text style={styles.label}>Status</Text>
                    <View style={styles.row}>
                        {['ABERTO', 'GANHO', 'PERDIDO'].map(opcao => (
                            <TouchableOpacity
                                key={opcao}
                                style={[
                                    styles.statusButton,
                                    status === opcao && styles.statusSelecionado
                                ]}
                                onPress={() => setStatus(opcao)}
                            >
                                <Text
                                    style={[
                                        styles.statusText,
                                        status === opcao && styles.statusTextSelecionado
                                    ]}
                                >
                                    {opcao}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <TouchableOpacity
                        style={[styles.botao, salvando && styles.botaoDesabilitado]}
                        onPress={salvarLead}
                        disabled={salvando}
                    >
                        <Text style={styles.textoBotao}>
                            {salvando ? 'Salvando...' : 'Salvar Lead'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <Modal
                visible={seletorVisivel}
                transparent
                animationType="fade"
                onRequestClose={() => setSeletorVisivel(false)}
            >
                <View style={styles.modalOverlay}>
                    <Pressable
                        style={StyleSheet.absoluteFill}
                        onPress={() => setSeletorVisivel(false)}
                    />

                    <View style={styles.modalConteudo}>
                        <Text style={styles.modalTitulo}>Selecionar cliente</Text>

                        <FlatList
                            data={clientes}
                            keyExtractor={item => item.idCliente.toString()}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    style={styles.clienteItem}
                                    onPress={() => selecionarCliente(item)}
                                >
                                    <Text style={styles.clienteNome}>{item.nome}</Text>
                                    <Text style={styles.clienteTelefone}>{item.telefone}</Text>
                                </TouchableOpacity>
                            )}
                        />

                        <TouchableOpacity
                            style={styles.fecharModal}
                            onPress={() => setSeletorVisivel(false)}
                        >
                            <Text style={styles.fecharModalText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8FAF8'
    },

    conteudo: {
        padding: 20,
        paddingBottom: 32
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
        borderColor: '#DDD',
        fontSize: 16
    },

    seletor: {
        minHeight: 55,
        backgroundColor: '#F7F7F7',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#DDD',
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },

    seletorConteudo: {
        flex: 1,
        paddingVertical: 9
    },

    seletorTexto: {
        color: '#222',
        fontSize: 16,
        fontWeight: '600'
    },

    placeholder: {
        color: '#777',
        fontWeight: '400'
    },

    telefoneCliente: {
        color: '#666',
        marginTop: 2
    },

    indicadorSeletor: {
        color: '#2E7D32',
        fontSize: 12,
        marginLeft: 12
    },

    carregandoClientes: {
        minHeight: 55,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },

    feedbackText: {
        color: '#666'
    },

    erroText: {
        color: '#B3261E',
        marginTop: 8
    },

    semClientes: {
        alignItems: 'flex-start',
        gap: 10,
        marginTop: 8
    },

    botaoSecundario: {
        borderWidth: 1,
        borderColor: '#2E7D32',
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: 10
    },

    textoBotaoSecundario: {
        color: '#2E7D32',
        fontWeight: '600'
    },

    row: {
        flexDirection: 'row',
        gap: 8
    },

    statusButton: {
        flex: 1,
        minHeight: 48,
        backgroundColor: '#EEEEEE',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center'
    },

    statusSelecionado: {
        backgroundColor: '#C8E6C9',
        borderWidth: 1,
        borderColor: '#2E7D32'
    },

    statusText: {
        color: '#555',
        fontSize: 12,
        fontWeight: '600'
    },

    statusTextSelecionado: {
        color: '#1B5E20'
    },

    botao: {
        backgroundColor: '#2E7D32',
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 15,
        marginTop: 30
    },

    botaoDesabilitado: {
        opacity: 0.7
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.45)',
        justifyContent: 'center',
        padding: 24
    },

    modalConteudo: {
        maxHeight: '70%',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 20,
        elevation: 8
    },

    modalTitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2E7D32',
        marginBottom: 12
    },

    clienteItem: {
        minHeight: 58,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        paddingVertical: 9
    },

    clienteNome: {
        color: '#222',
        fontSize: 16,
        fontWeight: '600'
    },

    clienteTelefone: {
        color: '#666',
        marginTop: 3
    },

    fecharModal: {
        alignSelf: 'flex-end',
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginTop: 10
    },

    fecharModalText: {
        color: '#2E7D32',
        fontWeight: '600'
    }
});
