const template = document.createElement('template')
template.innerHTML = `
    <style>
        .message {
            position: relative;
            margin: 10px;
            width: 98%;
            word-wrap:break-word;
            padding: 5px;  
            border-bottom-style: solid;
            border-color: #A61AB4;
            border-width: thin;
        }

        .contact:hover {
            background-color: #F5F7FA;
        }
        .inner {
            color: #C3C3C3;
        }

        .result {
            bottom: 20px;
            height: 88vh;
            margin: 5px;
            overflow-y: auto; 
            overflow-x:hidden;
        }

        .date {
            font-size: 10px;
            font-style: oblique;
            float: right;
            margin: 2px;
        }

        .user {
            font-weight: bolder;
            font-size: 20px;
        }

        img {
            width:5%;
            height:5%;
            border: 3px solid green; /* Параметры рамки */
            border-radius: 100%;
            object-fit: cover;
            box-shadow: 0 0 7px #666; /* Параметры тени */
        }

        .contact{
            display: flex;
            margin: 5px;
        }

    </style>
    <div class='list' onclick>
    </div>
`

class ChatList extends HTMLElement {
    constructor () {
        super()
        /* eslint no-underscore-dangle: ["error", { "allow": ["_shadowRoot", "_onClick"] }] */
        this._shadowRoot = this.attachShadow({ mode: 'open' })
        this._shadowRoot.appendChild(template.content.cloneNode(true))
        this.$list = this._shadowRoot.querySelector('.list')
        this.$list.addEventListener('click', this._onClick.bind(this))
      
    }

    connectedCallback() {
        const box = localStorage.getItem('message-container')
        if (box) {
            const messages = JSON.parse(box)
            const lastMessage = messages[messages.length - 1]
            const contactDiv = document.createElement('div')
            const messageDiv = document.createElement('div')
            const innerDiv = document.createElement('div')
            const dateDiv = document.createElement('div')
            const userDiv = document.createElement('div')
            const image = document.createElement('img')
            image.setAttribute('src', 'images/spongebob.jpg')
            contactDiv.setAttribute('class', 'contact')
            userDiv.setAttribute('class', 'user')
            messageDiv.setAttribute('class', 'message')
            dateDiv.setAttribute('class', 'date')
            innerDiv.setAttribute('class', 'inner')
            userDiv.innerHTML = lastMessage.reciever
            innerDiv.innerHTML = lastMessage.inner
            dateDiv.innerHTML = lastMessage.date
            messageDiv.append(dateDiv)
            messageDiv.append(userDiv)
            messageDiv.append(innerDiv)
            contactDiv.append(image)
            contactDiv.append(messageDiv)
            this.$list.appendChild(contactDiv)               
        } else {
            const contactDiv = document.createElement('div')
            const messageDiv = document.createElement('div')
            const innerDiv = document.createElement('div')
            const userDiv = document.createElement('div')
            const image = document.createElement('img')
            image.setAttribute('src', '/images/spongebob.jpg')
            contactDiv.setAttribute('class', 'contact')
            userDiv.setAttribute('class', 'user')
            messageDiv.setAttribute('class', 'message')
            innerDiv.setAttribute('class', 'inner')
            userDiv.innerHTML = 'User'
            innerDiv.innerHTML = `Начните диалог с пользователем User прямо сейчас`
            messageDiv.append(userDiv)
            messageDiv.append(innerDiv)
            contactDiv.append(image)
            contactDiv.append(messageDiv)
            this.$list.appendChild(contactDiv) 
        }
    }

    _onClick(event) {
        this.$list.dispatchEvent(new Event('clickclack', {bubbles:true, composed:true}))
    }

    checkLastMessage() {
        const box = localStorage.getItem('message-container')
        if (box) {
            const messages = JSON.parse(box)
            const messageDiv = this.$list.querySelector('.message')
            const innerDiv = this.$list.querySelector('.inner')
            innerDiv.innerHTML = messages[messages.length-1].inner 
            let dateDiv = this.$list.querySelector('.date')
            if (!dateDiv) {
                dateDiv = document.createElement('div')
                dateDiv.setAttribute('class', 'date')
                dateDiv.innerHTML = messages[messages.length-1].date
                messageDiv.prepend(dateDiv)
            } else {
                dateDiv.innerHTML = messages[messages.length-1].date
            }
        }
    }
}

customElements.define('chat-list', ChatList)

