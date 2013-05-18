<?php

class Main extends Controller {
	
	function index()
	{
        // Maybe check if there is a session or something similar
        // to see what lenguage we last visited.

		$template = $this->loadView('intro');
		$template->render();
	}
}

?>
