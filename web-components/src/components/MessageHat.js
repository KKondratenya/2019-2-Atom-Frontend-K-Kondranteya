const template = document.createElement('template')
template.innerHTML = `
    <style>
        .hat {
            background-color: #8E24AA;
            height: 8vh;
            display: flex;
            align-items: center;
            width: 100%;
            z-index: 100;
        }

        .user {
            color: white;
            font-size: 17px;
            font-weight: bold;
            margin-left: 45%;
        }

        .time {
            color: #C660CD;
            font-size: 10px;

        }

        button{
            font-size:18px;
            float:left;
            justify-self:flex-start;

        }
    </style>
 <div class='hat'>
     <button>
        <span>
           <--
        </span>
    </button>
    <div class='user'>
        User
    <div class='time'>
        Online
    </div>
    </div>
</div>
`

class MessageHat extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onClick"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$button = this._shadowRoot.querySelector('button')
        this.$button.addEventListener('click', this._onClick.bind(this))
    }

    _onClick () {
        this.$button.dispatchEvent(new Event('chatlist', {bubbles:true, composed:true}))
    }

}

customElements.define('message-hat', MessageHat)
