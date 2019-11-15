let numholes = 24;
let numplayers = 4;
let extraRows = 3;

function columns(numholes, holes, index){
    for(let i = 0; i <= numholes; i++){
        switch (i){
            case 0:
                $(".box").append(`<div class="column" id="col${i}">HOLE</div>`);
                break;
            case 10:
                $(".box").append(`<div class="column" id="col${i}">OUT</div>`);
                break;
            case 11:
                $(".box").append(`<div class="column" id="col${i}">P<br>L<br>A<br>Y<br>E<br>R<br>S</div>`);
                //remember to not add rows to this column and flex direction column
                break;
            case 21:
                $(".box").append(`<div class="column" id="col${i}">IN</div>`);
                break;
            case 22:
                $(".box").append(`<div class="column" id="col${i}">TUT</div>`);
                break;
            case 23:
                $(".box").append(`<div class="column" id="col${i}">HCP</div>`);
                break;
            case 24:
                $(".box").append(`<div class="column" id="col${i}">NET</div>`);
                break;
            default:
                if(i > 9){
                    $(".box").append(`<div class="column" id="col${i}">${i-2}</div>`);
                }
                else {
                    $(".box").append(`<div class="column" id="col${i}">${i}</div>`);
                }
                break;
        }
    }//build columns
    buildholdes();
    inBetween(holes, index);//index being pro (0), champion(1), etc;
}

function buildholdes(){
    let totalRows = numplayers + extraRows;
    for(let p = 1; p <= totalRows; p++){
        for(let h = 0; h <= numholes; h++){
            switch (h){
                case 0:
                    //names
                    $("#col" + h).append(`<div id="Row${p}Col${h}" class="minibox Row${p}"><input type="text" placeholder="name"></div>`);
                    break;
                case 11:
                    break;
                default:
                    //scores
                    $("#col" + h).append(`<div id="Row${p}Col${h}" class="minibox Row${p}"><input type="number"></div>`);
                    break;
            }
        }
    }
}

function inBetween(holes, i){
    $(".Row1 input").remove(); //change tee type to be the course.data.holes[i].teeBoxes[i].teeType and change color with course.data.holes[i].teeBoxes[i].teeColorType
    $("#Row1Col0").html(`${holes[i].teeBoxes[i].teeType}`);
    $(".Row1").css({"background-color":`${holes[i].teeBoxes[i].teeColorType}`, "padding":"7px"});
    $(".Row2 input").remove(); //handicap
    $("#Row2Col0").html("HANDICAP").css({"background-color":"#F4F8E1"});
    $(".Row7 input").remove();
    $("#Row7Col0").html("PAR").css({"background-color":"#F4F8E1"});
    let outYd = 0;
    let outPar = 0;
    let inYd = 0;
    let inPar = 0;
    for(let g = 1; g < numholes; g++) {
        if (g <= 9) {
            $(`#Row1Col${g}`).html(holes[g - 1].teeBoxes[i].yards);
            $(`#Row2Col${g}`).html(holes[g - 1].teeBoxes[i].hcp);
            $(`#Row7Col${g}`).html(holes[g - 1].teeBoxes[i].par);
            outYd += holes[g - 1].teeBoxes[i].yards;
            outPar += holes[g - 1].teeBoxes[i].par;
        }
        //in total
        if(g === 10){
            $(`#Row1Col${g}`).html(outYd);
            $(`#Row2Col${g}`).html('_');
            $(`#Row7Col${g}`).html(outPar);
        }
        //adding
        if(g >= 10 && g <= 18) {
            $(`#Row1Col${g + 2}`).html(holes[g - 1].teeBoxes[i].yards);
            $(`#Row2Col${g + 2}`).html(holes[g - 1].teeBoxes[i].hcp);
            $(`#Row7Col${g + 2}`).html(holes[g - 1].teeBoxes[i].par);
            inYd += holes[g - 1].teeBoxes[i].yards;
            inPar += holes[g - 1].teeBoxes[i].par;
        }
        //out total
        if(g === 19) {
            $(`#Row1Col${g + 2}`).html(inYd);
            $(`#Row2Col${g + 2}`).html('_');
            $(`#Row7Col${g + 2}`).html(inPar);
        }
        //total
        if(g === 20) {
            $(`#Row1Col${g + 2}`).html(inYd + outYd);
            $(`#Row2Col${g + 2}`).html('_');
            $(`#Row7Col${g + 2}`).html(inPar + outPar);
        }
    }

    //course.data.holes.teeBoxes.par for the number
}