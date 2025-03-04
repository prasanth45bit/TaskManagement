document.addEventListener("DOMContentLoaded", function () {
    const editIcons = document.querySelectorAll("#ic1");
    const editInputs = document.querySelectorAll(".edit");
    const editButtons = document.querySelectorAll(".editBtn");
    const taskTitles = document.querySelectorAll(".title");

    editIcons.forEach((icon, index) => {
        icon.addEventListener("click", function () {
            if (editInputs[index].style.display === "flex") {
                editInputs[index].style.display = "none";
            } else {
                editInputs[index].style.display = "flex";
                taskTitles[index].style.display = "none";
            }
        });
    });

    
    editButtons.forEach((button, index) => {
        button.addEventListener("click", function () {
            editInputs[index].style.display = "none";
            taskTitles[index].style.display = "block";
        });
    });

    const deleteIcons = document.querySelectorAll("#ic2");
    deleteIcons.forEach(icon => {
        icon.addEventListener("click", function (event) {
            if (!confirm("Are you sure you want to delete this task?")) {
                event.preventDefault();
            }
        });
    });

    const taskForm = document.querySelector("form[action='/create']");
    if (taskForm) {
        taskForm.addEventListener("submit", function (event) {
            const taskInput = document.querySelector(".taskIn");
            if (!taskInput.value.trim()) {
                event.preventDefault();
                alert("Task cannot be empty!");
            }
        });
    }

    // API Requests
    async function createTask(task) {
        try {
            const response = await fetch("/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ task })
            });
            if (response.ok) location.reload();
        } catch (error) {
            console.error("Error creating task:", error);
        }
    }

    async function deleteTask(taskId) {
        try {
            const response = await fetch(`/delete/${taskId}`, { method: "GET" });
            if (response.ok) location.reload();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }

    async function updateTask(taskId, updatedTask) {
        try {
            const response = await fetch(`/update/${taskId}?task=${encodeURIComponent(updatedTask)}`, {
                method: "GET"
            });
            if (response.ok) location.reload();
        } catch (error) {
            console.error("Error updating task:", error);
        }
    }

    document.querySelectorAll(".editBtn").forEach((btn, index) => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            const taskId = btn.closest("form").action.split("/").pop();
            const updatedTask = btn.previousElementSibling.value;
            updateTask(taskId, updatedTask);
        });
    });

    document.querySelectorAll(".taskCr").forEach(btn => {
        btn.addEventListener("click", function (event) {
            event.preventDefault();
            const taskInput = document.querySelector(".taskIn").value;
            if (taskInput.trim()) createTask(taskInput);
        });
    });
});
