variable "main_floating_ip" {}
variable "k3s_dev_master_ip" {}
variable "k3s_prod_master_ip" {}

data "aws_route53_zone" "kocherga_club" {
  name         = "kocherga.club."
}

data "aws_route53_zone" "kocherga_club_ru" {
  name         = "kocherga-club.ru"
}

data "aws_route53_zone" "berekuk_ru" {
  name         = "berekuk.ru"
}

resource "aws_route53_record" "ingress_dev" {
  zone_id = data.aws_route53_zone.kocherga_club.zone_id
  name    = "*.dev"
  type    = "A"
  ttl     = "300"
  records = [var.k3s_dev_master_ip]
}

resource "aws_route53_record" "ingress_prod" {
  zone_id = data.aws_route53_zone.kocherga_club.zone_id
  name    = "*.k8s"
  type    = "A"
  ttl     = "300"
  records = [var.k3s_prod_master_ip]
#  records = [main_floating_ip]
}

resource "aws_route53_record" "berekuk_wiki" {
  zone_id = data.aws_route53_zone.berekuk_ru.zone_id
  name    = "wiki"
  type    = "A"
  ttl     = "300"
#  records = [main_floating_ip]
  records = [var.k3s_prod_master_ip]
}
