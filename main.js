/*
 * Your program must print string with the number of years and months and the total number of days between the dates.
 * Dates are provided in dd.mm.yyyy format.
 * You are not allowed to plug in JS libraries such as moment.js or date-fns directly into the code. All code need to be written in this file.
 *
 * Result must be shown as a string in years, months and total days. If years or months are 0, then it should not be displayed in the output.
 *
 * Example:
 * Input: ['01.01.2000', '01.01.2016']
 * Output:
 * '16 years, total 5844 days'
 *
 * Example 2:
 * Input: ['01.11.2015', '01.02.2017']
 *
 * Output:
 * '1 year, 3 months, total 458 days'
*/
const dates = [
    ['01.01.2000', '01.01.2016'],
    ['01.01.2016', '01.08.2016'],
    ['01.11.2015', '01.02.2017'],
    ['17.12.2016', '16.01.2017'],
    ['01.01.2016', '01.01.2016'],
    ['28.02.2015', '13.04.2018'],
    ['28.01.2015', '28.02.2015'],
    ['17.03.2022', '17.03.2023'],
    ['17.02.2024', '17.02.2025'],
];

const YEAR_WORD = {
    SINGLE: 'year',
    PLURAL: 'years'
};
const MONTH_WORD = {
    SINGLE: 'month',
    PLURAL: 'months'
};
const DAY_WORD = {
    SINGLE: 'day',
    PLURAL: 'days'
};
const KEY_TIME_VALUES = {
    MILLISECONDS_IN_SECOND: 1000,
    SECONDS_IN_MINUTE: 60,
    MINUTES_IN_HOUR: 60,
    HOURS_IN_DAY: 24
};

// Receive string of dates one after each other
function outputDate(dates) {
    const values = {
        [YEAR_WORD.SINGLE]: null,
        [MONTH_WORD.SINGLE]: null,
        [DAY_WORD.SINGLE]: null
    };

    const buildValueAndWordPart = (value, word, wordPlural) => `${value} ${value === 1 ? word : wordPlural}`;
    const buildResultPart = (value, word, wordPlural) => {
        if (value === 0) {
            return '';
        }

        return `${buildValueAndWordPart(value, word, wordPlural)}, `;
    };
    const buildResultTotalPart = (value, word, wordPlural) => {
        if (value === 0) {
            return `total 0 ${wordPlural}`;
        }

        return `total ${buildValueAndWordPart(value, word, wordPlural)}`;
    };

    const splitedDates = dates.map(dateStr => (dateStr.split('.')));
    const [[startDay, startMonth, startYear], [finishDay, finishMonth, finishYear]] = splitedDates;
    const totalMillisecondsDiff = (new Date(finishYear, finishMonth - 1, finishDay).getTime() -
        new Date(startYear, startMonth - 1, startDay).getTime());

    values[DAY_WORD.SINGLE] = Math.round(totalMillisecondsDiff /
        (KEY_TIME_VALUES.MILLISECONDS_IN_SECOND * KEY_TIME_VALUES.SECONDS_IN_MINUTE * KEY_TIME_VALUES.MINUTES_IN_HOUR *
            KEY_TIME_VALUES.HOURS_IN_DAY));
    values[YEAR_WORD.SINGLE] = finishYear - startYear;
    values[MONTH_WORD.SINGLE] = finishMonth - startMonth;

    if (values[MONTH_WORD.SINGLE] < 0) {
        values[MONTH_WORD.SINGLE] += 12;
        values[YEAR_WORD.SINGLE]--;
    }

    if (finishDay - startDay < 0) {
        values[MONTH_WORD.SINGLE]--;
    }

    return [YEAR_WORD, MONTH_WORD, DAY_WORD].map(wordDictionary => {
        const currentValue = values[wordDictionary.SINGLE];
        const currentWords = [wordDictionary.SINGLE, wordDictionary.PLURAL];

        if (wordDictionary.SINGLE === DAY_WORD.SINGLE) {
            return buildResultTotalPart(currentValue, ...currentWords);
        }

        return buildResultPart(currentValue, ...currentWords);
    }).join('');
}
