// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract TodoContract {
    uint nextId = 1;

    struct Todo {
        uint id;
        string task;
        bool completed;
    }

    uint[] public todoIds;

    event TodoCreated(uint id);
    event TodoDeleted(uint id);
    event TodoCompleted(uint id, bool completed);

    mapping(uint => Todo) public todos;

    function createTodo(string memory _task) public {
        todos[nextId] = Todo(nextId, _task, false);
        todoIds.push(nextId);
        emit TodoCreated(nextId);
        nextId++;
    }

    function deleteTodo(uint id) public {
        delete todos[id];

        for (uint i = 0; i < todoIds.length; i++) {
            if (todoIds[i] == id) {
                todoIds[i] = todoIds[todoIds.length - 1];
                todoIds.pop();
                break;
            }
        }
        emit TodoDeleted(id);
    }

    function completeTodo(uint id) public {
        Todo storage todo = todos[id];
        todo.completed = !todo.completed;
        emit TodoCompleted(id, todo.completed);
    }

    function getTodoIds() public view returns (uint[] memory) {
        return todoIds;
    }
}
