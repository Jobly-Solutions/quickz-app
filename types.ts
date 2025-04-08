import { LocationObject } from 'expo-location';
import { User, firestore } from 'firebase';
import { ColorSchemeName } from 'react-native';
import { LatLng } from 'react-native-maps';
export type RootStackParamList = {
    Auth: undefined;
    App: undefined;
    Splash: undefined;
};
export type LogedStackParamList = {
    App: undefined;
    Tienda: undefined;
};

export type AuthStackParamList = {
    Start: undefined;
    Register: undefined;
    SoporteGeneralB: undefined;
    CodigoTel: undefined;
};
export type CuponStackParamList = {
    Lista: undefined;
    Agregar: undefined;
};
export type PedidosStackParamList = {
    Lista: undefined;
    Cancelar: undefined;
    Revisar: undefined;
};
export type DatosStackParamList = {
    Datos: undefined;
    Editar: undefined;
    Notifica: undefined;
    Queja: undefined;
    Terminos: undefined;
    Politicas: undefined;
    AgregarTurno: undefined;
    ListaProductos: undefined;
    EditarProductos: undefined;
    AgregarCupon: undefined;
    EditarCupon: undefined;
    AgregarBanner: undefined;
    EditarBanner: undefined;
    EditarTienda: undefined;
    Personal: undefined;
};
export type TiendasStackParamList = {
    TiendaReg: undefined;
    VincularTienda: undefined;
    CrearTienda: undefined;
    CodigoTien: undefined;
    MapaTiendaRegistro: undefined;
};
export type TiendaIdValidatorReturn = {
    isValid: Boolean;
    message?: string; // If it is invalid, this says why
};
export type HomeStackParamList = {
    MapaIntro: undefined;
    Domicilio: undefined;
    Home: undefined;
    Tienda: undefined;
    MatchHandler: undefined;
    ConfirmDataAddress: undefined;
    DataAddress: undefined;
    TipoBarrio: undefined;
    BarrioPrivado: undefined;
    Addresses: undefined;
    Editar: undefined;
};
export type CarroStackParamList = {
    Lista: undefined;
    Pregunta: undefined;
    MedioDePago: undefined;
};
export type AppStackParamList = {
    Home: undefined;
    SoporteGeneral: undefined;
    WebBrowser: undefined;
    Splash: undefined;
    Cupones: undefined;
    Pedidos: undefined;
    MisDatos: undefined;
    MiCarro: undefined;
    ListaMensajes: undefined;
    ValoracionesHome: undefined;
    VerMensajes: undefined;
    ValoracionesLista: undefined;
    ValoracionesDatos: undefined;
    VerListaOrden: undefined;
    MapaTienda: undefined;
    MapaTiendaRegistro: undefined;

};
export type NavigationProps = {
    colorScheme: ColorSchemeName;
};
export type BottomTabParamList = {
    TabOne: undefined;
    TabTwo: undefined;
};
export type TextFieldParamList = {
    valueError?: string;
    value: string;
    setValueError?: Function;
    setValue: (text: string) => void;
    topText: string;
    placeholder: string;
    icon: { name: any };
    validation?: 'email' | 'password' | 'phone' | 'code';
    secureTextEntry?: boolean;
    autoCompleteType?: 'email' | 'password' | 'name' | 'phone' | 'code';
};
export type TextRegisterFieldParamList = {
    valueError?: string;
    value: string;
    setValueError?: Function;
    setValue: (text: string) => void;
    topText: string;
    placeholder: string;
    icon: { name: any };
    visible: boolean,
    validation?: 'email' | 'password' | 'phone' | 'code';
    secureTextEntry: boolean;
    autoCompleteType?: 'email' | 'password' | 'name' | 'phone' | 'code';
}; export type TextRegisterMontoParamList = {
    value: string;
    setValue: (text: string) => void;
    topText: string;
    placeholder: string;
    icon: { name: any };
    visible: boolean,
};
export type TextSencilloParamList = {
    value: string;
    setValue: (text: string) => void;
    topText: string;
    placeholder: string;
    icon: { name: any };
    visible: boolean,
};
export type TextCuponParamList = {
    value: string;
    setValue: (text: string) => void;
    placeholder: string;
    icon: { name: any };
};
export type SearchFieldParamList = {
    value: string;
    setValue: (text: string) => void;
    placeholder: string;
    pressed: () => void;
    style?: any;
};


