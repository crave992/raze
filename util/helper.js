import addressJSON from "../addressfield.min.json";

export function isoToString(iso) {
    let result = iso;
    addressJSON.options.map(option => {
        if (option.iso === iso) {
            result = option.label;
        }
    });
    return result;
}

export function priceFormatted(price, currency, isFree = null) {

    if(isFree) {
        return price;
    }
    return currency + ' ' + price;
}

export function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

export function formatDate(date) {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    let year = d.getFullYear();
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    return [year, month, day].join('-');
}

export function YouTubeGetID(url){
    let ID = '';
    url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if(url[2] !== undefined) {
        ID = url[2].split(/[^0-9a-z_\-]/i);
        ID = ID[0];
    }
    else {
        ID = url;
    }
    return ID;
}

