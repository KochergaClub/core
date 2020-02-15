output "iam-id" {
  value = aws_iam_access_key.user-key.id
  sensitive = true

}

output "iam-secret" {
  value = aws_iam_access_key.user-key.secret
  sensitive = true
}
