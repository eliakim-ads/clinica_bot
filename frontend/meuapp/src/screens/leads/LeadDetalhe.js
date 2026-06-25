import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function LeadDetalhe({ route }) {

    const { lead } = route.params;

    return (

        <View style={styles.container}>

            <Text style={styles.titulo}>
                Detalhes do Lead
            </Text>

            <View style={styles.card}>

                <Text style={styles.label}>Nome</Text>
                <Text style={styles.valor}>{lead.nome}</Text>

                <Text style={styles.label}>Telefone</Text>
                <Text style={styles.valor}>{lead.telefone}</Text>

                <Text style={styles.label}>Interesse</Text>
                <Text style={styles.valor}>{lead.interesse}</Text>

                <Text style={styles.label}>Status</Text>
                <Text style={styles.valor}>{lead.status}</Text>

                <Text style={styles.label}>Data</Text>
                <Text style={styles.valor}>{lead.data}</Text>

            </View>

            <TouchableOpacity style={styles.botaoGanho}>
                <Text style={styles.textoBotao}>
                    Marcar como Ganho
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoPerdido}>
                <Text style={styles.textoBotao}>
                    Marcar como Perdido
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
        color: '#999',
        marginTop: 15
    },

    valor: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600'
    },

    botaoGanho: {
        backgroundColor: '#4CAF50',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center',
        marginBottom: 15
    },

    botaoPerdido: {
        backgroundColor: '#F44336',
        padding: 18,
        borderRadius: 15,
        alignItems: 'center'
    },

    textoBotao: {
        color: '#FFF',
        fontWeight: 'bold'
    }

});