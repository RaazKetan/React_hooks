import React, { useEffect, useState, useCallback } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./components/hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);
  const transformTasks = useCallback((taskObj) => {
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);
  const httpData = useHttp(
    { url: "https://react-http-aa161-default-rtdb.firebaseio.com//tasks.json" },
    transformTasks
  );
  const { isLoading, error, sendRequest: fetchTasks } = httpData;

  //for the moment, useEffect is not taking any dependencies like fetchTasks because it is not a function that will change, it is a function that will be called once and that's it
  //if we call fecthTasks inside useEffect, it will create an infinite loop
  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
