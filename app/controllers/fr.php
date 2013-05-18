<?php

class Fr extends Controller {
    
    function index()
    {
        $template = $this->loadView('fr');
        $template->render();
    }
}

?>
