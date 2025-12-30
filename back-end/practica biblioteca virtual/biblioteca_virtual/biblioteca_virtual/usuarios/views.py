from django.shortcuts import render, redirect
from django.http import HttpResponse
from usuarios.models import Usuario
from usuarios.forms import RegistroUsuarioForm
from django.contrib import messages

def inicio_usuarios(request,gol):

    user = Usuario.objects.get(id=1)

    return HttpResponse(
        '<h1>Bienvenido al módulo de usuarios</h1>' +
        '<p>Aquí podrás registrarte e iniciar sesión</p>'+
        '<p>James hizo '+str(gol)+' goles</p>'+
        '<p>El primer usuario es '+user.nombre+'</p>'+
        "<img src='https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcRVNHq0Js5ZesO2ovhpAe2pQRC-I9XhZ2MGdAy3FLNzQ66P6fVn54TnBa1uyMq7OPmFr7HI-YVjmMEbopidIH70RwdObQzE4YDJ6p_Vz-9PWcmVWTOPrsDO9SOGgzhBfwN6ltOqyeZfGAoV&s=19'>"
    )

def listar_usuarios(request):
    usuarios = Usuario.objects.all()
    return render(request, 'usuarios/lista.html', 
                  {'usuarios': usuarios})



def registrar_usuario(request):
    if request.method == 'POST':
        form = RegistroUsuarioForm(request.POST)
        if form.is_valid():
            usuario = form.save()
            messages.success(request, 'Usuario registrado exitosamente!')
            return redirect('usuarios:antanas_mockus', usuario_id=usuario.id)
    else:
        form = RegistroUsuarioForm()
    
    return render(request, 'usuarios/registrar_usuario.html', {'form': form})

def confirmacion_usuario(request, usuario_id):
    usuario = Usuario.objects.get(id=usuario_id)
    return render(request, 'usuarios/confirmacion.html', {'usuario': usuario})
