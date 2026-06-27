import React, { useCallback, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import api from '../../services/api';

export default function LeadDetalhe({ navigation, route }) {
    const leadInicial = route.params?.lead;
    const idLead = route.params?.idLead || leadInicial?.idCadastroLead;

    const [lead, setLead] = useState(leadInicial || null);
    const [carregando, setCarregando] = useState(false);
    const [atualizando, setAtualizando] = useState(false);

    const carregarLead = useCallback(async () => {
        if (!idLead) {
            Alert.alert('Erro', 'Lead não informado.');
            navigation.goBack();
            return;
        }

        try {
            setCarregando(true);

            const response = await api.get(`/leads/${idLead}`);
            setLead(response.data);
        } catch (error) {
            console.log(error);

            Alert.alert(
                'Erro',
                error.response?.status === 404
                    ? 'Lead não encontrado.'
                    : 'Não foi possível carregar o Lead.'
            );
        } finally {
            setCarregando(false);
        }
    }, [idLead, navigation]);

    useFocusEffect(
        useCallback(() => {
            carregarLead();
        }, [carregarLead])
    );

    async function atualizarStatus(novoStatus) {
        if (!lead || lead.status === novoStatus) {
            return;
        }

        try {
            setAtualizando(true);

            const response = await api.put(`/leads/${lead.idCadastroLead}`, {
                idCliente: lead.idCliente,
                interesse: lead.interesse,
                status: novoStatus
            });

            setLead(response.data);
            Alert.alert('Sucesso', `Lead marcado como ${novoStatus.toLowerCase()}.`);
        } catch (error) {
            console.log(error);

            Alert.alert(
                'Erro',
                error.response?.data?.mensagem ||
                    'Não foi possível atualizar o status do Lead.'
            );
        } finally {
            setAtualizando(false);
        }
    }

    function confirmarStatus(novoStatus) {
        if (lead?.status === novoStatus) {
            return;
        }

        Alert.alert(
            'Atualizar status',
            `Deseja marcar este Lead como ${novoStatus.toLowerCase()}?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Confirmar', onPress: () => atualizarStatus(novoStatus) }
            ]
        );
    }

    function formatarData(dataCriacao) {
        if (!dataCriacao) {
            return 'Não informada';
        }

        const data = new Date(dataCriacao);

        if (Number.isNaN(data.getTime())) {
            return dataCriacao;
        }

        return data.toLocaleString('pt-BR');
    }

    if (carregando && !lead) {
        return (
            <View style={styles.feedbackContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
                <Text style={styles.feedbackText}>Carregando Lead...</Text>
            </View>
        );
    }

    if (!lead) {
        return (
            <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>Lead não encontrado.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Detalhes do Lead</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Cliente</Text>
                <Text style={styles.valor}>{lead.nome}</Text>

                <Text style={styles.label}>Telefone</Text>
                <Text style={styles.valor}>{lead.telefone}</Text>

                <Text style={styles.label}>Interesse</Text>
                <Text style={styles.valor}>{lead.interesse}</Text>

                <Text style={styles.label}>Status</Text>
                <Text style={styles.valor}>{lead.status}</Text>

                <Text style={styles.label}>Data de criação</Text>
                <Text style={styles.valor}>{formatarData(lead.dataCriacao)}</Text>
            </View>

            <TouchableOpacity
                style={[
                    styles.botaoGanho,
                    (atualizando || lead.status === 'GANHO') && styles.botaoDesabilitado
                ]}
                disabled={atualizando || lead.status === 'GANHO'}
                onPress={() => confirmarStatus('GANHO')}
            >
                <Text style={styles.textoBotao}>
                    {lead.status === 'GANHO' ? 'Lead ganho' : 'Marcar como Ganho'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.botaoPerdido,
                    (atualizando || lead.status === 'PERDIDO') && styles.botaoDesabilitado
                ]}
                disabled={atualizando || lead.status === 'PERDIDO'}
                onPress={() => confirmarStatus('PERDIDO')}
            >
                <Text style={styles.textoBotao}>
                    {atualizando
                        ? 'Atualizando...'
                        : lead.status === 'PERDIDO'
                            ? 'Lead perdido'
                            : 'Marcar como Perdido'}
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
        marginBottom: 25
    },

    card: {
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 20,
        marginBottom: 30,
        elevation: 2
    },

    label: {
        fontSize: 13,
        color: '#777',
        marginTop: 15
    },

    valor: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600'
    },

    botaoGanho: {
        backgroundColor: '#2E7D32',
        minHeight: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15
    },

    botaoPerdido: {
        backgroundColor: '#C62828',
        minHeight: 55,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center'
    },

    botaoDesabilitado: {
        opacity: 0.55
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    },

    feedbackContainer: {
        flex: 1,
        backgroundColor: '#F8FAF8',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24
    },

    feedbackText: {
        color: '#666',
        marginTop: 12,
        textAlign: 'center'
    }
});
