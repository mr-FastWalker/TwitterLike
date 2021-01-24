
class FetchData {
    getResourse = async url => {
        const res = await fetch (url);

        if (!res.ok) {
            throw new Error ("Ошибка: " + res.status)
        }

        return res.json();
    }

    getPost = async () => await this.getResourse('db/database.json');
}


class Twitter {
    constructor({ user, listElem, modalElems, tweetElems, tweetFormElems }) {
        const fetchData = new FetchData();
        this.user = user;
        this.tweets = new Posts();
        this.elements = {
            listElem: document.querySelector(listElem),
            modal: modalElems, //это можно писать без двоеточия, просто modalElems > тут пределили имя (modal)
            tweetElems, //такой синтаксис без двоеточия, то же что (имя: элемент)
            tweetFormElems
        };

        fetchData.getPost()
            .then(data => {
                data.forEach(this.tweets.addPost);
                this.showAllPost();
            });

        this.elements.modal.forEach(this.handlerModal, this);  //используем то имя, которое определили выше (modal)
        this.elements.tweetElems.forEach(this.addTweet, this); //назначаем метод для добавления твитов this передает для доступа к tweetElems
        this.elements.tweetFormElems.forEach(this.addTweet, this);    
    }

    renderPosts (posts) {
        this.elements.listElem.textContent = '';

        posts.forEach(({ id, userName, nickName, text, img, likes, getDate }) => {
            this.elements.listElem.insertAdjacentHTML('beforeend', `
                <li>
                    <article class="tweet">
                        <div class="row">
                            <img class="avatar" src="images/${nickName}.jpg" alt="Аватар пользователя ${nickName}">
                            <div class="tweet__wrapper">
                                <header class="tweet__header">
                                    <h3 class="tweet-author">${userName}
                                        <span class="tweet-author__add tweet-author__nickName">@${nickName}</span>
                                        <time class="tweet-author__add tweet__date">${getDate()}</time>
                                    </h3>
                                    <button class="tweet__delete-button chest-icon" data-id="${id}"></button>
                                </header>
                                <div class="tweet-post">
                                    <p class="tweet-post__text">${text}</p>
                                    ${img ? 
                                        `<figure class="tweet-post__image">
                                        <img src="${img}" alt="иллюстрация из поста ${nickName}">
                                    </figure>` : ''}
                                </div>
                            </div>
                        </div>
                        <footer>
                            <button class="tweet__like">
                                ${likes}
                            </button>
                        </footer>
                    </article>
                </li>
            `)
        })
    };

    showUserPost () {}
    showLikesPost () {}

    showAllPost () {
        this.renderPosts(this.tweets.posts)
    };
    
    handlerModal ({button, modal, overlay, close}) {
        const buttonElem = document.querySelector(button);
        const modalElem = document.querySelector(modal);
        const overlayElem = document.querySelector(overlay);
        const closeElem = document.querySelector(close);

        const openModal = () => {
            modalElem.style.display = 'block';
        };

        const closeModal = (elem, event) => {
            const target = event.target;
            if (target === elem) {
                modalElem.style.display = 'none';
            }
            
        };

        buttonElem.addEventListener('click', openModal);

        if (closeElem) {
            closeElem.addEventListener('click', closeModal.bind(null, closeElem));
        }

        if (overlayElem) {
            overlayElem.addEventListener('click', closeModal.bind(null, overlayElem));
        }
        
        this.closeModal = () => {
            modalElem.style.display = 'none';
        }
    };

    addTweet({ text, img, submit }) {
        const textElem = document.querySelector(text);
        const imgElem = document.querySelector(img);
        const submitElem = document.querySelector(submit);

        let imgUrl = '';
        let tempString = textElem.innerHTML;

        
        submitElem.addEventListener('click', () => {
            
            if (textElem.innerHTML != tempString) {
                this.tweets.addPost({
                    userName: this.user.name,
                    nickName: this.user.nick,
                    text: textElem.innerHTML,
                    img: imgUrl
                })
                this.showAllPost();
                this.closeModal();
             textElem.innerHTML = tempString;
            }             
        });
        

        textElem.addEventListener('click', () => {
            if (textElem.innerHTML === tempString) {
                textElem.innerHTML = '';
            }
        })

        imgElem.addEventListener('click', () => {
            imgUrl = prompt('Введите ссылку на изображение ')
        })
    };
}


class Posts {
    constructor ( {posts = [] } = {} ) {
        this.posts = posts
    }

    addPost = (tweet) => {
        this.posts.push(new Post (tweet));
    }

    deletePost (id) {}
    likePost (id) {}
}


class Post {
    constructor ({id, userName, nickName, postDate, text, img, likes = 0 }) {
        this.id = id || this.generateId();
        this.userName = userName;
        this.nickName = nickName;
        this.postDate = postDate ? new Date (postDate) : new Date();
        this.text = text;
        this.img = img;
        this.likes = likes;
        this.liked = false;
    }

    changeLike(){
        this.liked != this.liked;
        if (this.liked) {
            this.likes++;
        } else {
            this.likes--;
        }
    };

    generateId () {
        return (Math.random().toString(32).substring(2, 9) + (+new Date).toString(32));
    };

    getDate = () => {
        const options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return this.postDate.toLocaleString('ru-RU', options);
    }
}

const twitter = new Twitter ({
    listElem: '.tweet-list',
    user: {
        name: 'Yury',
        nick: 'avatar'
    },
    modalElems: [
        {
            button: '.header__link_tweet',
            modal: '.modal',
            overlay: '.overlay',
            close: '.modal-close__btn'
        }
    ],
    tweetElems: [
        {
            text: '.modal .tweet-form__text',
            img: '.modal .tweet-img__btn',
            submit: '.modal .tweet-form__btn'
        }
    ],
    tweetFormElems: [
        {
            text: '.tweet-form .tweet-form__text',
            img: '.tweet-form .tweet-img__btn',
            submit: '.tweet-form .tweet-form__btn'
        }
    ]
})


