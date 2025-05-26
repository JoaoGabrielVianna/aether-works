import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, addOpacity } from '@/constants/colors';
import { ChevronRight } from 'lucide-react-native';
import { SettingItemProps } from '@/models/section';


export function SettingItem({
  icon,
  title,
  subtitle,
  rightElement,
  onPress,
  showChevron = true,
}: SettingItemProps) {
  return (
    <TouchableOpacity
      style={styles.settingItem}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={styles.settingText}>
          <Text style={styles.settingTitle}>{title}</Text>
          {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
        </View>
      </View>

      <View style={styles.settingRight}>
        {rightElement}
        {showChevron && !rightElement && <ChevronRight size={20} color={COLORS.textTertiary} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: addOpacity(COLORS.primary, 0.1),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  settingText: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: 2,
  },

  settingSubtitle: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },

  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});
