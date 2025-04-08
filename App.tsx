import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { LogBox } from 'react-native';

import useCachedResources from '@/hooks/useCachedResources';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { Provider as PeperProvider } from 'react-native-paper';

LogBox.ignoreLogs(['Setting a timer for a long period of time,']);
LogBox.ignoreAllLogs();

const App = () => {
    const {isLoadingComplete, store} = useCachedResources();
    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <PeperProvider>
                <Provider store={store}>
                    <SafeAreaProvider>
                        <Navigation />
                    </SafeAreaProvider>
                    <StatusBar style='light' />
                </Provider>
            </PeperProvider>
        );
    }
};
export default App;
