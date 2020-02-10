output "kocherga-backend-iam-id" {
  value = module.kocherga-s3.iam-id
}

output "kocherga-backend-iam-secret" {
  value = module.kocherga-s3.iam-secret
}

output "kocherga-wiki-iam-id" {
  value = module.kocherga-wiki-s3.iam-id
}

output "kocherga-wiki-iam-secret" {
  value = module.kocherga-wiki-s3.iam-secret
}

output "berekuk-wiki-iam-id" {
  value = module.berekuk-wiki-s3.iam-id
}

output "berekuk-wiki-iam-secret" {
  value = module.berekuk-wiki-s3.iam-secret
}
