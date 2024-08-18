import React, { ReactNode } from 'react';

import { SafeAreaView } from 'react-native-safe-area-context';

import { appLayoutStyles } from '@/components/AppLayout/AppLayout.styles';

interface IAppLayout {
  children: ReactNode;
}

export const AppLayout = ({ children }: IAppLayout) => {
  return (
    <SafeAreaView style={appLayoutStyles.appLayout}>{children}</SafeAreaView>
  );
};
