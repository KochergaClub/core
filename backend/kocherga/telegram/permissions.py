from kocherga.graphql.permissions import user_perm

manage_telegram_chats = user_perm('telegram.manage_chats')
view_all_telegram_chats = user_perm('telegram.view_all_chats')
post_to_telegram_chats = user_perm('telegram.post_to_chats')
