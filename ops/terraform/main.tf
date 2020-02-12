provider "aws" {
  version = "~> 2.0"
  region  = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

provider "hcloud" {
  token = var.hcloud_token
}

module "kocherga-backups" {
  source = "./s3-backups"
  bucket = "kocherga-backups"
}

module "berekuk-backups" {
  source = "./s3-backups"
  bucket = "berekuk-backups"
}

module "k3s-dev" {
  source = "./k3s-cluster"

  cluster_name = "k3s-dev"
  cluster_node_count = 0
}

module "k3s-prod" {
  source = "./k3s-cluster"

  cluster_name = "k3s-prod"
  cluster_node_count = 1
}

module "kocherga-s3" {
  source = "./s3"

  bucket = "kocherga"
  user = "kocherga-backend"
  cors = true
  backup_bucket = "kocherga-backups"
}

module "kocherga-s3-dev" {
  source = "./s3"

  bucket = "kocherga-berekuk-dev"
  user = "kocherga-backend-berekuk-dev"
  cors = true
}

module "kocherga-wiki-s3" {
  source = "./s3"

  bucket = "kocherga-wiki"
  user = "kocherga-wiki"
  backup_bucket = "kocherga-backups"
}

module "berekuk-wiki-s3" {
  source = "./s3"

  bucket = "berekuk-wiki"
  user = "berekuk-wiki"
  backup_bucket = "berekuk-backups"
}

resource "hcloud_server" "old_server" {
  name = "kocherga.club"
  backups = true
  server_type = "cx21"
  image = "ubuntu-18.04"
  location = "fsn1"
}

resource "hcloud_floating_ip" "main" {
  type = "ipv4"
  server_id = hcloud_server.old_server.id
}

module "dns" {
  source = "./dns"

  main_floating_ip = hcloud_floating_ip.main.ip_address
  k3s_dev_master_ip = module.k3s-dev.master_ip
  k3s_prod_master_ip = module.k3s-prod.master_ip
}
