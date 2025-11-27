output "resource_group_name" {
  value = azurerm_resource_group.dev_rg.name
}

output "data_factory_name" {
  value = azurerm_data_factory.adf_lendingclub.name
}

output "pipeline_name" {
  value = azurerm_data_factory_pipeline.ingest_loan_pipeline.name
}
