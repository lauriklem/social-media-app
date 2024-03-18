export const formatDate = (dbDate) => {
    const yearMonthDay = dbDate.split('T')[0];
    const [year, month, day] = yearMonthDay.split('-');
    return `${month}/${day}/${year}`
}