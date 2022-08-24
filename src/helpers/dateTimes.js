
//Compara los dias entre 2 fechas
export const compareDate = (fechaInicial, fechaFinal) => {
    const creacion = new Date(fechaInicial);
    const caduca = new Date(fechaFinal);
    let numDays = (caduca - creacion) / 86400000;
    return Math.round(numDays);
}

export const dateFormatForSaveInDB = (date) => {
    
    const { day, month, year, hours, minutes } = divideDate(date);
    
    const dateFormat = new Date(year, month, day, hours, minutes);
    let isoString = dateFormat.toISOString(); 
    return isoString.toLocaleString()
}

//Comprueba que la fecha sea mayor a ahora
export const checkDate = (date) => {
    const today = new Date().getTime();

    date = new Date(date);

    if(Date.parse(date) && (date.getTime() > today)){
        return false
    }
    return true;
}




const divideDate = (date) => {
    date = new Date(date);
    
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    return {day, month, year, hours, minutes}
}