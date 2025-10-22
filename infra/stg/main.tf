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

resource "azurerm_resource_group" "stg_rg" {
  name     = "lendingclub-stg-rg"
  location = "Canada Central"
}

resource "azurerm_storage_account" "stg_adls" {
  name                     = "lcstgadls"
  resource_group_name      = azurerm_resource_group.stg_rg.name
  location                 = azurerm_resource_group.stg_rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"
  is_hns_enabled           = true
  min_tls_version          = "TLS1_2"
}
