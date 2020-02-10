# Инфраструктура

Инфраструктура Кочерги состоит из:
- кастомного core-приложения, обеспечивающего сайт (публичную и приватную часть) и главной базы данных
- приватного инстанса mediawiki
- инфраструктурных сервисов: metabase, grafana, prometheus

Всё это деплоится на kubernetes-кластер.

## Используемые технологии

Для разработки:
- docker
- skaffold

Для деплоя:
- terraform
- k3s (устанавливаемый пока что через ansible, конфиги в deploy-репозитории)
- helm
- skaffold

## Как пересоздать всю инфраструктуру

### Шаг 0. Локальный софт для выкладки

Вам понадобятся:
* Terraform CLI
* Ansible
* kubectl
* skaffold
* helm

И доступы:
* AWS
* Hetzner
* к репозиторию `kocherga/code/deploy`
* к GitLab'у (к container registry в этом репозитории)
* пароль от ansible vault в deploy-репозитории

### Шаг 1. Terraform

Из `ops/terraform` сделать `terraform apply`.

Для этого понадобится секреты: `aws_access_key` и `aws_secret_key` (для S3 и прочих AWS-сервисов) и `hcloud_token` (для Hetzner-серверов).

### Шаг 2. Установка k3s

Пока что делается через Ansible, который хранится в отдельном неопубликованном репозитории [kocherga/deploy](https://gitlab.com/kocherga/code/deploy).

После установки k3s на серверах надо настроить локальный kubectl-конфиг в `~/.kube/config`. (См. документацию k3s и k8s для подробностей, как это делается).

### Шаг 3. Установка внешних helm charts

На кластере должны работать общие сервисы:
* metabase
* prometheus и grafana
* verdaccio

Для их устновки используем skaffold и helm.

Сначала установить helm и skaffold.

Затем запустить
- `skaffold run -f ./ops/skaffold/base.yaml`
- `skaffold run -f ./ops/skaffold/monitor.yaml`
- `skaffold run -f ./ops/skaffold/metabase.yaml`
- `skaffold run -f ./ops/skaffold/verdaccio.yaml`

Добавочно: `skaffold run -f ./ops/skaffold/wiki.yaml` (установит kocherga-wiki и berekuk-wiki).

### Шаг 4. Установка core-софта

Создайте файлы в `ops/secrets/core/prod/` в соответствии с требуемыми файлами и настройками, упомянутыми в chart'е `ops/charts/core` и skaffold-конфиге `skaffold.yaml`.

Запустите `skaffold run`.
