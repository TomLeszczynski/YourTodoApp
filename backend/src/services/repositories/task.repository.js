const { v4: uuid } = require("uuid");
const { pool } = require("../config/dbConfig");
const { TaskRecord } = require("./records/task.record");

class TaskRepository {
  constructor() {}

  static _checkRecord(record) {
    if (!(record instanceof TaskRecord)) {
      throw new Error("record must be an instance of TaskRecord");
    }
  }

  static async getAll() {
    const [results] = await pool.execute("SELECT * FROM `tasks`;");
    return results.map((element) => new TaskRecord(element));
  }

  static async getOne(id) {
    const [results] = await pool.execute(
      "SELECT * FROM `tasks` WHERE `id` = :id;",
      {
        id,
      }
    );
    return results.length ? new TaskRecord(results[0]) : null;
  }

  static async insert(record) {
    this._checkRecord(record);

    const id = record.id ? record.id : uuid();

    await pool.execute(
      "INSERT INTO `tasks` (`id`, `task`, `isDone`) VALUES (:id, :task, '0');",
      {
        id,
        task: record.task,
      }
    );

    return await this.getOne(id);
  }

  static async changeStatus(record) {
    this._checkRecord(record);

    if (!record.id) {
      throw new Error("Task has not Id");
    }

    record._validate();

    await pool.execute("UPDATE `tasks` SET `isDone` = '1' WHERE `id` = :id;", {
      id: record.id,
    });

    return await this.getOne(record.id);
  }

  static async updateTask(record) {
    this._checkRecord(record);

    if (!record.id) {
      throw new Error("Task has not Id");
    }

    record._validate();

    await pool.execute("UPDATE `tasks` SET `task` = :task WHERE `id` = :id;", {
      id: record.id,
      task: record.task,
    });

    return await this.getOne(record.id);
  }

  static async delete(record) {
    this._checkRecord(record);

    if (!record.id) {
      throw new Error("Task has not Id");
    }

    await pool.execute("DELETE FROM `tasks` WHERE `id` = :id;", {
      id: record.id,
    });

    return record.id;
  }
}

module.exports = {
  TaskRepository,
};
