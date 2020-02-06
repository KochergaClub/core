variable "aws_access_key" {}
variable "aws_secret_key" {}
variable "aws_bucket_name" {}
variable "aws_backend_user" {}
variable "aws_region" {}

provider "aws" {
  version = "~> 2.0"
  region  = var.aws_region
  access_key = var.aws_access_key
  secret_key = var.aws_secret_key
}

resource "aws_s3_bucket" "kocherga-backend" {
  bucket = var.aws_bucket_name
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}

resource "aws_iam_user" "kocherga-backend" {
  name = var.aws_backend_user
}

resource "aws_iam_access_key" "kocherga-backend" {
  user    = aws_iam_user.kocherga-backend.name
}

resource "aws_iam_user_policy" "kocherga-backend" {
  name = aws_iam_user.kocherga-backend.name
  user    = aws_iam_user.kocherga-backend.name

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.aws_bucket_name}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.aws_bucket_name}"
      ]
    }
  ]
}
EOF
}

output "kocherga-backend-iam-id" {
  value = aws_iam_access_key.kocherga-backend.id
  sensitive = true

}

output "kocherga-backend-iam-secret" {
  value = aws_iam_access_key.kocherga-backend.secret
  sensitive = true
}
