<?php
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
class SnippetModel extends Database
{
    public function getSnippetsByUserId($userId)
    {
        return $this->select("SELECT * FROM snippets WHERE userId = " . $userId . " ORDER BY id ASC");
    }
    public function getSnippet($id)
    {
        return $this->select("SELECT * FROM snippets WHERE id = " . $id);
    }
    public function addSnippet($name, $prefix, $description, $body, $userId)
    {
        if (isset($userId)) {
            return $this->edit("INSERT INTO snippets (name, prefix, description, body, userId) VALUES ('" . $name . "', '" . $prefix . "', '" . $description . "', '" . $body . "', '" . $userId . "')");
        } else {
            return $this->edit("INSERT INTO snippets (name, prefix, description, body) VALUES ('" . $name . "', '" . $prefix . "', '" . $description . "', '" . $body . "');");
        }
    }
    public function editSnippet($id, $name, $prefix, $description, $body)
    {
        return $this->edit("UPDATE snippets SET name = '" . $name . "', prefix = '" . $prefix . "', description = '" . $description . "', body = '" . $body . "' WHERE id = " . $id);
    }
    public function deleteSnippet($id)
    {
        return $this->edit("DELETE FROM snippets WHERE id = " . $id);
    }
}
?>