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
        demoLink: "https://www.google.com",
        projectID: 1
    },
    {
        title: "Project 2",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://www.cnn.com",
        projectID: 2
    },
    {
        title: "Project 3",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://www.nyt.com",
        projectID: 3
    },
    {
        title: "Project 4",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://www.espn.com",
        projectID: 4
    },
    {
        title: "Project 5",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://www.politico.com",
        projectID: 5
    }];


})();
