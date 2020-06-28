resource "hcloud_server" "server" {
  name        = "openvidu"
  server_type = "cx21"
  image       = "ubuntu-18.04"
  location    = "fsn1"
  ssh_keys    = ["berekuk@mmcleric-osx"]
  labels = {
    "openvidu" = "true"
  }
}
