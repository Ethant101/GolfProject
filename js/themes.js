let lightTheme = true;
function toggleTheme() {
    if(lightTheme === true){
        dark();
        $(".themeBall").animate({left: '30px'});
        lightTheme = false;

    }
    else if(lightTheme === false){
        light();
        $(".themeBall").animate({left: '0px'});
        lightTheme = true;

    }
}

function light() {
    $(".nav").animate({backgroundColor: '#008000'});
    $(".container").css({'background-image': "url('images/background.jpg')"});
    $(".themeBall").css({'box-shadow': '0px 0px 3px 2px #6D6D6D', 'background-color': '#2a2a2a'});
    $(".themeBubble").css('backgroundColor', '#dadfea');
}

function dark(){
    $(".nav").animate({backgroundColor: '#005700'});
    $(".container").css({'background-image': "url('images/darkBackground.jpg')"});
    $(".themeBall").css({'box-shadow': '0px 0px 3px 2px #E0E0E0', 'background-color': '#dadfea'});
    $(".themeBubble").css('backgroundColor', '#2a2a2a');
    $(".minibox input").css({'background-color': '#2a2a2a', 'color': '#dadfea'})
}

