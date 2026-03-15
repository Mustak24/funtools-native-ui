import React from "react";
import * as icons from 'lucide-react-native';
import { LucideProps } from "lucide-react-native";
import { useThemeStore } from "@theme";
import { type ColorStates } from "@theme";


export type IconName = keyof typeof icons;

export type IconProps = LucideProps & {
  name: IconName,
  
  size?: number,
  color?: ColorStates,
  customColor?: string,
}

export function Icon({name, size=16, color='text', customColor, ...props}: IconProps){

  const colors = useThemeStore(states => customColor ?? states.colors[color])

  const LucideIcon = icons[name] as React.ComponentType<LucideProps>;

  return <LucideIcon {...props} color={colors} size={size} />;
}