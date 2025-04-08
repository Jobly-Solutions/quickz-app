export const removeAccents = (str:string) => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export const firstTwoLettersUpper = (str:string) => str.slice(0, 2).toUpperCase();