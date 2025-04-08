import { ICONO_STAR_GREEN, ICONO_VOLVER } from '@/assets/iconos';
import { IMAGE_BACKGROUND } from '@/assets/images';
import Rating from '@/components/molecules/rating';
import { useAppDispatch } from '@/hooks/redux';
import { setAlertValue } from '@/redux/slices/alert-slice';
import { RED, WHITE } from '@/styles/colors';
import { scaleModerate, scaleVertical } from '@/styles/mixins';
import { estilos } from '@/styles/tema_general';
import { F1_14_400_21, F1_15_400_22, F1_19_600_28 } from '@/styles/typography';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';

const { width: viewportWidth } = Dimensions.get('window');

export const OpinionScreen = () => {
    const [visible, setVisible] = useState(false);
    const [alert, setAlert] = useState(false);
    const [messageAlert, setMessageAlert] = useState('');
    const [experience, setExperience] = useState(0);
    const [store, setStore] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useAppDispatch();

    const handleSetExperience = (experience: number) => setExperience(experience);
    const handleSetStore = (store: number) => setStore(store);
    const handleOpinion = async () => {
        // await AsyncStorage.setItem('@opinion', 'true');
        dispatch(setAlertValue({title:'Tu opinión fue enviada con éxito', subTitle:'¡Nos vemos en la siguiente compra!'}))
        navigation.goBack();//navigation.navigate('Lista');
    };

    const navigation = useNavigation();
    const _cleanAlert = () => {
        setAlert(false);
        setMessageAlert('');
    };

    return (
        <>
            <AwesomeAlert
                show={alert}
                showProgress={false}
                title='Error'
                titleStyle={styles.titleStyle}
                message={messageAlert}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                onDismiss={() => _cleanAlert()}
                showConfirmButton={false}
            />

            <View style={{ alignItems: 'center', height: '100%' }}>
                <ImageBackground
                    source={IMAGE_BACKGROUND}
                    resizeMode='stretch'
                    style={estilos.backgroundimage}
                >
                    <View style={estilos.barra_superiod}>
                        <Text style={{
                            fontSize: 16,
                            flex: 1,
                            textAlign: 'center',
                            color: WHITE,
                            alignSelf: 'flex-end',
                            fontFamily: 'poppinsBold',
                            marginRight: 50,
                            marginBottom: 10
                        }}>Opinion</Text>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <Image style={{
                                height: 33,
                                width: 33, start: 3,
                                tintColor: WHITE,
                                alignContent: 'center',
                                alignSelf: 'center',
                            }} source={ICONO_VOLVER} />
                        </TouchableOpacity>

                    </View>
                    <View style={estilos.contenedorPantalla}>
                        <ScrollView>
                        <View style={{
                            flexDirection: 'column',
                            margin: 'auto',
                            alignSelf: 'center',
                            width: '85%',
                            paddingBottom:20,
                        }}>
                            <View style={{
                                alignItems: 'center',
                                marginBottom: -10
                            }}>
                                <Image style={{ width: 130, height: 60 }} source={ICONO_STAR_GREEN} />
                            </View>
                            <Text style={styles.title}>¿Cómo puntuarías tu experiencia?</Text>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 10,
                                marginBottom: 10
                            }}>
                                <Rating size={25} rating={experience} setRating={handleSetExperience} />
                            </View>
                            <Text style={styles.title}>¿Cómo puntuarías a la tienda?</Text>
                            <View style={{
                                alignItems: 'center',
                                marginTop: 10,
                                marginBottom: 10
                            }}>
                                <Rating size={25} rating={store} setRating={handleSetStore} />
                            </View>


                            <Text style={styles.title}>¿Te gustaría dejarnos un comentario?</Text>
                            <Text style={styles.subTitle}>Tus observaciones nos ayudan a mejorar</Text>
                            <TextInput
                                style={styles.commentInput}
                                placeholder="Ingresa tu comentario..."
                                value={comment}
                                onChangeText={setComment}
                                multiline
                            />
                            <View style={{ width: '100%', marginHorizontal: 5, flexDirection: 'column-reverse', justifyContent: 'space-around', alignSelf: 'center' }}>
                                <TouchableOpacity style={{
                                    height: 38,
                                    paddingHorizontal: 20,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    backgroundColor: '#F7FFF2',
                                    borderWidth: 1,
                                    borderColor: '#5ED69C'
                                }}>
                                    <Text style={{
                                        fontFamily: 'poppinsSemiBold',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        color: '#5ED69C'
                                    }}>
                                        Cancelar
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    height: 38,
                                    paddingHorizontal: 20,
                                    paddingVertical: 6,
                                    borderRadius: 20,
                                    backgroundColor: '#5ED69C',
                                    marginBottom: 10
                                }} onPress={() => handleOpinion()}>
                                    <Text style={{
                                        fontFamily: 'poppinsSemiBold',
                                        fontSize: 16,
                                        textAlign: 'center',
                                        color: WHITE
                                    }}>
                                        Enviar
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </ScrollView>
                    </View>
                </ImageBackground>
            </View>
        </>
    );
};
const styles = StyleSheet.create({
    commentInput: {
        borderRadius: scaleModerate(15),
        padding: scaleModerate(20),
        height: scaleVertical(148),
        textAlignVertical: 'top',
        marginBottom: scaleVertical(40),
        backgroundColor: '#F1F1F1',
        ...F1_14_400_21,
        color:'#C4C4C4',
    },
    titleStyle: {
        color: RED,
        fontFamily: 'poppinsRegular',
    },
    title: {
        ...F1_19_600_28,
    },
    subTitle: {
        ...F1_15_400_22,
        marginBottom: scaleVertical(20),
    },
});