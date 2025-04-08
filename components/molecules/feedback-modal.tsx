import { GRIS_CLARO } from '@/styles/colors';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Modal } from './modal';
import Rating from './rating';

interface FeedbackProps {
    isVisible: boolean;
    handleCancel: () => void;
    handleSend: (rating: number, comment: string) => void;
}

export default function FeedbackModal({ isVisible, handleCancel, handleSend }: FeedbackProps) {
    const [rating, setRating] = useState(0);
    const [text, onChangeText] = useState('');
    const handleSetRating = (rating: number) => setRating(rating);
    const handleSendFeedback = () =>  handleSend(rating, text);

    useEffect(() => {
        onChangeText('');
        setRating(0);
    }, [handleSend, handleCancel]);

    return (
        <Modal isVisible={isVisible}>
            <Modal.Container>
                <Modal.HeaderCarrito title="Opina sobre tu último pedido." onPress={handleCancel} />
                <Modal.Body>
                    
                        <View style={{ alignItems: 'center', margin: 10 }}>
                            <Rating size ={25} rating={rating} setRating={handleSetRating} />
                        </View>
                    
                    <Text style={styles.text}>
                        Dejanos tu comentario
                    </Text>
                    <View style={styles.viewTextInput}>
                        <TextInput
                            editable
                            multiline
                            numberOfLines={8}
                            maxLength={150}
                            style={styles.textInput}
                            placeholder="Ingresa tu comentario..."
                            onChangeText={onChangeText}
                            value={text}
                        />
                    </View>
                </Modal.Body>
                <Modal.Footer>
                    <View style={styles.footer}>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
                                <Text style={styles.cancelButtonText}>
                                    Cancelar
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.sendButton} onPress={handleSendFeedback}>
                                <Text style={styles.sendButtonText}>
                                    Enviar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal.Footer>
            </Modal.Container>
        </Modal>
    );
};

const styles = {
    viewTextInput: {
        backgroundColor: GRIS_CLARO,
        borderRadius: 20,
        width: '95%',
        margin: 10
    },
    text: {
        fontSize: 17,
        // textAlign: 'center',
        width: '100%',
        color: 'black',
        height: 'auto',
        fontFamily: 'poppinsRegular',
        alignSelf: 'flex-start',
        // alignContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'center',
        includeFontPadding: false,
        textAlignVertical: 'bottom',
    },
    textInput: {
        padding: 10,
        textAlignVertical: 'top'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 2,
    },
    buttons: {
        width: '85%',
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
    },
    cancelButton: {
        height: 40,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#5ED69C',
    },
    cancelButtonText: {
        fontFamily: 'poppinsSemiBold',
        fontSize: 15,
        textAlign: 'center',
        color: '#5ED69C',
    },
    sendButton: {
        height: 40,
        paddingHorizontal: 30,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#5ED69C',
    },
    sendButtonText: {
        fontFamily: 'poppinsSemiBold',
        fontSize: 15,
        textAlign: 'center',
        color: 'white',
    },
};