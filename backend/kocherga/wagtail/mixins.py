from django.shortcuts import redirect
from django.core.signing import TimestampSigner

from .models import PagePreview


class HeadlessPreviewMixin:
    @classmethod
    def get_preview_signer(cls):
        return TimestampSigner(salt="headlesspreview.token")

    def get_preview_url(self, token):
        return f'/preview?token={token}'

    def create_page_preview(self):
        return PagePreview.objects.create(
            token=self.get_preview_signer().sign(''),  # just a unique token
            content_type=self.content_type,
            content_json=self.to_json(),
        )

    def serve_preview(self, request, mode_name):
        page_preview = self.create_page_preview()
        page_preview.save()
        PagePreview.garbage_collect()

        # shareable react-powered page
        return redirect(self.get_preview_url(page_preview.token))
