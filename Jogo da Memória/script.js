const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = document.getElementById('placar');
let pontos = 0;
let pares = 0;

let r = confirm("Bem vindo ao Jogo da Memória!\nVocê recebe 100 pontos por acerto e perde 50 por erro.\nClique em OK para jogar!")

if ( r === true) {
    start();
}

function start(){
    
    function flipCard() {
        if(lockBoard) return;
        if(this === firstCard) return;
        
        this.classList.add('flip'); /* add adiciona a classe apenas uma vez, toggle adiciona e remove toda vez*/
        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }
        
        secondCard = this;
        hasFlippedCard = false;
        checkForMatch();
    }
    
    function checkForMatch() {
        if (firstCard.dataset.card === secondCard.dataset.card) {
            disableCards();
            pontos += 100;
            atualizaPlacar(pontos);
            pares++;
            if (pares === 6 ){
                gameOver();
            }
            return;
        }
        
        unflipCards();
    }
    
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        
        resetBoard();
    }
    
    function unflipCards() {
        lockBoard = true;
        
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            pontos -=50;            
            atualizaPlacar(pontos);
            resetBoard();
        }, 1500)
    }
    
    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }
    
    (function shuffle(){
        cards.forEach((card) => {
            let randomPosition = Math.floor(Math.random() * 12);
            card.style.order = randomPosition;
        })
    })();
    
    cards.forEach((card) => {
        card.addEventListener('click', flipCard)
    });
    
    function gameOver() {  

        let x = confirm("Parabéns! Seu placar é de " + pontos + " pontos!");
        if(x === true) {
            window.location.reload();
        } else {
            alert('Recarregue a página quando estiver pronto para jogar novamente!')
        }        
    }    

    function atualizaPlacar(pontos){
        score.innerHTML = pontos;
    }

}