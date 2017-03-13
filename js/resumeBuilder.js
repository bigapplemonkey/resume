"use strict";

var model = {
    bio: {
        "name": "Jorge Asuaje",
        "role": "Web Developer",
        "contacts": {
            "mobile": "+1-347-964-4977",
            "email": "jorge.asuaje@gmail.com",
            "github": "bigapplemonkey",
            "twitter": "bigapplemonkey",
            "linkedin": "jorgeasuaje",
            "location": "Jersey City, NJ",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Jersey_City,_New_Jersey",
            "locationText": "Glad to call this place home. Best views of Manhattan"

        },
        "welcomeMessage": "Web developer passionate about the design and implementation of elegant and responsive UI. My goal is to deliver beautiful functional interfaces.",
        "skills": [{
            "HTML/CSS/JS": 5
        }, {
            "JS Frameworks": 5
        }, {
            "CSS Frameworks": 5
        }, {
            "Responsive design": 5
        }, {
            "Groovy on Grails": 5
        }, {
            "SQL/NoSQL/Graph DB": 4
        }, {
            "Java/C/C++": 4
        }, {
            "puppeteer master": 0
        }],
        "bioPic": "images/myPhoto_2x.jpg"
    },

    education: {
        "schools": [{
            "name": "NJIT",
            "location": "Newark, NJ",
            "degree": "Masters",
            "majors": ["Computer Science"],
            "dates": "Dec 2013",
            "url": "https://www.njit.edu",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Newark,_New_Jersey",
            "locationText": "Home to my alma mater NJIT."

        }, {
            "name": "Simon Bolivar University",
            "location": "Caracas, Venezuela",
            "degree": "BS",
            "majors": ["Electronics Engineering"],
            "dates": " Dec 2005",
            "url": "http://www.usb.ve",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Caracas",
            "locationText": "The beautiful capital city surrounded by the greens of Mountain El Avila."

        }],
        "onlineCourses": [{
            "title": "Front-End Web Developer",
            "school": "Udacity",
            "schoolUrl": "https://www.udacity.com/course/front-end-web-developer-nanodegree--nd001",
            "dates": "Nov 2015",
            "url": "http://www.udacity.com"
        }]
    },

    work: {
        "jobs": [{
            "employer": "Brinqa",
            "title": "Software Engineer",
            "dates": "Feb 2014 - Present",
            "location": "New York, NY",
            "description": "- Customized front and back end of the Company’s risk analytics platform using Grails framework to accommodate clients’ assessment models for Technology Risk.<br>- Developed reporting user interfaces to facilitate the making of informed decisions by end users.<br>- Gathered business requirements for the implementation of corporate dashboards to facilitate the visualization of metrics used by client to quantify risk across technology assets.<br>- Reduced time to render risk analytical data by optimizing queries executed by the Company’s NoSQL graph-based database Neo4j.",
            "url": "http://www.brinqa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/New_York_City",
            "locationText": "In love and still amazed by this city."
        }, {
            "employer": "PDVSA",
            "title": "Control and Instrumentation Project Engineer",
            "dates": "Jan 2006 – Jan 2008",
            "location": "Caracas, Venezuela",
            "description": "- Reviewed technical corporate documentation that led to the construction of three gas-processing plants.<br>- Assessed compliance of design with applicable codes and standard engineering practices.<br>- Ensured the Instrumentation Team met project deadlines per agreed milestones.",
            "url": "http://www.pdvsa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Caracas",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."
        }, {
            "employer": "Royal Dutch Shell",
            "title": "Surface Operations Support Intern",
            "dates": "Feb 2005 - Jan 2006",
            "location": "Maracaibo, Venezuela",
            "description": "- Created operational and monitoring applications to facilitate the incorporation of crude laboratory values by the Company’s personnel to the real-time database (OSISoft PI System).<br>- Implemented mobile interfaces for manual data collection for assets not linked to the Distributed Control System (DCS) increasing the precision in oil analysis and production monitoring.",
            "url": "http://www.shell.com.ve/",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Maracaibo",
            "locationText": "Known as 'The Beloved Land of the Sun' due to its warm weather. Great gastronomy."
        }]
    },

    projects: {
        "projects": [{
            "title": "GALAXIAN",
            "dates": "2016",
            "description": "Recreation of the classic arcade game Galaxian using a game loop engine. This implementation uses Object-Oriented Javascript and HTML5 Canvas.",
            "images": ["images/project1-large.jpg", "images/project1b-large.jpg"],
            "captions": ["Designed for large displays", "Difficulty increments as level progresses"],
            "url": "https://github.com/bigapplemonkey/Classic-Arcade-Game-Clone"
        }, {
            "title": "CUPCAKE FINDER",
            "dates": "2016",
            "description": "This a single page application featuring locations of cupcake shops near you built using a Model-View-ViewModel pattern. It allows the user to add/remove shops from his/her Favorite list and retrieve details from a shop as contact information, reviews and photos. Knockout.js, Materialize, Google Map API, Foursquare API.",
            "images": ["images/project2-large.jpg", "images/project2b-large.jpg"],
            "captions": ["Responsive design across devices", "Retrieve reviews and photos of your favorite cupcake shops"],
            "url": "https://github.com/bigapplemonkey/get-your-cupcakes"
        }, {
            "title": "MY FOOD JOURNAL",
            "dates": "2017",
            "description": "Single page app that tracks the user's calorie intake, and other health-related metrics. Users are able to search for food items from the database provided by the health API and add these items to one or several meals for macro-nutrient intake tracking. Backbone,js, Semantic-UI, Nutritionix API.",
            "images": ["images/project3-large.jpg", "images/project3b-large.jpg"],
            "captions": ["Responsive design across devices", "Track progress of your calories intake"],
            "url": "https://github.com/bigapplemonkey/my-food-journal"
        }]
    }
};

