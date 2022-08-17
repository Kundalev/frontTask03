document.addEventListener("DOMContentLoaded", function () {
    //
    // main variables
    //
    const itemsInBasket = [];
    const getEmptyProduct = () => ({
        id: itemsInBasket.length + 1,
    });

    //
    // helpers
    //
    const parseContent = (data = []) => {
        const content = document.getElementById("content");

        if (data && data.length) {
            content.innerHTML = "";

            data.forEach((item) => {
                const div = document.createElement("div");
                div.classList.add("cart-body-content-items-item");
                div.innerHTML = `<div class="cart-body-content-items-item">
            <div class="cart-body-content-items-item-img">
                <img src="https://placehold.it/100x100" alt="">
            </div>
            <div class="cart-body-content-items-item-title">Название товара ${item}</div>
            <div class="cart-body-content-items-item-price">Цена: ${item} руб.</div>
            <div class="cart-body-content-items-item-count">Количество: 1</div>
        </div>`;
                content.appendChild(div);
            });
        }
    };

    const addProduct = () => {
        const product = getEmptyProduct();
    };

    const removeProduct = () => {
    };

    const toggleClass = (el, className = "show") => {
        if (el.classList.contains(className)) {
            el.classList.remove(className);
        } else {
            el.classList.add(className);
        }
    };

    //
    // main logic here
    //

    const showCart = document.getElementById('toggle-shown-cart');
    const addToCart = document.getElementById('add-product-in-cart');
    const deleteFromCart = document.getElementById('delete-product-in-cart');
    const modalAuth = document.getElementById('modal-auth')
    const modalCart = document.getElementById('modal-cart')
    const exitButton = document.getElementById('exit-user')
    const formAuth = modalAuth.querySelector('#form')
    const order = document.getElementById('zakaz')

    let quitButton = function () {
        if (getCookie('token') !== undefined) {
            exitButton.classList.add('show');
        }
    }
    let sum = function (x) {
        let s = 0;
        for (let i = 0; i < x.length; i++) {
            s += x[i]
        }
        return s
    }
    let razn = function (x) {
        let s = 0;
        for (let i = 0; i < x.length; i++) {
            s -= -x[i]


        }
        return s
    }


    let rand = function () {
        return Math.random().toString(36).substr(2);
    };

    let token = function () {
        return rand() + rand();
    };

    function getCookie(name) {
        let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }
    function delete_cookie ( name )
    {
        var cookie_date = new Date ( );  // Текущая дата и время
        cookie_date.setTime ( cookie_date.getTime() - 1 );
        document.cookie = name += "=; expires=" + cookie_date.toGMTString();
    }


    document.addEventListener('click', e => {
        if (e.target.getAttribute('class') === 'cart-header-close') {
            let modal = e.target.parentElement.parentElement
            modal.classList.remove('show')
        }
    })

    showCart.addEventListener("click", function () {
        if (getCookie('token') === undefined) {
            modalAuth.classList.add('show');
        } else {
            modalCart.classList.add('show');

        }

    })

    formAuth.addEventListener("submit", function (evt) {
        evt.preventDefault();

        let login = this.elements.login.value
        let password = this.elements.password.value

        let myPromise = new Promise((myResolve, myReject) => {
            setTimeout(() => {
                if (login === '' || password === '') {
                    myReject('error')
                } else {
                    myResolve(token());
                }
            }, 2000);
        });

        myPromise.then(
            function (value) {
                document.cookie = "token=" + value + "; max-age=3600";
                console.log(getCookie('token'))
                modalAuth.classList.remove('show');
                modalCart.classList.add('show');
                quitButton();
            },
            function (error) {
                alert(error)
            }
        )

    })

    addToCart.addEventListener("click", function () {
        itemsInBasket.push(1)
        document.cookie = "cart=" + itemsInBasket.length + "; max-age=3600"
        console.log(itemsInBasket.length)
        showCart.innerHTML = 'Корзина' + '(' + itemsInBasket.length + ')'
        parseContent(itemsInBasket)
        document.getElementById('total').innerHTML = `Итого: ${sum(itemsInBasket)}`
    })
    deleteFromCart.addEventListener("click", function () {
        itemsInBasket.shift()
        console.log(itemsInBasket)
        showCart.innerHTML = 'Корзина' + '(' + itemsInBasket.length + ')'
        if (itemsInBasket.length === 0) {
            document.getElementById("content").innerHTML = ""
        }
        parseContent(itemsInBasket)
        document.getElementById('total').innerHTML = `Итого: ${razn(itemsInBasket)}`
    })
    exitButton.addEventListener('click', function (){
        delete_cookie("token")
        this.classList.remove("show")
        modalCart.classList.remove("show")
    })
    order.addEventListener("click", function () {
        document.getElementById("content").innerHTML = ""
        modalCart.classList.remove('show');
        itemsInBasket.length = 0;
        document.getElementById('total').innerHTML = `Итого: 0`
        showCart.innerHTML = 'Корзина (0)'
    })

    quitButton();


});
