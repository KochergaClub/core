from rest_framework import serializers

from django.contrib.auth.models import Group, Permission
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'staff_member',)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('id', 'name', 'permissions', 'user_set',)

    permissions = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    user_set = UserSerializer(many=True, read_only=True)


class PermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Permission
        fields = ('id', 'name', 'user_set')

    user_set = UserSerializer(many=True, read_only=True)
