const template = document.createElement('template')
template.innerHTML = `
    <style>
        from {
            height: 100vh;
            display: flex;
            flex-direction: column;
            width: 100%;
            overflow-x: hidden;
            
        }

        input[type=submit] {
            visibility: collapse;
        }

        button {
            border-radius: 100%;
            width: 8vh;
            height: 8vh;
            position: fixed;
            left: 80%;
            top: 80%;
            background-color: orange;   
            border-color: orange;
            animation: none;
        }

        button:hover{
            animation: pulse 2s infinite;
            cursor: pointer;
            box-shadow: 0 0 0 rgba(204,169,44, 0.4);
        }
        img{
            width: 4vh;
            height: 4vh;
        }
            @keyframes pulse {
              0% {
                box-shadow: 0 0 0 0 rgba(204,169,44, 0.4);
              }
              70% {
                  box-shadow: 0 0 0 2vh rgba(204,169,44, 0);
              }
              100% {
                  box-shadow: 0 0 0 0 rgba(204,169,44, 0);
              }
            }

    </style>
    <from>
        <chat-hat>
        </chat-hat>
        <chat-list>
        </chat-list>
        <button>
            <img src="images/pencil-edit-button.png">
        </button>
        <span class='pulse'>
        </span>
    </from>
`

class ChatPage extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onSubmit", "_onKeyPress"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$form = this._shadowRoot.querySelector('from')
        this.$input = this._shadowRoot.querySelector('form-input')
        this.$message = this._shadowRoot.querySelector('message-temp')
        this.$button = this._shadowRoot.querySelector('button')
        this.$chatList = this._shadowRoot.querySelector('chat-list')
    }

    static get observedAttributes() {
        return ['style']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.$form.setAttribute(name, newValue)
        this.$chatList.checkLastMessage()
    }

}

customElements.define('chat-page', ChatPage)
