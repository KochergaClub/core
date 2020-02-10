provider "aws" {
  version = "~> 2.0"
  region  = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

provider "hcloud" {
  token = var.hcloud_token
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

  user = "kocherga-backend"
  bucket = "kocherga"
  cors = true
}

module "kocherga-s3-dev" {
  source = "./s3"

  user = "kocherga-backend-berekuk-dev"
  bucket = "kocherga-berekuk-dev"
  cors = true
}

module "kocherga-wiki-s3" {
  source = "./s3"

  bucket = "kocherga-wiki"
  user = "kocherga-wiki"
}

module "berekuk-wiki-s3" {
  source = "./s3"

  bucket = "berekuk-wiki"
  user = "berekuk-wiki"
}

module "dns" {
  source = "./dns"

  k3s_dev_master_ip = module.k3s-dev.master_ip
  k3s_prod_master_ip = module.k3s-prod.master_ip
}
