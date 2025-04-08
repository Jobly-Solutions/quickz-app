import { BLACK, GREEN_1 } from '@/styles/colors';
import { F1_15_600_22 } from '@/styles/typography';
import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { CATEGORY_LIST } from '@/constants/Categories';
import productUtils from '@/utils/product-utils';
import AdapterVertical from './adapter-lista-vertical';

export default function ProductsByCategory({
    shopId,
    products,
    navigation,
    agregaralCarro,
    delivery,
}) {

    const { filterProductsBySubcategoryKey } = productUtils();
    const _products =
        CATEGORY_LIST.map((category) => {
            const productsByCategory = filterProductsBySubcategoryKey(
                products,
                category.key
            );
            return (
                productsByCategory?.length > 0 && (
                    <View key={category.key}>
                        <View style={styles.container}>
                            <Text style={styles.category}>
                                {category.key}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('Categoria', {
                                        category: category.key,
                                        delivery,
                                    });
                                }}
                            >
                                <Text style={styles.seeMore}>
                                    {'Ver más'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {AdapterVertical(
                            shopId,
                            productsByCategory,
                            (product, quantity, shopId) => {
                                agregaralCarro(product, quantity, shopId);
                            }
                        )}
                    </View>
                )
            );
        });
    return <>{_products}</>;
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    category: {
        flex: 1,
        fontFamily: 'poppinsBold',
        fontSize: 20,
        color: BLACK,
        marginLeft: 20,
    },
    seeMore: {
        ...F1_15_600_22,//F1_14_700_14,
        color: GREEN_1,
        marginRight: 20,
    },
});
