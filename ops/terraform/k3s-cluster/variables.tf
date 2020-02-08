variable "cluster_name" {}

variable "cluster_node_count" {
  default = 0
}
variable "cluster_server_type" {
  default = "cx21"
}
variable "cluster_location" {
  default = "fsn1"
}
variable "cluster_image" {
  default = "ubuntu-18.04"
}
variable "cluster_ssh_keys" {
  default = ["berekuk@mmcleric-osx"]
}
