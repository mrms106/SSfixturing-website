const numberToWords = (number) => {
    const ones = [
      "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
      "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen",
    ];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  
    const convertToWords = (num) => {
      if (num < 20) return ones[num];
      if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ` ${ones[num % 10]}` : "");
      if (num < 1000) return ones[Math.floor(num / 100)] + " Hundred" + (num % 100 ? ` and ${convertToWords(num % 100)}` : "");
      if (num < 100000) return convertToWords(Math.floor(num / 1000)) + " Thousand" + (num % 1000 ? `, ${convertToWords(num % 1000)}` : "");
      if (num < 10000000) return convertToWords(Math.floor(num / 100000)) + " Lakh" + (num % 100000 ? `, ${convertToWords(num % 100000)}` : "");
      return convertToWords(Math.floor(num / 10000000)) + " Crore" + (num % 10000000 ? `, ${convertToWords(num % 10000000)}` : "");
    };
  
    const [integerPart, decimalPart] = number.toFixed(2).split(".");
    const words = convertToWords(Number(integerPart));
    const paiseWords = decimalPart === "00" ? "" : ` and ${convertToWords(Number(decimalPart))} Paise`;
    return `${words} Rupees${paiseWords} only.`;
  };
  export default numberToWords;