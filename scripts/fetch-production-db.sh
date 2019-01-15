#!/bin/bash

ssh kocherga.club 'mysqldump -uroot kocherga_django' | mysql -uroot kocherga_django
