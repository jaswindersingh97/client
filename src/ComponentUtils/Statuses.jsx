const statuses = [
    {id:3 , name:'BACKLOG' ,title:'Backlog'},
    {id:1 , name:'TO-DO' ,title:'To Do'},
    {id:2 , name:'PROGRESS' ,title:'Progress'},
    {id:4 , name:'DONE' ,title:'Done'},
  ];
const otherStatus = (currentStatusId) => statuses.filter((item)=> item.id !==currentStatusId);
export {statuses}
export default otherStatus;  