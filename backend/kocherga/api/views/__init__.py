from pathlib import Path
import importlib

for p in Path(__file__).parent.glob('*.py'):
    filename = p.name
    if filename == '__init__.py':
        continue
    module = filename.split('.')[0]
    importlib.import_module('.' + module, __name__)
