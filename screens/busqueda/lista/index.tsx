import { IMAGE_BANNER_A, IMAGE_BANNER_B, IMAGE_BANNER_C, IMAGE_BANNER_D } from '@/assets/images/banners';
import { Button } from '@/components/atoms/button';
import { INICIAR_SESION } from '@/styles/textos';
import { useNavigation } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useSelector } from 'react-redux';
import { ICONO_CARRO, ICONO_CUPON } from '@/assets/iconos';
import {
    IMAGE_BACKGROUND,
    IMAGEN_ERROR,
    IMAGEN_SUPER
} from '@/assets/images';
import AdapterVertical from '@/components/molecules/adapter-lista-vertical';
import SearchField from '@/components/molecules/campo-busqueda';
import { ModalIcono } from '@/components/molecules/modal-icono';
import { nameHandler } from '@/functions/string-utilities';
import { BLACK, GRIS_OSCURO, NEGRO, WATERCOLOR_TOP, WHITE } from '@/styles/colors';
import { FirebaseUser, Store } from '@/types';
import AdapterLista from '@/components/atoms/adapter-lista-horizontal';
import { VERDE_CLARO } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';

const { width: viewportWidth, height: viewportHeight } =
    Dimensions.get('window');
    
export const MenuBusquedaScreen = () => {
    const navigation = useNavigation();

    const user = useSelector((state: Store) => state.auth.user);
    const userData = useSelector((state: Store) => state.user_data);

    const [ishandleRecargar, setIshandleRecargar] = React.useState(false); 
    const [ishandleError, setIshandleError] = React.useState(false); 
    const [error, setError] = useState('');
    const [busquedas, setbusquedas] = useState(''); 
    const [ishandleWeb, setIshandleWeb] = React.useState(false); 
    const [paginaWeb, setPaginaWeb] = useState('');
    const handleWeb = () => setIshandleWeb(() => !ishandleWeb);
    const handleError = () => setIshandleError(() => !ishandleError);
    const handleRecargar = () => setIshandleRecargar(() => !ishandleRecargar);

    function wp(percentage: number) {
        const value = (percentage * viewportWidth) / 100;
        return Math.round(value);
    }
    
    const slideWidth = wp(100);
    const itemHorizontalMargin = wp(2);
    const sliderWidth = viewportWidth;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;
     
    const SLIDER_1_FIRST_ITEM = 0;
    
    const [images] = useState([
        IMAGE_BANNER_A,
        IMAGE_BANNER_B,
        IMAGE_BANNER_C,
        IMAGE_BANNER_D,
    ]);
    const [_activeSlide, _setActiveSlide] = useState(
        SLIDER_1_FIRST_ITEM
    );
    
    let _slider1Ref: any;
    const _renderSlider = ({ item }: any) => {
        return <Image source={item} style={estilos.imageSlider} />;
    };
      
    const greet = (_user: null | FirebaseUser) => {
        return ` Bienenid@ ${
            user
                ? nameHandler(
                      user.displayName ? user.displayName : ' '
                  )
                : ' '
        } `;
    };
    const _onPressLogin = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); 
         
    };
    return (
        <> 
        <View style={{alignItems: 'center',height:'100%'}}> 
            <ImageBackground
                source={IMAGE_BACKGROUND}
                resizeMode='stretch' 
                style={estilos.backgroundimage}>
<ScrollView
 style={{ 
    position: 'relative',
 }}>


<View style={estilos.barra_superiod}>    
                        <TouchableOpacity onPress={() =>navigation.navigate('MiCarro')}>
                                   <Image style={estilos.iconosSuperior} source={ICONO_CARRO} /> 
                                </TouchableOpacity>
                            
                                <Image style={{
        height:50,
        width:50,
        tintColor:WHITE,
        borderRadius:50,
        alignContent: 'center',
        alignSelf: 'center',}} source={IMAGEN_SUPER} /> 
                        </View>

                <View style={estilos.contenedorPantalla}>

                    <View style={{
                        flex:1,
                        width:'100%',
                        paddingHorizontal:5,
                        height:50,
                        flexDirection:'row', 
                    }}>
                        <TouchableOpacity 
                                    onPress={() =>navigation.navigate('Cupones')}>
                                   <Image style={{
                                        height:45,
                                        width:45,
                                        tintColor:VERDE_CLARO,
                                        marginLeft:10,
                                        resizeMode: 'contain',
                                    }} source={ICONO_CUPON} /> 
                                </TouchableOpacity>

                                <SearchField  
                                value={busquedas}  
                                setValue={setbusquedas}  
                                pressed={() =>navigation.navigate('Cupones')}
                            placeholder={'Buscar producto'}                            
                                /> 
                    </View>
                    
                    <View style={{ 
                        width:'100%', 
                        paddingBottom:90,
                        height:'100%', 
                    }}>
                    <View style={estilos.SectionStyle}>
                    <Carousel
                        ref={(c) => (_slider1Ref = c)}
                        data={images}
                        renderItem={_renderSlider} 
                        sliderWidth={viewportWidth }
                        itemWidth={viewportWidth-30}  
                        snapToAlignment={'center'} 
                        hasParallaxImages={false} 
                        firstItem={SLIDER_1_FIRST_ITEM}
                        inactiveSlideScale={0}
                        
                        inactiveSlideOpacity={0}
                        inactiveSlideShift={0}
                        contentContainerCustomStyle={
                            estilos.sliderContentContainer
                        } 
                        loop={false}
                        loopClonesPerSide={0}
                        autoplay={true}
                        autoplayDelay={4000}
                        autoplayInterval={3000}
                        layout={'default'}
                        onSnapToItem={(index) =>
                            _setActiveSlide(index)
                        }
                    />
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={_activeSlide}
                        containerStyle={estilos.paginationContainer}
                        dotColor={WHITE}
                        dotStyle={estilos.paginationDot}
                        inactiveDotColor={GRIS_OSCURO}
                        inactiveDotOpacity={1} 
                        inactiveDotScale={1.3} 
                        carouselRef={_slider1Ref}
                        tappableDots={!!_slider1Ref}
                    />
                </View> 
                <Text style={{ color: NEGRO, 
                    fontFamily:'poppinsSemiBold', 
                    fontSize: 16, 
                    height:'auto', 
                    marginHorizontal:15,
                    padding:0,
                    marginBottom:0,
                    includeFontPadding:false,
                    width:'auto',  
                    }}>
                        {'Tiendas'}
                    </Text>
                    <View style={{
                        flex:1 ,
                        height:170 ,
                        width:'100%', 
                    }}>    
                    
{AdapterLista()} 
                    </View>
                    <Text style={{ color: NEGRO, 
                    fontFamily:'poppinsSemiBold', 
                    fontSize: 16, 
                    height:'auto', 
                    marginHorizontal:15,
                    padding:0,
                    marginBottom:0,
                    includeFontPadding:false,
                    width:'auto',  
                    }}>
                        {'Destacados de Las Marias'}
                    </Text>
                    <View style={{ 
                        width:'100%',  
                        flex:1,
                        marginBottom:30,
                    }}>
                    {AdapterVertical()} 

                    </View>

                    
                  
                    
                    </View>
                    </View> 
</ScrollView>
 
                </ImageBackground>
               
            </View>
            
                                    
            
                                    <ModalIcono isVisible={ishandleError}>
                                    <ModalIcono.Container>
                                        <ModalIcono.Header cosas={
                                       <Image
                                       style={styles.tinyLogo}
                                       source={IMAGEN_ERROR}
                                      /> 
                                    } />
                                        <ModalIcono.Body>
                                        <Text style={styles.textSubtitle}>
                                        {error}
                                        </Text>
                                    
                                  

                                    </ModalIcono.Body>
                                        <ModalIcono.Footer> 
                                         
                                        <Button
                                    title={INICIAR_SESION}
                                    onPressed={() => _onPressLogin()}
                                />
                                            </ModalIcono.Footer>
                                        </ModalIcono.Container>
                                    </ModalIcono>

                                    <ModalIcono isVisible={ishandleRecargar}>
                                    <ModalIcono.Container>
                                        <ModalIcono.Header cosas={
                                       <Image
                                       style={styles.tinyLogo}
                                       source={IMAGEN_ERROR}
                                      /> 
                                    } />
                                        <ModalIcono.Body>
                                        <Text style={styles.textSubtitle}>
                                        {error}
                                        </Text>
                                    
                                  

                                    </ModalIcono.Body>
                                        <ModalIcono.Footer> 
                                         
                                                <Button
                                                    title={INICIAR_SESION}
                                                    onPressed={() => _onPressLogin()}
                                                />

                                                <Button
                                                    title={INICIAR_SESION}
                                                    onPressed={() => _onPressLogin()}
                                                />
                                            </ModalIcono.Footer>
                                        </ModalIcono.Container>
                                    </ModalIcono>
        </>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
     
    textWrapper: {
        height: '6%',
        marginTop: 3,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textTitle: {
        fontWeight: 'bold',
        fontSize: 30,
    },
    tinyLogo: { 
        marginTop:20,
        width: 70, 
        height: 70,
        resizeMode: 'contain',
    },
    textSubtitle: {
        textAlign: 'center',
        fontSize: 16,
    },

    header: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: WATERCOLOR_TOP,
    },
    headerTitle: {
        marginTop: 3,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    headerText: {
        fontWeight: 'bold', 
        fontSize: 25,
        color: '#fff',
    },
    icons: { 
        position: 'absolute',
        left: 15,
        top: 7,
    },
    
    donthaveacc: {
        fontSize: 15,
        fontFamily:'poppinsRegular',
    },
    registerNow: { 
        fontSize: 15,
        fontFamily:'poppinsRegular',
        textDecorationLine: 'underline',
    },
    losePassword: {
        color: BLACK, 
        fontSize:15,
        fontFamily:'poppinsRegular',
        textDecorationLine: 'underline',
        alignSelf: 'flex-end',
        marginBottom: 30,
        marginTop: 5,
    }, 
    aligncenter: {
        marginHorizontal:10,
        alignItems: 'center',
    }, 
});
