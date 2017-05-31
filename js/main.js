(function() {

    var main = document.querySelector(".main-body");
    var $portfolioHeader = $(".portfolio-header");
    var $tileList = $('.project-list');
    var projectTiles = Array.from(document.querySelectorAll(".project-list__project"));
    var $projectList = $('.project-list');
    var $projectListContainer = $('.project-list-container');
    var title = document.querySelector(".portfolio-header");
    var $portfolioTitle = $(".portfolio-header__title");
    var description = document.querySelector(".project-description");
    var loadAnimations = Array.from(document.querySelectorAll(".load-hidden"));
    var $flipper = $('.flipper');
    var $front = $('.front');
    var $back = $('.back');
    var $contactPopup = $('.evo_c-expand-and-fold-out-popup__popup-button');
    var selected = false;
    var mobileProjectListOffset = 110;
    var $otherProjectsDemoButton;
    var $modalCloseButton = $('.other-projects-modal__close-button');
    var $modal = $('.other-projects-modal');

    //moda stuff
    $modalCloseButton.on('click', function(event) {
        event.preventDefault();
        $modal.addClass('hidden');
    });


    window.addEventListener("load", function(event) {
        loadAnimations.forEach( function(element, index) {
            element.classList.remove("load-hidden");
        });
        setTimeout(function() {
            offsetMobileProjects();
            description.style.transition = "left .3s ease-out .1s, opacity .4s"
        }, 2000);
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

             if($front.hasClass('visible-side')) {
                $front.removeClass('visible-side');
                $back.addClass('visible-side');
             } else {
                $back.removeClass('visible-side');
                $front.addClass('visible-side');
             }

             if($('.side:not(.visible-side)').find(".project-description__demo-button").length === 0) {
                 if(projectID === 6) {
                     var demoButton = $('<a>').addClass('project-description__demo-button other-projects').text("View Project").attr('target', '_blank');

                 } else {
                      var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');
                 }

                 $('.side:not(.visible-side)').append(demoButton);

                 if(projectID === 6) {
                    $otherProjectsDemoButton = $(".other-projects");
                    $otherProjectsDemoButton.on('click', function(event) {
                        event.preventDefault();
                        console.log("Clicked");
                        $modal.removeClass('hidden');
                    });
                 }
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
               if(projectID === 6) {
                   var demoButton = $('<a>').addClass('project-description__demo-button other-projects').text("View Project").attr('target', '_blank');
               } else {
                    var demoButton = $('<a>').addClass('project-description__demo-button').text("View Project").attr('target', '_blank');
               }
                $('.side:not(.visible-side)').append(demoButton);

                if(projectID === 6) {
                   $otherProjectsDemoButton = $(".other-projects");
                   $otherProjectsDemoButton.on('click', function(event) {
                       event.preventDefault();
                       console.log("Clicked");
                       $modal.removeClass('hidden');
                   });
                }
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

        $('.main-body__overlay').animate({ scrollTop: 0 }, 600);

        //top offsets on small screens
        offsetMobileProjects();
    });

    window.addEventListener("resize", function() {
        offsetMobileProjects();
    });


    function offsetMobileProjects() {
       if(window.innerWidth < 921) {
          console.log("Small screen.");
          var headerHeight = $portfolioHeader.height();
          console.log(headerHeight);
          var $visibleSide = $('.visible-side');
          var visibleSideHeight = $visibleSide.height();
          console.log(visibleSideHeight);
          // var visibleSideMarginTop = $visibleSide.css("margin-top");
          var totalOffset = headerHeight + visibleSideHeight + 35 + mobileProjectListOffset;

          console.log(totalOffset);
          console.log($projectListContainer);

          $projectListContainer.css("top", totalOffset);
       }
    }


    function togglePointerEvents(tiles) {
        tiles.addClass('no-click');
        setTimeout(function() {
            tiles.removeClass('no-click');
        }, 1700);
    }


    //contact popup fade

    $contactPopup.on('mouseenter', function(event) {
       event.preventDefault();
       $projectList[0].classList.add("contact-faded");
       description.classList.add("contact-faded");
       $portfolioTitle.addClass("contact-faded");
    });

    $contactPopup.on('mouseleave', function(event) {
        event.preventDefault();
        $projectList[0].classList.remove("contact-faded");
        description.classList.remove("contact-faded");
        $portfolioTitle.removeClass("contact-faded");
    });

    var projectObject = [{
        title: "Bov Academy Student Site",
        description: "I am a lead developer on the team that built the student profile site for <a class='bov-link' href='https://bovacademy.com/' target='_blank'>Bov Academy</a>. The site contains profiles for the school's student body and heavily utilizes multimedia and various animation effects. We built the site using vanilla JavaScript.",
        demoLink: "https://students.bovacademy.com/",
        projectID: 1
    },
    {
        title: "Developer Profile",
        description: "My developer profile is meant to help visitors get to know me better as both a developer and a person. The site contains a short bio as well as pictures and other information about my life and interests. It also includes contact information.",
        demoLink: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/updated-bov-academy-portfolio/",
        projectID: 2
    },
    {
        title: "Evolution UI Framework <span class='wip'> (work in progress)</span>",
        description: "Evolution UI is an <a href='https://github.com/evolution-ui/evolution-ui/tree/development' class='bov-link' target='_blank'>open-source front-end framework</a> comprising a library of innovative, unique web components, as well as a collection of standard components. I have contributed to and helped develop the project, and I now serve as a core maintainer.",
        demoLink: "https://evolution-ui.github.io/evolution-ui/",
        projectID: 3
    },
    {
        title: "Tic Tac Toe",
        description: "This is a fully functional game of Tic Tac Toe played against the computer. The computer is moderately intelligent and will often try to block the player when the player is nearing victory and win when possible. In addition, the computer will sometimes move first to keep things fair and interesting.",
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
        description: 'This is my front-end web development portfolio. Here, you can check out a selection of projects I\'ve worked on; choose a project from the list to see a description of the project and a link to it. <br/><br/> To learn more about me, feel free to check out my "Developer Profile".',
        projectID: 0
    },
    {
        // title: "JavaScript Utility Library <span class='wip'> (work in progress)</span>",
        // description: "The JavaScript utility library contains a number of useful functions and methods. The library is meant to help with common front-end tasks such as validating user input, shuffling arrays, filtering properties out of objects, and more. Note - I intentionally avoid Regex.",
        // demoLink: "https://github.com/sebastianrb/portfolio/tree/master/project-files/utilities.js",
        // projectID: 6

        title: "Select Minor Projects",
        description: "This comprises a selection of minor projects. These projects are relatively small scale and less complex than the others, but nontheless exhibit important technologies and development techniques. These projects include a randomly generated photo album using Handlebars, an AJAX fact generator, and a REGEX link harvester.",
        // demoLink0: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/Chapter-07-AJAX-in-Depth/Project-2-Work-with-a-Live-Web-Service/",
        // demoLink1: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-08-Art-of-Modern-Frontend-Development/Chapter-03-JavaScript-Templating-Handlebars/Project-2-Create-Photo-Album/",
        // demoLink2: "http://moderndeveloper-students.github.io/coursework-sebastianrb/Course-07-Becoming-a-JavaScript-Expert/Chapter-02-Regular-Expressions-in-Depth/Project-1-Harvesting-Links/",
        demoLink: "#",
        projectID: 6
    }
    ];

})();
