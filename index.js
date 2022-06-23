const playerNumber = document.getElementById('player-number');
const treasureNumber = document.getElementById('treasure-number');
const description = document.getElementById('description');
const descriptionParagraph = document.getElementById('description-paragraph');
const start = document.getElementById('start');
const table = document.querySelector('table')
const actual = document.getElementById('actual')
const megjegyzes = document.getElementById('megjegyzes');
const help = document.getElementById('help');
const round = document.getElementById('round');

let listI = []
let listJ = []

let playersList=[]

let roundNumber=0;

playerNumber.addEventListener('input', function (e) {
    treasureNumber.max = (24 / e.target.value)
});


description.addEventListener('click', function (e) {
    descriptionParagraph.style.visibility = "visible"
    table.style.visibility = "hidden"
    
    clearTable()
})

let actualField
let actualFieldObject

start.addEventListener('click', function (e) {
    descriptionParagraph.style.visibility = "hidden";
    table.style.visibility = "visible"
    description.style.visibility = "hidden"
    start.style.visibility = "hidden"
    help.style.visibility = "visible"
    round.style.visibility = "visible"

    for (let i = 0; i < treasureNumber.value * playerNumber.value; ++i) {
        let aktNevI
        let aktNevJ
        let boolean = 0
        do {
            boolean = 0
            aktNevI = Math.floor(Math.random() * 7);
            aktNevJ = Math.floor(Math.random() * 7);
            for (let j = 0; j < i; ++j) {
                if (listI[j] == aktNevI && listJ[j] == aktNevJ) {
                    boolean = 1
                }
            }
        } while ((aktNevI == 0 && (aktNevJ == 0 || aktNevJ == 6)) || (aktNevJ == 0 && aktNevI == 6) || (aktNevJ == 6 && aktNevI == 6) || boolean == 1)
        listI.push(aktNevI)
        listJ.push(aktNevJ)
    }
    console.log(listI);
    console.log(listJ);


    generateMatrix()
    generatePlayersList()
    generateTable();
    

})

actual.addEventListener('click',function(e){
    
    rot = actualFieldObject.rotation
    rot += 90;
    if (rot === 360) {
        rot = 0;
    }
    actualFieldObject.rotation = rot
    actualFieldObject.forgat()
   
    clearTable()
    generateTable()
})





figure=false

let playerX
let playerY


