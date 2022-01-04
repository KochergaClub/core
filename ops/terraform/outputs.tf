output "kocherga-backend-iam-id" {
  value = module.kocherga-s3.iam-id
  sensitive = true
}

output "kocherga-backend-iam-secret" {
  value = module.kocherga-s3.iam-secret
  sensitive = true
}

output "kocherga-backend-dev-iam-id" {
  value = module.kocherga-s3-dev.iam-id
  sensitive = true
}

output "kocherga-backend-dev-iam-secret" {
  value = module.kocherga-s3-dev.iam-secret
  sensitive = true
}

output "kocherga-wiki-iam-id" {
  value = module.kocherga-wiki-s3.iam-id
  sensitive = true
}

output "kocherga-wiki-iam-secret" {
  value = module.kocherga-wiki-s3.iam-secret
  sensitive = true
}

output "berekuk-wiki-iam-id" {
  value = module.berekuk-wiki-s3.iam-id
  sensitive = true
}

output "berekuk-wiki-iam-secret" {
  value = module.berekuk-wiki-s3.iam-secret
  sensitive = true
}

output "vault-iam-id" {
  value = module.vault-s3.iam-id
  sensitive = true
}

output "vault-iam-secret" {
  value = module.vault-s3.iam-secret
  sensitive = true
}

output "gitlab-runner-vault-token" {
  value = vault_token.gitlab-runner.client_token
  sensitive = true
}
