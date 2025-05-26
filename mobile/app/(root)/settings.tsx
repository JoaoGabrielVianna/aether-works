import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { COLORS, addOpacity } from '@/constants/colors';
import { Settings, LogOut, User, Moon, Info } from 'lucide-react-native';
import { SectionData } from '@/models/section';
import { useSettingsHandlers } from '@/hooks/useSettingsHandlers';
import { SettingItem } from '@/components/settingsItem';
import { ToggleSetting } from '@/components/ToggleSetting';
import { SettingSection } from '@/components/SettingSection';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const { handleProfile, handleAbout, handleLogout } = useSettingsHandlers();

  const sections: SectionData[] = [
    {
      title: 'Conta',
      data: [
        {
          type: 'item',
          icon: <User size={20} color={COLORS.primary} />,
          title: 'Perfil',
          subtitle: 'Editar informações pessoais',
          onPress: handleProfile,
        },
      ],
    },
    {
      title: 'Aparência',
      data: [
        {
          type: 'toggle',
          icon: <Moon size={20} color={COLORS.primary} />,
          title: 'Modo Escuro',
          subtitle: 'Interface com tema dark',
          value: darkMode,
          onValueChange: setDarkMode,
        },
      ],
    },
    {
      title: 'Suporte',
      data: [
        {
          type: 'item',
          icon: <Info size={20} color={COLORS.textSecondary} />,
          title: 'Sobre',
          subtitle: 'Versão, licenças, créditos',
          onPress: handleAbout,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.background} />
      <View style={styles.header}>
        <Settings size={24} color={COLORS.primary} />
        <Text style={styles.headerTitle}>Configurações</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sections.map(({ title, data }) => (
          <SettingSection key={title} title={title}>
            {data.map((item, idx) =>
              item.type === 'toggle' ? (
                <ToggleSetting
                  key={item.title + idx}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  value={item.value!}
                  onValueChange={item.onValueChange!}
                />
              ) : (
                <SettingItem
                  key={item.title + idx}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  onPress={item.onPress}
                />
              )
            )}
          </SettingSection>
        ))}

        <View style={styles.logoutSection}>
          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            activeOpacity={0.7}
          >
            <LogOut size={20} color={COLORS.error} />
            <Text style={styles.logoutText}>Sair da Conta</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: COLORS.backgroundSecondary,
    gap: 12,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.text,
  },

  scrollView: {
    flex: 1,
  },

  logoutSection: {
    marginTop: 32,
    marginHorizontal: 20,
  },

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: addOpacity(COLORS.error, 0.1),
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },

  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.error,
  },
});
