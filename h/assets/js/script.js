$(function(){
    sliderInit();
    STDGallery();
    sectionScrollInit();
    gMapsInit();
    overGMaps();



    $(window).resize(function(){
        $(".scrollToPage").css({
            height: $(window).height(),
            width: $(window).width()
        });
    //añadir un scrollTo al div que haya en la url como #loquesea
    })


    selectHalf($("#catalogoContent"));
    
    selectHalf($("#galeriaContent"));
    
    selectHalf($('#inicioContent'));
       
    $("#diaposNav").css({
        left: ($("#catalogoContent").width() - $("#diaposNav").width())/2 -20
       
    });
    
    $("li.langSelected").hover(function(){
        $("ul.submenu").slideDown(400);
    },function(){
        $(this).find('ul:first').slideUp(400);
    });
    
 //Formulario de contacto
    $('#send').on( 'click', function(){
        $("#contacto").submit();
    });
        
    $("#contacto").submit(function(){
        $("body").css("cursor", "progress");
        $.ajax({
            type: "POST",
            url: "assets/bin/form.php",
            data: $("#contacto").serialize(),
            dataType: "json",
            async: 'true',
                success: function(json){
                    alert('bien! ' + json.message);
                    $('#contacto').each(function(){this.reset();});
                        
                    $("body").css("cursor", "default");
                    $('#send').click(function(){
                        $("#contacto").submit();
                    });
                },
                error: function(){
                    alert('Algo no ha ido bien! Prueba en un rato ' + json.message);
                    $("body").css("cursor", "default");
                    $('#send').click(function(){
                        $("#contacto").submit();
                    });
            }
        });
        //make sure the form doesn't post
        return false;
    });
});


// "ilumina" la navegación dada la imagen en la que estamos
function changeDiapoNav(count) {
    diaposNav.children(".selected").removeClass("selected");
    $("#diaposNav div:nth-child(" + count + ")").addClass("selected");
}
// centra un elemento en el centro exacto de la pantalla
function selectHalf(element) {
    element.css({
        left: ($(window).width() - element.width())/2,
        top: ($(window).height() - element.height())/2
    });
}

function overGMaps(){
    $("#contactarContent").css({
        top: $("#contactar").offset().top + 100,
        left: $(window).width() - 500
    });
}

function sliderInit() {
    // Variables necesarias.
    var $slider = $("#innerdiapos"),
    a = $slider.data('count', {
        value:1
    }),
    count = $slider.data('count'),
    ul = $slider.find('ul');
    left = parseInt(ul.css('left'), 10);
    diaposNav = $("#diaposNav");

    // derecha
    $('#next').click(function() {
        
        if(!$slider.data("animating")) {
            $slider.data("animating",true);
            left = (left === -2200) ? 0 : left - 550;
            count.value = (count.value === 5) ? 0 : count.value
            ul.animate({
                marginLeft: left
            }, 1000, null, function() {
                count.value++;
                changeDiapoNav(count.value);
                $slider.data("animating",false);
            });
        }
        return false;
    });
    
    // Izquierda
    $('#prev').click(function() {
        
        if(!$slider.data("animating")) {
            $slider.data("animating",true);
            left = (left === 0) ? -2200 : left + 550;
            count.value = (count.value === 1) ? 6 : count.value
            ul.animate({
                marginLeft: left
            }, 1000, null, function() {       
                count.value--;
                changeDiapoNav(count.value);
                $slider.data("animating",false);
            });
        }
        return false;
    });
    // Selector
    $("#diaposNav div.diapoNav").click(function() {   
        //console.log(count.value);
        if($(this).is("#firstDiapo")) {
            left = 0;
            ul.animate({
                marginLeft: left
            }, 1000, null, function(){
                count.value = 1;
                changeDiapoNav(count.value);
            });
        } else if ($(this).is("#secondDiapo")) {
            left = -550;
            ul.animate({
                marginLeft: left
            }, 1000, null, function(){
                count.value = 2;
                changeDiapoNav(count.value);
            });
        } else if ($(this).is("#thirdDiapo")) {
            left = -1100;
            ul.animate({
                marginLeft: left
            }, 1000, null, function(){
                count.value = 3;
                changeDiapoNav(count.value);
            });
        } else if ($(this).is("#forthDiapo")) {
            left = -1650;
            ul.animate({
                marginLeft: left
            }, 1000, null, function(){
                count.value = 4;
                changeDiapoNav(count.value);
            });
        } else {
            left = -2200;
            ul.animate({
                marginLeft: left
            }, 1000, null, function(){
                count.value = 5;
                changeDiapoNav(count.value);              
            });
        }
    });
}

// function konamiCode(){    
//    // Start Konami code!
//    var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
//    $(document).keydown(function(e) {
//        kkeys.push( e.keyCode );
//        if ( kkeys.toString().indexOf( konami ) >= 0 ){
//            $(document).unbind('keydown',arguments.callee);
//            alert('konami code!');
//            //Fade in the Popup and add close button
//            $('#konamiCode').css({
//                left: $(window).offset().left + ($(window).width() - $("#konamiCode").width())/2,
//                top: $(window).offset().top + ($(window).height() - $("#konamiCode").height())/2
//            }).fadeIn('slow');

