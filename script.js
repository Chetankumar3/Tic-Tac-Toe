let x=1,Win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
],boxes=document.querySelectorAll(".button");
let turnx=document.getElementById("o"),turno=document.getElementById("x"), won=document.getElementById("won");

let Reset=()=>{
    won.style.visibility = "hidden";
    boxes.forEach(function(button){
        button.textContent="";
    });    
    turno.style.borderBottom = "4px solid #a52a2a";
    turnx.style.borderBottom = "2px solid #29146b";
    x=1;
};


function launchConfetti() {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.6 }
    });
}

let winner=()=>{
    let op=0;
    for(let itr of Win){
        let p1=boxes[itr[0]].innerText;
        let p2=boxes[itr[1]].innerText;
        let p3=boxes[itr[2]].innerText;

        if(p1!="" && p1==p2 && p1==p3) return [itr[0],itr[1],itr[2]];
        else if(p1!="" && p2!="" && p3!="") op++;
    }

    if(op==8){
        Reset();
        return "Reset";
    }
    return "Nil";
}

boxes.forEach(function(button){
    button.addEventListener("click",function(){
        if(this.textContent==""){
            if(x&1){
                this.textContent='X',this.style.color="#8F4700";

                turnx.style.borderBottom = "4px solid #a52a2a";
                turno.style.borderBottom = "2px solid #29146b";
            }else{
                this.textContent='O',this.style.color="#29344F";

                turno.style.borderBottom = "4px solid #a52a2a";
                turnx.style.borderBottom = "2px solid #29146b";
            }

            let temp=winner();

            if(temp=="Reset"){ throw new Error("Game Reset"); }
            else if(temp!="Nil"){
                
                let button=document.getElementById("reset");
                button.disabled=true;
                setTimeout(()=>{
                    button.disabled=false;
                },1750);
                
                boxes[temp[0]].style.animation = " Animation 0.5s ease-in-out 0.3s 1 normal";
                boxes[temp[1]].style.animation = " Animation 0.5s ease-in-out 0.6s 1 normal";
                boxes[temp[2]].style.animation = " Animation 0.5s ease-in-out 0.9s 1 normal";
                boxes[temp[0]].style.animationFillMode = "forwards";
                boxes[temp[1]].style.animationFillMode = "forwards";
                boxes[temp[2]].style.animationFillMode = "forwards";

                setTimeout(() => {
                    document.getElementById("congrats").textContent = "CONGRATULATIONS '" + boxes[temp[0]].innerText + "'!!!";
                    won.style.visibility = "visible";
                    launchConfetti();
                }, 1700);
                
                setTimeout(()=> {
                    boxes[temp[0]].style.animation = 'none';
                    boxes[temp[1]].style.animation = 'none';
                    boxes[temp[2]].style.animation = 'none';
                } , 1700);
                x=1;
            }else x++;
        }
    });
});

document.getElementById("reset").addEventListener("click", Reset);
document.getElementById("NewGame").addEventListener("click", Reset);