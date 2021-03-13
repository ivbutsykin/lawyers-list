import cls from 'classnames';

import { TABLE_COLUMNS } from './columns';

import styles from './UserList.module.css';

function UserList(props) {
  const { users } = props;

  if (!users) {
    return null;
  }

  return (
    <table className={styles.UserList}>
      <thead className={styles.header}>
      <tr>
        {
          TABLE_COLUMNS.map((column, index) => (
            <th className={styles.cell} key={index}>
              {column.label}
            </th>
          ))
        }
      </tr>
      </thead>
      <tbody>
      {
        users.map((user, index, users) => (
          <tr key={user.id}>
            {
              TABLE_COLUMNS.map((column, _index) => {
                return (
                  <td
                    key={_index}
                    className={cls(styles.cell, {
                      [styles.error]: !column.isValid(user)
                    })}
                  >
                    {column.getDisplayValue(user, index, users)}
                  </td>
                );
              })
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  );
}

export default UserList;
