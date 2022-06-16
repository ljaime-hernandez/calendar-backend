const moment = require('moment');

const isDate = ( value ) => {
    
    // all dates sent through the requests will have a first filter for date formatting, just in case
    // something changes on the page and this is no longer supported then we are going to send them through this
    // moment verification, if the value input is wrong then the code will return a false state leading to the proper
    // error handling for the developer to know what is happening
    
    if(!value){
        return false;
    }

    const date = moment(value);

    if(date.isValid()){
        return true;
    } else {
        return false;
    }
}

module.exports = {
    isDate
}