provider "vault" {
  address = "https://vault.team.kocherga.club"
}

provider "gitlab" {
  token = var.gitlab_token
}

resource "vault_policy" "gitlab-runner" {
  name = "gitlab-runner"

  policy = <<EOT
path "kv/data/chart-secrets/core/prod/*" {
  capabilities = ["read"]
}
EOT
}

resource "vault_token" "gitlab-runner" {
  policies  = ["gitlab-runner"]
  no_parent = true
}

resource "gitlab_group" "kocherga" {
  name = "Кочерга"
  path = "kocherga"
}

resource "gitlab_project" "core" {
  namespace_id     = gitlab_group.kocherga.id
  name             = "core"
  description      = "Основной репозиторий с кодом центра рациональности Кочерга."
  visibility_level = "public"
  default_branch   = "master"
  snippets_enabled = false
  lfs_enabled      = false
  wiki_enabled     = false
}

resource "gitlab_project_variable" "vault_token" {
  project = gitlab_project.core.id
  key     = "VAULT_TOKEN"
  value   = vault_token.gitlab-runner.client_token
  protected = true
  environment_scope = "*"
}
