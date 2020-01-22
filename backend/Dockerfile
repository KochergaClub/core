FROM python:3.7.2

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN pip install --upgrade pip && pip install pip-tools

RUN apt-get install -y inotify-tools && \
    git clone https://github.com/facebook/watchman.git /tmp/watchman-src && \
    cd /tmp/watchman-src && \
    git checkout v4.9.0 && \
    ./autogen.sh && ./configure && make && make install && rm -rf /tmp/watchman-src

WORKDIR /code

# necessary for mjml
RUN (curl -sL https://deb.nodesource.com/setup_10.x | bash -) && apt-get install -y nodejs
COPY package.json package-lock.json /code/
RUN npm ci

COPY prepare_solver_linux.sh /code/
RUN ./prepare_solver_linux.sh

COPY requirements.txt /code/
RUN pip-sync

COPY . /code/

CMD ["gunicorn", "-c", "python:gunicorn_conf", "kocherga.django.wsgi"]
