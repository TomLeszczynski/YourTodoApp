const { ValidationError } = require("../../utils/handleError");

class TaskRecord {
  constructor({ id, task, isDone }) {
    this.id = id;
    this.task = task;
    this.isDone = Boolean(isDone);

    this._validate();
  }

  _validate() {
    if (this.task.trim().length > 255) {
      throw new ValidationError(
        "Task must not contain more than 255 characters."
      );
    }

    if (!this.task.length) {
      throw new ValidationError("Task must contain at least 1 character.");
    }

    if (this.id.trim().length !== 36) {
      throw new ValidationError("Id of task must have 36 characters.");
    }

    if (typeof this.isDone !== "boolean") {
      throw new ValidationError("isDone must be a boolean value");
    }
  }
}

module.exports = {
  TaskRecord,
};
