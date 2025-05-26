import { useAuth } from '@/contexts/auth';
import { Alert } from 'react-native';

export function useSettingsHandlers() {
  const {signOut} = useAuth();
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
        onPress: () => {
          // TODO: implementar logout real
          signOut();
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
