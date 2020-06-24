rebuild:
	# force a rebuild by passing --no-cache
	docker-compose -f docker-compose-prod.yml up --build -d

run:
	# run as a (background) service
	docker-compose -f docker-compose-prod.yml up -d

stop:
	# run as a service and attach to it
	docker-compose -f docker-compose-prod.yml stop

remove:
	# run as a service and attach to it
	docker-compose -f docker-compose-prod.yml down

app-logs:
	docker-compose -f docker-compose-prod.yml logs react-app