import axios from 'axios';

const TASK_URL = 'http://localhost:9098/tasks';

class TaskService {
  // Get task by ID
  getTaskById(id) {
    return axios.get(`${TASK_URL}/${id}`);
  }

  // Get all tasks
  getAllTasks() {
    return axios.get(TASK_URL);
  }

  // Delete task by ID (fixed with return)
  deleteTask(id) {
    return axios.delete(`${TASK_URL}/${id}`);
  }

  // Update task by ID
  updateTask(id, task) {
    return axios.put(`${TASK_URL}/${id}`, task);
  }

  // Save (add) a new task
  saveTaskDetails(task) {
    return axios.post(TASK_URL, task);
  }
}

export default new TaskService();
