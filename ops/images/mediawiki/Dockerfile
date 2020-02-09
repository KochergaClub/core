FROM mediawiki:1.33.1

RUN for EXT in \
  GoogleLogin \
  UserMerge \
  EditAccount \
  MsUpload \
  MobileFrontend \
  VisualEditor \
  TemplateData \
  VEForAll \
  PageForms \
  Cargo \
  ; do git clone --branch $MEDIAWIKI_BRANCH https://gerrit.wikimedia.org/r/mediawiki/extensions/$EXT extensions/$EXT; done

RUN cd extensions/VisualEditor && git submodule update --init

RUN for EXT in \
  MinervaNeue \
  ; do git clone --branch $MEDIAWIKI_BRANCH https://gerrit.wikimedia.org/r/mediawiki/skins/$EXT skins/$EXT; done

RUN git clone https://github.com/Wikifab/mediawiki-extension-VEForPageForm extensions/VEForPageForm

COPY install-github-extension.sh /tmp/
RUN REPO=kulttuuri/slack_mediawiki RELEASE=1.12 SRC=SlackNotifications-1.12/SlackNotifications NAME=SlackNotifications /tmp/install-github-extension.sh

RUN apt update && apt install unzip

COPY composer.local.json .
RUN curl https://getcomposer.org/installer | php -- -
RUN ./composer.phar update --no-dev

RUN git clone --depth 1 https://github.com/edwardspec/mediawiki-aws-s3.git extensions/AWS && cd extensions/AWS && ../../composer.phar install

COPY assets/kch* resources/assets/
COPY assets/favicon.ico .
COPY LocalSettings.php .
