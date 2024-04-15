using API.Extensions;
using API.Middleware;
using API.SignalR;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Security;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddIdentityServices(builder.Configuration);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt => {
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(opt => {
    opt.AddPolicy("CorsPolicy", policy =>
    {
        policy.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("http://localhost:3000");
    });
});
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(List.Handler).Assembly));
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<Create>();
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/chat");

using var scope = app.Services.CreateScope();
var service = scope.ServiceProvider;
try
{
    var context = service.GetRequiredService<DataContext>();
    var uManager = service.GetRequiredService<UserManager<AppUser>>();
    context.Database.Migrate();
    await Seed.SeedData(context, uManager);
}
catch (Exception exception)
{
    var logger = service.GetRequiredService<ILogger<Program>>();
    logger.LogError(exception, "An error occured during migration");
}
app.Run();
