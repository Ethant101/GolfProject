(function(){
    getCourses();
})();

function getCourses(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let mycourses = JSON.parse(this.responseText);
            let courses = mycourses.courses;
            for(let i = 0; i < courses.length; i++){
                let name = courses[i].name;
                let trimName = name.replace(/\s/g, ""); // gets rid of space
                $(".courseContainer").append(`<div id="${trimName}" class="course">
                                                <div class="courseContent">
                                                    <h1>${name}</h1>
                                                    <p onclick="createCard(${courses[i].id}, 0)">Pro</p>
                                                    <p onclick="createCard(${courses[i].id}, 1)">Champion</p>
                                                    <p onclick="createCard(${courses[i].id}, 2)">Men</p>
                                                    <p onclick="createCard(${courses[i].id}, 3)">Women</p>
                                                </div>
                                            </div>`);
                $('#' + trimName).css("background-image", `url('${courses[i].image}')`);
                console.log(name);

            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function createCard(courseId, index) { //course id is for api https://golf-courses-api.herokuapp.com/courses/:id   <<
    let numholes = 24;
    $(".box").empty();

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let thisCourse = JSON.parse(this.responseText);
            let holes = thisCourse.data.holes;
            // console.log(holes);
            columns(numholes, holes, index);

        }
    };
    xhttp.open("GET", `https://golf-courses-api.herokuapp.com/courses/${courseId}`);
    xhttp.send();
}


function total(row){
    let scoresArr = [];
    for(let i = 0; i < 21; i++){
        switch (i) {
            default:
                if(!(i === 10 || i === 11)){
                    scoresArr.push($(`#Row${row}Col${i} input`).val());
                    break;
                }
        } //append all these values to an array and then add them together to get total
    }
    let outTut = 0;
    let inTut = 0;
    let total = 0;
    for(let j = 1; j < 19; j++){
        if(scoresArr[j] === ''){
            total += 0;
        }
        else {
            if(j < 10){
                outTut += parseInt(scoresArr[j]);
                total += parseInt(scoresArr[j]);
            } else {
                inTut += parseInt(scoresArr[j]);
                total += parseInt(scoresArr[j]);
            }

        }
    }
    $(`#Row${row}Col10`).empty().html(`${outTut}`);
    $(`#Row${row}Col21`).empty().html(`${inTut}`);
    $(`#Row${row}Col22`).empty().html(`${total}`);
    return total;
}

// function message() {
//     let names = [];
//     let scores = [];
//     for (let i = 3; i < 7; i++){
//         names.push($(`Row${i}Col0 input`).val());
//         scores.push($(`Row${i}Col22 input`).val());
//     }
//     $(".message").empty();
//     let parVal = $(`Row7Col22`).val();
//     for(let j = 0; j < scores.length; j++){
//         if(scores[j] < (parVal)){
//             let diff = parVal - scores[j];
//             $(".message").append(`${names[j]} Great Work with -${diff} <br>`);
//         }
//         if(scores[j] === (parVal)){
//             $(".message").append(`${names[j]} Great Work! You met par! <br>`);
//         }
//         else {
//             $(".message").append(`${names[j]} Better luck Next time +${diff} <br>`);
//         }
//     }
//
// }