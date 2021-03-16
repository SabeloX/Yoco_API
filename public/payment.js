const yocoSDK = new window.YocoSDK({
    publicKey: 'pk_test_ed3c54a6gOol69qa7f45'
});

//Popup Method
$('.popup button').click(() => {
    yocoSDK.showPopup({
        currency: 'ZAR',
        amountInCents: 5000,
        name: 'Varsity Eats Wings Payment',
        callback: response => {
            if(response.error){
                $('.popup p').html(response.error.message);
            }
            else{
                fetch('/pay', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: response.id })
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.errorCode){
                            $('.popup p').html(data.displayMessage);
                        }
                        else{
                            $('.popup p').html(data.status);
                        }
                    })
                    .catch(error => {
                        $('.popup p').html(error.message);
                    })
            }
        }
    })
})

//Inline Method
const inline = yocoSDK.inline({
    layout: 'basic',
    amountInCents: 5000,
    currency: 'ZAR'
});
inline.mount('#yoco_inline');

$('.inline form').submit((e) => {
    e.preventDefault();
    $('.inline button').prop('disabled', true);
    inline.createToken()
        .then(response => {
            $('.inline button').prop('disabled', false);
            if(response.error){
                $('.inline p').html(response.error.message);
            }
            else{
                fetch('/pay', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ token: response.id })
                })
                    .then(res => res.json())
                    .then(data => {
                        if(data.errorCode){
                            $('.inline p').html(data.displayMessage);
                        }
                        else{
                            $('.inline p').html(data.status);
                        }
                    })
            }
        })
        .catch(error => {
            $('.inline button').prop('disabled', false);
            $('.inline p').html(error.message);
        })
})