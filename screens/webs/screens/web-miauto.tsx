import { THEMES_IMAGE } from '@/assets/images';
import { Header } from '@/components/atoms/header';
import { Store } from '@/types';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import React, { useEffect, useRef } from 'react';
import {
    BackHandler,
    Dimensions,
    Image,
    RefreshControl,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import WebView from 'react-native-webview';
import { useSelector } from 'react-redux';

function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

export const WebMiAuto = () => {
    
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

    const route: any = useRoute();   
    let data = route.params.data;
    const nav = useNavigation();
    const uid = useSelector((state: Store) => state.auth.user?.uid);
    if (!uid) throw new Error('no hay informacion del usuario');
    const params = `travelmode=walking&zoom=3&layer=traffic&destination=${data.location.latitude},${data.location.longitude}`;
    const directionsg = `https://www.google.com/maps/dir/?api=1&${params}`;
    const webViewRef = useRef(); 
    const [refreshing, setRefreshing] = React.useState(false);

  
  const onRefresh = React.useCallback(() => {
    setRefreshing(true); 
    webViewRef.current.onRefresh();
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
            
  const backAction = () => { 
    webViewRef.current.goBack();  
    return true;
};

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);

  var HandleReset = (values, formProps) => {
    return window.confirm('Reset?'); // still resets after you Cancel :(
    };

    return (
        <View style={{ flex: 1 }}> 
    <StatusBar barStyle='light-content' />
    <Header title={'¿Dónde esta mi vehiculo?'} navigation={nav} isBackButton/>
    <View style={styles.container}> 

    <Formik 
    onSubmit={(values) => {
                 
                        
    }}
    validateOnChange={false}
    initialValues={{url: directionsg}}>
      {FormProps => {
        return (
            <View style={{flex:1}}>
          
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
                                               bounces={true} 
                                               ref= {webViewRef}
                                               automaticallyAdjustContentInsets={false}
                                               startInLoadingState={true} 
                                               source={{ uri: directionsg }} 
                                               allowsBackForwardNavigationGestures  
                                               onShouldStartLoadWithRequest={(request) => {
                                                   // Only allow navigating within this website
                                               return request.url.startsWith( directionsg ); 
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

                                       <TouchableOpacity style={{
                           backgroundColor:'#4BAAA7', 
                           width:55,                                                                                          
                           height:55,  
                           margin:10,  
                           bottom: 8,
                           end:8,
                           alignSelf:'baseline',
                           position: 'absolute',             
                           borderRadius:10,
                           elevation:4,  
                           }}
                           onPress={() => {
                            HandleReset.bind(null, FormProps.resetForm)
                           }}>
                       
                       <Image source={THEMES_IMAGE}
                           style={{
                               margin: 5,
                               width:45,                                                                                          
                               height:45,}}
                               />
                       
                       
                       </TouchableOpacity> 
                                       </View>
        );
      }}
    </Formik>

 
            </View> 

           
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
    titleStyle: {
        color: 'black',
        fontWeight: 'bold',
        padding: 8,
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 18,
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
    textStyle: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        textAlign: 'left',
        alignSelf: 'stretch',
    }, 
});
 

