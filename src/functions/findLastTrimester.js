/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
import getFinancialData from '../services/getFinancialData';

export default async function findLastTrimester() {
    const currentDate = new Date();
    const currentBilling = await getFinancialData();
    const trimesters = [1, 4, 7, 10];

    let getLastTrimester = currentDate.getMonth() + 1;

    if (getLastTrimester === 1) getLastTrimester += 10;

    const lastTrimester = trimesters.filter(trimester => trimester < getLastTrimester).slice(-1)[0];

    const arrayOfTrimesterMonths = [];

    for (let i = 0; i < 3; i += 1) {
        arrayOfTrimesterMonths.push(lastTrimester + i);
    }

    const lastTrimesterMonths = currentBilling.campaign_date.map((date) => {
        if (arrayOfTrimesterMonths.includes(Number(date.mes_referencia))) {
            return date.Valor
        }
    })

    const lastTrimesterBilling = lastTrimesterMonths.filter(Number).reduce((sum, number) => sum + number);

    return lastTrimesterBilling;
};