table.addEventListener('click', function (e) {
    let x
    let y
    if(e.target.className=="player"){
        console.log(xKoord(e.target.parentElement));
        console.log(yKoord(e.target.parentElement));
        x=xKoord(e.target.parentElement)
        y=yKoord(e.target.parentElement)
        playerX=y
        playerY=x
        figure=true
        
        
    }
    else if(figure){
        if (e.target.matches('td')) {
            console.log(xKoord(e.target));
            console.log(yKoord(e.target));
            x=xKoord(e.target)
            y=yKoord(e.target)
        }
        if (e.target.parentElement.matches('td')) {
            console.log(xKoord(e.target.parentElement));
            console.log(yKoord(e.target.parentElement));
            x=xKoord(e.target.parentElement)
            y=yKoord(e.target.parentElement)
        }
    
        [x,y]=[y,x]

        

        if(playerX==x-1 && playerY==y && board[playerY*7+playerX].doors[2] && board[y*7+x].doors[0]){
            megjegyzes.innerHTML=""
            

            if(playersList[roundNumber%playerNumber.value].px==playerX && playersList[roundNumber%playerNumber.value].py==playerY){
                playersList[roundNumber%playerNumber.value].px+=1
                roundNumber++
            }

            
            clearTable();
            generateTable();
            
            figure=false
        }
        else if(playerX==x+1 && playerY==y && board[playerY*7+playerX].doors[0] && board[y*7+x].doors[2]){
            megjegyzes.innerHTML=""
           
            if(playersList[roundNumber%playerNumber.value].px==playerX && playersList[roundNumber%playerNumber.value].py==playerY){
                playersList[roundNumber%playerNumber.value].px-=1
                roundNumber++
            }
            clearTable();
            generateTable();
            
            figure=false
        }
        else if(playerX==x && playerY==y+1 && board[playerY*7+playerX].doors[3] && board[y*7+x].doors[1]){
            megjegyzes.innerHTML=""
           
            if(playersList[roundNumber%playerNumber.value].px==playerX && playersList[roundNumber%playerNumber.value].py==playerY){
                playersList[roundNumber%playerNumber.value].py-=1
                roundNumber++
            }
            clearTable();
            generateTable();
            
            figure=false
        }
        else if(playerX==x && playerY==y-1 && board[playerY*7+playerX].doors[1] && board[y*7+x].doors[3]){
            megjegyzes.innerHTML=""
            
            if(playersList[roundNumber%playerNumber.value].px==playerX && playersList[roundNumber%playerNumber.value].py==playerY){
                playersList[roundNumber%playerNumber.value].py+=1
                roundNumber++
            }
            clearTable();
            generateTable();
            
            figure=false
        }
        else{
            megjegyzes.innerHTML="Nem szomszédos mező vagy nem tudsz ide lépni! Kattints újra!"
            figure=false
        }

        
        
    }
    else{
    

    
    if (e.target.matches('td')) {
        console.log(xKoord(e.target));
        console.log(yKoord(e.target));
        x=xKoord(e.target)
        y=yKoord(e.target)
    }
    if (e.target.parentElement.matches('td') && e.target.className=="field") {
        console.log(xKoord(e.target.parentElement));
        console.log(yKoord(e.target.parentElement));
        x=xKoord(e.target.parentElement)
        y=yKoord(e.target.parentElement)
    }

    [x,y]=[y,x]

    if((x==0 && y%2!=0) || (y==0 && x%2!=0) || (x==6 && y%2!=0) || (y==6 && x%2!=0)){
        console.log("JÓ");

        if(x==0){
            tmp=actualFieldObject
            actualFieldObject=board[y*7+6]
            for(let i=y*7+6;i>y*7;--i){
                board[i]=board[i-1]
            }
            board[y*7]=tmp
            clearTable()
            generateTable()

        }
        else if(x==6){
            tmp=actualFieldObject
            actualFieldObject=board[y*7]
            for(let i=y*7;i<y*7+6;++i){
                board[i]=board[i+1]
            }
            board[y*7+6]=tmp
            clearTable()
            generateTable()
        }
        else if(y==0){
            tmp=actualFieldObject
            actualFieldObject=board[42+x]
            for(let i=42+x;i>x;i=i-7){
                board[i]=board[i-7]
            }
            board[x]=tmp
            clearTable()
            generateTable()
        }
        else if(y==6){
            tmp=actualFieldObject
            actualFieldObject=board[x]
            for(let i=x;i<42+x;i=i+7){
                board[i]=board[i+7]
            }
            board[42+x]=tmp
            clearTable()
            generateTable()
        }

    }
    }
    


})



function rotateImg(i, j) {

    rotation = board[i * 7 + j].rotation
    rotation += 90;
    if (rotation === 360) {
        rotation = 0;
    }
    board[i * 7 + j].rotation = rotation
    return 'rotate(' + rotation + 'deg)'
}


first=true
first2=true




