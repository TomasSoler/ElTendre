<?php

class En extends Controller {
    
    function index()
    {
        $template = $this->loadView('en');
        $template->render();
    }
}

?>
