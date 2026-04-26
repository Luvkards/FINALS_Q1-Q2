using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;

namespace TodoApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private static List<Todo> _todos = new();

    [HttpGet]
    public IActionResult Get() => Ok(_todos);

    [HttpPost]
    public IActionResult Post([FromBody] Todo newTodo)
    {
        if (string.IsNullOrWhiteSpace(newTodo.Title))
        {
            return BadRequest("Title cannot be empty.");
        }

        newTodo.Id = Guid.NewGuid();
        _todos.Add(newTodo);
        return CreatedAtAction(nameof(Get), new { id = newTodo.Id }, newTodo);
    }

    [HttpPut("{id}")]
    public IActionResult Put(Guid id, [FromBody] Todo updatedTodo)
    {
        if (string.IsNullOrWhiteSpace(updatedTodo.Title))
        {
            return BadRequest("Title cannot be empty.");
        }

        var todoItem = _todos.FirstOrDefault(t => t.Id == id);
        if (todoItem == null)
        {
            return NotFound();
        }

        todoItem.Title = updatedTodo.Title;
        // In this implementation, we allow updating the entire Todo, including completion status
        todoItem.Completed = updatedTodo.Completed;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(Guid id)
    {
        var todoItem = _todos.FirstOrDefault(t => t.Id == id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _todos.Remove(todoItem);
        return NoContent();
    }
}
