{{- define "extra-ingress.common-domain" -}}
apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: {{ .domain.name }}
  namespace: {{ .namespace }}
spec:
  secretName: {{ .domain.name }}-cert
  dnsNames:
    - {{ .domain.host | quote }}
  issuerRef:
    name: {{ .issuer }}
    kind: ClusterIssuer
---
apiVersion: traefik.containo.us/v1alpha1
kind: IngressRoute
metadata:
  name: {{ .domain.name }}
  namespace: {{ .domain.namespace }}
spec:
  entryPoints:
    - https
  routes:
  - kind: Rule
    match: Host(`{{ .domain.host }}`)
    services:
      - kind: Service
        name: {{ .domain.service }}
        namespace: {{ .domain.namespace | default "default" | quote }}
        port: {{ .domain.port | default 80 }}
  tls:
    secretName: {{ .domain.name }}-cert
{{- end }}
