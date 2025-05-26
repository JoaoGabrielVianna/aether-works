import React from 'react';
import { Switch } from 'react-native';
import { COLORS, addOpacity } from '@/constants/colors';
import { SettingItem } from './settingsItem';
import { ToggleSettingProps } from '@/models/section';


export function ToggleSetting({ icon, title, subtitle, value, onValueChange }: ToggleSettingProps) {
  return (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightElement={
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ false: COLORS.border, true: addOpacity(COLORS.primary, 0.3) }}
          thumbColor={value ? COLORS.primary : COLORS.textTertiary}
          ios_backgroundColor={COLORS.border}
        />
      }
      showChevron={false}
    />
  );
}
