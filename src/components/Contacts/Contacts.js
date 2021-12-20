import styles from './contacts.module.css';

export default function Contacts({ onFilter, onDelete }) {
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
