output "resource_group_name" {
  value = azurerm_resource_group.ingest_rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.ingest_adls.name
}

output "ingestion_container_name" {
  value = azurerm_storage_container.ingestion_container.name
}

output "processed_container_name" {
  value = azurerm_storage_container.processed_container.name
}
