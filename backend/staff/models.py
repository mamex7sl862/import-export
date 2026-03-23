from django.db import models
from django.contrib.auth.models import User

ROLE_CHOICES = [
    ("import_staff", "Import Staff"),
    ("export_staff", "Export Staff"),
    ("import_manager", "Import Manager"),
    ("export_manager", "Export Manager"),
]


class StaffProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="staff_profile")
    role = models.CharField(max_length=50, choices=ROLE_CHOICES, default="import_staff")

    class Meta:
        verbose_name = "Staff Profile"
        verbose_name_plural = "Staff Profiles"

    def __str__(self):
        return f"{self.user.username} — {self.get_role_display()}"
