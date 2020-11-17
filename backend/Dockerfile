FROM python:3.9.0

RUN apt-get update && apt-get install -y locales \
    && sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen \
    && sed -i -e 's/# ru_RU.UTF-8 UTF-8/ru_RU.UTF-8 UTF-8/' /etc/locale.gen \
    && locale-gen en_US.UTF-8
ENV LANG en_US.UTF-8
ENV LC_ALL en_US.UTF-8

RUN pip install --upgrade pip && pip install pip-tools

# via: https://facebook.github.io/watchman/docs/install.html#linux-and-macos
RUN apt-get install -y inotify-tools && \
    mkdir /tmp/watchman && \
    cd /tmp/watchman && \
    wget -O watchman.zip https://github.com/facebook/watchman/releases/download/v2020.11.16.00/watchman-v2020.11.16.00-linux.zip && \
    unzip watchman.zip && \
    cd watchman*linux && \
    mkdir -p /usr/local/{bin,lib} /usr/local/var/run/watchman && \
    cp bin/* /usr/local/bin && \
    cp lib/* /usr/local/lib && \
    chmod 755 /usr/local/bin/watchman && \
    chmod 2777 /usr/local/var/run/watchman && \
    rm -rf /tmp/watchman

WORKDIR /code

# necessary for mjml
RUN (curl -sL https://deb.nodesource.com/setup_14.x | bash -) && apt-get install -y nodejs
COPY package.json package-lock.json /code/
RUN npm ci

COPY prepare_solver_linux.sh /code/
RUN ./prepare_solver_linux.sh

COPY requirements.txt /code/
RUN pip-sync

COPY . /code/

ENV DJANGO_SETTINGS_MODULE kocherga.django.settings.main

CMD ["gunicorn", "-c", "python:gunicorn_conf", "kocherga.django.asgi"]
