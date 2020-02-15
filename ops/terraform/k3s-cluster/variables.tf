variable "cluster_name" {}

variable "node_count" {
  default = 0
}
variable "master_type" {
  default = "cx11"
}
variable "node_type" {
  default = "cx31"
}
variable "location" {
  default = "fsn1"
}
variable "image" {
  default = "ubuntu-18.04"
}
variable "ssh_keys" {
  default = ["berekuk@mmcleric-osx"]
}
