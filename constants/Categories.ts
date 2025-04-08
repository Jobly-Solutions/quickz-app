import {
    ICONO_BEBIDAS, ICONO_CONGELA, ICONO_ALMACEN,
    ICONO_CARNICE, ICONO_VERDURAS, ICONO_LACTEOS,
    ICONO_BODEGA, ICONO_LIMPIEZA, ICONO_SALUDABLE,
    ICONO_PANADERIA, ICONO_FARMACIA, ICONO_KIOSCO,
    ICONO_PERFUMERIA
} from '@/assets/iconos';
// INTERFACES
export interface Category {
    key: string;
    value: {
        key: string;
        value: string;
    }[];
    icon: any;
}
//BEBIDAS
//Aperitivo_y_fernet
export const APERITIVO_Y_FERNET = { key: "aperitivo_fernet", value: "Aperitivo y fernet" };
//Jugo_saborizado
export const JUGO_SABORIZADO = { key: "jugo_saborizado", value: "Jugo saborizado" };
//Aguas
export const AGUAS = { key: "aguas", value: "Aguas" };
//Cerveza
export const CERVEZA = { key: "cerveza", value: "Cerveza" };
//Bebidas_s/alc
export const BEBIDAS_S_ALC = { key: "bebidas_s_alc", value: "Bebidas s/alc" };
//Envase
export const ENVASE = { key: "envase", value: "Envase" };
//Vino_y_champaña
export const VINO_Y_CHAMPANA = { key: "vino_champan", value: "Vino y champaña" };
//Bebidas c/alc
export const BEBIDAS_C_ALC = { key: "bebidas_c_alcohol", value: "Bebidas c/alc" };
//Whisky_y_licor
export const WHISKY_Y_LICOR = { key: "wisky_licor", value: "Whisky y licor" };
//Sidra
export const SIDRA = { key: "sidra", value: "Sidra" };
//Gaseosa c/gas
export const GASEOSA_C_GAS = { key: "gaseosa_c_gas", value: "Gaseosa c/gas" };

