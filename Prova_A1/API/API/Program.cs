using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddCors(options =>
    options.AddPolicy("Acesso Total",
        configs => configs
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod())
);

var app = builder.Build();

app.UseCors("Acesso total");

app.MapGet("/", () => "Prova A1");

// ENDPOINTS DE CATEGORIA

app.MapGet("/api/categoria/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Categorias.Any())
    {
        return Results.Ok(ctx.Categorias.ToList());
    }
    return Results.NotFound("Nenhuma categoria encontrada");
});

app.MapPost("/api/categoria/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Categoria categoria) =>
{
    ctx.Categorias.Add(categoria);
    ctx.SaveChanges();
    return Results.Created("", categoria);
});

// ENDPOINTS DE TAREFA

app.MapGet("/api/tarefas/listar", ([FromServices] AppDataContext ctx) =>
{
    if (ctx.Tarefas.Any())
    {
        return Results.Ok(ctx.Tarefas.Include(x => x.Categoria).ToList());
    }
    return Results.NotFound("Nenhuma tarefa encontrada");
});

app.MapPost("/api/tarefas/cadastrar", ([FromServices] AppDataContext ctx, [FromBody] Tarefa tarefa) =>
{
    Categoria? categoria = ctx.Categorias.Find(tarefa.CategoriaId);
    if (categoria == null)
    {
        return Results.NotFound("Categoria não encontrada");
    }
    tarefa.Categoria = categoria;
    ctx.Tarefas.Add(tarefa);
    ctx.SaveChanges();
    return Results.Created("", tarefa);
});

// PATCH: http://localhost:5000/api/tarefa/alterar/{id}
app.MapPatch("/api/tarefa/alterar/{id}", async ([FromServices] AppDataContext ctx, [FromRoute] string id) =>
{
    var tarefa = await ctx.Tarefas.FindAsync(id);
    if (tarefa == null)
    {
        return Results.NotFound("Tarefa não encontrada");
    }

    if (tarefa.Status == "Não iniciada")
    {
        tarefa.Status = "Em andamento";
    }
    else if (tarefa.Status == "Em andamento")
    {
        tarefa.Status = "Concluído";
    }
    else
    {
        return Results.BadRequest("A tarefa já foi concluída.");
    }

    await ctx.SaveChangesAsync();
    return Results.Ok(tarefa);
});

// GET: http://localhost:5000/api/tarefa/naoconcluidas
app.MapGet("/api/tarefa/naoconcluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Include(t => t.Categoria)
        .Where(t => t.Status == "Não iniciada" || t.Status == "Em andamento")
        .ToList();

    if (!tarefas.Any())
    {
        return Results.NotFound("Nenhuma tarefa não concluída encontrada");
    }

    return Results.Ok(tarefas);
});

// GET: http://localhost:5000/api/tarefas/concluidas
app.MapGet("/api/tarefas/concluidas", ([FromServices] AppDataContext ctx) =>
{
    var tarefas = ctx.Tarefas
        .Include(t => t.Categoria)
        .Where(t => t.Status == "Concluído")
        .ToList();

    if (!tarefas.Any())
    {
        return Results.NotFound("Nenhuma tarefa concluída encontrada");
    }

    return Results.Ok(tarefas);
});

app.Run();
