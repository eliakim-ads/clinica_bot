import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../screens/Login';
import Cadastro from '../screens/Cadastro';
import Dashboard from '../screens/Dashboard';
import Clientes from '../screens/Clientes';
import Leads from '../screens/Leads';
import Agenda from '../screens/Agenda';
import Chatbot from '../screens/Chatbot';
import Configuracoes from '../screens/Configuracoes';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
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
                {/* Autenticação */}
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="Cadastro"
                    component={Cadastro}
                    options={{ title: 'Criar Conta' }}
                />

                {/* Sistema */}
                <Stack.Screen
                    name="Dashboard"
                    component={Dashboard}
                    options={{ title: 'Clínica' }}
                />

                <Stack.Screen
                    name="Clientes"
                    component={Clientes}
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
                    options={{ title: 'Configurações' }}
                />

            </Stack.Navigator>
        </NavigationContainer>
    );
}