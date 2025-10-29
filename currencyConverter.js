import { LightningElement } from 'lwc';
import { countryCodeList } from 'c/countryCodeList'; //As it is service component need to call it like 'c/<ComponentName>'
import currencyConverterAssets from '@salesforce/resourceUrl/CurrencyConverterAssets';
export default class CurrencyConvertor extends LightningElement 
{
  countryList = countryCodeList;
  countryFrom = "USD";
  countryTo = "INR";
  currencyImage = currencyConverterAssets + '/currencyConverterAssets/currency.svg';
  amount;
  result;
  error;

  handleFromChange(event)
  {
    this.countryFrom = event.target.value;
    this.result = '';
    this.error = '';
  }

  handleToChange(event)
  {
    this.countryTo = event.target.value;
    this.result = '';
    this.error = ''; 
  }

  handleAmountChange(event)
  {
    this.amount = event.target.value;
    this.result = '';
    this.error = '';
  }

  submitHandler(event)
  {
    event.preventDefault() //to stop refresh while submitted
    this.convert()
  }

  async convert()
  {
    const API_KEY = '4d5a63accb41298e2e43e15a0043ee30';
    const API_URL = `https://api.exchangerate.host/convert?access_key=${API_KEY}&from=${this.countryFrom}&to=${this.countryTo}&amount=${this.amount}`;

    try
    {
      const data = await fetch(API_URL); //await means until the url is fetched the next line will not call
      const jsonData = await data.json(); //the data stored in the data variable will be converted into json format

      this.result = jsonData.result.toFixed(2);
      console.log(this.result);
    }
    catch(error)
    {
      console.log(error);
      this.result = null;
      this.error = "An error occurred....Please try again...";
    }

  }
}