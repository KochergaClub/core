locals {
  domain    = "kocherga-club.ru"
  s3_domain = "kocherga.s3.amazonaws.com" # TODO - move to variables
}

resource "aws_cloudfront_distribution" "website" {
  origin {
    domain_name = "dummy.kocherga-club.ru"
    origin_id   = "dummy"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.1", "TLSv1.2"]
    }
  }

  origin {
    domain_name = local.domain
    origin_id   = "website"

    custom_origin_config {
      http_port              = 80
      https_port             = 443
      origin_protocol_policy = "https-only"
      origin_ssl_protocols   = ["TLSv1.1", "TLSv1.2"]
    }
  }

  origin {
    domain_name = local.s3_domain
    origin_id   = "s3"

    s3_origin_config {
      origin_access_identity = ""
    }
  }

  enabled         = true
  is_ipv6_enabled = true

  default_cache_behavior {
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD"]
    target_origin_id = "dummy"

    forwarded_values {
      query_string = false

      cookies {
        forward = "none"
      }
    }

    viewer_protocol_policy = "allow-all"
  }

  # django static files
  ordered_cache_behavior {
    path_pattern     = "/static/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "s3"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    compress               = false
    viewer_protocol_policy = "redirect-to-https"
  }

  # django media files (mostly images)
  ordered_cache_behavior {
    path_pattern     = "/media/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "s3"

    forwarded_values {
      query_string = true # might be necessary for private/signed images

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 0
    compress               = false
    viewer_protocol_policy = "redirect-to-https"
  }

  # nextjs static files
  ordered_cache_behavior {
    path_pattern     = "/_next/*"
    allowed_methods  = ["GET", "HEAD", "OPTIONS"]
    cached_methods   = ["GET", "HEAD", "OPTIONS"]
    target_origin_id = "website"

    forwarded_values {
      query_string = true

      cookies {
        forward = "none"
      }
    }

    min_ttl                = 0
    default_ttl            = 86400
    max_ttl                = 31536000
    compress               = true
    viewer_protocol_policy = "redirect-to-https"
  }

  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  viewer_certificate {
    cloudfront_default_certificate = true
  }
}
