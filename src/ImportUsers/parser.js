const CSV_FIELDS_PARSERS = [
  {
    key: 'name',
    getValue: required,
  },
  {
    key: 'phone',
    getValue: required,
  },
  {
    key: 'email',
    getValue: required,
  },
  {
    key: 'age',
    getValue: number,
  },
  {
    key: 'experience',
    getValue: number,
  },
  {
    key: 'income',
    getValue: number,
  },
  {
    key: 'hasChildren',
    getValue: boolean,
  },
  {
    key: 'states',
    getValue: array,
  },
  {
    key: 'expires',
    getValue: noop,
  },
  {
    key: 'license',
    getValue: noop,
  },
];

export function csvToUserList(csv) {
  return csv
    .trim()
    .split('\n')
    .map((user, index) => user
      .split(',')
      .reduce((acc, value, index) => {
        const parser = CSV_FIELDS_PARSERS[index];

        return {
          ...acc,
          [parser.key]: parser.getValue(value.trim()),
        };
      }, {
        id: index + 1,
      })
    );
}

function array(value) {
  return value.split('|');
}

function number(value) {
  if (!value) {
    return value;
  }
  return Number(value);
}

function boolean(value) {
  try {
    return JSON.parse(value || 'false');
  } catch (error) {
    return value;
  }
}

function noop(value) {
  return value;
}

function required(value) {
  if (!value) {
    throw new Error();
  }

  return value;
}