function generateTable() {

    /*if(roundNumber%4==0){
        round.innerHTML="A kék játékos lép."
    }
    else if(roundNumber%4==1){
        round.innerHTML="A sárga játékos lép."
    }
    else if(roundNumber%4==2){
        round.innerHTML="A zöld játékos lép."
    }
    else{
        round.innerHTML="A piros játékos lép."
    }
*/
    for(let i=0;i<playerNumber.value;++i){
        temp=roundNumber%playerNumber.value
        if(temp==0){
            round.innerHTML="A kék játékos lép."
        }
        else if(temp==1){
            round.innerHTML="A sárga játékos lép."
        }
        else if(temp==2){
            round.innerHTML="A zöld játékos lép."
        }
        else if(temp==3){
            round.innerHTML="A piros játékos lép."
        }
    }


    let playerNum = 0
    let treasureNumber = 1

    for (let j = 0; j < 7; j++) {
        let tr = document.createElement("tr")
        for (let i = 0; i < 7; i++) {
            let td = document.createElement("td")
            var img = document.createElement('img');
            img.classList.add("field")


            for (let k = 0; k < listI.length; ++k) {
                if (listI[k] == i && listJ[k] == j) {
                    var treasure = document.createElement("p")
                    treasure.innerHTML = treasureNumber
                    treasureNumber++
                }
            }

            
             for(let u=0;u<playerNumber.value;++u){
                 if(playersList[u].px==j && playersList[u].py==i){
                    var player = document.createElement('img');
                    player.classList.add("player")
                    player.setAttribute('src', '' + playersList[u].src + '')
                    td.appendChild(player)
                 }
             }
                
            
            



            img.setAttribute('src', '' + board[i * 7 + j].src + '')
            img.style.transform = 'rotate(' + board[i * 7 + j].rotation + 'deg)'
            
            

            if(first){
                //img.style.transform = 'rotate('+board[i*7+j]+'deg)'
                //-------------------------------------------------------------------
                if (((i == 2 || i == 4) && j == 0) || (i == 4 && j == 2) || (i == 6 && j == 6)) {
                    img.style.transform = rotateImg(i, j)
                    img.style.transform = rotateImg(i, j)
                    board[i * 7 + j].forgat();
                    board[i * 7 + j].forgat();
                }
                else if ((i == 0 && (j == 2 || j == 4)) || (i == 2 && j == 2) || (i == 6 && j == 0)) {
                    img.style.transform = rotateImg(i, j)
                    board[i * 7 + j].forgat();
                }
                else if ((i == 6 && (j == 2 || j == 4)) || (i == 0 && j == 6) || (i == 4 && j == 4)) {
                    img.style.transform = rotateImg(i, j)
                    img.style.transform = rotateImg(i, j)
                    img.style.transform = rotateImg(i, j)
                    board[i * 7 + j].forgat();
                    board[i * 7 + j].forgat();
                    board[i * 7 + j].forgat();
                }
                //-------------------------------------------------------------------
                else if (i % 2 != 0 || j % 2 != 0) {
                    randomNumber = Math.floor(Math.random() * 4);
                    for (let u = 0; u < randomNumber; ++u) {
                        img.style.transform = rotateImg(i, j)
                        board[i * 7 + j].forgat();
                    }
                }
                first=false
                
            }
            

            for (let k = 0; k < listI.length; ++k) {
                if (listI[k] == i && listJ[k] == j) {
                    td.appendChild(treasure)
                }
            }


            td.appendChild(img)
            tr.appendChild(td)

        }
        table.appendChild(tr)
    }
    
    if(first2){
        actualField = document.createElement('img')
        actualFieldObject = random.pop()
        first2=false
    }
    actualField.setAttribute('src', '' + actualFieldObject.src + '')
    actualField.style.transform = 'rotate(' + actualFieldObject.rotation + 'deg)'
    actual.appendChild(actualField)
}


function clearTable() {
    table.innerHTML = ""
}




function generateMatrix() {
    board = [];
    randomMax = 34
    for (let i = 0; i < 49; i++) board[i] = [];
    for (let i = 0; i < 7; ++i) {
        for (let j = 0; j < 7; ++j) {
            if (i % 2 == 0 && j % 2 == 0) {
                board[i * 7 + j] = fix.pop()
            }
            else {
                randomNumber = Math.floor(Math.random() * randomMax);
                --randomMax
                board[i * 7 + j] = random.at(randomNumber)
                random[randomNumber] = random.pop()


            }
        }
    }

}


function xKoord(td) {
    const x = td.cellIndex
    const tr = td.parentNode
    //const y =  tr.sectionRowIndex
    return x
}

function yKoord(td) {
    //const x =  td.cellIndex
    const tr = td.parentNode
    const y = tr.sectionRowIndex
    return y
}


function generatePlayersList(){
    
    for (let i = 0; i < 4; i++) {
        playersList[i] = players.pop()
        console.log(playersList[i]);
    }
}


const players = [
    {
        src:"player4.png", px:6,py:6
    },
    {
        src:"player3.png", px:6,py:0
    },
    {
        src:"player2.png", px:0,py:6
    },
    {
        src:"player1.png", px:0,py:0
    }
]


const fix = [
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
]


const random = [
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso3.png", rotation: 0, doors: [true, false, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso2.png", rotation: 0, doors: [false, true, true, false], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
    {
        src: "cso1.png", rotation: 0, doors: [true, true, false, true], forgat: function () {
            doors=this.doors
            tmp=doors[3]
            for(let i=3;i>0;--i){
                doors[i]=doors[i-1]
            }
            doors[0]=tmp
            this.doors=doors
        }
    },
]