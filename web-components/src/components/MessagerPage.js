const template = document.createElement('template')
template.innerHTML = `
    <style>
    </style>
    <chat-page>
    </chat-page>


`

class MessagerPage extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onClickClack", "_onChatList"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$chatPage = this._shadowRoot.querySelector('chat-page')
        this.$chatPage.addEventListener('clickclack', this._onClickClack.bind(this))
    }

    _onClickClack (event) {
        this.$chatPage.setAttribute('style', 'display: none')
        this.$messageContainer = document.createElement('message-form')
        this._shadowRoot.appendChild(this.$messageContainer)
        this.$messageContainer.addEventListener('chatlist', this._onChatList.bind(this))
    }

     _onChatList (event) {
        this.$chatPage.setAttribute('style', 'display: flex')
        this.$messageContainer.remove()
    }

}

customElements.define('messager-page', MessagerPage)

