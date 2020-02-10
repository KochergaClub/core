{{- define "core.backend_mount_configs" -}}
- name: secrets
  mountPath: "/KKMServer.pem"
  subPath: "KKMServer.pem"
  readOnly: true
- name: secrets
  mountPath: "/code/kocherga/django/settings/secrets.py"
  subPath: "secrets.py"
  readOnly: true
- name: configs
  mountPath: "/code/kocherga/django/settings/main.py"
  subPath: "main.py"
  readOnly: true
{{- end -}}

{{- define "core.backend_env_from" -}}
- configMapRef:
    name: {{ .Release.Name }}-common-env
- configMapRef:
    name: {{ .Release.Name }}-backend-env
{{- end -}}

{{- define "core.backend_env_db" -}}
- name: REDIS_HOST
  value: {{ .Release.Name }}-redis
- name: DB_HOST
  value: {{ .Release.Name }}-mysql
- name: DB_PASSWORD
  valueFrom:
    secretKeyRef:
      name: {{ .Release.Name }}-mysql
      key: password
{{- end -}}

{{- define "core.backend_volumes" -}}
- name: secrets
  secret:
    secretName: {{ .Release.Name }}-backend-secret
- name: configs
  configMap:
    name: {{ .Release.Name }}-backend-config
{{- end -}}

{{- define "core.frontend_env_from" -}}
- configMapRef:
    name: {{ .Release.Name }}-common-env
- configMapRef:
    name: {{ .Release.Name }}-frontend-env
{{- end -}}
