*Мы собрали для вас группу.*
{% for user in users %}
 - {{ user.name }} ([@{{ user.telegram_uid }}](tg://user?id={{ user.telegram_uid }}))
{% endfor %}
