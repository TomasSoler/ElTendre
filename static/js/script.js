/**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.5
 */
 ;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,e,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

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
                    // console.log('contactForm Inti!'); 
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
                    '<img src="data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAyAAD/4QMraHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjAtYzA2MCA2MS4xMzQ3NzcsIDIwMTAvMDIvMTItMTc6MzI6MDAgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDUzUgTWFjaW50b3NoIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MjcwRTMxM0ZDNzExRTE5MjkyRTA2QUY3OTU2RDczIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4MjcwRTMyM0ZDNzExRTE5MjkyRTA2QUY3OTU2RDczIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgyNzBFMkYzRkM3MTFFMTkyOTJFMDZBRjc5NTZENzMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgyNzBFMzAzRkM3MTFFMTkyOTJFMDZBRjc5NTZENzMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7/7gAOQWRvYmUAZMAAAAAB/9sAhAAIBgYGBgYIBgYIDAgHCAwOCggI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"/>'+
                    '<h1>Almazara "El Tendre"</h1>'+
                    '<div id="bodyContent">'+
                        '<p>- Partida de Alzabares Alto, 233, 03290 Elche</p>'+
                        '<p>- Tlf: 965 45 23 39</p>'+
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

Phryxus.register(function() {
    var scrollTo = {
        init: function() {
            // Is there a beter way to organize this?
            $(".scroll a").click(function(event) {
                event.preventDefault();
                
                $(".selected").removeClass("selected");
                $(this).addClass("selected");
                
                $.scrollTo($(this).attr('href'), 900,{
                    margin: true
                }, {
                    complete: $(this).clearQueue()
                }); 
            });

            $(".scrollToPage").css({
                height: $(window).height(),
                width: $(window).width()
            });

            $(window).resize(function(){
                $(".scrollToPage").css({
                    height: $(window).height(),
                    width: $(window).width()
                });
            });
        }
    }
    scrollTo.init();
});

Phryxus.register(function() {
    var products = {
        // list of descriptions for projects
        arrowR      : $("#catalogoContent #next"),
        arrowL      : $("#catalogoContent #prev"),
        arrows      : $('#catalogoContent .flecha'),
        container   : $("#innerdiapos"),
        elementsNum : '',
        indexZone   : $("#diaposNav").find('ul'),
        indexEle    : '',
        speed       : 500,
        count       : 1,

        init: function() {
            this.loadhtml();
            this.bindIndex();
            this.bindArrows();
        },
        loadhtml: function() {
            this.elementsNum = this.container.find("li").length;
            this.createNav();
            this.arrows.show();
            this.updateIndex();
        },
        createNav: function() {
            for (var i = 1; i < this.elementsNum+1; i++) {
                this.indexZone.append('<div data-index="' + i + '" class="diapoNav"><a href="#"></a></div>');
            };
            this.indexEle = this.indexZone.find('.diapoNav');
        },
        bindIndex: function() {
            this.indexEle.click(function() {
                var $this = $(this),
                    num = $this.data('index'),
                    curr = products.indexEle.filter('.selected'),
                    dir = (curr.data('index') < num) ? '+' : '-'
                    positions = eval(curr.data('index') + dir + num);
                if (!$this.hasClass('selected')) {
                    curr.removeClass('selected');
                    $this.addClass('selected');
                    console.log("the sign is: " + dir + "\nThe 'jump' is: " + positions);
                    
                }
            });
        },
        updateIndex: function() {
            this.indexEle.filter(".selected").removeClass("selected");
            this.indexEle.filter('[data-index="' + this.count + '"]').addClass("selected");
        },
        bindArrows: function() {
            this.arrows.click(function() {
                if($(this)[0] == $('#next')[0] && !products.container.data("animating")) {
                    
                    products.updateIndex();
                    products.container.data("animating", true);
                    products.container.find('ul').animate({
                        marginLeft: '-=550'
                    }, 1000, null, function() {
                        products.count++;
                        products.container.data("animating", false);
                    });
                } else if($(this)[0] == $('#prev')[0] && !products.container.data("animating")) {
                    
                    console.log('arrowL clicked?');
                    products.container.data("animating", true);
                    products.container.find('ul').animate({
                        marginLeft: '+=550'
                    }, 1000, null, function() {
                        products.count--;
                        products.container.data("animating", false);
                    });
                }
            });
        }
    }
    products.init();
});


//--------------------------------------------------------------------

$(document).ready(function() {
    Phryxus.init(); 
});
