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
  subscription_id = "40eb037e-d024-4c58-87f1-d78cc8f11844"
}

resource "azurerm_resource_group" "prod_rg" {
  name     = "lendingclub-prod-rg"
  location = var.location
}

resource "azurerm_storage_account" "prod_adls" {
  name                     = "lcprodadls"
  resource_group_name      = azurerm_resource_group.prod_rg.name
  location                 = azurerm_resource_group.prod_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  is_hns_enabled           = true
  min_tls_version          = "TLS1_2"
}

resource "azurerm_storage_container" "prod_container" {
  name                  = "lcloansprod"
  storage_account_name  = azurerm_storage_account.prod_adls.name
  container_access_type = "private"
}
