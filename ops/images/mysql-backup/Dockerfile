FROM python:3.7.2

RUN apt update && apt install -y mysql-client

RUN pip install awscli

COPY backup.sh /backup.sh

CMD ["/backup.sh"]