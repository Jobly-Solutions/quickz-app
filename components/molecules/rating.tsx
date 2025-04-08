import { scaleHorizontal } from '@/styles/mixins';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { ICONO_ESTRELLA } from '@/assets/iconos';
import { GRIS_CLARO, WARNING } from '@/styles/colors';

export default function Rating({size, rating, setRating}) {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const name = i <= rating ? WARNING : GRIS_CLARO;
      const star = (
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image style={{
                height: size,
                width: size,
                tintColor: name,
                resizeMode: 'contain',
            }} source={ICONO_ESTRELLA} />
        </TouchableOpacity>
      );
      stars.push(star);
    }

    return (
      <View style={{ flexDirection: 'row', gap: scaleHorizontal(10) }}>
        {stars}
      </View>
    );
}