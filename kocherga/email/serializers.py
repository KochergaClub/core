from rest_framework import serializers


class MemberInterestSerializer(serializers.Serializer):
    id = serializers.CharField(max_length=20)
    name = serializers.CharField(max_length=100)
    subscribed = serializers.BooleanField()


class MailchimpMemberSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=100)
    interests = MemberInterestSerializer(many=True)

    def create(self, validated_data):
        raise Exception("Not implemented")

    def update(self, instance, validated_data):
        raise Exception("Not implemented")
