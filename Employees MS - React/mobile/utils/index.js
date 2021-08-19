export function validateDate(dateString)
{
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    let parts = dateString.split("/");
    let day = parseInt(parts[1], 10);
    let month = parseInt(parts[0], 10);
    let year = parseInt(parts[2], 10);

    // Check the ranges of month and year
    if(year < 1000 || year > 3000 || month == 0 || month > 12)
        return false;

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years
    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
        monthLength[1] = 29;

    // Check the range of the day
    return day > 0 && day <= monthLength[month - 1];
};

export function convertDate(dateString)
{
    let parts = dateString.split("/");
    return parts[2]+"-"+parts[1]+"-"+parts[0];
}

export function validateEmail(email) 
{
    if(email)
    {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    else
        return false;
}

export function validatePositiveNumber(number)
{
    if(number)
    {
        let re =  /^[1-9]\d*$/g;
        return re.test(number);
    }
    else
        return false;
}