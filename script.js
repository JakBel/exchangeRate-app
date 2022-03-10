const qs = (e) => document.querySelector(e);

const currencyOne = qs("#currency-one");
const amountOne = qs(".amount-one");
const currencyTwo = qs("#currency-two");
const amountTwo = qs(".amount-two");
const swapBtn = qs(".swap");
const rateInfo = qs(".rate-info");

//function
const calculate = () => {
    fetch(
        `https://api.exchangerate.host/latest?base=${currencyOne.value}&symbols=${currencyTwo.value}`
    )
        .then((res) => res.json())
        .then((data) => {
            const currency1 = currencyOne.value;
            const currency2 = currencyTwo.value;

            const rate = data.rates[currency2];
            rateInfo.textContent = `1 ${currency1} = ${rate.toFixed(
                4
            )}${currency2}`;

            amountTwo.value = (amountOne.value * rate).toFixed(2);
        });
};

const swap = () => {
    const oldValue = currencyOne.value;
    currencyOne.value = currencyTwo.value;
    currencyTwo.value = oldValue;
    calculate();
};

//addEventListener
currencyOne.addEventListener("change", calculate);
currencyTwo.addEventListener("change", calculate);
amountOne.addEventListener("input", calculate);
swapBtn.addEventListener("click", swap);

calculate();
