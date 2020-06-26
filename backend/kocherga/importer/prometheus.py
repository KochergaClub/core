from prometheus_client import Counter, Gauge

success_counter = Counter(
    'kocherga_importer_success_count', 'Successful import runs', ['importer']
)
failure_counter = Counter(
    'kocherga_importer_failure_count', 'Failed import runs', ['importer']
)
importers_gauge = Gauge('kocherga_importer_count', 'Total number of importers')
