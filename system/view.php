<?php

class View {

	private $pageVars = array();
	private $template;

	public function __construct($template)
	{
		$this->pageVars['page'] = $template;
		$this->pageVars[$template] = 'current';
		$this->template = APP_DIR .'views/'. $template .'.php';
	}

	public function set($var, $val)
	{
		$this->pageVars[$var] = $val;
	}

	public function render()
	{
		extract($this->pageVars);

		ob_start();
		require_once APP_DIR .'views/partials/header.php';
		require($this->template);
		require_once APP_DIR .'views/partials/footer.php';
		echo ob_get_clean();
	}
    
}

?>