export type TextFieldFormikParamList = {
    valueError?: string;
    value: string;
    maxLength?: number;
    onChangeText: (text: string) => void;
    topText?: string;
    placeholder: string;
    icon?: { name: any; size: number; color: string };
    secureTextEntry?: true;
    autoCompleteType?: 'email' | 'password' | 'name' | 'phone' | 'code';
    keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad'
    | 'visible-password'
    | 'ascii-capable'
    | 'numbers-and-punctuation'
    | 'url'
    | 'name-phone-pad'
    | 'twitter'
    | 'web-search';
};
export type HeaderParamList = {
    navigation: any;
    title: string;
    isBackButton?: boolean;
    disable?: boolean;
};
export type FirebaseUser = User;

export type Store = {
    auth: AuthParams;
    user_data: UserInformation;
    shop_id: IdStatus;
};
export type IdStatus = {
    active: boolean;
    shop_id: string;
};
export type AuthParams = {
    authIsReady: Boolean;
    user: FirebaseUser | null;
};
export type register_post = {
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_phone: string;
    user_password: string;
    repeat_password: string;
};
export type ChangeUserInfoValues = {
    name: string;
    email: string;
    phone?: string;
    password: string;
};
export type ChangeUserInfoErrors = {
    name?: string;
    email?: string;
    phone?: string;
    password?: string;
};
export type SignUpErrors = {
    user_firstname?: string;
    user_lastname?: string;
    user_email?: string;
    user_password?: string;
    repeat_password?: string;
};
export type UpdateUserInfomationParams = {
    user_firstname?: string;
    user_lastname?: string;
    user_email?: string;
    user_phone?: string;
    user_password?: string;
    repeat_password?: string;
};
export type FriendIdValidatorReturn = {
    isValid: Boolean;
    message?: string; // If it is invalid, this says why
};
export type FirestoreDoc = firestore.DocumentData | undefined;
export type CarRegisterValues = {
    mark: string;
    model: string;
    color: string;
    matricu: string;
};
export type CarRegisterErrors = {
    mark?: string;
    model?: string;
    color?: string;
    matricu?: string;
};

export type ParkOptionParams = {
    postEnd: number;
    compliance: number;
    distance: number;
    onSelect: (setLoading: (state: boolean) => void) => void;
};
export type ParkOptionCheckableParams = {
    postEnd: number;
    compliance: number;
    distance: number;
    checked: boolean;
    onPressed: () => void;
};
export type UserLocation = LocationObject;
export type UserDataActions = {
    type: 'user-data/reset' | 'user-data/add';
    payload: UserInformation;
};

export type UserInformation = {
    user_uid: string;
    user_email: string;
    user_firstname: string;
    user_lastname: string;
    user_phone: string;
    user_password: string;
    user_listaa?: listaIdTienda;
    user_listab?: listaIdTienda;
    user_image: string;
    user_lat: number;
    user_long: number;
    user_address: string;
    user_notify: boolean;
};
export type listaIdTienda = {
    shop_id: string;
};
export type listaIdEmpleado = {
    user_uid: string;
};
export type TiendasUser = {
    status: string;
    shop_name: string;
    shop_address: string;
    shop_provincia: string;
    shop_img: string;
    shop_id: string;
};
export type TiendasBanner = {
    banner_id: string,
    banner_name: string,
    banner_img: string,
    banner_url: string,
};
export type TiendasTurnos = {
    turno_id: string,
    turno_creado: string,
    turno_name: string,
    turno_hora_inicio: string,
    turno_hora_final: string,
    turno_activo: boolean,
    turno_lun: boolean,
    turno_mar: boolean,
    turno_mie: boolean,
    turno_jue: boolean,
    turno_vie: boolean,
    turno_sab: boolean,
    turno_dom: boolean,
};
export type TiendasCupon = {
    coupon_id: string,
    coupon_code: string,
    coupon_description: string,
    coupon_img: string,
    coupon_amount: string,
    coupon_quantity: number,
    coupon_expires_at: number,
    coupon_created_at: string
};
export type TiendaMensaje = {
    mensaje_id: string,
    mensaje_imagen: string,
    mensaje_nombre: string,
    mensaje_fecha: string,
    mensaje_ultimo: string,
};
export type TiendaMensajito = {
    mensaje_id: string,
    mensaje_nombre: string,
    mensaje_fecha: string,
    mensaje_ultimo: string,
};
export type TiendasMulti = {
    order_store: string,
    order_id: string,
    order_total: string,
    order_owner: string,
    order_code: string,
    order_address: string,
    order_created_at: string,
    order_finished_at: string,
    order_status: string,
    order_feedback: string,
    order_products_json: string,
    order_emp_name: string,
    order_emp_id: string,
    order_paytipe: number,
    order_shipping: boolean
};
export type TiendasOnLine = {
    employe_id: string,
    employe_name: string,
    employe_active: boolean,
};
export type OrdenProductos = {
    product_id: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_unit: string,
    product_price: number,
    product_stock: number,
    product_category: string,
};
export type TiendasPersonal = {
    status: string,
    user_mail: string,
    user_name: string,
    user_uid: string,
    user_active: string,
};
export type TiendaProductOrden = {
    product_id: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_total: string,
    product_cuant: string,
    product_status: boolean,
};
export type TiendasProducto = {
    shop_id: string,
    product_id: string,
    product_code: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_unit: string,
    product_unit_value: number,
    product_price: number,
    product_stock: number,
    product_category_top: string,
    product_category: string,
    product_rated: number
    product_active: boolean,
    product_isdisc: boolean,
    product_disc: number,
    product_cuant: number,
};
export type TiendasProductoCheck = {
    product_id: string,
    product_sku: string,
    product_name: string,
    product_details: string,
    product_unit: string,
    product_unit_value: number,
    product_price: number,
    product_checked: boolean,
    product_cuant: number,
};

