    <body>
        <div id="container">
            <header>
                <div id="logo">
                </div> <?php //  #logo END  ?>
                <div id="nav">
                    <ul class="navLinks">
                        <li class="scroll"><a href="#inicio" class="selected">Inicio</a></li>
                        <li class="scroll"><a href="#historia">Historia</a></li>
                        <li class="scroll"><a href="#elaboracion">Elaboraci&oacute;n</a></li>
                        <li class="scroll"><a href="#catalogo">Cat&aacute;logo</a></li>
                        <li class="scroll"><a href="#galeria">Galer&iacute;a</a></li>
                        <li class="scroll"><a href="#links">Links</a></li>
                        <li class="scroll"><a href="#contactar">Contactar</a></li>
                        <li class="langSelected">
                            <ul class="submenu">
                                <li><img src="/static/img/SP.png"/></li>
                                <li><a href="/en/"><img src="/static/img/GB.png"/></a></li>
                                <li><a href="/fr/"><img src="/static/img/FR.png"/></a></li>
                            </ul>
                        </li>
                    </ul>
                </div> <?php //  #nav END  ?>
            </header>
            <div id="main" role="main" >
                <div id="firstRow" class="clear">
                    <div id="inicio" class="scrollToPage">
                        <div id="inicioContent" class="contentBox">
                            <p>Bienvenido a la página web de la almazara el Tendre.</p>
                        </div> <?php //  #inicioContent END  ?>
                    </div> <?php //  #inicio END  ?>
                    <div id="historia" class="scrollToPage">
                        <div id="historiaContent" class="contentBox">
                            <h1>Historia</h1>
                            <p>En los siglos pasados la comarca del Baix Vinalopó poseía una gran tradición olivarera, donde existían numerosas almazaras extendidas por toda la región. En ellas se cosechaba ese oro líquido propio del Mediterráneo y que tanta importancia tiene en nuestra dieta alimenticia.</p>
                            <p>La Almazara <strong>“El Tendre”</strong> es una empresa centenaria cuyos orígenes se remontan a <strong>1839</strong>, cuando Don Joaquín Sempere García molturaba la aceituna en la almazara situada en la callejuela Puertas Tahullas (actual Barrio del Raval). Más tarde, en 1873, la almazara fue trasladada al <strong>“Huerto del Tendre”</strong>, donde se encuentra ubicada actualmente y de la cual adquiere su nombre la marca.</p>
                        </div> <?php //  #historiaContent END  ?>
                    </div> <?php //  #historia END  ?>
                    <div id="elaboracion" class="scrollToPage">
                        <div id="elaboracionContent" class="contentBox">
                            <h1>Elaboraci&oacute;n</h1>
                            <p>La familia Sempere, durante 6 generaciones, ha mantenido la estructura familiar de la Almazara <strong>“El Tendre”</strong>, trasmitiendo a sus descendientes el arte tradicional más puro del proceso aceitero. De este modo, en esta almazara, a pesar de la modernización de los modos de producción que exige la continua evolución de la industria, siguen manteniéndose fieles al espíritu de la elaboración tradicional que han mantenido vivo desde <strong>1839</strong>.</p>
                        </div> <?php // #elaboracionContent END ?>
                    </div> <?php // #elaboracion END ?>
                    <?php //DO we even load this if there is no javascript? ?>
                    <div id="catalogo" class="scrollToPage">
                        <div id="catalogoContent">
                            <div class="flecha" id="prev"></div>
                            <div id="diapostivaContainer">
                                <div id="diapositivas">
                                    <div id="innerdiapos">
                                        <ul>
                                            <?php // NR = Normal Resolution, HR = High Resolution ?>
                                            <?php $files = glob("static/img/products/*", GLOB_ONLYDIR);
                                            $i = 1;
                                            foreach($files as $file) {  ?>
                                            <li id="diapo-<?= $i ?>" data-index="<?= $i ?>" class="diaposEach">
                                                <img src="/<?= $file ?>/nr.png" alt="">
                                            </li>
                                            <?php $i++; } ?>
                                        </ul>
                                    </div> <?php //  #innerdiapos END  ?>
                                </div><?php //  #diapostivas END  ?>
                            </div><?php //  #diapoisitvaContainer END  ?>
                            <div class="flecha" id="next"></div>
                            <div id="diaposNav">
                                <ul></ul>
                            </div>
                        </div> <?php //  #catalogoContent END  ?>
                    </div> <?php //  #catálogo END  ?>
                    <div id="galeria" class="scrollToPage">
                        <div id="galeriaContent">
                            <div id="STGallery">
                                <ol>
                                    <?php // NR = Normal Resolution, HR = High Resolution ?>
                                    <?php $files = glob("static/img/gallery/*", GLOB_ONLYDIR);
                                    $i = 1;
                                    foreach($files as $file) {  ?>
                                    <li id="image-<?= $i ?>" data-index="<?= $i ?>" class="STGalElement">
                                        <div class="STGElement">
                                            <div class="STGContent">
                                                <img src="/<?= $file ?>/nr.jpg"/>
                                            </div>
                                            <div class="STGThumb">
                                                <img src="/<?= $file ?>/thumb.png"  />
                                            </div>                    
                                        </div>
                                    </li>
                                    <?php $i++; } ?>    
                                </ol>
                            </div>
                            <div class="flecha" id="thumbs-prev"></div>
                            <div id="STGThumbs">
                                <ul>
                                </ul>
                            </div>
                            <div class="flecha" id="thumbs-next"></div>
                        </div> <?php //  #galeriaContent END  ?>
                    </div> <?php //  #galeria END  ?>
                    <div id="links" class="scrollToPage">
                        <div id="linksContent" class="contentBox">              
                            <h1>Amigos De "El Tendre"</h1>
                            <ul>
                                <li><a href="http://www.sys.es/" target="_blank">Destilerías SYS</a></li>
                                <li><a href="http://www.carrizales.es/"  target="_blank">Carrizales</a></li>
                                <li><a href="http://www.vinosladama.com/" target="_blank">Bodegas Faelo (Matola)</a></li>
                                <li><a href="http://www.lacteossegarra.com/" target="_blank">Lácteos Segarra</a></li>
                                <li><a href="http://www.a-dalua.com/" target="_blank">Confitería Dalua</a></li>
                                <li><a href="http://www.granavida.com/" target="_blank">Granavida</a></li>
                                <li><a href="http://www.campodeelche.com/" target="_blank">Campo de Elche</a></li>
                                <li><a href="http://www.turismeruralelx.es/" target="_blank">Associació per el desenvolupament del camp d'Elx</a></li>
                                <li><a href="http://www.infusionesibarra.es" target="_blank">Infusiones Ibarra</a></li>
                                <li><a href="http://www.infusionesibarra.es" target="_blank">TOMAChaf</a></li>
                            </ul>
                        </div> <?php //  #linksContent END  ?>
                    </div> <?php //  #links END  ?>
                    <div id="contactar" class="scrollToPage">
                        <div id="contactarContent" class="contentBox">
                            <div id="formulario">
                                <form id="contacto" action="/mailform/" method="post">
                                    <h1 style="padding-bottom: 10px; border-bottom: 2px solid white;">Formulario de contacto</h1>
                                    <div style="margin-top: 32px;">Nombre</div><input id="name" type="text" name="nombre"/>
                                    <div>Email</div><input id="mail" type="text" name="Email"/>
                                    <div>Tel&eacute;fono</div><input id="phone" type="text" name="Phone"/>
                                    <div>Mensaje</div><textarea id="comentario" name="comentario"></textarea>
                                    <div id="send" class="">ENVIAR</div>
                                    <!-- <input type="submit" value="Enviar" id="send"> -->
                                </form>
                            </div> <?php //  #formulario END  ?>  
                        </div> <?php //  #contactarContent END  ?>
                        <div id="contactarMapa" style=" "></div>
                    </div> <?php //  #contactar END  ?>
                </div> <?php //  end of #firstRow  ?>
                <footer>
                    <div id="footer">
                        <div id="copyright">
                            <p>© 2011 - <?= date("Y") ?> - Almazara El Tendre - Ptda. Alzabares Alto, 233 - 03290 - Tlf. 34 965 452 339</p>
                        </div> <?php //  #copyright END  ?>
                        <div id="dev">
                            <p><a href="http://73dev.com" target="_blank">73dev</a></p>
                        </div> <?php //  #73dev END  ?>
                    </div> <?php //  #footer END  ?>
                </footer>
            </div> <?php // ! end of #main  ?>
</div> <!-- end of #container -->