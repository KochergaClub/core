resource "hcloud_server" "master" {
  name = "${var.cluster_name}-master"
  server_type = var.cluster_server_type
  image = var.cluster_image
  location = var.cluster_location
  ssh_keys = var.cluster_ssh_keys
  labels = {
    "k3s" = "true"
    "k3s_role" = "master"
    "k3s_cluster" = var.cluster_name
  }
}

resource "hcloud_server" "node" {
  count = var.cluster_node_count
  name = "${var.cluster_name}-node-${count.index}"
  server_type = var.cluster_server_type
  image = var.cluster_image
  location = var.cluster_location
  ssh_keys = var.cluster_ssh_keys
  labels = {
    "k3s" = "true"
    "k3s_role" = "node"
    "k3s_cluster" = var.cluster_name
  }
}