export type ShopInformation = {
    shop_active?:boolean,
    shop_address: string,
    shop_cuit: number,
    shop_envio: boolean,
    shop_envio_precio: number,
    shop_id: string,
    shop_img: string,
    shop_lat: number,
    shop_localidad: string, 
    shop_long: number, 
    shop_name: string,
    shop_owner: string,
    shop_owner_name: string,
    shop_owner_Dni: string,
    shop_owner_contact: string,
    shop_owner_address: string,
    shop_pago: boolean,
    shop_pago_precio: number,
    shop_phone: string,
    shop_pre_env?: number,
    shop_pre_pag?: number,    
    shop_provincia: string,
    shop_rated: number,  
    shop_payment?: ShopPayment,
};

export type TicketInformation = {
    order_id: string,
    order_id_ticket: string,
    order_total: number,
    order_owner: string,
    order_code: string,
    order_address: string,
    order_created_at: string,
    order_finished_at: string,
    order_day: number,
    order_month: number,
    order_year: number,
    order_hour: number,
    order_complete: boolean,
    order_emp_name: string,
    order_emp_id: string,
};
export type EmployeInformation = {
    shop_id: string,
    shop_name: string,
    shop_img: string,
    shop_address: string,
    user_role: string,
    user_email: string,
    user_firstname: string,
    user_lastname: string,
    user_phone: string,
    user_password: string,
};

export type Coupon = {
    coupon_id: string,
    coupon_code: string,
    coupon_description: string,
    coupon_img: string,
    coupon_amount: number,
    coupon_quantity: number,
    coupon_expires_at: string,
    coupon_created_at: string,
};

export interface Order { 
    order_id: string,
    order_code: string,
    order_total: number,
    order_owner: string,
    order_ownerid: string,
    order_paytipe: number,
    order_address: string,
    order_created_at: string,
    order_finished_at: string,
    order_status: string,
    order_feedback: string,
    order_products_json: [], 
    order_emp_name: string, 
    order_emp_id: string, 
    discount: number,
    order_service: number,
    order_shipping: boolean,
    order_delivery: number,
    order_delivery_note: string,
    order_delivery_time: string,

};

export type ShopPayment = {
    cash: boolean,
    mp: boolean,
    card: boolean
};

export type SubscriptionStackParamList = {
    active: undefined;
    inactive: undefined;
    failed: undefined;
};
export type ParkingFinderInformation = {
    location: {
        latitude: number;
        longitude: number;
    };
    mode: 'find';
    search_by_distance: {
        area: number;
        distance: number;
        whenarrive: number;
    };
    compliance: number;
};
export type SaveParkInformation = {
    location: {
        latitude: number;
        longitude: number;
    };
    mode: 'quit';

    plan: 'discount';
    data: {
        whenarrive: number;
    };
};

export type UserState =
    | 'parking'
    | 'none'
    | 'searching'
    | 'matched-park'
    | 'matched-search';

export type MakeContactWithParkOwnerResult = {
    error: boolean;
    code?: MakeContactWithParkOwnerErrorCodes;
};
type MakeContactWithParkOwnerErrorCodes =
    | 'parking_doc_dont_exist'
    | 'current_user_propuest_doc_dont_exist'
    | 'matching_user_error'
    | 'error_deleting_proposals'
    | 'error_getting_proposals'
    | 'error_getting_random_id';

