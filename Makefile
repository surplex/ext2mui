E2M_URL="https://examples.sencha.com/extjs/7.4.0/examples/kitchensink/frame-index.html?classic\#array-grid"
E2M_NS="KitchenSink"
.PHONY: up clean down

up:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose up

clean:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose down --rmi all --remove-orphans

down:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose down
