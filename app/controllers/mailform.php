<?php

class MailForm extends Controller {
    
    private $_username  = 'gladOS@73dev.com';
    private $_password  = 'passw0rd';
    private $_from      = array('gladOS@73dev.com' => '73Dev Robot');
    protected $logfile    = '../sentMails.log';
    private $message;
    private $mailer;

    public function __construct() {
        $this->loadPlugin('swiftmailer');
        // $this->loadPlugin('logger');
        if (!file_exists($this->logfile)) {
            if (!touch($this->logfile)) throw new \InvalidArgumentException('Log file ' . $this->logfile . ' cannot be created');
        }
        if (!is_writable($this->logfile)) throw new \InvalidArgumentException('Log file ' . $this->logfile . ' is not writeable');
        // $this->log('testing the log thingy!');
        $transport = Swift_SmtpTransport::newInstance('smtp.gmail.com', 465, 'ssl')
          ->setUsername($this->_username)
          ->setPassword($this->_password)
          ;
        $this->mailer = Swift_Mailer::newInstance($transport);
        // $this->message = Swift_Message::newInstance()  
        //     // Give the message a subject
        //     ->setSubject('Testing 1... 2 ... 3')

        //     // Set the From address with an associative array
        //     ->setFrom(array('gladOS@73dev.com' => 'GladOS'))

        //     // Set the To addresses with an associative array
        //     ->setTo(array('semrah@gmail.com'))

        //     // Give it a body
        //     ->setBody('Here is the message itself')

        //     // And optionally an alternative body
        //     ->addPart('<q>Here is the message itself</q>', 'text/html');
    }
    function index()
    {
        $this->name = $_POST['nombre'];
        $this->email = $_POST["Email"];
        $this->phone = $_POST["Phone"];
        $this->comment = $_POST['comentario'];

        $this->message = Swift_Message::newInstance()
            ->setSubject('Formulario de contacto')

            // Set the From address with an associative array
            ->setFrom(array('gladOS@73dev.com' => 'GladOS'))

            // Set the To addresses with an associative array
            ->setTo(array('semrah@gmail.com'))

            // Give it a body
            ->addPart('<html>
                        <head>
                            <title>Formulario de contacto</title>
                            <style type="text/css">
                            </style>
                        </head>
                        <body>
                            <table  width="100%" border="1" cellspacing="2" cellpadding="2">
                                <tr bgcolor="#eeffee">
                                    <td>Nombre</td>
                                    <td>' . $this->name . ' </td>
                                </tr>
                                <tr bgcolor="#eeeeff">
                                    <td>Email</td>
                                    <td>' . $this->email . ' </td>
                                </tr>
                                            <tr bgcolor="#eeffee">
                                    <td>Telefono</td>
                                    <td>' . $this->phone . ' </td>
                                </tr>
                                <tr bgcolor="#eeeeff">
                                    <td>Contenido</td>
                                    <td>' . nl2br($this->comment) . ' </td>
                                </tr>
                            </table>
                        </body>
                    </html>', 'text/html');

            // And optionally an alternative body
            

            try {
                $this->message->setReplyTo($this->email);
            } catch (Swift_RfcComplianceException $e) {
                print_r($e->getMessage());
            }
        //if ( $this->name != "" || $this->email != "" || $this->comment != "") {
        // try {
        //    if ($this->mailer->send($this->message, $this->failures)) {
        //         $status = TRUE;
        //         $message = 'Mensaje enviado.';
        //         $this->log('Correo enviado satisfactoriamente desde ' . $this->email . ' a El Tendre.');
        //     } else {
        //         print_r($this->failures);
        //     }
            
        // } catch (Swift_RfcComplianceException $e) {
        //     print('Email address not valid:' . $e->getMessage());
        // }
            // if () {
                
            // } else {
            //     //echo "blarg!";
            //     $status = FALSE;
            //     // $message = stripslashes($mail->ErrorInfo);
            //     $message = 'Error de algun tipo!!!!';
            // }
       // } else {
        //     $status = FALSE;
        //     $message = "Los campos 'Nombre', 'Email', y 'Mensaje', son obligatorios";
        // }
        $json = array(
            'status' => $status,
            'message' => $message,
        );
        echo json_encode($json);

    }
    private function log($message) {
        $logline = '[' . date('Y-m-d h:m:i') . '] ' . $message . "\n";
        file_put_contents($this->logfile, $logline, FILE_APPEND);
    }
}

?>