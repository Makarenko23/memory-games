const title = document.querySelector('.title'),
      play = document.querySelector('.subtitle'),
      content = document.querySelector('.content'),
      cards = document.querySelectorAll('.card');

const box = document.querySelector('.box'),
      container = document.querySelector('.container2');

const cardsLeft = document.querySelector('.cards.cards-left');

cards.forEach(card => {
    card.addEventListener('click', () => {
        content.style.transform = 'translateY(-100vh)';
        
        setTimeout(() => {
            box.style.display = 'inline-block';
            content.style.display = 'none';
        }, 500)

        setTimeout(() =>{
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
            cardsLeft.style.display = 'flex';
        }, 600)

    })
})

let currentScript = null;

function loadScript(scriptUrl) {
    if (currentScript) {
        currentScript.parentNode.removeChild(currentScript);
    }

    const script = document.createElement('script');
    script.src = scriptUrl;
    script.onload = () => {
        currentScript = script; 
    };
    
    document.body.appendChild(script); 
}

cards.forEach(card => {
    card.addEventListener('click', () => {
        content.style.transform = 'translateY(-100vh)';

        setTimeout(() => {
            box.style.display = 'inline-block';
            content.style.display = 'none';
        }, 500);
        
        setTimeout(() => {
            box.style.opacity = '1';
            box.style.transform = 'scale(1)';
            cardsLeft.style.display = 'flex';
        }, 600);

        const gameScript = card.getAttribute('data-game');
        loadScript(gameScript);
    });
});