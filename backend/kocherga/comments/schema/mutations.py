import kocherga.django.schema.types
from kocherga.django.errors import GenericError
from kocherga.graphql import basic_types, helpers

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class editComment(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.Comment

    def resolve(self, _, info, input):
        if not info.context.user.is_authenticated:
            return GenericError("Пользователь не авторизован")

        try:
            comment = self.model.objects.get(id=input['id'])
        except self.models.DoesNotExist:
            return GenericError("Комментарий не найден")

        if info.context.user.pk != comment.author.pk:
            return GenericError("Нельзя редактировать чужие комментарии")

        comment.text = input['text']
        comment.full_clean()
        comment.save()
        return comment

    input = {
        'id': 'ID!',
        'text': str,
    }
    permissions = []  # will be checked in resolve()
    result_types = {
        model: types.Comment,
        GenericError: kocherga.django.schema.types.GenericError,
    }


@c.class_field
class deleteComment(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    class Ok:
        ok = True

    model = models.Comment

    def resolve(self, _, info, input):
        if not info.context.user.is_authenticated:
            return GenericError("Пользователь не авторизован")

        try:
            comment = self.model.objects.get(id=input['id'])
        except self.model.DoesNotExist:
            return GenericError("Комментарий не найден")
        if info.context.user.pk != comment.author.pk:
            return GenericError("Нельзя удалять чужие комментарии")

        comment.delete()
        return self.Ok()

    input = {
        'id': 'ID!',
    }
    permissions = []  # will be checked in resolve()
    result_types = {
        Ok: basic_types.BasicResult,
        GenericError: kocherga.django.schema.types.GenericError,
    }


mutations = c.as_dict()
