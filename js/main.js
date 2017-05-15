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

            $('.side:not(.visible-side)').find('.project-description__project-title').html(selectedProjectObject.title);
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
                $back.find('.project-description__project-title').html(selectedProjectObject.title);
                $back.find('.project-description__project-caption').html(selectedProjectObject.description);
                $back.find('.project-description__demo-button').attr('href', selectedProjectObject.demoLink);

                $front.removeClass('visible-side');
                $back.addClass('visible-side');

                $flipper.addClass('flipped');
            } else {
                //change info on front side, change visible-side class to front side, flip to front
                $front.find('.project-description__project-title').html(selectedProjectObject.title);
                $front.find('.project-description__project-caption').html(selectedProjectObject.description);
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
        }, 1700);
    }



    var projectObject = [{
        title: "Bov Academy Student Site",
        description: "I am a lead developer on the team that built the student profile site for <a class='bov-link' href='https://bovacademy.com/' target='_blank'>Bov Academy</a>. The site contains profiles for the school's student body and heavily utilizes multimedia and various animation effects. We built the site using vanilla JavaScript.",
        demoLink: "https://students.bovacademy.com/",
        projectID: 1
    },
    {
        title: "Evolution UI Framework",
        description: "Evolution UI is a working front-end framework comprising a library of innovative, unique web components, as well as a collection of standard components. I have contributed to and helped develop the project, and I now serve as a core maintainer.",
        demoLink: "https://evolution-ui.github.io/evolution-ui/",
        projectID: 3
    },
    {
        title: "Developer Profile",
        description: "My developer profile is meant to help visitors get to know me better as both a developer and a person. The site contains a short bio as well as pictures and other information about my life and interests. It also includes contact information.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/updated-bov-academy-portfolio/",
        projectID: 2
    },
    {
        title: "Tic Tac Toe",
        description: "This is a fully functional game of Tic Tac Toe played against the computer. The computer is moderately intelligent and will often try to block the player when the player is nearing victory. In addition, the computer will sometimes move first to keep things fair and interesting.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-08-Art-of-Modern-Frontend-Development/Chapter-02-Mastering-jQuery/Project-2-tic-tac-toe/",
        projectID: 4
    },
    {
        title: "Jigsaw Puzzle",
        description: "This is a working jigsaw puzzle. The user can ask for hints, reset the game as needed, and increase the difficulty. Be warned: the puzzle is fairly challenging, so pay close attention to the three hints!",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/Chapter-04-JavaScript-Events-In-Depth/Project-2-Jigsaw-Puzzle/",
        projectID: 5
    },
    {
        title: "Welcome!",
        description: 'This is my front-end development portfolio. Here, you can check out a selection of projects I\'ve worked on; click a project from the list to see a description of the project and a link to it. <br/><br/> To learn more about me and to get in touch, please check out my "Developer Profile".',
        projectID: 0
    },
    {
        title: "JavaScript Utility Library <span class='wip'> (work in progress)</span>",
        description: "The JavaScript utility library contains a number of useful functions and methods. The library is meant to help with common front-end tasks such as validating email addresses, shuffling arrays, filtering properties out of objects, and more.",
        demoLink: "https://github.com/sebastianrb/portfolio/tree/master/project-files/utilities.js",
        projectID: 6
    }
    ];


})();
