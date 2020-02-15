variable "dev_ingress_ip" {}
variable "prod_ingress_ip" {}

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
  records = [var.dev_ingress_ip]
}

resource "aws_route53_record" "berekuk_wiki" {
  zone_id = data.aws_route53_zone.berekuk_ru.zone_id
  name    = "wiki"
  type    = "A"
  ttl     = "300"
  records = [var.prod_ingress_ip]
}

resource "aws_route53_record" "kocherga_club" {
  zone_id = data.aws_route53_zone.kocherga_club.zone_id
  name    = "kocherga.club"
  type    = "A"
  ttl     = "300"
  records = [var.prod_ingress_ip]
}

resource "aws_route53_record" "kocherga_club_ru" {
  zone_id = data.aws_route53_zone.kocherga_club_ru.zone_id
  name    = "kocherga-club.ru"
  type    = "A"
  ttl     = "300"
  records = [var.prod_ingress_ip]
}
