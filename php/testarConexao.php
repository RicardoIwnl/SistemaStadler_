<?php
require_once 'Conexao.php';

// Instancia a classe Conexao para verificar a conexão com o banco de dados
try {
    $conexao = new Conexao();
    echo "Conexão com o banco de dados realizada com sucesso!";
} catch (Exception $e) {
    echo "Erro ao conectar com o banco de dados: " . $e->getMessage();
}
?>
