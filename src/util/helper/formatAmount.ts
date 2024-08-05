export default function formatAmount(value:string){
    if(!value) return "0.00";
    parseFloat(value).toFixed(2);
    // this.fundTransferRequest.amount = this.fundTransferRequest.amount.replace(/,/g, '');
    const parts  = value.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    value = parts.join(".")
    return value
}