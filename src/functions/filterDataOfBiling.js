import getBillingPerProduct from '../services/GetBillingPerProduct';

export default async function findLastTrimester() {
    const billingPerProductData = await getBillingPerProduct();
    const productNames = billingPerProductData.map((item) => item.produto);
    //
    const filterByProductNames = productNames.filter((item, index) => productNames.indexOf(item) === index);
    const dates = billingPerProductData.map((item) => item.mes_ano_de_referencia);
    //
    const filterByDates = dates.filter((item, index) => dates.indexOf(item) === index).sort();

    console.log(filterByProductNames);
    console.log(filterByDates);
};