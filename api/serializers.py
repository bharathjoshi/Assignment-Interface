from rest_framework import serializers 
from .models import Assignment 
from .models import Question , Choice ,GradedAssignment
from users.models import User
class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value

class QuestionSerializer (serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta : 
        model = Question
        fields = ('id', 'choices', 'question', 'order')

class AssignmentSerializer (serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)


    class Meta :
        model = Assignment 
        fields = ('__all__')
    
    def get_questions(self,obj):
        questions = QuestionSerializer(obj.questions.all(), many=True).data
        return questions
    
    def create (self,request) :
        data = request.data
        assignment = Assignment()
        print(data)
        teacher = User.objects.get(username=data['teacher'])
        assignment.teacher = teacher 
        assignment.title = data['title']
        assignment.save()

        order = 1 
        for q in data['questions']:
            Q= Question()
            Q.question = q['title']
            Q.order = order 
            Q.save()
            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                Q.choices.add(newC)
            Q.answer = Choice.objects.get(title = q['answer'])
            Q.assignment = assignment 
            Q.save()
        order +=1 
        return assignment
class GradedAssignmentSerializer(serializers.ModelSerializer):
    student  = StringSerializer(many=False)
    class Meta :
        model = GradedAssignment
        fields = ('__all__')
