import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import PagerView from 'react-native-pager-view';
import { IMAGE_BANNER_LAS_MARIAS_1, IMAGE_BANNER_LAS_MARIAS_2 } from '@/assets/images/banners';
import { estilos } from '@/styles/tema_general';
import { TiendasBanner } from '@/types';

interface BannerProps {
    banners: Array<TiendasBanner>;
    viewportWidth: number;
}

export default function Banner({ banners, viewportWidth }: BannerProps) {
    const pagerRef = useRef<PagerView>(null);
    const [currentPage, setCurrentPage] = useState(0);

    if (!(banners.length > 0)) {
        banners = [
            {
                banner_id: '1',
                banner_name: 'IMAGE_BANNER_LAS_MARIAS_1',
                banner_img: IMAGE_BANNER_LAS_MARIAS_1,
                banner_url: '',
            },
            {
                banner_id: '2',
                banner_name: 'IMAGE_BANNER_LAS_MARIAS_2',
                banner_img: IMAGE_BANNER_LAS_MARIAS_2,
                banner_url: '',
            },
        ];
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentPage((prevPage) => {
                const nextPage = (prevPage + 1) % banners.length;
                pagerRef.current?.setPage(nextPage);
                return nextPage;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, [banners.length]);

    return (<>
        <View style={styles.SectionStyle}>
            <PagerView
                ref={pagerRef}
                style={styles.imageSlider}
                initialPage={0}
                onPageSelected={(e) => setCurrentPage(e.nativeEvent.position)}
            >
                {banners.map((item) => {
                    const source = item.banner_url ? { uri: item.banner_url } : item.banner_img;
                    return (
                        <View key={item?.banner_id} style={styles.imageSlider}>
                            <Image source={source} style={styles.imageSlider} />
                        </View>
                    );
                })}
            </PagerView>
        </View>
    </>)
}

const styles = StyleSheet.create({
    SectionStyle: {
        marginHorizontal: 10,
        marginBottom: 10,
    },
    imageSlider: {
        height: 150,
        width: '100%',
        borderRadius: 8,
        // borderWidth: 1,
        resizeMode: 'stretch',
    },
    sliderContentContainer: {
        alignItems: 'center',
        alignSelf: 'stretch',
        marginBottom: 10,
    },
    paginationContainer: {
        paddingVertical: 0,
        height: 10,
    },
    paginationDot: {
        ...estilos.paginationDot,
        width: 20,
        height: 5,
        borderRadius: 100,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});
