export const nameHandler = (displayName: string): string =>
    displayName.split(' ')[0].substring(0, 10); 
export const addGaps = (str: string, gapNo: number): string => {
    let newStr = ' ';
    let len = str.length;
    for (let i = 0; i < len; i++) {
        newStr = newStr + str[i];
        while (newStr.length % (gapNo + 1) === 0) {
            newStr = newStr + ' ';
        }
    }
    return newStr.trim();
};
export const removeSpaces = (str: string): string =>
    str.replace(/ /g, '');

export const removeSlashes = (str: string): string =>
    str.replace('/', '');

export const addSlash = (str: string, gapNo: number): string => {
    let newStr = '/';
    let len = str.length;
    for (let i = 0; i < len; i++) {
        newStr = newStr + str[i];
        while (newStr.length % (gapNo + 1) === 0) {
            newStr = newStr + '/';
        }
    }
    return newStr.trim();
};
