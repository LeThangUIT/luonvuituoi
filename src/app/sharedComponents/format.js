export const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
  });
export  const formatDate = (dateString) => {
    const newDate = new Date(dateString);
    const yyyy = newDate.getFullYear();
    let mm = newDate.getMonth() + 1; // Months start at 0!
    let dd = newDate.getDate();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const formatted = dd + "/" + mm + "/" + yyyy;
    return formatted;
  };