function timeOfDay(){
    let today = new Date();
    let time = today.getHours();
    return (time < 11) ? 'morning' :
           (time < 16) ? 'afternoon' : 'evening';
}


module.exports = { timeOfDay };