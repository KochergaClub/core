release:
	git push
	npm run build
	rsync --delete -r build/ kocherga-srv@kocherga.club:/srv/kocherga/booking

r: release
