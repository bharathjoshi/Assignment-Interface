from django.contrib import admin

# Register your models here.
from .models import Assignment ,GradedAssignment,Choice ,Question
admin.site.register(Assignment)
admin.site.register(GradedAssignment)
admin.site.register(Choice)
admin.site.register(Question)
