import logging
logger = logging.getLogger(__name__)

class Importer(kocherga.importer.base.FullImporter):
    def do_full_import(self):
        raise Exception('Not implemented yet')
