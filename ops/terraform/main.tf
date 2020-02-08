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
  source = "./kocherga-s3"

  aws_backend_user = "kocherga-backend"
  aws_bucket_name = "kocherga"
}

module "kocherga-s3-dev" {
  source = "./kocherga-s3"

  aws_backend_user = "kocherga-backend-berekuk-dev"
  aws_bucket_name = "kocherga-berekuk-dev"
}

module "kocherga-wiki-s3" {
  source = "./wiki-s3"

  bucket = "kocherga-wiki"
  user = "kocherga-wiki"
}
