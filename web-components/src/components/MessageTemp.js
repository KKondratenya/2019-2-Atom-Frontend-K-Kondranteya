const template = document.createElement('template')
template.innerHTML = `
    <style>
                .message {
            position: relative;
            margin: 10px;
            bottom: 20px;
            left: 10px;
            max-width: 20%;
            word-wrap:break-word;
            background-color: #F6E1F5;
            padding: 5px;           
            border-radius:10px;
            border: 3px;
            align-self:flex-end;
        }

        .result {
            bottom: 20px;
            height: 100vh;
            display: flex;
            flex-direction: column-reverse;
            flex-wrap: nowrap;
            overflow-y: scroll; 
        }

        .date {
            font-size: 10px;
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
        return ['name', 'value', 'text-message']
    }

    connectedCallback() {
       if (localStorage.getItem('message-container')) {
            const messageContainer = localStorage.getItem('message-container')
            this.messages = JSON.parse(messageContainer)
            for (let i = 0; i < this.messages.length; i +=1) {
                const newtext = document.createElement('div')
                const newtext1 = document.createElement('div')
                newtext.setAttribute('class', 'message')
                newtext1.setAttribute('class', 'date')
                newtext.innerHTML = this.messages[i].inner
                newtext1.innerHTML = this.messages[i].date
                newtext.appendChild(newtext1)
                this.$container.prepend(newtext)
            }
       } 
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'text-message') {
            const message = {}
            message.inner = newValue
            const date = new Date()
            const newtext = document.createElement('div')
            const newtext1 = document.createElement('div')
            newtext.setAttribute('class', 'message')
            newtext1.setAttribute('class', 'date')
            newtext.innerHTML = newValue
            newtext1.innerHTML = `${date.getHours()}:${date.getMinutes()}`
            message.date = `${date.getHours()}:${date.getMinutes()}`
            newtext.appendChild(newtext1)
            this.$container.prepend(newtext)
            if (this.$container.scrollHeight) {
                this.$container.scrollTop = this.$container.scrollHeight
            }
            this.messages.push(message)
            const json = JSON.stringify(this.messages)
            localStorage.setItem('message-container', json)
        } else {
            this.$input.setAttribute(name, newValue)
        } 
    }
}
customElements.define('message-temp', MessageTemp)