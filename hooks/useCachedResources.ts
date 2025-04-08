import { Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { initializeStore } from '@/redux/store';

export default function useCachedResources() {
    const [isLoadingComplete, setLoadingComplete] = useState(false);
    const [store, setStore] = useState(null);

    // Load any resources or data that we need prior to rendering the app
    useEffect(() => {
        async function loadResourcesAndDataAsync() {
            try {
                SplashScreen.preventAutoHideAsync();
                // Load fonts
                await Font.loadAsync({
                    ...Ionicons.font,
                    'poppins': require('@/assets/fonts/Poppins-Regular.ttf'),
                    'poppinsBlack': require('@/assets/fonts/Poppins-Black.ttf'),
                    'poppinsBold': require('@/assets/fonts/Poppins-Bold.ttf'),
                    'poppinsExtraLight': require('@/assets/fonts/Poppins-ExtraLight.ttf'),
                    'poppinsLight': require('@/assets/fonts/Poppins-Light.ttf'),
                    'poppinsMedium': require('@/assets/fonts/Poppins-Medium.ttf'),
                    'poppinsLightItallic': require('@/assets/fonts/Poppins-LightItalic.ttf'),
                    'poppinsRegular': require('@/assets/fonts/Poppins-Regular.ttf'),
                    'poppinsSemiBold': require('@/assets/fonts/Poppins-SemiBold.ttf'),
                    'poppinsSemiBoldItallic': require('@/assets/fonts/Poppins-SemiBoldItalic.ttf'),
                    'poppinsThin': require('@/assets/fonts/Poppins-Thin.ttf'),
                });
                // Load data
                const initializedStore = await initializeStore();
                setStore(initializedStore);
            } catch (e) {
                // We might want to provide this error information to an error reporting service
                console.warn(e);
            } finally {
                setLoadingComplete(true);
                SplashScreen.hideAsync();
            }
        }

        loadResourcesAndDataAsync();
    }, []);

    return { isLoadingComplete, store };
}
