<?php

class Home extends Controller {
	
	function index()
	{
       
       // views/partials/header.php and footer.php autoloaded with each of this. 

		$template = $this->loadView('home');
		$template->render();
	}
}

?>
