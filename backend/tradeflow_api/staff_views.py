from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from staff.models import StaffProfile

VALID_ROLES = ["import_staff", "export_staff", "import_manager", "export_manager"]


def user_to_dict(user):
    role = "import_staff"
    try:
        role = user.staff_profile.role
    except Exception:
        pass
    return {
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "is_active": user.is_active,
        "is_staff": user.is_staff,
        "role": role,
    }


@api_view(["GET", "POST"])
def staff_users_list(request):
    if request.method == "GET":
        users = User.objects.filter(is_superuser=False).order_by("username")
        return Response([user_to_dict(u) for u in users])

    data = request.data
    username = data.get("username", "").strip()
    password = data.get("password", "")
    role = data.get("role", "import_staff")

    if not username:
        return Response({"username": ["This field is required."]}, status=400)
    if not password:
        return Response({"password": ["Password is required for new users."]}, status=400)
    if role not in VALID_ROLES:
        return Response({"role": [f"Must be one of: {', '.join(VALID_ROLES)}"]}, status=400)
    if User.objects.filter(username=username).exists():
        return Response({"username": ["A user with that username already exists."]}, status=400)

    user = User.objects.create(
        username=username,
        email=data.get("email", ""),
        first_name=data.get("first_name", ""),
        last_name=data.get("last_name", ""),
        password=make_password(password),
        is_staff=True,
        is_active=data.get("is_active", True),
    )
    StaffProfile.objects.create(user=user, role=role)
    return Response(user_to_dict(user), status=201)


@api_view(["GET", "PATCH", "DELETE"])
def staff_user_detail(request, pk):
    try:
        user = User.objects.get(pk=pk, is_superuser=False)
    except User.DoesNotExist:
        return Response({"error": "User not found"}, status=404)

    if request.method == "GET":
        return Response(user_to_dict(user))

    if request.method == "PATCH":
        data = request.data
        if "username" in data:
            new_username = data["username"].strip()
            if User.objects.filter(username=new_username).exclude(pk=pk).exists():
                return Response({"username": ["Username already taken."]}, status=400)
            user.username = new_username
        if "email" in data:
            user.email = data["email"]
        if "first_name" in data:
            user.first_name = data["first_name"]
        if "last_name" in data:
            user.last_name = data["last_name"]
        if "is_active" in data:
            user.is_active = data["is_active"]
        if "password" in data and data["password"]:
            user.password = make_password(data["password"])
        user.save()

        if "role" in data:
            role = data["role"]
            if role not in VALID_ROLES:
                return Response({"role": [f"Must be one of: {', '.join(VALID_ROLES)}"]}, status=400)
            profile, _ = StaffProfile.objects.get_or_create(user=user)
            profile.role = role
            profile.save()

        return Response(user_to_dict(user))

    if request.method == "DELETE":
        user.delete()
        return Response(status=204)
