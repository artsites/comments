document.addEventListener('DOMContentLoaded', async () => {
    let form = document.querySelector('form#comment-form')
    let userCookie = JSON.parse(getCookie('comment-user'));
    if (userCookie) {
        form.querySelector('input#name').setAttribute('value', userCookie.name)
        form.querySelector('input#email').setAttribute('value', userCookie.email)
        deleteCommentEvents()
    }
    createCommentEvent()
    if(await isShowMore()) showMoreEvent()
})

//call once on load
async function isShowMore() {
    let lang = document.querySelector('html').getAttribute('lang')

    let comments = document.querySelectorAll('#comments-container #comments-view #comment-body');
    let count = comments.length

    if(count === 0) return false;

    let form = document.querySelector('#comments-container form#comment-form')

    let response = await fetch(`/api-comments/has-more?offset=${count}&model_type=${form.dataset.model_type}&model_id=${form.dataset.model_id}&lang=${lang}`)
    let jsonData = await response.json();
    if (response.status !== 200) {
        const message = `An error has occurred: ${response.status}`
        throw new Error(message)
    }

    //create showMoreButton
    if(jsonData.hasMore) {
        document.querySelector('#comments-container')
            .insertAdjacentHTML('beforeend', jsonData.showMoreButtonView)
    }

    return jsonData.hasMore;
}

function showMoreEvent() {
    let lang = document.querySelector('html').getAttribute('lang')

    let button = document.querySelector('.comments-container button#show-more');
    button.addEventListener('click', async event => {
        event.preventDefault();

        button.disabled = true;

        let comments = document.querySelectorAll('#comments-container #comments-view #comment-body');
        let count = comments.length

        let form = document.querySelector('#comments-container form#comment-form')

        let response = await fetch(`/api-comments/show-more?offset=${count}&model_type=${form.dataset.model_type}&model_id=${form.dataset.model_id}&lang=${lang}`)
        let jsonData = await response.json();
        if (response.status !== 200) {
            button.disabled = false;
            const message = `An error has occurred: ${response.status}`
            throw new Error(message)
        }

        let commentsViews = jsonData.commentsViews;

        if(commentsViews) {
            let view = document.querySelector('.comments-container div#comments-view')

            commentsViews.forEach(commentView => {
                let newComment = document.createElement('div');
                newComment.innerHTML = commentView;
                newComment = newComment.querySelector('div');

                let delBtnForm = newComment?.querySelector('form#delete-comment')
                delBtnForm?.addEventListener('submit', async event => {
                    event.preventDefault();
                    await deleteComment(delBtnForm)
                })

                view.insertAdjacentElement('beforeend', newComment)
            })

            let btnShowMore = document.querySelector('.comments-container button#show-more');
            if (jsonData.hasMore === false) btnShowMore.parentElement.remove()
        }

        button.disabled = false;
    })
}

function createCommentEvent() {
    let lang = document.querySelector('html').getAttribute('lang')

    let form = document.querySelector('#comment-form')

    grecaptcha.ready(() => {
        form.addEventListener('submit', async event => {
            event.preventDefault();

            form.querySelector('button#submit-btn').disabled = true;

            let recaptchaKey = form.dataset.recaptcha_key;
            let g_recaptcha_token = await grecaptcha.execute(recaptchaKey);

            let userCookie = JSON.parse(getCookie('comment-user'));

            let user = {
                name: form.querySelector('input#name').value,
                email: form.querySelector('input#email').value,
                token: userCookie?.token ?? token()
            }
            setCookie('comment-user', JSON.stringify(user),365);

            let action = `/api-comments/create?lang=${lang}`;
            let formData = Object.fromEntries(new FormData(form));

            formData.url = location.href;
            formData.g_recaptcha_token = g_recaptcha_token
            formData.user_token = user.token
            formData.model_type = form.dataset.model_type;
            formData.model_id = form.dataset.model_id;
            let _token = formData._token;
            delete formData._token;

            let settings = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': _token.toString(),
                },
                cache: 'no-cache',
                body: JSON.stringify(formData),
            };

            let response = await fetch(action, settings);
            let jsonData = await response.json();

            if ( ! response.ok) {
                form.querySelector('button#submit-btn').disabled = false;
                throw new Error(jsonData.message);
            }

            form.reset();
            form.querySelector('input#name').setAttribute('value', user.name)
            form.querySelector('input#email').setAttribute('value', user.email)

            let commentView = jsonData.commentView;
            if(commentView) {
                let newComment = document.createElement('div');
                newComment.innerHTML = commentView;
                newComment = newComment.querySelector('div');

                //add delete event
                newComment.addEventListener('submit', async event => {
                    event.preventDefault();
                    let delBtnForm = newComment.querySelector('form#delete-comment')
                    await deleteComment(delBtnForm, user)
                })

                document.querySelector('#comments-view').prepend(newComment)
            }

            form.querySelector('button#submit-btn').disabled = false;
        });
    });
}

function deleteCommentEvents() {
    let deleteButtons = document.querySelectorAll('form#delete-comment')

    //delete comment
    deleteButtons.forEach(delBtnForm => {
        delBtnForm.addEventListener('submit', async event => {
            event.preventDefault();

            await deleteComment(delBtnForm)
        })
    })
}

async function deleteComment(delBtnForm) {
    let lang = document.querySelector('html').getAttribute('lang')

    let userCookie = JSON.parse(getCookie('comment-user'));
    if(! userCookie?.token) return;

    let form = document.querySelector('form#comment-form');

    let isDelete = false;
    if (confirm("Точно хотите удалить?")) {
        isDelete = true;
    }
    if (!isDelete) return;

    delBtnForm.querySelector('button#delete-btn').disabled = true;
    let action = `/api-comments/delete/${delBtnForm.dataset.id}?lang=${lang}`;

    let formData = Object.fromEntries(new FormData(delBtnForm));
    formData.user_token = userCookie.token;
    let _token = formData._token;
    delete formData._token;

    let settings = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': _token.toString(),
        },
        cache: 'no-cache',
        body: JSON.stringify(formData),
    };

    let response = await fetch(action, settings);
    let jsonData = await response.json();

    if (!response.ok) {

        console.log(jsonData);

        form.querySelector('button#delete-btn').disabled = false;
        throw new Error(jsonData.message);
    }
    delBtnForm.closest('div#comment-body').remove();
}

function setCookie(name,value,days) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for(let i=0;i < ca.length;i++) {
        let c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function removeCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

const rand = () => Math.random(0).toString(36).substr(2);
const token = (length = 40) => (rand() + rand() + rand() + rand()).substr(0, length);
