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
- kustomize
- возможно, скоро понадобится helm

## Как пересоздать всю инфраструктуру

### Шаг 0. Локальный софт для выкладки

Вам понадобятся:
* Terraform CLI
* Ansible
* kubectl
* kustomize (?)
* skaffold
* helm
* helmfile

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

Для их устновки используем helm и helmfile.

Сначала установить helm, helm-diff и helmfile.

Затем запустить `helmfile apply` в `ops`.

### Шаг 4. Установка core-софта

Создайте файлы в `ops/k8s/prod/secrets/` в соответствии с требуемыми файлами и настройками, упомянутыми в `secretGenerator` из `ops/k8s/prod/kustomization.yaml`.

Запустите `skaffold run`.