var octopus = {
    init: function() {
        bioView.init();
        workView.init();
        projectView.init();
        educationView.init();
        layoutView.init();
    },
    getBio: function() {
        return model.bio;
    },
    getWork: function() {
        return model.work;
    },
    getProjects: function() {
        return model.projects;
    },
    getEducation: function() {
        return model.education;
    },
    getContacts: function() {
        return model.bio.contacts;
    },
    getSchools: function() {
        return model.education.schools;
    },
    getJobs: function() {
        return model.work.jobs;
    }
};

var bioView = {
    init: function() {
        var bio = octopus.getBio();
        var formattedBio = HTMLbioPic.replace('%data%', bio.bioPic);
        formattedBio = formattedBio + HTMLheaderName.replace('%data%', bio.name.replace(' ', '<br>'));
        formattedBio = formattedBio + HTMLheaderRole.replace('%data%', bio.role);
        formattedBio = formattedBio + HTMLheaderWelcomeMsg.replace('%data%', bio.welcomeMessage);
        $('#header').prepend(formattedBio);

        formattedBio = HTMLemail.replace('%data%', bio.contacts.email).replace('%data%', bio.contacts.email);
        formattedBio = formattedBio + HTMLmobile.replace('%data%', bio.contacts.mobile).replace('%data%', bio.contacts.mobile);
        formattedBio = formattedBio + HTMLlocation.replace('%data%', bio.contacts.location);
        formattedBio = formattedBio + HTMLgithub.replace('%data%', bio.contacts.github);
        formattedBio = formattedBio + HTMLtwitter.replace('%data%', bio.contacts.twitter);
        formattedBio = formattedBio + HTMLlinkedin.replace('%data%', bio.contacts.linkedin);

        $('#topContacts').append(formattedBio);
        $('#letsConnect').append(HTMLfooterStart.replace('%data%', bio.name.replace(' ', '<br>')));

        formattedBio = HTMLfooterEmail.replace('%data%', bio.contacts.email).replace('%data%', bio.contacts.email);
        formattedBio = formattedBio + HTMLfooterMobile.replace('%data%', bio.contacts.mobile).replace('%data%', bio.contacts.mobile);
        formattedBio = formattedBio + HTMLfooterLocation.replace('%data%', bio.contacts.location);
        formattedBio = formattedBio + HTMLfooterGithub.replace('%data%', bio.contacts.github);
        formattedBio = formattedBio + HTMLfooterTwitter.replace('%data%', bio.contacts.twitter);
        formattedBio = formattedBio + HTMLfooterLinkedin.replace('%data%', bio.contacts.linkedin);

        $('#footerContacts').append(formattedBio);

        $('#skillSet').append(HTMLskillsStart);


        var len = bio.skills.length;
        for (var i = 0; i < len; i++) {
            var skill = Object.keys(bio.skills[i])[0];
            var skillRating = bio.skills[i][skill] <= 5 ? bio.skills[i][skill] : 5;
            formattedBio = HTMLskills.replace('%data%', skill);
            //adding thumbs-up rating
            for (var j = 0; j < skillRating; j++) {
                formattedBio = formattedBio.replace('<i class="fa fa-thumbs-up rating-icon" aria-hidden="true"></i>', '<i class="fa fa-thumbs-up rating-icon rated" aria-hidden="true"></i>');
            }
            $('#skills').append(formattedBio);
        }
    }
};

