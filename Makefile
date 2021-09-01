E2M_URL="https://f.."
E2M_NS="FlexAc,FlexCs,FlexLg,FlexPr"
.PHONY: up clean down

up:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose up

clean:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose down --rmi all --remove-orphans

down:
	E2M_NS=${E2M_NS} E2M_URL=${E2M_URL} docker-compose down
