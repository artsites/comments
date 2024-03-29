document.addEventListener('DOMContentLoaded', async () => {
    let form = document.querySelector('form.comment-form')
    let userCookie = JSON.parse(getCookie('comment-user'));
    if (userCookie) {
        form.querySelector('input[name="name"]').setAttribute('value', userCookie.name)
        form.querySelector('input[name="email"]').setAttribute('value', userCookie.email)
        deleteCommentEvents()
    }
    replyEvent()
    createCommentEvent()
    if (await isShowMore()) showMoreEvent()
})

//call once on load
async function isShowMore() {
    let comments = document.querySelectorAll('.comments-container .comments-view .comment-body');
    let count = comments.length

    if (count === 0) return false;

    let form = document.querySelector('.comments-container form.comment-form')

    let response = await fetch(`/api-comments/has-more?offset=${count}&model_type=${form.dataset.model_type}&model_id=${form.dataset.model_id}`)
    let jsonData = await response.json();
    if (response.status !== 200) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message)
    }

    //create showMoreButton
    if (jsonData.hasMore) {
        document.querySelector('.comments-container')
            .insertAdjacentHTML('beforeend', jsonData.showMoreButtonView)
    }

    return jsonData.hasMore;
}

function showMoreEvent() {
    let button = document.querySelector('.comments-container button.show-more-btn');
    button.addEventListener('click', async event => {
        event.preventDefault();

        button.disabled = true;

        let comments = document.querySelectorAll('.comments-container .comments-view .comment-body');
        let count = comments.length

        let form = document.querySelector('.comments-container form.comment-form')

        let response = await fetch(`/api-comments/show-more?offset=${count}&model_type=${form.dataset.model_type}&model_id=${form.dataset.model_id}`)
        let jsonData = await response.json();
        if (response.status !== 200) {
            button.disabled = false;
            const message = `An error has occurred: ${response.status}`
            throw new Error(message)
        }

        let commentsViews = jsonData.commentsViews;

        if (commentsViews) {
            let view = document.querySelector('.comments-container div.comments-view')

            commentsViews.forEach(commentView => {
                let newComment = document.createElement('div');
                newComment.innerHTML = commentView;
                newComment = newComment.querySelector('div');

                //add delete event
                let delBtnForm = newComment?.querySelector('form.delete-comment-form')
                delBtnForm?.addEventListener('submit', async event => {
                    event.preventDefault();
                    await deleteComment(delBtnForm)
                })

                //add reply event
                let replyBtn = newComment.querySelector('.reply-btn');
                replyBtn.addEventListener('click', event => {
                    event.preventDefault();
                    reply(newComment);
                })

                view.insertAdjacentElement('beforeend', newComment)
            })

            let btnShowMore = document.querySelector('.comments-container button.show-more-btn');
            if (jsonData.hasMore === false) btnShowMore.parentElement.remove()
        }

        button.disabled = false;
    })
}

function createCommentEvent() {
    let form = document.querySelector('.comment-form')

    grecaptcha.ready(() => {
        form.addEventListener('submit', async event => {
            event.preventDefault();

            form.querySelector('button.submit-btn').disabled = true;

            let recaptchaKey = form.dataset.recaptcha_key;
            let g_recaptcha_token = await grecaptcha.execute(recaptchaKey);

            let userCookie = JSON.parse(getCookie('comment-user'));

            let user = {
                name: form.querySelector('input[name="name"]').value,
                email: form.querySelector('input[name="email"]').value,
                token: userCookie?.token ?? token()
            }
            setCookie('comment-user', JSON.stringify(user), 365);

            const action = `/api-comments/create`;
            const formData = Object.fromEntries(new FormData(form));

            formData.url = location.href;
            formData.user_token = user.token
            formData.model_type = form.dataset.model_type;
            formData.model_id = form.dataset.model_id;
            formData.g_recaptcha_token = g_recaptcha_token

            let settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                cache: 'no-cache',
                body: JSON.stringify(formData),
            };

            let response = await fetch(action, settings);
            let jsonData = await response.json();

            if (!response.ok) {
                form.querySelector('button.submit-btn').disabled = false;
                throw new Error(jsonData.message);
            }

            form.reset();
            form.querySelector('input[name="name"]').setAttribute('value', user.name)
            form.querySelector('input[name="email"]').setAttribute('value', user.email)

            let commentView = jsonData.commentView;
            if (commentView) {
                let commentsView = document.querySelector('.comments-view')

                let newComment = document.createElement('div');
                newComment.innerHTML = commentView;
                newComment = newComment.querySelector('div');

                //add delete event
                newComment.addEventListener('submit', async event => {
                    event.preventDefault();
                    let delBtnForm = newComment.querySelector('form.delete-comment-form')
                    await deleteComment(delBtnForm, user)
                })

                //add reply event
                let replyBtn = newComment.querySelector('.reply-btn');
                replyBtn.addEventListener('click', event => {
                    event.preventDefault();
                    reply(newComment);
                })

                commentsView.prepend(newComment)

                window.scroll(0, commentsView.offsetTop - 130)
            }

            form.querySelector('button.submit-btn').disabled = false;
        });
    });

}

function deleteCommentEvents() {
    let deleteButtons = document.querySelectorAll('form.delete-comment-form')

    //delete comment
    deleteButtons.forEach(delBtnForm => {
        delBtnForm.addEventListener('submit', async event => {
            event.preventDefault();

            await deleteComment(delBtnForm)
        })
    })
}

async function deleteComment(delBtnForm) {
    let userCookie = JSON.parse(getCookie('comment-user'));
    if (!userCookie?.token) return;

    let form = document.querySelector('form.comment-form');

    let isDelete = false;
    if (confirm("Точно хотите удалить?")) {
        isDelete = true;
    }
    if (!isDelete) return;

    delBtnForm.querySelector('button.delete-btn').disabled = true;
    let action = `/api-comments/delete/${delBtnForm.dataset.id}`;

    let formData = Object.fromEntries(new FormData(delBtnForm));
    formData.user_token = userCookie.token;

    let settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        cache: 'no-cache',
        body: JSON.stringify(formData),
    };

    let response = await fetch(action, settings);
    let jsonData = await response.json();

    if (!response.ok) {

        console.log(jsonData);

        form.querySelector('button.delete-btn').disabled = false;
        throw new Error(jsonData.message);
    }
    delBtnForm.closest('div.comment-body').remove();
}

//call once on load
function replyEvent() {
    let comments = document.querySelectorAll('.comments-view .comment-body')

    comments.forEach(comment => {
        let replyBtn = comment.querySelector('.reply-btn');
        replyBtn.addEventListener('click', event => {
            event.preventDefault();

            reply(comment)
        })
    })
}

function reply(comment) {
    let name = comment.querySelector('.comment-name').innerText

    let textarea = document.querySelector('.comments-container .comment-form textarea')
    textarea.scrollIntoView({behavior: 'smooth', block: 'center'})
    textarea.value = `@${name} `
    setTimeout(() => {
        textarea.focus()
        textarea.setSelectionRange(textarea.value.length, textarea.value.length);
    }, 500)
}

function setCookie(name, value, days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function removeCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const rand = () => Math.random(0).toString(36).substr(2);
const token = (length = 40) => (rand() + rand() + rand() + rand()).substr(0, length);
