Добрый день!

Вы только что зарегистрировались на событие [{{event.title}}]({{event_link}}).

Дата и время: {{humanized_dt}}<br>
{%- if event.realm == 'offline' -%}
Место проведения: {{address_text}}
{%- elif event.realm == 'online' and event.zoom_link -%}
[Присоединиться к Zoom-созвону]({{ event.zoom_link }})
{%- endif %}

До встречи!
