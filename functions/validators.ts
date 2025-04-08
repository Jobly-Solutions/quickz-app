import { CardFormErrors, CardFormValues, CarRegisterErrors, CarRegisterValues, ChangeUserInfoErrors, ChangeUserInfoValues, register_post, SignUpErrors } from '@/types';

export const signUpValidator = (
    values: register_post 
) => {
    const errors: SignUpErrors = {};
        // userName name validations
        if (!values.user_firstname) {
            errors.user_firstname = 'El nombre es requerido';
        } else if (values.user_firstname.length > 20) {
            errors.user_firstname =
                'El nombre no puede tener mas de 20 caracteres';
        }
        if (!values.user_lastname) {
            errors.user_lastname = 'El apellido es requerido';
        } else if (values.user_lastname.length > 20) {
            errors.user_lastname =
                'El nombre no puede tener mas de 20 caracteres';
        }
        // email validations 
        if (!values.user_email) {
            errors.user_email = 'Es necesario que añada un email';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                values.user_email
            )
        ) {
            errors.user_email = 'Porfavor escriba un correo valido.';
        }
        // password validations
        if (!values.user_password) {
            errors.user_password =
                'Es  necesario que añada una contraseña';
        } else if (values.user_password.length < 6) {
            errors.user_password =
                'Se require un minimo de seis caracteres.';
        } else if (values.user_password !== values.repeat_password) {
            errors.user_password = 'Las contraseñas no coinciden.';
        }
        // repeatPassword validations
        if (!values.repeat_password) {
            errors.repeat_password = 'Este campo es necesario';
        } else if (values.repeat_password !== values.user_password) {
            errors.repeat_password = 'Las contraseñas no coinciden.';
        } 
        return errors;
};

export const carRegisterValidator = (values: CarRegisterValues) => {
    const errors: CarRegisterErrors = {};
    if (!values.mark) {
        errors.mark = 'Este campo es necesario para continuar.';
    }
    if (!values.model) {
        errors.model = 'Este campo es necesario para continuar.';
    }
    if (!values.color) {
        errors.color = 'Este campo es necesario para continuar.';
    }
    if (!values.matricu) {
        errors.color = 'Este campo es necesario para continuar.';
    }
    return errors;
};
export const changesInUserInfoValidator = (
    values: ChangeUserInfoValues
) => {
    const errors: ChangeUserInfoErrors = {};
    // userName name validations
    if (!values.name) {
        errors.name = 'El nombre es requerido';
    } else if (values.name.length > 20) {
        errors.name =
            'El nombre no puede tener mas de 20 caracteres';
    }
    // email validations
    if (!values.email) {
        errors.email = 'Es necesario que añada un email';
    } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
            values.email
        )
    ) {
        errors.email = 'Porfavor escriba un correo valido.';
    }

    return errors;
};

export const cardFormValidator = (values: CardFormValues) => {
    const errors: CardFormErrors = {};
    // card_number validation
    if (!values.card_number) {
        errors.card_number = 'El numero de la tarjeta es requerido';
    }
    // exp_date validations
    if (!values.exp_date) {
        errors.exp_date = 'Campo necesario';
    } else if (values.exp_date.length < 5) {
        errors.exp_date = 'Mínimo 5 dígitos';
    }
    // cvc validations
    if (!values.cvc) {
        errors.cvc = 'Campo necesario';
    } else if (values.cvc.length < 3) {
        errors.cvc = 'Mínimo 3 caracteres';
    }
    // if (!values.name) {
    //     errors.name = 'Campo necesario';
    // } else if (values.name.length < 4) {
    //     errors.cvc = 'Mínimo 4 caracteres';
    // }
    return errors;
};
