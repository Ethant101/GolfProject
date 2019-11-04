(function(){
    getCourses();
})();

function getCourses(){
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            mycourses = JSON.parse(this.responseText);
            let courses = mycourses.courses;
            for(let i = 0; i < courses.length; i++){
                let name = courses[i].name;
                let trimName = name.replace(/\s/g, "");
                $(".courseContainer").append(`<div id="${trimName}" class="course">
                                                <div class="courseContent">
                                                    <h1>${name}</h1>
                                                    <p>Mens</p>
                                                    <p>Womens</p>
                                                    <p>Pro</p>
                                                    <p>Ameteur</p>
                                                </div>
                                            </div>`);
                $('#' + trimName).css("background-image", `url('${courses[i].image}')`); //need to figure out how to target trimName
                //$(trimName).css("background-image", `url("${courses[i].image}"`);
                console.log(name);

            }
        }
    };
    xhttp.open("GET", "https://golf-courses-api.herokuapp.com/courses", true);
    xhttp.send();
}

function createCard(type){

}