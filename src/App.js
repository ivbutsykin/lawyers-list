import React from 'react';

import ImportUsers from './ImportUsers/ImportUsers';
import UserList from './UserList/UserList';

import styles from './App.module.css';

class App extends React.Component {
  state = {
    users: null,
    error: null,
  };

  render() {
    const { error, users } = this.state;

    return (
      <div className={styles.Container}>
        <ImportUsers
          onChange={this.handleUsersChange}
          onError={this.handleImportError}
        />
        {
          error
            ? (
              <div className={styles.error}>
                <p>File format is not correct</p>
              </div>
            )
            : (
              <UserList users={users}/>
            )
        }
      </div>
    );
  }

  handleImportError = () => {
    this.setState({ error: true });
  };

  handleUsersChange = users => {
    this.setState({
      users,
      error: null
    });
  };
}

export default App;
