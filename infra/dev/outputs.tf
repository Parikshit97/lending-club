output "resource_group_name" {
  value = azurerm_resource_group.dev_rg.name
}

output "storage_account_name" {
  value = azurerm_storage_account.dev_adls.name
}

output "container_name" {
  value = azurerm_storage_container.dev_container.name
}
