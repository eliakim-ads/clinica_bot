import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function App() {

  const chamarBackend = async () => {
    try {
      const API_URL = process.env.EXPO_PUBLIC_API_URL 
      const response = await fetch(`${API_URL}/teste`);
      const data = await response.text();

      console.log(data);
      alert(data);

    } catch (error) {
      console.error(error);
      alert('Erro ao conectar com backend');
    }
  };

  return (
    <View style={styles.container}>
      <Text>CRM + Chatbot</Text>

      <Button title="Testar Backend" onPress={chamarBackend} />

      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});