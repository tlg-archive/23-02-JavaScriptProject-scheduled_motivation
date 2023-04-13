function timeOfDay(){
    let today = new Date();
    let time = today.getHours();
    return (time < 11) ? 'morning' :
           (time < 16) ? 'afternoon' : 'evening';
}

function dayOfWeek() {
    let today = new Date();
    let day = null;
    switch (today.getDay()) {
        case 0:
            day = 'sunday'
            break;
        case 1:
            day = 'monday'
            break;
        case 2:
            day = 'tuesday'
            break;
        case 3:
            day = 'wednesday'
            break;
        case 4:
            day = 'thursday'
            break;
        case 5:
            day = 'friday'
            break;
        case 6:
            day = 'saturday'
            break;
    }
    return day;
}


module.exports = { timeOfDay, dayOfWeek};
