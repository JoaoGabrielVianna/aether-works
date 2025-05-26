import React from 'react';

export interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  rightElement?: React.ReactNode;
  onPress?: () => void;
  showChevron?: boolean;
}

export interface ToggleSettingProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

export interface SectionData {
  title: string;
  data: Array<
    | {
        type: 'item';
        icon: React.ReactNode;
        title: string;
        subtitle?: string;
        onPress?: () => void;
      }
    | {
        type: 'toggle';
        icon: React.ReactNode;
        title: string;
        subtitle?: string;
        value: boolean;
        onValueChange: (value: boolean) => void;
      }
  >;
}
