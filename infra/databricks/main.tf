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

resource "azurerm_resource_group" "dbfs_rg" {
  name     = "lendingclub-dbfs-rg"
  location = var.location
}

resource "azurerm_databricks_workspace" "lcdbfs" {
  name                = "lcdbfs"
  resource_group_name = azurerm_resource_group.dbfs_rg.name
  location            = azurerm_resource_group.dbfs_rg.location

  sku = "premium" 

  managed_resource_group_name = "lcdbfs-managed-rg"

  custom_parameters {
    no_public_ip = true  
  }
}
