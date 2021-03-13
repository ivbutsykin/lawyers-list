import {
  validateAge,
  validateEmail,
  validateExperience,
  validateHasChildren,
  validateIncome,
  validateLicense,
  validateExpires,
  validatePhone
} from './validators';

export const TABLE_COLUMNS = [
  {
    label: 'ID',
    getDisplayValue(user) {
      return user.id;
    },
    isValid() {
      return true;
    }
  },
  {
    label: 'Full Name',
    getDisplayValue(user) {
      return user.name;
    },
    isValid() {
      return true;
    }
  },
  {
    label: 'Phone',
    getDisplayValue(user) {
      if (!this.isValid(user)) {
        return user.phone;
      }

      const phone = user.phone
        .padStart(12, '*')
        .substr(2);

      return `+1${phone}`;
    },
    isValid(user) {
      return validatePhone(user.phone);
    },
  },
  {
    label: 'Email',
    getDisplayValue(user) {
      return user.email;
    },
    isValid(user) {
      return validateEmail(user.email);
    },
  },
  {
    label: 'Age',
    getDisplayValue(user) {
      return user.age;
    },
    isValid(user) {
      return validateAge(user.age);
    }
  },
  {
    label: 'Experience',
    getDisplayValue(user) {
      return user.experience;
    },
    isValid(user) {
      return validateExperience(user.experience, user.age);
    }
  },
  {
    label: 'Yearly Income',
    getDisplayValue(user) {
      return user.income && user.income.toFixed(2);
    },
    isValid(user) {
      return validateIncome(user.income);
    }
  },
  {
    label: 'Has children',
    getDisplayValue(user) {
      if (!this.isValid(user)) {
        return user.hasChildren;
      }

      return user.hasChildren.toString()
        .toUpperCase();
    },
    isValid(user) {
      return validateHasChildren(user.hasChildren);
    },
  },
  {
    label: 'License states',
    getDisplayValue(user) {
      return user.states.join(', ');
    },
    isValid() {
      return true;
    }
  },
  {
    label: 'Expiration date',
    getDisplayValue(user) {
      return user.expires;
    },
    isValid(user) {
      return validateExpires(user.expires);
    }
  },
  {
    label: 'License number',
    getDisplayValue(user) {
      return user.license;
    },
    isValid(user) {
      return validateLicense(user.license);
    },
  },
  {
    label: 'Duplicate with',
    getDisplayValue(user, _, users) {
      const result = users.find(compare => {
        if (compare.id === user.id) {
          return false;
        }

        return [
          'phone',
          'email'
        ].some(field => {
          return user[field].toLowerCase() === compare[field].toLowerCase();
        });
      });

      if (!result) {
        return null;
      }

      return result.id;
    },
    isValid() {
      return true;
    }
  },
];
