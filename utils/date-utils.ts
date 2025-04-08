export const MONTHS = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];

export const WEEK_DAYS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

export function getFirstDayOfMonth(month:number, year:number) {
    // Crear una nueva fecha con el primer día del mes
    const date = new Date(year, month - 1, 1);
    // Obtener el día de la semana como un número (0-6)
    return date.getDay();
  }
  
export function getDaysInMonth(month:number, year:number) {
    // Crear una nueva fecha con el último día del mes
    const date = new Date(year, month, 0);
    // Obtener el día del mes, que será el último día del mes
    return date.getDate();
  }
