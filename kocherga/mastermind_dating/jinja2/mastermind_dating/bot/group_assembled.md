*Мы собрали для вас группу.*
{% for user in users %}
 - [{{ user.uid }}](tg://user?id={{ user.uid }})
{% endfor %}
