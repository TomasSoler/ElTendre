/**
 * Singleton with "register" functionality.
 *
 * @see http://codereview.stackexchange.com/questions/15166/best-way-to-organize-javascript-for-website
 */

 (function(exports) {

    var initialized,
    registry = []; // Collection of module.

    // Adds module to collection:
    exports.register = function(moduleDeclaration) {
        registry.push(moduleDeclaration); // Add module to registry.
        if (initialized) {
            moduleDeclaration.call(this); // If Phryxus already initialized, register and execute module immediately.
        }
    };
    // Executes every module:
    exports.init = function() {
        initialized = true; // Flippin' switches!
        // Loop through each module and execute:
        for (var i = 0, l = registry.length; i < l; i++) {
            registry[i].call(this); // Call and execute module.
        }
    };
}(window.Phryxus = window.Phryxus || {})); // Use existing namespace or make a new object of that namespace.



Phryxus.register(function() {

    var slides = {
        // Definitions
        $slides : $("#manifesto ul li"),
        $progressBar : $('.progressIndicator'),
        timer : 6000,
        transition: 300,
        
        init : function() {
            // Settings
            this.$slides.hide();
            this.$slides.first().show();
            this.$progressBar.css({width: 0}); // Reset to 0 when the page is loaded
            this.progressEffect(this.timer);
            this.mouseReactions();
        },
        getCurrentWidth: function (ele) {
            var width = ele.width();
            var parentWidth = ele.offsetParent().width();
            var percent = 100*width/parentWidth;

            return percent;
        },
        progressEffect: function () {
            this.$progressBar.animate({width: '100%'}, slides.timer, 'linear', function () {
                slides.nextSlide();
            });

        },
        progressBarFinished: function () {
            if(this.getCurrentWidth(this.$progressBar)  >= '100' ) {
                return true;
            } else {
                return false;
            }
        },
        nextSlide: function () {
           this.$progressBar.stop();
            this.$progressBar.css({width: 0});
            curr = this.$slides.filter(':visible');
            next = (curr.html() == this.$slides.last().html()) ? this.$slides.first() : curr.next();
            curr.fadeOut(this.transition, function() { next.fadeIn(slides.transition); slides.progressEffect(slides.timer); });
        },
        mouseReactions: function () {
            this.$slides.on('mouseenter', function() {
                slides.$progressBar.pause();
            });
            this.$slides.on('mouseleave', function() {
                slides.$progressBar.resume();
            });
        }

    }; // slides

    slides.init();

});

//--------------------------------------------------------------------

/**
 * Register a new module.
 * Just testing the waters.
 */

