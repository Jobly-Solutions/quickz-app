import { NEGRO, WHITE } from '@/styles/colors';
import { Text, TouchableOpacity, View } from 'react-native';
import { Modal } from '@/components/molecules/modal';

interface ConfirmProps {
    isVisible: boolean;
    title: string;
    body: string;
    onAccept: () => void;
    onCancel: () => void;
    style?: any;
}

const ACEPTAR = 'Aceptar';
const CANCELAR = 'Cancelar';

export const Confirm: React.FC<ConfirmProps> = ({ isVisible, title, body, onAccept, onCancel, style }) => {

    return (
        <Modal isVisible={isVisible}>
            <Modal.Container>
                <Modal.HeaderCarrito title={title} onPress={onCancel} />
                <Modal.Body>
                    <Text style={{
                        fontSize: 17,
                        textAlign: 'center',
                        width: '100%',
                        color: NEGRO,
                        height: 'auto',
                        fontFamily: 'poppinsRegular',
                        alignSelf: 'flex-start',
                        alignContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: 20,
                        justifyContent: 'center',
                        includeFontPadding: false,
                        textAlignVertical: 'bottom',
                    }}>
                        {body}
                    </Text>
                </Modal.Body>
                <Modal.Footer>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', marginTop: 2, }}>
                        <View style={{ width: '85%', marginHorizontal: 5, flexDirection: 'row', justifyContent: 'space-around', alignSelf: 'center', gap:30 }}>
                            <TouchableOpacity style={{
                                height: 40,
                                paddingHorizontal: 30,
                                paddingVertical: 8,
                                borderRadius: 20,
                                backgroundColor: WHITE,
                                borderWidth: 1,
                                borderColor: '#5ED69C'
                            }} onPress={onAccept}>
                                <Text style={{
                                    fontFamily: 'poppinsSemiBold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    color: '#5ED69C'
                                }}>
                                    {ACEPTAR}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                height: 40,
                                paddingHorizontal: 30,
                                paddingVertical: 8,
                                borderRadius: 20,
                                backgroundColor: '#5ED69C',
                            }} onPress={onCancel}>
                                <Text style={{
                                    fontFamily: 'poppinsSemiBold',
                                    fontSize: 15,
                                    textAlign: 'center',
                                    color: WHITE
                                }}>
                                    {CANCELAR}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal.Footer>
            </Modal.Container>
        </Modal>
    );
}