resource "aws_s3_bucket" "bucket" {
  bucket = var.bucket
  acl    = "private"

  versioning {
    enabled = true
  }

  dynamic "cors_rule" {
    for_each = var.cors ? [1] : []
    content {
      allowed_headers = ["*"]
      allowed_methods = ["GET", "HEAD"]
      allowed_origins = ["*"]
      expose_headers  = ["ETag"]
      max_age_seconds = 3600
    }
  }
}

resource "aws_iam_user" "user" {
  name = var.user
}

resource "aws_iam_access_key" "user-key" {
  user = aws_iam_user.user.name
}

resource "aws_iam_user_policy" "policy" {
  name = aws_iam_user.user.name
  user = aws_iam_user.user.name

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

resource "aws_iam_user_policy" "backup-policy" {
  count = var.backup_bucket != "" ? 1 : 0

  name = "${aws_iam_user.user.name}--backups"
  user = aws_iam_user.user.name

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
        "arn:aws:s3:::${var.backup_bucket}/*"
      ]
    },
    {
        "Effect": "Allow",
        "Action": [
            "s3:Get*",
            "s3:List*"
        ],
        "Resource": [
            "arn:aws:s3:::${var.backup_bucket}"
        ]
    }
  ]
}
EOF
}
