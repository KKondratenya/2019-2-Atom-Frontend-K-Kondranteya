const template = document.createElement('template')
template.innerHTML = `
    <style>
        .message {
            position: relative;
            margin: 10px;
            max-width: 40%;
            padding: 1px;
            word-wrap:break-word;
            background-color: #F6E1F5;
            transition-property: left;
            transition-duration: 1s;          
            border-radius:10px;
            font-size: 2vh;
            line-height: 2vh;
            border: 3px;
            align-self:flex-end;
        }

        .result {
            bottom: 20px;
            height: 88vh;
            display: flex;
            flex-direction: column;
            margin: 5px;
            flex-wrap: nowrap;
            overflow-y: auto; 
            overflow-x:hidden;
            flex-flow: column nowrap;
        }

        .result > :first-child {
            margin-top: auto !important;
        }

        .date {
            font-size: 1vh;
            font-style: oblique;
            text-align: right;
            margin: 2px;
        }
    </style>
        <div class="result"></div>
`


class MessageTemp extends HTMLElement {
    constructor (){
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$container = this.shadowRoot.querySelector('.result')
        this.messages = []
    }

    static get observedAttributes() {
        return ['name', 'value', 'left']
    }

    connectedCallback() {
       const box = localStorage.getItem('message-container')
       if (box) {
            const messageContainer = localStorage.getItem('message-container')
            this.messages = JSON.parse(messageContainer)
            for (let i = 0; i < this.messages.length; i +=1) {
                const messageDiv = document.createElement('div')
                const dateDiv = document.createElement('div')
                messageDiv.setAttribute('class', 'message')
                dateDiv.setAttribute('class', 'date')
                messageDiv.innerHTML = this.messages[i].inner
                dateDiv.innerHTML = this.messages[i].date
                messageDiv.appendChild(dateDiv)
                this.$container.appendChild(messageDiv)
            }
        if (this.$container.scrollHeight) {
            this.$container.scrollTop = this.$container.scrollHeight
        }
       } 
    }

    buildMessage(value) {
        const message = {}
        message.inner = value
        const date = new Date()
        const messageDiv = document.createElement('div')
        const dateDiv = document.createElement('div')
        messageDiv.setAttribute('class', 'message')
        dateDiv.setAttribute('class', 'date')
        messageDiv.innerHTML = value
        const Hours = `0${date.getHours()}`.slice(-2)
        const Minutes = `0${date.getMinutes()}`.slice(-2)
        dateDiv.innerHTML = `${Hours}:${Minutes}`
        message.date = `${Hours}:${Minutes}`
        message.sender = 'User'
        message.reciever = 'User'
        messageDiv.appendChild(dateDiv)
        messageDiv.setAttribute('style', 'left: 40%')
        this.$container.appendChild(messageDiv)
        if (this.$container.scrollHeight) {
            this.$container.scrollTop = this.$container.scrollHeight
        }
        this.messages.push(message)
        const json = JSON.stringify(this.messages)
        localStorage.setItem('message-container', json)
        messageDiv.setAttribute('style', 'left: 0')
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$input.setAttribute(name, newValue)
    }
}
customElements.define('message-temp', MessageTemp)