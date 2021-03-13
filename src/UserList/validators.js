import * as EmailValidator from 'email-validator';
import moment from 'moment';

const MIN_AGE = 21;
const MAX_YEAR_INCOME = 1000000;

export function validateName() {
  return true;
}

export function validatePhone(value) {
  return /^(\+1|1)?\d{10}$/.test(value);
}

export function validateEmail(email) {
  return EmailValidator.validate(email);
}

export function validateAge(age) {
  return age === '' || (Number.isInteger(age) && age >= MIN_AGE);
}

export function validateExperience(experience, age) {
  return experience === '' || (experience >= 0 && ((age - experience) >= 0));
}

export function validateHasChildren(children) {
  return children === '' || typeof children === 'boolean';
}

export function validateIncome(income) {
  return income === '' || income <= MAX_YEAR_INCOME;
}

export function validateExpires(date) {
  const formats = [
    /^\d{2}\/\d{2}\/\d{4}$/,
    /^\d{4}-\d{2}-\d{2}$/,
  ];

  if (date === '') {
    return true;
  }

  const isFormatSupported = formats.some(format => format.test(date));

  if (!isFormatSupported) {
    return false;
  }

  if (!moment(date).isValid()) {
    return false;
  }

  return (moment(date) - moment()) > 0;
}

export function validateLicense(license) {
  return license === '' || /^[\d\w]{6}$/.test(license);
}
