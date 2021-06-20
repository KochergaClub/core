workers = 4
timeout = 180
bind = "0.0.0.0:80"
worker_class = "uvicorn.workers.UvicornWorker"
max_requests = 1000
