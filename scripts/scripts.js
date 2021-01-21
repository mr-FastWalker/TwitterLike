
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

const obj = new FetchData()

obj.getPost().then((data) => {
    console.log(data)
})



class Twitter {
    constructor({ listElem }) {
        this.tweets = new Posts ();
        this.elements = {
            listElem: document.querySelector(listElem)
        }
    }

    renderPosts () {

    }

    showUserPost () {

    }

    showLikesPost () {

    }

    showAllPost () {

    }
    
    openModal () {

    }


}

class Posts {
    constructor ( {posts = [] } = {} ) {
        this.posts = posts;

    }

    addPost (tweet) {
        this.posts.push(new Post (tweet));
    }

    deletePost (id) {

    }

    likePost (id) {

    }
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

    getDate () {
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
    listElem: '.tweet-list'
})

twitter.tweets.addPost({});





