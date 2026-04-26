var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        builder =>
        {
            builder.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("AllowReactApp");

// Note: UseHttpsRedirection removed before CORS to prevent stripping CORS headers on redirect

app.UseAuthorization();

app.MapControllers();

app.Run();
