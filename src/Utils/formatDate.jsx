function formatDate(date) {
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getFullYear();
  
    const lastDigit = day % 10;
    const suffix =
      day > 10 && day < 20
        ? suffixes[0] // for 11th, 12th, 13th, etc.
        : suffixes[lastDigit] || suffixes[0]; // default to 'th' if no match
  
    return `${day}${suffix} ${month}, ${year}`;
  }
  function shortDate(date) {
    const suffixes = ["th", "st", "nd", "rd"];
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'short' });
  
    const lastDigit = day % 10;
    const suffix =
      day > 10 && day < 20
        ? suffixes[0] // for 11th, 12th, 13th, etc.
        : suffixes[lastDigit] || suffixes[0]; // default to 'th' if no match
  
    return `${month} ${day}${suffix} `;
  }
export {shortDate};  
export default formatDate;  