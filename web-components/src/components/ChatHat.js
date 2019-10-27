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
            font-size: 3vh;
       }

       .menu {
            height: 3vh;
            width: 3vh;
       }

       .text {
            margin: 10px;
       }

       img:active {
            filter: blur(1px);
       }

       .magnifying {
            margin-left: auto;
            height: 4vh;
            width: 4vh;
       }

    </style>
    <div class='hat'>
        <img class="menu" src="images/three-lines.png">
        <div class="text">
            Messenger
        </div>
        <img class="magnifying" src="images/magnifying-glass.png">
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

