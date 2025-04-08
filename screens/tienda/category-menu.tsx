import { CATEGORY_LIST } from '@/constants/Categories';
import React from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

export default function CategoryMenu({ navigation, delivery }) {
    return (
        <View style={{ width: '100%', height: 85, flexDirection: 'row' }}>
            <ScrollView style={{ flexDirection: 'row', height: 80, marginLeft: 5 }} showsHorizontalScrollIndicator={false} horizontal={true}>                
                {
                    CATEGORY_LIST.map((category) =>
                        <TouchableOpacity key={category.key} style={{ paddingHorizontal: 3 }} onPress={() => { navigation.navigate('Categoria', { category: category.key, delivery }) }}>
                            <Image style={styles.categorias} source={category.icon} />
                        </TouchableOpacity>
                        )
                }
            </ScrollView>
        </View>
    );
}
const styles = StyleSheet.create({
    form: { margin: 20, flex: 1 },
    categorias: {
        width: 70,
        height: 70
    },
});
