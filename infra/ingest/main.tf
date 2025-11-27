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

resource "azurerm_resource_group" "ingest_rg" {
  name     = "lendingclub-ingest-rg"
  location = var.location
}

resource "azurerm_storage_account" "ingest_adls" {
  name                     = "lcingestadls"
  resource_group_name      = azurerm_resource_group.ingest_rg.name
  location                 = azurerm_resource_group.ingest_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  is_hns_enabled           = true
  min_tls_version          = "TLS1_2"
}

resource "azurerm_storage_container" "ingestion_container" {
  name                  = "ingestion"
  storage_account_name  = azurerm_storage_account.ingest_adls.name
  container_access_type = "private"
}

resource "azurerm_storage_container" "processed_container" {
  name                  = "processed"
  storage_account_name  = azurerm_storage_account.ingest_adls.name
  container_access_type = "private"
}
