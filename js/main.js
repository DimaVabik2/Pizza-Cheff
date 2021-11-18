$(document).ready(function () {
    document.getElementById('burger').onclick = function () {
        document.getElementById('menu').classList.add('open');
    };
    document.querySelectorAll("#menu > *").forEach((item) => {
        item.onclick = () => {
            document.getElementById('menu').classList.remove('open');
        }
    });

    wow = new WOW(
        {
            animateClass: 'animate__animated',
        }
    ).init();
    let buttons = document.getElementsByTagName('button');
    for (let i = 0; i < buttons.length; i++) {
        //buttons[i].classList.add('hvr-float-shadow')
        buttons[i].classList.add('hvr-float-shadow')
    }


    let allInputs = document.getElementsByTagName('input');
    $('#order-button').click(() => {
        let successInput=3;
        for (let i = 0; i < allInputs.length; i++){
            $('.error-input').hide();
            allInputs[i].style.marginBottom = '24px';
            allInputs[i].style.borderColor = '#b99150';
        }
        for (let i = 0; i < allInputs.length; i++) {
            if (!allInputs[i].value) {
                allInputs[i].nextElementSibling.style.display = 'block';
                allInputs[i].style.marginBottom = '2px';
                allInputs[i].style.borderColor = 'red';
                successInput-=1
            }

        }
        if (successInput<3){
            return;
        }
        let name = $('input')[0];
        let address = $('input')[1];
        let phone = $('input')[2];
        $('#loader').css('display','flex')
        $.ajax({
            method: "POST",
            url: "https://itlogia.ru/test/checkout",
            data: { name: $(name).val(), adrress: $(address).val(), phone: $(address).val()}
        })
            .done(function( msg ) {
                $('#loader').css('display','none')
                if (msg.success){
                    $('#order-form').css('display','none')
                    $('#success-order').css('display','flex')
                    $('#order-conteiner').css('align-items','center')
                    $('#order-img').css('align-self','flex-end')
                }else{
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ')
                }
            });

    })
})