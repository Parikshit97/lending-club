terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 4.0"
    }
  }

  required_version = ">= 1.6.0"

  backend "local" {}
}

provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "ml_rg" {
  name     = "lendingclub-ml-rg"
  location = var.location
}

resource "azurerm_storage_account" "ml_storage" {
  name                     = "lendingclubstorage"
  resource_group_name      = azurerm_resource_group.ml_rg.name
  location                 = azurerm_resource_group.ml_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  is_hns_enabled           = true
  min_tls_version          = "TLS1_2"
}

resource "azurerm_data_factory" "adf_lendingclub" {
  name                = "adf-lendingclub"
  location            = azurerm_resource_group.ml_rg.location
  resource_group_name = azurerm_resource_group.ml_rg.name
}

resource "azurerm_data_factory_pipeline" "ingest_loan_pipeline" {
  name            = "Pipeline_Ingest_Loan"
  data_factory_id = azurerm_data_factory.adf_lendingclub.id
}
