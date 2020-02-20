provider "vault" {}

resource "vault_policy" "gitlab-runner" {
  name = "gitlab-runner"

  policy = <<EOT
path "kv/data/chart-secrets/core/prod/*" {
  capabilities = ["read"]
}
EOT
}

resource "vault_token" "gitlab-runner" {
  policies = ["gitlab-runner"]
}
