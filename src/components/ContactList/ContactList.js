import PropTypes from 'prop-types';
import s from './ContactList.module.css'

function ContactList({ contacts, onDelete }) {
    return (
        <ul>
        {contacts.map(({ id, name, number }) => {
          return (
            <li key={id} className={s.item}>
              <p>
                {name}: {number}
              </p>
              <button type="button" className={s.button} onClick={() => onDelete(id)}>DELETE</button>
            </li>
          )})}
    </ul>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDelete: PropTypes.func.isRequired,
};

export default ContactList;