const sizeTabs = document.querySelectorAll('.size__item'),
      sizeTabActive = document.querySelector('.size--active'),
      blockContainer = document.querySelector('.blocks');


sizeTabs.forEach((sizeTab, i) => {
    sizeTab.addEventListener('click', () =>{
        sizeTabActive.style.transform = `translateX(calc(${i} * 100%))`;
        changeColor(i);

        let cells = (i === 0) ? 4 : (i === 1) ? 5 : 6;
        let totalCells = cells * cells;

        blockContainer.innerHTML = '';

        for(let j = 0; j < totalCells; j++){
          if(cells === 6){
            blockContainer.innerHTML += `<li class="block" style="width: 100px;height: 100px"></li>`;
            blockContainer.style.width = `${cells * 100 + 50}px`;
            blockContainer.style.height = `${cells * 100 + 50}px`;
          }
          else if(cells === 5){
            blockContainer.innerHTML += `<li class="block" style="width: 110px;height: 110px"></li>`;
            blockContainer.style.width = `${cells * 110 + 50}px`;
            blockContainer.style.height = `${cells * 110 + 50}px`;
          }
          else{
            blockContainer.innerHTML += `<li class="block"></li>`;
            blockContainer.style.width = `${cells * 125 + 50}px`;
            blockContainer.style.height = `${cells * 125 + 50}px`;
          }
            // blockContainer.innerHTML += `<li class="block"></li>`;
        }


        // start.style.display = 'inline-block';
        // start.textContent = "START";

        renderGame();
    })
})

function changeColor(i){
    sizeTabs.forEach(sizeTab => {
        sizeTab.style.color = "#000";
    })
    sizeTabs[i].style.color = "#185ee0";
}

////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////

function renderGame(){

const blocks = document.querySelectorAll('.block'),
    start = document.querySelectorAll('.button'),
    result = document.querySelector('.result'),
    scoreText = document.querySelector('.score'),
    recordText = document.querySelector('.record'),
    stats = document.querySelector('.stats');

    start[0].style.visibility = 'visible';
    result.style.display = 'none';

let score = 0;
let order = [];
let playerOrder = [];
recordText.textContent = `Record: ${localStorage.getItem('record')}`;
scoreText.textContent = `Score: ${score}`;

function randomNumberInterval(min, max){
  return Math.floor(Math.random() * (max - min + 1 )) + min;
}

function showOrder(){
  playerOrder = [];
  blocks.forEach(block => {
    block.style.pointerEvents = 'none';
  })
  order.forEach((num, i) => {
      setTimeout(() => {
          blocks[num].classList.add('block--active');
          setTimeout(() => {
              blocks[num].classList.remove('block--active');
          }, 500);
      }, 1000 * i);
  });
  setTimeout(() =>{
    blocks.forEach(block => {
        block.style.pointerEvents = 'auto';
      })
  }, 1000 * order.length)
}

function generateOrder(){                                      
  order.push(randomNumberInterval(0, blocks.length - 1));   
  showOrder();                                               
}
  blocks.forEach((block, i) => {
      block.addEventListener('click', () => {
          if(i === order[playerOrder.length]){
              playerOrder.push(i);
              block.classList.add('block--correct');
              setTimeout(() =>{
                  block.classList.remove('block--correct');
              }, 500);
  
              if(playerOrder.length === order.length){
                  blocks.forEach(block => {
                    block.style.pointerEvents = 'none';
                  })
                  score++;
                  scoreText.textContent = `Score: ${score}`;
                  if(localStorage.getItem('record') < score){
                      localStorage.setItem('record', score);
                      recordText.textContent = `Record: ${localStorage.getItem('record')}`;
                      
                  }
                  setTimeout(generateOrder, 1000);
              }
          }
          else{
              block.classList.add('block--incorrect');
              setTimeout(() => {
                  block.classList.remove('block--incorrect');
              }, 1000);
              blocks.forEach(block => {
                block.style.pointerEvents = 'none';
              })
              order = [];
              scoreText.textContent = `Score: ${score}`;
              record = score;
              result.style.display = 'flex';
            //   start.style.display = 'inline-block';
            //   start.textContent = "RESTART";
          }
      })
  })


  start.forEach((startB, i) => {
    startB.addEventListener('click', () => {
        order = [];
        score = 0;
        scoreText.textContent = `Score: ${score}`;
        generateOrder();
        start[0].style.visibility = 'hidden';
        result.style.display = 'none';
      })
  }) 

// start.addEventListener('click', () => {
//   order = [];
//   score = 0;
//   scoreText.textContent = `Score: ${score}`;
//   generateOrder();
//   start.style.display = 'none';
//   result.style.display = 'none';
//   stats.style.marginTop = '100px';
// })
}

renderGame();