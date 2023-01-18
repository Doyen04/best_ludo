
window.addEventListener('load' ,function(){
    const main = document.getElementById("main")
    const body = document.getElementsByTagName('body')[0]
    const divs = document.getElementsByClassName('box')
    const button = this.document.getElementsByClassName('button')[0]
    const dices = this.document.getElementsByClassName('dice')

    const run = function(e){
        let elem = this.getAttribute('index')
        input.value += `${elem},`
        console.log(elem)
    }
    
    for(let x = 0 ; x < 225;x++){
        let box = document.createElement('div')
        box.setAttribute('index',x)
        //box.innerHTML = x
        box.classList.add('box')
        main.appendChild(box)
    }

    const paintmain = (arry,elem,color) => {
        arry.forEach((x) =>{
            elem[x].style.backgroundColor = color
            elem[x].style.borderColor = color
        })
    }
    const paintspot = (arry,elem,color) => {
        arry.forEach((x) =>{
            elem[x].style.backgroundColor = color
        })
    }
    
    const greenmain = [0,1,2,3,4,5,15,16,17,18,19,20,30,31,32,33,34,35,45,46,47,48,49,50,60,61,62,63,64,65,75,76,77,78,79,80,]
    const redmain = [9,10,11,12,13,14,24,25,26,27,28,29,39,40,41,42,43,44,54,55,56,57,58,59,69,70,71,72,73,74,84,85,86,87,88,89,]
    const bluemain = [135,136,137,138,139,140,150,151,152,153,154,155,165,166,167,168,169,170,180,181,182,183,184,185,195,196,197,198,199,200,210,211,212,213,214,215,]
    const yellowmain = [144,145,146,147,148,149,159,160,161,162,163,164,174,175,176,177,178,179,189,190,191,192,193,194,204,205,206,207,208,209,219,220,221,222,223,224,]
    const centerspot = [96,97,98,113,111,112,126,127,128,]
    const ignore = [16,17,31,32,18,19,33,34,46,47,61,62,48,49,63,64,25,26,40,41,27,28,42,43,55,56,70,71,57,58,72,73,151,152,166,167,153,154,168,169,181,182,196,197,183,184,198,199,160,161,162,163,175,176,177,178,190,191,205,206,192,193,207,208,]
    paintmain(yellowmain,divs,'yellow')
    paintmain(greenmain,divs,'green')
    paintmain(redmain,divs,'red')
    paintmain(bluemain,divs,'blue')
    paintmain(centerspot,divs,'brown')
    paintmain(ignore,divs,'white')

    const greenspot = [91,106,107,108,109,110,]
    const redspot = [23,22,37,52,67,82,]
    const yellowspot = [133,118,117,116,115,114,]
    const bluespot = [201,202,187,172,157,142,]

    paintspot(bluespot,divs,'blue')
    paintspot(greenspot,divs,'green')
    paintspot(yellowspot,divs,'yellow')
    paintspot(redspot,divs,'red')
    
    let num = 0
    const drawpiece = (arry,elem,color) => {
        const pinpoint = [7,10,25,28]
        pinpoint.forEach((x,index) => {
            let piece = document.createElement('p')
            piece.style.backgroundColor = color
            let elemdata = elem[arry[x]].getBoundingClientRect()
            piece.style.width = `${elemdata.width}px`
            piece.style.height = `${elemdata.height}px`
            piece.classList.add('piece')
            piece.innerHTML = num
            piece.setAttribute('index',num)
            if(index % 2 == 0){
                piece.style.left = `${elemdata.left+(elemdata.width/2)}px`
            }else{
                piece.style.left = `${elemdata.left-(elemdata.width/2)}px`
            }if(index < 2){
                piece.style.top = `${elemdata.top+(elemdata.height/2)}px`
            }else{
                piece.style.top = `${elemdata.top-(elemdata.height/2)}px`
            }
            body.appendChild(piece)
            num++ 
        })
    }
    drawpiece(redmain,divs,'red')
    drawpiece(greenmain,divs,'green')
    drawpiece(bluemain,divs,'blue')
    drawpiece(yellowmain,divs,'yellow')

    const greenmove = [91,92,93,94,95,81,66,51,36,21,6,7,8,23,38,53,68,83,99,100,101,102,103,104,119,134,133,132,131,130,129,143,158,173,188,203,218,217,216,201,186,171,156,141,125,124,123,122,121,120,105,106,107,108,109,110,]
    const redmove = [23,38,53,68,83,99,100,101,102,103,104,119,134,133,132,131,130,129,143,158,173,188,203,218,217,216,201,186,171,156,141,125,124,123,122,121,120,105,90,91,92,93,94,95,81,66,51,36,21,6,7,22,37,52,67,82,]
    const bluemove = [201,186,171,156,141,125,124,123,122,121,120,105,90,91,92,93,94,95,81,66,51,36,21,6,7,8,23,38,53,68,83,99,100,101,102,103,104,119,134,133,132,131,130,129,143,158,173,188,203,218,217,202,187,172,157,142,]
    const yellowmove = [133,132,131,130,129,143,158,173,188,203,218,217,216,201,186,171,156,141,125,124,123,122,121,120,105,90,91,92,93,94,95,81,66,51,36,21,6,7,8,23,38,53,68,83,99,100,101,102,103,104,119,118,117,116,115,114,]
    const pieces = {'red':[0,1,2,3],'green':[4,5,6,7],'blue':[8,9,10,11],'yellow':[12,13,14,15]}
    let index = 0
    
    class piece{
        coords = []
        turnPieces = []
        fampieces = []
        path = []
        pos = -1 
        pieceid = -1
        piece = null
        pieceColor = null
        isOut = false
        isWon = false
        turndata = null
        constructor(id,piece,turnd,pieces,path,fmpiece,color){
            this.pieceid = id
            this.piece = piece
            this.turndata = turnd
            this.turnPieces = pieces
            this.path = path
            this.fampieces = fmpiece
            this.pieceColor = color
            this.coords = [piece.getBoundingClientRect().top,piece.getBoundingClientRect().left]
            //console.log(id,turnd,pieces,fmpiece,color,this.coords) 
        }
    }
    class Game{
        pathList = {}
        piecesdata = []
        pieces = []
        diceval = []
        moves = []
        divelem = null
        paraelem = null
        currp = null
        turn = false
        constructor(plist,pobj,elem){
            this.pathList = plist
            this.piecesdata = pobj
            this.divelem = elem
            this.test()
            let p = [3,0]
            let k = [3,6]
            p.splice(p.indexOf(0),1)
            k.splice(p.indexOf(0),1)

            console.log(p,k,8)
        }
        test(){
            //console.log(this.pathList,this.piecesdata)
            this.paraelem  = document.getElementsByTagName('p')
            let compiece = []
            for (const x in this.piecesdata){
                this.piecesdata[x].forEach((p)=>{
                    let tdata = (x == 'blue' || x == 'yellow')? false : true
                    if(x == 'blue' || x == 'yellow'){
                        compiece.push(...this.piecesdata['blue'])
                        compiece.push(...this.piecesdata['yellow'])
                    }else{
                        compiece.push(...this.piecesdata['red'])
                        compiece.push(...this.piecesdata['green'])
                    }
                    let temp = new piece(p,this.paraelem[p],tdata,this.piecesdata[x],this.pathList[x],compiece,x)
                    this.pieces.push(temp)
                    compiece = []
                })
            }
            let temp = this.divelem[this.pieces[9].path[55]].getBoundingClientRect()
            this.pieces[9].piece.style.top = `${temp.top}px`
            this.pieces[9].piece.style.left = `${temp.left}px`
            this.pieces[9].isOut = true
            this.pieces[9].pos = 55
            let dices = document.getElementsByClassName('dice')
            this.addevent({'button':[0,1,2]},dices,this.move,this)
            this.addevent(this.piecesdata,this.paraelem,this.possiblemove,this)    
        }
        checkWinner(){
            let enemy = 0
            let friend = 0
            this.pieces.forEach((p)=>{
                if(p.turndata && !p.isWon){
                    enemy += 1
                }else if(!p.turndata && !p.isWon){
                    friend += 1
                }
            })
            console.log(enemy,friend)
            if(friend == 0){
                alert('friend won')
            }else if(enemy == 0){
                alert('enemy won')
            }
        }
        capture(){
            if(this.moves == '' ||this.moves.some((s)=> s == 6)|| this.pieces.some((p)=> p.turndata == this.turn && p.isOut && p.pieceid != this.currp.pieceid)){
                this.pieces.forEach((x)=>{
                    if (this.currp != null && x.turndata != this.currp.turndata ) {
                        let pcrds = this.currp.piece.style
                        let ecrds = x.piece.style 
                        if(ecrds.top == pcrds.top && ecrds.left == pcrds.left){
                            ecrds.top = `${x.coords[0]}px`
                            ecrds.left = `${x.coords[1]}px`
                            x.isOut = false
                            x.pos = -1
                            pcrds.display = 'none'
                            pcrds.top = `${this.currp.coords[0]}px`
                            pcrds.left = `${this.currp.coords[1]}px`
                            this.currp.isOut = false
                            this.currp.pos = -1
                            this.currp.isWon = true
                            this.currp = null
                        }
                    }
                })
            }
            this.pieces.forEach((r)=>{
                if(r.pos == 55){
                    let token = r.piece.style
                    token.top = `${r.coords[0]}px`
                    token.left = `${r.coords[1]}px`
                }
            })
            this.checkWinner()
            console.log('cap')
        }
        move(htthis,clthis){
            let mindex;
            let index;
            if(clthis.currp != null && clthis.currp.turndata == clthis.turn){
                index = parseInt(htthis.textContent)
                index = (!clthis.currp.isOut && index==6)? 0 : index;
                mindex = (clthis.currp.isOut)? index+clthis.currp.pos : index
                
            }
            console.log('to',mindex,clthis.moves,index,clthis.diceval)
            if(clthis.moves != '' && clthis.diceval != '' && clthis.currp.turndata == clthis.turn){
                let crd = clthis.divelem[clthis.currp.path[mindex]].getBoundingClientRect()
                if (clthis.moves.some((x)=> x == index)) {
                    clthis.currp.piece.style.left = `${crd.left}px`
                    clthis.currp.piece.style.top = `${crd.top}px`
                    clthis.currp.isOut = true
                    clthis.currp.pos = mindex
                
                    let max = Math.max(...clthis.moves)
                    console.log(max,index)
                    let del = clthis.moves.indexOf(index)
                    if(index == max){
                        clthis.moves = []
                        clthis.diceval = []
                        dices[0].innerHTML = ''
                        dices[1].innerHTML = ''
                        dices[2].innerHTML = ''
                        dices[2].style.display = 'none'
                    }else if(clthis.moves.length == 2){
                        clthis.moves.splice(del,1)
                        clthis.diceval.splice(del,1)
                        dices[del].innerHTML = ''
                    }else{console.log('using 3',max,del)
                        clthis.moves.splice(clthis.moves.indexOf(max),1)
                        clthis.moves.splice(del,1)
                        clthis.diceval.splice(del,1)
                        dices[del].innerHTML = ''
                        dices[2].innerHTML = ''
                        dices[2].style.display = 'none'
                        console.log('three array out')
                    }
                    clthis.capture()
                    console.log('max',max,'|',mindex,'array mve',clthis.moves,clthis.diceval)
                    if(clthis.diceval == '' && clthis.moves == ''){
                        clthis.turn = !clthis.turn
                        clthis.currp = null
                        console.log('turning')
                    } 
                    clthis.clean()
                }
            }
        }

        //solve error of almost home 
        possiblemove(htmlthis,clthis){clthis.clean()


            let index = parseInt(htmlthis.getAttribute('index'))
            if(clthis.pieces[index].turndata == clthis.turn){
                clthis.currp = clthis.pieces[index]
            }else{return}
         
            if(clthis.currp.turndata == clthis.turn && clthis.diceval != '' ){
                
                if(!clthis.currp.isOut && clthis.diceval.some((x)=> x==6)){
                    let ct = 0
                    let tmp = []
                    let num = 0
                    clthis.diceval.forEach((l)=>{
                        if(ct == 0 && l == 6){
                            ct += 1;num = 0
                        }else{
                            num = l
                        }tmp.push(num)
                        clthis.moves = tmp
                    })
                }else if(clthis.currp.isOut ){
                    clthis.moves = []
                    clthis.diceval.forEach((d)=>{
                        if(clthis.currp.path[d+clthis.currp.pos] != undefined){
                            clthis.moves.push(d)
                        }
                    })

                    if(clthis.moves.length == 2){
                        let sum = 0
                        clthis.diceval.forEach((x)=>{
                            sum += x
                        })
                        let total = document.getElementById('hide')
                        total.style.display = 'flex'
                        total.innerText = sum
                        clthis.moves.push(sum)
                        console.log(sum,total) 
                    }
                    //dont add if very clse to the end of house
                }else{
                    clthis.moves = []
                }
                
                console.log('rema of moves and dice',clthis.moves,clthis.diceval) 
                clthis.paintmove(clthis.moves) 
            }
            
        }
        clean(){
            for(let x = 0; x < 225; x++){
                this.divelem[x].innerHTML = '' 
            };
        }
        paintmove(array){
            array.forEach((x) => {
                if(this.currp.isOut){
                    x += this.currp.pos
                }
                this.divelem[this.currp.path[x]].innerHTML = 'o'
            });
        }
        addevent(objarray,elem,func,g){
            let check = [-1]
            for (const key in objarray) {
                objarray[key].forEach((n)=>{
                    if(!check.some((c)=> c == n)){
                        elem[n].addEventListener('click',function(e){
                            let elem = this;
                            func(elem,g)
                        },false)
                        check.push(n)
                    }
                })
            }
        }
    }
    const pathobj = {'green':greenmove,
                'red':redmove,'blue':bluemove,'yellow':yellowmove}
    let game = new Game(pathobj,pieces,divs)
    
    //const button = this.document.getElementsByClassName('button')[0]
    
    button.addEventListener('click',function(e){
        let rand =  /*[6,4]*/[Math.floor(Math.random()*6)+1,Math.floor(Math.random()*6)+1]
        dices[0].innerHTML = rand[0]
        dices[1].innerHTML = rand[1]
        let out = 0
        console.log(rand.every((p)=> p < 6))
        game.pieces.forEach((x)=>{
            if(x.turndata == game.turn && x.isOut && rand.every((p)=> p < 6)){
                out += 1
            }else if(x.turndata == game.turn && rand.some((p)=> p == 6)){
                out += 1
            }
        })
        rand = (out == 0)? [] : rand ;
        game.diceval = /*[6,4]*/rand
        console.log(rand,out)
    })
})//capture and end game
