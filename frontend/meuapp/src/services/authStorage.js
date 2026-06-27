import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_SESSION_KEY = '@clinica_crm:session';
let memorySession = null;

export async function saveSession(clinica, persistir = true) {
  memorySession = clinica;

  if (!persistir) {
    return;
  }

  try {
    await AsyncStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(clinica));
  } catch (error) {
    console.log('AsyncStorage indisponivel. Sessao mantida apenas em memoria.', error);
  }
}

export async function getSession() {
  try {
    const session = await AsyncStorage.getItem(AUTH_SESSION_KEY);

    if (!session) {
      return memorySession;
    }

    memorySession = JSON.parse(session);
    return memorySession;
  } catch (error) {
    console.log('AsyncStorage indisponivel ao carregar sessao.', error);
    return memorySession;
  }
}

export function getMemorySession() {
  return memorySession;
}

export async function getAuthToken() {
  const session = memorySession || await getSession();
  return session?.token || null;
}

export async function clearSession() {
  memorySession = null;

  try {
    await AsyncStorage.removeItem(AUTH_SESSION_KEY);
  } catch (error) {
    console.log('AsyncStorage indisponivel ao limpar sessao.', error);
  }
}
