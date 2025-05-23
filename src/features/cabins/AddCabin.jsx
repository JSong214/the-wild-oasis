import { useState } from "react";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

// -----------v1-----------
// function AddCabin() {
//   const [showForm, setShowForm] = useState(false);
//   return (
//     <>
//       <Button onClick={() => setShowForm((state) => !state)}>Add Cabin</Button>
//       {showForm && (
//         <Modal onFormClose={() => setShowForm(false)}>
//           <CreateCabinForm
//             onFormClose={() => setShowForm(false)}
//           ></CreateCabinForm>
//         </Modal>
//       )}
//     </>
//   );
// }

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add Cabin</Button>
      </Modal.Open>
      <Modal.Windows name="cabin-form">
        <CreateCabinForm></CreateCabinForm>
      </Modal.Windows>
    </Modal>
  );
}

export default AddCabin;
