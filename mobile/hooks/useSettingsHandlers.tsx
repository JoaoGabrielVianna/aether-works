import { useAuth } from '@/contexts/auth';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export function useSettingsHandlers() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleProfile = () => {
    Alert.alert('Perfil', 'Redirecionando para configurações de perfil...');
  };

  const handleAbout = () => {
    Alert.alert(
      'Sobre o App',
      'Digital Twin Monitor\nVersão 1.0.0\n\nDesenvolvido para monitoramento de sensores IoT em tempo real.',
      [{ text: 'OK' }]
    );
  };

  const handleLogout = () => {
    Alert.alert('Sair', 'Tem certeza que deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          try {
            // 🧹 limpa dados salvos
            await AsyncStorage.multiRemove(['token', 'user']);

            // 🚪 encerra sessão no contexto
            await signOut();

            // 🔁 redireciona e impede voltar
            router.replace('/(auth)/signIn');
          } catch (err) {
            console.error('Erro ao sair:', err);
          }
        },
      },
    ]);
  };

  return {
    handleProfile,
    handleAbout,
    handleLogout,
  };
}
