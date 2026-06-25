import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/login/Login';
import Cadastro from '../screens/cadastro/Cadastro';
import RecuperacaoSenha from '../screens/recuperacaoSenha/RecuperacaoSenha';
import Dashboard from '../screens/dashboard/Dashboard';
import Clientes from '../screens/clientes/Clientes';
import Leads from '../screens/leads/Leads';
import Agenda from '../screens/agenda/Agenda';
import Chatbot from '../screens/chatbot/Chatbot';
import Configuracoes from '../screens/config/Configuracoes';
import LeadDetalhe from '../screens/leads/LeadDetalhe';
import LeadForm from '../screens/leads/LeadForm';
import ClienteDetalhe from '../screens/clientes/ClienteDetalhe';
import ClienteForm from '../screens/clientes/ClienteForm';
import { clearSession, getSession } from '../services/authStorage';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    const [clinicaLogada, setClinicaLogada] = useState(null);
    const [carregandoSessao, setCarregandoSessao] = useState(true);

    useEffect(() => {
        async function carregarSessao() {
            try {
                const session = await getSession();
                setClinicaLogada(session);
            } catch (error) {
                console.log(error);
                await clearSession();
            } finally {
                setCarregandoSessao(false);
            }
        }

        carregarSessao();
    }, []);

    async function handleLogout() {
        try {
            await clearSession();
        } finally {
            setClinicaLogada(null);
        }
    }

    if (carregandoSessao) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#2E7D32" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#2E7D32'
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold'
                    }
                }}
            >
                {clinicaLogada ? (
                    <>
                        <Stack.Screen
                            name="Dashboard"
                            options={{
                                title: 'Dashboard',
                                headerLeft: () => (
                                    <TouchableOpacity
                                        style={styles.headerLogoutButton}
                                        activeOpacity={0.8}
                                        onPress={handleLogout}
                                    >
                                        <Text style={styles.headerLogoutText}>
                                            Sair
                                        </Text>
                                    </TouchableOpacity>
                                )
                            }}
                        >
                            {(props) => (
                                <Dashboard
                                    {...props}
                                    clinica={clinicaLogada}
                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen
                            name="Clientes"
                            component={Clientes}
                            options={{ title: 'Clientes' }}
                        />

                        <Stack.Screen
                            name="Leads"
                            component={Leads}
                        />

                        <Stack.Screen
                            name="Agenda"
                            component={Agenda}
                        />

                        <Stack.Screen
                            name="Chatbot"
                            component={Chatbot}
                        />

                        <Stack.Screen
                            name="Configuracoes"
                            component={Configuracoes}
                            options={{ title: 'Configuracoes' }}
                        />

                        <Stack.Screen
                            name="LeadDetalhe"
                            component={LeadDetalhe}
                            options={{ title: 'Lead' }}
                        />

                        <Stack.Screen
                            name="ClienteDetalhe"
                            component={ClienteDetalhe}
                            options={{ title: 'Cliente' }}
                        />

                        <Stack.Screen
                            name="ClienteForm"
                            component={ClienteForm}
                            options={{ title: 'Novo Cliente' }}
                        />

                        <Stack.Screen
                            name="LeadForm"
                            component={LeadForm}
                            options={{ title: 'Novo Lead' }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen
                            name="Login"
                            options={{ headerShown: false }}
                        >
                            {(props) => (
                                <Login
                                    {...props}
                                    onLoginSuccess={setClinicaLogada}
                                />
                            )}
                        </Stack.Screen>

                        <Stack.Screen
                            name="Cadastro"
                            component={Cadastro}
                            options={{ title: 'Criar Conta' }}
                        />

                        <Stack.Screen
                            name="RecuperacaoSenha"
                            component={RecuperacaoSenha}
                            options={{ title: 'Recuperar Senha' }}
                        />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F8FAF8'
    },

    headerLogoutButton: {
        marginRight: 14,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        backgroundColor: '#1B5E20'
    },

    headerLogoutText: {
        color: '#FFF',
        fontWeight: 'bold'
    }
});
