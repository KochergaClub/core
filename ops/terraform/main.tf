provider "aws" {
  region     = var.aws_region
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

module "k3s-prod" {
  source = "./k3s-cluster"

  cluster_name = "k3s-prod"
  master_type  = "cx11"
  node_type    = "cx31"
  node_count   = 3
}

# module "openvidu" {
#   source = "./openvidu"
# }

module "kocherga-s3" {
  source = "./s3"

  bucket        = "kocherga"
  user          = "kocherga-backend"
  cors          = true
  backup_bucket = "kocherga-backups"
}

module "kocherga-s3-dev" {
  source = "./s3"

  bucket = "kocherga-dev2"
  user   = "kocherga-backend-dev"
  cors   = true
}

module "kocherga-wiki-s3" {
  source = "./s3"

  bucket        = "kocherga-wiki"
  user          = "kocherga-wiki"
  backup_bucket = "kocherga-backups"
}

module "berekuk-wiki-s3" {
  source = "./s3"

  bucket        = "berekuk-wiki"
  user          = "berekuk-wiki"
  backup_bucket = "berekuk-backups"
}

module "vault-s3" {
  source = "./s3"

  bucket = "kocherga-vault"
  user   = "kocherga-vault"
}

resource "hcloud_floating_ip" "main" {
  type      = "ipv4"
  server_id = module.k3s-prod.ingress_node_id
}

module "dns" {
  source = "./dns"

  prod_ingress_ip = hcloud_floating_ip.main.ip_address
  #  dev_ingress_ip  = module.k3s-dev.master_ip
  # openvidu_ip = module.openvidu.ip
  kkm_ip      = var.kkm_ip
}

module "cloudfront" {
  source = "./cloudfront"
}
