provider "google-beta" {
  project = "${var.project}"
  region  = "${var.region}"
}

resource "google_container_cluster" "demo" {
  provider = "google-beta"

  name     = "${var.name}"
  location = "${var.region}"

  remove_default_node_pool = true
  initial_node_count       = 3

  # Setting an empty username and password explicitly disables basic auth
  master_auth {
    username = ""
    password = ""
  }

  node_config {
    preemptible = true

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }

  addons_config {
    istio_config {
      disabled = "${!var.enable_istio}"
    }
  }
}

resource "google_container_node_pool" "primary" {
  name       = "${var.name}-primary"
  location   = "${var.region}"
  project    = "${var.project}"
  cluster    = "${google_container_cluster.demo.name}"
  node_count = 2

  node_config {
    preemptible  = true
    machine_type = "n1-standard-2"

    oauth_scopes = [
      "https://www.googleapis.com/auth/compute",
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
    ]
  }
}
