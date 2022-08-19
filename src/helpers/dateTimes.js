
//Compara los dias entre 2 fechas
export const compareDate = (fechaInicial, fechaFinal) => {
    const creacion = new Date(fechaInicial);
    const caduca = new Date(fechaFinal);
    let numDays = (caduca - creacion) / 86400000;
    return Math.round(numDays);
}

export const dateFormat = (date) => {
    
    date = new Date(date);
    
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let hours = date.getHours();
    let minutes = date.getMinutes();

    const dateFormat = new Date(year, month, day, hours, minutes);
    let isoString = dateFormat.toISOString(); 
    return isoString.toLocaleString()
}