import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contacts.module.css';

export default class Contacts extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
  };

  render() {
    const { onFilter, onDelete } = this.props;
    return (
      <ul className={styles.contactList}>
        {onFilter.map(({ id, name, number }) => {
          return (
            <li className={styles.contactListItem} key={id}>
              <p>{name}</p>
              <p>{number}</p>
              <button className="button" onClick={() => onDelete(id)} id={id}>
                Delete contact
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
