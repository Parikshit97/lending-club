output "resource_group_name" {
  description = "Name of the Databricks resource group"
  value       = azurerm_resource_group.dbfs_rg.name
}

output "databricks_workspace_url" {
  description = "Databricks workspace URL"
  value       = azurerm_databricks_workspace.lcdbfs.workspace_url
}

output "databricks_workspace_id" {
  description = "Databricks workspace resource ID"
  value       = azurerm_databricks_workspace.lcdbfs.id
}
