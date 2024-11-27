import React from 'react'

function ContactForm() {
  return (
    <form className="form" noValidate action="/" method='POST'>
        <div className='form-row'>
            <input type="text" required placeholder='Enter your full name*'/>
        </div>
        <div className='form-row'>
            <input type="text" required placeholder='Enter your phone number*'/>
        </div>
        <div className='form-row'>
            <input type="text" required placeholder='Enter your e-mail*'/>
        </div>
        <div className='form-row'>
            <textarea required placeholder='Type your message' />
        </div>
        <div className='form-row'>
            <button className='btn' type="submit">Send</button>
        </div>
    </form>
  )
}

export default ContactForm