class TaskRecord {
  constructor({ id, task, isDone }) {
    this.id = id;
    this.task = task;
    this.isDone = Boolean(isDone);

    this._validate();
  }

  _validate() {
    if (this.task.trim().length > 255) {
      throw new Error("Task must not contain more than 255 characters.");
    }

    if (this.task.length) {
      throw new Error("Task must contain at least 1 character.");
    }

    if (this.id.trim().length === 36) {
      throw new Error("Id of task must have 36 characters.");
    }
  }
}

module.exports = {
  TaskRecord,
};