var workView = {
    init: function() {
        var work = octopus.getWork();
        var len = work.jobs.length;
        for (var i = 0; i < len; i++) {
            $('#workExperience').append(HTMLworkStart);
            var formattedWork = HTMLworkEmployer.replace('%data%', work.jobs[i].url).replace('%data%', work.jobs[i].employer);
            formattedWork = formattedWork + HTMLworkTitle.replace('%data%', work.jobs[i].title);
            formattedWork = formattedWork + HTMLworkLocation.replace('%data%', work.jobs[i].location);
            formattedWork = formattedWork + HTMLworkDates.replace('%data%', work.jobs[i].dates);
            formattedWork = formattedWork + HTMLworkDescription.replace('%data%', work.jobs[i].description);
            $('.work-entry:last').append(formattedWork);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12"><hr></div>');
    }
};

var projectView = {
    init: function() {
        var projects = octopus.getProjects();
        var len = projects.projects.length;
        for (var i = 0; i < len; i++) {
            $('#projects').append(HTMLprojectStart);
            var formattedProject = HTMLprojectTitle.replace('%data%', projects.projects[i].url).replace('%data%', projects.projects[i].title);
            formattedProject = formattedProject + HTMLprojectDates.replace('%data%', projects.projects[i].dates);
            formattedProject = formattedProject + HTMLprojectDescription.replace('%data%', projects.projects[i].description);
            var len2 = projects.projects[i].images.length;
            for (var j = 0; j < len2; j++) {
                // keeping this in case I want to go back to previous image format
                // formattedProject = formattedProject + HTMLprojectImage.replace('%data%', projects.projects[i].images[j]);
                formattedProject = formattedProject + HTMLprojectImageWithCaption.replace('%data%', projects.projects[i].captions[j]).replace('%data%', projects.projects[i].images[j]);
            }
            $('.project-entry:last').append(formattedProject);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12"><hr></div>');
    }
};

var educationView = {
    init: function() {
        var education = octopus.getEducation();
        var formattedEdu;
        var len = education.schools.length;
        for (var i = 0; i < len; i++) {
            $('#education').append(HTMLschoolStart);
            formattedEdu = HTMLschoolName.replace('%data%', education.schools[i].url).replace('%data%', education.schools[i].name);
            formattedEdu = formattedEdu + HTMLschoolDegree.replace('%data%', education.schools[i].degree);
            formattedEdu = formattedEdu + HTMLschoolMajor.replace('%data%', education.schools[i].majors[0]);
            formattedEdu = formattedEdu + HTMLschoolLocation.replace('%data%', education.schools[i].location);
            formattedEdu = formattedEdu + HTMLschoolDates.replace('%data%', education.schools[i].dates);

            $('.education-entry:last').append(formattedEdu);
        }

        $('#education').append(HTMLonlineSchoolStart);
        len = education.onlineCourses.length;
        for (var k = 0; k < len; k++) {
            $('#education').append(HTMLonlineClasses);
            formattedEdu = HTMLonlineTitle.replace('%data%', education.onlineCourses[k].schoolUrl).replace('%data%', education.onlineCourses[k].title);
            formattedEdu = formattedEdu + HTMLonlineSchool.replace('%data%', education.onlineCourses[k].school);
            formattedEdu = formattedEdu + HTMLonlineDates.replace('%data%', education.onlineCourses[k].dates);
            formattedEdu = formattedEdu + HTMLonlineURL.replace('%data%', education.onlineCourses[k].url).replace('%data%', education.onlineCourses[k].url);
            $('.online-education-entry:last').append(formattedEdu);
        }
        $('.empty-space:last').replaceWith('<div class="col-xs-12 hidden-xs"><hr></div>');
    }
};

var layoutView = {
    init: function() {
        this.addTitleHighlight();
        this.addSmoothTransition();
        this.addModalClickEvent();
        $('#mapDiv').append(googleMap);
    },
    addTitleHighlight: function() {
        //highlighting in blue title of section been scrolled
        $(window).on('scroll', function() {

            requestAnimationFrame(function() {
                var scrollTop = $(window).scrollTop();
                $('.section-title').each(function() {
                    var topDistance = $(this).offset().top;
                    var distance = topDistance - scrollTop;
                    var offset = 300;
                    if (distance <= offset && distance >= -20) {
                        $(this).find('h2').addClass('hightlight');
                    } else {
                        $(this).find('h2').removeClass('hightlight');
                    }
                });
            });
        });

    },
    addSmoothTransition: function() {
        //smooth transition on page junps
        $(document).ready(function() {
            $('a[href^="#"]').on('click', function(e) {
                e.preventDefault();

                var target = this.hash;
                var $target = $(target);

                $('html, body').stop().animate({
                    'scrollTop': $target.offset().top
                }, 1000, 'swing', function() {
                    window.location.hash = target;
                });
            });
        });
    },
    addModalClickEvent: function() {
        //inserting image clicked into modal
        $(document).ready(function() {
            $('.photo-effect').on('click', function() {
                var src = $(this).attr('src');
                var theImage = new Image();
                theImage.src = src;
                var imageWidth = theImage.width;

                $('#myModal').modal();

                //hack to prevent content shifting when a modal opens
                var bodyRightPadding = parseInt($('body').css('padding-right'), 10);
                if (bodyRightPadding > 0) $('body').css('padding-right', '0');

                $('#myModal .modal-body').html(theImage);
                $('#myModal .modal-body img').attr('id', 'modalImage');
                $('#modalImage').addClass('img-responsive center-block');

                //safari doesn't seem to process image width on load, so in case browser is safari
                var isSafari = navigator.vendor.indexOf('Apple') === 0 && /\sSafari\//.test(navigator.userAgent); // true or false
                if (!isSafari) $('.modal-dialog').css('width', imageWidth);

                $('#myModal').on('hidden.bs.modal', function() {
                    $('#myModal .modal-body').html('');
                });
            });
        });
    }
};

//initiating rendering
octopus.init();
