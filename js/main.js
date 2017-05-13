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

        //if tile is already selected, remove selected class and reset description block
        if($clickedTile.hasClass('selected')) {
            projectID = 0;
            for(var i = 0; i < projectObject.length; i++) {
                if(projectID === projectObject[i].projectID) {
                    selectedProjectObject = projectObject[i];
                }
            }
            //disable clicked tile for a couple seconds
             togglePointerEvents($(projectTiles));

            $clickedTile.removeClass('selected');

            if($back.hasClass('visible-side')) {
                $front.find('.project-description__demo-button').remove();
                setTimeout(function() {
                    $back.find('.project-description__demo-button').remove();
                }, 1000);
            } else {
                $back.find('.project-description__demo-button').remove();
                setTimeout(function() {
                    $front.find('.project-description__demo-button').remove();
                }, 1000);
            }
            selected = false;

            $('.side:not(.visible-side)').find('.project-description__project-title').text(selectedProjectObject.title);
            $('.side:not(.visible-side)').find('.project-description__project-caption').html(selectedProjectObject.description);
             $('.side:not(.visible-side)').find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

             // $('.side.visible-side').removeClass('visible-side');
             // $('.side:not(.visible-side)').addClass('visible-side');

             // if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {
             //     var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');

             //     $('.side:not(.visible-side)').append(demoButton);
             // }

             if($front.hasClass('visible-side')) {
                $front.removeClass('visible-side');
                $back.addClass('visible-side');
             } else {
                $back.removeClass('visible-side');
                $front.addClass('visible-side');
             }

             if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {
                 var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');

                 $('.side:not(.visible-side)').append(demoButton);
             }

             if($flipper.hasClass("flipped")) {
                 $flipper.removeClass('flipped');
             } else {
                 $flipper.addClass('flipped');
             }

             // $flipper.toggleClass('flipped');
        } else {
            //disable clicked tile for a couple seconds
            togglePointerEvents($(projectTiles));

            //set classes
            $clickedTile.siblings('.project-list__project').removeClass('selected');
            $clickedTile.addClass('selected');
            $(projectTiles).find('.selected-project-scanner').removeClass("selected-project-scanner--shown");
            $clickedTile.find('.selected-project-scanner').addClass('selected-project-scanner--shown');


            if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {
                console.log("Other side has no button...");
                var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');

                $('.side:not(.visible-side)').append(demoButton);
            }
            selected = true;

            if($front.hasClass('visible-side')) {
                //change info on back side, change visible-side class to back side, flip to back
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
        }

    });


    function togglePointerEvents(tiles) {
        tiles.addClass('no-click');
        setTimeout(function() {
            tiles.removeClass('no-click');
        }, 1800);
    }



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
        projectID: 3
    },
    {
        title: "Developer Profile",
        description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/updated-bov-academy-portfolio/",
        projectID: 2
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
    },
    {
        title: "Welcome!",
        description: 'This is my front-end development portfolio. Here, you can check out a selection of projects I\'ve worked on; click a project from the list to see a description and a link to a demo. <br/><br/> To learn more about me, feel free to check out my "Developer Profile".',
        projectID: 0
    }
    ];


})();
