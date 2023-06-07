<?php
require_once PROJECT_ROOT_PATH . "\Model\Database.php";
class SnippetModel extends Database
{
    public function getSnippets($userId)
    {
        return $this->select("SELECT * FROM snippets WHERE userId = " . $userId . " ORDER BY id ASC");
    }
    public function getSnippet($id)
    {
        return $this->select("SELECT * FROM snippets WHERE id = " . $id);
    }
    public function addSnippet($name, $prefix, $description, $body)
    {
        return $this->select("INSERT INTO snippets (name, prefix, description, body) VALUES ('" . $name . "', '" . $prefix . "', '" . $description . "', '" . $body . "');");
    }
    /* public function editSnippet($id)
    {
        return $this->select("SELECT * FROM snippets WHERE id = " . $id);
    } */
    public function deleteSnippet($id)
    {
        return $this->select("DELETE FROM snippets WHERE id = " . $id);
    }
}
?>