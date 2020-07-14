from kocherga.graphql import helpers, basic_types, permissions

from .. import models

c = helpers.Collection()


@c.class_field
class tildaImportAll(helpers.BaseField):
    def resolve(self, _, info):
        models.TildaPage.objects.export_all()
        return {'ok': True}

    permissions = [permissions.staffonly]
    result = basic_types.BasicResult


@c.class_field
class tildaImport(helpers.BaseFieldWithInput):
    def resolve(self, _, info, input):
        models.TildaPage.objects.export_page(input['page_id'])
        return {'ok': True}

    permissions = [permissions.staffonly]
    input = {'page_id': int}
    result = basic_types.BasicResult


mutations = c.as_dict()
