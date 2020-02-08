locals {
  bucket = var.bucket
  user = var.user
}

resource "aws_s3_bucket" "bucket" {
  bucket = local.bucket
  acl    = "private"
}

resource "aws_iam_user" "user" {
  name = local.user
}

resource "aws_iam_access_key" "access-key" {
  user    = aws_iam_user.user.name
}

resource "aws_iam_user_policy" "user-policy" {
  name = aws_iam_user.user.name
  user    = aws_iam_user.user.name

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
        "arn:aws:s3:::${local.bucket}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::${local.bucket}"
      ]
    }
  ]
}
EOF
}
