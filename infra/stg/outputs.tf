output "resource_group_name" {
  value = azurerm_resource_group.stg_rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.stg_adls.name
}

output "container_name" {
  value = azurerm_storage_container.stg_container.name
}
