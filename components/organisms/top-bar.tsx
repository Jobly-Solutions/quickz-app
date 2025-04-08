import { ICONO_SUPPORT, ICONO_VOLVER } from '@/assets/iconos';
import { WHITE } from '@/styles/colors';
import { estilos } from '@/styles/tema_general';
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface TopBarProps {
  title: string;
  help?: boolean;
  style?: any;
};

export const TopBar: React.FC<TopBarProps> = ({ title, help, style }) => {
  let styles = TopBarStyles;
  if (style) styles = { ...styles, ...style };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} >
          <Image style={styles.image} source={ICONO_VOLVER} />
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>{title}</Text>

      <View style={styles.imageContainer}>
        {help &&
          <TouchableOpacity onPress={() => navigation.navigate('SoporteGeneral')}>
            <Image style={styles.image} source={ICONO_SUPPORT} />
          </TouchableOpacity>
        }
      </View>

    </View>
  );
}

const TopBarStyles = StyleSheet.create({
  container: { 
    //...estilos.barra_superiod 
    minHeight: 50,
    marginTop: 45,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
    gap: 10,
  },
  imageContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: { ...estilos.iconosSuperior },
  text: {
    width: '60%',
    fontFamily: 'poppinsBold',
    fontSize: 23,
    color: WHITE,
    textAlign: 'center',
  },
});