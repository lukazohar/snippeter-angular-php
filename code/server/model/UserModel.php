<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class UserModel extends Database
{
    public function getUsers()
    {
        return $this->select("SELECT * FROM users ORDER BY id ASC");
    }
    public function getUser($id)
    {
        return $this->select("SELECT * FROM users WHERE id = ?", ["i", $id]);
    }
    public function editUser($id, $firstName, $lastName, $username, $email)
    {
        return $this->edit("UPDATE users SET firstName = '" . $firstName . "', lastName = '" . $lastName . "', userName = '" . $username . "', email = '" . $email . "' WHERE id = " . $id);
    }
    
    public function login($email, $password)
    {
        return $this->select("SELECT * FROM users WHERE email = '" . $email . "' AND password = '" . $password . "'");
    }
    public function register($firstName, $lastName, $username, $email, $password)
    {
        /* if ($this->($sql) === TRUE) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
        return $this->select("SELECT * FROM users WHERE id = " + $id); */
    }
}
?>