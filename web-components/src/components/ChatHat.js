const template = document.createElement('template')
template.innerHTML = `
    <style>
       .hat {
            height: 8vh;
            background-color: #8E24AA;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            color: white;
            font-weight: bolder;
            font-size: 20px;
       }
    </style>
    <div class='hat'>
        <div>
            Messenger
        </div>
    </div>
`

class ChatHat extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onSubmit", "_onKeyPress"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
    }
}

customElements.define('chat-hat', ChatHat)

