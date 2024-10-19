const statuses = [
    {id:1 , name:'TO-DO' ,title:'To Do'},
    {id:2 , name:'PROGRESS' ,title:'Progress'},
    {id:3 , name:'BACKLOG' ,title:'Backlog'},
    {id:4 , name:'DONE' ,title:'Done'},
  ];
const otherStatus = (currentStatusId) => statuses.filter((item)=> item.id !==currentStatusId);

export default otherStatus;  