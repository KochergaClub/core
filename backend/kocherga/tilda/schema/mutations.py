from kocherga.django.errors import GenericError
import kocherga.django.schema.types
from kocherga.graphql import helpers, basic_types, permissions

from .. import models
from . import types

c = helpers.Collection()


@c.class_field
class tildaImportAll(helpers.BaseField):
    def resolve(self, _, info):
        models.TildaPage.objects.import_all()
        return {'ok': True}

    permissions = [permissions.staffonly]
    result = basic_types.BasicResult


@c.class_field
class importTildaPage(helpers.UnionFieldMixin, helpers.BaseFieldWithInput):
    model = models.TildaPage

    def resolve(self, _, info, input):
        page = self.model.objects.import_page(input['page_id'])
        if not page:
            return GenericError("Страница не найдена или не должна быть импортирована")
        return page

    permissions = [permissions.staffonly]
    input = {'page_id': int}
    result_types = {
        model: types.TildaPage,
        GenericError: kocherga.django.schema.types.GenericError,
    }


@c.class_field
class removeTildaPage(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        page = models.TildaPage.objects.get(page_id=input['page_id'])
        page.delete()
        return {'ok': True}

    permissions = [permissions.staffonly]
    input = {'page_id': int}
    result = basic_types.BasicResult


mutations = c.as_dict()
