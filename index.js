// Your code here
function createEmployeeRecord(employee) {
    const [firstName, familyName, title, payPerHour] = employee;

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(data) {
    const employeeRecords = [];

    for (let employeeData of data) {
        const employeeRecord = createEmployeeRecord(employeeData);

        employeeRecords.push(employeeRecord);
    }

    return employeeRecords;
}

function createTimeInEvent(employeeObject, dateStamp){
    const [date, time] = dateStamp.split(' ');
    const [hour, minute] = time.split(':');

    const timeInEvent = {
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeObject.timeInEvents.push(timeInEvent);

    return employeeObject;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    const [date, time] = dateStamp.split(' ');
    const [hour, minute] = time.split(':');

    const timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);

    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    } else {
        return 0;
    }
}

function wagesEarnedOnDate(employeeRecord, date){
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);

    if (timeInEvent && timeOutEvent) {
        let amount = employeeRecord.payPerHour;
        const wagesEarned = hoursWorkedOnDate(employeeRecord,date) * amount;
        return wagesEarned;;
    } else {
        return 0;
    }
}

function allWagesFor(employeeRecord) {
    const allDatesWorked = [...new Set([...employeeRecord.timeInEvents, ...employeeRecord.timeOutEvents].map(event => event.date))];

    const totalWages = allDatesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
    }, 0);

    return totalWages;
}

function calculatePayroll(employeeRecords) {
    const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
    }, 0);

    return totalPayroll;
}