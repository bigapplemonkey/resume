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
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        },
        "welcomeMessage": "Bacon ipsum dolor amet cupim shoulder enim, ea sed elit lorem pastrami excepteur ut voluptate pork jerky velit. Deserunt ullamco drumstick meatloaf.",
        "skills": [{
            "awesomeness": 5
        }, {
            "delivering things": 4
        }, {
            "cryogenic sleep": 3
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
            "dates": "2014",
            "url": "https://www.njit.edu",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Newark,_New_Jersey",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        }, {
            "name": "Simon Bolivar University",
            "location": "Caracas, Venezuela",
            "degree": "BS",
            "majors": ["Electronics Engineering"],
            "dates": "2005",
            "url": "http://www.usb.ve",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Caracas",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."

        }],
        "onlineCourses": [{
            "title": "JavaScript Syntax",
            "school": "Udacity",
            "schoolUrl": "http://www.udacity.com/courses/ud804",
            "dates": "May 2015",
            "url": "http://example.com"
        }, {
            "title": "JavaScript Syntax",
            "school": "Udacity",
            "schoolUrl": "http://www.udacity.com/courses/ud804",
            "dates": "May 2015",
            "url": "http://example.com"
        }]
    },

    work: {
        "jobs": [{
            "employer": "Brinqa",
            "title": "Software Engineer",
            "dates": "February 2014 - Present",
            "location": "New York, NY",
            "description": "Bacon ipsum dolor amet ham jerky landjaeger frankfurter filet mignon. Turkey kevin pancetta, chicken hamburger corned beef tongue. Pig ham tongue flank short ribs pancetta turducken biltong meatloaf kielbasa alcatra cow t-bone tail. Pig strip steak doner rump drumstick.",
            "url": "http://www.brinqa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/New_York_City",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."
        }, {
            "employer": "PDVSA",
            "title": "Project Engineer",
            "dates": "2006 – 2008",
            "location": "Maracaibo, Venezuela",
            "description": "Ribeye picanha capicola, doner shankle meatball strip steak shank sirloin salami jowl sausage brisket pancetta turducken. Filet mignon turducken sausage drumstick alcatra ball tip. Picanha turkey turducken, beef t-bone ham hock short loin pork loin filet mignon corned beef. Boudin prosciutto spare ribs short ribs salami.",
            "url": "http://www.pdvsa.com",
            "locationImage": "http://placehold.it/200x100/F6EDED",
            "locationURL": "https://en.wikipedia.org/wiki/Maracaibo",
            "locationText": "Shoulder ball tip cupim tongue beef meatball corned beef turkey."
        }]
    },

    projects: {
        "projects": [{
            "title": "Galaxian",
            "dates": "2016",
            "description": "Bacon ipsum dolor amet ham jerky landjaeger frankfurter filet mignon. Turkey kevin pancetta, chicken hamburger corned beef tongue. Pig ham tongue flank short ribs pancetta turducken biltong meatloaf kielbasa alcatra cow t-bone tail. Pig strip steak doner rump drumstick.",
            "images": ["images/project1.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball."],
            "url": "https://github.com/bigapplemonkey/Classic-Arcade-Game-Clone"
        }, {
            "title": "CUPCAKE FINDER",
            "dates": "2016",
            "description": "Bacon ipsum dolor amet ham jerky landjaeger frankfurter filet mignon. Turkey kevin pancetta, chicken hamburger corned beef tongue. Pig ham tongue flank short ribs pancetta turducken biltong meatloaf kielbasa alcatra cow t-bone tail. Pig strip steak doner rump drumstick.",
            "images": ["images/project2.jpg", "images/project2b.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball.", "Tail short loin capicola leberkas meatball."],
            "url": "https://github.com/bigapplemonkey/get-your-cupcakes"
        }, {
            "title": "MY FOOD JOURNAL",
            "dates": "2017",
            "description": "Bacon ipsum dolor amet ham jerky landjaeger frankfurter filet mignon. Turkey kevin pancetta, chicken hamburger corned beef tongue. Pig ham tongue flank short ribs pancetta turducken biltong meatloaf kielbasa alcatra cow t-bone tail. Pig strip steak doner rump drumstick.",
            "images": ["images/project3.jpg", "images/project3b.jpg"],
            "captions": ["Tail short loin capicola leberkas meatball.", "Tail short loin capicola leberkas meatball."],
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
