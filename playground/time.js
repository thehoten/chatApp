// Jan 1st 1970 00:00:10 am
//
// var date=new Date();
// console.log(date.getMonth());

var moment=require('moment');

// var date=moment();
// date.add(100,'years');
//
// console.log(date.format('MMM Do, YYYY'));

var date=moment();

console.log(date.format('h:mm a'));
