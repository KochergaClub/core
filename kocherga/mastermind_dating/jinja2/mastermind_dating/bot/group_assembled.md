*Мы собрали для вас группу.*
{% for participant in participants %}
 - {{ participant.name }} ([@{{ participant.get_telegram_uid() }}](tg://user?id={{ participant.get_telegram_uid() }}))
{%- endfor %}

Заходите в чат группы, который мы создали для вас: {{invite_link}}
В нём есть наш бот, который будет помогать вам выбрать время встречи и забронировать комнату в Кочерге.
