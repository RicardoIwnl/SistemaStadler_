<?php
    require_once 'Conexao.php';

    public function Empresas{

        private id;
        private nomeFantasia;
        private razaoSocial;
        private cnpj;
        private logradouro;
        private cidade;
        private estado;
        private cep;
        private formaTributacao;
        private tipoEmpresa;
        private cnae;
        private honorario;
        private vencimento; 
        private dataEntrada;

        public funcion setId($id){
            $this->id=$id;
        }        

        public function getid(){
            return $this->id;
        }

        public function setNomeFantasia($nomeFantasia){
            $this->nomeFantasia=$nomeFantansia;
        }

        public function getNomeFantasia(){
            return $this->nomeFantasia;
        }

        public function setrazaoSocial($razaoSocial){
            $this->razaoSocial=$razaoSocial;
        }

        public function getrazaoSocial(){
            return $this->razaoSocial;
        }

        public function setcnpj($cnpj){
            $this->cnpj=$cnpj;
        }

        public function getcnpj(){
            return $this->$cnpj;
        }

        public function setlogradouro($logradouro){
            $this->logradouro=$logradouro;
        }

        public function getlogradouro(){
            return $this->$logradouro;
        }

        public function setcidade($cidade){
            $this->cidade=$cidade;
        }

        public function getcidade(){
            return $this->$cidade;
        }

        public function set($estado){
            $this->estado=$estado;
        }

        public function getestado(){
            return $this->$estado;
        }

        public function set($cep){
            $this->cep=$cep;
        }

        public function getcep(){
            return $this->$cep;
        }

        public function setformaTributacao($formaTributacao){
            $this->formaTributacao=$formaTributacao;
        }

        public function getformaTributacao(){
            return $this->$formaTributacao;
        }

        public function settipoEmpresa($tipoEmpresa){
            $this->tipoEmpresa=$tipoEmpresa;
        }

        public function gettipoEmpresa(){
            return $this->$tipoEmpresa;
        }

        public function setcnae($cnae){
            $this->cnae=$cnae;
        }

        public function getcnae(){
            return $this->$cnae;
        }

        public function sethonorario($honorario){
            $this->honorario=$honorario;
        }

        public function gethonorario(){
            return $this->$honorario;
        }

        public function setvencimento($vencimento){
            $this->vencimento=$vencimento;
        }

        public function getvencimento(){
            return $this->$vencimento;
        }

        public function setdataEntrada($dataEntrada){
            $this->dataEntrada=$dataEntrada;
        }

        public function getdataEntrada(){
            return $this->$dataEntrada;
        }
    
    }
?>