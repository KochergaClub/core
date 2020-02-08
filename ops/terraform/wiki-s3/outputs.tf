output "wiki-iam-id" {
  value = aws_iam_access_key.access-key.id
  sensitive = true

}

output "wiki-iam-secret" {
  value = aws_iam_access_key.access-key.secret
  sensitive = true
}
