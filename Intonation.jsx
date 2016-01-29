// Define a collection to hold our tasks
Tasks = new Mongo.Collection("tasks");


Meteor.methods({
  addTask(text) {
    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.insert({
      text: text,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username
    });
  },

  removeTask(taskId) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()){
	//If the task is private, make sure only the owner can delete it
	throw new Meteor.Error("not-authorized");
    }
    Tasks.remove(taskId);
  },

  setChecked(taskId, setChecked) {
    const task = Tasks.findOne(taskId);
    if (task.private && task.owner !== Meteor.userId()){
	//If the task is private, make sure only the owner can delete it
	throw new Meteor.Error("not-authorized");
    }
    Tasks.update(taskId, { $set: { checked: setChecked} });
  },

  setPrivate(taskId, setToPrivate) {
    const task = Tasks.findOne(taskId);

    // Make sure only the task owner can make a task private
    if (task.owner !== Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    Tasks.update(taskId, { $set: { private: setToPrivate } });
  }
});
