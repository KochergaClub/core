from django.contrib.auth import get_user_model
from django.db import models
from wagtail.core.fields import RichTextField

KchUser = get_user_model()


class Comment(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    author = models.ForeignKey(KchUser, on_delete=models.PROTECT)
    text = models.TextField()


class Commentable(models.Model):
    comments = models.ManyToManyField(
        Comment,
        related_name="%(app_label)s_%(class)s",
        related_query_name="%(app_label)s_%(class)s",
    )

    # def can_create_comment(self, user):
    #     raise False

    # def can_view_comments(self, user):
    #     raise False

    def create_comment(self, author: KchUser, text: str):
        comment = Comment(author=author, text=text)
        comment.full_clean()
        comment.save()
        self.comments.add(comment)

    class Meta:
        abstract = True
