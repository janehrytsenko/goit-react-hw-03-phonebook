import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css'

class ContactForm extends Component {
    state = {
        name: '',
        number: ''
    }
    
    static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    contacts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
      }),
    ),
  };

    handleChange = event => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value, id: uuidv4() })
    };
    
    handleSubmit = event => {
        event.preventDefault();
    
        this.props.onSubmit(this.state);
        
        this.setState({ name: '' , number: ''});
  }

  contactId = uuidv4();

    render() {
        return (
            <form className={s.form} onSubmit={this.handleSubmit}>
                <label className={s.name}>
                    Name
          <input
                        type="text"
                        name="name"
                        value={this.state.name}
                        id={this.contactId}
                        onChange={this.handleChange}
                        placeholder="Jack Johnson"
                        className={s.nameInput}
                    />
                </label>
                <label className={s.number}>
                    Number
          <input
                        type="text"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        placeholder="111-11-11"
                        className={s.numberInput}

                    />
                </label>
                <button type="submit" className={s.button}>ADD CONTACT</button>
                
            </form>
        )
    }
}

export default ContactForm;