import { TiendasMulti } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, LayoutAnimation, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity, UIManager, View } from 'react-native';
import { ICONO_CHECK, ICONO_SALIR } from '@/assets/iconos';
import { IMAGEN_CONSULTA } from '@/assets/images';
import { GRIS_OSCURO, NEGRO, VERDE_CLARO, WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { Modal } from '../molecules/modal';
import { ModalIcono } from '../molecules/modal-icono';


const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const data = [
  {
    order_id: "1",
    order_code: "13123",
    order_address: "qweqwe",
    order_created_at: "113",
    order_finished_at: "232",
    order_status: "entregado",
    order_feedback: "adadadasdas",
    order_products_json: "naaa"
  }
];

export default function AdapterPedidosRealizados(props:{pedidos:Array<TiendasMulti>, handleOpinar: () => void},{route}) {//(pedidos: Array<TiendasMulti>) {
  const { pedidos, handleOpinar } = props;
  const [persons, setPersons] = React.useState(data);
  const [visible, setVisible] = useState(false);
  const [consulta, setConsulta] = useState(false);
  const handleConsulta = () => { setConsulta(() => !consulta); setVisible(false)}
  const [handleOpinion, sethandleOpinion] = useState(false);
  const handleAlerta = () => sethandleOpinion(() => !handleOpinion);
  const navigation = useNavigation();
  const myItemSeparator = () => {
    return <View style={{ height: 1, backgroundColor: "grey", marginHorizontal: 60 }} />;
  };

  const myListEmpty = () => {
    return (
      <View style={{ alignItems: "center" }}>
        <Text style={{
          color: GRIS_OSCURO,
          fontFamily: 'poppinsLight',
          fontSize: 20,
          marginHorizontal: 4,
          letterSpacing: 0,
          marginVertical: 10,
          textAlignVertical: 'center',
          width: 'auto',
          height: 'auto', fontWeight: '200'
        }}>No Realizaste ningun pedido</Text>
      </View>
    );
  };
  const myItem = () => {
    return (
      <View style={{ alignItems: "center" }}>

      </View>
    );
  };
  
  function handleOnPressed(): void {
    navigation.navigate('Opinion');
  }

  useEffect(() => {
    const opinionEnviada = async() => {
      const opinion = await AsyncStorage.getItem('@opinion');
      if (opinion === 'true') {
        sethandleOpinion(true);
        await AsyncStorage.removeItem('@opinion');
      }
    }
    opinionEnviada();
  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <FlatList
        horizontal={false}
        data={pedidos}
        contentContainerStyle={{ alignContent: 'flex-start', }}
        numColumns={1}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          <View style={{
            flex: 1,
            backgroundColor: WHITE,
            marginVertical: 10,
            marginHorizontal: 15,
            borderRadius: 13,
            elevation: 6,
            flexDirection: 'row',
          }}>

            <View style={{
              flex: 1,
              flexDirection: 'column',
            }}>
              <View style={{
                marginTop: 20,
                marginHorizontal: 20,
                flexDirection: 'row',
              }}>


                <View style={{
                  flex: 1,
                  flexDirection: 'column',
                }}>

                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                  }}>
                    <View style={{
                      alignItems: 'flex-end', justifyContent: 'flex-end'
                    }}>
                      <Text style={{
                        fontSize: 22,
                        width: 'auto',
                        height: '100%',
                        alignSelf: 'center',
                        alignContent: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: 5,
                        includeFontPadding: false,
                        textAlignVertical: 'bottom',
                        fontFamily: 'poppinsSemiBold',
                      }}>
                        {'Pedido realizado'}
                      </Text>
                    </View>
                    <TouchableOpacity style={{
                      flex: 1,
                      alignItems: 'flex-end', justifyContent: 'flex-end'
                    }} onPress={() => handleConsulta()}>

                      <Image style={{
                        width: 38, height: 38,
                        alignSelf: 'flex-end',
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                        marginHorizontal: 10,
                        resizeMode: 'center',
                      }}
                        source={IMAGEN_CONSULTA} />
                    </TouchableOpacity>
                    {/* <View style={{
                      alignItems: 'flex-end', justifyContent: 'flex-end'
                    }}>
                      <Image style={{
                        width: 32, height: 32,
                        alignSelf: 'flex-end',
                        alignContent: 'flex-end',
                        alignItems: 'flex-end',
                        tintColor: GRIS_OSCURO,
                        resizeMode: 'center',
                      }}
                        source={ICONO_SUPPORT} />
                    </View > */}

                  </View>

                  <Text style={{
                    color: NEGRO,
                    fontFamily: 'poppinsRegular',
                    fontSize: 18,
                    marginVertical: 8,
                    alignItems: 'center', alignContent: 'center',
                    padding: 0,
                    width: 'auto', fontWeight: '600',
                    letterSpacing: 0,
                    height: 'auto',
                  }}>
                    {item.order_address}
                  </Text>
                  <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-between'
                  }}>

                    <Text style={{
                      fontSize: 15,
                      textAlign: 'left',
                      width: 'auto',
                      height: 'auto',
                      alignSelf: 'flex-start',
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      includeFontPadding: false,
                      textAlignVertical: 'bottom',
                    }}>
                      Realizado: {item.order_created_at}
                    </Text>
                    {/* <Text style={{
                      fontSize: 15,
                      textAlign: 'left',
                      width: 'auto',
                      height: 'auto',
                      alignSelf: 'flex-start',
                      fontWeight: 'bold',
                      marginHorizontal: 10,
                      alignContent: 'center',
                      alignItems: 'center',
                      justifyContent: 'center',
                      includeFontPadding: false,
                      textAlignVertical: 'bottom',
                    }}>
                      { }
                    </Text> */}
                    <TouchableOpacity onPress={()=> navigation.navigate('Detalle', {order: item})}>
                      <Text style={{
                        fontSize: 13,
                        textAlign: 'right',
                        width: 'auto',
                        flex: 1,
                        height: 'auto',
                        alignSelf: 'flex-end',
                        fontFamily: 'poppinsRegular',
                        alignContent: 'center',
                        alignItems: 'center',
                        textDecorationLine: 'underline',
                        justifyContent: 'center',
                        includeFontPadding: false,
                      }}>
                        {'Ver detalle'}
                      </Text>
                    </TouchableOpacity>
                  </View>


                  <View style={estilos.contenedorVerticalRow}>

                  </View>

                  <View style={{
                    marginVertical: 15,
                    flexDirection: 'row', flex: 1
                  }}>
                    <TouchableOpacity onPress={() => navigation.navigate('Opinion')}
                      style={{
                        height: 'auto',
                        width: '100%',
                        borderRadius: 40,
                        padding: 2,
                        marginHorizontal: 15,
                        alignContent: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        flex: 1,
                        backgroundColor: VERDE_CLARO
                      }}>
                        <Text style={{
                          color: WHITE,
                          fontFamily: 'poppinsRegular',
                          height: 'auto',
                          padding: 2,
                          marginHorizontal: 10,
                          marginVertical: 5,
                          fontSize: 13,
                          alignContent: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          flex: 1,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          includeFontPadding: false,
                          width: 'auto',
                        }}>
                          {'Opinar'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {false}}
                        style={{
                          height: 'auto',
                          width: '100%',
                          borderRadius: 40,
                          padding: 2,
                          marginHorizontal: 15,
                          alignContent: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          flex: 1,
                          backgroundColor: VERDE_CLARO
                        }}>
                        <Text style={{
                          color: WHITE,
                          fontFamily: 'poppinsRegular',
                          height: 'auto',
                          padding: 2,
                          marginHorizontal: 10,
                          marginVertical: 5,
                          fontSize: 13,
                          alignContent: 'center',
                          justifyContent: 'center',
                          alignSelf: 'center',
                          flex: 1,
                          textAlign: 'center',
                          textAlignVertical: 'center',
                          includeFontPadding: false,
                          width: 'auto',
                        }}>
                          {'Repetir'}
                        </Text>
                    </TouchableOpacity>

                  </View>
                </View>
              </View>
            </View>



          </View>
        }
        ListEmptyComponent={myListEmpty}
      />
      <Modal isVisible={consulta}>
                        <Modal.Container>
                            <Modal.HeaderCarrito title="Consulta" onPress={() => handleConsulta()} />
                            <Modal.Body>
                                <Text style={{
                                    fontSize: 15,
                                    textAlign: 'center',
                                    width: '100%',
                                    color: NEGRO,
                                    height: 'auto',
                                    fontFamily: 'poppinsMedium',
                                    alignSelf: 'flex-start',
                                    alignContent: 'center',
                                    alignItems: 'center',
                                    paddingHorizontal: 20,
                                    justifyContent: 'center',
                                    includeFontPadding: false,
                                    textAlignVertical: 'bottom',
                                }}>
                                    ¿Necesitas hablar con un representante de la tienda?
                                </Text>
                                

                            </Modal.Body>
                            <Modal.Footer>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>

                                    <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center' }}>
                                       <TouchableOpacity style={{
                                        height: 35,
                                        paddingHorizontal: 23,
                                        paddingVertical: 6,
                                        borderRadius: 20,
                                        backgroundColor: WHITE,
                                        borderWidth: 1,
                                        borderColor: '#5ED69C'
                                       }} onPress={() => {}}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 14,
                                                textAlign: 'center',
                                                color: '#5ED69C'
                                            }}>
                                                Aceptar
                                            </Text>
                                       </TouchableOpacity>
                                       <TouchableOpacity style={{
                                        height: 35,
                                        paddingHorizontal: 20,
                                        paddingVertical: 6,
                                        borderRadius: 20,
                                        backgroundColor: '#5ED69C',
                                       }} onPress={() => handleConsulta()}>
                                            <Text style={{
                                                fontFamily: 'poppinsSemiBold',
                                                fontSize: 14,
                                                textAlign: 'center',
                                                color: WHITE
                                            }}>
                                                Cancelar
                                            </Text>
                                       </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal.Footer>
                        </Modal.Container>
                    </Modal>
                    <ModalIcono isVisible={handleOpinion}>
                        <ModalIcono.Container>
                            <ModalIcono.Header cosas={
                                <Image
                                    style={{
                                        height: 15,
                                        resizeMode: 'contain',

                                        width: 15
                                    }}
                                    source={ICONO_CHECK}
                                />
                            } />
                            <ModalIcono.Body>
                                <Text style={{
                                    fontSize: 13, width: '100%', height: 'auto',
                                    color: '#07AA00',
                                    fontWeight: 'bold'
                                }}>
                                    {'Tu opinión fue enviada con éxito'}
                                </Text>

                                <Text style={{
                                    fontSize: 12, width: '100%', height: 'auto',
                                    color: NEGRO,
                                }}>
                                    {'¡Nos vemos en la siguiente compra!'}
                                </Text>

                            </ModalIcono.Body>
                            <ModalIcono.Footer>
                                <TouchableOpacity style={{
                                    width: 'auto', height: 'auto', flexDirection: 'row', justifyContent: 'center'
                                }}
                                    onPress={() => { handleAlerta() }}>
                                    <Image style={{
                                        height: 35,
                                        width: 35,
                                        tintColor: NEGRO,
                                        alignContent: 'center',
                                        alignSelf: 'center',
                                    }} source={ICONO_SALIR} />
                                </TouchableOpacity>

                            </ModalIcono.Footer>
                        </ModalIcono.Container>
                    </ModalIcono>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, display: 'flex', width: '100%',
    height: '100%', alignContent: 'center', justifyContent: 'center'
  },
});
