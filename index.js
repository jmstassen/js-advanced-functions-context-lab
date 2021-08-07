/* Your Code Here */

function createEmployeeRecord(srcArray) {
    let employeeRecord = {
        "firstName" : srcArray[0],
        "familyName" : srcArray[1],
        "title" : srcArray[2],
        "payPerHour" : parseInt(srcArray[3], 10),
        "timeInEvents" : [],
        "timeOutEvents" : []
    }
    return employeeRecord
}

function createEmployeeRecords(srcArray) {
    let newArray = srcArray.map(r => createEmployeeRecord(r));
    return newArray
}

function createTimeInEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
    this.timeInEvents.push({
        "type" : "TimeIn",
        "hour" : parseInt(hour, 10),
        "date" : date
    })
    return this
}

function createTimeOutEvent(dateTimeString) {
    let [date, hour] = dateTimeString.split(' ');
    this.timeOutEvents.push({
        "type" : "TimeOut",
        "hour" : parseInt(hour, 10),
        "date" : date
    })
    return this
}

function hoursWorkedOnDate(dateString) {
    let dayIn = this.timeInEvents.find(function(e) {
        return e.date === dateString
    })

    let dayOut = this.timeOutEvents.find(function(e) {
        return e.date === dateString
    })

    let hoursWorked = (dayOut.hour - dayIn.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(dateString) {
    let wagesEarned = this.payPerHour * hoursWorkedOnDate.call(this, dateString);
    return wagesEarned
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function calculatePayroll(employees) {
    let payroll = employees.reduce((count, employee) => count + allWagesFor.call(employee), 0);
    return payroll;
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}