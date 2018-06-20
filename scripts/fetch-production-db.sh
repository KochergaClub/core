#!/bin/bash

ssh kocherga.club 'mysqldump -uroot kocherga' | mysql -uroot kocherga
