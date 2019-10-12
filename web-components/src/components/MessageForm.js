const template = document.createElement('template')
template.innerHTML = `
    <style>
        form-input {
            width: 100%;
            position: fixed;
            bottom: 0;
        }

        from {
            height: 100vh;
        }

        input[type=submit] {
            visibility: collapse;
        }

    </style>
    <from>
        <message-temp>
        </message-temp>
        <form-input name="message-text" placeholder="Введите сообщение"></form-input>
    </from>
`

class MessageForm extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onSubmit", "_onKeyPress"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$form = this._shadowRoot.querySelector('from')
        this.$input = this._shadowRoot.querySelector('form-input')
        this.$message = this._shadowRoot.querySelector('message-temp')
        this.$form.addEventListener('submit', this._onSubmit.bind(this))
        this.$form.addEventListener('keypress', this._onKeyPress.bind(this))
    }

    _onSubmit (event) {
        event.preventDefault()
        this.$message.buildMessage(this.$input.value)
        this.$input.setAttribute('value', '')
    }

    _onKeyPress (event) {
        if (event.keyCode === 13 && this.$input.value !== '') {
            this.$form.dispatchEvent(new Event('submit'))
        }
    }
}

customElements.define('message-form', MessageForm)
