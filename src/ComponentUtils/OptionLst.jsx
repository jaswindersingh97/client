import { useContext } from "react";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import CreateAndEditTask from "../components/CreateAndEditTask/CreateAndEditTask";
import DeleteComponent from './../components/DeleteComponent/DeleteComponent';
// Define the component where you use the context
const OptionsListProvider = (task) => {
  const { openModal,setItem,setDeleteId } = useContext(AppContext); // Hooks inside a component
  
  const Editclk = (_id, task) => {
    setItem(task);
    openModal(CreateAndEditTask);
  };

  const handleclk = (id) => alert(id); // Dummy function for the delete button

  const shareClk = (id) => {
    const fullDomain = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
    const link = `${fullDomain}/share/${id}`;
    navigator.clipboard.writeText(link)
      .then(() => {
        toast.success("Link copied to clipboard!");
      })
      .catch(err => {
        toast.error("Failed to copy the link.");
      });
  };

  const deleteClk = (id) =>{

    setDeleteId(id);
    openModal(DeleteComponent);
  }

  const OptionsLst = [
    { name: 'Share', onClick: shareClk },
    { name: 'Edit', onClick: () => Editclk(task._id, task) }, // Pass the edit function
    { name: 'Delete', color: '#CF3636', onClick: deleteClk }
  ];

  return OptionsLst; // Return the options list with correct handlers
};

export default OptionsListProvider;