//            //Fade in Background
//            $('body').append('<div id="fade"></div>'); //Add the fade layer to bottom of the body tag.
//            $('#fade').css({
//                'filter' : 'alpha(opacity=80)'
//            }).fadeIn(); //Fade in the fade layer - .css({'filter' : 'alpha(opacity=80)'}) is used to fix the IE Bug on fading transparencies 
//        }
//    });

// }

function gMapsInit() {
    
    var image = new google.maps.MarkerImage('assets/img/mapMarker.png',
        new google.maps.Size(45, 66),
        new google.maps.Point(0,0),
        new google.maps.Point(22, 66));
    
    var shadow = new google.maps.MarkerImage('assets/img/mapMarkerShadow.png',
        new google.maps.Size(66, 53),
        new google.maps.Point(0,0),
        new google.maps.Point(10, 50));


    var almazaraLatLong = new google.maps.LatLng(38.250155,-0.674361);
    
    var myOptions = {
        zoom: 19,
        center: new google.maps.LatLng(38.250655,-0.673500),
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.SATELLITE
    }
    
    var map = new google.maps.Map(document.getElementById("contactarMapa"),
        myOptions);
        
   var marker = new google.maps.Marker({
        position: almazaraLatLong, 
        map: map,
        icon: image,
        shadow: shadow,
        title:"Almazara El Tendre"
    });


      var contentString = '<div id="mapContent">'+
    '<img src="assets/img/uluru.jpg"/>'+
    '<h1>Almazara "El Tendre"</h1>'+
    '<div id="bodyContent">'+
    '<p>- Partida de Alzabares Alto, 233, 03290 Elche</p>'+
    '<p>- 965 45 23 39</p>'+
    '<p>- <a href="mailto:info@eltendre.com">info@eltendre.com<a></p>'+
	'<p>- <a href="mailto:export@eltendre.com">export@eltendre.com<a></p>'+
	'<p>- <a href="mailto:almazaraeltendre@gmail.com">almazaraeltendre@gmail.com<a></p>'+
    '</div>'+
    '</div>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
	infowindow.open(map,marker);
}

function sectionScrollInit(){
    $("li.scroll a").click(function(event) {
        event.preventDefault();
        
        $(".selectedNav").removeClass("selectedNav");
        $(this).addClass("selectedNav");
        
        $.scrollTo($(this).attr('href'), 900,{
            margin: true
        }, {
            complete: $(this).clearQueue()
        } ); 
    });

    $("#main div.scrollToPage").css({
        height: $(window).height(),
        width: $(window).width()
    });
}


function STDGallery() {
    //variables
    var     $gallery            = $('#STGallery');
            $gallery.items      = $gallery.find('li'),   
            $gallery.thumbs     = $gallery.items.find('.STGThumb'),
            $gallery.thumbsUl   = $('#STGThumbs').find('ul'),
            $gallery.content    = $gallery.find('.STGContent'),
            $gallery.counter    = 0,
            $gallery.thumbs.img = $gallery.thumbs.find('img');
    

    // Creamos un hueco para las thumbs.
    var i=0;
    $gallery.thumbs.img.each(function(){
        i++;
        $(this).addClass('thumb-'+i);
        $gallery.thumbsUl.append(this);
    });
   $gallery.find('ol').css({
        width: 960*$gallery.items.length
    });


    
    var counter = 1;
    var left = 162*3;
    
    
    $('#thumbs-next').click(function(){
        var marginLeft = parseFloat($('#STGThumbs ul').css('marginLeft'));
        if ( $gallery.thumbsUl.is(':animated') ) {} else {
            if(counter <= 4 ) {
                $gallery.thumbsUl.animate({
                    marginLeft: marginLeft-left
                }, 600);
                counter++;
            } else {}
        }
    });
    $('#thumbs-prev').click(function(){
        var marginLeft = parseFloat($gallery.thumbsUl.css('marginLeft'));
        if($gallery.thumbsUl.is(':animated')) {} else{
            if ( counter >= 2 ) {
                $gallery.thumbsUl.animate({
                    marginLeft: marginLeft+left
                }, 600);
                counter--;
            } else {}
        }
    });
    
    $gallery.thumbsUl.css({
        width: 960*$gallery.items.length
    });
    i=0;
   
    $gallery.content.each(function() {
        i++;
        $(this).addClass('content-'+i);
    });
    
    var mt = parseInt($gallery.thumbsUl.find('img').css('margin-top'));
    $gallery.thumbsUl.find('img').each(function(){
        var $this = $(this);
        $this.hover(function(){
            var $this = $(this);
           $this.animate({
                opacity: 0                
            },{
                queue: false,
                duration: 0
            });
            $this.animate({
                marginTop: mt*2 - 265
            },{
                queue: false,
                duration: 0
            });
            $this.animate({
                opacity: 1
            },{
                queue: true,
                duration: 0
            });
        }, function(){
             var $this = $(this);
            $this.animate({
                opacity: 0,
                marginTop: mt
            }, 0);
            $this.animate({
                opacity: 1
            }, 0);
        });
       
        
       $this.click(function(e){
            e.preventDefault();
            var num = $(this).attr('class');
            var c = num.substring(6, num.length);
            var Left = $gallery.items.outerWidth()*(c-1);
            $gallery.items.parent().animate({
                opacity: 0,
                marginLeft: -Left
            }, 0, null, function(){
                $(this).animate({
                    opacity: 1
                }, 1000);
            });
                        
        });
        
    });
    
}

