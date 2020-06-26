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

        check_is_authenticated = False
        if 'authenticated' in self.args:
            if not self.args['authenticated']:
                raise Exception("authenticated param can only be `true` if set")
            check_is_authenticated = True

        if not len(permission_names) and not check_is_authenticated:
            raise Exception(
                '@auth requires one of "permission", "permissions" or "authenticated" fields to be set'
            )

        original_resolver = field.resolve or graphql.default_field_resolver

        def resolve_protected(obj, info, **kwargs):
            if check_is_authenticated:
                if not info.context.user.is_authenticated:
                    raise Exception(f"Forbidden: need to be authenticated")
            for perm in permission_names:
                if not info.context.user.has_perm(perm):
                    raise Exception(f"Forbidden: missing permission {perm}")

            return original_resolver(obj, info, **kwargs)

        field.resolve = resolve_protected
        return field
