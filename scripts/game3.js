(function () {

    const sizeTabs = document.querySelectorAll('.size__item'),
        sizeTabActive = document.querySelector('.size--active'),
        blockContainer = document.querySelector('.blocks');

        let cells = 4; // По умолчанию 4x4
        sizeTabActive.style.transform = `translateX(0)`;
        changeColor(0);

    sizeTabs[0].textContent = '4x4';
    sizeTabs[1].textContent = '6x6';
    sizeTabs[2].textContent = '8x8';

    sizeTabs.forEach((sizeTab, i) => {
        sizeTab.addEventListener('click', () =>{
            sizeTabActive.style.transform = `translateX(calc(${i} * 100%))`;
            changeColor(i);

            cells = (i === 0) ? 4 : (i === 1) ? 6 : 8;
            

            // blockHandler();
            renderGame3();
        })
    })

    function updateGrid(){
        let totalCells = cells * cells;

            blockContainer.innerHTML = '';
            

            for(let j = 0; j < totalCells; j++){
            if(cells === 8){
                blockContainer.innerHTML += `
                <li class="block" style="width: 80px;height: 80px">
                    <div class="block-face front"></div>
                    <div class="block-face back">Back</div>
                </li> `;
                blockContainer.style.width = `${cells * 80 + 50}px`;
                blockContainer.style.height = `${cells * 80 + 50}px`;

                images = [
                    '<i class="fa-brands fa-facebook"></i>',
                    '<i class="fa-brands fa-instagram"></i>',
                    '<i class="fa-brands fa-youtube"></i>',
                    '<i class="fa-brands fa-tiktok"></i>',
                    '<i class="fa-brands fa-twitter"></i>',
                    '<i class="fa-brands fa-apple"></i>',
                    '<i class="fa-brands fa-google"></i>',
                    '<i class="fa-brands fa-react"></i>',
                    '<i class="fa-brands fa-telegram"></i>',
                    '<i class="fa-brands fa-skype"></i>',
                    '<i class="fa-brands fa-whatsapp"></i>',
                    '<i class="fa-brands fa-microsoft"></i>',
                    '<i class="fa-brands fa-xbox"></i>',
                    '<i class="fa-brands fa-playstation"></i>',
                    '<i class="fa-brands fa-discord"></i>',
                    '<i class="fa-brands fa-ethereum"></i>',
                    '<i class="fa-brands fa-pinterest"></i>',
                    '<i class="fa-brands fa-python"></i>',
                    '<i class="fa-brands fa-x-twitter"></i>',
                    '<i class="fa-brands fa-twitch"></i>',
                    '<i class="fa-brands fa-steam"></i>',
                    '<i class="fa-brands fa-viber"></i>',
                    '<i class="fa-brands fa-spotify"></i>',
                    '<i class="fa-brands fa-amazon"></i>',
                    '<i class="fa-brands fa-linkedin"></i>',
                    '<i class="fa-brands fa-github"></i>',
                    '<i class="fa-brands fa-snapchat"></i>',
                    '<i class="fa-brands fa-chrome"></i>',
                    '<i class="fa-brands fa-edge-legacy"></i>',
                    '<i class="fa-brands fa-angular"></i>',
                    '<i class="fa-brands fa-safari"></i>',
                    '<i class="fa-brands fa-meta"></i>',


                ];
            }
            else if(cells === 6){
                blockContainer.innerHTML += `
                <li class="block" style="width: 110px;height: 110px">
                    <div class="block-face front"></div>
                    <div class="block-face back">Back</div>
                </li> `;
                blockContainer.style.width = `${cells * 110 + 50}px`;
                blockContainer.style.height = `${cells * 110 + 50}px`;

                images = [
                    '<i class="fa-brands fa-facebook"></i>',
                    '<i class="fa-brands fa-instagram"></i>',
                    '<i class="fa-brands fa-youtube"></i>',
                    '<i class="fa-brands fa-tiktok"></i>',
                    '<i class="fa-brands fa-twitter"></i>',
                    '<i class="fa-brands fa-apple"></i>',
                    '<i class="fa-brands fa-google"></i>',
                    '<i class="fa-brands fa-react"></i>',
                    '<i class="fa-brands fa-telegram"></i>',
                    '<i class="fa-brands fa-skype"></i>',
                    '<i class="fa-brands fa-whatsapp"></i>',
                    '<i class="fa-brands fa-microsoft"></i>',
                    '<i class="fa-brands fa-xbox"></i>',
                    '<i class="fa-brands fa-playstation"></i>',
                    '<i class="fa-brands fa-discord"></i>',
                    '<i class="fa-brands fa-ethereum"></i>',
                    '<i class="fa-brands fa-pinterest"></i>',
                    '<i class="fa-brands fa-python"></i>',
                ];
            }
            else{
                blockContainer.innerHTML += `
                <li class="block">
                    <div class="block-face front"></div>
                    <div class="block-face back">Back</div>
                </li> `;
                blockContainer.style.width = `${cells * 125 + 50}px`;
                blockContainer.style.height = `${cells * 125 + 50}px`;

                images = [
                    '<i class="fa-brands fa-facebook"></i>',
                    '<i class="fa-brands fa-instagram"></i>',
                    '<i class="fa-brands fa-youtube"></i>',
                    '<i class="fa-brands fa-tiktok"></i>',
                    '<i class="fa-brands fa-twitter"></i>',
                    '<i class="fa-brands fa-apple"></i>',
                    '<i class="fa-brands fa-google"></i>',
                    '<i class="fa-brands fa-react"></i>'
                ];
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
        blockContainer.innerHTML += `
                <li class="block">
                    <div class="block-face front"></div>
                    <div class="block-face back">Back</div>
                </li> `;
    }

    function renderGame3(){

        updateGrid();

        const blocks = document.querySelectorAll('.block'),
        backsContent = document.querySelectorAll('.block-face.back'),
        result = document.querySelector('.result'),
        start = document.querySelectorAll('.button');
        scoreText = document.querySelector('.score'),
        recordText = document.querySelector('.record'),
        stats = document.querySelector('.stats');


    let arr = [...images, ...images].sort(() => Math.random() - 0.5);

    score = 0;
    scoreText.textContent = '';
    recordText.textContent = '';
    start[0].style.visibility = 'visible';
    result.style.display = 'none';

    let playerChoose = [];
    let indexesofBlocks = new Set();
    let flippedCards = 0;
    let pair = 0;


        blocks.forEach((block, i) => {
            block.addEventListener('click', () => {
        
                if (indexesofBlocks.has(i)) return;
        
                indexesofBlocks.add(i);
                block.classList.add('flipped');
                flippedCards++;        
                playerChoose.push(block.innerHTML); 

            
                let indexesArray = Array.from(indexesofBlocks);

                    if(flippedCards === 2){
                        blocks.forEach(block => {
                            block.style.pointerEvents = 'none';
                        })
                        if(playerChoose[0] === playerChoose[1]){
                            setTimeout(() => {
                                pair++;
                                blocks[indexesArray[0]].style.visibility = 'hidden';
                                blocks[indexesArray[1]].style.visibility = 'hidden';

                                flippedCards = 0;
                                playerChoose = [];
                                indexesofBlocks.clear();
                                // blockContainer.style.pointerEvents = 'auto';
                                blocks.forEach(block => {
                                    block.style.pointerEvents = 'auto';
                                })
                                if(images.length === 8 && pair === 8 || images.length === 18 && pair === 18 || images.length === 32 && pair === 32){
                                    result.style.display = 'flex';
                                }
                            }, 1000)
                        }   
                        else{
                            setTimeout(() => {
                                blocks[indexesArray[0]].classList.remove('flipped');
                                blocks[indexesArray[1]].classList.remove('flipped');
                                flippedCards = 0;
                                playerChoose = [];
                                indexesofBlocks.clear();
                                // blockContainer.style.pointerEvents = 'auto';
                                blocks.forEach(block => {
                                    block.style.pointerEvents = 'auto';
                                })
                            }, 1000);
            
                        }
                    }
            })
        })
    

    function generateGame(){
        arr = [...images, ...images].sort(() => Math.random() - 0.5);
        playerChoose = [];
        indexesofBlocks = new Set();
        flippedCards = 0;
        pair = 0;

        backsContent.forEach((back, i) => {        //рендеримо контент картки
            back.innerHTML = arr[i];
        })
        const iconsElements = blockContainer.querySelectorAll('.block-face.back i');
        iconsElements.forEach(icon => {
            if(cells === 8){
                icon.style.fontSize = '34px'; 
            }
            else{
                icon.style.fontSize = '44px'; 
            }
        });
    }

    start.forEach((startB, i) => {
        startB.addEventListener('click', () => {
            start[0].style.visibility = 'hidden';
            // blockContainer.style.pointerEvents = 'auto';
            scoreText.textContent = '';
            result.style.display = 'none';
            generateGame();
            blocks.forEach(block => {
                block.classList.remove('flipped');
                block.style.pointerEvents = 'auto';
                setTimeout(() => {
                    block.style.visibility = 'visible';
                }, 300);
            })
        })
    })
    }

    renderGame3();
})();
