output "master_ip" {
  value = hcloud_server.master.ipv4_address
}

output "node_ips" {
  value = hcloud_server.node[*].ipv4_address
}

output "ingress_node_id" {
  value = length(hcloud_server.node) > 0 ? hcloud_server.node[0].id : 0
}
