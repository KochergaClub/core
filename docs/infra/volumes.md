# Persistent volumes

Для чтения этого документа вам надо знать, что такое PersistentVolume и PersistentVolumeClaim.

Используем hetzner volumes через https://github.com/hetznercloud/csi-driver.

## Переподключение старого volume

Полезные ссылки:

* https://github.com/digitalocean/csi-digitalocean/blob/master/examples/kubernetes/pod-single-existing-volume/README.md (для DO, но принцип похож)
* https://github.com/loxal/muctool/commit/e91ba38ab036aa49bbf0d24300c202c81ea21727#diff-9ac3e86fa14a75282fc056d8182ee96f - некий человек решал ту же задачу, тут коммит (via https://github.com/hetznercloud/csi-driver/issues/44)

Для разных chart'ов задача переподключения volume'ов будет решаться немного по-разному, но в целом принцип такой:
* Написать вручную [манифест с PersistentVolume](https://github.com/digitalocean/csi-digitalocean/blob/master/examples/kubernetes/pod-single-existing-volume/README.md#example).
  * Прописать ему volumeHandle из `hcloud volume list`.
  * Не забыть `storageClassName`.
  * И нужную `capacity`.
  * И `csi.driver`.
* Сделать PersistentVolumeClaim, использующий соответствующее количество ресурсов.
* PV должен распознаться и подключиться сам.

TODO: проверить, можно ли матчить PV и PVC через labels.
