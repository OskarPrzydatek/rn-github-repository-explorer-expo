import React, { ReactNode } from 'react';
import { appLayoutStyles } from './AppLayout.styles';
import { SafeAreaView } from 'react-native-safe-area-context';

interface IAppLayout {
  children: ReactNode;
}

export const AppLayout = ({ children }: IAppLayout) => {
  return (
    <SafeAreaView style={appLayoutStyles.appLayout}>{children}</SafeAreaView>
  );
};
