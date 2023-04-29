export const Payments = (checkInDate, checkOutDate, taxRate, matchingPackagePrice) => {

    if ((!checkInDate || !checkOutDate) || (checkInDate>checkOutDate)) {
        return {subtotal: 0, tax: 0, total: 0};
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const onlyCheckInDate = new Date(checkIn.getFullYear(), checkIn.getMonth(), checkIn.getDate());
    const onlyCheckOutDate = new Date(checkOut.getFullYear(), checkOut.getMonth(), checkOut.getDate());
    const diffInMs = Math.abs(onlyCheckInDate - onlyCheckOutDate); // difference in milliseconds
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    console.log(`dates:${diffInDays}`);
    const subtotal = diffInDays * matchingPackagePrice;
    const thousandSepSubtotal = subtotal.toLocaleString('en-US').replace(/,/g, ' ');
    console.log(`subtotal:${subtotal}`);
    const tax = (taxRate / 100) * subtotal;
    let thousandSepTax = tax.toLocaleString('en-US').replace(/,/g, ' ');
    const total = subtotal + tax;

    return {subtotal: thousandSepSubtotal, tax: thousandSepTax, total: total};
};