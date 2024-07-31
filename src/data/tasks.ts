type Task = {
    content: string;
    done: boolean;
    order: number;
};
  
export const tasks: Task[] = [
    {
      content: "Get FTP credentials",
      done: true,
      order: 1,
    },
    {
      content: "Home Page Design ",
      done: true,
      order: 2,
    },
    {
      content: "E-mail John about the deadline",
      done: true,
      order: 3
    },
    {
      content: "Create a Google Drive folder",
      done: true,
      order: 4
    },
    {
      content: "Send a gift to the client",
      done: true,
      order: 5
    },
    {
      content: "this is a new task",
      done: false,
      order: 1
    },
    {
      content: "Develop the To-do list page",
      done: false,
      order: 2
    },
    {
      content: "Create the drag-and-drop function",
      done: false,
      order: 3
    },
    {
      content: "Add new tasks",
      done: false,
      order: 4
    },
    {
      content: "Delete itens",
      done: false,
      order: 5
    },
    {
      content: "Erase all",
      done: false,
      order: 6
    },
    {
      content: "Checked item goes to Done list",
      done: false,
      order: 7
    },
    {
      content: "This item label may be edited",
      done: false,
      order: 8
    },
];
  