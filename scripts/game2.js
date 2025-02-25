(function () {

    const sizeTabs = document.querySelectorAll('.size__item'),
        sizeTabActive = document.querySelector('.size--active'),
        blockContainer = document.querySelector('.blocks');

    let cells = 4;
    sizeTabActive.style.transform = `translateX(0)`;
    changeColor(0);

    sizeTabs[0].textContent = '4x4';
    sizeTabs[1].textContent = '5x5';
    sizeTabs[2].textContent = '6x6';

    sizeTabs.forEach((sizeTab, i) => {
        sizeTab.addEventListener('click', () =>{
            sizeTabActive.style.transform = `translateX(calc(${i} * 100%))`;
            changeColor(i);

            cells = (i === 0) ? 4 : (i === 1) ? 5 : 6;


            renderGame2();
        })
    })

    function updateGrid(){
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
            }
    }

    function changeColor(i){
        sizeTabs.forEach(sizeTab => {
            sizeTab.style.color = "#000";
        })
        sizeTabs[i].style.color = "#185ee0";
    }

    blockContainer.innerHTML = '';
    for(let i = 0; i < 16; i++){
        blockContainer.innerHTML += `<li class="block"></li>`;
    }

    function renderGame2(){

        updateGrid();

        const blocks = document.querySelectorAll('.block'),
        start = document.querySelectorAll('.button'),
        result = document.querySelector('.result'),
        scoreText = document.querySelector('.score'),
        recordText = document.querySelector('.record'),
        stats = document.querySelector('.stats');

        if(!localStorage.getItem('record_card-pick')){
            localStorage.setItem('record_card-pick', 0);
        }

        let playerOrder = new Set();
        let randomArr = [];
        let score = 0;
        scoreText.textContent = `SCORE: ${score}`;
        let level = 3;
        let levelChanger = 0;
        recordText.textContent = `RECORD: ${localStorage.getItem('record_card-pick') || 0}`;


        start[0].style.visibility = 'visible';
        result.style.display = 'none';

        function generateOrder(){
            if(levelChanger === level){
                level++;
                levelChanger = 0;
            }
            levelChanger++;
            playerOrder.clear();
            randomArr = getRandom(level, blocks.length - 1);
            for(let i = 0; i < level; i++){
                blocks[randomArr[i]].classList.add('block--active');
                setTimeout(() => {
                    blocks[randomArr[i]].classList.remove('block--active');
                    blocks.forEach(block => {
                        block.style.pointerEvents = 'auto';
                    })
                }, 1000)
            }
            // console.log(randomArr);
        }

            blocks.forEach((block, i) => {
                block.addEventListener('click', () => {
                    
                    if(randomArr.includes(i)){
                        playerOrder.add(i);
                        // console.log(playerOrder);
                        blocks[i].classList.add('block--correct');
        
                        if(playerOrder.size === randomArr.length){
                            score++;
                            scoreText.textContent = `SCORE: ${score}`;
                            if(localStorage.getItem('record_card-pick') < score){
                                localStorage.setItem('record_card-pick', score);
                            }
                            recordText.textContent = `RECORD: ${localStorage.getItem('record_card-pick')}`; 
                            blocks.forEach(block => {
                                block.style.pointerEvents = 'none';
                                setTimeout(() => {
                                    block.classList.remove('block--correct');
                                }, 1000);
                            })
                            setTimeout(() => {
                                generateOrder();
                            }, 1500);
                        }
                    }
                    else{
                        blocks[i].classList.add('block--incorrect');
                        setTimeout(() => {
                            blocks[i].classList.remove('block--incorrect');
                        }, 1000);
                        result.style.display = 'flex';
                        blocks.forEach(block => {
                            block.style.pointerEvents = 'none';
                            block.classList.remove('block--correct');
                        })
                    }
                })
            })

            
    start.forEach((startB) => {
        startB.addEventListener('click', ()=> {
            level = 3;
            levelChanger = 0;
            score = 0;
            scoreText.textContent = `SCORE: ${score}`;
            generateOrder();
            start[0].style.visibility = 'hidden';
            result.style.display = 'none';
            // console.log('start');
            
        });
    });

    function getRandom(count, maxNumber){
        let arr = new Set();
        while(arr.size < count){
            arr.add(randomNumberInterval(0, maxNumber))
        }
        return [...arr];
    };


    function randomNumberInterval(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    }

    renderGame2();

})();