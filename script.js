// ------------------------------------------------------------------------------------------



setTimeout(() => {
        document.body.style.overflow = 'visible';
    }, 2000)
    // Location.reload();
const soundEffect = {
    match: new Audio('audio/match.mp3'),
    finish: new Audio('audio/finish.mp3')
}
const animations = ['slide-in-blurred-top', 'slide-in-blurred-tr', 'slide-in-blurred-right', 'slide-in-blurred-br', 'slide-in-blurred-bottom', 'slide-in-blurred-bl', 'slide-in-blurred-left', 'slide-in-blurred-tl'];
const racoonImages = [];
const racoonImagesLength = 8;
//for (let i = 1; i <= racoonImagesLength; i++) {
 //   racoonImages.push(new Image());
  //  racoonImages[i - 1].src = `./images/${i}.png`;
  // racoonImages[i - 1].count = 2;
//}
const imagePosition = getRandomPosition(racoonImagesLength * 2);

renderCards();


const container = document.querySelector('.container');
let canflip = true;
let cards = Array.from(document.getElementsByClassName('card'));
let counter = 0;
let pair = [];

container.addEventListener('click', (e) => {

    console.log(e.target)
    if (canflip) {
        const card = e.target.closest('.card');
        if (card && card.isFlipped) { return; }
        if (card && !card.isStatic && !card.isFlipped) {

            flipCard(card);
        }

        check();
        canflip = false;
        setTimeout(() => { canflip = true; }, 400);
    }
})

// -------------------------------------------------------------------------------------------- 
function check() {
    let key = true;
    cards.forEach((el, index) => {
        if (el.isFlipped && !el.isStatic && el !== pair[0]) {
            counter++;
            pair.push(el);
        }

        if (!el.isFlipped) { key = false; }
    })
    if (key) {
        soundEffect.finish.play();
        setTimeout(() => {
            alert('Congrats!!!');
            location.reload();
        }, 2000)

    }
    if (counter > 1) {

        if (pair[0].getAttribute('data-number') === pair[1].getAttribute('data-number') && pair[0] !== pair[1]) {
            pair.forEach(el => {
                el.isStatic = true;
                el.querySelector('.front').style.background = '#FFFAF0';
                soundEffect.match.play();
                console.log('a pair has been founded!!!\nsuccess!');

            })

        } else {
            pair.forEach(el => {
                setTimeout(() => { flipCard(el); }, 600)
                console.log('Failure ' + pair.length);
            })
        }
        console.log('starting over')
        counter = 0;
        pair = [];
    }
}

function flipCard(card) {

    card.classList.toggle('flipped');
    card.isFlipped = !card.isFlipped;
}


function renderCards() {
    const container = document.querySelector('.container');
    for (let i = 0; i < racoonImagesLength * 2; i++) {
        const card = document.createElement('div');
        card.classList.add('card-wrapper');
        card.innerHTML = `
    <div class="card">
        <div class="back"><img src="images/back.png" alt="racoon image">
        <div class="front"><img src="images/${imagePosition[i]}.png" alt="racoon image"></div>
    </div>`;
        card.style.animationDuration = `${getAnimationDuration()}s`;
        card.style.animationName = `${animations[getRandomIntInclusive(0, animations.length - 1 )]}`;
        card.querySelector('.card').setAttribute('data-number', `${imagePosition[i]}`);
        card.isFlipped = false;
        card.querySelector('.card').isStatic = false;
            setTimeout(()=>{container.appendChild(card)},200)
            
            
            
        

    }
}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getAnimationDuration() {
    return String(Math.random() + 0.7).slice(0, 7)
}


function getRandomPosition(length) {
    let arr = [];
    for (let i = 0; i < length; i++) {
        let number;
        let key = true;
        while (key) {
            count = 0;
            number = getRandomIntInclusive(1, length / 2);
            arr.forEach(el => {
                if (el === number) {
                    count++;
                }
            })
            if (count >= 2) { key = true; } else { key = false }
        }
        arr.push(number)
    }
    return arr;
}