Phryxus.register(function() {
    var projects = {
        // list of descriptions for projects
        flechaD      : $("#flechaDcha"),
        flechaI      : $("#flechaIzda"),
        flechas      : $('#proyectos div.flecha'),
        contenedor   : $("#proyectosCont"),
        proyectosNum : $("#proyectosCont").find("a").length,
        // totalBloq    : Math.ceil(this.proyectosNum / 4),
        currentBloq  : 1,
        indexZone    : $("#indice").find('ul'),
        speed        : 500,

        init: function() {
            this.loadhtml();
            this.bindClickArrows();
            this.bindClickIndex();
            this.flechaI.unbind();
        },
        loadhtml: function () {
            this.flechas.show();
            this.getIndex();
            this.flechaD.removeClass("inactive").addClass("active");
            this.indexZone.find('li').first().addClass("selected");
        },
        getIndex: function () {
            for (var i = 1; i < Math.ceil(this.proyectosNum / 4) + 1; i++) {
                this.indexZone.append("<li data-bloq='"+i+"'></li>");
            }
        },
        bindClickArrows: function () {
            this.flechas
            .off('click')
            .on('mousedown', function(e) {
                $(this).removeClass('active').addClass('clicked');
                var to = ($(this).data('dir') === 'izda') ? '+' : '-';
                if (!projects.contenedor.is(':animated')) {
                    projects.contenedor.animate( { 'left' : to+'=940' }, this.speed );
                } else {
                    return;
                }
                (to === '+') ? projects.currentBloq-- : projects.currentBloq++;
                projects.direcLimit($(this).data('dir'));
                projects.indexZone.find('li.selected').removeClass('selected');
                $('li[data-bloq="' + projects.currentBloq + '"]').addClass('selected');
            })
            .on('mouseup', function (e) {
                $(this).removeClass('clicked active inactive hover').addClass('hover');
            })
            .hover(function() {
                $(this).removeClass('clicked active inactive hover').addClass('hover');
            }, function() {
                $(this).removeClass('clicked active inactive hover').addClass('active');
            });
        },
        bindClickIndex: function () {
            this.indexZone
            .find('li')
            .off('click')
            .hover(function() {
                $('li.selected').removeClass('selected');
            }, function() {
                $('li.selected').removeClass('selected');
                $('li[data-bloq="' + projects.currentBloq + '"]').addClass('selected');
            })
            .on('mousedown', function() {
                var num = $(this).data('bloq'),
                    to = num-1;
                if (num === projects.currentBloq) {
                    return;
                } else {
                    if (!projects.contenedor.is(':animated')) {
                        to = to * 940;
                        projects.contenedor.animate( { 'left' : '-'+to }, projects.speed );
                        projects.currentBloq = num;
                        $('li[data-bloq="' + projects.currentBloq + '"]').addClass('selected');
                        dir = projects.izdaOdcha(num);
                        if (!projects.direcActiva(projects.currentBloq-1) || !projects.direcActiva(projects.currentBloq+1)) {
                            projects.bindClickArrows();
                            $('div[data-dir="' + dir + '"]').removeClass("clicked active inactive hover").addClass("inactive").off();
                        } else {
                            projects.flechas.not($('div[data-dir="' + dir + '"]')).removeClass("clicked active inactive hover").addClass("active");
                            projects.bindClickArrows();
                        }
                        projects.flechas.not($('div[data-dir="' + dir + '"]')).removeClass("clicked active inactive hover").addClass("active");
                    } else {
                        return;
                    }
                }
            });
        },
        direcActiva: function (bloq) {

            if (bloq <= 0 || bloq >= Math.ceil(this.proyectosNum / 4)+1) {
                return false;
            } else {
                return true;
            }
        },
        direcLimit: function (dir) {
            var to = (dir === 'izda') ? '-' : '+';
                bloq = '0';
            bloq = eval(this.currentBloq + to + 1); // QUITAR EVAL! IT'S EVIL!!!!
            if (!this.direcActiva(bloq)) {
                $('div[data-dir="' + dir + '"]').removeClass("clicked active inactive hover").addClass("inactive").off();
            } else {
                this.flechas.not($('div[data-dir="' + dir + '"]')).removeClass("clicked active inactive hover").addClass("active");
                this.bindClickArrows();
            }
        },
        izdaOdcha: function (num) {
            var dir = 'meh';
            if (num === 1) {
                dir = 'izda';           
            } else if ( num === Math.ceil(this.proyectosNum / 4)) {
                dir = 'dcha';
            }
            return dir;
        }
    }
    projects.init();
});

Phryxus.register(function() {
    contactForm = {
        init: function() {
            console.log('contactForm Inti!');
        }
    }
    contactForm.init();
});

//--------------------------------------------------------------------

/**
 * Register a new module.
 * Just testing the waters.
 */

Phryxus.register(function() {
    
    var gMaps = {

        init: function() {
            // Definitions and all that stuff.
            var 
            markerImage =
                new google.maps.MarkerImage('/static/img/mapMarker.png',
                new google.maps.Size(45, 66),
                new google.maps.Point(0,0),
                new google.maps.Point(22, 66)),
            markerShadow = 
                new google.maps.MarkerImage('/static/img/mapMarkerShadow.png',
                new google.maps.Size(66, 53),
                new google.maps.Point(0,0),
                new google.maps.Point(10, 50)),
            almazaraLatLong = new google.maps.LatLng(38.250155,-0.674361),
            map = 
                new google.maps.Map(document.getElementById("contactarMapa"), {
                    zoom: 19,
                    center: new google.maps.LatLng(38.250655,-0.673500),
                    disableDefaultUI: true,
                    mapTypeId: google.maps.MapTypeId.SATELLITE}),
            marker =
                new google.maps.Marker({
                    position: almazaraLatLong,
                    map: map,
                    icon: markerImage,
                    shadow: markerShadow,
                    title: "Almazara El Tendre"}),
            contentString = 
                '<div id="mapContent">'+
                    '<img src="/static/img/uluru.jpg"/>'+
                    '<h1>Almazara "El Tendre"</h1>'+
                    '<div id="bodyContent">'+
                        '<p>- Partida de Alzabares Alto, 233, 03290 Elche</p>'+
                        '<p>- 965 45 23 39</p>'+
                        '<p>- <a href="mailto:info@eltendre.com">info@eltendre.com<a></p>'+
                        '<p>- <a href="mailto:export@eltendre.com">export@eltendre.com<a></p>'+
                        '<p>- <a href="mailto:almazaraeltendre@gmail.com">almazaraeltendre@gmail.com<a></p>'+
                    '</div>'+
                '</div>',
            infoWindow =
                new google.maps.InfoWindow({
                    content: contentString
                });
            infoWindow.open(map, marker);
            google.maps.event.addListener(marker, 'click', function() {
                console.log("lalala");
                infoWindow.open(map, marker);
            });
        }
    }
    gMaps.init();
});


//--------------------------------------------------------------------

$(document).ready(function() {
    Phryxus.init(); 

});
