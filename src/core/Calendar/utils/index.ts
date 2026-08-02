export function getMonthDayGrid(year: number, month: number): Array<Array<number | null>> {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const grid: Array<Array<number | null>> = [];

    for(let i=0; i<6; i++) {
        const week: Array<number | null> = [];
        for(let j=0; j<7; j++) {
            const day = i * 7 + j - new Date(year, month, 1).getDay() + 1;
            if(day > 0 && day <= daysInMonth) {
                week.push(day);
            } else {
                week.push(null);
            }
        }
        grid.push(week);
    }

    return grid;
    
}