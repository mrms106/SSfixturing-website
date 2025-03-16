const formatNumber = (num) => {
    if (!num) return "0";

    let numStr = num.toString();
    let parts = numStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? "." + parts[1] : "";

    let formattedInt = "";
    let count = 0;

    for (let i = integerPart.length - 1; i >= 0; i--) {
        formattedInt = integerPart[i] + formattedInt;
        count++;

        if (count === 3 && i > 0) {
            formattedInt = "," + formattedInt;
        } else if (count > 3 && (count - 3) % 2 === 0 && i > 0) {
            formattedInt = "," + formattedInt;
        }
    }

    return formattedInt + decimalPart;
};
export default formatNumber;
