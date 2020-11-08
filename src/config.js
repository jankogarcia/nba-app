import moment from 'moment';
const CURRENT_YEAR = (new Date()).getFullYear()
const URL = 'http://localhost:3003/'
const YT_URL = 'https://www.youtube.com/embed/'


const formatDate = (date) => {
    return moment(date).format(" DD-MM-YYYY");
}

export {
    CURRENT_YEAR,
    URL,
    YT_URL,
    formatDate
}