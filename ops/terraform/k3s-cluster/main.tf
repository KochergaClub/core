resource "hcloud_server" "master" {
  name = "${var.cluster_name}-master"
  server_type = var.master_type
  image = var.image
  location = var.location
  ssh_keys = var.ssh_keys
  labels = {
    "k3s" = "true"
    "k3s_role" = "master"
    "k3s_cluster" = var.cluster_name
  }
}

resource "hcloud_server" "node" {
  count = var.node_count
  name = "${var.cluster_name}-node-${count.index}"
  server_type = var.node_type
  image = var.image
  location = var.location
  ssh_keys = var.ssh_keys
  labels = {
    "k3s" = "true"
    "k3s_role" = "node"
    "k3s_cluster" = var.cluster_name
  }
}
