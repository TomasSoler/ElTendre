<?php

class Es extends Controller {
    
    function index()
    {
        $template = $this->loadView('es');
        $template->render();
    }
}

?>
