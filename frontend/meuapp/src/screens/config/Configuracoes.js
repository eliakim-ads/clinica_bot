import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

export default function Configuracoes({ navigation }) {
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


            {/* MENU INFERIOR */}
            <View style={styles.tabBar}>

                <TouchableOpacity style={styles.tabItem}
                    onPress={() => navigation.navigate('Dashboard')}
                >
                    <Text style={styles.tabIconActive}>🏠</Text>
                    <Text style={styles.tabTextActive}>Início</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('Clientes')}
                >
                    <Text style={styles.tabIcon}>👥</Text>
                    <Text style={styles.tabText}>Clientes</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('Leads')}
                >
                    <Text style={styles.tabIcon}>📈</Text>
                    <Text style={styles.tabText}>Leads</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => navigation.navigate('Configuracoes')}
                >
                    <Text style={styles.tabIcon}>⚙️</Text>
                    <Text style={styles.tabText}>Config.</Text>
                </TouchableOpacity>

            </View>

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
    },

    tabBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 15,
        elevation: 10
    },

    tabItem: {
        alignItems: 'center'
    },

    tabIconActive: {
        fontSize: 22
    },

    tabTextActive: {
        color: '#2E7D32',
        fontWeight: 'bold'
    },

    tabIcon: {
        fontSize: 22
    },

    tabText: {
        color: '#666'
    }

});
