terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
      version    = "~> 3.0"
    }
    gitlab = {
      source = "gitlabhq/gitlab"
    }
    hcloud = {
      source = "hetznercloud/hcloud"
    }
    vault = {
      source = "hashicorp/vault"
    }
  }
  required_version = ">= 0.13"
}
