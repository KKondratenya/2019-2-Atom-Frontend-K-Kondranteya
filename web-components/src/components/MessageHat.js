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
            font-size: 2vh;
            font-weight: bold;
            margin: 2%;
        }

        .time {
            color: #C660CD;
            font-size: 1vh;
            margin-top: 1vh;

        }

        .arrow {
            height: 4vh;
            width: 4vh;
        }

        .arrow:active {
            filter: blur(1px);
        }

        .magnifying {
            height: 4vh;
            width: 4vh;
            margin: 2%;
        }

        .magnifying:active {
            filter: blur(1px);
        }

        .menu {
            height: 4vh;
            width: 4vh;
            margin-left: auto;
            margin-right: 5%;
        }

        .menu:active {
            filter: blur(1px);
        }

       .avatar {
            width:8vh;
            height:8vh;
            border-radius: 100%;
            object-fit: cover;
            margin-left: 35%;
        }

    </style>
 <div class='hat'>
     <img class='arrow' src = "images/left-arrow.png">
     <img class='avatar' src='images/spongebob.jpg'>
    <div class='user'>
        User
    <div class='time'>
        Online
    </div>
    </div>
    <img class="magnifying" src="images/magnifying-glass.png">
    <img class="menu" src="images/menu.png">
</div>
`

class MessageHat extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onClick"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$button = this._shadowRoot.querySelector('img')
        this.$button.addEventListener('click', this._onClick.bind(this))
    }

    _onClick () {
        this.$button.dispatchEvent(new Event('chatlist', {bubbles:true, composed:true}))
    }

}

customElements.define('message-hat', MessageHat)
