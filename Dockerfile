FROM python:3.7.2

RUN (curl -sL https://deb.nodesource.com/setup_10.x | bash -) && apt install -y nodejs

RUN pip install poetry
RUN poetry config settings.virtualenvs.in-project true
