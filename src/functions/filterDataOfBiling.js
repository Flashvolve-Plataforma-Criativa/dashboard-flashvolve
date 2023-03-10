import getFinancialData from '../services/getFinancialData';

export default async function findDataOfBilling() {
    const billingPerProductData = await getFinancialData();
    const productNames = billingPerProductData.campaign_date.map((item) => item.produto);
    //
    const filterByProductNames = productNames.filter((item, index) => productNames.indexOf(item) === index).sort();
    const dates = billingPerProductData.campaign_date.map((item) => item.mes_ano_referencia);
    //
    const filterByDates = dates.filter((item, index) => dates.indexOf(item) === index).sort()
        .map((item) => `${item.split('/')[0]}/01/${item.split('/')[1]}`);

    const sortedData = {};

    filterByProductNames.forEach((procuct, idx) => {
        const productIdx = billingPerProductData.campaign_date.filter((item) => item.produto === procuct)
            .sort((a, b) => (a.created_at > b.created_at) ? 1 : ((b.created_at > a.created_at) ? -1 : 0));
        sortedData[filterByProductNames[idx]] = productIdx;
    })

    const valuesOfBilling = Object.values(sortedData);
    const monthlyBillings = [];
    valuesOfBilling.forEach((_, idx) => monthlyBillings.push(valuesOfBilling[idx].map((item) => item.valor)));

    return {
        monthlyBillings,
        filterByDates,
        filterByProductNames
    };
};
