import graphql

from ariadne import SchemaDirectiveVisitor


class StaffOnlyDirective(SchemaDirectiveVisitor):
    def visit_field_definition(self, field, object_type):
        original_resolver = field.resolve or graphql.default_field_resolver

        def resolve_protected(obj, info, **kwargs):
            if not info.context.user.is_staff:
                raise Exception("Forbidden")

            return original_resolver(obj, info, **kwargs)

        field.resolve = resolve_protected
        return field


class AuthDirective(SchemaDirectiveVisitor):
    def visit_field_definition(self, field, object_type):
        permission_names = self.args.get('permissions', [])
        if 'permission' in self.args:
            permission_names.append(self.args['permission'])

        if not len(permission_names):
            raise Exception('@auth requires one of "permission" or "permissions" fields to be set')

        original_resolver = field.resolve or graphql.default_field_resolver

        def resolve_protected(obj, info, **kwargs):
            for perm in permission_names:
                if not info.context.user.has_perm(perm):
                    raise Exception(f"Forbidden: missing permission {perm}")

            return original_resolver(obj, info, **kwargs)

        field.resolve = resolve_protected
        return field
