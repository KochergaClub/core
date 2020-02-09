variable "k3s_dev_master_ip" {}

data "aws_route53_zone" "kocherga_club" {
  name         = "kocherga.club."
}

resource "aws_route53_record" "www" {
  zone_id = data.aws_route53_zone.kocherga_club.zone_id
  name    = "*.dev"
  type    = "A"
  ttl     = "300"
  records = [var.k3s_dev_master_ip]
}
