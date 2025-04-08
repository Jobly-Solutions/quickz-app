import { Header } from '@/components/atoms/header';
import { useIsMounted } from '@/hooks/useIsMounted';
import { Store } from '@/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
    BackHandler,
    Dimensions,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { LatLng } from 'react-native-maps';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
   
  
const { width: viewportWidth, height: viewportHeight } =
Dimensions.get('window');

type latlong = { latitude: number; longitude: number };

export const WebTest = () => {
    type Coordinates = {
        loading: boolean;
        location: LatLng;
    };
    
    const userLocation = useRef<Coordinates>({
        loading: true,
        location: { longitude: 0, latitude: 0 },
    }); 
    const positionWatcherAdded = useRef(false);
    const userArrivedExec = useRef(false);
    const [screenIsLoading, setScreenLoading] = useState<boolean>(false);
    const nav = useNavigation();
    const uid = useSelector((state: Store) => state.auth.user?.uid);
    if (!uid) throw new Error('no hay informacion del usuario');
    const isMounted = useIsMounted();
    const [location, setLocation] = useState<latlong>();
    const route: any = useRoute();   
    const [refreshing, setRefreshing] = React.useState(false);
    const [start, setStart] = useState('');

    const webViewRef = useRef(); 

  
    let data = route.params.data;
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); 
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
 
useEffect(() => { 
    (async () => { 
        setStart(data.web);
    })();
    

},[]);
    
useEffect(() => {
    // el userLocation y el parkLocation y settealo al estado
    // actualizar screenLoading a false;
    // detectar cuando el usuario este a 10m del destino y si es asi teminar la navegacion
    (async () => {
        try {
            if (isMounted) { 
                
            setLocation(data.location);

                setScreenLoading(false);
            }
        } catch (err) {
            if (err === 'doc_dont_exists') return;
            console.error(err);
        }
    })();

}, []);


const params = `travelmode=walking&zoom=3&layer=traffic&destination=${data.location.latitude},${data.location.longitude}`;
const directionsg = `https://www.google.com/maps/dir/?api=1&${params}`;

const backAction = () => { 
    webViewRef.current.goBack();
    return true;
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  
    return (
        <View style={{ flex: 1 }}> 
    <StatusBar barStyle='light-content' />
    <Header title={'¿Dónde esta mi vehiculo?'} navigation={nav} isBackButton/>
    <ScrollView style={styles.container}
    refreshControl={
        <RefreshControl
          refreshing={false}
          onRefresh={onRefresh} // exl in function : this.yourWebview.reload();
        />
    }>
        <View style={styles.containerfull}>
            <WebView   
            style={{
width: '100%',
height: viewportHeight - 70,
}}
            
            ref= {webViewRef}
            automaticallyAdjustContentInsets={false}
            startInLoadingState={true} 
            source={{ uri: start }} 
            allowsBackForwardNavigationGestures 
              onShouldStartLoadWithRequest={(request) => {
                // Only allow navigating within this website
                return request.url.startsWith( start );
              }}
            renderLoading={() => (
            <View style={styles.containerfull}>
                <Text style={styles.titleStyle}>
                    CARGAMDO
                </Text>
            </View>
            )}
            />
        </View>
    </ScrollView>
</View> 
)};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    IconImageBack: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        paddingLeft: 10,
    },
    containerfull: { 
        flex: 1,
    },
    firstTitle: {
        fontSize: 26,
        marginBottom: 10,
    },
    SectionStyle: {
        flex: 4,
        marginTop: 0,
    },
    viewFull: {
        alignItems: 'center',
        flex: 1,
    },
    BackStyle: {
        zIndex: 0,
        position: 'absolute',
        color: '#6948F4',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        bottom: 20,
        right: 0,
        left: 0,
    },
    titleStyle: {
        color: 'black',
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 18,
    },
    textStyle: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'left',
        alignSelf: 'stretch',
    }, 
});
 

