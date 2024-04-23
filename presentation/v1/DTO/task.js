function taskToDto(task) {
    return {
        name: task.name,
        description: task.description,
        created_date: task.created_at,
        last_change_date: task.last_modified_at,
    }
}

function tasksToDto(tasks) {
    const tasksDto = [];
    for (const task in tasks) {
        tasksDto.push(tasksToDto(task));
    }
    return tasksDto;
}


module.exports = {taskToDto, tasksToDto};