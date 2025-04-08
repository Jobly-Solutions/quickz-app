import { watchUserChanges, watchUserDocument } from '@/firebase-js/watchers';
import { addUser } from '@/redux/slices/auth-slice';
import { addUserData } from '@/redux/slices/user-slice';
import { SplashScreen } from '@/screens/splash';
import { RootStackParamList, Store, UserInformation } from '@/types';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppStack from './app-navigator';
import AuthStack from './auth-navigator';

const Navigation = () => {
    return (
        <NavigationContainer theme={DefaultTheme}>
            <RootNavigator />
        </NavigationContainer>
    );
}

const Stack = createStackNavigator<RootStackParamList>();
const RootNavigator = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        watchUserChanges((user) => {
            if (user)
                watchUserDocument(user.uid, (doc) => {
                    if (doc.exists) {
                        // @ts-ignore
                        const userDoc =
                            doc.data() as UserInformation;
                        dispatch(addUserData(userDoc));
                    }
                });
            dispatch(addUser(user));
        });
    }, []);
    const authIsLoading = useSelector(
        (state: Store) => state.auth.authIsReady
    );
    const user = useSelector((state: Store) => state.auth.user);
    // return <LabScreen />;
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: false,
            }}
        >
            {authIsLoading && (
                <Stack.Screen
                    name='Splash'
                    component={SplashScreen}
                />
            )}

            {!authIsLoading && user && (
                <Stack.Screen name='App' component={AppStack} />
            )}

            {!authIsLoading && !user && (
                <Stack.Screen name='Auth' component={AuthStack} />
            )}
        </Stack.Navigator>
    );
};
export default Navigation;
