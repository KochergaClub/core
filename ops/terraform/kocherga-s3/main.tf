resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket
  acl    = "private"

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "HEAD"]
    allowed_origins = ["*"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3600
  }
}

resource "aws_iam_user" "backend-user" {
  name = var.user
}

resource "aws_iam_access_key" "backend-user-key" {
  user    = aws_iam_user.backend-user.name
}

resource "aws_iam_user_policy" "backend-policy" {
  name = aws_iam_user.backend-user.name
  user    = aws_iam_user.backend-user.name

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
        "arn:aws:s3:::${var.bucket}/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": [
        "s3:Get*",
        "s3:List*"
      ],
      "Resource": [
        "arn:aws:s3:::${var.bucket}"
      ]
    }
  ]
}
EOF
}
