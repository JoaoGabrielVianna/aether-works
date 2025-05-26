// Paleta de cores base
const baseColors = {
    // Cores primárias
    primary: {
      50: '#E3F2FD',
      100: '#BBDEFB',
      200: '#90CAF9',
      300: '#64B5F6',
      400: '#42A5F5',
      500: '#2196F3',
      600: '#1E88E5',
      700: '#1976D2',
      800: '#1565C0',
      900: '#0D47A1',
    },
    
    // Cores secundárias (laranja)
    secondary: {
      50: '#FFF3E0',
      100: '#FFE0B2',
      200: '#FFCC80',
      300: '#FFB74D',
      400: '#FFA726',
      500: '#FF9800',
      600: '#FF8F00',
      700: '#FF6F00',
      800: '#E65100',
      900: '#BF360C',
    },
    
    // Tons de cinza
    gray: {
      50: '#FAFAFA',
      100: '#F5F5F5',
      200: '#EEEEEE',
      300: '#E0E0E0',
      400: '#BDBDBD',
      500: '#9E9E9E',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
    
    // Cores de status
    success: {
      50: '#E8F5E8',
      100: '#C8E6C9',
      500: '#4CAF50',
      600: '#43A047',
      700: '#388E3C',
    },
    
    warning: {
      50: '#FFF8E1',
      100: '#FFECB3',
      500: '#FFC107',
      600: '#FFB300',
      700: '#FFA000',
    },
    
    error: {
      50: '#FFEBEE',
      100: '#FFCDD2',
      500: '#F44336',
      600: '#E53935',
      700: '#D32F2F',
    },
    
    info: {
      50: '#E1F5FE',
      100: '#B3E5FC',
      500: '#03A9F4',
      600: '#039BE5',
      700: '#0288D1',
    },
    
    // Cores básicas
    white: '#FFFFFF',
    black: '#000000',
    transparent: 'transparent',
  };
  
  // Tema escuro melhorado
  const darkTheme = {
    // Backgrounds
    background: '#0A0A0A',
    backgroundSecondary: '#111111',
    backgroundTertiary: '#1A1A1A',
    surface: '#1E1E1E',
    surfaceVariant: '#2A2A2A',
    
    // Cores primárias
    primary: baseColors.primary[400],
    primaryVariant: baseColors.primary[600],
    onPrimary: baseColors.white,
    
    // Cores secundárias
    secondary: baseColors.secondary[400],
    secondaryVariant: baseColors.secondary[600],
    onSecondary: baseColors.white,
    
    // Textos
    text: baseColors.white,
    textSecondary: baseColors.gray[300],
    textTertiary: baseColors.gray[500],
    onSurface: baseColors.white,
    
    // Status colors
    success: baseColors.success[500],
    successBackground: baseColors.success[50],
    onSuccess: baseColors.white,
    
    warning: baseColors.warning[500],
    warningBackground: baseColors.warning[50],
    onWarning: baseColors.white,
    
    error: baseColors.error[500],
    errorBackground: baseColors.error[50],
    onError: baseColors.white,
    
    info: baseColors.info[500],
    infoBackground: baseColors.info[50],
    onInfo: baseColors.white,
    
    // Elementos de interface
    border: '#2C2C2C',
    borderLight: '#383838',
    divider: '#2C2C2C',
    
    // Inputs
    inputBackground: '#1C1C1C',
    inputBorder: '#2C2C2C',
    inputBorderFocused: baseColors.primary[400],
    placeholder: '#888888',
    
    // Outros
    link: baseColors.primary[300],
    disabled: baseColors.gray[600],
    onDisabled: baseColors.gray[400],
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.5)',
    elevation: 'rgba(0, 0, 0, 0.3)',
  };
  
  // Tema claro (para futuro uso)
  const lightTheme = {
    // Backgrounds
    background: baseColors.white,
    backgroundSecondary: baseColors.gray[50],
    backgroundTertiary: baseColors.gray[100],
    surface: baseColors.white,
    surfaceVariant: baseColors.gray[50],
    
    // Cores primárias
    primary: baseColors.primary[600],
    primaryVariant: baseColors.primary[700],
    onPrimary: baseColors.white,
    
    // Cores secundárias
    secondary: baseColors.secondary[600],
    secondaryVariant: baseColors.secondary[700],
    onSecondary: baseColors.white,
    
    // Textos
    text: baseColors.gray[900],
    textSecondary: baseColors.gray[700],
    textTertiary: baseColors.gray[500],
    onSurface: baseColors.gray[900],
    
    // Status colors
    success: baseColors.success[600],
    successBackground: baseColors.success[50],
    onSuccess: baseColors.white,
    
    warning: baseColors.warning[600],
    warningBackground: baseColors.warning[50],
    onWarning: baseColors.white,
    
    error: baseColors.error[600],
    errorBackground: baseColors.error[50],
    onError: baseColors.white,
    
    info: baseColors.info[600],
    infoBackground: baseColors.info[50],
    onInfo: baseColors.white,
    
    // Elementos de interface
    border: baseColors.gray[300],
    borderLight: baseColors.gray[200],
    divider: baseColors.gray[200],
    
    // Inputs
    inputBackground: baseColors.white,
    inputBorder: baseColors.gray[300],
    inputBorderFocused: baseColors.primary[600],
    placeholder: baseColors.gray[500],
    
    // Outros
    link: baseColors.primary[600],
    disabled: baseColors.gray[300],
    onDisabled: baseColors.gray[500],
    
    // Shadows
    shadow: 'rgba(0, 0, 0, 0.1)',
    elevation: 'rgba(0, 0, 0, 0.05)',
  };
  
  export const THEMES = {
    dark: darkTheme,
    light: lightTheme,
  };
  
  export const COLORS = THEMES.dark;
  
  // Utility functions para trabalhar com cores
  export const getStatusColor = (status: string) => {
    switch (status) {
      case 'OK':
        return {
          background: COLORS.success,
          text: COLORS.onSuccess,
        };
      case 'Alerta':
        return {
          background: COLORS.warning,
          text: COLORS.onWarning,
        };
      case 'Erro':
        return {
          background: COLORS.error,
          text: COLORS.onError,
        };
      case 'Aviso':
        return {
          background: COLORS.info,
          text: COLORS.onInfo,
        };
      default:
        return {
          background: COLORS.primary,
          text: COLORS.onPrimary,
        };
    }
  };
  
  // Função para adicionar opacidade a cores hex
  export const addOpacity = (hexColor: string, opacity: number): string => {
    const hex = hexColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };