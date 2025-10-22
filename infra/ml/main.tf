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

resource "azurerm_resource_group" "dev_rg" {
  name     = "lendingclub-dev-rg"
  location = "Canada Central"
}

resource "azurerm_data_factory_pipeline" "ingest_loan_pipeline" {
  name            = "Pipeline_Ingest_Loan"
  data_factory_id = azurerm_data_factory.adf_lendingclub.id
  definition      = file("${path.module}/adf_pipelines/Pipeline_Ingest_Loan.json")
}

