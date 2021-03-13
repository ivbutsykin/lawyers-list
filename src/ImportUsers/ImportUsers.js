import React from 'react';

import { csvToUserList } from './parser';

import styles from './ImportUsers.module.css'

class ImportUsers extends React.Component {

  fileReader = new FileReader();

  componentDidMount() {
    this.fileReader.onload = this.handleReaderResult;
    this.fileReader.onerror = this.handleReaderException;
  }

  render() {
    return (
      <label className={styles.ImportUsers}>
        Import users
        <input
          type="file"
          style={{ display: 'none' }}
          onChange={this.handleChange}
        />
      </label>
    );
  }

  handleReaderException = () => {
    this.props.onError();
  };

  handleReaderResult = () => {
    const { onError, onChange } = this.props;

    try {
      onChange(csvToUserList(this.fileReader.result));
    } catch (error) {
      onError();
    }
  };

  handleChange = (event) => {
    const [file] = event.target.files;

    this.fileReader.readAsText(file);
    event.target.value = null;
  };
}

export default ImportUsers;