export type GetNearParksReturn = {
    error: boolean;
    code?: 'get_documents_error';
    nearParks?: Array<NearParkObject>;
    numberOfNearParks?: number;
};
export type NearParkObject = {
    distance: number;
    parkOwnerUid: string;
    postEnd: number;
    compliance: number;
    contacted: boolean;
};
export type CardFormValues = {
    exp_date: string;
    card_number: string;
    cvc: string;
};
export type CardFormErrors = {
    exp_date?: string;
    card_number?: string;
    cvc?: string;
};

//a
export type ParkOwnerPairedStatus =
    | 'MARCH_INIT' // cuando hay un emparejamiento (hasArrive: false, ArrivalAccepted: false y el interesed tenga tiempo)
    | 'ACCEPT_PARKING' // si el hasArrive cambia a true (ArrivalAccepted: false)
    | 'TIMER' // cuando ArrivalAccepted este en true y hasArrive en true
    | 'PARK_OWNER_NC' // cuando termina el tiempo y el hasArrive es true
    | 'INTERESED_NC'; // cuando el usuario interesed termina su tiempo
export type ParkOwnerMatchData = {
    status: ParkOwnerPairedStatus;
    pair_data: UserVitalData;
    location: LatLng;
    postEnd: number;
    pairUid?: string;
    intereseds: [] | Array<InteresedToParkObject>;
};
export type ArrivalStates =
    | 'INITIAL'
    | 'ARRIVAL_ACCEPTED'
    | 'PARK_OWNER_NC';

export type InteresedMatchData = {
    parkings_available: [] | Array<InteresedToPair>;
    location: LatLng;
    parkOwnerData?: {
        location: LatLng;
        postEnd: number;
        uid: string;
    };
    searching_area: number;
    postEnd: number;
    timeEnd: boolean;
    arrival_state: ArrivalStates;
    hasArrived: boolean;
    pairCancelMatch: boolean;
};

export type MatchStatus = {
    active: boolean;
    role: MatchRoles;
    state: 'paired' | 'not-paired';
    pair_uid?: string;
};
export type IdStatus = {
    active: boolean;
    shop_id: string; 
};

export type MatchState = {
    status: MatchStatus;
    role_data: {
        interesed: InteresedMatchData;
        park_owner: ParkOwnerMatchData;
    };
};

// SPS mean Select Park Screen
export type SPSNearParkObject = {
    distance: number;
    parkOwnerUid: string;
    postEnd: number;
    compliance: number;
    checked: boolean;
    id: number;
    contacted: boolean;
};

export type FailTime = {
    fail: boolean;
    anio: string;
    mes: string;
    dia: string;
    hora: string;
    minuto: string;
};

export type InteresedToPair = {
    uid: string;
    status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
    information: UserVitalData;
};
export type UserVitalData = {
    compliance: number;
    postEnd: number;
    location: LatLng;
    uid: string;
};
export type InteresedToParkObject = {
    uid: string;
    status: 'AVAILABLE' | 'CONTACTED';
    info: UserVitalData;
};
// FSIS mean for select interesed screen
export type InteresedObjectFSIS = InteresedToParkObject & {
    id: number;
    checked: boolean;
};
export type ParkingOfDB = {
    compliance: number;
    geohash: string;
    intereseds: [] | Array<InteresedToParkObject>;
    lat: number;
    lng: number;
    paired: boolean;
    postEnd: number;
    interesedData?: {
        postEnd: number;
        uid: string;
        compliance: number;
        location: LatLng;
    };
    interesedHasArrived: boolean;
    interesedCancelMatch: boolean;
    arrivalAccepted: boolean;
};
export type InteresedDocOfDB = {
    area: number;
    compliance: number;
    distance: number;
    geohash: string;
    lat: number;
    lng: number;
    parkOwnerData?: {
        postEnd: number;
        uid: string;
        location: LatLng;
    };
    arrivalAccepted: boolean;
    hasArrived: boolean;
    pairCancelMatch: boolean;
    paired: boolean;
    parkings_available: InteresedToPair[];
    postEnd: number;
};
export type MatchRoles = 'interesed' | 'park_owner';
export type DatabaseMatchDocs = {
    interesed_doc: InteresedDocOfDB;
    park_doc: ParkingOfDB;
};

export type ReduxAction = {
    type: any;
    payload: any;
};
export type AcceptParkInteresedScreenResult = {
    accepted: boolean;
    interesedId: string;
};
export type DocSnapshot =
    firestore.DocumentSnapshot<firestore.DocumentData>;

export type BalanceDATA = {
    balances: BalanceTypesIn<number>;
    expired_dates: BalanceTypesIn<number>;
};

export type BalanceTypesIn<T> = {
    paid: T;
    collaborate: T;
    promotional: T;
};
