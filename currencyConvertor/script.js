const fromAmountElement = document.querySelector("#amount");
const convertedAmountElement = document.querySelector("#convertedAmount");
const fromCurrencyElement = document.querySelector("#fromCurrency");
const toCurrencyElement = document.querySelector("#toCurrency");
const result = document.querySelector("#result");

const countries= [
  { code: "USD", name: "United States Dollar" },
  { code: "EUR", name: "Euro" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "CNY", name: "Chinese Yuan Renminbi" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "INR", name: "Indian Rupee" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "ZAR", name: "South African Rand" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "DKK", name: "Danish Krone" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "THB", name: "Thai Baht" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "COP", name: "Colombian Peso" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "RON", name: "Romanian Leu" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "BDT", name: "Bangladeshi Taka" }
];

countries.forEach((country)=>{
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value= country.code;
    option1.textContent =
      option2.textContent = ` ${country.code} (${country.name})`;
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2);
    //setting default values
    fromCurrencyElement.value = "USD";
    toCurrencyElement.value = "INR";
    
    
})

const getExchangeRate =async()=>{
    const amount = parseFloat(fromAmountElement.value);
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    // Fetching data from API

    const response =await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data =await response.json();
    console.log(data)
    const conversionRate = data.rates[toCurrency];
    const convertedAmount = amount * conversionRate;
    convertedAmountElement.value = convertedAmount.toFixed(2);

    result.innerHTML = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
    
    
}
fromAmountElement.addEventListener("input", getExchangeRate);
fromCurrencyElement.addEventListener("change", getExchangeRate);
toCurrencyElement.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);