export const BEBIDA_CATEGORY_LIST = [
    APERITIVO_Y_FERNET,
    JUGO_SABORIZADO,
    AGUAS,
    CERVEZA,
    BEBIDAS_S_ALC,
    ENVASE,
    VINO_Y_CHAMPANA,
    BEBIDAS_C_ALC,
    WHISKY_Y_LICOR,
    SIDRA,
    GASEOSA_C_GAS
]
// CONGELADOS
// Categorias de congelados
export const CONGELADO_CATEGORY_LIST = [
]
//ALMACEN
//Mermelada Gelatina
export const MERMELADA_GELATINA = { key: "mermelada_gelatina", value: "Mermelada y Gelatina" };
//Pastas
export const PASTAS = { key: "pastas", value: "Pastas" };
//Fideo_arroz
export const FIDEO_ARROZ = { key: "fideos_arroz", value: "Fideos y Arroz" };
//Condimentos
export const CONDIMENTOS = { key: "condimentos", value: "Condimentos" };
//Harina_azúcar
export const HARINA_AZUCAR = { key: "harina_azucar", value: "Harina y azúcar" };
//Aderezo y tomate_salsa
export const ADEREZO_Y_TOMATE_SALSA = { key: "aderezo_tomate_salsa", value: "Aderezo y tomate salsa" };
//Galletitas
export const GALLETITAS = { key: "galletitas", value: "Galletitas" };
//Yerba_y_café
export const YERBA_Y_CAFE = { key: "yerba_cafe", value: "Yerba y café" };
//Aceite y vinagre
export const ACEITE_Y_VINAGRE = { key: "aceite_vinagre", value: "Aceite y vinagre" };
//Conserva
export const CONSERVA = { key: "conserva", value: "Conserva" };
//Fiambrería
export const FIAMBRERIA = { key: "fiambreria", value: "Fiambrería" };
//List
export const ALMACEN_CATEGORY_LIST = [
    MERMELADA_GELATINA,
    PASTAS,
    FIDEO_ARROZ,
    CONDIMENTOS,
    HARINA_AZUCAR,
    ADEREZO_Y_TOMATE_SALSA,
    GALLETITAS,
    YERBA_Y_CAFE,
    ACEITE_Y_VINAGRE,
    CONSERVA,
    FIAMBRERIA
]
// CARNICERIA
// Categorias de carniceria
export const CARNICERIA_CATEGORY_LIST = [
]
// VERDULERIA
// Categorias de verduleria
export const VERDULERIA_CATEGORY_LIST = [
]
// LACTEOS
// Categorias de lacteos
export const LACTEOS_CATEGORY_LIST = [
]
// BODEGA
// Categorias de bodega
export const BODEGA_CATEGORY_LIST = [
]
// LIMPIEZA
// Categorias de limpieza
export const LIMPIEZA_CATEGORY_LIST = [
]
// SALUDABLE
// Categorias de saludable
export const SALUDABLE_CATEGORY_LIST = [
]
//FARMACIA
//Insecticidas
export const INSECTICIDAS = { key: "insecticidas", value: "Insecticidas" };
// Categorias de farmacia
export const FARMACIA_CATEGORY_LIST = [
    INSECTICIDAS
]
// PANADERIA
// Pan_casero
export const PAN_CASERO = { key: "pan_casero", value: "Pan casero" };
// Categorias de panaderia
export const PANADERIA_CATEGORY_LIST = [
    PAN_CASERO
]
// KIOSCO
export const VARIOS = { key: "varios", value: "Varios" };
// Categorias de kiosco
export const KIOSCO_CATEGORY_LIST = [
    VARIOS
]
// PERFUMERIA
// Categorias de perfumeria
export const PERFUMERIA_CATEGORY_LIST = [
]
// CATEGORIAS
// KEYS
export const BEBIDA_CATEGORY_KEY = 'Bebidas';
export const CONGELADO_CATEGORY_KEY = 'Congelados';
export const ALMACEN_CATEGORY_KEY = 'Almacén';
export const CARNICERIA_CATEGORY_KEY = 'Carniceria';
export const VERDULERIA_CATEGORY_KEY = 'Verduleria';
export const LACTEOS_CATEGORY_KEY = 'Lacteos';
export const BODEGA_CATEGORY_KEY = 'Bodega';
export const LIMPIEZA_CATEGORY_KEY = 'Limpieza';
export const SALUDABLE_CATEGORY_KEY = 'Saludable';
export const PANADERIA_CATEGORY_KEY = 'Panaderia';
export const FARMACIA_CATEGORY_KEY = 'Farmacia';
export const KIOSCO_CATEGORY_KEY = 'Kiosco';
export const PERFUMERIA_CATEGORY_KEY = 'Perfumeria';
// VALUES
export const CATEGORY_LIST: Category[] = [
    { key: BEBIDA_CATEGORY_KEY, value: BEBIDA_CATEGORY_LIST, icon: ICONO_BEBIDAS },
    { key: CONGELADO_CATEGORY_KEY, value: CONGELADO_CATEGORY_LIST, icon: ICONO_CONGELA },
    { key: ALMACEN_CATEGORY_KEY, value: ALMACEN_CATEGORY_LIST, icon: ICONO_ALMACEN },
    { key: CARNICERIA_CATEGORY_KEY, value: CARNICERIA_CATEGORY_LIST, icon: ICONO_CARNICE },
    { key: VERDULERIA_CATEGORY_KEY, value: VERDULERIA_CATEGORY_LIST, icon: ICONO_VERDURAS },
    { key: LACTEOS_CATEGORY_KEY, value: LACTEOS_CATEGORY_LIST, icon: ICONO_LACTEOS },
    { key: BODEGA_CATEGORY_KEY, value: BODEGA_CATEGORY_LIST, icon: ICONO_BODEGA },
    { key: LIMPIEZA_CATEGORY_KEY, value: LIMPIEZA_CATEGORY_LIST, icon: ICONO_LIMPIEZA },
    { key: SALUDABLE_CATEGORY_KEY, value: SALUDABLE_CATEGORY_LIST, icon: ICONO_SALUDABLE },
    { key: PANADERIA_CATEGORY_KEY, value: PANADERIA_CATEGORY_LIST, icon: ICONO_PANADERIA },
    { key: FARMACIA_CATEGORY_KEY, value: FARMACIA_CATEGORY_LIST, icon: ICONO_FARMACIA },
    { key: KIOSCO_CATEGORY_KEY, value: KIOSCO_CATEGORY_LIST, icon: ICONO_KIOSCO },
    { key: PERFUMERIA_CATEGORY_KEY, value: PERFUMERIA_CATEGORY_LIST, icon: ICONO_PERFUMERIA },
];
// METODOS
// Buscar categoria por subcategoria
export const findCategoryBySubcategoryKey = (key: string): Category => {
    let category = {} as Category;
    CATEGORY_LIST.forEach((_category) => {
        if (_category.value.find((subCategory) => subCategory.key === key)) category = _category;
    });
    return category;
}
//Buscar categoria por key
export const findCategoryByKey = (value: string) => CATEGORY_LIST.find(item => item.key == value);
