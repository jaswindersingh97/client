import { toast } from "react-toastify";
const handleclk = (id) => alert(id);    // dummy function for the options button

const shareClk = (id) => {
  const fullDomain = window.location.hostname + (window.location.port ? `:${window.location.port}` : '');
  const link = `${fullDomain}/share/${id}` ;
  navigator.clipboard.writeText(link)
  .then(() => {
    toast.success("Link copied to clipboard!");
  })
  .catch(err => {
    toast.error("Failed to copy the link.");
  });
};

const OptionsLst = [
    { name: 'Share', onClick: shareClk },
    { name: 'Edit', onClick: handleclk },
    { name: 'Delete', color: '#CF3636', onClick: handleclk }
  ];
  export default OptionsLst;