(function() {

    var main = document.querySelector(".main-body");
    var $tileList = $('.project-list');
    var projectTiles = Array.from(document.querySelectorAll(".project-list__project"));
    var title = document.querySelector(".portfolio-header");
    var description = document.querySelector(".project-description");
    var loadAnimations = Array.from(document.querySelectorAll(".load-hidden"));
    var $flipper = $('.flipper');
    var $front = $('.front');
    var $back = $('.back');
    var selected = false;


    window.addEventListener("load", function(event) {
        loadAnimations.forEach( function(element, index) {
            element.classList.remove("load-hidden");
        });
    });

    //tiles
    $tileList.on('click', ".project-list__project", function(event) {
        event.preventDefault();
        var $clickedTile = $(event.currentTarget);
        var projectID = $clickedTile.data('project-id');
        var selectedProjectObject;

        //get corresponding project object
        for(var i = 0; i < projectObject.length; i++) {
            if(projectID === projectObject[i].projectID) {
                selectedProjectObject = projectObject[i];
            }
        }

        //set classes
        $clickedTile.siblings('.project-list__project').removeClass('selected');
        $clickedTile.addClass('selected');
        $(projectTiles).find('.selected-project-scanner').removeClass("selected-project-scanner--shown");
        $clickedTile.find('.selected-project-scanner').addClass('selected-project-scanner--shown');

        //add demo button to both front and back
        if(!selected) {
           var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');
           $back.append(demoButton);
            setTimeout(function() {
                var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');
                $front.append(demoButton);
            }, 1000);
        }
        selected = true;

        //flip and change description
        if($front.hasClass('visible-side')) {
            //change info on back side, change visible-side class to back side, flip to back
            console.log(projectObject.title);
            console.log(projectObject.description);
            $back.find('.project-description__project-title').text(selectedProjectObject.title);
            $back.find('.project-description__project-caption').text(selectedProjectObject.description);
            $back.find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

            $front.removeClass('visible-side');
            $back.addClass('visible-side');

            $flipper.addClass('flipped');
        } else {
            //change info on front side, change visible-side class to front side, flip to front
            $front.find('.project-description__project-title').text(selectedProjectObject.title);
            $front.find('.project-description__project-caption').text(selectedProjectObject.description);
            $front.find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

            $back.removeClass('visible-side');
            $front.addClass('visible-side');

            $flipper.removeClass('flipped');
        }

    });



    var projectObject = [{
        title: "Bov Academy Student Site",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "https://students.bovacademy.com/",
        projectID: 1
    },
    {
        title: "Evolution UI Framework",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "https://evolution-ui.github.io/evolution-ui/",
        projectID: 2
    },
    {
        title: "Developer Profile",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/updated-bov-academy-portfolio/",
        projectID: 3
    },
    {
        title: "Tic Tac Toe",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-08-Art-of-Modern-Frontend-Development/Chapter-02-Mastering-jQuery/Project-2-tic-tac-toe/",
        projectID: 4
    },
    {
        title: "Jigsaw Puzzle",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/Chapter-04-JavaScript-Events-In-Depth/Project-2-Jigsaw-Puzzle/",
        projectID: 5
    }];


})();
